// === 晨间随机事件数据 ===
// 设计理念：不是系统，是"早晨的一句旁白"

/** 效果类型 */
export type MorningEffect =
  | { type: 'loseCrop' }
  | { type: 'gainItem'; itemId: string; qty: number }
  | { type: 'gainMoney'; amount: number }
  | { type: 'gainFriendship'; amount: number }

/** 小偷/动物旁白（4%） */
export interface MorningNarration {
  message: string
  effect?: MorningEffect
}

/** 带选项事件（0.8%） */
export interface MorningChoiceEvent {
  id: string
  message: string
  choices: {
    label: string
    result: string
    effect?: MorningEffect
  }[]
}

/** 彩蛋旁白（0.2%） */
export interface MorningEasterEgg {
  message: string
  effect?: MorningEffect
}

// ==================== 4% 小偷/动物旁白（25条） ====================

export const MORNING_NARRATIONS: MorningNarration[] = [
  // —— 有轻微损失 ——
  { message: 'Rau ngoài ruộng bị con gì đó gặm mất một miếng, để lại một chuỗi dấu chân nhỏ bên cạnh.', effect: { type: 'loseCrop' } },
  { message: 'Một con quạ quắp đi mất một quả vừa chín tới, đắc ý kêu lên hai tiếng trên cành cây.', effect: { type: 'loseCrop' } },
  { message: 'Trên ruộng có một gốc cây bị nhổ bật rễ vứt sang một bên, giống như là tác phẩm của lợn rừng.', effect: { type: 'loseCrop' } },
  { message: 'Một cây non trong góc không biết bị ai dẫm gãy, trên mặt đất vẫn còn lưu lại dấu móng guốc.', effect: { type: 'loseCrop' } },
  // —— 有轻微收获 ——
  { message: 'HìnhChẳng hạn như có người hái đi một mớ rau dại, nhưng lại để lại ba đồng xu trước cửa.', effect: { type: 'gainMoney', amount: 3 } },
  { message: 'Bên ngoài hàng rào có một cái giỏ nhỏ đan bằng cỏ, bên trong đựng vài nhánh thảo dược, không biết là ai đã để lại.', effect: { type: 'gainItem', itemId: 'herb', qty: 1 } },
  { message: 'Bên cạnh đống củi sau nhà có thêm một bó tre nhỏ được xếp ngay ngắn. Chắc hẳn là do một tiều phu tốt bụng nào đó để lại.', effect: { type: 'gainItem', itemId: 'bamboo', qty: 2 } },
  // —— 纯旁白 ——
  { message: 'Trên hàng rào vương vài sợi lông thỏ, xem ra đêm qua đã có vị khách không mời mà đến.' },
  { message: 'Một con mèo hoang đang ngủ gật trên bờ ruộng, dáng vẻ như đã nằm ườn ở đó cả một đêm rồi.' },
  { message: 'Phátbây giờ một đống vỏ hạt dẻ do sóc giấu bên cạnh luống rau, dường như chúng rất thích nông trại của bạn.' },
  { message: 'Sáng sớm ra khỏi cửa, phát hiện trên mặt đất có một chuỗi dấu chân nhỏ kéo dài từ luống rau ra bên ngoài hàng rào.' },
  { message: 'Có một chú nhím đã làm tổ trong đống ủ phân, trông nó có vẻ rất hài lòng với nơi ở hiện tại.' },
  { message: 'Bù nhìn rơm bên ruộng bị lệch đi, giống như bị thứ gì đó tông phải. Chắc là một con hươu rừng đi ngang qua vào ban đêm.' },
  { message: 'Phát hiện vài cọng lông vũ rụng lả tả cạnh giếng nước, có thể là gà rừng đã tới uống nước.' },
  { message: 'Một con cú mèo đậu trên mái nhà, đang nghiêng đầu đánh giá bạn. Bạn vừa cử động, nó liền bay đi mất.' },
  { message: 'Bên bờ ruộng có thêm một cái lỗ nhỏ, nhìn có vẻ như do chuột đồng đào. May mà không làm hại đến cây trồng.' },
  { message: 'Sương sớm tan đi, trên hàng rào giăng một tấm mạng nhện, những giọt sương mai lấp lánh dưới ánh nắng.' },
  { message: 'Vài con chim sẻ ríu rít cãi nhau dưới mái hiên, không biết đang tranh giành thứ gì.' },
  { message: 'Trong mương nước có thêm vài chú nòng nọc, xem ra ếch nhái cũng rất chuộng nông trại của bạn.' },
  { message: 'Một chú thạch sùng nằm bất động phơi nắng trên tảng đá lớn ở bờ ruộng.' },
  { message: 'Gió thổi mang theo một luồng hương hoa quế, không biết là bay tới từ sân nhà ai.' },
  { message: 'Bù nhìn rơm của bạn bị lệch nghiêm trọng hơn rồi. Không chừng ban đêm nó lén lút hoạt động đấy.' },
  { message: 'Sáng sớm có một chú chuồn chuồn đậu trên cán cuốc của bạn, đôi cánh mỏng trong suốt.' },
  { message: 'Một bầy kiến đang khiêng thứ gì đó bò qua bờ ruộng, đội ngũ dài đến mức không thấy điểm cuối.' },
  { message: 'Trong góc nông trại có thêm một cái tổ chim nhỏ, xem ra có chú chim đang dự định an cư ở đây rồi.' }
]

