/** 晨间提示定义 */
export interface MorningTipDef {
  id: string
  priority: number
  conditionKey: string
  message: string
}

/**
 * 18 条晨间提示，按优先级排序。
 * conditionKey 在 useEndDay 的晨间提示逻辑中映射为实际判断函数。
 */
export const MORNING_TIPS: MorningTipDef[] = [
  {
    id: 'tip_welcome',
    priority: 1,
    conditionKey: 'earlyFirstDay',
    message: 'Trưởng thôn Liễu nói: 「Chào mừng đến với Đào Nguyên Hương! Trong ba lô có hạt giống cải thảo, hãy vào bảng nông trại để khai khẩn đất và gieo hạt nhé.」'
  },
  {
    id: 'tip_first_till',
    priority: 2,
    conditionKey: 'allWasteland',
    message: 'Trưởng thôn Liễu nói: 「Ruộng đất phải khai khẩn trước mới trồng trọt được. Trong bảng nông trại nhấn \'Thao tác nhanh\' → \'Khai khẩn nhanh\'.」'
  },
  {
    id: 'tip_first_plant',
    priority: 3,
    conditionKey: 'tilledNoPlanted',
    message: 'Trưởng thôn Liễu nói: 「Đất đã khai khẩn xong, vào bảng nông trại gieo hạt thôi. \'Trồng nhanh\' có thể gieo hạt hàng loạt.」'
  },
  {
    id: 'tip_first_water',
    priority: 4,
    conditionKey: 'plantedUnwatered',
    message: 'Trưởng thôn Liễu nói: 「Gieo hạt xong nhớ tưới nước, không tưới nước cây sẽ không lớn đâu. Thử \'Tưới nước nhanh\' xem.」'
  },
  {
    id: 'tip_first_harvest',
    priority: 5,
    conditionKey: 'hasHarvestable',
    message: 'Trưởng thôn Liễu nói: 「Cây trồng chín rồi! Vào bảng nông trại thu hoạch đi, ô đất màu vàng là cây đã chín.」'
  },
  {
    id: 'tip_sell_crops',
    priority: 6,
    conditionKey: 'harvestedNeverSold',
    message: 'Trưởng thôn Liễu nói: 「Bỏ cây trồng thu hoạch được vào thùng xuất hàng ở dưới cùng bảng nông trại, qua ngày hôm sau là có tiền rồi.」'
  },
  {
    id: 'tip_check_weather',
    priority: 7,
    conditionKey: 'earlyGame',
    message: 'Trưởng thôn Liễu nói: 「Mỗi ngày nhớ xem dự báo thời tiết, sắp xếp trước công việc trong ngày sẽ làm ít công to.」'
  },
  {
    id: 'tip_stamina',
    priority: 8,
    conditionKey: 'staminaWasLow',
    message: 'Trưởng thôn Liễu nói: 「Không đủ thể lực thì nghỉ ngơi sớm, thức khuya sẽ ảnh hưởng đến việc hồi phục ngày hôm sau. Ăn uống cũng có thể bổ sung thể lực.」'
  },
  {
    id: 'tip_visit_shop',
    priority: 9,
    conditionKey: 'neverVisitedShop',
    message: 'Trưởng thôn Liễu nói: 「Khu thương mại có bán các loại hạt giống và đạo cụ, có thời gian thì ghé xem sao.」'
  },
  { id: 'tip_try_fishing', priority: 10, conditionKey: 'neverFished', message: 'Trưởng thôn Liễu nói: 「Dòng suối trong ở phía đông làng nhiều cá tôm lắm, mang cần câu ra đó thử câu xem.」' },
  {
    id: 'tip_try_mining',
    priority: 11,
    conditionKey: 'neverMined',
    message: 'Trưởng thôn Liễu nói: 「Hang mỏ ở phía bắc làng có quặng và báu vật, nhưng cũng có quái vật, hãy cẩn thận.」'
  },
  {
    id: 'tip_talk_npc',
    priority: 12,
    conditionKey: 'neverTalkedNpc',
    message: 'Trưởng thôn Liễu nói: 「Hàng xóm láng giềng với nhau, hãy trò chuyện với mọi người nhiều hơn, tặng quà cũng giúp tăng thêm tình cảm.」'
  },
  {
    id: 'tip_quest_board',
    priority: 13,
    conditionKey: 'neverCheckedQuests',
    message: 'Trưởng thôn Liễu nói: 「Trên bảng thông báo có ủy thác của bà con, giúp đỡ họ cũng kiếm được chút tiền và sự mang ơn.」'
  },
  {
    id: 'tip_try_cooking',
    priority: 14,
    conditionKey: 'neverCooked',
    message: 'Trưởng thôn Liễu nói: 「Học công thức nấu ăn rồi thì có thể nấu nướng, thức ăn làm ra giúp hồi thể lực. Ra bếp thử xem sao.」'
  },
  {
    id: 'tip_rain',
    priority: 15,
    conditionKey: 'firstRainyDay',
    message: 'Trưởng thôn Liễu nói: 「Trời mưa cây trồng sẽ tự được tưới, đỡ tốn sức. Nhân tiện có thể đi làm việc khác.」'
  },
  {
    id: 'tip_season_change',
    priority: 16,
    conditionKey: 'justChangedSeason',
    message: 'Trưởng thôn Liễu nói: 「Chuyển mùa rồi, các mùa khác nhau thì cây trồng cũng khác, ra khu thương mại xem hạt giống mới đi.」'
  },
  {
    id: 'tip_sprinkler',
    priority: 17,
    conditionKey: 'hasCropNoSprinkler',
    message: 'Trưởng thôn Liễu nói: 「Diện tích đất trồng lớn thì tưới nước rất mệt, xưởng mộc hoặc tiệm rèn có thể chế tạo vòi phun nước tự động.」'
  },
  {
    id: 'tip_try_animal',
    priority: 18,
    conditionKey: 'neverHadAnimal',
    message: 'Trưởng thôn Liễu nói: 「Nuôi thêm gà vịt bò cừu cũng không tệ, ra cửa hàng xây chuồng gà hoặc bãi chăn thả trước đi.」'
  }
]
