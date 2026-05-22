import { DefineLocaleMessage } from 'vue-i18n'

interface Window {
  __WEBVIEW__?: boolean
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, ...args: any[]) => string
  }
}
