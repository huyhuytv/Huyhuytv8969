import type { ItemDef, ItemCategory } from '@/types/item'
import { CROPS } from './crops'
import { FISH } from './fish'
import { RECIPES } from './recipes'
import { PROCESSING_MACHINES, SPRINKLERS, FERTILIZERS, BAITS, TACKLES, BOMBS } from './processing'
import { FRUIT_TREE_DEFS } from './fruitTrees'
import { WEAPONS, getWeaponSellPrice } from './weapons'
import { RINGS } from './rings'
import { HATS } from './hats'
import { SHOES } from './shoes'

/** 从作物定义自动生成种子物品（排除已手动定义的种子） */
const SEED_ITEMS: ItemDef[] = CROPS.filter(
  crop => crop.seedId !== 'ancient_seed' && crop.seedId !== 'hanhai_cactus_seed' && crop.seedId !== 'hanhai_date_seed'
).map(crop => ({
  id: crop.seedId,
  name: `Hạt giống ${crop.name}`,
  category: 'seed',
  description: `Hạt giống của ${crop.name}, có thể gieo trồng vào mùa ${crop.season
    .map(s => {
      const names: Record<string, string> = { spring: 'Xuân', summer: 'Hè', autumn: 'Thu', winter: 'Đông' }
      return names[s]
    })
    .join('/')}Có thể trồng theo mùa.`,
  sellPrice: Math.floor(crop.seedPrice / 2),
  edible: false
}))

/** 从作物定义自动生成收获物品 */
const CROP_ITEMS: ItemDef[] = CROPS.map(crop => ({
  id: crop.id,
  name: crop.name,
  category: 'crop',
  description: crop.description,
  sellPrice: Math.floor(crop.sellPrice * 1.5),
  edible: true,
  staminaRestore: Math.floor(crop.sellPrice / 5),
  healthRestore: Math.floor(crop.sellPrice / 10)
}))

/** 矿石物品 */
const ORE_ITEMS: ItemDef[] = [
  { id: 'copper_ore', name: 'Quặng đồng', category: 'ore', description: 'Quặng kim loại thường gặp.', sellPrice: 5, edible: false },
  { id: 'iron_ore', name: 'Quặng sắt', category: 'ore', description: 'Quặng sắt cứng cáp.', sellPrice: 10, edible: false },
  { id: 'gold_ore', name: 'Quặng vàng', category: 'ore', description: 'Quặng vàng quý giá.', sellPrice: 18, edible: false },
  { id: 'crystal_ore', name: 'Quặng pha lê', category: 'ore', description: 'Quặng pha lê khúc xạ ánh sáng.', sellPrice: 30, edible: false },
  { id: 'shadow_ore', name: 'Quặng bóng tối', category: 'ore', description: 'Quặng bí ẩn màu đen bóng nặng nề.', sellPrice: 45, edible: false },
  { id: 'void_ore', name: 'Quặng hư không', category: 'ore', description: 'Quặng đá đến từ tận cùng vực thẳm.', sellPrice: 60, edible: false },
  { id: 'iridium_ore', name: 'Quặng Iridium', category: 'ore', description: 'Quặng kim loại cứng và hiếm nhất.', sellPrice: 80, edible: false },
  { id: 'quartz', name: 'Thạch anh', category: 'gem', description: 'Thạch anh trong suốt lấp lánh.', sellPrice: 10, edible: false },
  { id: 'jade', name: 'Phỉ thúy', category: 'gem', description: 'Phỉ thúy ôn nhuận.', sellPrice: 30, edible: false },
  { id: 'ruby', name: 'Hồng ngọc', category: 'gem', description: 'Hồng ngọc tỏa sáng rực rỡ.', sellPrice: 45, edible: false },
  { id: 'moonstone', name: 'Đá Nguyệt Quang', category: 'gem', description: 'Đá quý tỏa ra ánh sáng dịu nhẹ.', sellPrice: 65, edible: false },
  { id: 'obsidian', name: 'Đá hắc diện', category: 'gem', description: 'Thủy tinh núi lửa tối tăm như vực thẳm.', sellPrice: 90, edible: false },
  { id: 'dragon_jade', name: 'Long Ngọc', category: 'gem', description: 'Thần ngọc ngưng tụ từ long mạch trong truyền thuyết.', sellPrice: 120, edible: false },
  { id: 'prismatic_shard', name: 'Mảnh Vỡ Ngũ Sắc', category: 'gem', description: 'Mảnh vỡ chứa đựng năng lượng viễn cổ.', sellPrice: 180, edible: false },
  { id: 'battery', name: 'Bộ Pin', category: 'material', description: 'Năng lượng sản sinh sau khi cột thu lôi hấp thụ sấm sét.', sellPrice: 100, edible: false }
]

/** 杂项 */
const MISC_ITEMS: ItemDef[] = [
  { id: 'wood', name: 'Gỗ', category: 'material', description: 'Nguyên liệu cơ bản để xây dựng và chế tạo.', sellPrice: 5, edible: false },
  { id: 'bamboo', name: 'Tre trúc', category: 'material', description: 'Trúc xanh thu hoạch trong rừng trúc.', sellPrice: 10, edible: false },
  { id: 'herb', name: 'Thảo dược', category: 'material', description: 'Thảo dược mọc hoang dã trong núi.', sellPrice: 15, edible: false },
  { id: 'firewood', name: 'Củi khô', category: 'material', description: 'Nhiên liệu dùng để nấu nướng.', sellPrice: 5, edible: false },
  {
    id: 'winter_bamboo_shoot',
    name: 'Măng Đông',
    category: 'misc',
    description: 'Búp măng tươi non đặc sản của mùa đông.',
    sellPrice: 40,
    edible: true,
    staminaRestore: 8,
    healthRestore: 3
  },
  { id: 'wintersweet', name: 'Hoa Mai', category: 'gift', description: 'Lạp mai nở giữa mùa đông giá rét, thích hợp làm quà tặng.', sellPrice: 50, edible: false },
  {
    id: 'wild_mushroom',
    name: 'Nấm rừng',
    category: 'misc',
    description: 'Nấm rừng thu hoạch vào mùa thu.',
    sellPrice: 30,
    edible: true,
    staminaRestore: 5,
    healthRestore: 2
  },
  { id: 'ginseng', name: 'Nhân Sâm', category: 'misc', description: 'Nhân sâm hoang dã cực kỳ quý hiếm.', sellPrice: 200, edible: false },
  {
    id: 'wild_berry',
    name: 'Quả dại',
    category: 'misc',
    description: 'Quả dại ngọt ngào hái trong núi vào mùa hè.',
    sellPrice: 20,
    edible: true,
    staminaRestore: 5,
    healthRestore: 2
  },
  { id: 'pine_cone', name: 'Quả thông', category: 'material', description: 'Quả rụng từ cây thông.', sellPrice: 10, edible: false },
  { id: 'jade_ring', name: 'Nhẫn Phỉ Thúy', category: 'gift', description: 'Nhẫn phỉ thúy được mài giũa tinh xảo, có thể dùng để cầu hôn.', sellPrice: 500, edible: false },
  {
    id: 'silk_ribbon',
    name: 'Khăn Lụa',
    category: 'gift',
    description: 'Khăn lụa thêu tinh tế, dùng để bày tỏ tấm lòng với người thương.',
    sellPrice: 200,
    edible: false
  },
  {
    id: 'zhiji_jade',
    name: 'Ngọc Bội Tri Kỷ',
    category: 'gift',
    description: 'Cặp ngọc bội điêu khắc tinh xảo, tặng cho hảo hữu đồng giới để kết làm tri kỷ.',
    sellPrice: 300,
    edible: false
  },
  { id: 'scarecrow', name: 'Bù Nhìn Rơm', category: 'machine', description: 'Đặt tại nông trại để xua đuổi quạ ăn trộm nông sản.', sellPrice: 75, edible: false },
  { id: 'rain_totem', name: 'Đồ Đằng Mưa', category: 'misc', description: 'Sử dụng có thể khiến ngày mai đổ mưa.', sellPrice: 30, edible: false },
  {
    id: 'fish_feed',
    name: 'Thức Ăn Cho Cá',
    category: 'material',
    description: 'Thức ăn chuyên dụng cho ao cá, duy trì chất lượng nước và sức khỏe của cá.',
    sellPrice: 10,
    edible: false
  },
  {
    id: 'water_purifier',
    name: 'Chất Cải Thiện Chất Lượng Nước',
    category: 'material',
    description: 'Cải thiện chất lượng nước ao cá và giảm khả năng cá bị bệnh.',
    sellPrice: 50,
    edible: false
  }
]

/** 从鱼定义自动生成鱼物品 */
const FISH_ITEMS: ItemDef[] = FISH.map(fish => ({
  id: fish.id,
  name: fish.name,
  category: 'fish' as const,
  description: fish.description,
  sellPrice: Math.floor(fish.sellPrice * 1.5),
  edible: true,
  staminaRestore: Math.floor(fish.sellPrice / 5),
  healthRestore: Math.floor(fish.sellPrice / 8)
}))

/** 从食谱定义自动生成烹饪物品 */
const _preFoodItems: ItemDef[] = [...SEED_ITEMS, ...CROP_ITEMS, ...ORE_ITEMS, ...MISC_ITEMS, ...FISH_ITEMS]
const FOOD_ITEMS: ItemDef[] = RECIPES.map(recipe => {
  const baseSellPrice = Math.floor(recipe.effect.staminaRestore * 2)
  // 计算材料总售价，保底：食物售价不低于材料总售价的1.2倍
  const ingredientTotal = recipe.ingredients.reduce((sum, ing) => {
    const def = _preFoodItems.find(i => i.id === ing.itemId)
    return sum + (def?.sellPrice ?? 0) * ing.quantity
  }, 0)
  const sellPrice = Math.max(baseSellPrice, Math.floor(ingredientTotal * 1.2))
  return {
    id: `food_${recipe.id}`,
    name: recipe.name,
    category: 'food' as const,
    description: recipe.description,
    sellPrice,
    edible: true,
    staminaRestore: recipe.effect.staminaRestore,
    healthRestore: recipe.effect.healthRestore ?? Math.floor(recipe.effect.staminaRestore * 0.4)
  }
})

