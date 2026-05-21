import type { WalletItemDef } from '@/types'

/** 钱袋物品定义 */
export const WALLET_ITEMS: WalletItemDef[] = [
  {
    id: 'merchant_seal',
    name: 'Ấn Chương Thương Nhân',
    description: 'Giảm 10% giá mua hàng tại cửa hàng.',
    effect: { type: 'shopDiscount', value: 0.1 },
    unlockCondition: 'Tích lũy kiếm được 10000 xu'
  },
  {
    id: 'herb_guide',
    name: 'Thần Nông Bản Thảo',
    description: 'Tăng 1 bậc chất lượng vật phẩm thu thập.',
    effect: { type: 'forageQuality', value: 1 },
    unlockCondition: 'Cấp độ thu thập đạt 8'
  },
  {
    id: 'miners_charm',
    name: 'Bùa Thợ Mỏ',
    description: 'Giảm 15% thể lực tiêu hao khi đào mỏ.',
    effect: { type: 'miningStamina', value: 0.15 },
    unlockCondition: 'Đạt tầng 50 hang mỏ'
  },
  {
    id: 'anglers_token',
    name: 'Lệnh Bài Lão Ngư',
    description: 'Giảm 10% tốc độ di chuyển của cá trong minigame câu cá.',
    effect: { type: 'fishingCalm', value: 0.1 },
    unlockCondition: 'Câu được 30 loại cá khác nhau'
  },
  {
    id: 'chefs_hat',
    name: 'Mũ Đầu Bếp',
    description: 'Lượng hồi phục từ thức ăn nấu ra +25%.',
    effect: { type: 'cookingRestore', value: 0.25 },
    unlockCondition: 'Nấu 10 công thức món ăn khác nhau'
  },
  {
    id: 'earth_totem',
    name: 'Đồ Đằng Đất',
    description: 'Tốc độ sinh trưởng của cây trồng +10%.',
    effect: { type: 'cropGrowth', value: 0.1 },
    unlockCondition: 'Thu hoạch cây trồng 100 lần'
  },
  {
    id: 'trade_prosperity_seal',
    name: 'Kim Ấn Thông Thương',
    description: 'Điểm thông thương nhận được +20%.',
    effect: { type: 'tradeBonus', value: 0.2 },
    unlockCondition: 'Nhận qua đổi điểm thông thương'
  }
]

export const getWalletItemById = (id: string): WalletItemDef | undefined => {
  return WALLET_ITEMS.find(w => w.id === id)
}
