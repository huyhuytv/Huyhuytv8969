import { ref, computed } from 'vue'
import { Capacitor, CapacitorHttp } from '@capacitor/core'
import { parseSaveData } from '@/stores/useSaveStore'
import i18n from '@/locales'
const tText = (zh: string, vi: string) => { return i18n.global.locale.value === 'vi' ? vi : zh }


const STORAGE_KEY = 'taoyuanxiang_webdav'
const SAVE_KEY_PREFIX = 'taoyuanxiang_save_'
const MAX_SLOTS = 3

export interface WebdavConfig {
  enabled: boolean
  serverUrl: string
  path: string
  username: string
  password: string
}

const defaultConfig = (): WebdavConfig => ({
  enabled: false,
  serverUrl: '',
  path: '',
  username: '',
  password: ''
})

const loadConfig = (): WebdavConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultConfig(), ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return defaultConfig()
}

/** 持久化配置 */
const config = ref<WebdavConfig>(loadConfig())
const testStatus = ref<'idle' | 'testing' | 'success' | 'failed'>('idle')
const testError = ref('')
const traceLogs = ref<string[]>([])
const TRACE_LOG_LIMIT = 80

/** 检测是否在 Electron 环境中 */
const isElectron = typeof navigator !== 'undefined' && navigator.userAgent.includes('Electron')

/** 当前时间（HH:mm:ss) */
const nowLabel = (): string => {
  const d = new Date()
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}

/** WebDAV 调试日志（用于安卓环境排查，避免依赖 console) */
const pushTrace = (msg: string) => {
  traceLogs.value.push(`[${nowLabel()}] ${msg}`)
  if (traceLogs.value.length > TRACE_LOG_LIMIT) {
    traceLogs.value.splice(0, traceLogs.value.length - TRACE_LOG_LIMIT)
  }
}

const clearTrace = () => {
  traceLogs.value = []
}

const formatUrlForLog = (url: string): string => {
  try {
    const u = new URL(url)
    return `${u.origin}${u.pathname}`
  } catch {
    return url
  }
}

const extractErrorMessage = (e: unknown): string => {
  if (e instanceof Error && e.message) return e.message
  if (typeof e === 'string') return e
  if (e && typeof e === 'object') {
    const message = (e as { message?: unknown }).message
    if (typeof message === 'string' && message) return message
    try {
      return JSON.stringify(e)
    } catch {
      return String(e)
    }
  }
  return String(e)
}

const normalizeUserError = (msg: string): string => {
  // 安卓原生 HttpURLConnection 在部分失败分支只返回 URL 文本，可读性很差
  if (/^https?:\/\//i.test(msg.trim())) {
    return tText('Yêu cầu không thành công (máy chủ bị từ chối hoặc đường dẫn không tồn tại)', 'Yêu cầu không thành công (máy chủ bị từ chối hoặc đường dẫn không tồn tại)')
  }
  return msg
}

/** 平台自适应 HTTP Yêu cầu:原生平台走 CapacitorHttp，dev 走 Vite 代理，Electron/生产 web 直连 */
const webdavFetch = async (
  url: string,
  method: string,
  headers: Record<string, string>,
  body?: string
): Promise<{ status: number; data: string }> => {
  const logUrl = formatUrlForLog(url)
  pushTrace(`Yêu cầu ${method} ${logUrl}`)
  try {
    // 原生平台（Capacitor Android/iOS):CapacitorHttp 绕过 CORS
    if (Capacitor.isNativePlatform()) {
      const res = await CapacitorHttp.request({ url, method, headers, data: body })
      pushTrace(tText(`phản ứng ${method} ${res.status}`, `phản hồi ${method} ${res.status}`))
      return { status: res.status, data: typeof res.data === 'string' ? res.data : JSON.stringify(res.data) }
    }
    // Dev 环境（非 Electron):走 Vite 代理中间件绕过 CORS
    if (import.meta.env.DEV && !isElectron) {
      const res = await fetch('/__webdav', {
        method,
        headers: { ...headers, 'x-webdav-url': url },
        body
      })
      pushTrace(tText(`phản ứng ${method} ${res.status}`, `phản hồi ${method} ${res.status}`))
      return { status: res.status, data: await res.text() }
    }
    // Electron（主进程已注入 CORS 头)/ 生产 web（同源部署):直连
    // credentials: 'omit' 防止浏览器弹出原生认证对话框（认证由 Authorization 头自行处理)
    const res = await fetch(url, { method, headers, body, credentials: 'omit' })
    pushTrace(tText(`phản ứng ${method} ${res.status}`, `phản hồi ${method} ${res.status}`))
    return { status: res.status, data: await res.text() }
  } catch (e: unknown) {
    const msg = extractErrorMessage(e)
    pushTrace(`bất thường ${method} ${msg}`)
    throw e
  }
}

