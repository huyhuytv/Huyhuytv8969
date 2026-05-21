import type { Weather } from '@/types'

/** 李渔翁 - 天气预报台词 */
export const WEATHER_TIPS: Record<Weather, string> = {
  sunny: 'Ngày mai trời quang mây tạnh, thích hợp cho các hoạt động ngoài trời.',
  rainy: 'Ngày mai trời có mưa, nhớ mang theo ô... nhưng cá lại rất thích cắn câu vào lúc này đấy.',
  stormy: 'Ngày mai giông bão sấm sét, tốt nhất nên nghỉ ngơi ở nhà.',
  snowy: 'Ngày mai trời có tuyết, chú ý giữ ấm. Mặt sông có thể sẽ đóng băng.',
  windy: 'Ngày mai trời nổi gió lớn, nhớ cất kỹ những đồ vật đang phơi phóng nhé.',
  green_rain: 'Lão hủ cảm thấy ngày mai... có chút gì đó không bình thường.'
}

/** 周秀才 - 运势台词阈值 */
export const FORTUNE_TIERS: { min: number; message: string }[] = [
  { min: 0.07, message: 'Tử khí đông lai, hôm nay đại cát! Vạn sự đều hanh thông.' },
  { min: 0.03, message: 'Vận thế hôm nay khá tốt, thích hợp ra ngoài bàn công chuyện.' },
  { min: -0.03, message: 'Vận thế hôm nay bình thường, mọi việc cứ tiến hành như thường lệ.' },
  { min: -0.07, message: 'Vận thế hôm nay không tốt lắm, làm việc cần cẩn thận đề phòng.' },
  { min: -Infinity, message: 'Hôm nay vạn sự đều kiêng kỵ, khuyên bạn nên nghỉ ngơi tại nhà.' }
]

/** 根据 dailyLuck 获取运势台词 */
export const getFortuneTip = (luck: number): string => {
  for (const tier of FORTUNE_TIERS) {
    if (luck >= tier.min) return tier.message
  }
  return FORTUNE_TIERS[FORTUNE_TIERS.length - 1]!.message
}

/** 柳村长 - 生活提示 (25条循环) */
export const LIVING_TIPS: string[] = [
  'Mùa xuân là thời điểm tốt nhất để trồng khoai tây và cải thảo, gieo hạt sớm thu hoạch sớm.',
  'Bón phân cho cây trồng có thể nâng cao chất lượng, chất lượng càng cao thì giá bán càng tốt.',
  'Trời mưa không cần phải tưới nước, có thể dành thời gian đó để làm việc khác.',
  'Măng trong rừng trúc xuất hiện nhiều nhất vào mùa xuân, đừng quên ghé qua thu hoạch.',
  'Chú ý thời cơ khi câu cá, các loài cá khác nhau sẽ có những khung giờ cắn câu tốt nhất khác nhau.',
  'Hang mỏ càng xuống sâu càng nguy hiểm, hãy nhớ mang theo đầy đủ thức ăn và dược phẩm cứu thương.',
  'Tặng quà có thể tăng cường tình hữu nghị với dân làng, mỗi người lại có những sở thích khác nhau.',
  'Nâng cấp dụng cụ có thể tăng cao hiệu suất, đừng quên ghé qua tiệm rèn xem sao.',
  'Đào và dưa hấu mùa hè bán rất được giá, rất đáng để gieo trồng trên diện tích lớn.',
  'Chế tạo vòi phun nước có thể tự động tưới tiêu, tiết kiệm được rất nhiều thời gian.',
  'Mùa thu có thể gieo trồng các loại cây đa vụ, giúp nguồn thu nhập ổn định hơn.',
  'Mùa đông tuy không thể trồng trọt, nhưng bù lại lợi nhuận từ hang mỏ sẽ cao hơn.',
  'Trò chuyện nhiều hơn với dân làng, khi đạt tới mức thiện cảm nhất định sẽ học được công thức nấu ăn mới.',
  'Quyên góp cho bảo tàng có thể nhận được phần thưởng cột mốc, nhớ tích cực thu thập hóa thạch và cổ vật.',
  'Nhiệm vụ thảo phạt của công hội có phần thưởng vô cùng hậu hĩnh, rất đáng để thực hiện.',
  'Mồi câu và phao câu có thể tăng cao hiệu suất và chất lượng cá câu được.',
  'Máy móc chế biến có thể biến nguyên liệu thô thành thương phẩm có giá trị cao hơn.',
  'Các hoạt động lễ hội có phần thưởng giới hạn độc quyền, đừng bỏ lỡ bất kỳ ngày lễ nào nhé.',
  'Bom mìn có thể phá nổ một vùng quặng đá lớn cùng lúc, hiệu suất cực kỳ cao.',
  'Trước khi xuống mỏ đừng quên trang bị nhẫn tốt, thuộc tính cộng thêm là vô cùng quan trọng.',
  'Nông sản chất lượng cao có thể chế biến ra những món ăn hảo hạng hơn.',
  'Thú cưng nuôi lâu ngày sẽ mang lại những thu hoạch bất ngờ ngoài ý muốn.',
  'Sâu trong rừng đào nghe nói có ẩn giấu những sản vật thu thập cực kỳ quý hiếm.',
  'Hãy dốc lòng kinh doanh nông trại thật tốt, mọi người đều đang dõi theo bạn đấy.',
  'Trong ghi chép mật tịch có ẩn chứa những bí mật của Đào Nguyên Hương, hãy chú ý quan sát nhiều hơn.'
]

/** 获取当天的生活提示 */
export const getLivingTip = (day: number, year: number): string => {
  const index = ((year - 1) * 112 + day - 1) % LIVING_TIPS.length
  return LIVING_TIPS[index]!
}

/** 王大婶 - 食谱推荐台词模板 */
export const getRecipeTipMessage = (recipeName: string, ingredientNames: string[]): string => {
  return `Hôm nay ta dạy cháu làm món ${recipeName}, cần chuẩn bị ${ingredientNames.join(', ')}.`
}

/** 王大婶 - 无可推荐食谱时的通用台词 */
export const NO_RECIPE_TIP = 'Hãy chăm chỉ học nấu nướng đi, ngày tháng sau này còn dài lắm.'

/** 有每日提示功能的NPC ID列表 */
export const TIP_NPC_IDS = ['li_yu', 'zhou_xiucai', 'wang_dashen', 'liu_cunzhang'] as const

/** NPC提示类型 */
export type TipNpcId = (typeof TIP_NPC_IDS)[number]

/** NPC提示标签 */
export const TIP_NPC_LABELS: Record<TipNpcId, string> = {
  li_yu: 'Dự báo thời tiết',
  zhou_xiucai: 'Vận thế hôm nay',
  wang_dashen: 'Gợi ý công thức',
  liu_cunzhang: 'Mẹo sinh hoạt'
}
