import type { HeartEventDef } from '@/types'

/** 隐藏NPC心事件（使用 HeartEventDef 格式，requiredFriendship 对应缘分阈值） */
export const HIDDEN_NPC_HEART_EVENTS: HeartEventDef[] = [
  // ============================================================
  // 龙灵 — 3个心事件
  // ============================================================
  {
    id: 'long_ling_heart_1',
    npcId: 'long_ling',
    requiredFriendship: 800,
    title: 'Lời thì thầm dưới ánh vảy sáng',
    scenes: [
      { text: 'Bạn đến bên thác nước để ngồi thiền, trong làn sương mù mờ ảo một tia sáng vảy xanh thoắt ẩn thoắt hiện. Giọng nói của Long Linh vang lên giữa tiếng nước chảy:' },
      { text: '「Ngươi là phàm nhân đầu tiên có thể nghe được tiếng nói của ta... Đã cả trăm năm rồi không có ai bước tới gần đầm nước này.」' },
      {
        text: 'Ánh mắt của Long Linh dừng lại trên người bạn, dường như đang xem xét điều gì đó.',
        choices: [
          {
            text: '「Tại sao lại chọn nương mình ở nơi này?」',
            friendshipChange: 30,
            response: '「Nơi này là giao điểm của các linh mạch, là nơi hội tụ khí vận của Đào Nguyên Hương. Thứ ta bảo vệ... không chỉ là đầm nước này.」'
          },
          {
            text: '「Cô nhất định là rất cô đơn nhỉ.」',
            friendshipChange: 50,
            response: 'Long Linh im lặng hồi lâu, cuối cùng cất giọng nhè nhẹ: 「... Cô đơn thì cũng có.」 Mặt nước gợn lên những vòng sóng lăn tăn.'
          }
        ]
      }
    ]
  },
  {
    id: 'long_ling_heart_2',
    npcId: 'long_ling',
    requiredFriendship: 1600,
    title: 'Ký ức của Long Châu',
    scenes: [
      { text: 'Đêm nay ánh trăng đặc biệt vằng vặc, trong đầm nước dưới thác phản chiếu vầng trăng tròn vành vạnh. Thân ảnh của Long Linh hiện ra trọn vẹn dưới ánh trăng —— một con linh long toàn thân xanh biếc, thanh tao mà uy nghiêm.' },
      { text: '「Ngươi có biết tên thật của ta không?」 Long Linh hỏi, trong giọng nói mang theo một tia chờ mong.' },
      { text: '「Ngàn năm trước, khi ta mới hóa hình từng có một cái tên... Thương Lan. Có nghĩa là những gợn sóng nhỏ trên biển xanh bao la.」' },
      {
        text: 'Long Linh từ dưới nước nâng lên một viên minh châu tỏa sáng nhè nhẹ. 「Đây là kỷ vật từng cất giấu dưới mảnh nghịch lân của ta.」',
        choices: [
          { text: '「Tôi sẽ trân trọng nó thật tốt.」', friendshipChange: 50, response: 'Long Linh gật đầu, mặt nước ánh lên luồng sáng dịu dàng: 「Ngươi là người duy nhất khiến ta sẵn lòng mang nó ra.」' },
          { text: 'Cẩn thận từng li từng tí nhận lấy viên ngọc.', friendshipChange: 30, response: 'Viên châu cầm vào ấm mát, bên trong có tiếng đập nhè nhẹ, giống như nhịp tim vậy.' }
        ]
      }
    ]
  },
  {
    id: 'long_ling_heart_3',
    npcId: 'long_ling',
    requiredFriendship: 2400,
    title: 'Lời hẹn ước Thương Lan',
    scenes: [
      { text: 'Đêm giông bão, lượng nước của thác chảy xiết dữ dội. Bạn đội mưa chạy tới, phát hiện Long Linh đang dùng linh lực để giữ vững đầm nước sắp vỡ bờ.' },
      { text: '「Tránh ra!」 Long Linh hét lên, nhưng trong giọng nói ngập tràn sự mệt mỏi, 「Đêm nay linh mạch hỗn loạn... ta không trụ được bao lâu nữa đâu.」' },
      {
        text: 'Bạn thấy vảy của Long Linh bắt đầu mờ đi, sức mạnh của nàng đang bị tiêu hao đến kiệt quệ.',
        choices: [
          {
            text: 'Lao vào dòng nước, đưa Đồ Cúng Linh Lực cho Long Linh.',
            friendshipChange: 80,
            response: 'Hành động của bạn làm Long Linh sững sờ. Nàng nhận lấy đồ cúng, linh lực chầm chậm khôi phục lại. Sau khi gió mưa ngớt đi, nàng khẽ nói: 「... Cảm ơn ngươi.」'
          },
          {
            text: 'Đứng trên bờ chắp tay cầu nguyện cho nàng, tập trung tinh thần truyền đi tâm niệm.',
            friendshipChange: 60,
            response: 'Một luồng sức mạnh ấm áp trào ra từ trong tim bạn, Long Linh đã cảm ứng được nó. 「Tâm ý của ngươi... ta đã nhận được rồi.」 Cơn mưa lớn từ từ tạnh hẳn.'
          }
        ]
      },
      { text: 'Sau cơn mưa bão, Long Linh lần đầu tiên xuất hiện dưới hình người trước mặt bạn —— một nữ tử khoác y phục xanh biếc. 「Từ nay về sau, cứ gọi ta là Thương Lan.」' }
    ]
  },

  // ============================================================
  // 桃夭 — 3个心事件
  // ============================================================
  {
    id: 'tao_yao_heart_1',
    npcId: 'tao_yao',
    requiredFriendship: 800,
    title: 'Hoa Ngữ',
    scenes: [
      { text: 'Buổi sáng, bạn phát hiện dưới gốc đào trong nông trại mọc thêm một vòng những bông hoa nhỏ vô danh. Trên cánh hoa vẫn còn đọng sương mai, tỏa ra hương thơm ngọt ngào nhè nhẹ.' },
      { text: 'Đào Yêu thò đầu ra từ giữa khóm hoa: 「Hoa này là ta trồng đấy, đẹp không?」 Nụ cười của nàng trông như chính mùa xuân vậy.' },
      {
        text: 'Nàng hái một bông hoa nhỏ đưa cho bạn.',
        choices: [
          { text: '「Rất đẹp, cảm ơn cô nhé.」', friendshipChange: 40, response: 'Đào Yêu cười rạng rỡ hơn hẳn: 「Ngươi thích là được rồi. Sau này ngày nào ta cũng trồng một bông.」' },
          {
            text: 'Cài bông hoa lên mang tai nàng.',
            friendshipChange: 60,
            response: 'Đào Yêu sững sờ mất một lúc, đôi gò má ửng lên một ráng hồng như hoa đào: 「Ngươi... ngươi làm cái gì vậy...」 Nhưng nàng cũng không tháo bông hoa đó xuống.'
          }
        ]
      }
    ]
  },
  {
    id: 'tao_yao_heart_2',
    npcId: 'tao_yao',
    requiredFriendship: 1600,
    title: 'Lạc Hoa Hữu Ý',
    scenes: [
      { text: 'Bạn thấy Đào Yêu ngồi thui thủi một mình dưới gốc đào cổ thụ già nhất, những cánh hoa rơi rụng như mưa, thân ảnh của nàng thoắt ẩn thoắt hiện giữa cơn mưa hoa ấy.' },
      { text: '「Cái cây này... là nơi ta sinh ra.」 Giọng nàng rất khẽ, 「Đã ba trăm năm rồi. Cứ mỗi độ xuân về, ta đều quay lại nơi này.」' },
      {
        text: 'Bạn để ý thấy trong tay nàng đang nâng một chiếc lá khô —— chiếc lá héo úa duy nhất của cây đào.',
        choices: [
          {
            text: '「Cây bị bệnh rồi sao?」',
            friendshipChange: 30,
            response: '「Không phải... là do căn cơ của ta đang suy yếu.」 Nàng nhìn về phía bạn, 「Nhưng từ khi ngươi tới đây, mảnh đất này lại tràn đầy sức sống.」'
          },
          {
            text: 'Lặng lẽ ngồi xuống bên cạnh nàng.',
            friendshipChange: 50,
            response: 'Đào Yêu tựa sát lại gần, khẽ ngả đầu lên vai bạn. Những cánh hoa rơi lả tả trên đỉnh đầu hai người, tựa như một lời cầu phúc không thành tiếng.'
          }
        ]
      }
    ]
  },
  {
    id: 'tao_yao_heart_3',
    npcId: 'tao_yao',
    requiredFriendship: 2400,
    title: 'Trái Tim Linh Đào',
    scenes: [
      { text: 'Ngày cuối cùng của mùa xuân, bạn phát hiện Đào Yêu đang đứng trước cây đào già, hai tay chắp lại, toàn thân tỏa ra luồng ánh sáng dịu nhẹ.' },
      { text: '「Ta đang làm một việc rất quan trọng.」 Nàng nói, giọng nói hơi run rẩy. 「Truyền chút linh lực cuối cùng của ta vào cái cây này... như vậy nó có thể sống thêm ba trăm năm nữa.」' },
      { text: '「Nhưng cái giá phải trả là... ta có thể sẽ rơi vào giấc ngủ say rất dài.」' },
      {
        text: 'Bạn cảm thấy tim mình thắt lại.',
        choices: [
          {
            text: 'Nắm lấy tay nàng: 「Hãy để tôi chia sẻ gánh nặng cùng cô.」',
            friendshipChange: 80,
            response: 'Hơi ấm của bạn truyền qua những đầu ngón tay chạm vào nàng. Đào Yêu mở to hai mắt —— linh lực chẳng những không giảm mà còn tăng lên. 「Hóa ra... tâm ý của con người cũng có thể biến thành linh lực.」'
          },
          {
            text: '「Tôi sẽ chăm sóc cái cây này mỗi ngày.」',
            friendshipChange: 60,
            response: 'Đào Yêu mỉm cười gật đầu: 「Có ngươi ở đây, ta yên tâm rồi.」 Nàng hái một quả đào màu vàng ươm từ trên cây đưa cho bạn, 「Đây là Linh Đào, là tấm lòng của ta.」'
          }
        ]
      },
      { text: 'Cây đào già bừng bừng sức sống trở lại, trên cành chi chít những nụ hoa. Đào Yêu nhìn tất thảy mọi thứ, trên mặt là nụ cười thỏa mãn: 「Cảm ơn ngươi, đã giúp ta không còn cô đơn nữa.」' }
    ]
  },

  // ============================================================
  // 月兔 — 3个心事件
  // ============================================================
  {
    id: 'yue_tu_heart_1',
    npcId: 'yue_tu',
    requiredFriendship: 800,
    title: 'Nhịp Điệu Chày Giã Thuốc',
    scenes: [
      { text: 'Dưới ánh trăng, trong rừng trúc truyền ra tiếng lanh canh loảng xoảng. Đi theo âm thanh, bạn phát hiện Nguyệt Thỏ đang cầm chiếc chày ngọc giã thứ gì đó.' },
      { text: '「Suỵt —— Đừng ồn!」 Nàng dựng đứng hai tai lên (bên dưới mũ thực sự có hai cái tai thỏ), 「Ta đang bào chế một loại thuốc đặc biệt.」' },
      {
        text: 'Nàng luống cuống tay chân ném đủ loại thảo dược vào cối, nhịp điệu ngày càng nhanh hơn.',
        choices: [
          { text: 'Giúp nàng giữ chặt cối giã thuốc.', friendshipChange: 40, response: '「Ế? Tay ngươi vững thật đấy!」 Nguyệt Thỏ cười đầy biết ơn, 「Có ngươi hỗ trợ, mẻ thuốc này chắc chắn sẽ thành công.」' },
          {
            text: 'Bắt nhịp hòa cùng tiếng chày giã thuốc.',
            friendshipChange: 50,
            response: 'Nguyệt Thỏ sửng sốt một chút, sau đó cười khanh khách: 「Dáng vẻ ngươi giả vờ giã thuốc chung buồn cười quá đi!」 Tiếng chày giã thuốc phát ra thế mà lại biến thành một giai điệu êm tai.'
          }
        ]
      }
    ]
  },
  {
    id: 'yue_tu_heart_2',
    npcId: 'yue_tu',
    requiredFriendship: 1600,
    title: 'Bí Mật Của Nguyệt Cung',
    scenes: [
      { text: 'Bạn thấy Nguyệt Thỏ đang ngồi xổm bên bờ sông, thẫn thờ nhìn bóng trăng dưới nước. Đôi tai thỏ của nàng rũ xuống, trông có vẻ rất phiền muộn.' },
      { text: '「Thực ra... ta là lén lút trốn xuống đây.」 Nàng lí nhí nói, 「Ở Nguyệt Cung chán ngắt, ngày nào cũng chỉ giã thuốc, giã thuốc, giã thuốc...」' },
      {
        text: 'Nàng ngẩng đầu nhìn vầng trăng trên trời: 「Nhưng mà đôi khi... ta cũng thấy nhớ nơi đó.」',
        choices: [
          {
            text: '「Ở đây không tốt sao?」',
            friendshipChange: 30,
            response: '「Ở đây rất tốt! Có hoa có cỏ có đồ ăn ngon!」 Lỗ tai nàng dựng đứng lên, 「Còn có... ngươi.」 Nàng vội vàng cúi gằm mặt xuống, vành tai ửng đỏ.'
          },
          {
            text: '「Cô có thể về thăm bất cứ lúc nào mà.」',
            friendshipChange: 50,
            response: '「Ừm... nhưng quay về rồi thì rất khó để xuống lại nữa.」 Nàng nhìn bạn, 「Vì thế ta chọn cách ở lại nơi này.」'
          }
        ]
      }
    ]
  },
  {
    id: 'yue_tu_heart_3',
    npcId: 'yue_tu',
    requiredFriendship: 2400,
    title: 'Nguyệt Thỏ Không Về',
    scenes: [
      { text: 'Đêm Trung Thu, một luồng kim quang từ trên trời giáng xuống ngọn đồi bên ngoài thôn. Nguyệt Thỏ căng thẳng tóm chặt lấy ống tay áo của bạn: 「Bọn họ tới tìm ta rồi...」' },
      { text: 'Từ trên bầu trời vọng xuống giọng nói uy nghiêm: 「Ngọc Thỏ, Nguyệt Cung cần ngươi quy vị.」' },
      {
        text: 'Toàn thân Nguyệt Thỏ run bần bật, nhưng ánh mắt nàng nhìn bạn lại chan chứa sự quyến luyến không nỡ rời xa.',
        choices: [
          {
            text: '「Cô ấy đã tìm được chốn để đi về rồi.」',
            friendshipChange: 80,
            response: 'Giọng nói của bạn vô cùng kiên định rõ ràng. Bầu trời rơi vào khoảng lặng chốc lát, cuối cùng kim quang chầm chậm tan đi. Nguyệt Thỏ ôm chầm lấy bạn: 「Cảm ơn ngươi...」'
          },
          {
            text: 'Chỉ nắm chặt tay nàng, không nói một lời.',
            friendshipChange: 60,
            response: 'Nguyệt Thỏ cảm nhận được hơi ấm từ lòng bàn tay bạn, hít sâu một hơi rồi hét lên với bầu trời: 「Ta không về nữa đâu!」 Kim quang nhạt dần rồi tan đi mất.'
          }
        ]
      },
      { text: 'Ánh trăng đã khôi phục lại vẻ bình yên vốn có. Nguyệt Thỏ đưa tay lau khóe mi: 「Từ nay về sau, nơi này chính là Nguyệt Cung của ta.」' }
    ]
  },

  // ============================================================
  // 狐仙 — 3个心事件
  // ============================================================
  {
    id: 'hu_xian_heart_1',
    npcId: 'hu_xian',
    requiredFriendship: 800,
    title: 'Câu Đố Hồ Hỏa',
    scenes: [
      { text: 'Lúc hoàng hôn, đầu thôn xuất hiện vài khối hỏa diễm màu xanh lam cứ trôi nổi bất định. Dân làng ai nấy đều né tránh, chỉ có bạn là tò mò tiến lại gần.' },
      { text: '「Yo, gan cũng lớn đấy chứ.」 Hồ Tiên bước ra từ sau ngọn lửa, trong tay đùa nghịch một viên lưu ly. 「Đến chơi một trò chơi nhé?」' },
      {
        text: 'Hắn chìa ra ba cái tay —— khoan đã, ba cái? Bạn dụi dụi mắt, quả thực chỉ có hai cái tay thôi. Một tay cầm viên ngọc, tay kia thì trống không. 「Đoán xem viên ngọc ở đâu nào?」',
        choices: [
          {
            text: 'Chỉ vào tay trái của hắn.',
            friendshipChange: 20,
            response: 'Hắn xòe tay trái ra —— trống không. Xòe nốt tay phải —— cũng trống không luôn. Viên ngọc không biết từ lúc nào đã yên vị trong túi áo bạn rồi. 「Lần sau lại chơi tiếp nhé.」'
          },
          {
            text: '「Viên ngọc ở trong ống tay áo của ngươi ấy.」',
            friendshipChange: 50,
            response: 'Hồ Tiên sững sờ, ngay sau đó lại cười phá lên: 「Thú vị lắm! Ngươi là kẻ đầu tiên không đoán theo quy củ đấy.」 Hắn rũ rũ tay áo, viên ngọc quả nhiên rơi ra ngoài.'
          }
        ]
      }
    ]
  },
  {
    id: 'hu_xian_heart_2',
    npcId: 'hu_xian',
    requiredFriendship: 1600,
    title: 'Lời Hẹn Ngàn Năm',
    scenes: [
      { text: 'Bạn phát hiện ra một chiếc gương đồng cổ xưa sâu trong hang mỏ. Khi bạn lau đi lớp bụi bẩn, bóng phản chiếu trong gương không phải là khuôn mặt của bạn —— mà là một con hồ ly vàng chín đuôi.' },
      { text: '「Thấy rồi chứ? Đó là ta của một ngàn năm về trước.」 Tiếng của Hồ Tiên truyền đến từ phía sau. Hôm nay trên môi hắn không có nụ cười, 「Lúc đó ta còn chưa biết nói tiếng người.」' },
      { text: '「Tu hành ngàn năm, hóa hình người, học tiếng người, nếm trải nhân tình thế thái.」 Hắn nhìn vào trong gương, 「Nhưng càng giống người, lại càng cô độc hơn.」' },
      {
        text: 'Bạn chưa từng thấy hắn mang biểu cảm nghiêm túc đến thế bao giờ.',
        choices: [
          {
            text: '「Cô độc không hẳn là chuyện xấu.」',
            friendshipChange: 30,
            response: '「Ồ?」 Hắn nhướng mày lên, 「Nói nghe thử xem.」 Bạn kể cho hắn nghe về sự cô độc của mình lúc mới đặt chân đến Đào Nguyên Hương. Nghe xong, hắn khẽ cười: 「Xem ra chúng ta là đồng loại rồi.」'
          },
          {
            text: '「Bây giờ ngươi không còn cô độc nữa rồi.」',
            friendshipChange: 50,
            response: 'Hồ Tiên trầm mặc rất lâu, cuối cùng cũng nở một nụ cười không giống như mọi khi, một nụ cười thật lòng: 「Ừm, bây giờ không thế nữa.」'
          }
        ]
      }
    ]
  },
  {
    id: 'hu_xian_heart_3',
    npcId: 'hu_xian',
    requiredFriendship: 2400,
    title: 'Ảo Và Thật',
    scenes: [
      { text: 'Vào một đêm nọ, bạn mơ thấy một cánh đồng hoang rộng lớn màu vàng óng. Hồ Tiên đứng ở phía xa, chín cái đuôi xòe tung hoàn toàn ở sau lưng, kim quang xán lạn rực rỡ.' },
      { text: '「Đây không phải là mộng.」 Hắn nói, 「Đây là bản tướng của ta, là thế giới của ta.」' },
      { text: 'Hắn sải bước tới chỗ bạn: 「Một ngàn năm qua, ta đã dùng huyễn thuật lừa gạt biết bao nhiêu người. Nhưng ở trước mặt ngươi... ta không muốn dùng huyễn thuật nữa.」' },
      {
        text: 'Hắn đưa tay ra. Bạn để ý thấy tay hắn đang hơi run rẩy.',
        choices: [
          {
            text: 'Nắm lấy tay hắn.',
            friendshipChange: 80,
            response: 'Ảo cảnh vỡ vụn, bạn đã quay về với hiện tại. Nhưng bàn tay của Hồ Tiên vẫn nằm gọn trong tay bạn —— ấm áp và vô cùng chân thực. 「Đây là lần đầu tiên, ta để lộ chân dung trước mặt một phàm nhân.」'
          },
          {
            text: '「Cho dù là hồ ly hay là con người đi nữa, ngươi vẫn mãi là ngươi.」',
            friendshipChange: 60,
            response: 'Chín cái đuôi của hắn từ từ thu lại, kim quang tan biến đi, trở về với dáng vẻ một thiếu niên ngả ngớn bất cần đời. Nhưng trong ánh mắt hắn đã có thêm một nét mềm mại mà trước nay chưa từng có.'
          }
        ]
      }
    ]
  },

  // ============================================================
  // 山翁 — 3个心事件
  // ============================================================
  {
    id: 'shan_weng_heart_1',
    npcId: 'shan_weng',
    requiredFriendship: 800,
    title: 'Ván Cờ Trong Núi',
    scenes: [
      { text: 'Bạn phát hiện ra một thạch thất bí ẩn ở nơi sâu nhất trong hang mỏ. Sơn Ông đang ngồi xếp bằng trước bàn đá, trên đó bày sẵn một ván cờ.' },
      { text: '「Tới rồi à? Ngồi đi.」 Ông ra hiệu chỉ vào chiếc ghế đá đối diện. Những quân cờ trên bàn đang tỏa ra linh quang mờ nhạt.' },
      {
        text: '「Ván cờ này ta đã đánh ròng rã suốt ba trăm năm rồi.」 Ông nhìn bàn cờ nói.',
        choices: [
          { text: '「Là chơi với ai vậy?」', friendshipChange: 30, response: '「Là chơi với chính bản thân mình.」 Ông vuốt vuốt chòm râu, 「Tu luyện tu luyện, nói cho cùng cũng chỉ là đánh cờ với chính mình mà thôi.」' },
          {
            text: 'Thử hạ xuống một quân cờ.',
            friendshipChange: 50,
            response: 'Sơn Ông nhìn vào vị trí bạn vừa đặt quân cờ xuống, trong ánh mắt xẹt qua một tia kinh ngạc: 「Nước cờ hay. Suốt ba trăm năm qua, đây là lần đầu tiên có người đi cờ vào chỗ này.」'
          }
        ]
      }
    ]
  },
  {
    id: 'shan_weng_heart_2',
    npcId: 'shan_weng',
    requiredFriendship: 1600,
    title: 'Duyên Phận Thầy Trò',
    scenes: [
      { text: 'Sơn Ông dẫn bạn lên đỉnh núi. Buổi sáng tinh sương mùa đông, biển mây cuồn cuộn ngay dưới chân, mặt trời mọc nhuộm cả chân trời thành một màu đỏ rực ánh kim.' },
      { text: '「Lão phu tu hành ngàn năm, đã từng chứng kiến vô vàn cảnh sắc.」 Ông hít sâu một hơi, 「Thế nhưng cảnh mặt trời mọc này... mỗi lần ngắm nhìn đều mang đến một cảm giác hoàn toàn tươi mới.」' },
      {
        text: 'Ông quay sang nhìn bạn: 「Tiểu hữu, lão phu có một yêu cầu quá đáng này.」',
        choices: [
          {
            text: '「Tiền bối cứ nói.」',
            friendshipChange: 30,
            response: '「Ngươi có nguyện làm đệ tử quan môn của lão phu không? Không cần học tiên thuật, chỉ học đạo dưỡng sinh thôi.」 Ánh mắt của ông vô cùng chân thành, 「Sở học cả đời của lão phu, không muốn bị thất truyền.」'
          },
          { text: 'Cung kính hành lễ.', friendshipChange: 50, response: 'Sơn Ông nở nụ cười đầy an ủi: 「Tâm tính của ngươi còn tốt hơn cả những kẻ đã tu hành trăm năm. Lão phu nhận đứa đồ đệ này.」' }
        ]
      }
    ]
  },
  {
    id: 'shan_weng_heart_3',
    npcId: 'shan_weng',
    requiredFriendship: 2400,
    title: 'Truyền Đạo',
    scenes: [
      { text: 'Ngày Đông Chí, Sơn Ông bảo bạn ngồi thiền trên nền tuyết. Gió lạnh thấu xương, nhưng ông nói: 「Tâm tĩnh tự khắc sẽ thấy ấm.」' },
      { text: 'Bạn không biết thời gian đã trôi qua bao lâu. Khi mở mắt ra, bạn phát hiện tuyết xung quanh mình đã tan chảy thành một vòng tròn —— là do nhiệt lượng từ cơ thể bạn tỏa ra.' },
      { text: '「Thành công rồi.」 Sơn Ông vỗ tay cười lớn, 「Chỉ là thân xác phàm nhân, thế mà có thể dẫn động được linh khí của đất trời. Ngươi là người có thiên phú nhất mà lão phu từng gặp.」' },
      {
        text: 'Ông lấy từ trong ngực ra một chiếc hồ lô cổ phác: 「Đây là bảo vật tùy thân của lão phu.」',
        choices: [
          {
            text: '「Đệ tử không dám nhận.」',
            friendshipChange: 60,
            response: '「Bảo ngươi cầm thì cứ cầm đi!」 Ông nhét nó vào tay bạn, 「Lão phu không cần nó nữa. Có ngươi ở đây, còn tốt hơn bất kỳ thứ bảo vật nào.」 Trong ánh mắt ông có ánh lệ lóe qua.'
          },
          {
            text: 'Hai tay trịnh trọng tiếp lấy.',
            friendshipChange: 80,
            response: '「Tốt.」 Sơn Ông gật gật đầu, 「Từ nay trở đi, ngươi chính là người gác núi của Đào Nguyên Hương. Lão phu... cuối cùng cũng có thể yên tâm rồi.」'
          }
        ]
      }
    ]
  },

  // ============================================================
  // 归女 — 3个心事件
  // ============================================================
  {
    id: 'gui_nv_heart_1',
    npcId: 'gui_nv',
    requiredFriendship: 800,
    title: 'Tiếng Khung Cửi',
    scenes: [
      { text: 'Đêm khuya, bạn bị tiếng khung cửi lúc ẩn lúc hiện thu hút đến bên giếng cổ ở đầu thôn. Dưới ánh trăng, một chiếc khung cửi nửa trong suốt thình lình hiện ra từ khoảng không.' },
      { text: 'Quy Nữ đang ngồi trước khung cửi, những ngón tay thon dài đan thoăn thoắt giữa các sợi tơ. Thứ nàng đang dệt không phải là vải —— mà chính là ánh trăng.' },
      {
        text: 'Nàng chú ý tới bạn, động tác trên tay khựng lại: 「Ngươi... có thể nhìn ra ta đang dệt thứ gì sao?」',
        choices: [
          {
            text: '「Ánh trăng?」',
            friendshipChange: 40,
            response: 'Nàng khẽ bật cười: 「Đúng vậy. Ta dệt ánh trăng thành giấc mộng. Cứ mỗi đêm trăng tròn, người dân Đào Nguyên Hương đều có những giấc mơ đẹp... đó chính là những giấc mơ do ta dệt nên.」'
          },
          {
            text: '「Một thứ rất tuyệt vời.」',
            friendshipChange: 50,
            response: 'Nàng cúi đầu, giọng nói rất nhẹ: 「Đã lâu lắm rồi... không có ai khen những thứ ta dệt đẹp nữa.」 Những sợi tơ trong tay nàng phát ra ánh sáng thật êm dịu.'
          }
        ]
      }
    ]
  },
  {
    id: 'gui_nv_heart_2',
    npcId: 'gui_nv',
    requiredFriendship: 1600,
    title: 'Hướng Về Cố Hương',
    scenes: [
      { text: 'Hôm nay Quy Nữ không dệt vải. Nàng đứng ở đầu thôn, hướng mặt về phía bắc, thân hình mờ ảo hơn lúc bình thường rất nhiều.' },
      { text: '「Ta đang tìm hướng về cố hương.」 Nàng nói, giọng nói mong manh như sợi tơ trong gió. 「Thế nhưng... ta đã quên mất quê hương ở đâu rồi.」' },
      { text: '「Ta chỉ nhớ nơi đó có một cây dâu tằm cực kỳ to, dưới gốc cây có đặt một cỗ khung cửi. Mỗi ngày dệt vải, nhuộm màu, phơi nắng... lúc đó ta vẫn còn sống.」' },
      {
        text: 'Một giọt lệ bằng bạc rơi xuống nền đất, hóa thành một đóa hoa bạc.',
        choices: [
          {
            text: '「Nơi này cũng có thể là cố hương mà.」',
            friendshipChange: 50,
            response: 'Nàng nhìn bạn, trong đôi mắt màu bạc phản chiếu bóng hình bạn: 「Có lẽ... ngươi nói đúng. Nơi nào có người ở, nơi đó chính là quê hương.」'
          },
          {
            text: 'Lặng lẽ nhặt đóa hoa bạc lên, đưa cho nàng.',
            friendshipChange: 40,
            response: 'Nàng nhận lấy đóa hoa bạc, nâng niu trong lòng bàn tay. Đóa hoa bắt đầu tỏa ra ánh sáng ấm áp: 「Hóa ra... cảm giác được người ta nhớ tới, là như thế này đây.」'
          }
        ]
      }
    ]
  },
  {
    id: 'gui_nv_heart_3',
    npcId: 'gui_nv',
    requiredFriendship: 2400,
    title: 'Chốn Về',
    scenes: [
      { text: 'Đêm khuya ngày Đông Chí, bạn nhận ra thân hình Quy Nữ hiện rõ hơn bất cứ lúc nào hết. Nàng đứng trên mặt tuyết, trong tay nâng một dải gấm vóc màu bạc.' },
      { text: '「Đây là tấm lụa ta đã dệt suốt một năm qua.」 Nàng trải tấm gấm ra —— bên trên dệt cảnh sắc bốn mùa của Đào Nguyên Hương, sống động như thật.' },
      { text: '「Hoa đào mùa xuân, đầm sen mùa hạ, lá phong mùa thu, tuyết bay mùa đông... và cả, hình bóng của ngươi nữa.」 Khuôn mặt nàng hơi phiếm hồng.' },
      {
        text: 'Nàng đưa tấm gấm về phía bạn: 「Tấm lụa này là do toàn bộ tâm ý của ta dệt nên. Xin ngươi hãy nhận lấy.」',
        choices: [
          {
            text: '「Đây là món quà đẹp nhất mà tôi từng nhận được.」',
            friendshipChange: 80,
            response: 'Viền mắt Quy Nữ ửng đỏ, nhưng trên môi vẫn nở nụ cười: 「Cảm ơn ngươi. Nhờ có ngươi, cuối cùng ta cũng tìm thấy... chốn về của mình rồi.」 Thân ảnh nàng trở nên rõ ràng và chân thực hơn bao giờ hết.'
          },
          {
            text: 'Cẩn thận choàng tấm gấm lên vai nàng.',
            friendshipChange: 60,
            response: '「Ngươi...」 Giọng nàng run rẩy, 「Tại sao không giữ lại cho bản thân?」 Bạn lắc đầu. Quy Nữ khẽ nói: 「... Đồ ngốc.」 Nhưng nàng vẫn quấn chặt tấm gấm quanh người.'
          }
        ]
      }
    ]
  }
]

/** 根据NPC ID获取心事件列表 */
export const getHiddenNpcHeartEvents = (npcId: string): HeartEventDef[] => {
  return HIDDEN_NPC_HEART_EVENTS.filter(e => e.npcId === npcId)
}

/** 根据事件ID获取心事件 */
export const getHiddenNpcHeartEventById = (eventId: string): HeartEventDef | undefined => {
  return HIDDEN_NPC_HEART_EVENTS.find(e => e.id === eventId)
}