/** 根据 serverUrl 域名返回针对性的路径提示 */
const getPathHint = (serverUrl: string): string => {
  try {
    const host = new URL(serverUrl).hostname.toLowerCase()
    if (host.includes('jianguoyun')) return tText('Nut Cloud xin hãy đến「đường dẫn lưu trữ」Điền vào tên thư mục hiện có, chẳng hạn như"Đám mây hạt của tôi".', 'Đối với Nut Cloud, vui lòng điền tên thư mục hiện có vào "Đường dẫn lưu trữ", chẳng hạn như "My Nut Cloud".')
    if (host.includes('nextcloud') || serverUrl.includes('/remote.php/dav')) return tText('Nextcloud làm ơn「đường dẫn lưu trữ」Điền tên thư mục đích.', 'Nextcloud Vui lòng điền tên thư mục đích vào "Đường dẫn lưu trữ".')
    if (host.includes('owncloud') || serverUrl.includes('/remote.php/webdav')) return tText('ownCloud làm ơn「đường dẫn lưu trữ」Điền tên thư mục đích.', 'ownCloud Vui lòng điền tên thư mục đích vào "Đường dẫn lưu trữ".')
  } catch {
    /* ignore */
  }
  return tText('làm ơn「đường dẫn lưu trữ」Điền vào tên thư mục hiện có.', 'Vui lòng điền tên thư mục hiện có vào "Storage Path".')
}

