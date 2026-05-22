export interface DynamicEventChoice {
  id: string
  text: string
  /** 
   * Có thể dùng để hiển thị yêu cầu, vd: "Cần 50 thể lực" 
   */
  requirementText?: string
  /** 
   * Trả về callback thực thi khi người chơi chọn
   */
  onSelect: () => void
  /**
   * (Tùy chọn) Điều kiện để hiển thị hoặc có thể chọn lựa chọn này
   */
  canSelect?: () => boolean
}

export interface DynamicEvent {
  id: string
  title: string
  description: string
  /**
   * Tỷ lệ xuất hiện (0.01 - 1.0)
   */
  probability: number
  /**
   * Kiểm tra xem sự kiện này có thể xảy ra vào thời điểm hiện tại không.
   * Có thể check giờ, ngày, thời tiết, mùa, v.v.
   */
  condition: () => boolean
  /** 
   * Các lựa chọn cho người chơi. Nếu không có (hoặc 1 lựa chọn "Đóng"), 
   * có thể tự động tạo hoặc định nghĩa 1 nút "Tiếp tục".
   */
  choices: DynamicEventChoice[]
  /** 
   * Có thể lặp lại hay chỉ xảy ra 1 lần duy nhất trong game?
   * Mặc định là false (có thể lặp lại).
   */
  once?: boolean
  /**
   * (Tùy chọn) Hình ảnh minh họa cho sự kiện
   */
  image?: string
}