/** 纯旁白（无 loseCrop）的子集，空农场回退用 */
export const NARRATIONS_NO_LOSS: MorningNarration[] = MORNING_NARRATIONS.filter(n => !n.effect || n.effect.type !== 'loseCrop')

// ==================== 0.8% 带选项事件（15条） ====================

export const MORNING_CHOICE_EVENTS: MorningChoiceEvent[] = [
  {
    id: 'injured_bird',
    message: 'Sáng sớm, bạn phát hiện một chú chim nhỏ bị thương bên bờ ruộng, nó dùng đôi mắt đen láy như hạt đậu nhìn bạn chằm chằm.',
    choices: [
      {
        label: 'Băng bó vết thương, để nó dưỡng thương một thời gian',
        result: 'Bạn cẩn thận băng bó lại đôi cánh cho chú chim nhỏ. Dân làng nghe được chuyện này, ai nấy đều khen bạn tốt bụng.',
        effect: { type: 'gainFriendship', amount: 10 }
      },
      { label: 'Thả nó lại vào lùm cây', result: 'Chú chim nhỏ vỗ cánh bay đi, trước lúc rời đi còn kêu lên hai tiếng, tựa như đang muốn nói lời cảm ơn.' }
    ]
  },
  {
    id: 'hungry_traveler',
    message: 'Bên ngoài nông trại có một lữ khách phong trần mệt mỏi đi tới, trông có vẻ vừa mệt vừa đói.',
    choices: [
      {
        label: 'Mời người đó một bữa cơm',
        result: 'Lữ khách ăn no xong thì muôn vàn cảm tạ, lúc rời đi còn lấy từ trong tay nải ra một nắm thảo dược để tặng cho bạn.',
        effect: { type: 'gainItem', itemId: 'herb', qty: 3 }
      },
      { label: 'Chỉ đường cho người đó đi vào làng', result: 'Lữ khách cúi người chào bạn một cái, rồi dọc theo con đường mòn đi về phía ngôi làng.' }
    ]
  },
  {
    id: 'stealing_child',
    message: 'Một đứa trẻ đang lén lút nhổ củ cải trong ruộng của bạn, thấy bạn bước ra thì sợ đến mức sững sờ.',
    choices: [
      {
        label: 'Tặng thêm cho đứa bé vài củ',
        result: 'Đứa trẻ đỏ mặt nhận lấy rau củ, cúi chào một cái rồi bỏ chạy. Sau này mẹ của đứa bé đã đích thân tới cảm ơn.',
        effect: { type: 'gainFriendship', amount: 15 }
      },
      { label: 'Giả vờ như không nhìn thấy', result: 'Bạn quay người về nhà, nghe thấy phía sau lưng có tiếng sột soạt, sau đó là tiếng bước chân đi xa dần.' }
    ]
  },
  {
    id: 'mysterious_cat',
    message: 'Một con mèo đen chưa từng gặp bao giờ đang ngồi xổm trên ruộng, trước mặt nó đặt ngay ngắn một quả thông.',
    choices: [
      {
        label: 'Nhận lấy quả thông',
        result: 'Bạn khom lưng nhặt quả thông lên, mèo đen kêu meo một tiếng, chậm rãi biến mất trong màn sương sớm.',
        effect: { type: 'gainItem', itemId: 'pine_cone', qty: 1 }
      },
      { label: 'Sờ sờ đầu nó', result: 'Mèo đen kêu gừ gừ vài tiếng, cọ cọ vào tay bạn, sau đó trèo qua tường bỏ đi.' }
    ]
  },
  {
    id: 'old_man_fishing',
    message: 'Một ông lão râu trắng đang câu cá ở mương nước cạnh nông trại của bạn, thấy bạn bước ra thì cười chào hỏi.',
    choices: [
      { label: 'Ngồi xuống trò chuyện một lát', result: 'Ông lão đã chia sẻ không ít mánh khóe trồng trọt. Bạn cảm thấy được hưởng lợi rất nhiều.', effect: { type: 'gainFriendship', amount: 8 } },
      { label: 'Pha cho ông ấy một tách trà', result: 'Ông lão vui vẻ uống trà, trước khi đi còn để lại vài con cá trong thùng cho bạn.', effect: { type: 'gainMoney', amount: 50 } }
    ]
  },
  {
    id: 'lost_dog',
    message: 'Một chú chó nhỏ bẩn thỉu cuộn tròn trước cửa nhà bạn, trông có vẻ như đã đi lạc từ rất lâu rồi.',
    choices: [
      {
        label: 'Tắm rửa và cho nó ăn chút gì đó',
        result: 'Chú chó nhỏ vẫy đuôi liếm tay bạn. Nó ở nhà bạn một ngày, đến chập tối thì được chủ nhân đón đi. Chủ nhân của nó để lại một ít tiền thay cho lời cảm ơn.',
        effect: { type: 'gainMoney', amount: 30 }
      },
      {
        label: 'Dẫn nó vào làng tìm chủ',
        result: 'Bạn dẫn chú chó nhỏ đi một vòng quanh làng, rất nhanh đã tìm thấy chủ của nó. Mọi người đều khen bạn nhiệt tình.',
        effect: { type: 'gainFriendship', amount: 8 }
      }
    ]
  },
  {
    id: 'herb_woman',
    message: 'Một bà lão đeo gùi tre đi ngang qua, hỏi xin bạn một bát nước để uống.',
    choices: [
      {
        label: 'Bưng một bát nước ra cho bà',
        result: 'Bà lão uống xong thì cảm tạ, trước lúc rời đi còn nắm một nắm thảo dược từ trong gùi tre đưa cho bạn.',
        effect: { type: 'gainItem', itemId: 'herb', qty: 2 }
      },
      {
        label: 'Mời bà lão nghỉ chân một lát',
        result: 'Bà lão ngồi nghỉ một lát, luôn miệng khen ngợi người trẻ tuổi tốt bụng. Bạn lờ mờ cảm thấy bà lão này trông có vẻ hơi quen quen.',
        effect: { type: 'gainFriendship', amount: 5 }
      }
    ]
  },
  {
    id: 'fox_standoff',
    message: 'Một con hồ ly đang ngậm thứ gì đó ngồi chồm hổm trong luống rau, thấy bạn bước ra cũng không thèm chạy, cứ thế trố mắt nhìn nhau.',
    choices: [
      { label: 'Xua tay đuổi nó đi', result: 'Hồ ly thong dong chạy mất. Bạn kiểm tra lại một vòng, luống rau không có tổn thất gì cả.' },
      {
        label: 'Ném cho nó một miếng bánh',
        result: 'Hồ ly nhả thứ đang ngậm trong miệng ra, ngoạm lấy miếng bánh bỏ chạy. Bạn nhặt lên xem thử, thì ra là một quả thông.',
        effect: { type: 'gainItem', itemId: 'pine_cone', qty: 1 }
      }
    ]
  },
  {
    id: 'broken_fence',
    message: 'Một đoạn hàng rào bị thứ gì đó húc vỡ ra thành một cái lỗ, vài con thỏ rừng đang nhàn nhã gặm cỏ trên đồng.',
    choices: [
      { label: 'Sửa hàng rào trước', result: 'Bạn mất chút công sức để vá lại hàng rào. Bầy thỏ rừng hoảng hốt chạy thoát ra từ chỗ hổng đó.' },
      { label: 'Xem thử xem bọn chúng đang ăn gì', result: 'Thỏ rừng đang gặm cỏ dại, hoàn toàn không chạm vào cây trồng. Bạn bật cười, mặc kệ bọn chúng. Bọn chúng ngược lại còn giúp bạn diệt trừ bớt cỏ dại.' }
    ]
  },
  {
    id: 'rain_mushroom',
    message: 'Đêm qua trời đổ mưa, bên bờ ruộng mọc lên vài cây nấm.',
    choices: [
      {
        label: 'Hái một ít',
        result: 'Bạn nhận ra đây là nấm rừng có thể ăn được, thuận tay hái vài cây.',
        effect: { type: 'gainItem', itemId: 'wild_mushroom', qty: 2 }
      },
      { label: 'Cứ giữ nguyên đó đừng động vào', result: 'Bạn quyết định cứ để chúng tiếp tục lớn. Không chừng vài ngày nữa sẽ mọc ra nhiều hơn.' }
    ]
  },
  {
    id: 'painting_visitor',
    message: 'Một thanh niên đeo bảng vẽ đang đứng bên bờ ruộng, vẽ lại nông trại của bạn.',
    choices: [
      {
        label: 'Đi qua xem thử',
        result: 'Vẽ cũng khá đẹp đấy. Thanh niên kia bảo cảnh sắc nơi này mang lại cho cậu ta rất nhiều cảm hứng, tặng bạn vài đồng xu để thay cho lời cảm ơn.',
        effect: { type: 'gainMoney', amount: 20 }
      },
      {
        label: 'Mang cho cậu ta một tách trà',
        result: 'Người thanh niên cảm kích nhận lấy tách trà. Cậu ta bảo sau này sẽ gửi lại bức tranh cho bạn. Bạn đã mong chờ điều đó suốt một thời gian dài.',
        effect: { type: 'gainFriendship', amount: 5 }
      }
    ]
  },
  {
    id: 'snake_shed',
    message: 'Bên mương nước phát hiện một lớp xác rắn lột hoàn chỉnh, mỏng đến mức gần như trong suốt.',
    choices: [
      { label: 'Cất đi', result: 'Người xưa bảo xác rắn là một điềm tốt. Bạn đem treo nó dưới mái hiên, tâm trạng khá vui vẻ.' },
      { label: 'Đặt lại chỗ cũ', result: 'Bạn đặt xác rắn lại cẩn thận, quay người rời đi. Những thứ thuộc về thiên nhiên, tốt nhất vẫn nên để lại cho thiên nhiên vậy.' }
    ]
  },
  {
    id: 'wild_bee_nest',
    message: 'Trên cây cổ thụ sau nhà có thêm một cái tổ ong nhỏ, vài con ong mật đang bay vo ve bận rộn.',
    choices: [
      { label: 'Cứ để chúng ở đó', result: 'Ong mật giúp thụ phấn cho hoa màu rất tốt. Bạn quyết định chung sống hòa bình với chúng.' },
      {
        label: 'Cẩn thận lấy một ít mật',
        result: 'Bạn dùng phương pháp hun khói để lấy một tảng mật ong nhỏ. Tuy không nhiều, nhưng hương vị lại vô cùng ngọt ngào.',
        effect: { type: 'gainItem', itemId: 'honey', qty: 1 }
      }
    ]
  },
  {
    id: 'stone_buddha',
    message: 'Lúc xới đất đào được một hòn đá to bằng nắm tay, nhìn kỹ thì thấy giống một bức tượng Phật nhỏ.',
    choices: [
      {
        label: 'Lau sạch sẽ rồi đặt cạnh bờ ruộng',
        result: 'Bạn lau sạch bức tượng Phật nhỏ rồi đặt lại ngay ngắn. Dân làng đi ngang qua bảo đây là một điềm lành, vận may của mọi người sắp tốt lên rồi.',
        effect: { type: 'gainFriendship', amount: 10 }
      },
      { label: 'Cất đi đem bán', result: 'Bạn đem tới cho thương nhân đồ cổ trong làng xem thử, đổi được một vài đồng xu.', effect: { type: 'gainMoney', amount: 66 } }
    ]
  },
  {
    id: 'bamboo_shoots',
    message: 'Sau cơn mưa đêm qua, dưới chân hàng rào nhú lên vài búp măng.',
    choices: [
      { label: 'Đào lên', result: 'Măng tươi thế này, đem nấu ăn chắc chắn sẽ rất ngon.', effect: { type: 'gainItem', itemId: 'bamboo', qty: 3 } },
      { label: 'Để cho chúng lớn', result: 'Bạn quyết định để cho măng tiếp tục lớn. Chẳng bao lâu nữa, nơi này sẽ có thêm vài cây trúc.' }
    ]
  }
]