/** 加工品物品 */
const PROCESSED_ITEMS: ItemDef[] = [
  {
    id: 'watermelon_wine',
    name: 'Rượu dưa hấu',
    category: 'processed',
    description: 'Mỹ tửu ủ từ những quả dưa hấu ngọt lịm.',
    sellPrice: 390,
    edible: true,
    staminaRestore: 25,
    healthRestore: 15
  },
  {
    id: 'osmanthus_wine',
    name: 'Rượu hoa quế',
    category: 'processed',
    description: 'Rượu hoa quế thơm ngát nồng nàn.',
    sellPrice: 600,
    edible: true,
    staminaRestore: 30,
    healthRestore: 18
  },
  { id: 'rice_vinegar', name: 'Giấm gạo', category: 'processed', description: 'Giấm gạo nuôi lâu năm tại nhà.', sellPrice: 290, edible: false },
  {
    id: 'pickled_cabbage',
    name: 'Cải thảo muối',
    category: 'processed',
    description: 'Món cải thảo muối chua kích thích vị giác.',
    sellPrice: 155,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'dried_radish',
    name: 'Củ cải khô',
    category: 'processed',
    description: 'Củ cải phơi khô giòn sần sật.',
    sellPrice: 245,
    edible: true,
    staminaRestore: 12,
    healthRestore: 5
  },
  {
    id: 'pumpkin_preserve',
    name: 'Mứt bí đỏ',
    category: 'processed',
    description: 'Mứt bí đỏ sánh mịn thơm đậm đà.',
    sellPrice: 410,
    edible: true,
    staminaRestore: 15,
    healthRestore: 8
  },
  {
    id: 'honey',
    name: 'Mật ong',
    category: 'processed',
    description: 'Mật ong vàng óng ngọt ngào.',
    sellPrice: 100,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  { id: 'sesame_oil', name: 'Dầu mè', category: 'processed', description: 'Dầu mè thơm lừng ép thủ công.', sellPrice: 260, edible: false },
  { id: 'tea_oil', name: 'Dầu trà', category: 'processed', description: 'Dầu sơn trà quý báu.', sellPrice: 620, edible: false },
  {
    id: 'peach_wine',
    name: 'Rượu hoa đào',
    category: 'processed',
    description: 'Rượu hoa đào ngọt thanh tao.',
    sellPrice: 420,
    edible: true,
    staminaRestore: 25,
    healthRestore: 15
  },
  {
    id: 'jujube_wine',
    name: 'Rượu táo đỏ',
    category: 'processed',
    description: 'Rượu táo đỏ ngọt đậm bồi bổ cơ thể.',
    sellPrice: 300,
    edible: true,
    staminaRestore: 20,
    healthRestore: 12
  },
  {
    id: 'corn_wine',
    name: 'Rượu ngô',
    category: 'processed',
    description: 'Rượu ngô thơm thanh tao nhã.',
    sellPrice: 330,
    edible: true,
    staminaRestore: 18,
    healthRestore: 10
  },
  {
    id: 'pickled_chili',
    name: 'Ớt ngâm',
    category: 'processed',
    description: 'Ớt ngâm chua cay kích thích vị giác.',
    sellPrice: 270,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'pickled_ginger',
    name: 'Gừng muối',
    category: 'processed',
    description: 'Gừng muối chua ngọt giòn non.',
    sellPrice: 315,
    edible: true,
    staminaRestore: 12,
    healthRestore: 5
  },
  { id: 'mayonnaise', name: 'Sốt mayonnaise', category: 'processed', description: 'Sốt mayonnaise béo ngậy làm từ trứng gà.', sellPrice: 115, edible: false },
  {
    id: 'duck_mayonnaise',
    name: 'Sốt mayonnaise trứng vịt',
    category: 'processed',
    description: 'Sốt bơ trứng cao cấp làm từ trứng vịt.',
    sellPrice: 215,
    edible: false
  },
  {
    id: 'goose_mayonnaise',
    name: 'Sốt mayonnaise trứng ngỗng',
    category: 'processed',
    description: 'Sốt bơ trứng sánh đặc làm từ trứng ngỗng.',
    sellPrice: 250,
    edible: false
  },
  {
    id: 'silkie_mayonnaise',
    name: 'Sốt mayonnaise trứng ác vy',
    category: 'processed',
    description: 'Sốt bơ trứng bồi bổ làm từ trứng gà ác.',
    sellPrice: 295,
    edible: false
  },
  {
    id: 'ostrich_mayonnaise',
    name: 'Sốt mayonnaise trứng đà điểu',
    category: 'processed',
    description: 'Sốt bơ trứng phần lớn làm từ trứng đà điểu.',
    sellPrice: 450,
    edible: false
  },
  {
    id: 'quail_mayonnaise',
    name: 'Sốt mayonnaise trứng cút',
    category: 'processed',
    description: 'Sốt bơ trứng tinh xảo làm từ trứng cút.',
    sellPrice: 170,
    edible: false
  }
]

/** 烟熏鱼物品 */
const SMOKED_ITEMS: ItemDef[] = [
  {
    id: 'smoked_crucian',
    name: 'Cá diếc hun khói',
    category: 'processed',
    description: 'Cá diếc hun khói có hương vị độc đáo.',
    sellPrice: 30,
    edible: true,
    staminaRestore: 7,
    healthRestore: 3
  },
  {
    id: 'smoked_carp',
    name: 'Cá chép hun khói',
    category: 'processed',
    description: 'Cá chép hun khói có thịt chắc.',
    sellPrice: 50,
    edible: true,
    staminaRestore: 12,
    healthRestore: 6
  },
  {
    id: 'smoked_grass_carp',
    name: 'Cá trắm hun khói',
    category: 'processed',
    description: 'Cá trắm cỏ hun khói tươi và ngon.',
    sellPrice: 80,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  {
    id: 'smoked_bass',
    name: 'Cá vược hun khói',
    category: 'processed',
    description: 'Cá chẽm hun khói có hương vị tinh tế.',
    sellPrice: 120,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'smoked_catfish',
    name: 'Cá trê hun khói',
    category: 'processed',
    description: 'Cá da trơn hun khói với hương vị phong phú.',
    sellPrice: 90,
    edible: true,
    staminaRestore: 22,
    healthRestore: 11
  },
  {
    id: 'smoked_mandarin_fish',
    name: 'Cá quế hun khói',
    category: 'processed',
    description: 'Cá quýt hun khói mềm và ngon ngọt.',
    sellPrice: 140,
    edible: true,
    staminaRestore: 35,
    healthRestore: 17
  },
  {
    id: 'smoked_eel',
    name: 'Lươn hun khói',
    category: 'processed',
    description: 'Lươn hun khói đầy đặn và mịn màng.',
    sellPrice: 170,
    edible: true,
    staminaRestore: 42,
    healthRestore: 21
  },
  {
    id: 'smoked_sturgeon',
    name: 'Cá tầm hun khói',
    category: 'processed',
    description: 'Cá tầm hun khói rất quý và ngon.',
    sellPrice: 260,
    edible: true,
    staminaRestore: 65,
    healthRestore: 32
  },
  {
    id: 'smoked_loach',
    name: 'Cá chạch hun khói',
    category: 'processed',
    description: 'Cá hun khói giòn và thơm.',
    sellPrice: 44,
    edible: true,
    staminaRestore: 11,
    healthRestore: 5
  },
  {
    id: 'smoked_yellow_eel',
    name: 'Lươn đồng hun khói',
    category: 'processed',
    description: 'Lươn hun khói rất bổ dưỡng và thơm ngon.',
    sellPrice: 100,
    edible: true,
    staminaRestore: 25,
    healthRestore: 12
  }
]

/** 脱水食品物品 */
const DRIED_ITEMS: ItemDef[] = [
  {
    id: 'dried_mushroom',
    name: 'Nấm khô',
    category: 'processed',
    description: 'Nấm khử nước và bảo quản tập trung hương vị umami.',
    sellPrice: 135,
    edible: true,
    staminaRestore: 18,
    healthRestore: 9
  },
  {
    id: 'dried_peach',
    name: 'Đào sấy khô',
    category: 'processed',
    description: 'Đào khô làm bằng phương pháp khử nước có vị chua ngọt.',
    sellPrice: 120,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'dried_lychee',
    name: 'Vải sấy khô',
    category: 'processed',
    description: 'Vải thiều khô làm từ quá trình khử nước có vị ngọt và đậm đà.',
    sellPrice: 160,
    edible: true,
    staminaRestore: 40,
    healthRestore: 20
  },
  {
    id: 'dried_persimmon_slice',
    name: 'Hồng sấy dẻo',
    category: 'processed',
    description: 'Bánh hồng làm từ hồng khô mềm, dẻo và có vị ngọt.',
    sellPrice: 170,
    edible: true,
    staminaRestore: 42,
    healthRestore: 21
  },
  {
    id: 'dried_hawthorn',
    name: 'Sơn tra sấy',
    category: 'processed',
    description: 'Những lát táo gai mất nước có vị chua ngọt và ngon miệng.',
    sellPrice: 130,
    edible: true,
    staminaRestore: 32,
    healthRestore: 16
  },
  {
    id: 'dried_apricot',
    name: 'Mơ sấy dẻo',
    category: 'processed',
    description: 'Chất bảo quản mơ mất nước có vị chua ngọt vừa phải.',
    sellPrice: 110,
    edible: true,
    staminaRestore: 27,
    healthRestore: 13
  },
  {
    id: 'dried_berry',
    name: 'Mứt quả sấy',
    category: 'processed',
    description: 'Trái cây được bảo quản từ trái cây dại đã khử nước rất dễ bảo quản.',
    sellPrice: 90,
    edible: true,
    staminaRestore: 12,
    healthRestore: 6
  }
]

/** 机器物品 */
const MACHINE_ITEMS: ItemDef[] = PROCESSING_MACHINES.map(m => ({
  id: `machine_${m.id}`,
  name: m.name,
  category: 'machine' as const,
  description: m.description,
  sellPrice: Math.floor(m.craftMoney * 0.5),
  edible: false
}))

/** 洒水器物品 */
const SPRINKLER_ITEMS: ItemDef[] = SPRINKLERS.map(s => ({
  id: s.id,
  name: s.name,
  category: 'sprinkler' as const,
  description: s.description,
  sellPrice: Math.floor(s.craftMoney * 0.5),
  edible: false
}))

/** 肥料物品 */
const FERTILIZER_ITEMS: ItemDef[] = FERTILIZERS.map(f => ({
  id: f.id,
  name: f.name,
  category: 'fertilizer' as const,
  description: f.description,
  sellPrice: 5,
  edible: false
}))

/** 鱼饵物品 */
const BAIT_ITEMS: ItemDef[] = BAITS.map(b => ({
  id: b.id,
  name: b.name,
  category: 'bait' as const,
  description: b.description,
  sellPrice: b.shopPrice ? Math.floor(b.shopPrice * 0.4) : 5,
  edible: false
}))

/** 浮漂物品 */
const TACKLE_ITEMS: ItemDef[] = TACKLES.map(t => ({
  id: t.id,
  name: t.name,
  category: 'tackle' as const,
  description: t.description,
  sellPrice: t.shopPrice ? Math.floor(t.shopPrice * 0.5) : 50,
  edible: false
}))

/** 动物产品 */
const ANIMAL_PRODUCT_ITEMS: ItemDef[] = [
  {
    id: 'egg',
    name: 'Trứng Gà',
    category: 'animal_product',
    description: 'Trứng tươi.',
    sellPrice: 75,
    edible: true,
    staminaRestore: 5,
    healthRestore: 3
  },
  {
    id: 'duck_egg',
    name: 'Trứng Vịt',
    category: 'animal_product',
    description: 'Một quả trứng vịt to và ngon.',
    sellPrice: 142,
    edible: true,
    staminaRestore: 8,
    healthRestore: 4
  },
  {
    id: 'milk',
    name: 'Sữa Bò',
    category: 'animal_product',
    description: 'Sữa tươi.',
    sellPrice: 187,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  { id: 'wool', name: 'Len Cừu', category: 'animal_product', description: 'Len mềm.', sellPrice: 510, edible: false },
  { id: 'hay', name: 'Cỏ Khô', category: 'material', description: 'Hay cho chăn nuôi.', sellPrice: 0, edible: false },
  // 新增动物产品
  { id: 'rabbit_fur', name: 'Lông Thỏ', category: 'animal_product', description: 'Lông thỏ mềm mại.', sellPrice: 225, edible: false },
  {
    id: 'rabbit_foot',
    name: 'Chân Thỏ May Mắn',
    category: 'animal_product',
    description: 'Bàn chân thỏ được cho là mang lại may mắn và rất hiếm.',
    sellPrice: 300,
    edible: false
  },
  {
    id: 'goose_egg',
    name: 'Trứng Ngỗng',
    category: 'animal_product',
    description: 'Một quả trứng ngỗng rất lớn.',
    sellPrice: 165,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'quail_egg',
    name: 'Trứng Cút',
    category: 'animal_product',
    description: 'Trứng cút nhỏ.',
    sellPrice: 37,
    edible: true,
    staminaRestore: 3,
    healthRestore: 2
  },
  {
    id: 'pigeon_egg',
    name: 'Trứng Bồ Câu',
    category: 'animal_product',
    description: 'Trứng chim bồ câu bổ dưỡng.',
    sellPrice: 67,
    edible: true,
    staminaRestore: 5,
    healthRestore: 3
  },
  {
    id: 'silkie_egg',
    name: 'Trứng Gà Ác',
    category: 'animal_product',
    description: 'Trứng đen bổ dưỡng.',
    sellPrice: 195,
    edible: true,
    staminaRestore: 15,
    healthRestore: 8
  },
  { id: 'peacock_feather', name: 'Lông Khổng Tước', category: 'animal_product', description: 'Lông đuôi công tuyệt đẹp.', sellPrice: 525, edible: false },
  {
    id: 'goat_milk',
    name: 'Sữa Dê',
    category: 'animal_product',
    description: 'Sữa dê tươi.',
    sellPrice: 165,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'truffle',
    name: 'Nấm Truffle',
    category: 'animal_product',
    description: 'Nấm ngầm quý hiếm.',
    sellPrice: 450,
    edible: true,
    staminaRestore: 5,
    healthRestore: 3
  },
  {
    id: 'buffalo_milk',
    name: 'Sữa Trâu Nước',
    category: 'animal_product',
    description: 'Sữa trâu đậm đà.',
    sellPrice: 150,
    edible: true,
    staminaRestore: 8,
    healthRestore: 4
  },
  {
    id: 'yak_milk',
    name: 'Sữa Bò Tây Tạng',
    category: 'animal_product',
    description: 'Sữa đậm đà từ yak cao nguyên.',
    sellPrice: 210,
    edible: true,
    staminaRestore: 12,
    healthRestore: 6
  },
  { id: 'alpaca_wool', name: 'Lông Alpaca', category: 'animal_product', description: 'Len alpaca cực kỳ mềm mại.', sellPrice: 375, edible: false },
  {
    id: 'antler_velvet',
    name: 'Lộc Nhung',
    category: 'animal_product',
    description: 'Những chiếc gạc hươu quý giá có thể được ăn trực tiếp để bổ sung thể lực.',
    sellPrice: 675,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'donkey_milk',
    name: 'Sữa Lừa',
    category: 'animal_product',
    description: 'Sữa lừa có vị nhẹ.',
    sellPrice: 120,
    edible: true,
    staminaRestore: 6,
    healthRestore: 3
  },
  {
    id: 'camel_milk',
    name: 'Sữa Lạc Đà',
    category: 'animal_product',
    description: 'Sữa lạc đà bổ dưỡng.',
    sellPrice: 240,
    edible: true,
    staminaRestore: 12,
    healthRestore: 6
  },
  {
    id: 'ostrich_egg',
    name: 'Trứng Đà Điểu',
    category: 'animal_product',
    description: 'Trứng đà điểu khổng lồ.',
    sellPrice: 300,
    edible: true,
    staminaRestore: 15,
    healthRestore: 8
  }
]

/** 果树水果 */
const FRUIT_TREE_ITEMS: ItemDef[] = FRUIT_TREE_DEFS.map(t => ({
  id: t.fruitId,
  name: t.fruitName,
  category: 'fruit' as const,
  description: `${t.name}có quả${t.fruitName}.`,
  sellPrice: Math.floor(t.fruitSellPrice * 1.5),
  edible: true,
  staminaRestore: Math.floor(t.fruitSellPrice / 5),
  healthRestore: Math.floor(t.fruitSellPrice / 10)
}))

/** 树苗 */
const SAPLING_ITEMS: ItemDef[] = FRUIT_TREE_DEFS.map(t => ({
  id: t.saplingId,
  name: `Cây giống ${t.name}`,
  category: 'sapling' as const,
  description: `Gieo xuống sau ${t.growthDays} ngày sẽ chín, gieo trồng vào mùa ${t.fruitSeason === 'spring' ? 'Xuân' : t.fruitSeason === 'summer' ? 'Hè' : t.fruitSeason === 'autumn' ? 'Thu' : 'Đông'}sản lượng hàng quý${t.fruitName}.`,
  sellPrice: Math.floor(t.saplingPrice / 2),
  edible: false
}))

/** 野树产物和材料 */
const WILD_TREE_ITEMS: ItemDef[] = [
  {
    id: 'camphor_seed',
    name: 'Hạt Giống Cây Long Não',
    category: 'material',
    description: 'Hạt giống cây long não, gieo xuống sẽ lớn thành cây long não.',
    sellPrice: 15,
    edible: false
  },
  {
    id: 'mulberry',
    name: 'Quả Dâu Tằm',
    category: 'misc',
    description: 'Quả dâu tằm chín tím đen, vị chua ngọt ngon miệng.',
    sellPrice: 25,
    edible: true,
    staminaRestore: 5,
    healthRestore: 2
  },
  { id: 'pine_resin', name: 'Nhựa Thông', category: 'material', description: 'Nhựa cây do thông tiết ra, có thể dùng để chế tạo.', sellPrice: 30, edible: false },
  { id: 'camphor_oil', name: 'Dầu Long Não', category: 'material', description: 'Tinh dầu chiết xuất từ cây long não, hương thơm thanh khiết.', sellPrice: 50, edible: false },
  { id: 'silk', name: 'Tơ Tằm', category: 'material', description: 'Sợi tơ thu hoạch từ cây dâu tằm, mềm mịn trơn bóng.', sellPrice: 40, edible: false },
  { id: 'tapper', name: 'Vòi Khai Thác Nhựa Cây', category: 'machine', description: 'Lắp đặt lên cây hoang dã trưởng thành để định kỳ thu hoạch nhựa cây.', sellPrice: 100, edible: false }
]

/** 炸弹物品 */
const BOMB_ITEMS: ItemDef[] = BOMBS.map(b => ({
  id: b.id,
  name: b.name,
  category: 'bomb' as const,
  description: b.description,
  sellPrice: 25,
  edible: false
}))

/** 蟹笼和水产物品 */
const CRAB_POT_ITEMS: ItemDef[] = [
  {
    id: 'crab_pot',
    name: 'Lồng Bẫy Cua',
    category: 'machine',
    description: 'Đặt tại các khu vực nước, tự động bẫy thủy sản mỗi ngày (cần mồi câu).',
    sellPrice: 750,
    edible: false
  },
  {
    id: 'snail',
    name: 'Ốc Sên',
    category: 'fish',
    description: 'Ốc sên nước ngọt nhỏ nhắn.',
    sellPrice: 15,
    edible: true,
    staminaRestore: 3,
    healthRestore: 2
  },
  {
    id: 'freshwater_shrimp',
    name: 'Tôm Nước Ngọt',
    category: 'fish',
    description: 'Tôm nhỏ sống trong vùng nước trong vắt.',
    sellPrice: 20,
    edible: true,
    staminaRestore: 4,
    healthRestore: 2
  },
  {
    id: 'crab',
    name: 'Cua',
    category: 'fish',
    description: 'Cua sông thơm ngon.',
    sellPrice: 30,
    edible: true,
    staminaRestore: 6,
    healthRestore: 3
  },
  {
    id: 'lobster',
    name: 'Tôm Hùm',
    category: 'fish',
    description: 'Tôm hùm nước ngọt quý giá.',
    sellPrice: 50,
    edible: true,
    staminaRestore: 10,
    healthRestore: 5
  },
  {
    id: 'cave_shrimp',
    name: 'Tôm Hang Động',
    category: 'fish',
    description: 'Tôm nhỏ trong suốt sống ở sông ngầm hang mỏ.',
    sellPrice: 40,
    edible: true,
    staminaRestore: 8,
    healthRestore: 4
  },
  {
    id: 'swamp_crab',
    name: 'Cua Đầm Lầy',
    category: 'fish',
    description: 'Cua màu sẫm sống trong đầm lầy.',
    sellPrice: 45,
    edible: true,
    staminaRestore: 9,
    healthRestore: 4
  },
  { id: 'trash', name: 'Rác Thải', category: 'misc', description: 'Đồ lặt vặt không có nhiều tác dụng.', sellPrice: 1, edible: false },
  { id: 'driftwood', name: 'Gỗ Trôi', category: 'misc', description: 'Gỗ mục vớt lên từ dưới nước.', sellPrice: 2, edible: false },
  { id: 'broken_cd', name: 'Mảnh Đĩa Vỡ', category: 'misc', description: 'Mảnh đĩa vỡ không biết ai vứt bỏ.', sellPrice: 1, edible: false },
  { id: 'soggy_newspaper', name: 'Báo Ướt', category: 'misc', description: 'Tờ báo cũ sũng nước.', sellPrice: 1, edible: false }
]

/** 花蜜物品 */
const FLOWER_HONEY_ITEMS: ItemDef[] = [
  {
    id: 'chrysanthemum_honey',
    name: 'Mật ong hoa cúc',
    category: 'processed',
    description: 'Mật ong mang hương thơm thanh mát của hoa cúc.',
    sellPrice: 200,
    edible: true,
    staminaRestore: 25,
    healthRestore: 12
  },
  {
    id: 'osmanthus_honey',
    name: 'Mật ong hoa quế',
    category: 'processed',
    description: 'Mật ong hoa quế thơm ngát nồng nàn.',
    sellPrice: 450,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'rapeseed_honey',
    name: 'Mật ong hoa cải',
    category: 'processed',
    description: 'Mật ong hoa cải dầu ngọt thanh.',
    sellPrice: 150,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  {
    id: 'snow_lotus_honey',
    name: 'Mật ong tuyết liên',
    category: 'processed',
    description: 'Mật ong hoa tuyết liên quý giá.',
    sellPrice: 730,
    edible: true,
    staminaRestore: 40,
    healthRestore: 20
  }
]

/** 松露油 */
const TRUFFLE_OIL_ITEM: ItemDef[] = [
  { id: 'truffle_oil', name: 'Dầu Truffle', category: 'processed', description: 'Dầu Truffle quý giá, cực phẩm dùng trong nấu nướng.', sellPrice: 680, edible: false }
]

/** 奶酪物品 */
const CHEESE_ITEMS: ItemDef[] = [
  {
    id: 'cheese',
    name: 'Phô Mai',
    category: 'processed',
    description: 'Phô mai béo ngậy làm từ sữa bò.',
    sellPrice: 250,
    edible: true,
    staminaRestore: 50,
    healthRestore: 25
  },
  {
    id: 'goat_cheese',
    name: 'Phô Mai Dê',
    category: 'processed',
    description: 'Phô mai thơm làm từ sữa dê.',
    sellPrice: 220,
    edible: true,
    staminaRestore: 44,
    healthRestore: 22
  },
  {
    id: 'buffalo_cheese',
    name: 'Phô Mai Sữa Trâu',
    category: 'processed',
    description: 'Phô mai béo ngậy làm từ sữa trâu.',
    sellPrice: 200,
    edible: true,
    staminaRestore: 40,
    healthRestore: 20
  },
  {
    id: 'yak_cheese',
    name: 'Phô Mai Sữa Bò Tây Tạng',
    category: 'processed',
    description: 'Phô mai cao nguyên làm từ sữa yak.',
    sellPrice: 280,
    edible: true,
    staminaRestore: 56,
    healthRestore: 28
  }
]

/** 布料物品 */
const CLOTH_ITEMS: ItemDef[] = [
  { id: 'cloth', name: 'Vải Vóc', category: 'material', description: 'Tấm vải dệt từ len cừu.', sellPrice: 660, edible: false },
  { id: 'silk_cloth', name: 'Tơ Lụa', category: 'material', description: 'Tơ lụa hoa lệ lộng lẫy.', sellPrice: 200, edible: false },
  { id: 'alpaca_cloth', name: 'Len Alpaca', category: 'material', description: 'Vải nỉ lông lạc đà không bướu cực kỳ mềm mại.', sellPrice: 530, edible: false },
  { id: 'felt', name: 'Vải Dạ', category: 'material', description: 'Tấm dạ ép từ lông thỏ.', sellPrice: 340, edible: false }
]

/** 金属锭物品 */
const BAR_ITEMS: ItemDef[] = [
  { id: 'copper_bar', name: 'Thỏi Đồng', category: 'material', description: 'Thỏi đồng luyện ra từ quặng.', sellPrice: 40, edible: false },
  { id: 'iron_bar', name: 'Thỏi Sắt', category: 'material', description: 'Thỏi sắt luyện ra từ quặng.', sellPrice: 80, edible: false },
  { id: 'gold_bar', name: 'Thỏi Vàng', category: 'material', description: 'Thỏi vàng luyện ra từ quặng.', sellPrice: 160, edible: false },
  { id: 'iridium_bar', name: 'Thỏi Iridium', category: 'material', description: 'Thỏi Iridium luyện ra từ quặng, vô cùng trân quý.', sellPrice: 700, edible: false }
]

/** 木炭物品 */
const CHARCOAL_ITEMS: ItemDef[] = [
  { id: 'charcoal', name: 'Than Củi', category: 'material', description: 'Than củi nung đốt, có thể dùng làm nhiên liệu và chế tạo.', sellPrice: 55, edible: false }
]

/** 面粉物品 */
const FLOUR_ITEMS: ItemDef[] = [
  { id: 'rice_flour', name: 'Bột Gạo', category: 'material', description: 'Bột gạo mịn xay từ lúa gạo.', sellPrice: 160, edible: false },
  { id: 'wheat_flour', name: 'Bột Mì', category: 'material', description: 'Bột mì xay từ lúa mì đông.', sellPrice: 130, edible: false },
  { id: 'cornmeal', name: 'Bột Ngô', category: 'material', description: 'Bột ngô thô xay từ ngô.', sellPrice: 180, edible: false }
]

/** 茶饮物品 */
const TEA_DRINK_ITEMS: ItemDef[] = [
  {
    id: 'green_tea_drink',
    name: 'Trà Xanh',
    category: 'processed',
    description: 'Thức uống trà xanh thơm ngát thanh khiết.',
    sellPrice: 620,
    edible: true,
    staminaRestore: 25,
    healthRestore: 12
  },
  {
    id: 'chrysanthemum_tea',
    name: 'Trà Hoa Cúc',
    category: 'processed',
    description: 'Trà hoa cúc thanh nhiệt sáng mắt.',
    sellPrice: 470,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  {
    id: 'osmanthus_tea',
    name: 'Trà Hoa Quế',
    category: 'processed',
    description: 'Trà hoa quế thơm ngát nồng nàn.',
    sellPrice: 780,
    edible: true,
    staminaRestore: 30,
    healthRestore: 15
  },
  {
    id: 'ginseng_tea',
    name: 'Trà Nhân Sâm',
    category: 'processed',
    description: 'Trà nhân sâm bồi bổ cường thân.',
    sellPrice: 300,
    edible: true,
    staminaRestore: 40,
    healthRestore: 20
  }
]

/** 豆腐物品 */
const TOFU_ITEMS: ItemDef[] = [
  {
    id: 'tofu',
    name: 'Đậu Hũ',
    category: 'processed',
    description: 'Đậu hũ tươi non.',
    sellPrice: 500,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  {
    id: 'peanut_tofu',
    name: 'Đậu Hũ Đậu Phộng',
    category: 'processed',
    description: 'Đậu hũ đậu phộng béo ngậy.',
    sellPrice: 380,
    edible: true,
    staminaRestore: 18,
    healthRestore: 9
  },
  {
    id: 'sesame_paste',
    name: 'Sốt Mè',
    category: 'processed',
    description: 'Sốt mè thơm lừng.',
    sellPrice: 175,
    edible: true,
    staminaRestore: 15,
    healthRestore: 8
  }
]

/** 药品物品 */
const HERB_PRODUCT_ITEMS: ItemDef[] = [
  {
    id: 'herbal_paste',
    name: 'Cao Thảo Dược',
    category: 'processed',
    description: 'Cao thuốc mỡ điều chế từ việc nghiền thảo dược.',
    sellPrice: 80,
    edible: true,
    staminaRestore: 15,
    healthRestore: 10
  },
  {
    id: 'ginseng_extract',
    name: 'Tinh Chất Nhân Sâm',
    category: 'processed',
    description: 'Tinh chất sâm cô đặc.',
    sellPrice: 400,
    edible: true,
    staminaRestore: 50,
    healthRestore: 25
  },
  {
    id: 'antler_powder',
    name: 'Bột Lộc Nhung',
    category: 'processed',
    description: 'Bột lộc nhung nghiền mịn.',
    sellPrice: 950,
    edible: true,
    staminaRestore: 60,
    healthRestore: 30
  },
  {
    id: 'animal_medicine',
    name: 'Thuốc Thú Y',
    category: 'misc',
    description: 'Điều trị cho gia súc bị bệnh, khỏi ngay lập tức.',
    sellPrice: 50,
    edible: false
  },
  {
    id: 'stamina_fruit',
    name: 'Tiên Đào',
    category: 'misc',
    description: 'Trái cây chứa linh khí viễn cổ, sau khi ăn sẽ tăng vĩnh viễn giới hạn thể lực. Cực kỳ quý hiếm.',
    sellPrice: 5000,
    edible: false
  }
]

/** 特殊饲料物品 */
const FEED_ITEMS: ItemDef[] = [
  {
    id: 'premium_feed',
    name: 'Thức Ăn Tinh Chất',
    category: 'material',
    description: 'Thức ăn chất lượng cao được phối trộn kỹ lưỡng, tăng rõ rệt tâm trạng và độ thiện cảm của động vật.',
    sellPrice: 40,
    edible: false
  },
  {
    id: 'nourishing_feed',
    name: 'Thức Ăn Bồi Bổ',
    category: 'material',
    description: 'Thức ăn được thêm thành phần bổ dưỡng, đẩy nhanh chu kỳ sản sinh của động vật.',
    sellPrice: 50,
    edible: false
  },
  {
    id: 'vitality_feed',
    name: 'Thức Ăn Sinh Lực',
    category: 'material',
    description: 'Thức ăn chứa tinh chất thảo dược, sau khi cho ăn chắc chắn sẽ chữa khỏi bệnh tật.',
    sellPrice: 60,
    edible: false
  }
]

/** 香料物品 */
const INCENSE_ITEMS: ItemDef[] = [
  { id: 'pine_incense', name: 'Hương Thông', category: 'gift', description: 'Hương thông thanh khiết, quà tặng tuyệt hảo.', sellPrice: 100, edible: false },
  { id: 'camphor_incense', name: 'Hương Long Não', category: 'gift', description: 'Hương long não giúp tỉnh táo tinh thần.', sellPrice: 150, edible: false },
  { id: 'osmanthus_incense', name: 'Hương Hoa Quế', category: 'gift', description: 'Hương hoa quế nồng nàn.', sellPrice: 780, edible: false }
]

/** 武器图鉴物品 */
const WEAPON_ITEMS: ItemDef[] = Object.values(WEAPONS).map(w => ({
  id: w.id,
  name: w.name,
  category: 'weapon' as const,
  description: w.description,
  sellPrice: getWeaponSellPrice(w.id, null),
  edible: false
}))

/** 戒指图鉴物品 */
const RING_ITEMS: ItemDef[] = RINGS.map(r => ({
  id: r.id,
  name: r.name,
  category: 'ring' as const,
  description: r.description,
  sellPrice: r.sellPrice,
  edible: false
}))

/** 帽子图鉴物品 */
const HAT_ITEMS: ItemDef[] = HATS.map(h => ({
  id: h.id,
  name: h.name,
  category: 'hat' as const,
  description: h.description,
  sellPrice: h.sellPrice,
  edible: false
}))

/** 鞋子图鉴物品 */
const SHOE_ITEMS: ItemDef[] = SHOES.map(s => ({
  id: s.id,
  name: s.name,
  category: 'shoe' as const,
  description: s.description,
  sellPrice: s.sellPrice,
  edible: false
}))

/** 所有物品定义 */
export const ITEMS: ItemDef[] = [
  ...SEED_ITEMS,
  ...CROP_ITEMS,
  ...ORE_ITEMS,
  ...MISC_ITEMS,
  ...FISH_ITEMS,
  ...FOOD_ITEMS,
  ...PROCESSED_ITEMS,
  ...SMOKED_ITEMS,
  ...DRIED_ITEMS,
  ...MACHINE_ITEMS,
  ...SPRINKLER_ITEMS,
  ...FERTILIZER_ITEMS,
  ...BAIT_ITEMS,
  ...TACKLE_ITEMS,
  ...ANIMAL_PRODUCT_ITEMS,
  ...FRUIT_TREE_ITEMS,
  ...SAPLING_ITEMS,
  ...WILD_TREE_ITEMS,
  ...BOMB_ITEMS,
  ...CRAB_POT_ITEMS,
  ...TRUFFLE_OIL_ITEM,
  ...FLOWER_HONEY_ITEMS,
  ...CHEESE_ITEMS,
  ...CLOTH_ITEMS,
  ...BAR_ITEMS,
  ...CHARCOAL_ITEMS,
  ...FLOUR_ITEMS,
  ...TEA_DRINK_ITEMS,
  ...TOFU_ITEMS,
  ...HERB_PRODUCT_ITEMS,
  ...FEED_ITEMS,
  ...INCENSE_ITEMS,

  // 装备图鉴
  ...WEAPON_ITEMS,
  ...RING_ITEMS,
  ...HAT_ITEMS,
  ...SHOE_ITEMS,

  // 淘金产出
  { id: 'gold_nugget', name: 'Cát Vàng', category: 'misc', description: 'Cát vàng đãi được dưới sông, lấp lánh rực rỡ.', sellPrice: 80, edible: false },

  // ===== 化石 (8) =====
  { id: 'trilobite_fossil', name: 'Hóa thạch bọ ba thùy', category: 'fossil', description: 'Hóa thạch của sinh vật biển viễn cổ.', sellPrice: 120, edible: false },
  { id: 'amber', name: 'Hổ phách', category: 'fossil', description: 'Hóa thạch nhựa cây ngưng tụ suốt vạn năm.', sellPrice: 150, edible: false },
  { id: 'ammonite_fossil', name: 'Hóa thạch cúc đá', category: 'fossil', description: 'Hóa thạch sinh vật biển viễn cổ hình xoắn ốc.', sellPrice: 180, edible: false },
  { id: 'fern_fossil', name: 'Hóa thạch lá dương xỉ', category: 'fossil', description: 'Hóa thạch dương xỉ viễn cổ được bảo tồn nguyên vẹn.', sellPrice: 100, edible: false },
  { id: 'shell_fossil', name: 'Hóa thạch vỏ ốc', category: 'fossil', description: 'Hóa thạch vỏ của động vật thân mềm cổ đại.', sellPrice: 90, edible: false },
  { id: 'bone_fragment', name: 'Mảnh vụn xương cốt', category: 'fossil', description: 'Mảnh vỡ xương cốt của sinh vật viễn cổ không rõ tên.', sellPrice: 200, edible: false },
  { id: 'petrified_wood', name: 'Gỗ hóa đá', category: 'fossil', description: 'Gỗ viễn cổ được thay thế bằng khoáng chất.', sellPrice: 130, edible: false },
  { id: 'dragon_tooth', name: 'Hóa thạch nanh rồng', category: 'fossil', description: 'Hóa thạch răng do long tộc để lại trong truyền thuyết.', sellPrice: 350, edible: false },

  // ===== 古物 (10) =====
  { id: 'ancient_pottery', name: 'Mảnh gốm cổ', category: 'artifact', description: 'Mảnh vỡ đồ gốm do nền văn minh viễn cổ để lại.', sellPrice: 100, edible: false },
  { id: 'jade_disc', name: 'Mảnh vỡ ngọc bích', category: 'artifact', description: 'Mảnh vỡ ngọc bích viễn cổ tinh mỹ.', sellPrice: 250, edible: false },
  { id: 'bronze_mirror', name: 'Gương đồng', category: 'artifact', description: 'Gương đồng viễn cổ được chế tác tinh xảo.', sellPrice: 200, edible: false },
  { id: 'ancient_coin', name: 'Đồng tiền cổ', category: 'artifact', description: 'Đồng tiền đồng cổ thuộc triều đại không rõ tên.', sellPrice: 150, edible: false },
  { id: 'oracle_bone', name: 'Mảnh giáp cốt', category: 'artifact', description: 'Giáp cốt viễn cổ có khắc bói toán.', sellPrice: 300, edible: false },
  { id: 'jade_pendant', name: 'Ngọc bội', category: 'artifact', description: 'Đồ trang sức đeo người viễn cổ ôn nhuận như ngọc.', sellPrice: 220, edible: false },
  {
    id: 'ancient_seed',
    name: 'Hạt giống viễn cổ',
    category: 'artifact',
    description: 'Hạt giống bí ẩn chứa đựng sinh mệnh lực viễn cổ, nghe nói có thể trồng ra trái cây viễn cổ.',
    sellPrice: 400,
    edible: false
  },
  { id: 'bamboo_scroll', name: 'Thẻ tre', category: 'artifact', description: 'Mảnh tre vỡ có khắc cổ văn.', sellPrice: 180, edible: false },
  { id: 'stone_axe_head', name: 'Rìu đá', category: 'artifact', description: 'Rìu đá do tổ tiên viễn cổ sử dụng.', sellPrice: 120, edible: false },
  { id: 'painted_pottery', name: 'Mảnh gốm màu', category: 'artifact', description: 'Mảnh gốm màu có vẽ hoa văn tinh mỹ.', sellPrice: 200, edible: false },

  // ===== 公会商店物品 =====
  {
    id: 'combat_tonic',
    name: 'Thuốc Bổ Trợ Chiến Đấu',
    category: 'food',
    description: 'Hồi phục 30 điểm HP.',
    sellPrice: 100,
    edible: true,
    staminaRestore: 0,
    healthRestore: 30
  },
  {
    id: 'fortify_brew',
    name: 'Thuốc Tăng Lực',
    category: 'food',
    description: 'Hồi phục 60 điểm HP.',
    sellPrice: 250,
    edible: true,
    staminaRestore: 0,
    healthRestore: 60
  },
  {
    id: 'ironhide_potion',
    name: 'Dược Tề Thiết Bích',
    category: 'food',
    description: 'Hồi phục toàn bộ HP.',
    sellPrice: 400,
    edible: true,
    staminaRestore: 0,
    healthRestore: 999
  },
  { id: 'slayer_charm', name: 'Phù Săn Ma', category: 'misc', description: 'Tỷ lệ rớt đồ của quái vật +20% (Trong lần thám hiểm này).', sellPrice: 750, edible: false },
  {
    id: 'warriors_feast',
    name: 'Yến Tiệc Dũng Sĩ',
    category: 'food',
    description: 'Hồi phục 50 thể lực và 50 HP.',
    sellPrice: 500,
    edible: true,
    staminaRestore: 50,
    healthRestore: 50
  },
  { id: 'monster_lure', name: 'Mồi Nhử Quái Vật', category: 'misc', description: 'Số lượng quái vật ở tầng này tăng gấp đôi.', sellPrice: 1000, edible: false },
  { id: 'guild_badge', name: 'Huy Hiệu Công Hội', category: 'misc', description: 'Lực tấn công vĩnh viễn +3.', sellPrice: 0, edible: false },
  { id: 'life_talisman', name: 'Bùa Hộ Mệnh Sinh Mệnh', category: 'misc', description: 'Sinh lực tối đa vĩnh viễn +15.', sellPrice: 0, edible: false },
  { id: 'defense_charm', name: 'Bùa Hộ Vệ', category: 'misc', description: 'Phòng ngự vĩnh viễn +3%.', sellPrice: 0, edible: false },
  {
    id: 'adventurer_ration',
    name: 'Lương Khô Thám Hiểm',
    category: 'food',
    description: 'Hồi phục 25 thể lực và 25 HP.',
    sellPrice: 175,
    edible: true,
    staminaRestore: 25,
    healthRestore: 25
  },
  {
    id: 'stamina_elixir',
    name: 'Dược Tề Tinh Lực',
    category: 'food',
    description: 'Hồi phục 120 điểm thể lực.',
    sellPrice: 300,
    edible: true,
    staminaRestore: 120,
    healthRestore: 0
  },
  { id: 'lucky_coin', name: 'Đồng Tiền May Mắn', category: 'misc', description: 'Tỷ lệ rớt đồ của quái vật vĩnh viễn +5%.', sellPrice: 0, edible: false },

  // ===== 瀚海物品 =====
  {
    id: 'hanhai_cactus_seed',
    name: 'Hạt Giống Xương Rồng',
    category: 'seed',
    description: 'Hạt giống loài thực vật kỳ lạ đến từ Tây Vực, có thể trồng vào mùa hè.',
    sellPrice: 250,
    edible: false
  },
  {
    id: 'hanhai_date_seed',
    name: 'Hạt Giống Chà Là',
    category: 'seed',
    description: 'Hạt giống trái cây Tây Vực do Con Đường Tơ Lụa mang lại, có thể trồng vào mùa hè/mùa thu.',
    sellPrice: 200,
    edible: false
  },
  { id: 'hanhai_spice', name: 'Hương Liệu Tây Vực', category: 'material', description: 'Hương liệu mang phong tình dị vực, cực phẩm nấu ăn.', sellPrice: 150, edible: false },
  { id: 'hanhai_silk', name: 'Tơ Lụa', category: 'material', description: 'Tơ lụa thượng hạng mềm mịn trơn bóng.', sellPrice: 400, edible: false },
  { id: 'hanhai_turquoise', name: 'Ngọc Lục Bảo', category: 'gem', description: 'Đá quý trân quý đặc sản của Tây Vực.', sellPrice: 300, edible: false },
  { id: 'hanhai_map', name: 'Bản Đồ Kho Báu', category: 'misc', description: 'Bản đồ đánh dấu vị trí kho báu tại hoang mạc.', sellPrice: 500, edible: false },
  {
    id: 'mega_bomb_recipe',
    name: 'Công Thức Bom Khổng Lồ',
    category: 'misc',
    description: 'Phương thức bí truyền nghe nói có thể phá nổ cả một tầng hang mỏ.',
    sellPrice: 2500,
    edible: false
  },
  // --- 新增西域商品 ---
  { id: 'hanhai_incense', name: 'Trầm Hương Hãn Hải', category: 'gift', description: 'Hương liệu trân quý của Tây Vực, quà tặng tuyệt hảo.', sellPrice: 250, edible: false },
  {
    id: 'hanhai_carpet',
    name: 'Mảnh Thảm Bay',
    category: 'misc',
    description: 'Mảnh vỡ thảm bay trong truyền thuyết, vật phẩm sưu tầm quý giá.',
    sellPrice: 600,
    edible: false
  },
  { id: 'hanhai_amber', name: 'Hổ Phách Gobi', category: 'gem', description: 'Hổ phách tự nhiên trên sa mạc Gobi.', sellPrice: 220, edible: false },
  {
    id: 'hanhai_dried_fruit',
    name: 'Trái Cây Khô Tây Vực',
    category: 'food',
    description: 'Trái cây khô dị vực ngọt ngào, giúp hồi phục thể lực.',
    sellPrice: 100,
    edible: true,
    staminaRestore: 20
  },
  { id: 'hanhai_pottery', name: 'Gốm Màu', category: 'gift', description: 'Gốm màu Tây Vực tinh xảo, quà tặng tuyệt hảo.', sellPrice: 175, edible: false },
  {
    id: 'hanhai_saddle_leather',
    name: 'Da Yên Ngựa',
    category: 'material',
    description: 'Da thuộc làm yên ngựa Tây Vực thượng hạng.',
    sellPrice: 350,
    edible: false
  },
  { id: 'hanhai_lapis', name: 'Đá Lapis Lazuli', category: 'gem', description: 'Đá quý màu xanh lam đậm trân quý.', sellPrice: 275, edible: false },
  // --- 加工产出 ---
  { id: 'spice_oil', name: 'Dầu Hương Liệu', category: 'processed', description: 'Dầu mỡ đậm đà mang phong vị dị vực.', sellPrice: 350, edible: false },
  {
    id: 'cactus_jam',
    name: 'Mứt Xương Rồng',
    category: 'processed',
    description: 'Mứt sa mạc chua ngọt ngon miệng.',
    sellPrice: 400,
    edible: true,
    staminaRestore: 35,
    healthRestore: 15
  },
  {
    id: 'cactus_wine',
    name: 'Rượu Xương Rồng',
    category: 'processed',
    description: 'Mỹ tửu đặc sản Tây Vực.',
    sellPrice: 800,
    edible: true,
    staminaRestore: 30,
    healthRestore: 20
  },
  {
    id: 'date_wine',
    name: 'Rượu Chà Là',
    category: 'processed',
    description: 'Rượu chà là ngọt dịu bồi bổ.',
    sellPrice: 650,
    edible: true,
    staminaRestore: 25,
    healthRestore: 15
  },
  {
    id: 'turquoise_accessory',
    name: 'Trang Sức Ngọc Lục Bảo',
    category: 'gift',
    description: 'Trang sức ngọc lục bảo tinh xảo, quà tặng tuyệt hảo.',
    sellPrice: 650,
    edible: false
  },
  { id: 'brocade', name: 'Gấm Vóc', category: 'material', description: 'Gấm vóc hoa lệ thượng hạng.', sellPrice: 900, edible: false },
  {
    id: 'spice_tea',
    name: 'Trà Hương Liệu',
    category: 'processed',
    description: 'Trà thơm mang phong vị dị vực.',
    sellPrice: 350,
    edible: true,
    staminaRestore: 20,
    healthRestore: 10
  },
  // --- 积分兑换物品 ---
  {
    id: 'trade_star_fragment',
    name: 'Mảnh Vỡ Tinh Thần',
    category: 'material',
    description: 'Nguyên liệu quý hiếm, dùng để chế tạo cao cấp.',
    sellPrice: 500,
    edible: false
  },
  // { id: 'trade_golden_coconut', name: '金椰子', category: 'misc', description: '打开可获得随机稀有物品.', sellPrice: 800, edible: false },
  // {
  //   id: 'trade_desert_totem',
  //   name: '沙漠图腾',
  //   category: 'misc',
  //   description: '立即传送至瀚海（不消耗时间）.',
  //   sellPrice: 300,
  //   edible: false
  // },
  { id: 'trade_spice_bundle', name: 'Gói Quà Hương Liệu', category: 'misc', description: 'Bên trong chứa Hương Liệu Tây Vực ×5.', sellPrice: 750, edible: false },
  {
    id: 'trade_turquoise_pendant',
    name: 'Dây chuyền ngọc lục bảo',
    category: 'gem',
    description: 'Mặt dây chuyền tinh xảo mài từ ngọc lục bảo Tây Vực.',
    sellPrice: 600,
    edible: false
  },
  { id: 'trade_silk_robe', name: 'Trường Bào Tơ Lụa', category: 'misc', description: 'Những chiếc áo choàng lộng lẫy làm từ lụa của Miền Tây.', sellPrice: 750, edible: false },
  {
    id: 'trade_desert_blade',
    name: 'Loan Đao Sa Mạc',
    category: 'misc',
    description: 'Thanh đao được rèn ở Tây Vực cực kỳ sắc bén.',
    sellPrice: 2000,
    edible: false
  },
  // --- 瀚海拓展料理 ---
  {
    id: 'cactus_salad',
    name: 'Salad xương rồng',
    category: 'food',
    description: 'Salad xương rồng thanh mát ngon miệng.',
    sellPrice: 250,
    edible: true,
    staminaRestore: 40,
    healthRestore: 20
  },
  {
    id: 'spice_fried_rice',
    name: 'Cơm chiên hương liệu',
    category: 'food',
    description: 'Cơm chiên đượm vị hương liệu Tây Vực.',
    sellPrice: 300,
    edible: true,
    staminaRestore: 55,
    healthRestore: 25
  },
  {
    id: 'turquoise_tea',
    name: 'Trà dưỡng sinh ngọc lục bảo',
    category: 'food',
    description: 'Thức uống dưỡng sinh pha chút bột ngọc lục bảo.',
    sellPrice: 400,
    edible: true,
    staminaRestore: 60,
    healthRestore: 30
  },
  {
    id: 'silk_tofu',
    name: 'Đậu hũ tơ lụa',
    category: 'food',
    description: 'Đậu hũ non hấp bọc trong lụa mỏng mịn màng.',
    sellPrice: 280,
    edible: true,
    staminaRestore: 45,
    healthRestore: 20
  },
  {
    id: 'date_porridge',
    name: 'Cháo táo đỏ nghiền',
    category: 'food',
    description: 'Cháo táo đỏ nhuyễn mịn ấm áp bồi bổ.',
    sellPrice: 260,
    edible: true,
    staminaRestore: 50,
    healthRestore: 25
  },
  {
    id: 'desert_feast',
    name: 'Đại tiệc Tây Vực',
    category: 'food',
    description: 'Yến tiệc xa hoa hội tụ tinh túy Tây Vực.',
    sellPrice: 800,
    edible: true,
    staminaRestore: 80,
    healthRestore: 50
  },
  {
    id: 'brocade_dumpling',
    name: 'Há Cảo Gấm Ngự Ban',
    category: 'food',
    description: 'Món há cảo cực phẩm có vỏ làm từ gấm vóc.',
    sellPrice: 700,
    edible: true,
    staminaRestore: 75,
    healthRestore: 40
  },

  // ==================== 仙灵物品 ====================
  // 发现线索
  {
    id: 'fox_bead',
    name: 'Hồ châu',
    category: 'misc',
    description: 'Viên châu màu đỏ rực nhặt được nơi sâu thẳm hang mỏ, ấm áp như thể có sinh mệnh.',
    sellPrice: 500,
    edible: false
  },

  // 求缘物品
  {
    id: 'dragon_scale_charm',
    name: 'Long Lân Bội',
    category: 'misc',
    description: 'Ngọc bội hình vảy rồng điêu khắc từ long ngọc, chứa đựng sức mạnh tiềm uyên.',
    sellPrice: 0,
    edible: false
  },
  { id: 'blossom_crown', name: 'Hoa Linh Quán', category: 'misc', description: 'Vương miện hoa bện từ những đóa hoa đào không bao giờ héo tàn.', sellPrice: 0, edible: false },
  { id: 'jade_mortar', name: 'Chày Ngọc Giã Thuốc', category: 'misc', description: 'Chày giã thuốc điêu khắc từ đá nguyệt quang, ghép thành cặp với chày ngọc của Nguyệt Thỏ.', sellPrice: 0, edible: false },
  { id: 'fox_flame_lantern', name: 'Đèn Lồng Hồ Hỏa', category: 'misc', description: 'Chiếc đèn lồng chứa hồ hỏa bên trong, vĩnh viễn không tắt.', sellPrice: 0, edible: false },
  {
    id: 'cultivation_jade',
    name: 'Ngọc Bội Tu Luyện',
    category: 'misc',
    description: 'Ngọc bội chứa đựng linh khí, tín vật của người tu hành.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'silver_thread_ring',
    name: 'Nhẫn Chỉ Bạc',
    category: 'misc',
    description: 'Chiếc nhẫn bện từ sợi chỉ bạc dưới ánh trăng, gửi gắm nỗi lòng nhớ quê hương.',
    sellPrice: 0,
    edible: false
  },

  // 结缘物品
  {
    id: 'dragon_pearl',
    name: 'Long Châu',
    category: 'misc',
    description: 'Linh châu luyện từ long ngọc, đá nguyệt quang và mảnh vỡ lăng kính ngũ sắc, là tín vật định duyên tối cao của long tộc.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'eternal_blossom',
    name: 'Hoa Không Tàn',
    category: 'misc',
    description: 'Đóa hoa linh thiêng ngưng tụ từ quả đào chí tôn, mật ong và hoa quế, vĩnh viễn không héo úa.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'moon_elixir',
    name: 'Nguyệt Hoa Đan',
    category: 'misc',
    description: 'Tiên đan luyện từ nhân sâm, tuyết liên và đá nguyệt quang, tỏa ra ánh sáng trắng bạc dịu nhẹ.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'fox_spirit_bead',
    name: 'Linh Hồ Châu',
    category: 'misc',
    description: 'Viên châu luyện từ hồng ngọc, đá nguyệt quang và vàng ròng, phong ấn một luồng linh lực của Hồ Tiên.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'immortal_gourd',
    name: 'Tiên Nhân Hồ',
    category: 'misc',
    description: 'Thần dược làm từ nhân sâm, nhung hươu và quặng iridium chứa đựng sức mạnh của năm trăm năm trồng trọt.',
    sellPrice: 0,
    edible: false
  },
  {
    id: 'starlight_loom',
    name: 'Khung Cửi Ánh Sao',
    category: 'misc',
    description: 'Khung cửi thu nhỏ dệt từ tơ tằm, đá nguyệt quang và mảnh vỡ lăng kính, có thể dệt ra những sợi chỉ lấp lánh như ánh sao.',
    sellPrice: 0,
    edible: false
  },

  // 能力产出物品
  {
    id: 'spirit_peach',
    name: 'Linh đào',
    category: 'misc',
    description: 'Tiên đào được Đào Yêu chúc phúc, tỏa ra linhtức giận.',
    sellPrice: 800,
    edible: true,
    staminaRestore: 50,
    healthRestore: 30
  },
  { id: 'moon_herb', name: 'Nguyệt thảo', category: 'material', description: 'Linh thảo sinh ra từ việc tắm gội ánh trăng, dược hiệu cực tốt.', sellPrice: 300, edible: false },
  { id: 'dream_silk', name: 'Mộng ty', category: 'material', description: 'Sợi chỉ bạc do Quy Nữ dệt ra, lấp lánh ánh sao.', sellPrice: 500, edible: false },
  // --- 竹林野兽掉落 ---
  { id: 'wolf_pelt', name: 'Da Sói', category: 'material', description: 'Da của sói xám rừng trúc, dẻo dai chống mài mòn.', sellPrice: 200, edible: false },
  { id: 'wolf_fang', name: 'Nanh Sói', category: 'material', description: 'Nanh sói sắc bén, có thể làm đồ trang trí.', sellPrice: 150, edible: false },
  { id: 'bear_pelt', name: 'Da Gấu', category: 'material', description: 'Da lông gấu đen dày dặn, giữ ấm cực tốt.', sellPrice: 400, edible: false },
  { id: 'bear_gall', name: 'Mật Gấu', category: 'material', description: 'Dược liệu quý giá, tính hàn đắng vào kinh can.', sellPrice: 600, edible: false },
  { id: 'tiger_pelt', name: 'Da Hổ', category: 'material', description: 'Da hổ quý hiếm, giá trị liên thành.', sellPrice: 800, edible: false },
  { id: 'tiger_bone', name: 'Xương Hổ', category: 'material', description: 'Dược liệu truyền thống danh giá.', sellPrice: 500, edible: false },
  { id: 'tiger_fang', name: 'Nanh Hổ', category: 'material', description: 'Răng nanh mãnh hổ, có thể làm bùa hộ mệnh.', sellPrice: 350, edible: false },
  // --- 竹林野兽掉落加工品 ---
  {
    id: 'bear_gall_pill',
    name: 'Mật Gấu Hoàn',
    category: 'food',
    description: 'Viên thuốc đắng lạnh nghiền từ mật gấu, uống vào tinh thần sảng khoái.',
    sellPrice: 450,
    edible: true,
    staminaRestore: 55,
    healthRestore: 30
  },
  {
    id: 'tiger_bone_tonic',
    name: 'Rượu Hổ Cốt',
    category: 'food',
    description: 'Rượu thuốc ngâm xương hổ, uống vào khí huyết cuộn trào.',
    sellPrice: 700,
    edible: true,
    staminaRestore: 70,
    healthRestore: 40
  }
]

/** 根据ID查找物品 */
export const getItemById = (id: string): ItemDef | undefined => {
  return ITEMS.find(i => i.id === id)
}

/** 物品分类默认来源 */
const CATEGORY_SOURCE: Record<ItemCategory, string> = {
  seed: 'Mua ở cửa hàng',
  crop: 'Thu hoạch trồng trọt',
  fish: 'Nhận được từ câu cá',
  ore: 'Thu thập ở hang mỏ',
  gem: 'Thu thập ở hang mỏ',
  material: 'Thu thập/Chế tạo',
  food: 'Nấu ăn chế tạo',
  processed: 'Gia công chếlàm',
  machine: 'Chế tạo tổng hợp',
  sprinkler: 'Chế tạo tổng hợp',
  fertilizer: 'Chế tạo tổng hợp',
  bait: 'Mua ở cửa hàng',
  tackle: 'Mua ở cửa hàng',
  animal_product: 'Sản lượng chăn nuôi',
  fruit: 'Thu hoạch cây ăn quả',
  sapling: 'Mua ở cửa hàng',
  bomb: 'Chế tạo tổng hợp',
  gift: 'Thu thập/Cửa hàng',
  fossil: 'Đào khoáng ở hang mỏ',
  artifact: 'Đào khoáng ở hang mỏ',
  weapon: 'Cửa hàng/Rớt ra',
  ring: 'Cửa hàng/Chế tạo',
  hat: 'Cửa hàng/Chế tạo',
  shoe: 'Ghép tại Tiệm Rèn',
  misc: 'Nhiều cách nhận'
}

/** 特定物品来源覆写 */
const ITEM_SOURCE_OVERRIDES: Record<string, string> = {
  // 材料类
  wood: 'Nhận được từ chặt cây',
  bamboo: 'Nhận được từ chặt tre',
  herb: 'Thu thập trong núi',
  firewood: 'Nhận được từ chặt cây',
  pine_cone: 'Rớt từ chặt cây',
  battery: 'Cột thu lôi (Thời tiết giông sét)',
  copper_bar: 'Lò nung luyện',
  iron_bar: 'Lò nung luyện',
  gold_bar: 'Lò nung luyện',
  iridium_bar: 'Lò nung luyện',
  charcoal: 'Lò than nung đốt',
  rice_flour: 'Cối đá gia công',
  wheat_flour: 'Cối đá gia công',
  cornmeal: 'Cối đá gia công',
  cloth: 'Máy dệt gia công',
  silk_cloth: 'Máy dệt gia công',
  alpaca_cloth: 'Máy dệt gia công',
  felt: 'Máy dệt gia công',
  fish_feed: 'Mua ở cửa hàng',
  water_purifier: 'Mua ở cửa hàng',
  // 采集类
  wild_mushroom: 'Tầng nấm hang mỏ/Tìm kiếm mùa thu',
  winter_bamboo_shoot: 'Tìm kiếm mùa đông',
  ginseng: 'Tìm kiếm mùa thu',
  wild_berry: 'Tìm kiếm mùa hè',
  camphor_seed: 'Cây hoang dã rớt ra',
  mulberry: 'Thu hoạch cây dâu tằm',
  pine_resin: 'Máy thu thập nhựa cây',
  // 野树相关
  tapper: 'Chế tạo tổng hợp',
  lightning_rod: 'Chế tạo tổng hợp',
  // 机器
  scarecrow: 'Chế tạo tổng hợp',
  crab_pot: 'Chế tạo tổng hợp',
  // 蟹笼捕获
  snail: 'Bẫy cua bắt được',
  freshwater_shrimp: 'Bẫy cua bắt được',
  crab: 'Bẫy cua bắt được',
  lobster: 'Bẫy cua bắt được',
  cave_shrimp: 'Bẫy cua bắt được',
  swamp_crab: 'Bẫy cua bắt được',
  trash: 'Bẫy cua bắt được',
  driftwood: 'Bẫy cua bắt được',
  broken_cd: 'Bẫy cua bắt được',
  soggy_newspaper: 'Bẫy cua bắt được',
  // 蜂蜜
  chrysanthemum_honey: 'Thùng ong sản xuất',
  osmanthus_honey: 'Thùng ong sản xuất',
  rapeseed_honey: 'Thùng ong sản xuất',
  snow_lotus_honey: 'Thùng ong sản xuất',
  // 奶酪
  cheese: 'Máy phô mai gia công',
  goat_cheese: 'Máy phô mai gia công',
  buffalo_cheese: 'Máy phô mai gia công',
  yak_cheese: 'Máy phô mai gia công',
  // 松露油
  truffle_oil: 'Máy ép dầu gia công',
  // 豆腐
  tofu: 'Cối đá gia công',
  peanut_tofu: 'Cối đá gia công',
  sesame_paste: 'Cối đá gia công',
  // 茶饮
  green_tea_drink: 'Gia công chếlàm',
  chrysanthemum_tea: 'Gia công chếlàm',
  ginseng_tea: 'Gia công chếlàm',
  // 礼物
  jade_ring: 'Mua ở cửa hàng',
  silk_ribbon: 'Mua ở cửa hàng',
  zhiji_jade: 'Mua ở cửa hàng',
  wintersweet: 'Tìm kiếm mùa đông',
  pine_incense: 'Chế tạo tổng hợp',
  camphor_incense: 'Chế tạo tổng hợp',
  osmanthus_incense: 'Chế tạo tổng hợp',
  // 杂货
  rain_totem: 'Chế tạo tổng hợp',
  gold_nugget: 'Đãi vàng bên sông',
  // 公会商店
  combat_tonic: 'Công hội Mạo Hiểm Giả',
  fortify_brew: 'Công hội Mạo Hiểm Giả',
  ironhide_potion: 'Công hội Mạo Hiểm Giả',
  warriors_feast: 'Công hội Mạo Hiểm Giả',
  slayer_charm: 'Công hội Mạo Hiểm Giả',
  monster_lure: 'Công hội Mạo Hiểm Giả',
  guild_badge: 'Công hội Mạo Hiểm Giả',
  life_talisman: 'Công hội Mạo Hiểm Giả',
  defense_charm: 'Công hội Mạo Hiểm Giả',
  lucky_coin: 'Công hội Mạo Hiểm Giả',
  adventurer_ration: 'Công hội Mạo Hiểm Giả',
  stamina_elixir: 'Công hội Mạo Hiểm Giả',
  // 瀚海物品
  hanhai_cactus_seed: 'Thương nhân sa mạc Hãn Hải',
  hanhai_date_seed: 'Thương nhân sa mạc Hãn Hải',
  hanhai_spice: 'Thương nhân sa mạc Hãn Hải',
  hanhai_silk: 'Thương nhân sa mạc Hãn Hải',
  hanhai_turquoise: 'Thương nhân sa mạc Hãn Hải',
  hanhai_map: 'Sa mạc Hãn Hải',
  hanhai_fossil: 'Sa mạc Hãn Hải',
  mega_bomb_recipe: 'Sa mạc Hãn Hải',
  hanhai_incense: 'Thương nhân sa mạc Hãn Hải',
  hanhai_carpet: 'Thương nhân sa mạc Hãn Hải',
  hanhai_amber: 'Thương nhân sa mạc Hãn Hải',
  hanhai_dried_fruit: 'Thương nhân sa mạc Hãn Hải',
  hanhai_pottery: 'Thương nhân sa mạc Hãn Hải',
  hanhai_saddle_leather: 'Thương nhân sa mạc Hãn Hải',
  hanhai_lapis: 'Thương nhân sa mạc Hãn Hải',
  spice_oil: 'Gia công chếlàm',
  cactus_jam: 'Gia công chếlàm',
  cactus_wine: 'Gia công chếlàm',
  date_wine: 'Gia công chếlàm',
  turquoise_accessory: 'Gia công chếlàm',
  brocade: 'Gia công chếlàm',
  spice_tea: 'Gia công chếlàm',
  trade_star_fragment: 'Đổi bằng điểm thông thương',
  // trade_golden_coconut: 'Đổi bằng điểm thông thương',
  // trade_desert_totem: 'Đổi bằng điểm thông thương',
  trade_spice_bundle: 'Đổi bằng điểm thông thương',
  trade_turquoise_pendant: 'Đổi bằng điểm thông thương',
  trade_silk_robe: 'Đổi bằng điểm thông thương',
  trade_desert_blade: 'Đổi bằng điểm thông thương',
  cactus_salad: 'Nấu ăn',
  spice_fried_rice: 'Nấu ăn',
  turquoise_tea: 'Nấu ăn',
  silk_tofu: 'Nấu ăn',
  date_porridge: 'Nấu ăn',
  desert_feast: 'Nấu ăn',
  brocade_dumpling: 'Nấu ăn',
  // 远古种子
  ancient_seed: 'Đào mỏ (Có thể trồng)',
  // 草药加工品
  herbal_paste: 'Gia công chếlàm',
  ginseng_extract: 'Gia công chếlàm',
  antler_powder: 'Gia công chếlàm',
  stamina_fruit: 'Rương báu vực thẳm (Cực hiếm) / Chế tạo',
  // 仙灵相关物品
  fox_bead: 'Sâu trong mỏ (Manh mối phát hiện Hồ Tiên)',
  spirit_peach: 'Kỹ năng tiên duyên · Linh Đào (Đào Yêu)',
  moon_herb: 'Kỹ năng tiên duyên · Nguyệt Hoa (Nguyệt Thỏ)',
  dream_silk: 'Kỹ năng tiên duyên · Mộng Chức (Quy Nữ)',
  dragon_scale_charm: 'Chếlàm (Tín vật cầu duyên Long Linh)',
  blossom_crown: 'Chế tạo (Tín vật cầu duyên Đào Yêu)',
  jade_mortar: 'Chế tạo (Tín vật cầu duyên Nguyệt Thỏ)',
  fox_flame_lantern: 'Chế tạo (Tín vật cầu duyên Hồ Tiên)',
  cultivation_jade: 'Chế tạo (Tín vật cầu duyên Sơn Ông)',
  silver_thread_ring: 'Chế tạo (Tín vật cầu duyên Quy Nữ)',
  dragon_pearl: 'Chế tạo (Tín vật kết duyên Long Linh)',
  eternal_blossom: 'Chế tạo (Tín vật kết duyên Đào Yêu)',
  moon_elixir: 'Chế tạo (Tín vật kết duyên Nguyệt Thỏ)',
  fox_spirit_bead: 'Chế tạo (Tín vật kết duyên Hồ Tiên)',
  immortal_gourd: 'Chế tạo (Tín vật kết duyên Sơn Ông)',
  starlight_loom: 'Chế tạo (Tín vật kết duyên Quy Nữ)',
  // 竹林野兽掉落
  wolf_pelt: 'Dã thú rừng trúc rớt ra',
  wolf_fang: 'Dã thú rừng trúc rớt ra',
  bear_pelt: 'Dã thú rừng trúc rớt ra',
  bear_gall: 'Dã thú rừng trúc rớt ra',
  tiger_pelt: 'Dã thú rừng trúc rớt ra',
  tiger_bone: 'Dã thú rừng trúc rớt ra',
  tiger_fang: 'Dã thú rừng trúc rớt ra',
  bear_gall_pill: 'Gia công chếlàm',
  tiger_bone_tonic: 'Gia công chếlàm'
}

/** 获取物品来源描述 */
export const getItemSource = (itemId: string): string => {
  const override = ITEM_SOURCE_OVERRIDES[itemId]
  if (override) return override
  const def = getItemById(itemId)
  if (!def) return 'Chưa rõ'
  return CATEGORY_SOURCE[def.category]
}

/** 箱子阶梯定义 */
import type { ChestTier } from '@/types'

export const CHEST_DEFS: Record<
  ChestTier,
  {
    name: string
    capacity: number
    craftCost: { itemId: string; quantity: number }[]
    craftMoney: number
    description: string
  }
> = {
  wood: {
    name: 'Rương gỗ',
    capacity: 9,
    craftCost: [{ itemId: 'wood', quantity: 50 }],
    craftMoney: 500,
    description: 'Rương chứa đồ cơ bản, có thể cất giữ 9 ô vật phẩm.'
  },
  copper: {
    name: 'Rương đồng',
    capacity: 18,
    craftCost: [{ itemId: 'copper_bar', quantity: 15 }],
    craftMoney: 2000,
    description: 'Rương chứa đồ bằng đồng chắc chắn, có thể cất giữ 18 ô vật phẩm.'
  },
  iron: {
    name: 'Rương sắt',
    capacity: 27,
    craftCost: [
      { itemId: 'iron_bar', quantity: 10 },
      { itemId: 'wood', quantity: 20 }
    ],
    craftMoney: 5000,
    description: 'Rương chứa đồ bằng sắt bền bỉ, có thể cất giữ 27 ô vật phẩm.'
  },
  gold: {
    name: 'Rương vàng',
    capacity: 36,
    craftCost: [
      { itemId: 'gold_bar', quantity: 8 },
      { itemId: 'iron_bar', quantity: 5 }
    ],
    craftMoney: 10000,
    description: 'Rương chứa đồ bằng vàng xa hoa, có thể cất giữ 36 ô vật phẩm.'
  },
  void: {
    name: 'Rương hư không',
    capacity: 27,
    craftCost: [
      { itemId: 'iridium_bar', quantity: 5 },
      { itemId: 'void_ore', quantity: 20 }
    ],
    craftMoney: 25000,
    description: 'Có thể cất lấy từ xa, và thiết lập làm rương nguyên liệu/thành phẩm của xưởng. Sức chứa 27 ô.'
  }
}

/** 箱子阶梯顺序 */
export const CHEST_TIER_ORDER: ChestTier[] = ['wood', 'copper', 'iron', 'gold', 'void']
