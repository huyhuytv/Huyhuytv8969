import type { MuseumItemDef, MuseumMilestone } from '@/types'

/** 博物馆可捐赠物品全目录 */
export const MUSEUM_ITEMS: MuseumItemDef[] = [
  // ===== 矿石 (7) =====
  { id: 'copper_ore', name: 'Quặng đồng', category: 'ore', sourceHint: 'Thu thập tầng nông hang mỏ' },
  { id: 'iron_ore', name: 'Quặng sắt', category: 'ore', sourceHint: 'Thu thập tầng băng giá hang mỏ' },
  { id: 'gold_ore', name: 'Quặng vàng', category: 'ore', sourceHint: 'Thu thập tầng dung nham hang mỏ' },
  { id: 'crystal_ore', name: 'Quặng pha lê', category: 'ore', sourceHint: 'Thu thập tầng pha lê hang mỏ' },
  { id: 'shadow_ore', name: 'Quặng bóng tối', category: 'ore', sourceHint: 'Thu thập tầng bóng tối hang mỏ' },
  { id: 'void_ore', name: 'Quặng hư không', category: 'ore', sourceHint: 'Thu thập tầng vực thẳm hang mỏ' },
  { id: 'iridium_ore', name: 'Quặng Iridium', category: 'ore', sourceHint: 'Thu thập huyệt mỏ Đầu Lâu' },

  // ===== 宝石 (7) =====
  { id: 'quartz', name: 'Thạch anh', category: 'gem', sourceHint: 'Thu thập các tầng hang mỏ' },
  { id: 'jade', name: 'Phỉ thúy', category: 'gem', sourceHint: 'Dưới tầng băng giá hang mỏ' },
  { id: 'ruby', name: 'Hồng ngọc', category: 'gem', sourceHint: 'Dưới tầng dung nham hang mỏ' },
  { id: 'moonstone', name: 'Đá Nguyệt Quang', category: 'gem', sourceHint: 'Tầng pha lê hang mỏ' },
  { id: 'obsidian', name: 'Đá hắc diện', category: 'gem', sourceHint: 'Tầng bóng tối hang mỏ' },
  { id: 'dragon_jade', name: 'Long Ngọc', category: 'gem', sourceHint: 'Tầng vực thẳm hang mỏ' },
  { id: 'prismatic_shard', name: 'Mảnh Vỡ Ngũ Sắc', category: 'gem', sourceHint: 'Cực kỳ quý hiếm, rương báu tầng sâu' },

  // ===== 金属锭 (4) =====
  { id: 'copper_bar', name: 'Thỏi Đồng', category: 'bar', sourceHint: 'Lò nung luyện quặng đồng' },
  { id: 'iron_bar', name: 'Thỏi Sắt', category: 'bar', sourceHint: 'Lò nung luyện quặng sắt' },
  { id: 'gold_bar', name: 'Thỏi Vàng', category: 'bar', sourceHint: 'Lò nung luyện quặng vàng' },
  { id: 'iridium_bar', name: 'Thỏi Iridium', category: 'bar', sourceHint: 'Lò nung luyện quặng Iridium' },

  // ===== 化石 (8) =====
  { id: 'trilobite_fossil', name: 'Hóa thạch bọ ba thùy', category: 'fossil', sourceHint: 'Rương báu tầng nông/tầng băng giá' },
  { id: 'amber', name: 'Hổ phách', category: 'fossil', sourceHint: 'Rớt từ tầng sông ngầm hang mỏ' },
  { id: 'ammonite_fossil', name: 'Hóa thạch cúc đá', category: 'fossil', sourceHint: 'Rương báu tầng dung nham/tầng pha lê' },
  { id: 'fern_fossil', name: 'Hóa thạch lá dương xỉ', category: 'fossil', sourceHint: 'Thu thập quý hiếm rừng trúc' },
  { id: 'shell_fossil', name: 'Hóa thạch vỏ ốc', category: 'fossil', sourceHint: 'Rương báu tầng nông/tầng băng giá' },
  { id: 'bone_fragment', name: 'Mảnh vụn xương cốt', category: 'fossil', sourceHint: 'Rớt quý hiếm từ quái vật tầng sâu' },
  { id: 'petrified_wood', name: 'Gỗ hóa đá', category: 'fossil', sourceHint: 'Thu thập quý hiếm rừng trúc' },
  { id: 'dragon_tooth', name: 'Hóa thạch nanh rồng', category: 'fossil', sourceHint: 'Rương báu tầng vực thẳm hoặc Cốt Long rơi' },

  // ===== 古物 (10) =====
  { id: 'ancient_pottery', name: 'Mảnh gốm cổ', category: 'artifact', sourceHint: 'Thu thập quý hiếm rừng trúc' },
  { id: 'jade_disc', name: 'Mảnh vỡ ngọc bích', category: 'artifact', sourceHint: 'Rương báu tầng pha lê' },
  { id: 'bronze_mirror', name: 'Gương đồng', category: 'artifact', sourceHint: 'Rương báu tầng dung nham' },
  { id: 'ancient_coin', name: 'Đồng tiền cổ', category: 'artifact', sourceHint: 'Rớt từ tầng sông ngầm hang mỏ' },
  { id: 'oracle_bone', name: 'Mảnh giáp cốt', category: 'artifact', sourceHint: 'Rương báu tầng bóng tối' },
  { id: 'jade_pendant', name: 'Ngọc bội', category: 'artifact', sourceHint: 'Rớt từ tầng pha lê' },
  { id: 'ancient_seed', name: 'Hạt giống viễn cổ', category: 'artifact', sourceHint: 'Cực kỳ hiếm từ rương báu tầng sâu' },
  { id: 'bamboo_scroll', name: 'Thẻ tre', category: 'artifact', sourceHint: 'Thu thập quý hiếm rừng trúc' },
  { id: 'stone_axe_head', name: 'Rìu đá', category: 'artifact', sourceHint: 'Thu thập quý hiếm rừng trúc' },
  { id: 'painted_pottery', name: 'Mảnh gốm màu', category: 'artifact', sourceHint: 'Rương báu tầng dung nham' },

  // ===== 仙灵 (4) =====
  { id: 'fox_bead', name: 'Hồ châu', category: 'spirit', sourceHint: 'Sâu trong mỏ (Manh mối liên quan đến Hồ Tiên)' },
  { id: 'spirit_peach', name: 'Linh đào', category: 'spirit', sourceHint: 'Có tỷ lệ sản sinh từ cây đào được Đào Yêu chúc phúc' },
  { id: 'moon_herb', name: 'Nguyệt thảo', category: 'spirit', sourceHint: 'Có tỷ lệ nhận được khi thu hoạch sau khi được Nguyệt Thỏ chúc phúc' },
  { id: 'dream_silk', name: 'Mộng ty', category: 'spirit', sourceHint: 'Có tỷ lệ sản sinh từ máy dệt sau khi được Quy Nữ chúc phúc' }
]

