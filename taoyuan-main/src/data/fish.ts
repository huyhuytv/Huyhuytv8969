import type { FishDef, FishingLocation } from '@/types'

/** 钓鱼地点定义 */
export const FISHING_LOCATIONS: { id: FishingLocation; name: string; description: string }[] = [
  { id: 'creek', name: 'Dòng Suối', description: 'Con suối trong vắt cạnh làng, thích hợp cho người mới câu cá.' },
  { id: 'pond', name: 'Ao Hồ', description: 'Ao nước tĩnh lặng trong làng, mặt nước phẳng lặng như gương.' },
  { id: 'river', name: 'Sông Lớn', description: 'Dòng sông chảy xiết, có những loài cá lớn hơn xuất hiện.' },
  { id: 'mine', name: 'Sông Ngầm Hang Mỏ', description: 'Khu vực nước ngầm sâu trong hang mỏ, các loài cá không bị ảnh hưởng bởi mùa vụ.' },
  { id: 'waterfall', name: 'Thác Nước', description: 'Đầm sâu dưới thác nước trong núi, chỉ có cao thủ mới có thể thu hoạch ở đây.' },
  { id: 'swamp', name: 'Đầm Lầy', description: 'Vùng đất ngập nước bên ngoài Đào Nguyên Hương, nơi sinh sống của những sinh vật thủy sinh kỳ lạ.' }
]

