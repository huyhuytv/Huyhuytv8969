import type { ProcessingMachineDef, ProcessingRecipeDef, SprinklerDef, FertilizerDef, BaitDef, TackleDef, BombDef } from '@/types'

/** 加工机器定义 */
export const PROCESSING_MACHINES: ProcessingMachineDef[] = [
  {
    id: 'wine_workshop',
    name: 'Xưởng ủ rượu',
    description: 'Ủ trái cây/nông sản thành mỹ tửu, giá bán tăng gấp ba.',
    craftCost: [
      { itemId: 'wood', quantity: 30 },
      { itemId: 'copper_ore', quantity: 5 },
      { itemId: 'iron_ore', quantity: 3 }
    ],
    craftMoney: 300
  },
  {
    id: 'sauce_jar',
    name: 'Hũ muối dưa',
    description: 'Muối nông sản thành dưa muối hoặc mứt quả, giúp tăng giá trị ổn định.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'copper_ore', quantity: 8 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 200
  },
  {
    id: 'bee_house',
    name: 'Thùng nuôi ong',
    description: 'Tự động sản xuất mật ong mỗi 4 ngày.',
    craftCost: [
      { itemId: 'wood', quantity: 40 },
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'bamboo', quantity: 10 }
    ],
    craftMoney: 250
  },
  {
    id: 'oil_press',
    name: 'Xưởng ép dầu',
    description: 'Ép mè hoặc hạt giống thành dầu ăn.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'gold_ore', quantity: 1 }
    ],
    craftMoney: 350
  },
  {
    id: 'mayo_maker',
    name: 'Máy làm sốt mayonnaise',
    description: 'Chế biến trứng gà hoặc trứng vịt thành sốt mayonnaise.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'copper_ore', quantity: 5 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 200
  },
  {
    id: 'seed_maker',
    name: 'Máy chế tạo hạt giống',
    description: 'Chuyển đổi nông sản chín thành hạt giống.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'gold_ore', quantity: 2 }
    ],
    craftMoney: 500
  },
  {
    id: 'crystal_duplicator',
    name: 'Máy sao chép tinh thể',
    description: 'Đặt đá quý vào để sao chép chậm rãi, nhận gấp đôi sản lượng.',
    craftCost: [
      { itemId: 'gold_ore', quantity: 5 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'quartz', quantity: 2 }
    ],
    craftMoney: 500
  },
  {
    id: 'smoker',
    name: 'Máy hun khói',
    description: 'Hun khói cá, giúp giá bán tăng gấp đôi.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'firewood', quantity: 5 }
    ],
    craftMoney: 300
  },
  {
    id: 'dehydrator',
    name: 'Máy sấy khô',
    description: 'Sấy khô nấm hoặc trái cây để bảo quản, bán được giá cao hơn.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'firewood', quantity: 10 }
    ],
    craftMoney: 200
  },
  {
    id: 'recycler',
    name: 'Máy tái chế',
    description: 'Tái chế rác thải thành nguyên liệu hữu ích.',
    craftCost: [
      { itemId: 'wood', quantity: 25 },
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'copper_ore', quantity: 5 }
    ],
    craftMoney: 150
  },
  {
    id: 'cheese_press',
    name: 'Máy làm phô mai',
    description: 'Chế biến sữa tươi thành phô mai thơm ngon.',
    craftCost: [
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'wood', quantity: 15 },
      { itemId: 'copper_ore', quantity: 3 }
    ],
    craftMoney: 400
  },
  {
    id: 'loom',
    name: 'Máy dệt vải',
    description: 'Dệt len và sợi tơ thành vải vóc.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'bamboo', quantity: 10 }
    ],
    craftMoney: 300
  },
  {
    id: 'furnace',
    name: 'Lò nung',
    description: 'Nung quặng thành thỏi kim loại. Tự động thu hoạch sau khi hoàn thành.',
    craftCost: [
      { itemId: 'copper_ore', quantity: 10 },
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'quartz', quantity: 2 }
    ],
    craftMoney: 500,
    autoCollect: true
  },
  {
    id: 'charcoal_kiln',
    name: 'Lò than',
    description: 'Đốt gỗ thành than củi.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'copper_ore', quantity: 3 },
      { itemId: 'firewood', quantity: 10 }
    ],
    craftMoney: 150
  },
  {
    id: 'mill',
    name: 'Cối đá',
    description: 'Xay ngũ cốc thành bột mì.',
    craftCost: [
      { itemId: 'wood', quantity: 25 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 350
  },
  {
    id: 'worm_bin',
    name: 'Hộp nuôi giun',
    description: 'Tự động sản xuất mồi câu mỗi 2 ngày.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'herb', quantity: 5 },
      { itemId: 'firewood', quantity: 5 }
    ],
    craftMoney: 200
  },
  {
    id: 'tea_maker',
    name: 'Máy pha trà',
    description: 'Chế biến lá trà và hoa thành thức uống.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'iron_ore', quantity: 2 },
      { itemId: 'bamboo', quantity: 5 }
    ],
    craftMoney: 250
  },
  {
    id: 'tofu_press',
    name: 'Xưởng làm đậu hũ',
    description: 'Xay các loại đậu thành đậu hũ và nước sốt.',
    craftCost: [
      { itemId: 'wood', quantity: 20 },
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 300
  },
  {
    id: 'herb_grinder',
    name: 'Cối tán thuốc',
    description: 'Nghiền thảo dược thành thuốc mỡ và tinh chất.',
    craftCost: [
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'quartz', quantity: 2 },
      { itemId: 'gold_ore', quantity: 1 }
    ],
    craftMoney: 400
  },
  {
    id: 'incense_maker',
    name: 'Xưởng làm hương',
    description: 'Chế biến nhựa cây và hoa thành hương liệu.',
    craftCost: [
      { itemId: 'wood', quantity: 15 },
      { itemId: 'bamboo', quantity: 10 },
      { itemId: 'firewood', quantity: 5 }
    ],
    craftMoney: 200
  }
]

