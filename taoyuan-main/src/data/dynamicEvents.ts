import type { DynamicEvent } from '@/types'
import { useGameStore } from '@/stores/useGameStore'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useInventoryStore } from '@/stores/useInventoryStore'
import { useGameLog } from '@/composables/useGameLog'

/**
 * Danh sách các sự kiện ngẫu nhiên trên thế giới (Dynamic Events).
 * Phục vụ như các mẫu đa dạng để tác giả tham khảo các trường hợp.
 */
export const DYNAMIC_EVENTS: DynamicEvent[] = [
  {
    id: 'mysterious_merchant',
    title: 'Thương nhân bí ẩn',
    description: 'Bạn đang đi trên đường thì gặp một thương nhân lữ hành với cỗ xe bị gãy bánh. Ông ta đang rất cần người giúp đỡ.',
    probability: 0.05,
    condition: () => {
      const game = useGameStore()
      return game.hour >= 8 && game.hour <= 18 && game.weather === 'sunny' && game.currentLocationGroup !== 'farm'
    },
    choices: [
      {
        id: 'help',
        text: 'Giúp sửa xe (Tốn 20 Thể lực)',
        canSelect: () => usePlayerStore().stamina >= 20,
        onSelect: () => {
          const { consumeStamina, earnMoney } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          consumeStamina(20)
          earnMoney(500)
          addLog('Bạn đã giúp người thương nhân sửa xe. Ông ta chân thành cảm ơn và tặng bạn 500 G!')
          showFloat('Nhận 500 G', 'success')
        }
      },
      {
        id: 'ignore',
        text: 'Làm ngơ bỏ đi',
        onSelect: () => {
          useGameLog().addLog('Bạn quyết định không chuốc lấy phiền phức và tiếp tục hành trình.')
        }
      }
    ]
  },
  {
    id: 'sudden_storm',
    title: 'Cơn mưa phùn bất chợt',
    description: 'Bầu trời đột ngột xám xịt và một cơn mưa trút xuống. Bạn có thể nán lại tắm mưa để khoan khoái hơn hoặc vội vã tìm chỗ trú.',
    probability: 0.1,
    condition: () => {
      const game = useGameStore()
      return (game.weather === 'rainy' || game.weather === 'stormy') && game.hour >= 10 && game.hour <= 16
    },
    choices: [
      {
        id: 'enjoy_rain',
        text: 'Tắm mưa (Hồi thể lực, có thể bị cảm lạnh)',
        onSelect: () => {
          const { restoreStamina, consumeStamina } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          if (Math.random() > 0.4) {
            restoreStamina(30)
            addLog('Cơn mưa mát lạnh giúp bạn sảng khoái tinh thần! Hồi một lượng lớn thể lực.')
            showFloat('Hồi 30 thể lực', 'success')
          } else {
            consumeStamina(15)
            addLog('Gió lạnh lùa qua khiến bạn rùng mình hắt hơi, bạn đã bị nhiễm lạnh từ cơn mưa.')
            showFloat('Mất 15 thể lực', 'danger')
          }
        }
      },
      {
        id: 'hide',
        text: 'Tìm chỗ trú',
        onSelect: () => {
          useGameLog().addLog('Bạn chạy vào nấp dưới một gốc cây lớn chờ mưa ngớt đi.')
        }
      }
    ]
  },
  {
    id: 'finding_lost_item',
    title: 'Một túi tiền ven đường',
    description: 'Bạn vô tình dẫm trúng một vật gì đó mềm mềm. Cúi xuống xem, đó là một chiếc túi vải thêu hoa văn tinh xảo, bên trong có vẻ nặng trĩu bạc.',
    probability: 0.04,
    condition: () => useGameStore().currentLocationGroup === 'village_area',
    choices: [
      {
        id: 'keep_it',
        text: 'Giấu đi (Lấy tiền, cắn rứt lương tâm)',
        onSelect: () => {
          const { earnMoney, consumeStamina } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          earnMoney(300)
          consumeStamina(5)
          addLog('Bạn liếc nhìn xung quanh không thấy ai bèn giấu nhẹm chiếc túi vào áo. Dù có tiền nhưng trong lòng phấp phỏng không yên.')
          showFloat('Nhận 300 G', 'success')
        }
      },
      {
        id: 'wait_for_owner',
        text: 'Đứng chờ người đánh rơi (+Hồi thể lực do thấy thanh thản)',
        onSelect: () => {
          const { restoreStamina } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          restoreStamina(15)
          addLog('Một lúc sau, một người phụ nữ hớt hải chạy tới tìm túi tiền để lo viện phí. Nàng cảm tạ bạn rối rít. Lòng bạn tràn ngập niềm thanh thản.')
          showFloat('Hồi 15 thể lực', 'success')
        }
      }
    ]
  },
  {
    id: 'wandering_dog',
    once: true,
    title: 'Chú chó hoang đi lạc',
    description: 'Một chú chó lông xù xơ xác đang ngoạm đuôi áo bạn. Trông nó có vẻ rất đói. Bạn chợt nhớ ra mình có Quả dại trong người.',
    probability: 0.05,
    condition: () => useInventoryStore().hasItem('wild_berry', 1),
    choices: [
      {
        id: 'feed',
        text: 'Cho ăn 1 Quả dại (-1 Quả dại)',
        canSelect: () => useInventoryStore().hasItem('wild_berry', 1),
        onSelect: () => {
          const { removeItem, addItem } = useInventoryStore()
          const { addLog, showFloat } = useGameLog()
          removeItem('wild_berry', 1)
          addItem('jade', 1)
          addLog('Chú chó nhai ngấu nghiến quả dại. Trước khi chạy đi, nó đào bới đất và ngậm lên một viên Phỉ thúy đưa cho bạn thay lời cảm ơn!')
          showFloat('Nhận 1 Phỉ thúy', 'success')
        }
      },
      {
        id: 'ignore',
        text: 'Xua đuổi (Không mất gì)',
        onSelect: () => {
          useGameLog().addLog('Bạn xua tay đuổi chú chó đi. Nó cụp đuôi buồn bã bỏ đi mất.')
        }
      }
    ]
  },
  {
    id: 'exhausted_traveler',
    title: 'Người tiều phu kiệt sức',
    description: 'Một người tiều phu đốn củi đang ngồi gục bên tảng đá, mặt tái nhợt vì say nắng. Ông ta cần phần nào đó sức mạnh từ Thảo dược để tỉnh táo lại.',
    probability: 0.04,
    condition: () => useGameStore().currentLocationGroup === 'nature' && useGameStore().hour >= 10 && useGameStore().hour <= 16,
    choices: [
      {
        id: 'give_herb',
        text: 'Cho 1 Thảo dược (-1 Thảo dược, +Tiền tạ ơn)',
        canSelect: () => useInventoryStore().hasItem('herb', 1),
        onSelect: () => {
          const { removeItem } = useInventoryStore()
          const { earnMoney } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          removeItem('herb', 1)
          earnMoney(150)
          addLog('Người tiều phu nhai thảo dược và sắc mặt dần hồng hào trở lại. Ông ấy ép bạn nhận lấy 150 G làm quà tạ ơn.')
          showFloat('Nhận 150 G', 'success')
        }
      },
      {
        id: 'leave',
        text: 'Mặc kệ ông ta',
        onSelect: () => {
          useGameLog().addLog('Ông ta không có vẻ gì là đe dọa đến tính mạng. Bạn tiếp tục lên đường.')
        }
      }
    ]
  },
  {
    id: 'lucky_coin',
    title: 'Tiền từ trên trời rơi xuống',
    description: 'Khi đang đi dạo trên đường, một con quạ bay ngang qua và làm rơi một thứ gì đó lấp lánh chói mắt ngay trước mặt bạn.',
    probability: 0.05,
    condition: () => true, // Xảy ra ở mọi lúc mọi nơi
    choices: [
      {
        id: 'pick_up',
        text: 'Nhặt lên kiểm tra',
        onSelect: () => {
          const { earnMoney } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          earnMoney(50)
          addLog('Ra là quạ làm rơi vãi một đồng vàng! Bạn nhanh nhẹn nhặt lên bỏ túi.')
          showFloat('Nhận 50 G', 'success')
        }
      }
    ]
  },
  {
    id: 'strange_mushroom',
    title: 'Nấm lạ kỳ bí',
    description: 'Dưới một thân cây mục nát, có một cây nấm tỏa ra mùi hương kỳ lạ. Nó có màu sắc sặc sỡ và dường như đang kích thích vị giác của bạn.',
    probability: 0.08,
    condition: () => useGameStore().season === 'autumn' && useGameStore().currentLocationGroup === 'nature',
    choices: [
      {
        id: 'eat',
        text: 'Ăn thử',
        onSelect: () => {
          const { restoreStamina, consumeStamina } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          if (Math.random() > 0.5) {
            restoreStamina(50)
            addLog('Hương vị vô cùng kỳ diệu! Một luồng sinh lực dạt dào tràn ngập cơ thể bạn.')
            showFloat('Hồi 50 thể lực', 'success')
          } else {
            consumeStamina(30)
            addLog('Bụng bạn đau quặn thắt, tâm trí quay cuồng. Cây nấm này có độc!')
            showFloat('Mất 30 thể lực', 'danger')
          }
        }
      },
      {
        id: 'take',
        text: 'Hái bỏ vào túi (+1 Nấm rừng)',
        onSelect: () => {
          const { addItem } = useInventoryStore()
          const { addLog, showFloat } = useGameLog()
          addItem('wild_mushroom', 1)
          addLog('Bạn thận trọng hái cây nấm mang về để làm nguyên liệu.')
          showFloat('Nhận 1 Nấm rừng', 'success')
        }
      },
      {
        id: 'ignore',
        text: 'Không đụng vào',
        onSelect: () => {
          useGameLog().addLog('Cẩn tắc vô áy náy, tránh xa những thứ kỳ lạ là tốt nhất.')
        }
      }
    ]
  },
  {
    id: 'fairy_blessing',
    once: true, // Chỉ xảy ra 1 lần duy nhất trong game
    title: 'Ánh sáng của Tiên Nữ',
    description: 'Trong màn đêm thanh vắng, một đốm sáng dịu dàng lơ lửng sà xuống. Từ trong đó, một ảo ảnh tiên nữ nhỏ xíu hiện ra và vẫy chiếc đũa phép vụt qua người bạn.',
    probability: 0.02,
    condition: () => useGameStore().hour >= 20 || useGameStore().hour < 4,
    choices: [
      {
        id: 'accept',
        text: 'An tâm đón nhận',
        onSelect: () => {
          const { restoreStamina } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          restoreStamina(999) // Ý nghĩa là hồi đầy máu/thể lực
          addLog('Ánh sáng bao trùm lấy cơ thể. Mọi mệt mỏi trong ngày hoàn toàn tan biến. Đây là phước lành hiếm hoi từ Tiên Nữ!')
          showFloat('Hồi phục toàn bộ Thể lực', 'success')
        }
      }
    ]
  },
  {
    id: 'robber_encounter',
    title: 'Bóng đen khả nghi',
    description: 'Một bóng đen che kín mặt đột ngột xông ra từ bụi rậm chắn đường. Hắn lăm lăm một thanh mộc kiếm và gằn giọng: "Muốn yên ổn thì nôn tiền ra đây!"',
    probability: 0.04,
    condition: () => useGameStore().hour >= 18 && useGameStore().currentLocationGroup !== 'farm' && useGameStore().currentLocationGroup !== 'village_area',
    choices: [
      {
        id: 'pay',
        text: 'Đưa cho hắn 100 G (Đóng tiền mãi lộ)',
        onSelect: () => {
          const { spendMoney } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          if (spendMoney(100)) {
            addLog('Bạn ném cho hắn 100 G để tránh đổ máu. Hắn bắt lấy và lẩn lẹ vào màn đêm.')
            showFloat('Mất 100 G', 'danger')
          } else {
            addLog('Hắn lục lọi và thấy bạn chẳng có đủ nổi 100 G. Hắn bĩu môi khinh bỉ và bỏ đi không thèm đoái hoài.')
          }
        }
      },
      {
        id: 'fight',
        text: 'Đánh trả (Tốn 30 Thể lực)',
        canSelect: () => usePlayerStore().stamina >= 30,
        onSelect: () => {
          const { consumeStamina, spendMoney, earnMoney } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          consumeStamina(30)
          
          if (Math.random() > 0.4) {
            earnMoney(50)
            addLog('Sau một hồi vật lộn, bạn đánh văng thanh kiếm của hắn. Hắn hoảng sợ bỏ chạy, đánh rơi lại 50 G!')
            showFloat('Chiến thắng! Nhận 50 G', 'success')
          } else {
            spendMoney(200) // Trừ tới 200 (có thể về 0 tuỳ logic hàm)
            addLog('Tên cướp quá hung hãn! Bạn bị đánh lùi và hắn đã nhanh tay đoạt túi tiền cuỗm đi 200 G của bạn.')
            showFloat('Thua cuộc! Mất 200 G', 'danger')
          }
        }
      }
    ]
  },
  {
    id: 'mysterious_shrine',
    title: 'Miếu thờ vô danh',
    description: 'Ẩn mình sau những tán lá là một ngôi miếu đá rêu phong đổ nát. Một bức phù điêu cũ kỹ dường như đang chờ người thành tâm cúng bái.',
    probability: 0.03,
    condition: () => useGameStore().currentLocationGroup === 'mine' || useGameStore().currentLocationGroup === 'nature',
    choices: [
      {
        id: 'pray',
        text: 'Cúng bái 50 G',
        onSelect: () => {
          const { spendMoney, restoreStamina } = usePlayerStore()
          const { addLog, showFloat } = useGameLog()
          if (spendMoney(50)) {
            restoreStamina(40)
            addLog('Bạn đặt 50 G lên bệ đá và thành tâm cầu nguyện. Một làn gió ấm áp thoảng qua, bạn thấy tinh thần vô cùng thư thái.')
            showFloat('Hồi 40 thể lực', 'success')
          } else {
            addLog('Bạn định cúng bái nhưng sờ túi lại chẳng có đủ tiền.')
          }
        }
      },
      {
        id: 'clean',
        text: 'Dọn dẹp miếu (Tốn 20 Thể lực)',
        canSelect: () => usePlayerStore().stamina >= 20,
        onSelect: () => {
          const { consumeStamina } = usePlayerStore()
          const { addItem } = useInventoryStore()
          const { addLog, showFloat } = useGameLog()
          consumeStamina(20)
          if (Math.random() > 0.5) {
            addItem('gold_ore', 1)
            addLog('Lúc dọn dẹp quét lá rụng, bạn nhặt được một viên Quặng Vàng lấp lánh dưới lớp đất đá!')
            showFloat('Nhận 1 Quặng vàng', 'success')
          } else {
            addLog('Bạn lau dọn miếu sạch sẽ. Dù không có gì nhận lại nhưng bạn cảm thấy thỏa mãn trong lòng.')
          }
        }
      },
      {
        id: 'leave',
        text: 'Nhanh chóng rời đi',
        onSelect: () => {
          useGameLog().addLog('Bạn không muốn làm phiền chốn linh thiêng bèn lặng lẽ quay gót tiếp tục hành trình.')
        }
      }
    ]
  },
  {
    id: 'bountiful_harvest',
    once: true,
    title: 'Kho báu thiên nhiên',
    description: 'Bạn vô tình rẽ nhầm vào một con đường mòn nhỏ chưa từng thấy. Khung cảnh trước mắt là một bụi quả dại sai trĩu cành, chín mọng ươm đỏ.',
    probability: 0.02,
    condition: () => useGameStore().season === 'spring' || useGameStore().season === 'summer',
    choices: [
      {
        id: 'harvest',
        text: 'Hái tất cả (Tốn 15 Thể lực)',
        canSelect: () => usePlayerStore().stamina >= 15,
        onSelect: () => {
          const { consumeStamina } = usePlayerStore()
          const { addItem } = useInventoryStore()
          const { addLog, showFloat } = useGameLog()
          consumeStamina(15)
          addItem('wild_berry', 5)
          addLog('Thật là một vụ mùa bội thu! Bạn dễ dàng hái được một đống quả dại ngon lành mang về.')
          showFloat('Nhận 5 Quả dại', 'success')
        }
      },
      {
        id: 'ignore',
        text: 'Nhường cho bầy chim',
        onSelect: () => {
          useGameLog().addLog('Bạn nhìn bầy chim đang ríu rít ăn quả và quyết định không tranh giành với chúng.')
        }
      }
    ]
  }
]