export const useWebdav = () => {
  const webdavConfig = config
  const webdavTestStatus = testStatus
  const webdavTestError = testError

  const webdavReady = computed(() => config.value.enabled && testStatus.value === 'success')

  const saveConfig = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config.value))
  }

  /** 确保 URL 末尾带 / */
  const normalizeUrl = (url: string): string => {
    const trimmed = url.trim().replace(/\/+$/, '')
    return trimmed ? trimmed + '/' : ''
  }

  /** 拼接 serverUrl + path 得到完整目录 URL（对路径段做 percent-encode 以支持中文) */
  const fullDirUrl = (): string => {
    const base = normalizeUrl(config.value.serverUrl)
    const sub = config.value.path.trim().replace(/^\/+|\/+$/g, '')
    if (!sub) return base
    const encoded = sub
      .split('/')
      .map(s => encodeURIComponent(s))
      .join('/')
    return base + encoded + '/'
  }

  /** 生成 Basic Auth header */
  const authHeaders = (): Record<string, string> => ({
    Authorization: 'Basic ' + btoa(config.value.username + ':' + config.value.password)
  })

  /** 远程文件路径 */
  const remoteFilePath = (slot: number): string => fullDirUrl() + `taoyuan_save_${slot}.tyx`

  /** 根据状态码设置测试错误提示 */
  const setTestErrorByStatus = (status: number, phase?: string) => {
    const prefix = phase ? `${phase}:` : ''
    if (status === 401 || status === 403) {
      testError.value = prefix + tText('Xác thực không thành công, vui lòng kiểm tra tên người dùng và mật khẩu', 'Xác thực không thành công, vui lòng kiểm tra tên người dùng và mật khẩu')
    } else if (status === 404 || status === 409) {
      testError.value = prefix + tText('Con đường không tồn tại.', 'Con đường không tồn tại.') + getPathHint(config.value.serverUrl)
    } else if (status === 405 || status === 501) {
      testError.value = prefix + tText('Máy chủ không hỗ trợ hiện tại WebDAV hoạt động', 'Máy chủ không hỗ trợ hoạt động WebDAV hiện tại')
    } else {
      testError.value = prefix + tText(`Máy chủ trả về ${status}`, `Máy chủ trả về ${status}`)
    }
    pushTrace(tText(`thử nghiệm thất bại ${prefix}${status}`, `Kiểm tra không thành công ${prefix}${status}`))
  }

  /** 原生平台连接探测:thử PUT tập tin tạm thời并在成功后 DELETE */
  const probeNativeWritable = async (dirUrl: string): Promise<{ status: number; error: string }> => {
    // 避免使用点前缀隐藏文件名，一些 WebDAV 服务会拒绝该类文件
    const probeUrl = dirUrl + `taoyuan_probe_${Date.now()}.tyx`
    pushTrace(tText('Phát hiện bản địa: thử PUT tập tin tạm thời', 'Phát hiện gốc: thử tệp tạm thời PUT'))
    try {
      const putRes = await webdavFetch(
        probeUrl,
        'PUT',
        {
          ...authHeaders(),
          'Content-Type': 'application/octet-stream'
        },
        'probe'
      )
      if (putRes.status >= 200 && putRes.status < 300) {
        try {
          pushTrace(tText('Phát hiện bản địa:PUT thành công, cố gắng DELETE tập tin tạm thời', 'Phát hiện gốc: PUT thành công, thử XÓA tệp tạm thời'))
          await webdavFetch(probeUrl, 'DELETE', authHeaders())
        } catch {
          /* 忽略清理失败，避免影响测试结果 */
          pushTrace(tText('Phát hiện bản địa:DELETE Dọn dẹp không thành công (bỏ qua)', 'Thăm dò gốc: DELETE dọn dẹp không thành công (bỏ qua)'))
        }
      }
      return { status: putRes.status, error: '' }
    } catch (e: unknown) {
      const msg = normalizeUserError(extractErrorMessage(e))
      pushTrace(tText(`Ngoại lệ phát hiện gốc:${msg}`, `Ngoại lệ phát hiện gốc: ${msg}`))
      return { status: 0, error: msg }
    }
  }

  /** 测试连接:Web/Electron 优先 PROPFIND；原生平台先 HEAD，失败后 fallback 到 PUT+DELETE 探测 */
  const testConnection = async (): Promise<boolean> => {
    clearTrace()
    testStatus.value = 'testing'
    testError.value = ''
    pushTrace(tText(`Bắt đầu kiểm tra kết nối (platform=${Capacitor.getPlatform()})`, `Bắt đầu kết nối thử nghiệm (platform=${Capacitor.getPlatform()})`))
    try {
      const base = normalizeUrl(config.value.serverUrl)
      if (!base) {
        testStatus.value = 'failed'
        testError.value = tText('Địa chỉ máy chủ trống', 'Địa chỉ máy chủ trống')
        pushTrace(tText('Lỗi: Địa chỉ máy chủ trống', 'Lỗi: Địa chỉ máy chủ trống'))
        return false
      }
      const url = fullDirUrl()
      const isNative = Capacitor.isNativePlatform()
      pushTrace(tText(`thư mục đích ${formatUrlForLog(url)}`, `Thư mục đích ${formatUrlForLog(url)}`))

      if (!isNative) {
        pushTrace(tText('Chiến lược:PROPFIND Danh mục thử nghiệm', 'Chiến lược: Thư mục phát hiện PROPFIND'))
        const res = await webdavFetch(url, 'PROPFIND', { ...authHeaders(), Depth: '0' })
        // 大多数 WebDAV 返回 207，部分实现可能返回 200
        if (res.status === 207 || res.status === 200) {
          testStatus.value = 'success'
          pushTrace(tText('Kiểm tra thành công', 'Kiểm tra thành công'))
          return true
        }
        testStatus.value = 'failed'
        setTestErrorByStatus(res.status, 'PROPFIND')
        return false
      }

      // 原生平台bỏ qua HEAD:Android 上 HEAD 失败时常只抛 URL 文本bất thường，无法稳定拿到状态码
      pushTrace(tText('Chiến lược:PUT Phát hiện khả năng ghi thư mục (bị Android bỏ qua) HEAD)', 'Chiến lược: PUT phát hiện khả năng ghi thư mục (Android bỏ qua HEAD)'))
      const probe = await probeNativeWritable(url)
      if (probe.status >= 200 && probe.status < 300) {
        testStatus.value = 'success'
        pushTrace(tText('kiểm tra thành công (PUT phát hiện)', 'Kiểm tra thành công (thăm dò PUT)'))
        return true
      }

      if (probe.status > 0) {
        testStatus.value = 'failed'
        setTestErrorByStatus(probe.status, 'PUT')
        return false
      }

      testStatus.value = 'failed'
      testError.value = probe.error || tText('Kết nối không thành công (PUT phát hiện sự bất thường)', 'Kết nối không thành công (ngoại lệ phát hiện PUT)')
      pushTrace(testError.value)
      return false
    } catch (e: unknown) {
      testStatus.value = 'failed'
      const msg = normalizeUserError(extractErrorMessage(e))
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('fetch')) {
        testError.value = tText('Lỗi mạng, vui lòng kiểm tra xem địa chỉ có chính xác không', 'Lỗi mạng, vui lòng kiểm tra xem địa chỉ có chính xác không')
      } else {
        testError.value = msg || tText('Kết nối không thành công', 'Kết nối không thành công')
      }
      pushTrace(tText(`Thất bại với ngoại lệ:${testError.value}`, `Ngoại lệ không thành công: ${testError.value}`))
      return false
    }
  }

  /** 确保远程目录存在（MKCOL)，已存在时 405/409 属正常情况 */
  const ensureDirectory = async (): Promise<void> => {
    // CapacitorHttp 基于 HttpURLConnection，不支持 MKCOL
    if (Capacitor.isNativePlatform()) {
      pushTrace(tText('bỏ qua MKCOL: Không được hỗ trợ bởi nền tảng gốc', 'Bỏ qua MKCOL: Không được hỗ trợ trên nền tảng gốc'))
      return
    }
    const url = fullDirUrl()
    if (!url) return
    try {
      pushTrace(tText('thử MKCOL Tạo thư mục', 'Hãy thử MKCOL để tạo một thư mục'))
      await webdavFetch(url, 'MKCOL', authHeaders())
    } catch {
      /* 忽略:目录创建失败不阻塞上传流程 */
      pushTrace(tText('MKCOL thất bại (bỏ qua)', 'MKCOL không thành công (bỏ qua)'))
    }
  }

  /** 上传Lưu trữ到 WebDAV */
  const uploadSave = async (slot: number): Promise<{ success: boolean; message: string }> => {
    pushTrace(tText(`Bắt đầu tải lên slot=${slot}`, `Tải lên bắt đầu slot=${slot}`))
    const raw = localStorage.getItem(`${SAVE_KEY_PREFIX}${slot}`)
    if (!raw) return { success: false, message: tText('Kho lưu trữ cục b��� không tồn tại.', 'Kho lưu trữ cục bộ không tồn tại.') }
    try {
      let res = await webdavFetch(
        remoteFilePath(slot),
        'PUT',
        {
          ...authHeaders(),
          'Content-Type': 'application/octet-stream'
        },
        raw
      )
      // 404 通常是远程目录不存在，Web/Electron 端thử MKCOL 创建后重试
      if (res.status === 404 && !Capacitor.isNativePlatform()) {
        await ensureDirectory()
        res = await webdavFetch(
          remoteFilePath(slot),
          'PUT',
          {
            ...authHeaders(),
            'Content-Type': 'application/octet-stream'
          },
          raw
        )
      }
      if (res.status >= 200 && res.status < 300) {
        pushTrace(tText(`Tải lên thành công slot=${slot}`, `Tải lên vị trí thành công=${slot}`))
        return { success: true, message: tText(`Lưu trữ ${slot + 1} Đã tải lên đám mây.`, `Lưu trữ ${slot + 1} đã được tải lên đám mây. `) }
      }
      if (Capacitor.isNativePlatform() && (res.status === 404 || res.status === 409)) {
        return {
          success: false,
          message: tText('Đường dẫn tải lên không hợp lệ.Android Máy khách không hỗ trợ tạo thư mục tự động. Vui lòng tạo thư mục trên đĩa mạng trước.', 'Đường dẫn tải lên không hợp lệ. Phía Android không hỗ trợ tạo thư mục tự động. Vui lòng tạo thư mục trên đĩa mạng trước.') + getPathHint(config.value.serverUrl)
        }
      }
      if (res.status === 404) {
        return { success: false, message: tText('Đường dẫn tải lên không hợp lệ.', 'Đường dẫn tải lên không hợp lệ.') + getPathHint(config.value.serverUrl) }
      }
      pushTrace(tText(`Tải lên không thành công slot=${slot} status=${res.status}`, `Tải lên vị trí không thành công=${slot} status=${res.status}`))
      return { success: false, message: tText(`Tải lên không thành công (${res.status}).`, `Tải lên không thành công (${res.status}). `) }
    } catch (e: unknown) {
      const msg = normalizeUserError(extractErrorMessage(e))
      pushTrace(tText(`Tải lên ngoại lệ slot=${slot} ${msg}`, `Tải lên vị trí ngoại lệ=${slot} ${msg}`))
      return { success: false, message: tText(`Tải lên không thành công:${msg}`, `Tải lên không thành công: ${msg}`) }
    }
  }

  /** 从 WebDAV 下载Lưu trữ */
  const downloadSave = async (slot: number): Promise<{ success: boolean; message: string }> => {
    pushTrace(tText(`Bắt đầu tải xuống slot=${slot}`, `Tải xuống bắt đầu slot=${slot}`))
    try {
      const res = await webdavFetch(remoteFilePath(slot), 'GET', authHeaders())
      if (res.status === 404) {
        return { success: false, message: tText(`Không có kho lưu trữ trên đám mây ${slot + 1}.`, `Lưu trữ ${slot + 1} không tồn tại trên đám mây. `) }
      }
      if (res.status < 200 || res.status >= 300) {
        return { success: false, message: tText(`Tải xuống không thành công (${res.status}).`, `Tải xuống không thành công (${res.status}). `) }
      }
      if (!parseSaveData(res.data)) {
        return { success: false, message: tText('Dữ liệu lưu trên đám mây không hợp lệ hoặc bị hỏng.', 'Dữ liệu lưu trên đám mây không hợp lệ hoặc bị hỏng.') }
      }
      localStorage.setItem(`${SAVE_KEY_PREFIX}${slot}`, res.data)
      pushTrace(tText(`Tải xuống thành công slot=${slot}`, `Tải xuống thành công slot=${slot}`))
      return { success: true, message: tText(`Lưu trữ ${slot + 1} Đã tải xuống từ đám mây.`, `Lưu trữ ${slot + 1} đã được tải xuống từ đám mây. `) }
    } catch (e: unknown) {
      const msg = normalizeUserError(extractErrorMessage(e))
      pushTrace(tText(`Tải xuống ngoại lệ slot=${slot} ${msg}`, `Tải xuống vị trí ngoại lệ=${slot} ${msg}`))
      return { success: false, message: tText(`Tải xuống không thành công:${msg}`, `Tải xuống không thành công: ${msg}`) }
    }
  }

  /** 列出远程Lưu trữ是否存在 */
  const listRemoteSaves = async (): Promise<{ slot: number; exists: boolean }[]> => {
    pushTrace(tText('Bắt đầu liệt kê các kho lưu trữ từ xa', 'Bắt đầu liệt kê các kho lưu trữ từ xa'))
    const results: { slot: number; exists: boolean }[] = []
    const isNative = Capacitor.isNativePlatform()
    for (let i = 0; i < MAX_SLOTS; i++) {
      try {
        // 一些 WebDAV 服务对 HEAD 支持不完整，原生平台改用 GET 判断文件存在
        const method = isNative ? 'GET' : 'HEAD'
        const res = await webdavFetch(remoteFilePath(i), method, authHeaders())
        pushTrace(tText(`khe cắm từ xa slot=${i} status=${res.status}`, `Khe cắm từ xa=${i} status=${res.status}`))
        results.push({ slot: i, exists: res.status >= 200 && res.status < 300 })
      } catch {
        pushTrace(tText(`khe cắm từ xa slot=${i} Yêu cầu ngoại lệ`, `Vị trí khe cắm từ xa=${i} yêu cầu ngoại lệ`))
        results.push({ slot: i, exists: false })
      }
    }
    return results
  }

  return {
    webdavConfig,
    webdavTestStatus,
    webdavTestError,
    webdavTraceLogs: traceLogs,
    webdavReady,
    saveConfig,
    clearTrace,
    testConnection,
    uploadSave,
    downloadSave,
    listRemoteSaves
  }
}
