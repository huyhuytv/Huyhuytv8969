import type { AchievementDef, CommunityBundleDef } from '@/types'

/** 成就列表 */
export const ACHIEVEMENTS: AchievementDef[] = [
  // 收集
  {
    id: 'collector_10',
    name: 'Sơ Xuất Mao Lư',
    description: 'Phát hiện 10 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 10 },
    reward: { money: 200 }
  },
  {
    id: 'collector_30',
    name: 'Nhà Bác Vật Học',
    description: 'Phát hiện 30 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 30 },
    reward: { money: 500 }
  },
  {
    id: 'collector_60',
    name: 'Vạn vật thông giám',
    description: 'Phát hiện 60 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 60 },
    reward: { money: 1500 }
  },
  // 农耕
  {
    id: 'farmer_50',
    name: 'Nông Phu Chăm Chỉ',
    description: 'Tích lũy thu hoạch cây trồng 50 lần.',
    condition: { type: 'cropHarvest', count: 50 },
    reward: { money: 300 }
  },
  {
    id: 'farmer_200',
    name: 'Vua Thu Hoạch',
    description: 'Tích lũy thu hoạch cây trồng 200 lần.',
    condition: { type: 'cropHarvest', count: 200 },
    reward: { money: 1000, items: [{ itemId: 'compost', quantity: 10 }] }
  },
  // 钓鱼
  {
    id: 'fisher_20',
    name: 'Tân Thủ Câu Cá',
    description: 'Tích lũy câu được 20 con cá.',
    condition: { type: 'fishCaught', count: 20 },
    reward: { money: 200 }
  },
  {
    id: 'fisher_100',
    name: 'Ngư Ông',
    description: 'Tích lũy câu được 100 con cá.',
    condition: { type: 'fishCaught', count: 100 },
    reward: { money: 800 }
  },
  // 挖矿
  {
    id: 'miner_15',
    name: 'Nhà Thám Hiểm Mỏ',
    description: 'Xuống tới tầng 15 của hang mỏ.',
    condition: { type: 'mineFloor', floor: 15 },
    reward: { money: 300 }
  },
  {
    id: 'miner_30',
    name: 'Thợ Mỏ Vực Thẳm',
    description: 'Xuống tới tầng 30 của hang mỏ.',
    condition: { type: 'mineFloor', floor: 30 },
    reward: { money: 1000, items: [{ itemId: 'gold_ore', quantity: 10 }] }
  },
  {
    id: 'miner_60',
    name: 'Kẻ Chinh Phục Dung Nham',
    description: 'Xuống tới tầng 60 của hang mỏ.',
    condition: { type: 'mineFloor', floor: 60 },
    reward: { money: 2000, items: [{ itemId: 'gold_ore', quantity: 20 }] }
  },
  {
    id: 'miner_120',
    name: 'Người Đi Trong Vực Thẳm',
    description: 'Xuống tới tầng đáy của hang mỏ.',
    condition: { type: 'mineFloor', floor: 120 },
    reward: { money: 5000, items: [{ itemId: 'void_ore', quantity: 10 }] }
  },
  {
    id: 'skull_25',
    name: 'Nhà Thám Hiểm Đầu Lâu',
    description: 'Xuống tới tầng 25 của Huyệt mỏ Đầu Lâu.',
    condition: { type: 'skullCavernFloor', floor: 25 },
    reward: { money: 3000, items: [{ itemId: 'iridium_ore', quantity: 5 }] }
  },
  {
    id: 'skull_100',
    name: 'Dũng Sĩ Vực Thẳm',
    description: 'Xuống tới tầng 100 của Huyệt mỏ Đầu Lâu.',
    condition: { type: 'skullCavernFloor', floor: 100 },
    reward: { money: 10000, items: [{ itemId: 'prismatic_shard', quantity: 1 }] }
  },
  // 金钱
  {
    id: 'rich_5000',
    name: 'Gia Đình Khá Giả',
    description: 'Tích lũy nhận được 5000 xu.',
    condition: { type: 'moneyEarned', amount: 5000 },
    reward: { money: 500 }
  },
  {
    id: 'rich_20000',
    name: 'Phú Hào Đào Nguyên',
    description: 'Tích lũy nhận được 20000 xu.',
    condition: { type: 'moneyEarned', amount: 20000 },
    reward: { money: 2000 }
  },
  // 烹饪
  {
    id: 'chef_10',
    name: 'Trù Nghệ Chớm Thành',
    description: 'Tích lũy nấu 10 món ăn.',
    condition: { type: 'recipesCooked', count: 10 },
    reward: { money: 300 }
  },
  {
    id: 'chef_50',
    name: 'Đại Sư Ẩm Thực',
    description: 'Tích lũy nấu 50 món ăn.',
    condition: { type: 'recipesCooked', count: 50 },
    reward: { money: 1000 }
  },
  // 技能
  {
    id: 'skill_master',
    name: 'Tinh thông kỹ nghệ',
    description: 'Kỹ năng Trồng Trọt đạt cấp 10.',
    condition: { type: 'skillLevel', skillType: 'farming', level: 10 },
    reward: { money: 2000 }
  },
  // 社交
  {
    id: 'social_friend',
    name: 'Nhân Duyên Tốt',
    description: 'Đạt mức thiện cảm "Quen biết" với tất cả dân làng.',
    condition: { type: 'npcFriendship', level: 'acquaintance' },
    reward: { money: 500 }
  },
  // 任务
  {
    id: 'quest_10',
    name: 'Người Nhiệt Tình Trong Thôn',
    description: 'Tích lũy hoàn thành 10 nhiệm vụ ủy thác.',
    condition: { type: 'questsCompleted', count: 10 },
    reward: { money: 500 }
  },
  {
    id: 'quest_40',
    name: 'Hữu Cầu Tất Ứng',
    description: 'Tích lũy hoàn thành 40 nhiệm vụ ủy thác.',
    condition: { type: 'questsCompleted', count: 40 },
    reward: { money: 2500 }
  },
  // 好感
  {
    id: 'friend_best',
    name: 'Tri Kỷ',
    description: 'Trở thành chí hữu với 1 người dân làng.',
    condition: { type: 'npcBestFriend', count: 1 },
    reward: { money: 200 }
  },
  {
    id: 'friend_all_friendly',
    name: 'Người bạn Đào Nguyên',
    description: 'Trở thành bạn bè với tất cả dân làng.',
    condition: { type: 'npcAllFriendly' },
    reward: { money: 1000, items: [{ itemId: 'jade_ring', quantity: 1 }] }
  },
  // 婚姻 & 子女
  {
    id: 'married',
    name: 'Trăm năm hạnh phúc',
    description: 'Kết duyên vợ chồng với người trong mộng.',
    condition: { type: 'married' },
    reward: { money: 1314 }
  },
  {
    id: 'parent',
    name: 'Niềm vui thiên luân',
    description: 'Chào đón đứa con đầu lòng.',
    condition: { type: 'hasChild' },
    reward: { money: 520 }
  },
  // 怪物击杀
  {
    id: 'slayer_50',
    name: 'Tân Thủ Trừ Ma',
    description: 'Tích lũy tiêu diệt 50 quái vật.',
    condition: { type: 'monstersKilled', count: 50 },
    reward: { money: 300 }
  },
  {
    id: 'slayer_200',
    name: 'Cao Thủ Hàng Yêu',
    description: 'Tích lũy tiêu diệt 200 quái vật.',
    condition: { type: 'monstersKilled', count: 200 },
    reward: { money: 1000 }
  },
  {
    id: 'slayer_500',
    name: 'Trảm Yêu Trừ Ma',
    description: 'Tích lũy tiêu diệt 500 quái vật.',
    condition: { type: 'monstersKilled', count: 500 },
    reward: { money: 3000 }
  },
  {
    id: 'slayer_1000',
    name: 'Kẻ thù của vạn ma',
    description: 'Tích lũy tiêu diệt 1000 quái vật.',
    condition: { type: 'monstersKilled', count: 1000 },
    reward: { money: 5000, items: [{ itemId: 'prismatic_shard', quantity: 1 }] }
  },
  // 出货
  {
    id: 'shipper_10',
    name: 'Mới Bước Vào Thương Trường',
    description: 'Xuất hàng 10 loại vật phẩm khác nhau.',
    condition: { type: 'shippedCount', count: 10 },
    reward: { money: 300 }
  },
  {
    id: 'shipper_30',
    name: 'Đạt Nhân Vận Chuyển',
    description: 'Xuất hàng 30 loại vật phẩm khác nhau.',
    condition: { type: 'shippedCount', count: 30 },
    reward: { money: 1000 }
  },
  {
    id: 'full_shipment',
    name: 'Bản đồ xuất hàng',
    description: 'Xuất hàng tất cả những vật phẩm có thể xuất hàng.',
    condition: { type: 'fullShipment' },
    reward: { money: 5000 }
  },
  // 畜牧
  {
    id: 'rancher_5',
    name: 'Tân Thủ Chăn Nuôi',
    description: 'Sở hữu 5 vật nuôi.',
    condition: { type: 'animalCount', count: 5 },
    reward: { money: 500 }
  },
  {
    id: 'rancher_15',
    name: 'Chủ Mục Trường',
    description: 'Sở hữu 15 vật nuôi.',
    condition: { type: 'animalCount', count: 15 },
    reward: { money: 2000 }
  },
  // 更高金钱
  {
    id: 'rich_50000',
    name: 'Phú giáp nhất phương',
    description: 'Tích lũy nhận được 50000 xu.',
    condition: { type: 'moneyEarned', amount: 50000 },
    reward: { money: 3000 }
  },
  {
    id: 'rich_200000',
    name: 'Sự Giàu Có Của Đào Chu',
    description: 'Tích lũy nhận được 200000 xu.',
    condition: { type: 'moneyEarned', amount: 200000 },
    reward: { money: 10000 }
  },
  // 更多农耕 & 钓鱼
  {
    id: 'farmer_500',
    name: 'Đại Hanh Điền Viên',
    description: 'Tích lũy thu hoạch cây trồng 500 lần.',
    condition: { type: 'cropHarvest', count: 500 },
    reward: { money: 2000 }
  },
  {
    id: 'fisher_200',
    name: 'Hải Long Vương',
    description: 'Tích lũy câu được 200 con cá.',
    condition: { type: 'fishCaught', count: 200 },
    reward: { money: 2000 }
  },
  // 全技能 & 全祠堂
  {
    id: 'all_skills',
    name: 'Bậc thầy toàn năng',
    description: 'Tất cả kỹ năng đều đạt cấp 10.',
    condition: { type: 'allSkillsMax' },
    reward: { money: 5000 }
  },
  {
    id: 'all_bundles',
    name: 'Tình quê viên mãn',
    description: 'Hoàn thành tất cả nhiệm vụ Từ Đường.',
    condition: { type: 'allBundlesComplete' },
    reward: { money: 5000 }
  },
  // 更多收集 & 烹饪 & 委托 & 好感
  {
    id: 'collector_100',
    name: 'Bác vật toàn tài',
    description: 'Phát hiện 100 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 100 },
    reward: { money: 3000 }
  },
  {
    id: 'chef_100',
    name: 'Ngự đầu bếp',
    description: 'Tích lũy nấu 100 món ăn.',
    condition: { type: 'recipesCooked', count: 100 },
    reward: { money: 2000 }
  },
  {
    id: 'quest_80',
    name: 'Biết tuốt',
    description: 'Tích lũy hoàn thành 80 nhiệm vụ ủy thác.',
    condition: { type: 'questsCompleted', count: 80 },
    reward: { money: 3000 }
  },
  {
    id: 'friend_all_best',
    name: 'Chí Hữu Chốn Nhân Gian',
    description: 'Trở thành chí hữu với 6 người dân làng.',
    condition: { type: 'npcBestFriend', count: 6 },
    reward: { money: 3000, items: [{ itemId: 'jade_ring', quantity: 1 }] }
  },
  // 收集
  {
    id: 'collector_5',
    name: 'Bé Ngoan Tò Mò',
    description: 'Phát hiện 5 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 5 },
    reward: { money: 100 }
  },
  {
    id: 'collector_20',
    name: 'Kiến Đa Thức Quảng',
    description: 'Phát hiện 20 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 20 },
    reward: { money: 300 }
  },
  {
    id: 'collector_45',
    name: 'Vật Hoa Thiên Bảo',
    description: 'Phát hiện 45 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 45 },
    reward: { money: 800 }
  },
  {
    id: 'collector_80',
    name: 'Bách Khoa Toàn Thư',
    description: 'Phát hiện 80 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 80 },
    reward: { money: 2000 }
  },
  {
    id: 'collector_120',
    name: 'Thiên Địa Vạn Vật',
    description: 'Phát hiện 120 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 120 },
    reward: { money: 5000 }
  },
  {
    id: 'collector_150',
    name: 'Toàn Tri Toàn Năng',
    description: 'Phát hiện 150 loại vật phẩm khác nhau.',
    condition: { type: 'itemCount', count: 150 },
    reward: { money: 8000, items: [{ itemId: 'prismatic_shard', quantity: 1 }] }
  },

  // 农耕
  {
    id: 'farmer_10',
    name: 'Tân Thủ Cày Cấy',
    description: 'Tích lũy thu hoạch cây trồng 10 lần.',
    condition: { type: 'cropHarvest', count: 10 },
    reward: { money: 100 }
  },
  {
    id: 'farmer_100',
    name: 'Tinh Canh Tế Tác',
    description: 'Tích lũy thu hoạch cây trồng 100 lần.',
    condition: { type: 'cropHarvest', count: 100 },
    reward: { money: 500 }
  },
  {
    id: 'farmer_1000',
    name: 'Huyền Thoại Điền Viên',
    description: 'Tích lũy thu hoạch cây trồng 1000 lần.',
    condition: { type: 'cropHarvest', count: 1000 },
    reward: { money: 5000, items: [{ itemId: 'iridium_ore', quantity: 5 }] }
  },

  // 钓鱼
  {
    id: 'fisher_5',
    name: 'Thiếu Niên Bên Sông',
    description: 'Tích lũy câu được 5 con cá.',
    condition: { type: 'fishCaught', count: 5 },
    reward: { money: 100 }
  },
  {
    id: 'fisher_50',
    name: 'Ý Của Ngư Ông',
    description: 'Tích lũy câu được 50 con cá.',
    condition: { type: 'fishCaught', count: 50 },
    reward: { money: 500 }
  },
  {
    id: 'fisher_500',
    name: 'Ngư Long Bách Biến',
    description: 'Tích lũy câu được 500 con cá.',
    condition: { type: 'fishCaught', count: 500 },
    reward: { money: 5000, items: [{ itemId: 'prismatic_shard', quantity: 1 }] }
  },

  // 金钱
  {
    id: 'rich_1000',
    name: 'Bắt Đầu Có Tích Lũy',
    description: 'Tích lũy nhận được 1000 xu.',
    condition: { type: 'moneyEarned', amount: 1000 },
    reward: { money: 100 }
  },
  {
    id: 'rich_10000',
    name: 'Cẩm Y Ngọc Thực',
    description: 'Tích lũy nhận được 10000 xu.',
    condition: { type: 'moneyEarned', amount: 10000 },
    reward: { money: 1000 }
  },
  {
    id: 'rich_100000',
    name: 'Gia Tài Bạc Tỷ',
    description: 'Tích lũy nhận được 100000 xu.',
    condition: { type: 'moneyEarned', amount: 100000 },
    reward: { money: 5000 }
  },
  {
    id: 'rich_500000',
    name: 'Phú Khả Địch Quốc',
    description: 'Tích lũy nhận được 500000 xu.',
    condition: { type: 'moneyEarned', amount: 500000 },
    reward: { money: 15000 }
  },
  {
    id: 'rich_1000000',
    name: 'Biển Bạc Núi Vàng',
    description: 'Tích lũy nhận được 1000000 xu.',
    condition: { type: 'moneyEarned', amount: 1000000 },
    reward: { money: 30000, items: [{ itemId: 'prismatic_shard', quantity: 3 }] }
  },

  // 烹饪
  {
    id: 'chef_5',
    name: 'Mới Học Nấu Ăn',
    description: 'Tích lũy nấu 5 món ăn.',
    condition: { type: 'recipesCooked', count: 5 },
    reward: { money: 100 }
  },
  {
    id: 'chef_25',
    name: 'Hảo Thủ Nghề Bếp',
    description: 'Tích lũy nấu 25 món ăn.',
    condition: { type: 'recipesCooked', count: 25 },
    reward: { money: 500 }
  },
  {
    id: 'chef_75',
    name: 'Truyền Nhân Thực Thần',
    description: 'Tích lũy nấu 75 món ăn.',
    condition: { type: 'recipesCooked', count: 75 },
    reward: { money: 1500 }
  },

  // 委托
  {
    id: 'quest_5',
    name: 'Trợ Nhân Vi Lạc',
    description: 'Tích lũy hoàn thành 5 nhiệm vụ ủy thác.',
    condition: { type: 'questsCompleted', count: 5 },
    reward: { money: 200 }
  },
  {
    id: 'quest_20',
    name: 'Tín Sứ Đạt Nhân',
    description: 'Tích lũy hoàn thành 20 nhiệm vụ ủy thác.',
    condition: { type: 'questsCompleted', count: 20 },
    reward: { money: 1000 }
  },
  {
    id: 'quest_60',
    name: 'Sứ Mệnh Tất Đạt',
    description: 'Tích lũy hoàn thành 60 nhiệm vụ ủy thác.',
    condition: { type: 'questsCompleted', count: 60 },
    reward: { money: 2000 }
  },
  {
    id: 'quest_100',
    name: 'Vạn Sự Thông Đạt',
    description: 'Tích lũy hoàn thành 100 nhiệm vụ ủy thác.',
    condition: { type: 'questsCompleted', count: 100 },
    reward: { money: 5000, items: [{ itemId: 'dragon_jade', quantity: 1 }] }
  },

  // 怪物击杀
  {
    id: 'slayer_10',
    name: 'Lần Đầu Thử Sức',
    description: 'Tích lũy tiêu diệt 10 quái vật.',
    condition: { type: 'monstersKilled', count: 10 },
    reward: { money: 100 }
  },
  {
    id: 'slayer_100',
    name: 'Trừ Bạo An Dân',
    description: 'Tích lũy tiêu diệt 100 quái vật.',
    condition: { type: 'monstersKilled', count: 100 },
    reward: { money: 500 }
  },
  {
    id: 'slayer_300',
    name: 'Khắc Tinh Yêu Ma',
    description: 'Tích lũy tiêu diệt 300 quái vật.',
    condition: { type: 'monstersKilled', count: 300 },
    reward: { money: 2000 }
  },
  {
    id: 'slayer_2000',
    name: 'Khoáng Thế Ma Liệp',
    description: 'Tích lũy tiêu diệt 2000 quái vật.',
    condition: { type: 'monstersKilled', count: 2000 },
    reward: { money: 10000, items: [{ itemId: 'dragon_jade', quantity: 2 }] }
  },

  // 出货
  {
    id: 'shipper_5',
    name: 'Lần Đầu Thử Giao Thương',
    description: 'Xuất hàng 5 loại vật phẩm khác nhau.',
    condition: { type: 'shippedCount', count: 5 },
    reward: { money: 100 }
  },
  {
    id: 'shipper_20',
    name: 'Thương Lộ Thông Đạt',
    description: 'Xuất hàng 20 loại vật phẩm khác nhau.',
    condition: { type: 'shippedCount', count: 20 },
    reward: { money: 500 }
  },
  {
    id: 'shipper_50',
    name: 'Đại Hanh Thương Mại',
    description: 'Xuất hàng 50 loại vật phẩm khác nhau.',
    condition: { type: 'shippedCount', count: 50 },
    reward: { money: 2000 }
  },

  // 畜牧
  {
    id: 'rancher_1',
    name: 'Lần Đầu Nuôi Súc Vật',
    description: 'Sở hữu 1 vật nuôi.',
    condition: { type: 'animalCount', count: 1 },
    reward: { money: 100 }
  },
  {
    id: 'rancher_3',
    name: 'Mục Trường Nhỏ',
    description: 'Sở hữu 3 vật nuôi.',
    condition: { type: 'animalCount', count: 3 },
    reward: { money: 300 }
  },
  {
    id: 'rancher_10',
    name: 'Đạt Nhân Chăn Nuôi',
    description: 'Sở hữu 10 vật nuôi.',
    condition: { type: 'animalCount', count: 10 },
    reward: { money: 1000 }
  },
  {
    id: 'rancher_20',
    name: 'Huyền Thoại Mục Trường',
    description: 'Sở hữu 20 vật nuôi.',
    condition: { type: 'animalCount', count: 20 },
    reward: { money: 3000, items: [{ itemId: 'iridium_ore', quantity: 3 }] }
  },

  // 矿洞
  {
    id: 'miner_5',
    name: 'Lần Đầu Vào Mỏ',
    description: 'Xuống tới tầng 5 của hang mỏ.',
    condition: { type: 'mineFloor', floor: 5 },
    reward: { money: 100 }
  },
  {
    id: 'miner_45',
    name: 'Mạch Khoáng Băng Giá',
    description: 'Xuống tới tầng 45 của hang mỏ.',
    condition: { type: 'mineFloor', floor: 45 },
    reward: { money: 1500, items: [{ itemId: 'iron_ore', quantity: 15 }] }
  },
  {
    id: 'miner_90',
    name: 'Hang Động Pha Lê',
    description: 'Xuống tới tầng 90 của hang mỏ.',
    condition: { type: 'mineFloor', floor: 90 },
    reward: { money: 3000, items: [{ itemId: 'crystal_ore', quantity: 10 }] }
  },
  {
    id: 'miner_100',
    name: 'Dũng Sĩ Trăm Tầng',
    description: 'Xuống tới tầng 100 của hang mỏ.',
    condition: { type: 'mineFloor', floor: 100 },
    reward: { money: 4000, items: [{ itemId: 'shadow_ore', quantity: 5 }] }
  },

  // 骷髅矿穴
  {
    id: 'skull_10',
    name: 'Lần Đầu Thăm Dò Đầu Lâu',
    description: 'Xuống tới tầng 10 của Huyệt mỏ Đầu Lâu.',
    condition: { type: 'skullCavernFloor', floor: 10 },
    reward: { money: 1000 }
  },
  {
    id: 'skull_50',
    name: 'Hành Trình Vực Thẳm',
    description: 'Xuống tới tầng 50 của Huyệt mỏ Đầu Lâu.',
    condition: { type: 'skullCavernFloor', floor: 50 },
    reward: { money: 5000, items: [{ itemId: 'iridium_ore', quantity: 10 }] }
  },
  {
    id: 'skull_75',
    name: 'Kẻ Hành Tẩu Minh Giới',
    description: 'Xuống tới tầng 75 của Huyệt mỏ Đầu Lâu.',
    condition: { type: 'skullCavernFloor', floor: 75 },
    reward: { money: 8000, items: [{ itemId: 'dragon_jade', quantity: 1 }] }
  },
  {
    id: 'skull_150',
    name: 'Vực Thẳm Vô Tận',
    description: 'Xuống tới tầng 150 của Huyệt mỏ Đầu Lâu.',
    condition: { type: 'skullCavernFloor', floor: 150 },
    reward: { money: 20000, items: [{ itemId: 'prismatic_shard', quantity: 2 }] }
  },

  // 好感
  {
    id: 'friend_best_2',
    name: 'Hai Ba Tri Kỷ',
    description: 'Trở thành chí hữu với 2 người dân làng.',
    condition: { type: 'npcBestFriend', count: 2 },
    reward: { money: 500 }
  },
  {
    id: 'friend_best_3',
    name: 'Mạc Nghịch Chi Giao',
    description: 'Trở thành chí hữu với 3 người dân làng.',
    condition: { type: 'npcBestFriend', count: 3 },
    reward: { money: 1000 }
  },
  {
    id: 'friend_best_4',
    name: 'Tứ Hải Giai Huynh Đệ',
    description: 'Trở thành chí hữu với 4 người dân làng.',
    condition: { type: 'npcBestFriend', count: 4 },
    reward: { money: 2000 }
  },

  // 社交（补充）
  {
    id: 'social_all_friendly',
    name: 'Rộng kết thiện duyên',
    description: 'Đạt mức thiện cảm "Thân thiết" với tất cả dân làng.',
    condition: { type: 'npcFriendship', level: 'friendly' },
    reward: { money: 2000 }
  },

  // 技能等级
  {
    id: 'farming_5',
    name: 'Canh Chủng Hữu Đạo',
    description: 'Kỹ năng Trồng Trọt đạt cấp 5.',
    condition: { type: 'skillLevel', skillType: 'farming', level: 5 },
    reward: { money: 300 }
  },
  {
    id: 'foraging_5',
    name: 'Đứa Con Của Núi Rừng',
    description: 'Kỹ năng Thu Thập đạt cấp 5.',
    condition: { type: 'skillLevel', skillType: 'foraging', level: 5 },
    reward: { money: 300 }
  },
  {
    id: 'foraging_10',
    name: 'Tông Sư Thu Thập',
    description: 'Kỹ năng Thu Thập đạt cấp 10.',
    condition: { type: 'skillLevel', skillType: 'foraging', level: 10 },
    reward: { money: 2000 }
  },
  {
    id: 'fishing_5',
    name: 'Câu Cá Nhập Môn',
    description: 'Kỹ năng Câu Cá đạt cấp 5.',
    condition: { type: 'skillLevel', skillType: 'fishing', level: 5 },
    reward: { money: 300 }
  },
  {
    id: 'fishing_10',
    name: 'Tông Sư Câu Cá',
    description: 'Kỹ năng Câu Cá đạt cấp 10.',
    condition: { type: 'skillLevel', skillType: 'fishing', level: 10 },
    reward: { money: 2000 }
  },
  {
    id: 'mining_5',
    name: 'Cảm Ứng Mạch Khoáng',
    description: 'Kỹ năng Khai Khoáng đạt cấp 5.',
    condition: { type: 'skillLevel', skillType: 'mining', level: 5 },
    reward: { money: 300 }
  },
  {
    id: 'mining_10',
    name: 'Tông Sư Khai Khoáng',
    description: 'Kỹ năng Khai Khoáng đạt cấp 10.',
    condition: { type: 'skillLevel', skillType: 'mining', level: 10 },
    reward: { money: 2000 }
  },
  {
    id: 'combat_5',
    name: 'Sơ Thiệp Giang Hồ',
    description: 'Kỹ năng Chiến Đấu đạt cấp 5.',
    condition: { type: 'skillLevel', skillType: 'combat', level: 5 },
    reward: { money: 300 }
  },
  {
    id: 'combat_10',
    name: 'Võ Lâm Cao Thủ',
    description: 'Kỹ năng Chiến Đấu đạt cấp 10.',
    condition: { type: 'skillLevel', skillType: 'combat', level: 10 },
    reward: { money: 2000 }
  },

  // 育种
  {
    id: 'breeding_1',
    name: 'Lần Đầu Lai Tạo',
    description: 'Hoàn thành lai tạo hạt giống 1 lần.',
    condition: { type: 'breedingsDone', count: 1 },
    reward: { money: 200 }
  },
  {
    id: 'breeding_10',
    name: 'Học Đồ Lai Tạo',
    description: 'Tích lũy hoàn thành lai tạo hạt giống 10 lần.',
    condition: { type: 'breedingsDone', count: 10 },
    reward: { money: 500 }
  },
  {
    id: 'breeding_50',
    name: 'Chuyên Gia Lai Tạo',
    description: 'Tích lũy hoàn thành lai tạo hạt giống 50 lần.',
    condition: { type: 'breedingsDone', count: 50 },
    reward: { money: 2000 }
  },
  {
    id: 'breeding_200',
    name: 'Đại Sư Lai Tạo',
    description: 'Tích lũy hoàn thành lai tạo hạt giống 200 lần.',
    condition: { type: 'breedingsDone', count: 200 },
    reward: { money: 5000 }
  },
  {
    id: 'hybrid_1',
    name: 'Sinh Ra Giống Mới',
    description: 'Phát hiện 1 giống cây lai tạo.',
    condition: { type: 'hybridsDiscovered', count: 1 },
    reward: { money: 300 }
  },
  {
    id: 'hybrid_5',
    name: 'Nhà Sưu Tầm Giống Cây',
    description: 'Phát hiện 5 giống cây lai tạo.',
    condition: { type: 'hybridsDiscovered', count: 5 },
    reward: { money: 800 }
  },
  {
    id: 'hybrid_20',
    name: 'Từ Điển Lai Tạo',
    description: 'Phát hiện 20 giống cây lai tạo.',
    condition: { type: 'hybridsDiscovered', count: 20 },
    reward: { money: 2000 }
  },
  {
    id: 'hybrid_50',
    name: 'Tông Sư Giống Cây',
    description: 'Phát hiện 50 giống cây lai tạo.',
    condition: { type: 'hybridsDiscovered', count: 50 },
    reward: { money: 5000 }
  },
  {
    id: 'hybrid_100',
    name: 'Vạn Chủng Đồ Lục',
    description: 'Phát hiện 100 giống cây lai tạo.',
    condition: { type: 'hybridsDiscovered', count: 100 },
    reward: { money: 10000, items: [{ itemId: 'prismatic_shard', quantity: 1 }] }
  },
  {
    id: 'tier_3',
    name: 'Đột Phá Đời Thứ Ba',
    description: 'Nuôi cấy thành công giống cây lai tạo đời thứ 3.',
    condition: { type: 'hybridTier', tier: 3 },
    reward: { money: 1000 }
  },
  {
    id: 'tier_5',
    name: 'Truyền Thừa Đời Thứ Năm',
    description: 'Nuôi cấy thành công giống cây lai tạo đời thứ 5.',
    condition: { type: 'hybridTier', tier: 5 },
    reward: { money: 3000 }
  },
  {
    id: 'tier_7',
    name: 'Thần Phẩm Đời Thứ Bảy',
    description: 'Nuôi cấy thành công giống cây lai tạo đời thứ 7.',
    condition: { type: 'hybridTier', tier: 7 },
    reward: { money: 5000 }
  },
  {
    id: 'tier_10',
    name: 'Đăng Phong Tạo Cực',
    description: 'Nuôi cấy thành công giống cây lai tạo đời thứ 10.',
    condition: { type: 'hybridTier', tier: 10 },
    reward: { money: 15000, items: [{ itemId: 'prismatic_shard', quantity: 2 }] }
  },

  // 育种出货
  {
    id: 'hybrid_ship_1',
    name: 'Lần Đầu Bán Đồ Lai',
    description: 'Xuất hàng 1 loại nông sản lai tạo.',
    condition: { type: 'hybridsShipped', count: 1 },
    reward: { money: 300 }
  },
  {
    id: 'hybrid_ship_5',
    name: 'Giống Tốt Xuất Khẩu',
    description: 'Xuất hàng 5 loại nông sản lai tạo.',
    condition: { type: 'hybridsShipped', count: 5 },
    reward: { money: 800 }
  },
  {
    id: 'hybrid_ship_15',
    name: 'Thương Nhân Đồ Lai',
    description: 'Xuất hàng 15 loại nông sản lai tạo.',
    condition: { type: 'hybridsShipped', count: 15 },
    reward: { money: 2000 }
  },
  {
    id: 'hybrid_ship_30',
    name: 'Lưu Thông Giống Tốt',
    description: 'Xuất hàng 30 loại nông sản lai tạo.',
    condition: { type: 'hybridsShipped', count: 30 },
    reward: { money: 5000 }
  },
  {
    id: 'hybrid_ship_50',
    name: 'Toàn Giám Xuất Hàng Lai Tạo',
    description: 'Xuất hàng 50 loại nông sản lai tạo.',
    condition: { type: 'hybridsShipped', count: 50 },
    reward: { money: 10000, items: [{ itemId: 'prismatic_shard', quantity: 1 }] }
  },
  // 博物馆
  {
    id: 'museum_20',
    name: 'Người Đam Mê Sưu Tầm',
    description: 'Quyên góp 20 vật phẩm cho bảo tàng.',
    condition: { type: 'museumDonations', count: 20 },
    reward: { money: 1000 }
  },
  {
    id: 'museum_36',
    name: 'Ngôi sao bảo tàng',
    description: 'Quyên góp 36 vật phẩm cho bảo tàng.',
    condition: { type: 'museumDonations', count: 36 },
    reward: { money: 5000, items: [{ itemId: 'prismatic_shard', quantity: 1 }] }
  },
  {
    id: 'museum_40',
    name: 'Linh vật toàn giám',
    description: 'Hoàn thành toàn bộ bộ sưu tập 40 món đồ của bảo tàng (bao gồm cả vật phẩm Tiên Linh).',
    condition: { type: 'museumDonations', count: 40 },
    reward: { money: 8000 }
  },
  // 冒险家公会
  {
    id: 'guild_5',
    name: 'Thợ Săn Quái Vật',
    description: 'Hoàn thành 5 mục tiêu thảo phạt.',
    condition: { type: 'guildGoalsCompleted', count: 5 },
    reward: { money: 1000 }
  },
  {
    id: 'guild_21',
    name: 'Dũng Sĩ Đồ Long',
    description: 'Hoàn thành toàn bộ 21 mục tiêu thảo phạt.',
    condition: { type: 'guildGoalsCompleted', count: 21 },
    reward: { money: 10000, items: [{ itemId: 'iridium_bar', quantity: 5 }] }
  },
  // 仙灵
  {
    id: 'spirit_first',
    name: 'Linh Giác Chớm Mở',
    description: 'Phát hiện Tiên Linh đầu tiên.',
    condition: { type: 'hiddenNpcRevealed', count: 1 },
    reward: { money: 500 }
  },
  {
    id: 'spirit_three',
    name: 'Người Thông Linh',
    description: 'Phát hiện 3 Tiên Linh.',
    condition: { type: 'hiddenNpcRevealed', count: 3 },
    reward: { money: 2000 }
  },
  {
    id: 'spirit_all',
    name: 'Vạn Linh Quy Tâm',
    description: 'Phát hiện toàn bộ 6 Tiên Linh.',
    condition: { type: 'hiddenNpcRevealed', count: 6 },
    reward: { money: 5000, items: [{ itemId: 'prismatic_shard', quantity: 1 }] }
  },
  {
    id: 'spirit_bonded',
    name: 'Tiên Duyên Trời Định',
    description: 'Kết duyên với một vị Tiên Linh.',
    condition: { type: 'hiddenNpcBonded' },
    reward: { money: 1314 }
  },
  {
    id: 'spirit_peach_found',
    name: 'Hương Vị Tiên Đào',
    description: 'Nhận được Linh Đào.',
    condition: { type: 'itemDiscovered', itemId: 'spirit_peach' },
    reward: { money: 300 }
  },
  {
    id: 'moon_herb_found',
    name: 'Lần Đầu Hái Nguyệt Hoa',
    description: 'Nhận được Nguyệt Thảo.',
    condition: { type: 'itemDiscovered', itemId: 'moon_herb' },
    reward: { money: 300 }
  },
  {
    id: 'dream_silk_found',
    name: 'Mộng Ty Như Lụa',
    description: 'Nhận được Mộng Ty.',
    condition: { type: 'itemDiscovered', itemId: 'dream_silk' },
    reward: { money: 300 }
  }
]