/** 博物馆分类标签 */
export const MUSEUM_CATEGORIES = [
  { key: 'ore' as const, label: 'Quặng đá' },
  { key: 'gem' as const, label: 'Đá quý' },
  { key: 'bar' as const, label: 'Thỏi kim loại' },
  { key: 'fossil' as const, label: 'Hóa thạch' },
  { key: 'artifact' as const, label: 'Cổ vật' },
  { key: 'spirit' as const, label: 'Tiên linh' }
]

/** 博物馆里程碑奖励 */
export const MUSEUM_MILESTONES: MuseumMilestone[] = [
  { count: 5, name: 'Sơ bộ nhập môn', reward: { money: 300 } },
  { count: 10, name: 'Có chút sưu tầm', reward: { money: 500, items: [{ itemId: 'ancient_seed', quantity: 1 }] } },
  { count: 15, name: 'Nhà giám thưởng quặng đá', reward: { money: 1000 } },
  { count: 20, name: 'Bác cổ thông kim', reward: { money: 1500, items: [{ itemId: 'prismatic_shard', quantity: 1 }] } },
  { count: 25, name: 'Người bảo hộ cổ vật', reward: { money: 3000 } },
  { count: 30, name: 'Thám hiểm viễn cổ', reward: { money: 5000, items: [{ itemId: 'iridium_bar', quantity: 3 }] } },
  { count: 36, name: 'Ngôi sao bảo tàng', reward: { money: 10000 } },
  { count: 40, name: 'Linh vật toàn giám', reward: { money: 8000, items: [{ itemId: 'moonstone', quantity: 3 }] } }
]

/** 根据ID查找博物馆物品 */
export const getMuseumItemById = (id: string): MuseumItemDef | undefined => MUSEUM_ITEMS.find(item => item.id === id)
