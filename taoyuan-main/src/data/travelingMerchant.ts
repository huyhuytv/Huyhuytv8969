import { getWeekday } from './timeConstants'
import { CROPS } from './crops'
import { getItemById } from './items'
import type { Season } from '@/types'

/** 旅行商人商品定义 */
export interface TravelingMerchantItem {
  itemId: string
  name: string
  basePrice: number // Giá bán của thương gia (khoảng sellPrice của 2-3 lần phí bảo hiểm)
}

/** 旅行商人当日库存 */
export interface TravelingMerchantStock {
  itemId: string
  name: string
  price: number // Giá bán bao gồm cả thả nổi ngẫu nhiên
  quantity: number // Số lượng còn lại có sẵn
}

/** 旅行商人商品池 */
export const TRAVELING_MERCHANT_POOL: TravelingMerchantItem[] = [
  // 稀有宝石
  { itemId: 'dragon_jade', name: 'Long Ngọc', basePrice: 800 },
  { itemId: 'prismatic_shard', name: 'Mảnh Vỡ Ngũ Sắc', basePrice: 1200 },
  { itemId: 'moonstone', name: 'Đá Nguyệt Quang', basePrice: 400 },
  // 稀有采集物
  { itemId: 'ginseng', name: 'Nhân Sâm', basePrice: 500 },
  { itemId: 'wintersweet', name: 'Hoa Mai', basePrice: 150 },
  // 特殊材料
  { itemId: 'iridium_ore', name: 'Quặng Iridium', basePrice: 700 },
  { itemId: 'cloth', name: 'Vải Vóc', basePrice: 1000 },
  // 稀有动物产品
  { itemId: 'rabbit_foot', name: 'Chân Thỏ May Mắn', basePrice: 1200 },
  { itemId: 'truffle', name: 'Nấm Truffle', basePrice: 1400 },
  // 特殊物品
  { itemId: 'rain_totem', name: 'Đồ Đằng Mưa', basePrice: 500 },
  { itemId: 'silk_ribbon', name: 'Khăn Lụa', basePrice: 500 }
]

/** 判断某天是否为旅行商人出摊日（周五/周日） */
export const isTravelingMerchantDay = (day: number): boolean => {
  const weekday = getWeekday(day)
  return weekday === 'fri' || weekday === 'sun'
}

/** 简单确定性伪随机数生成器 */
const seededRandom = (seed: number): (() => number) => {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

/** 根据游戏日期生成旅行商人当日库存 */
export const generateMerchantStock = (year: number, seasonIndex: number, day: number, currentSeason: Season): TravelingMerchantStock[] => {
  const seed = year * 10000 + seasonIndex * 1000 + day * 37
  const rng = seededRandom(seed)

  const stock: TravelingMerchantStock[] = []

  // 从通用池随机选取 3-4 件
  const shuffled = [...TRAVELING_MERCHANT_POOL].sort(() => rng() - 0.5)
  const generalCount = 3 + Math.floor(rng() * 2) // 3 hoặc 4
  for (let i = 0; i < Math.min(generalCount, shuffled.length); i++) {
    const item = shuffled[i]!
    const priceVariation = 0.85 + rng() * 0.3 // ±15% biến động giá
    let price = Math.floor(item.basePrice * priceVariation)
    // 防套利：商人售价不低于物品出售价của 2 倍
    const def = getItemById(item.itemId)
    if (def && def.sellPrice > 0) price = Math.max(price, def.sellPrice * 2)
    stock.push({
      itemId: item.itemId,
      name: item.name,
      price,
      quantity: 1 + Math.floor(rng() * 2) // 1-2 một
    })
  }

  // 从反季作物中选 1-2 种子
  const otherSeasonCrops = CROPS.filter(c => !c.season.includes(currentSeason) && c.seedPrice > 0)
  if (otherSeasonCrops.length > 0) {
    const shuffledCrops = [...otherSeasonCrops].sort(() => rng() - 0.5)
    const seedCount = 1 + Math.floor(rng() * 2) // 1 hoặc 2
    for (let i = 0; i < Math.min(seedCount, shuffledCrops.length); i++) {
      const crop = shuffledCrops[i]!
      stock.push({
        itemId: crop.seedId,
        name: `Hạt giống ${crop.name}`,
        price: Math.max(Math.floor(crop.seedPrice * 4), crop.sellPrice * 2), // 4 Tăng gấp đôi phí bảo hiểm trái vụ và không thấp hơn giá bán cây trồng×2
        quantity: 3 + Math.floor(rng() * 3) // 3-5 một
      })
    }
  }

  return stock
}
