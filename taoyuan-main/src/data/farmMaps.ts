import type { FarmMapType } from '@/types'

export interface FarmMapDef {
  type: FarmMapType
  name: string
  description: string
  bonus: string
}

export const FARM_MAP_DEFS: FarmMapDef[] = [
  {
    type: 'standard',
    name: 'Điền Trang Đào Nguyên',
    description: 'Đồng bằng rộng lớn, phù hợp nhất để trồng trọt quy mô lớn.',
    bonus: 'Khởi đầu 6x6, có thể mở rộng đến 10x10, tự động bón phân khi chuyển mùa (cấp bón phân tăng theo cấp trồng trọt), thêm 15% thu hoạch.'
  },
  {
    type: 'riverland',
    name: 'Điền Trang Dòng Suối',
    description: 'Ruộng đất được bao quanh bởi dòng sông nhỏ, thủy sản phong phú.',
    bonus: 'EXP câu cá +25%, Giá bán cá +10%, Thu hoạch cá suối mỗi ngày, Nâng cao chất lượng cá vào ngày mưa.'
  },
  { type: 'forest', name: 'Điền Trang Rừng Trúc', description: 'Khu đất trống giữa rừng, đa dạng các loại vật phẩm thu thập.', bonus: 'EXP thu thập +25%, 20% tỷ lệ thu thập gấp đôi, Nhặt đồ trong rừng mỗi ngày.' },
  { type: 'hilltop', name: 'Điền Trang Đồi Núi', description: 'Ruộng bậc thang ở sườn núi, ẩn chứa mạch khoáng.', bonus: 'EXP đào mỏ +25%, Quặng +1, Mạch khoáng trên bề mặt nông trại.' },
  { type: 'wilderness', name: 'Điền Trang Hoang Dã', description: 'Vùng đất hoang vu hẻo lánh, ban đêm có dã thú xuất hiện.', bonus: 'EXP chiến đấu +50%, Nhận quặng mỗi ngày, Chạm trán dã thú vào ban đêm.' },
  {
    type: 'meadowlands',
    name: 'Điền Trang Đồng Cỏ',
    description: 'Mục trường rộng mở, thích hợp để chăn nuôi gia súc.',
    bonus: 'Khởi đầu có Chuồng gà + 2 con gà, Độ thân thiện +50%, Động vật không mắc bệnh, Thêm sản lượng.'
  }
]
