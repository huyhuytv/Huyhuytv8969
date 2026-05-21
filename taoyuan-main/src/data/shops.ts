import type { Weather, Season, Weekday } from '@/types'
import { getWeekday } from './timeConstants'

/** 商铺定义 */
export interface ShopDef {
  id: string
  name: string
  description: string
  npcName: string
  closedDays: Weekday[]
  openHour: number
  closeHour: number
  closedWeathers: Weather[]
  closedSeasons: Season[]
}

/** 六大商铺 */
export const SHOPS: ShopDef[] = [
  {
    id: 'wanwupu',
    name: 'Tiệm Vạn Vật',
    description: 'Tiệm tạp hóa do Bác Trần kinh doanh, bán hạt giống và nhu yếu phẩm hàng ngày.',
    npcName: 'Bác Trần',
    closedDays: ['wed'],
    openHour: 8,
    closeHour: 20,
    closedWeathers: [],
    closedSeasons: []
  },
  {
    id: 'tiejiangpu',
    name: 'Tiệm Rèn',
    description: 'Tiệm rèn của Thợ rèn Tôn, bán quặng và các sản phẩm từ kim loại.',
    npcName: 'Thợ rèn Tôn',
    closedDays: ['sun'],
    openHour: 7,
    closeHour: 18,
    closedWeathers: [],
    closedSeasons: []
  },
  {
    id: 'biaoju',
    name: 'Tiêu Cục',
    description: 'Cơ quan hộ tống do Yunfei mở bán vũ khí và vật tư chiến đấu.',
    npcName: 'Vân Phi',
    closedDays: [],
    openHour: 10,
    closeHour: 22,
    closedWeathers: ['stormy'],
    closedSeasons: []
  },
  {
    id: 'yugupu',
    name: 'Tiệm Đồ Câu',
    description: 'Cửa hàng đồ câu nhỏ của Thu Nguyệt, bán mồi và phao câu.',
    npcName: 'Thu Nguyệt',
    closedDays: ['mon', 'tue'],
    openHour: 6,
    closeHour: 17,
    closedWeathers: ['stormy'],
    closedSeasons: []
  },
  {
    id: 'yaopu',
    name: 'Tiệm Thuốc',
    description: 'Tiệm thuốc của Lâm Lão, bán phân bón và thảo dược.',
    npcName: 'Lâm Lão',
    closedDays: [],
    openHour: 8,
    closeHour: 20,
    closedWeathers: ['stormy'],
    closedSeasons: ['winter']
  },
  {
    id: 'chouduanzhuang',
    name: 'Trang Viên Tơ Lụa',
    description: 'Tiệm tơ lụa của Tố Tố, bán vải vóc và quà tặng tinh xảo.',
    npcName: 'Tố Tố',
    closedDays: ['sat', 'sun'],
    openHour: 9,
    closeHour: 18,
    closedWeathers: [],
    closedSeasons: []
  }
]

/** 根据 ID 查找商铺 */
export const getShopById = (id: string): ShopDef | undefined => {
  return SHOPS.find(s => s.id === id)
}

/** 判断商铺是否营业中 */
export const isShopAvailable = (shop: ShopDef, day: number, hour: number, weather: Weather, season: Season): boolean => {
  const weekday = getWeekday(day)
  if (shop.closedDays.includes(weekday)) return false
  if (hour < shop.openHour || hour >= shop.closeHour) return false
  if (shop.closedWeathers.length > 0 && shop.closedWeathers.includes(weather)) return false
  if (shop.closedSeasons.length > 0 && shop.closedSeasons.includes(season)) return false
  return true
}

/** 获取商铺关闭原因 */
export const getShopClosedReason = (shop: ShopDef, day: number, hour: number, weather: Weather, season: Season): string => {
  const weekday = getWeekday(day)
  if (shop.closedSeasons.length > 0 && shop.closedSeasons.includes(season)) {
    return 'Nghỉ bán mùa này'
  }
  if (shop.closedWeathers.length > 0 && shop.closedWeathers.includes(weather)) {
    return 'Nghỉ do lý do thời tiết'
  }
  if (shop.closedDays.includes(weekday)) {
    return 'Hôm nay nghỉ'
  }
  if (hour < shop.openHour) {
    return `Mở cửa lúc ${shop.openHour} giờ`
  }
  if (hour >= shop.closeHour) {
    return 'Đã đóng cửa'
  }
  return ''
}