/** 所有鱼类定义 (60种) */
export const FISH: FishDef[] = [
  // ==================== 溪流 (creek) — 15 种 ====================
  {
    id: 'crucian',
    name: 'Cá diếc',
    season: ['spring', 'summer', 'autumn', 'winter'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 15,
    description: 'Loài cá nước ngọt phổ biến nhất, người bạn tốt của tân thủ.',
    location: 'creek',
    miniGameSpeed: 0.8,
    miniGameDirChange: 0.02
  },
  {
    id: 'carp',
    name: 'Cá chép',
    season: ['spring', 'summer'],
    weather: ['sunny'],
    difficulty: 'easy',
    sellPrice: 25,
    description: 'Loài cá thường thấy bên bờ suối vào những ngày nắng.',
    location: 'creek',
    miniGameSpeed: 1.0,
    miniGameDirChange: 0.03
  },
  {
    id: 'silver_carp',
    name: 'Cá Mè Bạc',
    season: ['spring', 'summer'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 20,
    description: 'Cá mè bạc thường gặp.',
    location: 'creek',
    miniGameSpeed: 1.2,
    miniGameDirChange: 0.03
  },
  {
    id: 'ice_fish',
    name: 'Cá Băng',
    season: ['winter'],
    weather: ['snowy'],
    difficulty: 'normal',
    sellPrice: 55,
    description: 'Loài cá nhỏ sống ở vùng nước lạnh giá.',
    location: 'creek',
    miniGameSpeed: 1.8,
    miniGameDirChange: 0.04
  },
  {
    id: 'dragonfish',
    name: 'Cá Rồng',
    season: ['summer'],
    weather: ['stormy'],
    difficulty: 'legendary',
    sellPrice: 500,
    description: 'Loài cá truyền thuyết chỉ xuất hiện trong giông bão.',
    location: 'creek',
    miniGameSpeed: 5.0,
    miniGameDirChange: 0.1
  },
  // 溪流新增
  {
    id: 'minnow',
    name: 'Cá Mương',
    season: ['spring', 'summer', 'autumn'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 10,
    description: 'Loài cá suối không mấy nổi bật, thường đi thành từng đàn vài ba con.',
    location: 'creek',
    miniGameSpeed: 0.6,
    miniGameDirChange: 0.02
  },
  {
    id: 'creek_chub',
    name: 'Cá Chép Suối',
    season: ['spring', 'autumn'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 18,
    description: 'Loài cá nhỏ linh hoạt trong dòng suối.',
    location: 'creek',
    miniGameSpeed: 1.3,
    miniGameDirChange: 0.04
  },
  {
    id: 'loach',
    name: 'Cá chạch',
    season: ['summer', 'autumn'],
    weather: ['rainy'],
    difficulty: 'easy',
    sellPrice: 22,
    description: 'Cá chạch suối hoạt động mạnh sau cơn mưa.',
    location: 'creek',
    miniGameSpeed: 1.5,
    miniGameDirChange: 0.05
  },
  {
    id: 'rainbow_trout',
    name: 'Cá Hồi Vân',
    season: ['spring', 'summer'],
    weather: ['sunny'],
    difficulty: 'normal',
    sellPrice: 45,
    description: 'Cá hồi lấp lánh ánh sáng thất sắc dưới ánh mặt trời.',
    location: 'creek',
    miniGameSpeed: 2.2,
    miniGameDirChange: 0.05
  },
  {
    id: 'creek_perch',
    name: 'Cá Vược Suối',
    season: ['autumn', 'winter'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 50,
    description: 'Cá vược suối sống trong dòng suối vào cuối thu.',
    location: 'creek',
    miniGameSpeed: 1.8,
    miniGameDirChange: 0.03
  },
  {
    id: 'stone_loach',
    name: 'Cá Mú',
    season: ['summer'],
    weather: ['sunny', 'windy'],
    difficulty: 'normal',
    sellPrice: 55,
    description: 'Loài cá vằn lẩn trốn trong các khe đá suối.',
    location: 'creek',
    miniGameSpeed: 1.5,
    miniGameDirChange: 0.06
  },
  {
    id: 'creek_shrimp',
    name: 'Tôm suối',
    season: ['spring', 'summer', 'autumn'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 30,
    description: 'Loài tôm nhỏ sống trong nước suối trong vắt.',
    location: 'creek',
    miniGameSpeed: 2.0,
    miniGameDirChange: 0.06
  },
  {
    id: 'creek_salmon',
    name: 'Cá Hồi Suối',
    season: ['autumn'],
    weather: ['rainy', 'windy'],
    difficulty: 'normal',
    sellPrice: 65,
    description: 'Cá hồi suối bơi ngược dòng vào mùa thu.',
    location: 'creek',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.03
  },
  {
    id: 'golden_perch',
    name: 'Cá Vược Vàng',
    season: ['summer'],
    weather: ['sunny'],
    difficulty: 'hard',
    sellPrice: 110,
    description: 'Loài cá vược vàng hiếm thấy, giá trị không nhỏ.',
    location: 'creek',
    miniGameSpeed: 3.5,
    miniGameDirChange: 0.05
  },
  {
    id: 'creek_king',
    name: 'Bá Chủ Dòng Suối',
    season: ['spring', 'autumn'],
    weather: ['rainy'],
    difficulty: 'hard',
    sellPrice: 140,
    description: 'Vị vua của dòng suối, sức mạnh vô cùng.',
    location: 'creek',
    miniGameSpeed: 3.5,
    miniGameDirChange: 0.04
  },

  // ==================== 池塘 (pond) — 10 种 ====================
  {
    id: 'grass_carp',
    name: 'Cá trắm cỏ',
    season: ['summer', 'autumn'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 40,
    description: 'Loài cá nước ngọt có kích thước khá lớn.',
    location: 'pond',
    miniGameSpeed: 1.5,
    miniGameDirChange: 0.03
  },
  {
    id: 'koi',
    name: 'Chép Koi',
    season: ['spring'],
    weather: ['sunny'],
    difficulty: 'hard',
    sellPrice: 120,
    description: 'Cá chép Koi lộng lẫy, vô cùng trân quý.',
    location: 'pond',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.08
  },
  {
    id: 'golden_carp',
    name: 'Chép Vàng',
    season: ['spring'],
    weather: ['sunny'],
    difficulty: 'hard',
    sellPrice: 150,
    description: 'Cá chép vàng lấp lánh tỏa sáng.',
    location: 'pond',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.09
  },
  {
    id: 'golden_turtle',
    name: 'Rùa Kim Giáp',
    season: ['autumn'],
    weather: ['sunny'],
    difficulty: 'legendary',
    sellPrice: 450,
    description: 'Linh quy cõng giáp vàng trong truyền thuyết, nghe nói ai nhìn thấy sẽ có phúc.',
    location: 'pond',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.12
  },
  // 池塘新增
  {
    id: 'pond_snail',
    name: 'Ốc Bươu',
    season: ['spring', 'summer', 'autumn'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 12,
    description: 'Ốc bươu sống dưới đáy ao.',
    location: 'pond',
    miniGameSpeed: 0.5,
    miniGameDirChange: 0.01
  },
  {
    id: 'crucian_pond',
    name: 'Cá Diếc Ao',
    season: ['spring', 'summer'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 18,
    description: 'Cá diếc béo ngậy sống trong ao.',
    location: 'pond',
    miniGameSpeed: 0.9,
    miniGameDirChange: 0.02
  },
  {
    id: 'red_tail',
    name: 'Cá Đuôi Đỏ',
    season: ['summer', 'autumn'],
    weather: ['sunny'],
    difficulty: 'easy',
    sellPrice: 25,
    description: 'Cá cảnh có vây đuôi đỏ rực.',
    location: 'pond',
    miniGameSpeed: 1.1,
    miniGameDirChange: 0.03
  },
  {
    id: 'lotus_carp',
    name: 'Cá Chép Hoa Sen',
    season: ['summer'],
    weather: ['sunny', 'rainy'],
    difficulty: 'normal',
    sellPrice: 65,
    description: 'Cá chép bơi lội qua lại giữa những lá sen.',
    location: 'pond',
    miniGameSpeed: 2.2,
    miniGameDirChange: 0.06
  },
  {
    id: 'pond_turtle',
    name: 'Rùa',
    season: ['summer', 'autumn'],
    weather: ['sunny'],
    difficulty: 'normal',
    sellPrice: 50,
    description: 'Rùa nhỏ phơi nắng bên ao.',
    location: 'pond',
    miniGameSpeed: 1.0,
    miniGameDirChange: 0.02
  },
  {
    id: 'moon_fish',
    name: 'Cá Nguyệt Quang',
    season: ['autumn'],
    weather: ['windy'],
    difficulty: 'normal',
    sellPrice: 75,
    description: 'Loài cá trắng bạc nổi lên mặt nước khi có gió thu.',
    location: 'pond',
    miniGameSpeed: 1.8,
    miniGameDirChange: 0.05
  },

  // ==================== 江河 (river) — 12 种 ====================
  {
    id: 'bass',
    name: 'Cá vược',
    season: ['autumn'],
    weather: ['rainy', 'stormy'],
    difficulty: 'normal',
    sellPrice: 60,
    description: 'Loài cá thơm ngon xuất hiện trong mưa thu.',
    location: 'river',
    miniGameSpeed: 2.0,
    miniGameDirChange: 0.04
  },
  {
    id: 'catfish',
    name: 'Cá trê',
    season: ['summer'],
    weather: ['rainy', 'stormy'],
    difficulty: 'normal',
    sellPrice: 45,
    description: 'Cá trê hoạt động mạnh vào ngày mưa.',
    location: 'river',
    miniGameSpeed: 2.2,
    miniGameDirChange: 0.05
  },
  {
    id: 'sturgeon',
    name: 'Cá Tầm',
    season: ['summer', 'autumn'],
    weather: ['sunny'],
    difficulty: 'hard',
    sellPrice: 130,
    description: 'Loài cá cổ đại có kích thước khổng lồ.',
    location: 'river',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.03
  },
  {
    id: 'mandarin_fish',
    name: 'Cá Quế',
    season: ['autumn'],
    weather: ['sunny'],
    difficulty: 'normal',
    sellPrice: 70,
    description: 'Cá quế có thịt vô cùng tươi ngon.',
    location: 'river',
    miniGameSpeed: 2.3,
    miniGameDirChange: 0.05
  },
  // 江河新增
  {
    id: 'green_fish',
    name: 'Cá Trắm Đen',
    season: ['spring', 'summer', 'autumn'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 28,
    description: 'Loài cá nước ngọt cỡ lớn thường gặp ở các con sông.',
    location: 'river',
    miniGameSpeed: 1.0,
    miniGameDirChange: 0.02
  },
  {
    id: 'bighead_carp',
    name: 'Cá Mè Hoa',
    season: ['summer', 'autumn'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 30,
    description: 'Cá mè hoa đầu to mình tròn.',
    location: 'river',
    miniGameSpeed: 0.8,
    miniGameDirChange: 0.02
  },
  {
    id: 'pike',
    name: 'Cá Nhám Nước Ngọt',
    season: ['summer'],
    weather: ['sunny', 'windy'],
    difficulty: 'normal',
    sellPrice: 65,
    description: 'Kẻ săn mồi nước ngọt hung dữ.',
    location: 'river',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.03
  },
  {
    id: 'knife_fish',
    name: 'Cá Đao',
    season: ['spring'],
    weather: ['windy', 'rainy'],
    difficulty: 'normal',
    sellPrice: 75,
    description: 'Thân hình như lưỡi đao, bơi ngược dòng lúc lũ mùa xuân.',
    location: 'river',
    miniGameSpeed: 2.8,
    miniGameDirChange: 0.03
  },
  {
    id: 'river_crab',
    name: 'Cua Sông',
    season: ['autumn'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 80,
    description: 'Trời thu cua béo, gạch đầy thịt chắc.',
    location: 'river',
    miniGameSpeed: 1.5,
    miniGameDirChange: 0.07
  },
  {
    id: 'river_eel',
    name: 'Lươn Sông',
    season: ['summer', 'autumn'],
    weather: ['rainy'],
    difficulty: 'hard',
    sellPrice: 100,
    description: 'Lươn sống trên sông hoạt động mạnh vào những đêm mưa.',
    location: 'river',
    miniGameSpeed: 3.5,
    miniGameDirChange: 0.07
  },
  {
    id: 'chinese_sturgeon',
    name: 'Cá Tầm Trung Hoa',
    season: ['spring', 'autumn'],
    weather: ['rainy', 'stormy'],
    difficulty: 'hard',
    sellPrice: 180,
    description: 'Loài cá bơi ngược dòng cỡ lớn vô cùng quý hiếm.',
    location: 'river',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.03
  },
  {
    id: 'river_dragon',
    name: 'Giang Long',
    season: ['summer'],
    weather: ['stormy'],
    difficulty: 'legendary',
    sellPrice: 550,
    description: 'Loài cá khổng lồ truyền thuyết vọt lên khỏi mặt sông trong giông bão.',
    location: 'river',
    miniGameSpeed: 5.5,
    miniGameDirChange: 0.05
  },

  // ==================== 矿洞暗河 (mine) — 8 种 ====================
  {
    id: 'cave_loach',
    name: 'Chạch Hang Mỏ',
    season: ['spring', 'summer', 'autumn', 'winter'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 35,
    description: 'Cá chạch sống trong nước ngầm của hang mỏ.',
    location: 'mine',
    miniGameSpeed: 2.0,
    miniGameDirChange: 0.05
  },
  {
    id: 'cave_blindfish',
    name: 'Cá Mù Hang Động',
    season: ['spring', 'summer', 'autumn', 'winter'],
    weather: ['any'],
    difficulty: 'hard',
    sellPrice: 100,
    description: 'Loài cá mù quý hiếm sống sâu trong hang mỏ.',
    location: 'mine',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.09
  },
  // 矿洞新增
  {
    id: 'glowfish',
    name: 'Cá Dạ Quang',
    season: ['spring', 'summer', 'autumn', 'winter'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 25,
    description: 'Loài cá nhỏ phát ra ánh sáng mờ ảo trong bóng tối.',
    location: 'mine',
    miniGameSpeed: 0.8,
    miniGameDirChange: 0.03
  },
  {
    id: 'stone_crab',
    name: 'Cua đá',
    season: ['spring', 'summer', 'autumn', 'winter'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 30,
    description: 'Loài cua nhỏ sống giữa các kẽ đá trong hang mỏ.',
    location: 'mine',
    miniGameSpeed: 0.7,
    miniGameDirChange: 0.02
  },
  {
    id: 'crystal_shrimp',
    name: 'Tôm Pha Lê',
    season: ['spring', 'summer', 'autumn', 'winter'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 60,
    description: 'Loài tôm hang mỏ có thân hình trong suốt, tựa như pha lê.',
    location: 'mine',
    miniGameSpeed: 2.2,
    miniGameDirChange: 0.06
  },
  {
    id: 'lava_snail',
    name: 'Ốc Dung Nham',
    season: ['spring', 'summer', 'autumn', 'winter'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 70,
    description: 'Loài ốc chịu nhiệt sống gần tầng dung nham.',
    location: 'mine',
    miniGameSpeed: 1.2,
    miniGameDirChange: 0.03
  },
  {
    id: 'shadow_fish',
    name: 'Cá Bóng Tối',
    season: ['spring', 'summer', 'autumn', 'winter'],
    weather: ['any'],
    difficulty: 'hard',
    sellPrice: 120,
    description: 'Loài cá u ám xuất hiện trong khe nứt bóng tối.',
    location: 'mine',
    miniGameSpeed: 3.5,
    miniGameDirChange: 0.08
  },
  {
    id: 'abyss_leviathan',
    name: 'Cự mãng vực thẳm',
    season: ['spring', 'summer', 'autumn', 'winter'],
    weather: ['any'],
    difficulty: 'legendary',
    sellPrice: 800,
    description: 'Cự thú viễn cổ sống sâu nhất trong hang mỏ, chưa một ai thấy được toàn mạo của nó.',
    location: 'mine',
    miniGameSpeed: 4.5,
    miniGameDirChange: 0.15
  },

  // ==================== 瀑布 (waterfall) — 8 种 ====================
  {
    id: 'eel',
    name: 'Lươn',
    season: ['summer', 'autumn'],
    weather: ['rainy'],
    difficulty: 'hard',
    sellPrice: 85,
    description: 'Con lươn trơn tuột, không dễ đánh bắt.',
    location: 'waterfall',
    miniGameSpeed: 3.5,
    miniGameDirChange: 0.08
  },
  // 瀑布新增
  {
    id: 'mountain_minnow',
    name: 'Cá Suối Núi',
    season: ['spring', 'summer', 'autumn'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 20,
    description: 'Loài cá nhỏ bơi ven đầm nước dưới thác.',
    location: 'waterfall',
    miniGameSpeed: 1.0,
    miniGameDirChange: 0.03
  },
  {
    id: 'rock_fish',
    name: 'Cá Đá',
    season: ['spring', 'summer'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 50,
    description: 'Loài cá lẩn trốn giữa các vách đá thác nước.',
    location: 'waterfall',
    miniGameSpeed: 1.8,
    miniGameDirChange: 0.04
  },
  {
    id: 'waterfall_crab',
    name: 'Cua Suối Núi',
    season: ['summer', 'autumn'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 55,
    description: 'Loài cua sống trong khe đá dưới thác nước.',
    location: 'waterfall',
    miniGameSpeed: 1.5,
    miniGameDirChange: 0.06
  },
  {
    id: 'torrent_fish',
    name: 'Cá Thác Ghềnh',
    season: ['spring', 'summer'],
    weather: ['rainy', 'stormy'],
    difficulty: 'normal',
    sellPrice: 60,
    description: 'Loài cá khỏe mạnh bơi ngược dòng thác chảy xiết.',
    location: 'waterfall',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.03
  },
  {
    id: 'flying_fish',
    name: 'Cá Chuồn',
    season: ['summer'],
    weather: ['windy'],
    difficulty: 'normal',
    sellPrice: 70,
    description: 'Loài cá kỳ lạ có thể vọt lên mặt nước và lướt đi trong gió.',
    location: 'waterfall',
    miniGameSpeed: 3.0,
    miniGameDirChange: 0.07
  },
  {
    id: 'rock_eel',
    name: 'Lươn Đá',
    season: ['autumn', 'winter'],
    weather: ['rainy', 'snowy'],
    difficulty: 'hard',
    sellPrice: 130,
    description: 'Con lươn lớn cuộn mình trong hang đá dưới đầm sâu thác nước.',
    location: 'waterfall',
    miniGameSpeed: 3.0,
    miniGameDirChange: 0.04
  },
  {
    id: 'jade_dragon',
    name: 'Thúy Long',
    season: ['spring'],
    weather: ['rainy'],
    difficulty: 'legendary',
    sellPrice: 600,
    description: 'Linh long màu xanh ngọc hóa hình tại thác nước trong cơn mưa xuân.',
    location: 'waterfall',
    miniGameSpeed: 4.5,
    miniGameDirChange: 0.07
  },

  // ==================== 沼泽 (swamp) — 7 种 ====================
  {
    id: 'giant_salamander',
    name: 'Cá Cóc',
    season: ['winter'],
    weather: ['snowy'],
    difficulty: 'legendary',
    sellPrice: 300,
    description: 'Sinh vật bí ẩn trong truyền thuyết, chỉ xuất hiện giữa trời tuyết mùa đông.',
    location: 'swamp',
    miniGameSpeed: 2.0,
    miniGameDirChange: 0.1
  },
  // 沼泽新增
  {
    id: 'mud_loach',
    name: 'Chạch Đầm Lầy',
    season: ['spring', 'summer', 'autumn'],
    weather: ['any'],
    difficulty: 'easy',
    sellPrice: 15,
    description: 'Cá chạch cuộn lộn trong vũng bùn lầy.',
    location: 'swamp',
    miniGameSpeed: 1.2,
    miniGameDirChange: 0.04
  },
  {
    id: 'swamp_frog',
    name: 'Cá Ếch',
    season: ['summer', 'autumn'],
    weather: ['rainy'],
    difficulty: 'normal',
    sellPrice: 35,
    description: 'Sinh vật kỳ lạ nửa ếch nửa cá.',
    location: 'swamp',
    miniGameSpeed: 2.0,
    miniGameDirChange: 0.08
  },
  {
    id: 'yellow_eel',
    name: 'Lươn Đồng',
    season: ['summer'],
    weather: ['rainy', 'stormy'],
    difficulty: 'normal',
    sellPrice: 50,
    description: 'Lươn đồng chui ra khỏi hang bùn sau cơn mưa.',
    location: 'swamp',
    miniGameSpeed: 2.3,
    miniGameDirChange: 0.05
  },
  {
    id: 'snapping_turtle',
    name: 'Rùa Cá Sấu',
    season: ['summer', 'autumn'],
    weather: ['any'],
    difficulty: 'normal',
    sellPrice: 65,
    description: 'Loài rùa đầm lầy có tính khí nóng nảy.',
    location: 'swamp',
    miniGameSpeed: 1.5,
    miniGameDirChange: 0.06
  },
  {
    id: 'swamp_catfish',
    name: 'Cá Trê Đầm Lầy',
    season: ['spring', 'summer'],
    weather: ['rainy', 'stormy'],
    difficulty: 'normal',
    sellPrice: 55,
    description: 'Loài cá trê khổng lồ sống sâu trong đầm lầy.',
    location: 'swamp',
    miniGameSpeed: 1.8,
    miniGameDirChange: 0.04
  },
  {
    id: 'miasma_fish',
    name: 'Cá Chướng Khí',
    season: ['autumn', 'winter'],
    weather: ['rainy', 'windy'],
    difficulty: 'hard',
    sellPrice: 110,
    description: 'Loài cá quỷ dị xuất hiện trong đầm sâu ngập tràn chướng khí.',
    location: 'swamp',
    miniGameSpeed: 2.5,
    miniGameDirChange: 0.09
  },
  {
    id: 'ancient_newt',
    name: 'Kỳ Giông Viễn Cổ',
    season: ['spring', 'winter'],
    weather: ['snowy', 'rainy'],
    difficulty: 'hard',
    sellPrice: 160,
    description: 'Loài kỳ giông nghe nói đã sống trong đầm lầy từ thời viễn cổ.',
    location: 'swamp',
    miniGameSpeed: 2.0,
    miniGameDirChange: 0.08
  }
]

/** 根据ID获取鱼 */
export const getFishById = (id: string): FishDef | undefined => {
  return FISH.find(f => f.id === id)
}

/** 获取当前季节、天气和地点可钓到的鱼 */
export const getAvailableFish = (season: string, weather: string, location?: FishingLocation): FishDef[] => {
  return FISH.filter(f => {
    const seasonMatch = f.season.includes(season as any)
    const weatherMatch = f.weather.includes('any') || f.weather.includes(weather as any)
    const locationMatch = !location || (f.location ?? 'creek') === location
    return seasonMatch && weatherMatch && locationMatch
  })
}