/** 祠堂任务板 */
export const COMMUNITY_BUNDLES: CommunityBundleDef[] = [
  {
    id: 'spring_bundle',
    name: 'Món Quà Xuân Canh',
    description: 'Bộ sưu tập sản vật mùa xuân.',
    requiredItems: [
      { itemId: 'cabbage', quantity: 5 },
      { itemId: 'radish', quantity: 5 },
      { itemId: 'bamboo_shoot', quantity: 3 },
      { itemId: 'tea', quantity: 2 }
    ],
    reward: { money: 500, items: [{ itemId: 'seed_peach', quantity: 3 }], description: '500 Xu + Hạt giống đào ×3' }
  },
  {
    id: 'summer_bundle',
    name: 'Món Quà Giữa Hè',
    description: 'Bộ sưu tập sản vật mùa hè.',
    requiredItems: [
      { itemId: 'watermelon', quantity: 3 },
      { itemId: 'rice', quantity: 5 },
      { itemId: 'lotus_root', quantity: 2 },
      { itemId: 'chili', quantity: 3 }
    ],
    reward: { money: 800, items: [{ itemId: 'seed_lotus_seed', quantity: 2 }], description: '800 Xu + Hạt giống sen hồng ×2' }
  },
  {
    id: 'autumn_bundle',
    name: 'Món Quà Thu Vàng',
    description: 'Bộ sưu tập sản vật mùa thu.',
    requiredItems: [
      { itemId: 'pumpkin', quantity: 3 },
      { itemId: 'osmanthus', quantity: 2 },
      { itemId: 'jujube', quantity: 3 },
      { itemId: 'persimmon', quantity: 2 }
    ],
    reward: { money: 800, items: [{ itemId: 'seed_snow_lotus', quantity: 1 }], description: '800 Xu + Hạt giống tuyết liên ×1' }
  },
  {
    id: 'winter_bundle',
    name: 'Món Quà Mùa Đông Khắc Nghiệt',
    description: 'Bộ sưu tập sản vật mùa đông.',
    requiredItems: [
      { itemId: 'winter_bamboo_shoot', quantity: 5 },
      { itemId: 'winter_wheat', quantity: 3 },
      { itemId: 'garlic', quantity: 3 },
      { itemId: 'ginger', quantity: 2 }
    ],
    reward: { money: 1000, description: '1000 Xu' }
  },
  {
    id: 'artisan_bundle',
    name: 'Món Quà Tâm Huyết',
    description: 'Bộ sưu tập các loại sản phẩm chế biến.',
    requiredItems: [
      { itemId: 'watermelon_wine', quantity: 1 },
      { itemId: 'pickled_cabbage', quantity: 1 },
      { itemId: 'honey', quantity: 2 },
      { itemId: 'sesame_oil', quantity: 1 },
      { itemId: 'peach_wine', quantity: 1 }
    ],
    reward: { money: 2000, description: '2000 Xu' }
  },
  {
    id: 'friendship_bundle',
    name: 'Món Quà Tình Quê',
    description: 'Xây dựng mối quan hệ hữu hảo với tất cả dân làng.',
    requiredItems: [
      { itemId: 'wintersweet', quantity: 2 },
      { itemId: 'chrysanthemum', quantity: 2 },
      { itemId: 'osmanthus', quantity: 2 }
    ],
    reward: { money: 1500, description: '1500 Xu' }
  },
  // 渔获
  {
    id: 'fish_bundle',
    name: 'Món Quà Của Biển Cả',
    description: 'Bộ sưu tập các loại cá đánh bắt ở nhiều vùng nước khác nhau.',
    requiredItems: [
      { itemId: 'crucian', quantity: 3 },
      { itemId: 'carp', quantity: 3 },
      { itemId: 'bass', quantity: 2 },
      { itemId: 'catfish', quantity: 1 }
    ],
    reward: { money: 1000, description: '1000 Xu' }
  },
  {
    id: 'rare_fish_bundle',
    name: 'Món Quà Quý Hiếm Tươi Ngon',
    description: 'Những loài cá quý hiếm khó lòng thấy được.',
    requiredItems: [
      { itemId: 'sturgeon', quantity: 1 },
      { itemId: 'mandarin_fish', quantity: 1 },
      { itemId: 'koi', quantity: 1 },
      { itemId: 'eel', quantity: 1 }
    ],
    reward: { money: 2500, items: [{ itemId: 'iridium_ore', quantity: 3 }], description: '2500 Xu + Quặng Iridium ×3' }
  },
  // 矿石与宝石
  {
    id: 'ore_bundle',
    name: 'Món Quà Quặng Đá',
    description: 'Các loại quặng đá thu thập được trong hang mỏ.',
    requiredItems: [
      { itemId: 'copper_ore', quantity: 10 },
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'gold_ore', quantity: 3 },
      { itemId: 'quartz', quantity: 3 }
    ],
    reward: { money: 1000, description: '1000 Xu' }
  },
  {
    id: 'gem_bundle',
    name: 'Món Quà Trân Bảo',
    description: 'Bộ sưu tập các loại đá quý tỏa sáng chói lọi.',
    requiredItems: [
      { itemId: 'jade', quantity: 2 },
      { itemId: 'ruby', quantity: 1 },
      { itemId: 'moonstone', quantity: 1 },
      { itemId: 'obsidian', quantity: 1 }
    ],
    reward: { money: 3000, items: [{ itemId: 'dragon_jade', quantity: 1 }], description: '3000 Xu + Long Ngọc ×1' }
  },
  // 畜产品
  {
    id: 'animal_bundle',
    name: 'Món Quà Mục Trường',
    description: 'Món quà mà các loài động vật trong mục trường ban tặng.',
    requiredItems: [
      { itemId: 'egg', quantity: 5 },
      { itemId: 'milk', quantity: 3 },
      { itemId: 'duck_egg', quantity: 2 },
      { itemId: 'wool', quantity: 2 }
    ],
    reward: { money: 1500, description: '1500 Xu' }
  },
  {
    id: 'egg_bundle',
    name: 'Món Quà Trăm Trứng',
    description: 'Thu thập các loại trứng của những loài chim quý hiếm.',
    requiredItems: [
      { itemId: 'egg', quantity: 3 },
      { itemId: 'duck_egg', quantity: 2 },
      { itemId: 'goose_egg', quantity: 1 },
      { itemId: 'quail_egg', quantity: 2 },
      { itemId: 'silkie_egg', quantity: 1 }
    ],
    reward: { money: 1200, description: '1200 Xu' }
  },
  {
    id: 'milk_bundle',
    name: 'Món Quà Sữa Tươi',
    description: 'Các loại sản phẩm chế biến từ sữa tươi.',
    requiredItems: [
      { itemId: 'milk', quantity: 3 },
      { itemId: 'goat_milk', quantity: 2 },
      { itemId: 'buffalo_milk', quantity: 1 },
      { itemId: 'yak_milk', quantity: 1 }
    ],
    reward: { money: 1500, description: '1500 Xu' }
  },
  // 加工品
  {
    id: 'wine_bundle',
    name: 'Món Quà Mỹ Tửu',
    description: 'Những loại mỹ tửu được ủ cẩn thận.',
    requiredItems: [
      { itemId: 'watermelon_wine', quantity: 1 },
      { itemId: 'peach_wine', quantity: 1 },
      { itemId: 'jujube_wine', quantity: 1 },
      { itemId: 'osmanthus_wine', quantity: 1 },
      { itemId: 'corn_wine', quantity: 1 }
    ],
    reward: { money: 2500, description: '2500 Xu' }
  },
  {
    id: 'tea_bundle',
    name: 'Món Quà Trà Đạo',
    description: 'Những loại danh trà thưởng thức được cả bốn mùa.',
    requiredItems: [
      { itemId: 'green_tea_drink', quantity: 2 },
      { itemId: 'chrysanthemum_tea', quantity: 2 },
      { itemId: 'osmanthus_tea', quantity: 1 },
      { itemId: 'ginseng_tea', quantity: 1 }
    ],
    reward: { money: 1500, description: '1500 Xu' }
  },
  {
    id: 'pickle_bundle',
    name: 'Món Quà Đồ Muối',
    description: 'Các món ăn vặt hương vị muối dưa.',
    requiredItems: [
      { itemId: 'pickled_cabbage', quantity: 2 },
      { itemId: 'pickled_chili', quantity: 2 },
      { itemId: 'pickled_ginger', quantity: 2 },
      { itemId: 'dried_radish', quantity: 2 }
    ],
    reward: { money: 1000, description: '1000 Xu' }
  },
  {
    id: 'smoked_bundle',
    name: 'Món Quà Đồ Hun Khói',
    description: 'Các loại cá tươi mang hương vị hun khói.',
    requiredItems: [
      { itemId: 'smoked_crucian', quantity: 1 },
      { itemId: 'smoked_carp', quantity: 1 },
      { itemId: 'smoked_bass', quantity: 1 },
      { itemId: 'smoked_eel', quantity: 1 },
      { itemId: 'smoked_sturgeon', quantity: 1 }
    ],
    reward: { money: 2000, description: '2000 Xu' }
  },
  {
    id: 'honey_bundle',
    name: 'Món Quà Mật Ong',
    description: 'Sự ngọt ngào được ủ nên từ trăm loài hoa.',
    requiredItems: [
      { itemId: 'honey', quantity: 3 },
      { itemId: 'chrysanthemum_honey', quantity: 1 },
      { itemId: 'osmanthus_honey', quantity: 1 },
      { itemId: 'rapeseed_honey', quantity: 1 }
    ],
    reward: { money: 1800, description: '1800 Xu' }
  },
  {
    id: 'cheese_bundle',
    name: 'Món Quà Phô Mai',
    description: 'Các loại phô mai mang nhiều hương vị khác nhau.',
    requiredItems: [
      { itemId: 'cheese', quantity: 2 },
      { itemId: 'goat_cheese', quantity: 1 },
      { itemId: 'buffalo_cheese', quantity: 1 },
      { itemId: 'yak_cheese', quantity: 1 }
    ],
    reward: { money: 1500, description: '1500 Xu' }
  },
  {
    id: 'bar_bundle',
    name: 'Món Quà Trăm Nghề',
    description: 'Các loại thỏi kim loại và nguyên vật liệu cơ bản.',
    requiredItems: [
      { itemId: 'copper_bar', quantity: 5 },
      { itemId: 'iron_bar', quantity: 3 },
      { itemId: 'gold_bar', quantity: 2 },
      { itemId: 'charcoal', quantity: 5 }
    ],
    reward: { money: 2000, items: [{ itemId: 'iridium_bar', quantity: 1 }], description: '2000 Xu + Thỏi Iridium ×1' }
  },
  // 育种
  {
    id: 'hybrid_spring_bundle',
    name: 'Xuân Hoa Lai Tạo',
    description: 'Những thu hoạch bước đầu về nông sản lai tạo mùa xuân.',
    requiredItems: [
      { itemId: 'emerald_radish', quantity: 2 },
      { itemId: 'jade_shoot', quantity: 2 },
      { itemId: 'peach_blossom_tea', quantity: 1 },
      { itemId: 'twin_bean', quantity: 2 }
    ],
    reward: { money: 1500, description: '1500 Xu' }
  },
  {
    id: 'hybrid_summer_bundle',
    name: 'Hạ Thực Lai Tạo',
    description: 'Thành quả sung túc của nông sản lai tạo mùa hè.',
    requiredItems: [
      { itemId: 'purple_melon', quantity: 2 },
      { itemId: 'golden_rice', quantity: 2 },
      { itemId: 'double_lotus', quantity: 1 },
      { itemId: 'fire_sesame', quantity: 2 }
    ],
    reward: { money: 1500, description: '1500 Xu' }
  },
  {
    id: 'hybrid_autumn_bundle',
    name: 'Thu Vận Lai Tạo',
    description: 'Hương vị bội thu của nông sản lai tạo mùa thu.',
    requiredItems: [
      { itemId: 'amber_yam', quantity: 2 },
      { itemId: 'twin_blossom', quantity: 1 },
      { itemId: 'golden_persimmon', quantity: 2 },
      { itemId: 'autumn_gem', quantity: 1 }
    ],
    reward: { money: 1500, description: '1500 Xu' }
  },
  {
    id: 'hybrid_winter_bundle',
    name: 'Đông Tàng Lai Tạo',
    description: 'Vật phẩm trân quý giữa trời đông giá rét của nông sản lai tạo mùa đông.',
    requiredItems: [
      { itemId: 'jade_white', quantity: 2 },
      { itemId: 'garlic_cabbage', quantity: 2 },
      { itemId: 'evergreen_herb', quantity: 2 },
      { itemId: 'allium_king', quantity: 1 }
    ],
    reward: { money: 1500, description: '1500 Xu' }
  },
  {
    id: 'hybrid_elite_bundle',
    name: 'Trân Phẩm Đời Thứ Hai',
    description: 'Bộ sưu tập quý hiếm của những giống cây lai tạo đời thứ 2.',
    requiredItems: [
      { itemId: 'melon_tea_fruit', quantity: 1 },
      { itemId: 'dragon_fire', quantity: 1 },
      { itemId: 'celestial_rice', quantity: 1 },
      { itemId: 'ice_lotus', quantity: 1 },
      { itemId: 'golden_dragon', quantity: 1 }
    ],
    reward: { money: 5000, items: [{ itemId: 'iridium_ore', quantity: 5 }], description: '5000 Xu + Quặng Iridium ×5' }
  },
  {
    id: 'hybrid_legendary_bundle',
    name: 'Giống Tốt Truyền Thuyết',
    description: 'Kiệt tác lưu truyền muôn đời của những giống cây lai tạo bậc cao.',
    requiredItems: [
      { itemId: 'dragon_pearl', quantity: 1 },
      { itemId: 'immortal_flower', quantity: 1 },
      { itemId: 'jade_golden_melon', quantity: 1 },
      { itemId: 'moonlight_frost', quantity: 1 }
    ],
    reward: { money: 8000, items: [{ itemId: 'prismatic_shard', quantity: 1 }], description: '8000 Xu + Mảnh Vỡ Lăng Kính ×1' }
  }
]

export const getAchievementById = (id: string): AchievementDef | undefined => {
  return ACHIEVEMENTS.find(a => a.id === id)
}

export const getBundleById = (id: string): CommunityBundleDef | undefined => {
  return COMMUNITY_BUNDLES.find(b => b.id === id)
}
