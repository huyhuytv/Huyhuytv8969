import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DynamicEvent, DynamicEventChoice } from '@/types'
import { DYNAMIC_EVENTS } from '@/data/dynamicEvents'

export const useDynamicEventStore = defineStore('dynamicEvent', () => {
  // Sự kiện đang hiển thị (nếu có)
  const activeEvent = ref<DynamicEvent | null>(null)
  
  // Lịch sử các ID sự kiện đã từng xảy ra (dành cho các sự kiện "once: true")
  const triggeredHistory = ref<string[]>([])

  /**
   * Gọi hàm này khi thời gian trôi qua, hoặc khi di chuyển map
   * để có cơ hội kích hoạt ngẫu nhiên một sự kiện.
   */
  const checkRandomEvents = () => {
    // Nếu đang có event mở, không kích hoạt cái khác
    if (activeEvent.value) return

    // Lấy tất cả sự kiện hợp lệ
    const validEvents = DYNAMIC_EVENTS.filter(evt => {
      // Bỏ qua nếu sự kiện chỉ được 1 lần và đã xảy ra
      if (evt.once && triggeredHistory.value.includes(evt.id)) return false
      // Kiểm tra điều kiện riêng của sự kiện
      if (evt.condition && !evt.condition()) return false
      
      return true
    })

    if (validEvents.length === 0) return

    // Shuffle và roll (để công bằng nếu nhiều sự kiện cùng check trúng)
    // Hoặc duyêt từng cái. Ở đây ta duyệt từng cái và check probability
    // Xáo trộn mảng để random
    const shuffled = [...validEvents].sort(() => Math.random() - 0.5)

    for (const evt of shuffled) {
      if (Math.random() <= evt.probability) {
        triggerEvent(evt)
        break // Chỉ kích hoạt tối đa 1 sự kiện mỗi lần check
      }
    }
  }

  const triggerEvent = (event: DynamicEvent) => {
    activeEvent.value = event
    if (event.once) {
      triggeredHistory.value.push(event.id)
    }
  }

  const resolveChoice = (choice: DynamicEventChoice) => {
    if (choice.canSelect && !choice.canSelect()) return // Phòng thủ

    choice.onSelect()
    
    // Sau khi chọn thì đóng event
    activeEvent.value = null
  }

  const serialize = () => {
    return {
      triggeredHistory: triggeredHistory.value
    }
  }

  const deserialize = (data: any) => {
    triggeredHistory.value = data.triggeredHistory ?? []
  }

  return {
    activeEvent,
    triggeredHistory,
    checkRandomEvents,
    triggerEvent,
    resolveChoice,
    serialize,
    deserialize
  }
})