/** 加工配方 */
export const PROCESSING_RECIPES: ProcessingRecipeDef[] = [
  // 酒坊
  {
    id: 'wine_watermelon',
    machineType: 'wine_workshop',
    name: 'Rượu dưa hấu',
    inputItemId: 'watermelon',
    inputQuantity: 1,
    outputItemId: 'watermelon_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Mỹ tửu ủ từ những quả dưa hấu ngọt lịm.'
  },
  {
    id: 'wine_osmanthus',
    machineType: 'wine_workshop',
    name: 'Rượu hoa quế',
    inputItemId: 'osmanthus',
    inputQuantity: 1,
    outputItemId: 'osmanthus_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Rượu hoa quế thơm ngát nồng nàn.'
  },
  {
    id: 'vinegar_rice',
    machineType: 'wine_workshop',
    name: 'Giấm gạo',
    inputItemId: 'rice',
    inputQuantity: 2,
    outputItemId: 'rice_vinegar',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Giấm gạo nuôi lâu năm tại nhà.'
  },
  // 酱缸
  {
    id: 'pickle_cabbage',
    machineType: 'sauce_jar',
    name: 'Cải thảo muối',
    inputItemId: 'cabbage',
    inputQuantity: 2,
    outputItemId: 'pickled_cabbage',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Món cải thảo muối chua kích thích vị giác.'
  },
  {
    id: 'pickle_radish',
    machineType: 'sauce_jar',
    name: 'Củ cải khô',
    inputItemId: 'radish',
    inputQuantity: 2,
    outputItemId: 'dried_radish',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Củ cải phơi khô giòn sần sật.'
  },
  {
    id: 'preserve_pumpkin',
    machineType: 'sauce_jar',
    name: 'Mứt bí đỏ',
    inputItemId: 'pumpkin',
    inputQuantity: 1,
    outputItemId: 'pumpkin_preserve',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Mứt bí đỏ sánh mịn thơm đậm đà.'
  },
  // 蜂箱
  {
    id: 'honey',
    machineType: 'bee_house',
    name: 'Mật ong',
    inputItemId: null,
    inputQuantity: 0,
    outputItemId: 'honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Mật ong vàng óng ngọt ngào.'
  },
  {
    id: 'honey_chrysanthemum',
    machineType: 'bee_house',
    name: 'Mật ong hoa cúc',
    inputItemId: 'chrysanthemum',
    inputQuantity: 1,
    outputItemId: 'chrysanthemum_honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Mật ong mang hương thơm thanh mát của hoa cúc.'
  },
  {
    id: 'honey_osmanthus',
    machineType: 'bee_house',
    name: 'Mật ong hoa quế',
    inputItemId: 'osmanthus',
    inputQuantity: 1,
    outputItemId: 'osmanthus_honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Mật ong hoa quế thơm ngát nồng nàn.'
  },
  {
    id: 'honey_rapeseed',
    machineType: 'bee_house',
    name: 'Mật ong hoa cải',
    inputItemId: 'rapeseed',
    inputQuantity: 1,
    outputItemId: 'rapeseed_honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Mật ong hoa cải dầu ngọt thanh.'
  },
  {
    id: 'honey_snow_lotus',
    machineType: 'bee_house',
    name: 'Mật ong tuyết liên',
    inputItemId: 'snow_lotus',
    inputQuantity: 1,
    outputItemId: 'snow_lotus_honey',
    outputQuantity: 1,
    processingDays: 4,
    description: 'Mật ong hoa tuyết liên quý giá.'
  },
  // 油坊
  {
    id: 'sesame_oil',
    machineType: 'oil_press',
    name: 'Dầu mè',
    inputItemId: 'sesame',
    inputQuantity: 3,
    outputItemId: 'sesame_oil',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Dầu mè thơm lừng ép thủ công.'
  },
  {
    id: 'tea_oil',
    machineType: 'oil_press',
    name: 'Dầu trà',
    inputItemId: 'tea',
    inputQuantity: 2,
    outputItemId: 'tea_oil',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Dầu sơn trà quý báu.'
  },
  {
    id: 'truffle_oil',
    machineType: 'oil_press',
    name: 'Dầu Truffle',
    inputItemId: 'truffle',
    inputQuantity: 1,
    outputItemId: 'truffle_oil',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Dầu nấm Truffle vô giá.'
  },
  // 新增：酒坊配方
  {
    id: 'wine_peach',
    machineType: 'wine_workshop',
    name: 'Rượu hoa đào',
    inputItemId: 'peach',
    inputQuantity: 1,
    outputItemId: 'peach_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Rượu hoa đào ngọt thanh tao.'
  },
  {
    id: 'wine_jujube',
    machineType: 'wine_workshop',
    name: 'Rượu táo đỏ',
    inputItemId: 'jujube',
    inputQuantity: 1,
    outputItemId: 'jujube_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Rượu táo đỏ ngọt đậm bồi bổ cơ thể.'
  },
  {
    id: 'wine_corn',
    machineType: 'wine_workshop',
    name: 'Rượu ngô',
    inputItemId: 'corn',
    inputQuantity: 2,
    outputItemId: 'corn_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Rượu ngô thơm thanh tao nhã.'
  },
  // 新增：酱缸配方
  {
    id: 'pickle_chili',
    machineType: 'sauce_jar',
    name: 'Ớt ngâm',
    inputItemId: 'chili',
    inputQuantity: 2,
    outputItemId: 'pickled_chili',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Ớt ngâm chua cay kích thích vị giác.'
  },
  {
    id: 'pickle_ginger',
    machineType: 'sauce_jar',
    name: 'Gừng muối',
    inputItemId: 'ginger',
    inputQuantity: 2,
    outputItemId: 'pickled_ginger',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Gừng muối chua ngọt giòn non.'
  },
  // 蛋黄酱机
  {
    id: 'mayo_egg',
    machineType: 'mayo_maker',
    name: 'Sốt mayonnaise',
    inputItemId: 'egg',
    inputQuantity: 1,
    outputItemId: 'mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Sốt mayonnaise béo ngậy làm từ trứng gà.'
  },
  {
    id: 'mayo_duck_egg',
    machineType: 'mayo_maker',
    name: 'Sốt mayonnaise trứng vịt',
    inputItemId: 'duck_egg',
    inputQuantity: 1,
    outputItemId: 'duck_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Sốt bơ trứng cao cấp làm từ trứng vịt.'
  },
  {
    id: 'mayo_goose_egg',
    machineType: 'mayo_maker',
    name: 'Sốt mayonnaise trứng ngỗng',
    inputItemId: 'goose_egg',
    inputQuantity: 1,
    outputItemId: 'goose_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Sốt bơ trứng sánh đặc làm từ trứng ngỗng.'
  },
  {
    id: 'mayo_silkie_egg',
    machineType: 'mayo_maker',
    name: 'Sốt mayonnaise trứng ác vy',
    inputItemId: 'silkie_egg',
    inputQuantity: 1,
    outputItemId: 'silkie_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Sốt bơ trứng bồi bổ làm từ trứng gà ác.'
  },
  {
    id: 'mayo_ostrich_egg',
    machineType: 'mayo_maker',
    name: 'Sốt mayonnaise trứng đà điểu',
    inputItemId: 'ostrich_egg',
    inputQuantity: 1,
    outputItemId: 'ostrich_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Sốt bơ trứng phần lớn làm từ trứng đà điểu.'
  },
  {
    id: 'mayo_quail_egg',
    machineType: 'mayo_maker',
    name: 'Sốt mayonnaise trứng cút',
    inputItemId: 'quail_egg',
    inputQuantity: 3,
    outputItemId: 'quail_mayonnaise',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Sốt bơ trứng tinh xảo làm từ trứng cút.'
  },
  // 种子制造机
  {
    id: 'seed_from_cabbage',
    machineType: 'seed_maker',
    name: 'Hạt giống cải xanh',
    inputItemId: 'cabbage',
    inputQuantity: 1,
    outputItemId: 'seed_cabbage',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ rau cải xanh.'
  },
  {
    id: 'seed_from_radish',
    machineType: 'seed_maker',
    name: 'Hạt giống củ cải',
    inputItemId: 'radish',
    inputQuantity: 1,
    outputItemId: 'seed_radish',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ củ cải.'
  },
  {
    id: 'seed_from_potato',
    machineType: 'seed_maker',
    name: 'Hạt giống khoai tây',
    inputItemId: 'potato',
    inputQuantity: 1,
    outputItemId: 'seed_potato',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ khoai tây.'
  },
  {
    id: 'seed_from_tea',
    machineType: 'seed_maker',
    name: 'Hạt giống trà',
    inputItemId: 'tea',
    inputQuantity: 1,
    outputItemId: 'seed_tea',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ cây trà non.'
  },
  {
    id: 'seed_from_watermelon',
    machineType: 'seed_maker',
    name: 'Hạt giống dưa hấu',
    inputItemId: 'watermelon',
    inputQuantity: 1,
    outputItemId: 'seed_watermelon',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ dưa hấu.'
  },
  {
    id: 'seed_from_rice',
    machineType: 'seed_maker',
    name: 'Hạt giống lúa',
    inputItemId: 'rice',
    inputQuantity: 1,
    outputItemId: 'seed_rice',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ lúa gạo.'
  },
  {
    id: 'seed_from_lotus_root',
    machineType: 'seed_maker',
    name: 'Hạt giống sen',
    inputItemId: 'lotus_root',
    inputQuantity: 1,
    outputItemId: 'seed_lotus_root',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ củ sen.'
  },
  {
    id: 'seed_from_sesame',
    machineType: 'seed_maker',
    name: 'Hạt giống mè',
    inputItemId: 'sesame',
    inputQuantity: 1,
    outputItemId: 'seed_sesame',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ mè.'
  },
  {
    id: 'seed_from_pumpkin',
    machineType: 'seed_maker',
    name: 'Hạt giống bí đỏ',
    inputItemId: 'pumpkin',
    inputQuantity: 1,
    outputItemId: 'seed_pumpkin',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ bí đỏ.'
  },
  {
    id: 'seed_from_sweet_potato',
    machineType: 'seed_maker',
    name: 'Hạt giống khoai lang',
    inputItemId: 'sweet_potato',
    inputQuantity: 1,
    outputItemId: 'seed_sweet_potato',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ khoai lang.'
  },
  {
    id: 'seed_from_chrysanthemum',
    machineType: 'seed_maker',
    name: 'Hạt giống hoa cúc',
    inputItemId: 'chrysanthemum',
    inputQuantity: 1,
    outputItemId: 'seed_chrysanthemum',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ hoa cúc.'
  },
  {
    id: 'seed_from_osmanthus',
    machineType: 'seed_maker',
    name: 'Hạt giống hoa quế',
    inputItemId: 'osmanthus',
    inputQuantity: 1,
    outputItemId: 'seed_osmanthus',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ hoa quế.'
  },
  {
    id: 'seed_from_bamboo_shoot',
    machineType: 'seed_maker',
    name: 'Hạt giống măng xuân',
    inputItemId: 'bamboo_shoot',
    inputQuantity: 1,
    outputItemId: 'seed_bamboo_shoot',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ măng xuân.'
  },
  {
    id: 'seed_from_persimmon',
    machineType: 'seed_maker',
    name: 'Hạt giống hồng',
    inputItemId: 'persimmon',
    inputQuantity: 1,
    outputItemId: 'seed_persimmon',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ quả hồng.'
  },
  {
    id: 'seed_from_winter_wheat',
    machineType: 'seed_maker',
    name: 'Hạt giống lúa mì đông',
    inputItemId: 'winter_wheat',
    inputQuantity: 1,
    outputItemId: 'seed_winter_wheat',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ lúa mì đông.'
  },
  {
    id: 'seed_from_garlic',
    machineType: 'seed_maker',
    name: 'Hạt giống tỏi',
    inputItemId: 'garlic',
    inputQuantity: 1,
    outputItemId: 'seed_garlic',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ tỏi.'
  },
  {
    id: 'seed_from_snow_lotus',
    machineType: 'seed_maker',
    name: 'Hạt giống tuyết liên',
    inputItemId: 'snow_lotus',
    inputQuantity: 1,
    outputItemId: 'seed_snow_lotus',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ hoa tuyết liên.'
  },
  {
    id: 'seed_from_rapeseed',
    machineType: 'seed_maker',
    name: 'Hạt giống cải dầu',
    inputItemId: 'rapeseed',
    inputQuantity: 1,
    outputItemId: 'seed_rapeseed',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ rau cải dầu.'
  },
  {
    id: 'seed_from_broad_bean',
    machineType: 'seed_maker',
    name: 'Hạt giống đậu tằm',
    inputItemId: 'broad_bean',
    inputQuantity: 1,
    outputItemId: 'seed_broad_bean',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ đậu tằm.'
  },
  {
    id: 'seed_from_peach',
    machineType: 'seed_maker',
    name: 'Hạt giống đào',
    inputItemId: 'peach',
    inputQuantity: 1,
    outputItemId: 'seed_peach',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ quả đào.'
  },
  {
    id: 'seed_from_green_bean',
    machineType: 'seed_maker',
    name: 'Hạt giống đậu đũa',
    inputItemId: 'green_bean',
    inputQuantity: 1,
    outputItemId: 'seed_green_bean',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ đậu đũa.'
  },
  {
    id: 'seed_from_loofah',
    machineType: 'seed_maker',
    name: 'Hạt giống mướp',
    inputItemId: 'loofah',
    inputQuantity: 1,
    outputItemId: 'seed_loofah',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ quả mướp.'
  },
  {
    id: 'seed_from_eggplant',
    machineType: 'seed_maker',
    name: 'Hạt giống cà tím',
    inputItemId: 'eggplant',
    inputQuantity: 1,
    outputItemId: 'seed_eggplant',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ quả cà tím.'
  },
  {
    id: 'seed_from_chili',
    machineType: 'seed_maker',
    name: 'Hạt giống ớt',
    inputItemId: 'chili',
    inputQuantity: 1,
    outputItemId: 'seed_chili',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ quả ớt.'
  },
  {
    id: 'seed_from_lotus_seed',
    machineType: 'seed_maker',
    name: 'Hạt giống sen hồng',
    inputItemId: 'lotus_seed',
    inputQuantity: 1,
    outputItemId: 'seed_lotus_seed',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ hạt sen.'
  },
  {
    id: 'seed_from_corn',
    machineType: 'seed_maker',
    name: 'Hạt giống ngô',
    inputItemId: 'corn',
    inputQuantity: 1,
    outputItemId: 'seed_corn',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ ngô.'
  },
  {
    id: 'seed_from_yam',
    machineType: 'seed_maker',
    name: 'Hạt giống hoài sơn',
    inputItemId: 'yam',
    inputQuantity: 1,
    outputItemId: 'seed_yam',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ hoài sơn.'
  },
  {
    id: 'seed_from_peanut',
    machineType: 'seed_maker',
    name: 'Hạt giống đậu phộng',
    inputItemId: 'peanut',
    inputQuantity: 1,
    outputItemId: 'seed_peanut',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ đậu phộng.'
  },
  {
    id: 'seed_from_jujube',
    machineType: 'seed_maker',
    name: 'Hạt giống táo đỏ',
    inputItemId: 'jujube',
    inputQuantity: 1,
    outputItemId: 'seed_jujube',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ quả táo đỏ.'
  },
  {
    id: 'seed_from_ginger',
    machineType: 'seed_maker',
    name: 'Hạt giống gừng',
    inputItemId: 'ginger',
    inputQuantity: 1,
    outputItemId: 'seed_ginger',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ gừng.'
  },
  {
    id: 'seed_from_napa_cabbage',
    machineType: 'seed_maker',
    name: 'Hạt giống cải thảo',
    inputItemId: 'napa_cabbage',
    inputQuantity: 1,
    outputItemId: 'seed_napa_cabbage',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ cải thảo.'
  },
  {
    id: 'seed_from_spinach',
    machineType: 'seed_maker',
    name: 'Hạt giống cải bó xôi',
    inputItemId: 'spinach',
    inputQuantity: 1,
    outputItemId: 'seed_spinach',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ cải bó xôi.'
  },
  {
    id: 'seed_from_mustard_green',
    machineType: 'seed_maker',
    name: 'Hạt giống cải bẹ',
    inputItemId: 'mustard_green',
    inputQuantity: 1,
    outputItemId: 'seed_mustard_green',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ cải bẹ.'
  },
  {
    id: 'seed_from_chives',
    machineType: 'seed_maker',
    name: 'Hạt giống hẹ',
    inputItemId: 'chives',
    inputQuantity: 1,
    outputItemId: 'seed_chives',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chiết xuất hạt giống từ hẹ.'
  },
  // 结晶复制机
  {
    id: 'dup_quartz',
    machineType: 'crystal_duplicator',
    name: 'Sao chép thạch anh',
    inputItemId: 'quartz',
    inputQuantity: 1,
    outputItemId: 'quartz',
    outputQuantity: 2,
    processingDays: 3,
    description: 'Sao chép chậm rãi một viên thạch anh.'
  },
  {
    id: 'dup_jade',
    machineType: 'crystal_duplicator',
    name: 'Sao chép phỉ thúy',
    inputItemId: 'jade',
    inputQuantity: 1,
    outputItemId: 'jade',
    outputQuantity: 2,
    processingDays: 4,
    description: 'Sao chép chậm rãi một viên phỉ thúy.'
  },
  {
    id: 'dup_ruby',
    machineType: 'crystal_duplicator',
    name: 'Sao chép hồng ngọc',
    inputItemId: 'ruby',
    inputQuantity: 1,
    outputItemId: 'ruby',
    outputQuantity: 2,
    processingDays: 5,
    description: 'Sao chép chậm rãi một viên hồng ngọc.'
  },
  {
    id: 'dup_moonstone',
    machineType: 'crystal_duplicator',
    name: 'Sao chép đá nguyệt quang',
    inputItemId: 'moonstone',
    inputQuantity: 1,
    outputItemId: 'moonstone',
    outputQuantity: 2,
    processingDays: 5,
    description: 'Sao chép chậm rãi một viên đá nguyệt quang.'
  },
  {
    id: 'dup_obsidian',
    machineType: 'crystal_duplicator',
    name: 'Sao chép đá hắc diện',
    inputItemId: 'obsidian',
    inputQuantity: 1,
    outputItemId: 'obsidian',
    outputQuantity: 2,
    processingDays: 4,
    description: 'Sao chép chậm rãi một viên đá hắc diện.'
  },
  {
    id: 'dup_dragon_jade',
    machineType: 'crystal_duplicator',
    name: 'Sao chép long ngọc',
    inputItemId: 'dragon_jade',
    inputQuantity: 1,
    outputItemId: 'dragon_jade',
    outputQuantity: 2,
    processingDays: 7,
    description: 'Sao chép chậm rãi một viên long ngọc.'
  },
  // 烟熏机
  {
    id: 'smoke_crucian',
    machineType: 'smoker',
    name: 'Cá diếc hun khói',
    inputItemId: 'crucian',
    inputQuantity: 1,
    outputItemId: 'smoked_crucian',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói cá diếc.'
  },
  {
    id: 'smoke_carp',
    machineType: 'smoker',
    name: 'Cá chép hun khói',
    inputItemId: 'carp',
    inputQuantity: 1,
    outputItemId: 'smoked_carp',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói cá chép.'
  },
  {
    id: 'smoke_grass_carp',
    machineType: 'smoker',
    name: 'Cá trắm hun khói',
    inputItemId: 'grass_carp',
    inputQuantity: 1,
    outputItemId: 'smoked_grass_carp',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói cá trắm cỏ.'
  },
  {
    id: 'smoke_bass',
    machineType: 'smoker',
    name: 'Cá vược hun khói',
    inputItemId: 'bass',
    inputQuantity: 1,
    outputItemId: 'smoked_bass',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói cá vược.'
  },
  {
    id: 'smoke_catfish',
    machineType: 'smoker',
    name: 'Cá trê hun khói',
    inputItemId: 'catfish',
    inputQuantity: 1,
    outputItemId: 'smoked_catfish',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói cá trê.'
  },
  {
    id: 'smoke_mandarin_fish',
    machineType: 'smoker',
    name: 'Cá quế hun khói',
    inputItemId: 'mandarin_fish',
    inputQuantity: 1,
    outputItemId: 'smoked_mandarin_fish',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói cá quế.'
  },
  {
    id: 'smoke_eel',
    machineType: 'smoker',
    name: 'Lươn hun khói',
    inputItemId: 'eel',
    inputQuantity: 1,
    outputItemId: 'smoked_eel',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói lươn.'
  },
  {
    id: 'smoke_sturgeon',
    machineType: 'smoker',
    name: 'Cá tầm hun khói',
    inputItemId: 'sturgeon',
    inputQuantity: 1,
    outputItemId: 'smoked_sturgeon',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói cá tầm.'
  },
  {
    id: 'smoke_loach',
    machineType: 'smoker',
    name: 'Cá chạch hun khói',
    inputItemId: 'loach',
    inputQuantity: 1,
    outputItemId: 'smoked_loach',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói cá chạch.'
  },
  {
    id: 'smoke_yellow_eel',
    machineType: 'smoker',
    name: 'Lươn đồng hun khói',
    inputItemId: 'yellow_eel',
    inputQuantity: 1,
    outputItemId: 'smoked_yellow_eel',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Hun khói lươn đồng.'
  },
  // 脱水机
  {
    id: 'dry_mushroom',
    machineType: 'dehydrator',
    name: 'Nấm khô',
    inputItemId: 'wild_mushroom',
    inputQuantity: 3,
    outputItemId: 'dried_mushroom',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sấy khô nấm rừng để làm nấm khô.'
  },
  {
    id: 'dry_peach',
    machineType: 'dehydrator',
    name: 'Đào sấy khô',
    inputItemId: 'tree_peach',
    inputQuantity: 1,
    outputItemId: 'dried_peach',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sấy khô đào tươi để làm mứt đào khô.'
  },
  {
    id: 'dry_lychee',
    machineType: 'dehydrator',
    name: 'Vải sấy khô',
    inputItemId: 'lychee',
    inputQuantity: 1,
    outputItemId: 'dried_lychee',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sấy khô quả vải để làm quả vải khô.'
  },
  {
    id: 'dry_persimmon',
    machineType: 'dehydrator',
    name: 'Hồng sấy dẻo',
    inputItemId: 'persimmon',
    inputQuantity: 1,
    outputItemId: 'dried_persimmon_slice',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sấy khô quả hồng để làm hồng dẻo.'
  },
  {
    id: 'dry_hawthorn',
    machineType: 'dehydrator',
    name: 'Sơn tra sấy',
    inputItemId: 'hawthorn',
    inputQuantity: 1,
    outputItemId: 'dried_hawthorn',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sấy khô quả sơn tra để làm mứt sơn tra miếng.'
  },
  {
    id: 'dry_apricot',
    machineType: 'dehydrator',
    name: 'Mơ sấy dẻo',
    inputItemId: 'apricot',
    inputQuantity: 1,
    outputItemId: 'dried_apricot',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sấy khô quả mơ để làm mứt mơ dẻo.'
  },
  {
    id: 'dry_wild_berry',
    machineType: 'dehydrator',
    name: 'Mứt quả sấy',
    inputItemId: 'wild_berry',
    inputQuantity: 3,
    outputItemId: 'dried_berry',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sấy khô quả dại để làm mứt quả khô.'
  },
  // 回收机
  {
    id: 'recycle_firewood',
    machineType: 'recycler',
    name: 'Tái chế củi khô',
    inputItemId: 'trash',
    inputQuantity: 3,
    outputItemId: 'firewood',
    outputQuantity: 5,
    processingDays: 1,
    description: 'Tái chế rác thải thành củi khô.'
  },
  {
    id: 'recycle_copper',
    machineType: 'recycler',
    name: 'Tái chế quặng đồng',
    inputItemId: 'trash',
    inputQuantity: 5,
    outputItemId: 'copper_ore',
    outputQuantity: 3,
    processingDays: 1,
    description: 'Tái chế rác thải để chiết xuất quặng đồng.'
  },
  {
    id: 'recycle_iron',
    machineType: 'recycler',
    name: 'Tái chế quặng sắt',
    inputItemId: 'trash',
    inputQuantity: 5,
    outputItemId: 'iron_ore',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Tái chế rác thải để chiết xuất quặng sắt.'
  },
  {
    id: 'recycle_quartz',
    machineType: 'recycler',
    name: 'Tái chế thạch anh',
    inputItemId: 'trash',
    inputQuantity: 8,
    outputItemId: 'quartz',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Tái chế rác thải để chiết xuất thạch anh.'
  },
  {
    id: 'recycle_driftwood',
    machineType: 'recycler',
    name: 'Tái chế gỗ trôi sông',
    inputItemId: 'driftwood',
    inputQuantity: 5,
    outputItemId: 'wood',
    outputQuantity: 10,
    processingDays: 1,
    description: 'Xử lý gỗ trôi nổi thành gỗ hữu dụng.'
  },
  {
    id: 'recycle_cd',
    machineType: 'recycler',
    name: 'Tinh luyện đĩa vỡ',
    inputItemId: 'broken_cd',
    inputQuantity: 3,
    outputItemId: 'copper_ore',
    outputQuantity: 3,
    processingDays: 1,
    description: 'Chiết xuất kim loại từ đĩa vỡ.'
  },
  {
    id: 'recycle_newspaper',
    machineType: 'recycler',
    name: 'Tái chế báo cũ',
    inputItemId: 'soggy_newspaper',
    inputQuantity: 5,
    outputItemId: 'firewood',
    outputQuantity: 3,
    processingDays: 1,
    description: 'Phơi khô báo ướt để dùng làm nhiên liệu.'
  },
  // 乳酪机
  {
    id: 'cheese_milk',
    machineType: 'cheese_press',
    name: 'Phô Mai',
    inputItemId: 'milk',
    inputQuantity: 1,
    outputItemId: 'cheese',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Phô mai béo ngậy làm từ sữa bò.'
  },
  {
    id: 'cheese_goat',
    machineType: 'cheese_press',
    name: 'Phô Mai Dê',
    inputItemId: 'goat_milk',
    inputQuantity: 1,
    outputItemId: 'goat_cheese',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Phô mai thơm làm từ sữa dê.'
  },
  {
    id: 'cheese_buffalo',
    machineType: 'cheese_press',
    name: 'Phô Mai Sữa Trâu',
    inputItemId: 'buffalo_milk',
    inputQuantity: 1,
    outputItemId: 'buffalo_cheese',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Phô mai béo ngậy làm từ sữa trâu.'
  },
  {
    id: 'cheese_yak',
    machineType: 'cheese_press',
    name: 'Phô Mai Sữa Bò Tây Tạng',
    inputItemId: 'yak_milk',
    inputQuantity: 1,
    outputItemId: 'yak_cheese',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Phô mai cao nguyên làm từ sữa yak.'
  },
  // 织布机
  {
    id: 'weave_wool',
    machineType: 'loom',
    name: 'Vải Vóc',
    inputItemId: 'wool',
    inputQuantity: 1,
    outputItemId: 'cloth',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Dệt len cừu thành vải vóc.'
  },
  {
    id: 'weave_silk',
    machineType: 'loom',
    name: 'Tơ Lụa',
    inputItemId: 'silk',
    inputQuantity: 1,
    outputItemId: 'silk_cloth',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Dệt tơ tằm thành lụa là lộng lẫy.'
  },
  {
    id: 'weave_alpaca',
    machineType: 'loom',
    name: 'Len Alpaca',
    inputItemId: 'alpaca_wool',
    inputQuantity: 1,
    outputItemId: 'alpaca_cloth',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Dệt lông lạc đà không bướu thành vải nỉ mềm mại.'
  },
  {
    id: 'weave_rabbit',
    machineType: 'loom',
    name: 'Vải Dạ',
    inputItemId: 'rabbit_fur',
    inputQuantity: 1,
    outputItemId: 'felt',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Ép lông thỏ thành vải dạ.'
  },
  // 熔炉
  {
    id: 'smelt_copper',
    machineType: 'furnace',
    name: 'Thỏi Đồng',
    inputItemId: 'copper_ore',
    inputQuantity: 5,
    outputItemId: 'copper_bar',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Luyện quặng đồng thành thỏi đồng.'
  },
  {
    id: 'smelt_iron',
    machineType: 'furnace',
    name: 'Thỏi Sắt',
    inputItemId: 'iron_ore',
    inputQuantity: 5,
    outputItemId: 'iron_bar',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Luyện quặng sắt thành thỏi sắt.'
  },
  {
    id: 'smelt_gold',
    machineType: 'furnace',
    name: 'Thỏi Vàng',
    inputItemId: 'gold_ore',
    inputQuantity: 5,
    outputItemId: 'gold_bar',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Luyện quặng vàng thành thỏi vàng.'
  },
  {
    id: 'smelt_iridium',
    machineType: 'furnace',
    name: 'Thỏi Iridium',
    inputItemId: 'iridium_ore',
    inputQuantity: 5,
    outputItemId: 'iridium_bar',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Luyện quặng Iridium thành thỏi Iridium.'
  },
  // 炭窑
  {
    id: 'burn_wood',
    machineType: 'charcoal_kiln',
    name: 'Than Củi (Gỗ)',
    inputItemId: 'wood',
    inputQuantity: 10,
    outputItemId: 'charcoal',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Đốt gỗ thành than củi.'
  },
  {
    id: 'burn_bamboo',
    machineType: 'charcoal_kiln',
    name: 'Than Củi (Tre)',
    inputItemId: 'bamboo',
    inputQuantity: 5,
    outputItemId: 'charcoal',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Đốt tre thành than củi.'
  },
  // 石磨
  {
    id: 'mill_rice',
    machineType: 'mill',
    name: 'Bột Gạo',
    inputItemId: 'rice',
    inputQuantity: 2,
    outputItemId: 'rice_flour',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Xay gạo thành bột gạo.'
  },
  {
    id: 'mill_wheat',
    machineType: 'mill',
    name: 'Bột Mì',
    inputItemId: 'winter_wheat',
    inputQuantity: 2,
    outputItemId: 'wheat_flour',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Xay lúa mì đông thành bột mì.'
  },
  {
    id: 'mill_corn',
    machineType: 'mill',
    name: 'Bột Ngô',
    inputItemId: 'corn',
    inputQuantity: 2,
    outputItemId: 'cornmeal',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Xay ngô thành bột ngô.'
  },
  // 蚯蚓箱
  {
    id: 'worm_bait',
    machineType: 'worm_bin',
    name: 'Mồi Câu Trùn Đất',
    inputItemId: null,
    inputQuantity: 0,
    outputItemId: 'standard_bait',
    outputQuantity: 3,
    processingDays: 2,
    description: 'Hộp nuôi giun tự động sản xuất mồi câu.'
  },
  // 制茶机
  {
    id: 'brew_green_tea',
    machineType: 'tea_maker',
    name: 'Trà Xanh',
    inputItemId: 'tea',
    inputQuantity: 2,
    outputItemId: 'green_tea_drink',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Trà xanh thanh hương pha từ lá trà.'
  },
  {
    id: 'brew_chrysanthemum',
    machineType: 'tea_maker',
    name: 'Trà Hoa Cúc',
    inputItemId: 'chrysanthemum',
    inputQuantity: 2,
    outputItemId: 'chrysanthemum_tea',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Trà hoa cúc thanh nhiệt sáng mắt.'
  },
  {
    id: 'brew_osmanthus',
    machineType: 'tea_maker',
    name: 'Trà Hoa Quế',
    inputItemId: 'osmanthus',
    inputQuantity: 2,
    outputItemId: 'osmanthus_tea',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Trà hoa quế thơm ngát nồng nàn.'
  },
  {
    id: 'brew_ginseng',
    machineType: 'tea_maker',
    name: 'Trà Nhân Sâm',
    inputItemId: 'ginseng',
    inputQuantity: 1,
    outputItemId: 'ginseng_tea',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Trà nhân sâm bồi bổ cường thân.'
  },
  // 豆腐坊
  {
    id: 'press_tofu',
    machineType: 'tofu_press',
    name: 'Đậu Hũ',
    inputItemId: 'broad_bean',
    inputQuantity: 3,
    outputItemId: 'tofu',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Đậu hũ tươi non làm từ đậu tằm.'
  },
  {
    id: 'press_peanut_tofu',
    machineType: 'tofu_press',
    name: 'Đậu Hũ Đậu Phộng',
    inputItemId: 'peanut',
    inputQuantity: 3,
    outputItemId: 'peanut_tofu',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Đậu hũ béo ngậy làm từ đậu phộng.'
  },
  {
    id: 'press_sesame_paste',
    machineType: 'tofu_press',
    name: 'Sốt Mè',
    inputItemId: 'sesame',
    inputQuantity: 2,
    outputItemId: 'sesame_paste',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Sốt mè thơm lừng xay từ hạt mè.'
  },
  // 药碾
  {
    id: 'grind_herb',
    machineType: 'herb_grinder',
    name: 'Cao Thảo Dược',
    inputItemId: 'herb',
    inputQuantity: 3,
    outputItemId: 'herbal_paste',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Nghiền thảo dược thành cao thuốc.'
  },
  {
    id: 'grind_ginseng',
    machineType: 'herb_grinder',
    name: 'Tinh Chất Nhân Sâm',
    inputItemId: 'ginseng',
    inputQuantity: 1,
    outputItemId: 'ginseng_extract',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Chưng cất nhân sâm thành tinh chất.'
  },
  {
    id: 'grind_antler',
    machineType: 'herb_grinder',
    name: 'Bột Lộc Nhung',
    inputItemId: 'antler_velvet',
    inputQuantity: 1,
    outputItemId: 'antler_powder',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Nghiền lộc nhung thành bột mịn.'
  },
  {
    id: 'grind_animal_medicine',
    machineType: 'herb_grinder',
    name: 'Thuốc Thú Y',
    inputItemId: 'herb',
    inputQuantity: 2,
    outputItemId: 'animal_medicine',
    outputQuantity: 1,
    processingDays: 1,
    description: 'Nghiền thảo dược thành thuốc điều trị cho gia súc.'
  },
  // 特殊饲料
  {
    id: 'mill_premium_feed',
    machineType: 'mill',
    name: 'Thức Ăn Tinh Chất',
    inputItemId: 'corn',
    inputQuantity: 3,
    outputItemId: 'premium_feed',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chế biến ngô thành thức ăn tinh chất.'
  },
  {
    id: 'mill_nourishing_feed',
    machineType: 'mill',
    name: 'Thức Ăn Bồi Bổ',
    inputItemId: 'rice',
    inputQuantity: 3,
    outputItemId: 'nourishing_feed',
    outputQuantity: 2,
    processingDays: 1,
    description: 'Chế biến lúa gạo thành thức ăn bồi bổ.'
  },
  {
    id: 'grind_vitality_feed',
    machineType: 'herb_grinder',
    name: 'Thức Ăn Sinh Lực',
    inputItemId: 'herb',
    inputQuantity: 3,
    outputItemId: 'vitality_feed',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Nghiền thảo dược thành thức ăn tăng sinh lực.'
  },
  // 竹林野兽材料加工
  {
    id: 'grind_bear_gall',
    machineType: 'herb_grinder',
    name: 'Mật Gấu Hoàn',
    inputItemId: 'bear_gall',
    inputQuantity: 1,
    outputItemId: 'bear_gall_pill',
    outputQuantity: 2,
    processingDays: 2,
    description: 'Nghiền mật gấu chế thành thuốc viên đắng lạnh.'
  },
  {
    id: 'grind_tiger_bone',
    machineType: 'herb_grinder',
    name: 'Rượu Hổ Cốt',
    inputItemId: 'tiger_bone',
    inputQuantity: 1,
    outputItemId: 'tiger_bone_tonic',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Ngâm xương hổ thành rượu thuốc bồi bổ.'
  },
  // 制香坊
  {
    id: 'incense_pine',
    machineType: 'incense_maker',
    name: 'Hương Thông',
    inputItemId: 'pine_resin',
    inputQuantity: 2,
    outputItemId: 'pine_incense',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Luyện nhựa thông thành hương thông.'
  },
  {
    id: 'incense_camphor',
    machineType: 'incense_maker',
    name: 'Hương Long Não',
    inputItemId: 'camphor_oil',
    inputQuantity: 2,
    outputItemId: 'camphor_incense',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Luyện dầu long não thành hương long não.'
  },
  {
    id: 'incense_osmanthus',
    machineType: 'incense_maker',
    name: 'Hương Hoa Quế',
    inputItemId: 'osmanthus',
    inputQuantity: 2,
    outputItemId: 'osmanthus_incense',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Chế biến hoa quế thành hương hoa quế.'
  },
  // 瀚海加工配方
  {
    id: 'press_spice_oil',
    machineType: 'oil_press',
    name: 'Dầu Hương Liệu',
    inputItemId: 'hanhai_spice',
    inputQuantity: 2,
    outputItemId: 'spice_oil',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Ép hương liệu Tây Vực thành dầu mang phong vị dị vực nồng nàn.'
  },
  {
    id: 'jar_cactus_jam',
    machineType: 'sauce_jar',
    name: 'Mứt Xương Rồng',
    inputItemId: 'hanhai_cactus',
    inputQuantity: 2,
    outputItemId: 'cactus_jam',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Chế biến xương rồng thành mứt sa mạc chua ngọt thơm ngon.'
  },
  {
    id: 'brew_cactus_wine',
    machineType: 'wine_workshop',
    name: 'Rượu Xương Rồng',
    inputItemId: 'hanhai_cactus',
    inputQuantity: 3,
    outputItemId: 'cactus_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Ủ xương rồng thành mỹ tửu đặc sản Tây Vực.'
  },
  {
    id: 'brew_date_wine',
    machineType: 'wine_workshop',
    name: 'Rượu Chà Là',
    inputItemId: 'hanhai_date',
    inputQuantity: 3,
    outputItemId: 'date_wine',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Ủ chà là thành rượu chà là ngọt dịu bồi bổ.'
  },
  {
    id: 'crystal_turquoise',
    machineType: 'crystal_duplicator',
    name: 'Trang Sức Ngọc Lục Bảo',
    inputItemId: 'hanhai_turquoise',
    inputQuantity: 2,
    outputItemId: 'turquoise_accessory',
    outputQuantity: 1,
    processingDays: 3,
    description: 'Mài ngọc lục bảo thành trang sức tinh xảo.'
  },
  {
    id: 'weave_brocade',
    machineType: 'loom',
    name: 'Gấm Vóc',
    inputItemId: 'hanhai_silk',
    inputQuantity: 1,
    outputItemId: 'brocade',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Dệt tơ lụa thành gấm vóc lộng lẫy thượng hạng.'
  },
  {
    id: 'brew_spice_tea',
    machineType: 'tea_maker',
    name: 'Trà Hương Liệu',
    inputItemId: 'hanhai_spice',
    inputQuantity: 2,
    outputItemId: 'spice_tea',
    outputQuantity: 1,
    processingDays: 2,
    description: 'Pha hương liệu Tây Vực thành trà thơm mang phong vị dị vực.'
  }
]

