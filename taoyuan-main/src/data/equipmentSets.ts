import type { EquipmentEffectType } from '@/types'

/** 套装奖励档位 */
export interface SetBonusLevel {
  count: 2 | 3 | 4
  effects: { type: EquipmentEffectType; value: number }[]
  description: string
}

/** 装备套装定义 */
export interface EquipmentSetDef {
  id: string
  name: string
  description: string
  pieces: {
    weapon?: string
    ring: string
    hat: string
    shoe: string
  }
  bonuses: SetBonusLevel[]
}

export const EQUIPMENT_SETS: EquipmentSetDef[] = [
  // === 早期（商店可购买） ===
  {
    id: 'miner_set',
    name: 'Trang Phục Thợ Mỏ',
    description: 'Trang bị tiêu chuẩn của thợ mỏ chuyên nghiệp',
    pieces: { ring: 'miners_ring', hat: 'miner_helmet', shoe: 'miner_boots' },
    bonuses: [
      { count: 2, effects: [{ type: 'ore_bonus', value: 1 }], description: 'Quặng nhận thêm +1' },
      { count: 3, effects: [{ type: 'mining_stamina', value: 0.1 }], description: 'Thể lực đào mỏ tiêu hao -10%' }
    ]
  },
  {
    id: 'fisher_set',
    name: 'Trang Phục Ngư Phủ',
    description: 'Hành trang của ngư phủ dày dạn kinh nghiệm',
    pieces: { ring: 'anglers_ring', hat: 'fisher_hat', shoe: 'fishing_waders' },
    bonuses: [
      { count: 2, effects: [{ type: 'fish_quality_bonus', value: 0.1 }], description: 'Chất lượng cá +10%' },
      { count: 3, effects: [{ type: 'fishing_calm', value: 0.1 }], description: 'Ổn định khi câu cá +10%' }
    ]
  },

  // === 中期（铁匠铺合成） ===
  {
    id: 'merchant_set',
    name: 'Trang Phục Thương Gia',
    description: 'Hành trang làm ăn của thương nhân tinh anh',
    pieces: { ring: 'merchants_ring', hat: 'merchant_hat', shoe: 'merchant_boots' },
    bonuses: [
      { count: 2, effects: [{ type: 'sell_price_bonus', value: 0.05 }], description: 'Giá bán vật phẩm +5%' },
      { count: 3, effects: [{ type: 'shop_discount', value: 0.08 }], description: 'Giảm giá cửa hàng +8%' }
    ]
  },
  {
    id: 'harvest_set',
    name: 'Trang Phục Mùa Màng',
    description: 'Trang phục của nhà nông trong mùa thu hoạch',
    pieces: { ring: 'harvest_moon_ring', hat: 'jade_hairpin', shoe: 'silk_slippers' },
    bonuses: [
      { count: 2, effects: [{ type: 'crop_growth_bonus', value: 0.1 }], description: 'Tốc độ sinh trưởng cây trồng +10%' },
      { count: 3, effects: [{ type: 'crop_quality_bonus', value: 0.1 }], description: 'Chất lượng cây trồng +10%' }
    ]
  },
  {
    id: 'dragon_warrior_set',
    name: 'Trang Phục Chiến Long',
    description: 'Áo giáp chiến binh mang danh loài rồng',
    pieces: { ring: 'warlord_ring', hat: 'dragon_helm', shoe: 'dragon_scale_boots' },
    bonuses: [
      { count: 2, effects: [{ type: 'attack_bonus', value: 3 }], description: 'Lực tấn công +3' },
      { count: 3, effects: [{ type: 'crit_rate_bonus', value: 0.1 }], description: 'Tỷ lệ bạo kích +10%' }
    ]
  },
  {
    id: 'obsidian_set',
    name: 'Trang Phục Hắc Diện',
    description: 'Áo giáp hạng nặng rèn từ đá hắc diện',
    pieces: { ring: 'stalwart_ring', hat: 'obsidian_helm', shoe: 'obsidian_greaves' },
    bonuses: [
      { count: 2, effects: [{ type: 'max_hp_bonus', value: 20 }], description: 'HP tối đa +20' },
      { count: 3, effects: [{ type: 'defense_bonus', value: 0.1 }], description: 'Phòng ngự +10%' }
    ]
  },
  {
    id: 'phoenix_set',
    name: 'Trang Phục Phượng Hoàng',
    description: 'Phượng hoàng niết bàn, phúc vận gia thân',
    pieces: { ring: 'fortune_ring', hat: 'phoenix_crown', shoe: 'phoenix_boots' },
    bonuses: [
      { count: 2, effects: [{ type: 'luck', value: 0.05 }], description: 'May mắn +5%' },
      { count: 3, effects: [{ type: 'exp_bonus', value: 0.15 }], description: 'EXP nhận thêm +15%' }
    ]
  },

  // === 后期（BOSS掉落/怪物掉落） ===
  {
    id: 'shadow_set',
    name: 'Trang Phục Bóng Đêm',
    description: 'Trang bị của sát thủ luồn lách trong bóng đêm',
    pieces: { ring: 'shadow_ring', hat: 'shadow_mask', shoe: 'shadow_striders' },
    bonuses: [
      { count: 2, effects: [{ type: 'vampiric', value: 0.05 }], description: 'Hút máu +5%' },
      { count: 3, effects: [{ type: 'monster_drop_bonus', value: 0.15 }], description: 'Tỷ lệ rớt đồ +15%' }
    ]
  },
  {
    id: 'frost_queen_set',
    name: 'Trang Phục Băng Hậu',
    description: 'Di vật của Nữ Hoàng Băng Giá',
    pieces: { ring: 'frost_queen_circlet', hat: 'frost_queen_tiara', shoe: 'frost_queen_slippers' },
    bonuses: [
      { count: 2, effects: [{ type: 'fishing_calm', value: 0.1 }], description: 'Ổn định khi câu cá +10%' },
      { count: 3, effects: [{ type: 'monster_drop_bonus', value: 0.1 }], description: 'Tỷ lệ rớt đồ +10%' }
    ]
  },
  {
    id: 'dragon_king_set',
    name: 'Trang Phục Long Vương',
    description: 'Di sản tối cao của Long Vương Vực Thẳm',
    pieces: { ring: 'abyss_dragon_ring', hat: 'abyss_dragon_horns', shoe: 'abyss_dragon_treads' },
    bonuses: [
      { count: 2, effects: [{ type: 'attack_bonus', value: 5 }], description: 'Lực tấn công +5' },
      {
        count: 3,
        effects: [
          { type: 'vampiric', value: 0.08 },
          { type: 'defense_bonus', value: 0.08 }
        ],
        description: 'Hút máu +8%, Phòng ngự +8%'
      }
    ]
  },

  // === 竹林猎手（竹林野兽材料合成） ===
  {
    id: 'forest_hunter_set',
    name: 'Trang Phục Thợ Săn Rừng Trúc',
    description: 'Trang bị thợ săn chế tạo từ da cốt của mãnh thú rừng trúc',
    pieces: { ring: 'wolf_fang_pendant', hat: 'wolf_pelt_hood', shoe: 'bear_pelt_boots' },
    bonuses: [
      { count: 2, effects: [{ type: 'attack_bonus', value: 3 }], description: 'Lực tấn công +3' },
      {
        count: 3,
        effects: [
          { type: 'crit_rate_bonus', value: 0.08 },
          { type: 'monster_drop_bonus', value: 0.1 }
        ],
        description: 'Tỷ lệ bạo kích +8%, Tỷ lệ rớt đồ +10%'
      }
    ]
  },
  {
    id: 'beast_king_set',
    name: 'Trang Phục Thú Vương',
    description: 'Chiến lợi phẩm từ vua của rừng trúc, thể hiện trọn vẹn vinh quang thợ săn',
    pieces: { ring: 'tiger_fang_ring', hat: 'tiger_pelt_cape', shoe: 'bear_pelt_boots' },
    bonuses: [
      { count: 2, effects: [{ type: 'attack_bonus', value: 5 }], description: 'Lực tấn công +5' },
      {
        count: 3,
        effects: [
          { type: 'vampiric', value: 0.06 },
          { type: 'defense_bonus', value: 0.08 }
        ],
        description: 'Hút máu +6%, Phòng ngự +8%'
      }
    ]
  },

  // === 公会专属 ===
  {
    id: 'guild_champion_set',
    name: 'Trang Phục Dũng Sĩ Công Hội',
    description: 'Trang bị chuyên dụng của chiến binh tinh anh Công hội Mạo Hiểm Giả',
    pieces: { weapon: 'guild_war_blade', ring: 'guild_war_ring', hat: 'guild_war_helm', shoe: 'guild_war_boots' },
    bonuses: [
      { count: 2, effects: [{ type: 'attack_bonus', value: 3 }], description: 'Lực tấn công +3' },
      {
        count: 3,
        effects: [
          { type: 'defense_bonus', value: 0.08 },
          { type: 'max_hp_bonus', value: 20 }
        ],
        description: 'Phòng ngự +8%, HP +20'
      },
      {
        count: 4,
        effects: [
          { type: 'vampiric', value: 0.08 },
          { type: 'crit_rate_bonus', value: 0.05 }
        ],
        description: 'Hút máu +8%, Tỷ lệ bạo kích +5%'
      }
    ]
  }
]

/** 根据装备ID查找所属套装 */
export const getSetByPieceId = (defId: string): EquipmentSetDef | undefined => {
  return EQUIPMENT_SETS.find(s => s.pieces.weapon === defId || s.pieces.ring === defId || s.pieces.hat === defId || s.pieces.shoe === defId)
}