// ==================== 0.2% 彩蛋（10条） ====================

export const MORNING_EASTER_EGGS: MorningEasterEgg[] = [
  {
    message: 'Lúc xới đất đào được một đồng tiền cổ, chữ viết bên trên đã mờ mịt không rõ, nhưng vẫn lờ mờ tỏa ra độ bóng.',
    effect: { type: 'gainItem', itemId: 'ancient_coin', qty: 1 }
  },
  { message: 'Một con bướm màu vàng kim đang bay lượn trên ruộng, bay quanh bạn ba vòng rồi bay về phía ngọn núi xa xa. Nghe nói ai nhìn thấy nó sẽ gặp được may mắn.' },
  { message: 'Ban đêm dường như vừa có một trận mưa cánh hoa, cả nông trại ngập tràn một mùi hương thoang thoảng. Không một ai biết hoa từ đâu bay tới.' },
  { message: 'Bạn nhìn thấy hình bóng của mình dưới đáy giếng, nhưng cái bóng đó dường như vừa mỉm cười với bạn. Chắc là do chưa tỉnh ngủ thôi.' },
  { message: 'Sáng sớm đẩy cửa ra, phát hiện trước cửa có đặt một bó hoa dại vô danh, được buộc gọn gàng bằng dây cỏ. Chẳng ai biết là ai đã đặt ở đó.', effect: { type: 'gainMoney', amount: 88 } },
  { message: 'Một con hạc trắng bay tới từ chân trời, dừng lại trên ruộng của bạn một lát, rồi vỗ cánh bay đi. Người xưa bảo bạch hạc là thú cưỡi của thần tiên.' },
  { message: 'Sáng hôm nay, tất cả cây trồng dường như đều tươi tốt hơn hôm qua một chút. Có thể là ảo giác của bạn, hoặc cũng có thể không phải.' },
  {
    message: 'Bạn phát hiện một đồng xu không biết từ đâu ra ở dưới gối. Nghĩ kỹ lại, tối qua hình như vừa mơ thấy Thần Tài.',
    effect: { type: 'gainMoney', amount: 66 }
  },
  { message: 'Bù nhìn rơm hôm nay đã xoay sang một hướng khác. Bạn dám chắc hôm qua không phải đặt theo hướng này... Có chắc không vậy?' },
  { message: 'Khi trời còn chưa sáng bạn đã nghe thấy vài tiếng sáo vọng lại từ phía xa, êm tai đến mức không giống như phàm nhân thổi. Đến khi bạn mở cửa ra xem, thì chẳng thấy gì cả.' }
]