/** 洒水器定义 */
export const SPRINKLERS: SprinklerDef[] = [
  {
    id: 'bamboo_sprinkler',
    name: 'Vòi Phun Nước Ống Tre',
    description: 'Tự động tưới tiêu 4 ô đất xung quanh (trên, dưới, trái, phải).',
    range: 4,
    craftCost: [
      { itemId: 'bamboo', quantity: 10 },
      { itemId: 'copper_ore', quantity: 3 }
    ],
    craftMoney: 100
  },
  {
    id: 'copper_sprinkler',
    name: 'Vòi Phun Nước Ống Đồng',
    description: 'Tự động tưới tiêu 8 ô đất xung quanh.',
    range: 8,
    craftCost: [
      { itemId: 'copper_bar', quantity: 3 },
      { itemId: 'iron_bar', quantity: 1 }
    ],
    craftMoney: 500
  },
  {
    id: 'gold_sprinkler',
    name: 'Vòi Phun Nước Ống Vàng',
    description: 'Tự động tưới tiêu khu vực 5x5 gồm 24 ô đất xung quanh.',
    range: 24,
    craftCost: [
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'iron_bar', quantity: 2 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 1500
  }
]

/** 肥料定义 */
export const FERTILIZERS: FertilizerDef[] = [
  {
    id: 'basic_fertilizer',
    name: 'Phân Bón Cơ Bản',
    description: 'Tăng 20% tỷ lệ nâng cao chất lượng cây trồng.',
    qualityBonus: 0.2,
    craftCost: [
      { itemId: 'wood', quantity: 5 },
      { itemId: 'herb', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: 25
  },
  {
    id: 'quality_fertilizer',
    name: 'Phân Bón Chất Lượng',
    description: 'Tăng 40% tỷ lệ nâng cao chất lượng cây trồng.',
    qualityBonus: 0.4,
    craftCost: [
      { itemId: 'herb', quantity: 3 },
      { itemId: 'quartz', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: 75
  },
  {
    id: 'speed_gro',
    name: 'Thuốc Tăng Trưởng',
    description: 'Tăng tốc độ sinh trưởng của cây trồng thêm 25%.',
    growthSpeedup: 0.25,
    craftCost: [
      { itemId: 'pine_cone', quantity: 3 },
      { itemId: 'herb', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: 50
  },
  {
    id: 'deluxe_speed_gro',
    name: 'Thuốc Tăng Trưởng Cao Cấp',
    description: 'Tăng tốc độ sinh trưởng của cây trồng thêm 33%.',
    growthSpeedup: 0.33,
    craftCost: [
      { itemId: 'quartz', quantity: 1 },
      { itemId: 'firewood', quantity: 3 }
    ],
    craftMoney: 0,
    shopPrice: 100
  },
  {
    id: 'retaining_soil',
    name: 'Đất Giữ Ẩm',
    description: 'Có 50% tỷ lệ giữ nguyên trạng thái đã tưới nước qua đêm.',
    retainChance: 0.5,
    craftCost: [
      { itemId: 'wood', quantity: 3 },
      { itemId: 'firewood', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: 30
  },
  {
    id: 'quality_retaining_soil',
    name: 'Đất Giữ Ẩm Chất Lượng',
    description: 'Chắc chắn 100% giữ nguyên trạng thái đã tưới nước qua đêm.',
    retainChance: 1.0,
    craftCost: [
      { itemId: 'quartz', quantity: 1 },
      { itemId: 'wood', quantity: 5 }
    ],
    craftMoney: 0,
    shopPrice: 80
  }
]

/** 鱼饵定义 */
export const BAITS: BaitDef[] = [
  {
    id: 'standard_bait',
    name: 'Mồi Câu Thường',
    description: 'Giúp cá bình tĩnh hơn, giảm tỷ lệ cá vùng vẫy lao mạnh.',
    behaviorModifier: { calm: 0.1, struggle: 0, dash: -0.1 },
    craftCost: [{ itemId: 'herb', quantity: 2 }],
    craftMoney: 0,
    shopPrice: 5
  },
  {
    id: 'wild_bait',
    name: 'Mồi Câu Hoang Dã',
    description: 'Có 25% tỷ lệ nhận được gấp đôi lượng cá câu được.',
    doubleCatchChance: 0.25,
    craftCost: [
      { itemId: 'herb', quantity: 3 },
      { itemId: 'wild_berry', quantity: 1 },
      { itemId: 'firewood', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: null
  },
  {
    id: 'magic_bait',
    name: 'Mồi Câu Ma Thuật',
    description: 'Bỏ qua giới hạn mùa vụ, có thể câu được tất cả các loại cá.',
    ignoresSeason: true,
    craftCost: [
      { itemId: 'ginseng', quantity: 1 },
      { itemId: 'gold_ore', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: null
  },
  {
    id: 'deluxe_bait',
    name: 'Mồi Câu Tinh Chế',
    description: 'Cá bình tĩnh hơn, tỷ lệ câu thành công khi giằng co +5%.',
    behaviorModifier: { calm: 0.15, struggle: 0, dash: -0.1 },
    struggleBonus: 0.05,
    craftCost: [
      { itemId: 'herb', quantity: 3 },
      { itemId: 'ginseng', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: null
  },
  {
    id: 'targeted_bait',
    name: 'Mồi Câu Định Hướng',
    description: 'Tỷ lệ xuất hiện cá khó x2, cá truyền thuyết x1.5.',
    hardWeightMult: 2,
    legendaryWeightMult: 1.5,
    craftCost: [
      { itemId: 'magic_bait', quantity: 1 },
      { itemId: 'gold_ore', quantity: 1 }
    ],
    craftMoney: 0,
    shopPrice: null
  }
]

/** 浮漂定义 */
export const TACKLES: TackleDef[] = [
  {
    id: 'spinner',
    name: 'Phao Câu Xoay',
    description: 'Giảm 50% thể lực tiêu hao khi câu cá.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    staminaReduction: 0.5,
    craftCost: [
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'bamboo', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: 250
  },
  {
    id: 'trap_bobber',
    name: 'Phao Câu Bẫy',
    description: 'Nhận thêm 1 cơ hội khi bị đứt dây câu.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    extraBreakChance: 1,
    craftCost: [
      { itemId: 'copper_ore', quantity: 5 },
      { itemId: 'wood', quantity: 5 }
    ],
    craftMoney: 0,
    shopPrice: 200
  },
  {
    id: 'cork_bobber',
    name: 'Phao Bần',
    description: 'Tăng 25% tỷ lệ câu thành công khi giằng co.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    struggleBonus: 0.25,
    craftCost: [
      { itemId: 'wood', quantity: 10 },
      { itemId: 'iron_ore', quantity: 2 }
    ],
    craftMoney: 0,
    shopPrice: 250
  },
  {
    id: 'quality_bobber',
    name: 'Phao Chất Lượng',
    description: 'Tăng chất lượng cá câu được lên 1 bậc.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    qualityBoost: 1,
    craftCost: [
      { itemId: 'gold_ore', quantity: 2 },
      { itemId: 'copper_ore', quantity: 3 }
    ],
    craftMoney: 0,
    shopPrice: 500
  },
  {
    id: 'lead_bobber',
    name: 'Phao Chì',
    description: 'Giảm 10% tỷ lệ cá vùng vẫy lao mạnh hoặc nhào lộn.',
    maxDurability: 20,
    requiredRodTier: 'iron',
    dangerReduction: 0.1,
    craftCost: [
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'wood', quantity: 3 }
    ],
    craftMoney: 0,
    shopPrice: 200
  }
]

export const getMachineById = (id: string): ProcessingMachineDef | undefined => {
  return PROCESSING_MACHINES.find(m => m.id === id)
}

export const getProcessingRecipeById = (id: string): ProcessingRecipeDef | undefined => {
  return PROCESSING_RECIPES.find(r => r.id === id)
}

export const getRecipesForMachine = (machineType: string): ProcessingRecipeDef[] => {
  return PROCESSING_RECIPES.filter(r => r.machineType === machineType)
}

export const getSprinklerById = (id: string): SprinklerDef | undefined => {
  return SPRINKLERS.find(s => s.id === id)
}

export const getFertilizerById = (id: string): FertilizerDef | undefined => {
  return FERTILIZERS.find(f => f.id === id)
}

export const getBaitById = (id: string): BaitDef | undefined => {
  return BAITS.find(b => b.id === id)
}

export const getTackleById = (id: string): TackleDef | undefined => {
  return TACKLES.find(t => t.id === id)
}

/** 采脂器制造定义 */
export const TAPPER = {
  id: 'tapper',
  name: 'Vòi Khai Thác Nhựa Cây',
  description: 'Lắp đặt lên cây hoang dã trưởng thành để định kỳ thu hoạch nhựa cây.',
  craftCost: [
    { itemId: 'copper_ore', quantity: 5 },
    { itemId: 'wood', quantity: 10 }
  ],
  craftMoney: 200
}

/** 蟹笼制造定义 */
export const CRAB_POT_CRAFT = {
  id: 'crab_pot',
  name: 'Lồng Bẫy Cua',
  description: 'Đặt tại các khu vực nước, tự động bẫy thủy sản mỗi ngày (cần mồi câu).',
  craftCost: [
    { itemId: 'wood', quantity: 15 },
    { itemId: 'iron_bar', quantity: 2 }
  ],
  craftMoney: 500
}

/** 避雷针制造定义 */
export const LIGHTNING_ROD = {
  id: 'lightning_rod',
  name: 'Cột Thu Lôi',
  description: 'Đặt tại nông trại, hấp thụ sấm sét khi có giông bão để bảo vệ cây trồng, đồng thời sản xuất pin.',
  craftCost: [
    { itemId: 'iron_ore', quantity: 5 },
    { itemId: 'copper_ore', quantity: 3 },
    { itemId: 'quartz', quantity: 1 }
  ],
  craftMoney: 300
}

/** 稻草人制造定义 */
export const SCARECROW = {
  id: 'scarecrow',
  name: 'Bù Nhìn Rơm',
  description: 'Đặt tại nông trại để xua đuổi quạ ăn trộm nông sản.',
  craftCost: [
    { itemId: 'wood', quantity: 20 },
    { itemId: 'bamboo', quantity: 5 },
    { itemId: 'firewood', quantity: 5 }
  ],
  craftMoney: 150
}

export const AUTO_PETTER = {
  id: 'auto_petter',
  name: 'Máy Vuốt Ve Tự Động',
  description: 'Sau khi lắp đặt vào chuồng trại, tự động vuốt ve tất cả động vật mỗi ngày. Yêu cầu chuồng trại lớn (Cấp 2).',
  craftCost: [
    { itemId: 'gold_bar', quantity: 10 },
    { itemId: 'iron_bar', quantity: 20 },
    { itemId: 'copper_bar', quantity: 20 }
  ],
  craftMoney: 5000
}

/** 炸弹定义 */
export const BOMBS: BombDef[] = [
  {
    id: 'cherry_bomb',
    name: 'Pháo Nổ',
    description: 'Phá nổ phạm vi nhỏ, thu hoạch 3 phần quặng cùng lúc.',
    oreMultiplier: 3,
    clearsMonster: false,
    craftCost: [
      { itemId: 'copper_ore', quantity: 12 },
      { itemId: 'firewood', quantity: 15 }
    ],
    craftMoney: 100,
    shopPrice: null
  },
  {
    id: 'bomb',
    name: 'Gói Thuốc Súng',
    description: 'Phá nổ phạm vi lớn, thu hoạch 5 phần quặng và tiêu diệt quái vật.',
    oreMultiplier: 5,
    clearsMonster: true,
    craftCost: [
      { itemId: 'iron_ore', quantity: 12 },
      { itemId: 'firewood', quantity: 18 },
      { itemId: 'quartz', quantity: 5 }
    ],
    craftMoney: 250,
    shopPrice: null
  },
  {
    id: 'mega_bomb',
    name: 'Bom Lôi Hỏa',
    description: 'Phá nổ phạm vi cực lớn, thu hoạch 8 phần quặng và dọn sạch quái vật.',
    oreMultiplier: 8,
    clearsMonster: true,
    craftCost: [
      { itemId: 'gold_ore', quantity: 18 },
      { itemId: 'iron_ore', quantity: 15 },
      { itemId: 'firewood', quantity: 25 },
      { itemId: 'ruby', quantity: 3 }
    ],
    craftMoney: 500,
    shopPrice: null
  }
]

export const getBombById = (id: string): BombDef | undefined => {
  return BOMBS.find(b => b.id === id)
}
