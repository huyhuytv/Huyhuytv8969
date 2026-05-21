import type { HeartEventDef } from '@/types'

/** 所有心事件定义 */
export const HEART_EVENTS: HeartEventDef[] = [
  // ============================================================
  // 柳娘 (liu_niang) —— 村长的女儿，温柔聪慧
  // ============================================================
  {
    id: 'liu_niang_heart_3',
    npcId: 'liu_niang',
    requiredFriendship: 800,
    title: 'Cuốn Thơ Bên Bờ Suối',
    scenes: [
      {
        text: 'Bạn đi dạo dọc theo suối Đào Hoa, tình cờ bắt gặp Liễu Nương dưới một gốc liễu rủ. Nàng đang tựa người vào gốc cây, trong tay nâng một tập thơ ố vàng, gió nhẹ lướt qua, vài cánh hoa đào rơi xuống trang sách.'
      },
      {
        text: 'Liễu Nương ngẩng đầu lên, khẽ mỉm cười: "Bạn cũng tới đây đi dạo giải khuây sao? Đây là góc đọc sách yêu thích nhất của mình, tiếng nước suối chảy giống như một bản nhạc thiên nhiên vậy."'
      },
      {
        text: 'Nàng lật giở tập thơ, chỉ vào một bài thơ trong đó: "Bài này bạn đã từng đọc qua chưa? \'Đào chi yêu yêu, chước chước kỳ hoa. Chi tử vu quy, nghi kỳ thất gia.\' Lần nào đọc đến câu này, mình cũng hay mường tượng ra tâm trạng của cổ nhân khi viết nên nó."',
        choices: [
          {
            text: '"Bài thơ này miêu tả sự hướng về một cuộc sống tốt đẹp, giống hệt như Đào Nguyên Hương vậy."',
            friendshipChange: 120,
            response:
              'Đôi mắt Liễu Nương sáng bừng lên: "Bạn cũng cảm thấy vậy sao? Phụ thân đặt tên cho ngôi làng này là Đào Nguyên Hương, chính là với mong muốn nơi đây có thể yên bình tốt đẹp giống như cảnh sắc miêu tả trong thơ. Gặp được người hiểu thơ, thật là tốt quá."'
          },
          {
            text: '"Thú thật là, tôi cũng không hiểu biết nhiều về cổ thi cho lắm..."',
            friendshipChange: 40,
            response: 'Liễu Nương khẽ mỉm cười: "Không sao đâu, sự tuyệt diệu của thơ ca nằm ở việc cảm nhận, chứ không phải ở chỗ có hiểu hay không. Bạn có bằng lòng ngồi xuống đây nghe mình đọc một bài không?"'
          },
          {
            text: '"So với việc đọc thơ, tôi thích làm ruộng chân tay hơn."',
            friendshipChange: -40,
            response: 'Nụ cười của Liễu Nương nhạt đi đôi chút: "Siêng năng chăm chỉ tất nhiên là chuyện tốt... nhưng mà, thỉnh thoảng cũng cần dừng bước chân nghỉ ngơi một chút chứ." Nàng cúi đầu, tiếp tục lật giở tập thơ.'
          }
        ]
      },
      {
        text: 'Hoàng hôn dần buông xuống phía tây, trên mặt suối trôi nổi những ánh sáng màu vàng óng. Liễu Nương gấp tập thơ lại, đứng dậy.'
      },
      {
        text: '"Hôm nay trò chuyện vui lắm." Nàng đưa cho bạn một cánh hoa đào khô được kẹp cẩn thận trong sách, "Tặng cho bạn, coi như là... lời thề của thi hữu chúng ta nhé." Nàng đỏ mặt, quay người bước dọc theo con đường mòn bên suối đi xa dần.'
      }
    ]
  },
  {
    id: 'liu_niang_heart_5',
    npcId: 'liu_niang',
    requiredFriendship: 1600,
    title: 'Mật sự Đào Nguyên',
    scenes: [
      {
        text: 'Chập tối, Liễu Nương tìm đến bạn, sắc mặt có chút nghiêm trọng: "Bạn có rảnh không? Mình muốn dẫn bạn đến một nơi, có vài chuyện... mình nghĩ là nên cho bạn biết."'
      },
      {
        text: 'Nàng dẫn bạn đi tới trước một ngôi từ đường cũ bị bỏ hoang ở phía sau làng. Đẩy cánh cửa gỗ kêu kẽo kẹt ra, bên trong có thờ một tấm bia đá cổ xưa, trên đó khắc chi chít những dòng chữ nhỏ.'
      },
      {
        text: '"Đây là tộc bia của Đào Nguyên Hương." Liễu Nương nhẹ nhàng lên tiếng, "Bên trên có ghi chép lại những sự việc xảy ra vào hai trăm năm trước. Đào Nguyên Hương không phải là một ngôi làng bình thường —— nó được xây dựng bởi một nhóm người vì muốn chạy trốn khỏi chiến loạn, đã vượt đèo lội suối để tìm ra thung lũng bí ẩn này. Bọn họ trồng cây đào, xây mương nước tại đây, thề rằng sẽ không bao giờ dính dáng đến những tranh chấp rối ren ngoài kia nữa."',
        choices: [
          {
            text: '"Hóa ra là vậy... thảo nào nơi này lại tách biệt với thế giới, chẳng khác gì chốn bồng lai tiên cảnh."',
            friendshipChange: 120,
            response:
              'Liễu Nương gật đầu, hốc mắt hơi đỏ: "Đúng vậy. Tổ tiên nhà mình đời đời kiếp kiếp luôn trông giữ lấy bí mật này. Phụ thân thường nói, sự yên bình của Đào Nguyên Hương đã được đổi lấy bằng sự hi sinh của vô số người, chúng ta nhất định phải trân trọng nó."'
          },
          {
            text: '"Vì sao cô lại kể cho tôi nghe những điều này?"',
            friendshipChange: 80,
            response:
              'Liễu Nương trầm mặc một lát, khẽ nói: "Bởi vì sau khi bạn tới đây, vẫn luôn dốc lòng kinh doanh điền trang, giúp đỡ bà con lối xóm. Mình cảm thấy... bạn là một người đáng để tin tưởng. Hơn nữa, ông nội của bạn năm xưa cũng từng biết đến chuyện này."'
          }
        ]
      },
      {
        text: 'Liễu Nương bước tới trước tấm bia, lấy tay nhẹ nhàng gạt đi lớp bụi bám bên trên: "Trên bia còn ghi lại một đoạn tiên tri —— \'Sự hưng suy của Đào Nguyên, hệ tại hậu lai giả. Nhược hữu xích tâm chi nhân trùng canh thử địa, Đào Nguyên khả tái hiện tích nhật chi thịnh\'. Phụ thân vẫn luôn tin rằng, người đó chính là bạn."'
      },
      {
        text: 'Lúc ra khỏi từ đường, đêm đã khuya, trên trời đầy sao. Liễu Nương quay đầu lại nhìn bạn một cái: "Cảm ơn bạn đã chịu lắng nghe những điều này. Bí mật này... sau này chúng ta hãy cùng nhau gánh vác nhé." Dưới ánh trăng, ánh mắt nàng dịu dàng mà vô cùng kiên định.'
      }
    ]
  },
  {
    id: 'liu_niang_heart_8',
    npcId: 'liu_niang',
    requiredFriendship: 2400,
    title: 'Hoa Đào Dưới Trăng',
    scenes: [
      {
        text: 'Đêm khuya, bạn bị đánh thức bởi một tiếng gõ cửa nhè nhẹ. Mở cửa ra, chỉ thấy một bức thư được đặt trước cửa, bên trên viết: "Đêm nay trăng tròn, có hẹn tại vườn hoa đào. —— Liễu Nương"'
      },
      {
        text: 'Bạn đi đến vườn đào ở phía đông thôn. Ánh trăng sáng như nước, rải rác trên những cánh hoa đào bay đầy trời, cánh hoa dưới làn gió đêm chầm chậm rụng xuống, giống như một cơn mưa hoa không tiếng động. Liễu Nương đang đứng dưới gốc đào già ở giữa vườn, mặc một bộ y phục màu trắng mộc mạc, trên tóc cài một đóa hoa đào mới nở.'
      },
      {
        text: '"Bạn đến rồi." Nàng quay người lại, ánh trăng hắt lên khuôn mặt nàng, "Mình vẫn luôn đợi bạn." Nàng tiến lại gần vài bước, giọng nói nhẹ bẫng tựa như sợ sẽ làm những cánh hoa vỡ vụn, "Có những lời, mình đã giấu kín trong lòng từ rất lâu rồi..."'
      },
      {
        text: 'Liễu Nương cúi đầu, hai tay vò vò vạt áo: "Trước khi bạn tới Đào Nguyên Hương, mình cứ ngỡ bản thân sẽ phải trông giữ ngôi làng nhỏ này cả đời, làm bạn với thơ, trôi qua những tháng ngày bình dị. Nhưng kể từ khi bạn tới, mọi thứ đã thay đổi hoàn toàn. Mình nhìn thấy bạn khai hoang làm ruộng, giúp đỡ bà con, khiến mảnh đất này bừng bừng sức sống trở lại... Trong tim mình, giống như cũng nở rộ một vùng hoa đào vậy." Nàng ngẩng đầu lên, trong mắt có ánh lệ lấp lánh, "Mình... thích bạn."',
        choices: [
          {
            text: 'Khẽ nắm lấy tay nàng: "Tôi cũng thích cô, Liễu Nương. Bắt đầu từ cái ngày đọc thơ bên bờ suối đó."',
            friendshipChange: 160,
            response:
              'Nước mắt của Liễu Nương cuối cùng cũng tuôn rơi, nhưng nàng cười còn rực rỡ hơn cả hoa đào: "Thật không? Mình cứ nghĩ... mình cứ nghĩ đó chỉ là tâm tư của riêng một mình mình thôi chứ." Nàng nắm lấy tay bạn, mười ngón tay đan chặt vào nhau, "Vậy từ nay về sau, vườn hoa đào này chính là chốn hẹn ước của chúng ta."'
          },
          {
            text: '"Liễu Nương, tôi rất cảm động, nhưng mà tôi cần thêm một chút thời gian..."',
            friendshipChange: 0,
            response:
              'Liễu Nương sững sờ một lát, ngay sau đó khẽ buông tầm mắt xuống, mỉm cười đáp: "Không sao đâu, mình sẽ đợi. Hoa đào năm nào cũng nở rộ... tâm ý của mình cũng sẽ không bao giờ thay đổi." Tuy đang mỉm cười, nhưng dưới ánh trăng viền mắt của nàng đã hơi ửng đỏ.'
          }
        ]
      },
      {
        text: 'Một trận gió đêm thổi qua, cánh hoa đào bay lả tả rụng xuống. Bạn và Liễu Nương vai kề vai đứng giữa cơn mưa hoa, ánh trăng dịu dàng bao phủ vạn vật. Khoảnh khắc này, Đào Nguyên Hương thực sự chẳng khác nào chốn tiên cảnh chốn nhân gian. Phía xa xa vọng lại tiếng nước suối chảy, tựa như mảnh đất này đang khẽ khàng chúc phúc.'
      }
    ]
  },

  // ============================================================
  // 秋月 (qiu_yue) —— 渔家女，活泼开朗
  // ============================================================
  {
    id: 'qiu_yue_heart_3',
    npcId: 'qiu_yue',
    requiredFriendship: 800,
    title: 'Tỷ Thí Câu Cá',
    scenes: [
      {
        text: 'Thu Nguyệt tung tăng chạy tới, trong tay múa may hai cái cần câu: "Hê! Rảnh rỗi không có việc gì làm chứ? Đi theo mình, dẫn bạn tới một chỗ này hay cực! Đảm bảo là chưa đi bao giờ!" Không đợi bạn trả lời, cô nàng đã kéo ống tay áo bạn chạy về phía ngọn núi.'
      },
      {
        text: 'Đi xuyên qua một rừng trúc, vòng qua vài tảng đá lớn, trước mắt bỗng nhiên sáng sủa hẳn —— một cái đầm sâu nước xanh biếc, bốn phía được bao bọc bởi những tảng đá khổng lồ, ánh nắng xuyên qua kẽ lá rải xuống những vệt sáng lốm đốm. Mặt nước phẳng lặng như gương, thỉnh thoảng lại có một con cá vọt lên khỏi mặt nước, tạo thành những vòng gợn sóng.'
      },
      {
        text: '"Đây là chỗ câu cá bí mật của mình đó!" Thu Nguyệt đắc ý chống nạnh, "Cả làng chỉ có một mình mình biết thôi! Cá ở đây vừa to vừa béo, những chỗ bình thường vốn không thể nào sánh được." Cô nàng nhét một cái cần câu vào tay bạn, đôi mắt sáng lấp lánh, "Tới đây nào, chúng ta thi một ván đi! Trong vòng một nén nhang, ai câu được nhiều cá hơn, người đó thắng! Người thua sẽ phải bao ăn!"',
        choices: [
          {
            text: '"Được thôi! Vậy tôi sẽ không nhường cô đâu!"',
            friendshipChange: 120,
            response: 'Thu Nguyệt cười ha hả: "Thế mới đúng chứ! Mình ghét nhất là người khác nhường nhịn mình! Lại đây lại đây, chuẩn bị xong chưa —— Bắt đầu!" Cô nàng thành thạo ném dây câu ra, động tác gọn gàng dứt khoát, nhìn là biết ngay dân chuyên nghiệp.'
          },
          {
            text: '"Kỹ thuật câu cá của tôi không giỏi lắm, cô dạy tôi đi."',
            friendshipChange: 80,
            response:
              'Thu Nguyệt nghiêng đầu nhìn bạn, hì hì cười nói: "Được thôi, bổn cô nương đại phát từ bi dạy cho bạn vậy. Nhìn cho kỹ nhé —— cổ tay phải nhẹ nhàng, ném dây phải ổn định, quan trọng nhất là phải có kiên nhẫn. Nhưng mà thi thì vẫn phải thi đấy!"'
          },
          {
            text: '"Câu cá thì có gì mà phải thi thố chứ..."',
            friendshipChange: -40,
            response: 'Thu Nguyệt phồng má, trưng ra bộ mặt không vui: "Hừ! Câu cá là chuyện tuyệt vời nhất trên thế giới này đó! Thôi được rồi, không thèm tính toán với bạn nữa, đợi khi nào bạn câu được một con cá lớn thì sẽ biết vui thế nào!"'
          }
        ]
      },
      {
        text: 'Sau một nén nhang, hai người đếm lại chiến lợi phẩm của mình. Thu Nguyệt câu được sáu con, bạn câu được ba con. Cô nàng cười ngặt nghẽo: "Ha ha ha! Bạn thua rồi nha! Mời mình ăn bánh hoa quế trong tiệm Bác Trần đi! Không được quỵt nợ đâu đấy!"'
      },
      {
        text: 'Lúc thu dọn cần câu, Thu Nguyệt bỗng nhiên im lặng, nhìn mặt nước nói: "Thật ra... nơi này là hồi nhỏ ba mẹ hay dắt mình tới. Lúc đó nhà ba người bọn mình ngồi câu cá ở đây, cứ ngồi mãi suốt cả ngày." Cô nàng ngoảnh đầu lại mỉm cười với bạn, "Hôm nay được cùng bạn tới đây, mình cũng rất vui! Lần sau chúng ta lại thi tiếp nhé!"'
      }
    ]
  },
  {
    id: 'qiu_yue_heart_5',
    npcId: 'qiu_yue',
    requiredFriendship: 1600,
    title: 'Tâm Sự Đêm Mưa',
    scenes: [
      {
        text: 'Mưa bão liên tục nhiều ngày khiến nước suối dâng cao, người trong thôn đều trốn trong nhà. Khi bạn đi ngang qua nhà Thu Nguyệt, phát hiện cửa nhà cô ấy khép hờ, trong phòng không thắp đèn.'
      },
      {
        text: 'Đẩy cửa bước vào, mượn ánh chớp, bạn thấy Thu Nguyệt đang thu mình cuộn tròn bên cửa sổ, ôm lấy đầu gối, trên mặt vẫn còn vương nét lệ. Cô ấy nhìn thấy bạn, vội vàng lau mặt: "Bạn... sao bạn lại tới đây? Mình không sao, chỉ là... không thích ngày mưa cho lắm."'
      },
      {
        text: 'Bạn ngồi xuống bên cạnh. Trầm mặc rất lâu, Thu Nguyệt mới chịu mở miệng, giọng nói rất khẽ, đã mất đi sự sức sống ngày thường: "Ba năm trước... cũng là một ngày mưa bão thế này. Ba mẹ bảo muốn xuống hạ lưu xem thử tình hình nước, sau đó không bao giờ quay trở lại nữa." Giọng nói của cô ấy bắt đầu run lên, "Người trong làng nói họ bị nước lũ cuốn đi rồi... Tìm kiếm rất lâu, nhưng không tìm được gì cả."',
        choices: [
          {
            text: 'Lặng lẽ khoác áo khoác lên vai cô ấy, yên tĩnh ở bên bầu bạn.',
            friendshipChange: 160,
            response:
              'Thu Nguyệt sững sờ một chút, sau đó nước mắt không thể kìm nén được nữa. Cô ấy dựa đầu vào vai bạn, khóc rất lâu, rất lâu. Đợi đến khi cô ấy bình tĩnh lại, mới thầm thì: "Cảm ơn bạn... từ khi họ rời đi, mình luôn tự nhủ phải mỉm cười, không được để người khác lo lắng. Thế nhưng những lúc trời mưa... mình thực sự rất nhớ họ."'
          },
          {
            text: '"Thu Nguyệt... cô không cần phải gánh vác một mình đâu, lúc nào buồn cứ tới tìm tôi."',
            friendshipChange: 120,
            response:
              'Khóe miệng Thu Nguyệt run rẩy, cuối cùng không nhịn được òa khóc: "Mình... mình cứ nghĩ bản thân rất kiên cường. Nhưng mỗi lần trời mưa, mình lại nghĩ... nếu như hôm đó mình ngăn cản họ, có phải mọi chuyện sẽ không thành ra như thế này?" Cô ấy quệt nước mắt, "Bạn thực sự bằng lòng lắng nghe mình nói những chuyện này sao?"'
          }
        ]
      },
      {
        text: 'Mưa dần nhỏ lại, phía chân trời nứt ra một đường, le lói một tia sáng yếu ớt. Thu Nguyệt ngẩng đầu lên, đôi mắt đỏ hoe nhìn tia sáng đó: "Lúc trước mẹ mình hay bảo, sau cơn mưa nhất định mặt trời sẽ ló dạng. Mẹ còn nói, chỉ cần mình luôn tươi cười, họ trên thiên đường cũng sẽ nhìn mình mỉm cười."'
      },
      {
        text: 'Thu Nguyệt đứng dậy, hít sâu một hơi, sau đó quay người lại, nở một nụ cười tuy vẫn còn vương nước mắt nhưng đã xán lạn hơn: "Được rồi! Thu Nguyệt sẽ không khóc lóc ỉ ôi mãi đâu! Ngày mai mưa tạnh, chúng ta đi câu cá đi. Ba mẹ mình thích nhất là thấy mình vui vẻ đi câu cá đấy." Đôi mắt cô ấy lấp lánh, "Hơn nữa... có bạn ở đây, những ngày mưa hình như cũng không đáng sợ như vậy nữa."'
      }
    ]
  },
  {
    id: 'qiu_yue_heart_8',
    npcId: 'qiu_yue',
    requiredFriendship: 2400,
    title: 'Thuyền Về Trong Tịch Dương',
    scenes: [
      {
        text: 'Thu Nguyệt tìm đến bạn từ sáng sớm, trên lưng đeo một cái gùi tre lớn, trong gùi nhét chật ních đồ —— cần câu, mồi câu, lương khô, và cả một ấm trà. "Hôm nay cùng mình đi xa một chuyến! Đến bãi lau sậy ở hạ lưu suối Đào Hoa! Mình muốn dạy cho bạn tuyệt kỹ độc môn của mẹ mình!"'
      },
      {
        text: 'Hai người chèo con thuyền gỗ nhỏ của nhà Thu Nguyệt xuôi theo dòng nước. Thu Nguyệt ngồi ở mũi thuyền, đong đưa hai chân dưới nước, miệng ngân nga một khúc hát chài lưới. Bãi lau sậy đung đưa dưới ánh nắng vàng, những chú chim nước thỉnh thoảng lại sà xuống mặt nước. "Bài hát này là do mẹ dạy cho mình," Cô ấy kể, "Mẹ nói chỉ cần hát bài hát này, cá sẽ tự động bơi lại đây."'
      },
      {
        text: 'Khi tới một vùng nước rộng lớn, Thu Nguyệt bắt đầu trở nên nghiêm túc. Cô ấy cầm tay chỉ việc dạy bạn một cách ném dây vô cùng đặc biệt —— dây câu vẽ một đường cong tuyệt đẹp trên không trung, nhẹ nhàng rơi xuống mặt nước, gần như không làm bọt nước văng lên. "Đây gọi là \'Liễu Diệp Câu\', là do mẹ mình phát minh ra. Bí quyết là —— tay phải mềm mại như cành liễu, tâm phải tĩnh lặng như nước hồ."',
        choices: [
          {
            text: 'Nghiêm túc học hỏi, lặp đi lặp lại thực hành, cho đến khi ném ra được một chiêu Liễu Diệp Câu hoàn hảo.',
            friendshipChange: 120,
            response:
              'Thu Nguyệt nhìn đường câu của bạn vạch ra một đường cong hoàn mỹ trên không trung, đôi mắt mở to ngạc nhiên: "Wao! Bạn thế mà chỉ mất một buổi chiều đã học được rồi! Lúc đầu mình phải luyện tập ròng rã cả tháng trời lận đó!" Cô ấy vui mừng nhảy nhót khua chân múa tay, suýt chút nữa làm lật thuyền, "Nếu mẹ mình mà thấy được, chắc chắn cũng sẽ khen bạn đó!"'
          },
          {
            text: '"Kỹ thuật này lợi hại thật. Mẹ của cô nhất định là một người rất xuất chúng."',
            friendshipChange: 120,
            response:
              'Thu Nguyệt dùng sức gật gật đầu, trong mắt lấp lánh tia sáng kiêu ngạo xen lẫn nỗi nhớ mong: "Bà ấy là tay câu cừ khôi nhất Đào Nguyên Hương này! Lợi hại hơn cả mình gấp trăm lần!... Mình luôn muốn học được toàn bộ bản lĩnh của mẹ, sau đó dạy lại cho nhiều người. Như vậy bà ấy sẽ không bao giờ bị lãng quên."'
          }
        ]
      },
      {
        text: 'Hoàng hôn buông xuống, toàn bộ bãi lau sậy được nhuộm thành màu đỏ cam rực rỡ. Hai người cất cần câu, để con thuyền nhỏ chầm chậm trôi trên mặt nước. Thu Nguyệt ngồi ở mũi thuyền, ánh tà dương chiếu lên nửa bên sườn mặt của cô ấy, dịu dàng mà bừng sáng.'
      },
      {
        text: 'Đột nhiên, Thu Nguyệt xoay người lại, nghiêm túc nhìn bạn. Ánh tà dương nhảy nhót trong đôi mắt cô. "Mình vẫn luôn suy nghĩ xem nên mở miệng nói thế nào..." Cô ấy hiếm khi tỏ ra vặn vẹo như vậy, dùng ngón tay quấn quấn lọn tóc, "Bạn biết không? Từ khi bạn tới Đào Nguyên Hương, mỗi ngày mình đều cảm thấy vô cùng vui vẻ. Trước đây mình cứ nghĩ dẫu chỉ có một mình cũng không sao, nhưng bây giờ..." Cô ấy hít sâu một hơi, sau đó tuôn ra một lèo, "Mình thích bạn! Thích cực kỳ luôn! Còn thích hơn cả câu cá nữa! Đây đã là mức độ thích cao nhất mà mình có thể biểu đạt rồi!" Nói xong cô nàng đỏ bừng cả mặt, vùi đầu vào giữa hai đầu gối.'
      }
    ]
  },

  // ============================================================
  // 阿石 (a_shi) —— 矿工，沉默寡言
  // ============================================================
  {
    id: 'a_shi_heart_3',
    npcId: 'a_shi',
    requiredFriendship: 800,
    title: 'Cứu Hộ Hang Mỏ',
    scenes: [
      {
        text: 'Khi bạn đang khai khoáng nơi sâu thẳm hang mỏ, đột nhiên nghe thấy một tiếng trầm đục truyền tới từ phía trước, ngay sau đó là tiếng đất đá sụp lở. Bạn chạy theo hướng âm thanh phát ra, phát hiện A Thạch đang nằm ở chỗ vách đá bị sập —— chân trái của anh ta bị một tảng đá đè lên, trên trán có một vết máu, nhưng anh ta vẫn cắn chặt răng không nói một lời.'
      },
      {
        text: 'Thấy bạn, A Thạch khẽ nhíu mày: "... Sao cậu lại ở đây." Anh ta ngập ngừng một lúc, "Đừng qua đây, có thể sẽ sập nữa đấy."',
        choices: [
          {
            text: 'Bỏ ngoài tai lời khuyên can của anh ta, lập tức lao tới dời tảng đá đang đè trên chân ra.',
            friendshipChange: 160,
            response:
              'A Thạch sững sờ, muốn nói gì đó nhưng lại thôi. Bạn dùng hết sức lực để dời tảng đá ra, đỡ anh ta dựa vào vách đá an toàn. Anh cúi đầu im lặng một hồi lâu, mới nặn ra được hai chữ: "... Cảm ơn."'
          },
          {
            text: '"Tôi đi gọi người tới giúp! Anh đợi nhé!"',
            friendshipChange: 80,
            response:
              'A Thạch hé miệng, cuối cùng cũng không cản bạn. Đợi khi bạn dẫn người trong làng chạy tới, anh ta vẫn giữ nguyên tư thế ban đầu, chỉ là trên vách đá có thêm vài vết xước do móng tay cào. Sau khi được cứu ra, anh ta gật đầu với bạn: "... Vất vả rồi."'
          },
          {
            text: '"Chỗ này nguy hiểm quá, sao anh lại chạy xuống sâu thế này một mình chứ?"',
            friendshipChange: -40,
            response: 'Ánh mắt A Thạch tối sầm lại: "... Đào mỏ vốn là công việc của tôi." Anh quay mặt đi, không nói thêm lời nào. Tuy cuối cùng bạn vẫn giúp anh dời tảng đá ra, nhưng bầu không khí đã trở nên yên lặng.'
          }
        ]
      },
      {
        text: 'Bạn giúp A Thạch băng bó vết thương, đỡ anh từ từ đi ra khỏi mỏ. Dọc đường đi vẻ mặt anh vẫn vô cảm như vậy, nhưng bạn nhận ra lúc đi bộ anh cố tình dồn trọng tâm về phía bạn, giống như đang lặng lẽ dựa dẫm vào bạn.'
      },
      {
        text: 'Lúc đi đến cửa mỏ, A Thạch dừng bước. Anh móc từ trong ngực ra một hòn đá —— bề mặt thô ráp, phủ một lớp bụi xám xịt, không có gì nổi bật. "... Tặng cậu." Anh nói, "Trông thì không giống, nhưng bên trong có ngọc đấy." Gốc tai anh hơi đỏ lên, "Tôi... không giỏi nói cảm ơn. Cái này thay cho lời cảm ơn."'
      }
    ]
  },
  {
    id: 'a_shi_heart_5',
    npcId: 'a_shi',
    requiredFriendship: 1600,
    title: 'Bí Cảnh Pha Lê',
    scenes: [
      {
        text: 'Một buổi sáng nọ, A Thạch hiếm khi chủ động đến tìm bạn. Anh đứng trước cửa nhà, tay xách hai ngọn đèn mỏ, không nói một lời nhìn bạn. Đợi một lúc, anh mới mở lời: "... Theo tôi. Có một nơi... muốn cho cậu xem."'
      },
      {
        text: 'Anh dẫn bạn tiến vào mỏ, nhưng lại không đi con đường bình thường, mà dừng lại trước một khe nứt không có gì nổi bật. Anh lách người chui vào, bạn đi theo ngay phía sau, ngoằn ngoèo đi một đoạn rất dài, đường hầm ngày càng chật hẹp. Ngay khi bạn cảm thấy sắp không đi nổi nữa, trước mắt đột nhiên mở bừng ra.'
      },
      {
        text: 'Bạn hít sâu một hơi —— một hang động ngầm khổng lồ xuất hiện ngay trước mắt. Trên vách động phủ kín pha lê, có cái trong suốt như băng, có cái tỏa ra tia sáng tím nhạt, lại có cái hiện lên màu hổ phách ấm áp. Ánh đèn chiếu tới, cả cái hang động giống như một cung điện lộng lẫy đủ màu sắc.',
        choices: [
          {
            text: '"A Thạch... nơi này đẹp quá. Cảm ơn anh đã dẫn tôi tới đây."',
            friendshipChange: 120,
            response:
              'Khóe môi A Thạch nhếch lên gần như không thể phát hiện —— đây có lẽ là biểu cảm giống với nụ cười nhất của anh ta mà bạn từng thấy. "Ừ." Anh cầm đèn soi vào một cụm thạch anh tím, "... Phải tìm kiếm suốt hai năm mới thấy nơi này. Chưa từng nói cho ai biết."'
          },
          {
            text: '"Chỗ pha lê này chắc chắn bán được nhiều tiền lắm đây!"',
            friendshipChange: -40,
            response:
              'Ánh mắt A Thạch lạnh đi trong tích tắc, lập tức khôi phục lại vẻ bình tĩnh. "... Không bán." Anh trả lời cộc lốc. Bước đến trước một trụ pha lê khổng lồ, dùng những ngón tay sần sùi nhẹ nhàng chạm lên bề mặt của nó, giống như đang vuốt ve một sinh mệnh mong manh.'
          }
        ]
      },
      {
        text: 'A Thạch ngồi xuống ở giữa hang động, chỉnh đèn mỏ tối lại. Trong bóng tối, bạn kinh ngạc phát hiện ra những viên pha lê đó thế mà tự thân có thể phát sáng —— thứ ánh sáng dịu nhẹ, mờ ảo, hệt như một bầu trời sao dưới lòng đất. "Hồi nhỏ tôi... rất sợ bóng tối." Giọng nói của A Thạch vang vọng trong hang, "Sau này phát hiện ra những hòn đá có thể phát sáng. Bọn chúng nói cho tôi biết... trong bóng tối cũng có ánh sáng."'
      },
      {
        text: 'Anh im lặng một lát, rồi tiếp tục: "Đá sẽ không nói chuyện, sẽ không biết lừa gạt người. Tôi cảm thấy... ở cạnh đá còn thoải mái hơn ở cạnh người." Anh quay đầu lại nhìn bạn, ánh sáng mờ ảo của ngọn đèn lấp lánh trong đôi mắt sâu thẳm, "Nhưng mà... cậu thì khác." Anh không giải thích ý nghĩa của câu nói này, đứng dậy, "Đi thôi, phải về rồi."'
      }
    ]
  },
  {
    id: 'a_shi_heart_8',
    npcId: 'a_shi',
    requiredFriendship: 2400,
    title: 'Tâm Ý Trong Đá',
    scenes: [
      {
        text: 'Đã mấy ngày liền không thấy A Thạch xuất hiện. Bác Trần nói cậu ta cứ nhốt mình trong nhà, đục đục gõ gõ không biết đang làm trò gì. Bạn có chút lo lắng, quyết định sang xem thử.'
      },
      {
        text: 'Bạn đi tới trước cửa nhà A Thạch, gõ gõ mấy cái. Âm thanh bên trong bỗng nhiên dừng bặt. Qua một hồi lâu, cánh cửa mới hé ra một khe hở, A Thạch thò đầu ra, trên mặt dính đầy bột đá, tóc tai rối bù, trên tay còn quấn mấy vòng băng gạc. Nhìn thấy bạn, ánh mắt anh hoảng hốt trong tích tắc, vội giấu thứ gì đó ra sau lưng: "Cậu... sao cậu lại tới đây. Tôi không sao đâu."'
      },
      {
        text: 'Bạn để ý thấy trên bàn làm việc phía sau anh ta nằm vương vãi đủ loại công cụ —— búa nhỏ, cái đục, giấy nhám, và còn rất nhiều đá vụn mài bị hỏng. Trong góc đặt một quyển 《Đồ Phổ Điêu Khắc Đá Quý》 bị lật đến sờn cả mép.',
        choices: [
          {
            text: '"A Thạch, anh bị thương rồi, để tôi giúp anh băng bó lại."',
            friendshipChange: 120,
            response:
              'A Thạch do dự một chút, cuối cùng cũng gượng gạo chìa tay ra. Bạn cẩn thận giúp anh băng bó lại những ngón tay bị đục cứa rách. Anh vẫn luôn ngoảnh mặt đi không thèm nhìn bạn, nhưng bạn có thể cảm nhận được ngón tay anh đang khẽ run lên. "... Cảm ơn." Giọng anh lí nhí như muỗi kêu.'
          },
          {
            text: '"Anh đang làm gì vậy? Có thể cho tôi xem thử không?"',
            friendshipChange: 80,
            response:
              'Cơ thể A Thạch cứng đờ, hai tai đỏ rực ngay lập tức. Anh im lặng rất lâu, rất lâu, lâu đến mức bạn tưởng rằng anh sẽ không trả lời. Sau đó anh từ từ rút tay ở phía sau ra —— trong lòng bàn tay đang nằm một thứ gì đó. "... Vẫn chưa xong đâu." Anh thì thầm.'
          }
        ]
      },
      {
        text: 'Cuối cùng A Thạch cũng hạ quyết tâm. Anh hít một hơi thật sâu, móc từ trong ngực ra một cái túi vải nhỏ, vụng về đưa tới trước mặt bạn. Bạn mở ra xem —— là một chiếc mặt dây chuyền, được mài giũa từ đá thạch anh tím trong hang động pha lê đó, trong suốt long lanh, dưới ánh sáng khúc xạ ra những vệt sáng màu tím nhẹ nhàng. Hình dáng của mặt dây chuyền là một đóa hoa đào, mỗi một cánh hoa đều được mài giũa cực kỳ tinh xảo.'
      },
      {
        text: 'A Thạch đỏ bừng mặt, đôi môiấp úng hồi lâu, lời nói ra cứ ngắc ngứ: "Cái này... làm rất lâu. Làm hỏng rất nhiều viên... tay cũng bị cứa đứt rất nhiều lần. Bởi vì tôi... tôi không biết nói những lời hay ý đẹp, cũng không thể... giống như những người khác." Anh túm chặt lấy vạt áo, ngẩng đầu lên nhìn thẳng vào mắt bạn —— đây là lần đầu tiên bạn nhìn thấy một tia sáng mãnh liệt đến thế trong mắt anh, "Thế nhưng... tôi muốn đem loại đá tốt nhất, làm ra một thứ tốt nhất, tặng cho người... người quan trọng nhất." Giọng nói của anh nhỏ dần đi, cuối cùng dường như chỉ còn lại tiếng thở, "... Là cậu. Vẫn luôn là cậu."'
      }
    ]
  },

  // ============================================================
  // 春兰 (chun_lan) —— 茶庄女主人，温婉端庄
  // ============================================================
  {
    id: 'chun_lan_heart_3',
    npcId: 'chun_lan',
    requiredFriendship: 800,
    title: 'Trà Xuân Mới Hái',
    scenes: [
      {
        text: 'Sương mai còn chưa tan hết, Xuân Lan mời bạn tới thăm vườn trà của nàng. Từng luống trà san sát xanh biếc mướt mát tắm trong ánh bình minh, sương sớm đọng trên những búp trà non nhấp nháy tỏa sáng.'
      },
      {
        text: '"Đây là lứa trà xuân đầu tiên của năm nay, quý giá nhất." Xuân Lan khẽ nói, những ngón tay thon dài nhấc lên một búp lá non, "Hái trà chú trọng ở chỗ một búp một lá, động tác phải thật nhẹ, tựa như đang vuốt ve khuôn mặt của trẻ sơ sinh vậy."',
        choices: [
          {
            text: 'Tỉ mỉ bắt chước lại động tác của nàng, nghiêm túc bắt đầu hái trà.',
            friendshipChange: 120,
            response: 'Xuân Lan nhìn những lá trà bạn hái, trong mắt lóe lên sự tán thưởng: "Động tác rất vững, phiến lá hoàn chỉnh không tì vết. Chàng rất có thiên phú." Khóe môi nàng hiện lên một nụ cười dịu dàng.'
          },
          {
            text: '"Chỗ lá trà này nhìn lá nào cũng giống nhau, làm sao phân biệt được tốt xấu đây?"',
            friendshipChange: 40,
            response: 'Xuân Lan kiên nhẫn nhặt hai chiếc lá lên so sánh cho bạn xem: "Nhìn này, chiếc lá này màu sắc đồng đều, gân lá rõ ràng, là loại thượng phẩm. Trà cũng như người, cần phải dụng tâm mới có thể phân biệt."'
          },
          {
            text: '"Hái trà rề rà quá, không bằng trồng lúa ăn chắc mặc bền hơn."',
            friendshipChange: -40,
            response: 'Nụ cười của Xuân Lan hơi cứng lại, ngay sau đó khôi phục lại dáng vẻ đoan trang: "Mỗi người có một lý lẽ riêng. Chỉ là vườn trà do tổ tiên truyền lại, ta không nỡ để nó hoang phế."'
          }
        ]
      },
      {
        text: 'Hái trà xong, Xuân Lan dẫn bạn trở lại trà trang, tự tay sao mẻ trà mới. Lá trà đảo liên tục trong nồi sắt, hương thơm ngát cả gian phòng. Động tác của nàng thuần thục và tao nhã, hệt như đang trình diễn một vũ điệu không lời.'
      },
      {
        text: 'Xuân Lan đem mẻ trà mới sao xong pha một ấm rót đưa cho bạn: "Đây là chén trà đầu tiên của mùa xuân này, theo quy định của trà trang, phải kính dâng cho vị khách tôn quý nhất." Nàng cúi đầu, hàng mi khẽ run rẩy, "Năm nay... ta muốn kính dâng cho chàng."'
      }
    ]
  },
  {
    id: 'chun_lan_heart_5',
    npcId: 'chun_lan',
    requiredFriendship: 1600,
    title: 'Trà Trang Trong Mưa',
    scenes: [
      {
        text: 'Một trận mưa rào bất chợt đổ xuống khiến bạn bị mắc kẹt tại trà trang của Xuân Lan. Tiếng mưa rơi lộp độp trên mái ngói, trong trà trang ngập tràn mùi hương trầm và vị đắng thanh của lá trà.'
      },
      {
        text: 'Xuân Lan lẳng lặng ngồi bên cửa sổ, nhìn màn mưa thẫn thờ. Bạn nhận ra khóe mắt nàng hơi đỏ hoe. Qua một hồi lâu, nàng mới khẽ lên tiếng: "Hôm nay là ngày giỗ của phụ thân ta."'
      },
      {
        text: '"Phụ thân mất sớm, trà trang chỉ còn lại một mình ta gánh vác. Người trong thôn bảo phận nữ nhi kinh doanh trà trang không dễ dàng gì, cứ khuyên ta nên tái giá hoặc nhượng lại trà trang cho người khác." Giọng nàng bình lặng như mặt nước, nhưng lại ẩn giấu sự run rẩy khó nhận ra, "Nhưng đây là cơ nghiệp phụ thân để lại cho ta, là tâm huyết năm đời của gia đình ta. Ta làm sao nỡ bỏ."',
        choices: [
          {
            text: '"Nàng đã làm rất tốt, Xuân Lan. Phụ thân nhất định sẽ tự hào về nàng."',
            friendshipChange: 120,
            response: 'Nước mắt Xuân Lan cuối cùng cũng tuôn rơi, nhưng nàng nhanh chóng dùng khăn tay lau đi, khóe miệng mang theo một nụ cười nhẹ nhõm: "Cảm ơn chàng. Những lời này... ta đã chờ đợi rất lâu rồi."'
          },
          {
            text: 'Lặng lẽ châm thêm cho nàng một chén trà, yên tĩnh ở bên cạnh nàng.',
            friendshipChange: 120,
            response:
              'Xuân Lan cúi đầu nhìn nước trà trong chén, im lặng rất lâu, sau đó khẽ nói: "Động tác rót trà của chàng... dịu dàng y như phụ thân ta vậy." Nàng không nói thêm gì nữa, nhưng nét mặt đã thả lỏng hơn rất nhiều.'
          }
        ]
      },
      {
        text: 'Mưa dần tạnh dần. Chunlan lấy ra một lon trà cũ từ sâu trong tủ——Thân lon có lốm đốm, có dòng chữ “"Xuân"lời nói."Đây là mẻ trà cuối cùng cha tôi rang, tôi đành miễn cưỡng mở ra."Cô cẩn thận mở lon và pha nó. Trà có mùi thơm êm dịu và kéo dài.'
      },
      {
        text: '"Trước đây vào những ngày mưa, ta luôn ngồi ở chỗ này nhớ về phụ thân." Xuân Lan nâng chén trà lên, khẽ đưa tay kính bầu trời vừa hửng nắng sau cơn mưa, "Nhưng hôm nay... có chàng ở đây, ta cảm thấy không còn cô đơn nữa."'
      }
    ]
  },
  {
    id: 'chun_lan_heart_8',
    npcId: 'chun_lan',
    requiredFriendship: 2400,
    title: 'Thưởng Trà Dưới Trăng',
    scenes: [
      {
        text: 'Vào một đêm đầu thu, bạn nhận được một tấm thiệp mời của Xuân Lan, bên trên dùng chữ tiểu khải thanh tú viết: "Đêm nay trăng thanh gió mát, trà trang đã chuẩn bị sẵn một ấm trà thơm, cung kính đợi quân lâm."'
      },
      {
        text: 'Trong sân nhỏ của trà trang, trên bàn đá trải sẵn chiếu trà màu sắc nhã nhặn, một chiếc đèn dầu hắt bóng vài cành hoa quế. Xuân Lan vận y phục màu trắng ánh trăng, quỳ gối bên bàn trà, trước mặt bày một bộ trà cụ đầy đủ. Ánh trăng hắt lên người nàng, khiến cả người nàng trông hệt như một bức họa thủy mặc.'
      },
      {
        text: '"Mời ngồi." Động tác của nàng như mây trôi nước chảy, tráng chén, tráng ấm, rót nước, chắt trà, mỗi một bước đều tao nhã thong dong. Nàng dùng hai tay dâng một chén trà tới trước mặt bạn, ánh mắt dịu dàng tựa ánh trăng.',
        choices: [
          {
            text: 'Dùng hai tay nhận lấy chén trà, nghiêm túc thưởng thức. "Đây là chén trà ngon nhất mà tôi từng được uống."',
            friendshipChange: 120,
            response: 'Đôi má Xuân Lan hơi ửng hồng, nụ cười trên khóe môi giấu cũng không giấu được: "Bởi vì... người pha trà, đã dùng toàn bộ tâm ý của mình."'
          },
          {
            text: '"Xuân Lan, đêm nay mọi thứ đều thật đẹp. Ánh trăng, hoa quế... và cả nàng nữa."',
            friendshipChange: 160,
            response:
              'Ngón tay Xuân Lan run lên, chén trà suýt nữa thì tuột khỏi tay. Nàng cúi gằm mặt xuống, nhưng bạn có thể thấy tai nàng đã đỏ lựng lên rồi. "Chàng... cái con người này... sao đột nhiên lại nói những lời như thế." Giọng nói vừa nhỏ vừa mềm mại.'
          }
        ]
      },
      {
        text: 'Thưởng xong ba tuần trà, Xuân Lan đặt chén xuống, hai tay đan vào nhau đặt trên đầu gối. Nàng hít sâu một hơi, ngẩng đầu lên, ánh trăng trong mắt nàng tựa hồ lóng lánh ánh nước.'
      },
      {
        text: '"Trà trang của ta có một truyền thống —— sao một loại trà cả đời chỉ làm một lần duy nhất, gọi là \'Định Tình Trà\', chỉ dành cho người quan trọng nhất đời này uống." Nàng lấy từ trong tay áo ra một chiếc túi gấm nhỏ xíu, "Đây là loại trà được ta dùng lứa trà xuân ngon nhất năm nay, tự tay sao chế. Từ lúc hái trà cho tới lúc sao trà, mỗi một bước ta đều nghĩ đến chàng." Nàng rốt cuộc cũng nhìn thẳng vào mắt bạn, ánh mắt trong veo mà kiên định, "Ta biết bản thân không giỏi ăn nói, nhưng tâm ý trong chén trà này... chàng có hiểu được không?"'
      }
    ]
  },

  // ============================================================
  // 雪芹 (xue_qin) —— 画师，孤傲清高
  // ============================================================
  {
    id: 'xue_qin_heart_3',
    npcId: 'xue_qin',
    requiredFriendship: 800,
    title: 'Người Trong Tranh',
    scenes: [
      {
        text: 'Bạn đi ngang qua phòng tranh của Tuyết Cần, phát hiện cửa đang mở hé. Xuyên qua khe cửa, bạn thấy nàng đang đứng trước một khung buồm khổng lồ, tay cầm cọ vẽ, ngưng thần bất động.'
      },
      {
        text: 'Nàng dường như cảm nhận được sự hiện diện của bạn, không buồn ngoảnh đầu lại mà nói: "Đã tới rồi thì vào đi. Đừng lên tiếng." Bạn bước vào, nhìn thấy trên khung buồm là một bức sơn thủy chưa hoàn thành —— những ngọn núi mây mù lượn lờ, thác nước từ trên núi đổ xuống, ý cảnh vô cùng thanh u.'
      },
      {
        text: 'Nàng bỗng buông cọ xuống, nhíu mày liếc nhìn bạn một cái. "Đứng ra chỗ kia, dựa vào cửa sổ." Nàng chỉ tay về phía bên cửa sổ. Bạn làm theo. Nàng lại cầm cọ lên, ánh mắt di chuyển qua lại giữa bạn và bức tranh.',
        choices: [
          {
            text: 'Đứng yên lặng, giữ nguyên tư thế để phối hợp cho nàng vẽ.',
            friendshipChange: 120,
            response:
              'Không biết đã bao lâu trôi qua, Tuyết Cần cuối cùng cũng đặt cọ xuống. Nàng lùi lại vài bước nhìn bức tranh, khóe miệng khẽ nhếch lên —— đây là lần đầu tiên bạn thấy nàng lộ ra vẻ mặt hài lòng. "Ừm... ánh sáng và đổ bóng không tồi. Ngươi có thể cử động rồi."'
          },
          {
            text: '"Nàng đang vẽ ta sao?" Tò mò sán lại gần để xem.',
            friendshipChange: 40,
            response: 'Tuyết Cần dùng bảng vẽ che khuất bức tranh, nhíu mày: "Chưa vẽ xong thì không được xem. Cái con người này, chẳng có chút kiên nhẫn nào cả." Tuy miệng đang phàn nàn, nhưng ánh mắt của nàng không hề có vẻ bực bội.'
          }
        ]
      },
      {
        text: 'Sau này bạn nghe Bác Trần kể lại, trong bức tranh sơn thủy mà Tuyết Cần vẽ hôm đó, bên cạnh thác nước có thêm một bóng người đang tựa cửa nhìn xa xăm. Nghe nói đó là bức tranh có nhân vật duy nhất của nàng trong suốt ba năm qua.'
      }
    ]
  },
  {
    id: 'xue_qin_heart_5',
    npcId: 'xue_qin',
    requiredFriendship: 1600,
    title: 'Hẹn Ước Mặc Mai',
    scenes: [
      {
        text: 'Trận tuyết đầu tiên của mùa đông. Bạn phát hiện Tuyết Cần đang ngồi một mình dưới gốc mai trên núi sau, trước mặt dựng một giá vẽ, những ngón tay lạnh cóng đến đỏ ửng nhưng vẫn đang chăm chú vẽ những bông hồng mai trong tuyết.'
      },
      {
        text: '"Đừng qua đây." Nàng nhận ra bước chân của bạn, giọng điệu lạnh lùng, "Ngươi sẽ dẫm nát cảnh tuyết này mất." Nhưng bạn để ý thấy môi nàng đã lạnh đến mức tím tái lại rồi.'
      },
      {
        text: 'Bạn đi vòng một vòng lớn, theo một con đường mòn khác đi tới bên cạnh nàng, đưa tách trà nóng mang theo cho nàng. Tuyết Cần liếc nhìn bạn, dường như muốn nói gì đó, cuối cùng vẫn nhận lấy tách trà nhấp một ngụm. "... Lo chuyện bao đồng." Nàng nhỏ giọng lầm bầm.',
        choices: [
          {
            text: 'Cởi áo khoác khoác lên vai nàng, sau đó yên lặng ngồi sang một bên xem nàng vẽ.',
            friendshipChange: 160,
            response:
              'Ngòi bút của Tuyết Cần khựng lại một nhịp. Nàng không từ chối áo khoác của bạn, chỉ hơi ngoảnh mặt đi. Bạn loáng thoáng thấy khóe môi nàng cong lên. Rất lâu sau nàng mới khẽ cất lời: "... Ngươi không lạnh sao? Đồ ngốc."'
          },
          {
            text: '"Bức tranh này đẹp quá, kỹ thuật vẽ của nàng ngày càng tiến bộ rồi."',
            friendshipChange: 80,
            response: 'Tuyết Cần lườm bạn một cái: "Kỹ thuật vẽ của ta luôn luôn rất tốt." Ngừng một lát, lại nói thêm, "... Nhưng hoa mai hôm nay quả thật nở rất đẹp. Thích hợp để đưa vào tranh."'
          }
        ]
      },
      {
        text: 'Hôm đó sau khi trở về, bạn phát hiện trước cửa nhà mình có đặt một cuộn tranh, mở ra xem —— là một bức Mặc Mai Đồ, nét bút thanh lãnh nhưng lại mang theo vài phần ấm áp. Góc bức tranh có viết một dòng chữ nhỏ: "Hàn mai bất tranh xuân, chỉ vị tri kỷ khai. —— Tặng." Không có chữ ký, nhưng nét chữ đó bạn nhận ra được.'
      }
    ]
  },
  {
    id: 'xue_qin_heart_8',
    npcId: 'xue_qin',
    requiredFriendship: 2400,
    title: 'Đan Thanh Tri Kỷ',
    scenes: [
      {
        text: 'Phòng tranh của Tuyết Cần hiếm khi đóng kín cửa. Bạn gõ gõ cửa, bên trong truyền ra giọng nói của nàng: "... Là ngươi sao? Vào đi. Đừng để người khác nhìn thấy."'
      },
      {
        text: 'Đẩy cửa vào, bạn sững sờ —— trên bốn bức tường của phòng tranh treo kín các bức họa, tất cả đều là phong cảnh của Đào Nguyên Hương. Suối hoa đào mùa xuân, đầm sen mùa hạ, cánh đồng lúa chín vàng mùa thu, núi tuyết mùa đông. Và trong mỗi bức tranh, đều có một bóng người mờ ảo đang làm lụng trên cánh đồng.'
      },
      {
        text: 'Tuyết Cần đứng giữa phòng tranh, quay lưng về phía bạn. Giọng nói của nàng ôn nhu hơn ngày thường rất nhiều: "Ngươi thấy rồi đó. Những bức tranh này... mỗi một bức đều là do ta lén vẽ từ cửa sổ." Nàng chầm chậm quay người lại, vành mắt ửng đỏ, "Ta luôn không hiểu, tại sao sau khi tới ngôi làng nhỏ này, màu sắc dưới ngòi bút của ta đột nhiên lại trở nên ấm áp đến vậy."',
        choices: [
          {
            text: '"Tuyết Cần... hóa ra nàng vẫn luôn vẽ những thứ này."',
            friendshipChange: 120,
            response:
              'Tuyết Cần ngoảnh mặt đi, giọng nói hơi run rẩy: "Đừng dùng ánh mắt đó nhìn ta. Ta chỉ là... cảm thấy những phong cảnh đó rất đẹp, chỉ vậy thôi." Nhưng những ngón tay đang túm chặt lấy tay áo đã tố cáo sự căng thẳng của nàng.'
          },
          {
            text: 'Đi tới trước mặt nàng, nghiêm túc nhìn thẳng vào mắt nàng.',
            friendshipChange: 120,
            response: 'Hơi thở của Tuyết Cần dồn dập trong tích tắc, nàng muốn lùi lại, nhưng lại phát hiện phía sau đã là bức tường. "Ngươi, ngươi định làm gì..." Lớp mặt nạ băng giá của nàng rốt cuộc cũng xuất hiện vết nứt.'
          }
        ]
      },
      {
        text: 'Tuyết Cần hít sâu một hơi, lấy từ trong ngực ra một bức tranh nhỏ —— chỉ lớn cỡ bàn tay. Trên tranh là một cành hoa mai và một cành hoa đào quấn quýt lấy nhau, cánh hoa hòa quyện, khó lòng phân biệt được.'
      },
      {
        text: '"Con người ta, không biết nói lời ngon tiếng ngọt, cũng chẳng thích nơi náo nhiệt. Người khác đều bảo ta lạnh lùng, bảo ta cô độc." Giọng nàng ngày càng nhỏ, cuối cùng giống như được rặn ra từ kẽ răng, "Thế nhưng... ngươi thì khác. Ngươi đã mang màu sắc đến cho thế giới của ta." Nàng nhét bức tranh nhỏ vào tay bạn, nhanh chóng quay người đi, "Cầm lấy. Đừng trả lại. Đây là... sự kiêu ngạo cuối cùng của ta." Đôi vai của nàng đang khẽ run lên.'
      }
    ]
  },

  // ============================================================
  // 素素 (su_su) —— 裁缝，娴静手巧
  // ============================================================
  {
    id: 'su_su_heart_3',
    npcId: 'su_su',
    requiredFriendship: 800,
    title: 'Nỗi Lo Đứt Chỉ',
    scenes: [
      {
        text: 'Bạn đi ngang qua Tố Tài Phường, nghe thấy bên trong truyền ra tiếng thở dài nhè nhẹ. Đẩy cửa bước vào, thấy Tố Tố đang ngồi ngẩn ngơ trước khung cửi, bên tay xếp một đống chỉ màu.'
      },
      {
        text: '"A, chàng tới rồi." Tố Tố có chút ngượng ngùng thu lại tiếng thở dài, "Không có gì đâu, chỉ là... chất lượng lứa chỉ tơ này không được tốt, ta đang thêu một bộ y phục rất quan trọng, nhưng cứ bị đứt chỉ mãi."'
      },
      {
        text: 'Bạn nhận ra trên ngón tay nàng quấn mấy miếng băng dán cá nhân nhỏ xíu —— đều là do bị kim đâm. Nàng đang thêu một bộ hỉ phục tuyệt đẹp, họa tiết phượng hoàng đã hoàn thành được một nửa, sống động như thật.',
        choices: [
          {
            text: '"Bộ hỉ phục này đẹp quá. Tay nghề của nàng đúng là tinh xảo."',
            friendshipChange: 120,
            response:
              'Khuôn mặt Tố Tố hơi ửng hồng: "Cảm ơn chàng. Đây là đồ may cho một tân nương ở làng bên. Mỗi một bộ hỉ phục đều gánh vác sự kỳ vọng của tân nương, ta không muốn làm cho có lệ." Nàng cúi đầu tiếp tục thêu, trên khóe môi đã có ý cười.'
          },
          {
            text: '"Tay đều bị đâm thành ra thế này rồi, có muốn nghỉ ngơi một lát không?"',
            friendshipChange: 80,
            response: 'Tố Tố lắc đầu: "Không sao đâu, làm thợ may làm gì có chuyện không bị kim đâm trúng tay chứ." Nàng khẽ thổi thổi đầu ngón tay, "Chỉ cần thành phẩm may ra đẹp mắt, mấy vết thương nhỏ này chẳng đáng là gì."'
          }
        ]
      },
      {
        text: 'Lúc sắp rời đi, Tố Tố gọi bạn lại: "Đợi một chút." Nàng lấy từ bên cạnh ra một chiếc khăn tay đưa cho bạn —— trên nền lụa trắng tinh khôi thêu một gốc trúc nhỏ nhắn, đường kim mũi chỉ vô cùng tỉ mỉ. "Khăn tay của chàng cũ rồi, chiếc này tặng chàng. Coi như là... cảm ơn chàng đã thường xuyên ghé qua chơi." Nàng cúi đầu, không dám nhìn bạn.'
      }
    ]
  },
  {
    id: 'su_su_heart_5',
    npcId: 'su_su',
    requiredFriendship: 1600,
    title: 'Áo Cũ Xiêm Mới',
    scenes: [
      {
        text: 'Tố Tố hiếm khi ra khỏi tiệm may, nàng đang đứng trước điền trang của bạn. Trong ngực ôm một bọc vải, thấy bạn bước tới, nàng có chút căng thẳng cất lời: "Chuyện là... ta có một yêu cầu không biết có quá đáng không."'
      },
      {
        text: 'Nàng mở bọc vải ra, bên trong là một chiếc áo cũ đã phai màu. "Đây là bộ y phục duy nhất mà mẫu thân ta để lại. Khi bà qua đời ta vẫn còn nhỏ, chỉ có bộ y phục này là vẫn lưu giữ hơi ấm của bà." Vành mắt Tố Tố đỏ hoe, "Nhưng nó đã quá cũ rồi, chất vải đã rách nát ở vài chỗ. Ta muốn tháo nó ra, dệt vào một bộ y phục mới, như vậy có thể lưu giữ mãi mãi. Thế nhưng một mình ta... không dám động tay vào. Ta sợ sẽ làm hỏng nó."',
        choices: [
          {
            text: '"Ta làm cùng nàng. Nàng ra tay, ta sẽ phụ đưa công cụ cho nàng."',
            friendshipChange: 120,
            response:
              'Tố Tố dùng sức gật đầu, hít sâu một hơi. Ngón tay của nàng vẫn đang hơi run rẩy, nhưng có bạn ở cạnh bên, nàng đã dần bình tĩnh lại. Tháo chỉ, cắt may, dệt lại từ đầu —— mỗi một bước nàng đều làm vô cùng cẩn thận, tựa như đang chạm vào món bảo vật trân quý nhất thế gian.'
          },
          {
            text: '"Mẫu thân của nàng nhất định là một người rất đỗi dịu dàng, giống hệt như nàng vậy."',
            friendshipChange: 120,
            response:
              'Nước mắt của Tố Tố cuối cùng cũng lăn dài. Nàng vội vàng lau đi, ngại ngùng cười: "Mọi người đều nói như vậy. Từ nhỏ ta đã muốn trở thành một người khéo tay giống như mẫu thân, dùng từng đường kim mũi chỉ để sưởi ấm cho người khác."'
          }
        ]
      },
      {
        text: 'Cặm cụi suốt cả một ngày, tấm vải cũ cuối cùng cũng được dệt vào một chiếc khăn quàng mới. Tố Tố nâng chiếc khăn trong lòng bàn tay, nhẹ nhàng áp lên má, khép hờ đôi mắt. "Mẹ... vẫn ở đây." Nàng thì thầm.'
      },
      {
        text: 'Nàng mở mắt ra, nhìn bạn, trong ánh mắt có muôn vàn lời muốn nói. Cuối cùng nàng chỉ cười nhạt: "Cảm ơn chàng hôm nay đã ở bên ta. Sau này... ta cũng muốn may cho chàng một bộ y phục. Dùng loại vải tốt nhất, khâu vào đó toàn bộ tâm ý của ta."'
      }
    ]
  },
  {
    id: 'su_su_heart_8',
    npcId: 'su_su',
    requiredFriendship: 2400,
    title: 'Gấm Thêm Hoa',
    scenes: [
      {
        text: 'Một hôm bạn về nhà, phát hiện trước cửa có đặt một chiếc hộp gỗ tinh xảo, bên trên buộc một sợi dây đỏ. Mở ra xem, bên trong là một bộ y phục —— được may bằng lụa thượng hạng, màu sắc ôn nhuận như ngọc, cổ áo và ống tay áo thêu những họa tiết vô cùng tỉ mỉ. Còn có một bức thư.'
      },
      {
        text: 'Trong thư viết: "Bộ y phục này ta đã may rất lâu, đo đi đo lại kích thước của chàng rất nhiều lần (đều là nhân lúc chàng không để ý mà lén đo đấy, xin lỗi nhé). Nếu như... tối nay chàng tiện đường, xin hãy mặc nó vào rồi đến Tố Tài Phường. —— Tố Tố"'
      },
      {
        text: 'Bạn mặc áo mới rồi đi tới Tố Tài Phường. Tố Tố đang đứng ở cửa đợi bạn, nàng cũng diện một bộ y phục mới màu trắng tinh khôi, nhìn thấy bạn mặc bộ y phục do nàng may, đôi mắt nàng sáng bừng lên. "Rất vừa vặn." Nàng khẽ nói, "Còn đẹp hơn cả mức ta tưởng tượng."',
        choices: [
          {
            text: '"Đây là món quà tuyệt vời nhất mà ta từng nhận được. Cảm ơn nàng, Tố Tố."',
            friendshipChange: 120,
            response: 'Tố Tố cúi đầu, hai tay vò vạt áo, giọng nhỏ như tiếng muỗi kêu: "Đừng cảm ơn ta... bộ y phục này... là tác phẩm ta dồn tâm huyết nhất. Bởi vì..." Giọng nói của nàng cứ đứt quãng.'
          },
          {
            text: 'Vươn tay giúp nàng vuốt lại những lọn tóc bị gió thổi rối.',
            friendshipChange: 160,
            response: 'Toàn thân Tố Tố run rẩy, ngơ ngác nhìn bạn, hai má nhanh chóng ửng đỏ tới tận mang tai. "Chàng..." Giọng nàng trở nên nhẹ bẫng, tựa như sợ sẽ dọa một chú bướm bay đi mất.'
          }
        ]
      },
      {
        text: 'Tố Tố lấy từ trong tay áo ra một chiếc túi thơm nhỏ xíu —— dùng cùng loại vải với bộ y phục trên người bạn. Nàng dùng hai tay dâng tới trước mặt bạn, đầu cúi thấp đến mức sắp chạm vào ngực.'
      },
      {
        text: '"Ta là một người vụng về ăn nói, không biết nói những lời êm tai. Nhưng ta biết may y phục... mỗi một đường kim mũi chỉ, đều là những lời ta muốn gửi đến chàng." Rốt cuộc nàng cũng lấy hết dũng khí ngẩng đầu lên, vành mắt đỏ hoe, nhưng giọng điệu lại vô cùng kiên định, "Đời này, ta muốn được mãi mãi may y phục cho chàng. Mùa xuân may áo mỏng, mùa đông may áo bông, trời mưa may áo tơi... bốn mùa trong năm, từng đường kim mũi chỉ, đều không muốn dừng lại."'
      }
    ]
  },

  // ============================================================
  // 红豆 (hong_dou) —— 酒庄女，豪爽大方
  // ============================================================
  {
    id: 'hong_dou_heart_3',
    npcId: 'hong_dou',
    requiredFriendship: 800,
    title: 'Hữu Hương Tự Nhiên Thấu',
    scenes: [
      {
        text: 'Hồng Đậu chặn bạn lại, nhét vào tay bạn một bầu rượu: "Nếm thử xem! Đây là rượu hoa đào ta mới ủ đấy! Mẻ đầu tiên luôn! Chưa cho ai uống thử đâu!"'
      },
      {
        text: 'Bạn nhấp một ngụm —— vị ngọt thanh pha lẫn hương thơm của hoa đào, dư vị kéo dài. Hồng Đậu chống nạnh, đôi mắt sáng rực nhìn chằm chằm vào bạn: "Thế nào thế nào? Ngon chứ!"'
      },
      {
        text: '"Thật lòng mà nói, ủ mẻ rượu này ngốn mất của ta ba tháng tâm huyết lận đó. Chọn hoa đào phải hái lúc sương sớm còn đọng, nước thì phải dùng nước suối trên núi sau, nhiệt độ không được vượt quá..." Nàng thao thao bất tuyệt, trong ánh mắt tràn ngập sự nhiệt huyết và tự hào.',
        choices: [
          {
            text: '"Ngon quá! Có thể cho thêm một ly nữa không?"',
            friendshipChange: 120,
            response: 'Hồng Đậu vỗ đùi đánh đét: "Sảng khoái! Thích tính cách này của ngươi rồi đấy! Lại đây lại đây, ngồi xuống từ từ uống! Hôm nay không say không về!" Nàng rót cho bạn một bát đầy ắp, rồi cũng tự rót cho mình một bát, "Cạn!"'
          },
          {
            text: '"Mùi vị không tồi, nhưng hậu vị hơi chát một chút, có phải thời gian lên men nên dài thêm một chút nữa không?"',
            friendshipChange: 80,
            response:
              'Hồng Đậu sững người một lát, sau đó lộ ra vẻ mặt thán phục: "Yo, ngươi hiểu biết thật đấy chứ? Nói cũng có lý! Không ngờ ngươi chẳng những biết trồng trọt, mà còn biết cả cách ủ rượu!" Trong mắt nàng lóe lên tia sáng tán thưởng, "Sau này tới tửu trang của ta làm nếm rượu sư đi!"'
          }
        ]
      },
      {
        text: 'Uống cạn vài bát rượu, hai má Hồng Đậu đã ửng hồng. Nàng tựa lưng vào vại rượu, mỉm cười nói: "Lúc phụ thân ta qua đời có bảo, Hồng Đậu à tính tình của con hoang dã quá, không lấy chồng được đâu. Ta bảo không lấy chồng được thì thôi, ta có tửu trang của ta là được rồi!" Nàng liếc nhìn bạn một cái, "Tuy nhiên... nếu có một người am hiểu về rượu cùng uống rượu trò chuyện với ta, thì cũng không tồi."'
      }
    ]
  },
  {
    id: 'hong_dou_heart_5',
    npcId: 'hong_dou',
    requiredFriendship: 1600,
    title: 'Bí Mật Của Vò Rượu',
    scenes: [
      {
        text: 'Bạn phát hiện Hồng Đậu đang ngồi xổm trước một hàng vò rượu khổng lồ ở sân sau tửu trang, trái ngược với vẻ sảng khoái ngày thường, nàng đang ngồi thẫn thờ một mình. Trên mặt đất có một vò rượu bị đập vỡ, rượu chảy lênh láng khắp nơi.'
      },
      {
        text: '"Đừng nhìn nữa." Hồng Đậu không ngẩng đầu lên, "Đập vỡ một vò rượu ủ mười năm rồi. Đây là mẻ rượu cuối cùng do phụ thân ta ủ, khắp thiên hạ chỉ còn lại ba vò thôi. Bây giờ thì chỉ còn hai vò." Giọng nói của nàng khàn đặc, khác hẳn với ngày thường.'
      },
      {
        text: '"Phụ thân ta bị rượu hủy hoại." Hồng Đậu đột nhiên cất lời, "Ông ấy đã ủ ra những loại rượu ngon nhất cả đời, cũng đã uống rượu cả đời. Cuối cùng uống đến hỏng cả thân thể. Trước lúc đi còn nắm lấy tay ta dặn dò —— Hồng Đậu, rượu là thứ tốt, nhưng phải biết lúc nào nên đặt chén xuống." Nàng ngẩng đầu lên, vành mắt đỏ hoe, "Ta vẫn luôn chưa học được điều đó."',
        choices: [
          {
            text: 'Ngồi xuống cạnh nàng, giúp nàng nhặt từng mảnh vỡ lên.',
            friendshipChange: 120,
            response:
              'Hồng Đậu nhìn động tác của bạn, im lặng một lúc lâu, sau đó cũng ngồi xuống nhặt cùng. "... Cảm ơn." Nàng nói nhỏ, "Bình thường cứ cười đùa cợt nhả, lúc thực sự gặp chuyện, lại chẳng biết nên nói gì cho phải."'
          },
          {
            text: '"Những gì phụ thân nàng để lại không chỉ là rượu, mà còn có cả nàng nữa. Điều này trân quý hơn bất cứ loại rượu ủ mười năm nào."',
            friendshipChange: 160,
            response:
              'Hồng Đậu bỗng ngẩng đầu lên, những giọt nước mắt rốt cuộc cũng tuôn rơi. Nàng vội vàng ngoảnh mặt đi, lấy ống tay áo quệt qua: "Ngươi, ngươi nói linh tinh gì thế... một trang nam nhi mà lại đi nói mấy lời như vậy..." Giọng nàng nghẹn ngào, "... Nhưng mà cảm ơn ngươi nhé."'
          }
        ]
      },
      {
        text: 'Hồng Đậu đứng dậy, hít một hơi thật sâu, khôi phục lại vẻ dứt khoát thường ngày. Nàng phủi phủi bụi trên người: "Thôi bỏ đi! Không ủ rũ nữa! Nếu phụ thân ta mà thấy bộ dạng này của ta, chắc chắn sẽ mắng ta là đồ vô dụng." Nàng toe toét cười, tuy khóe mắt vẫn còn vương lệ, "Đi, ta mời ngươi uống rượu ở một vò khác. Nếu phụ thân ta biết ta đem rượu chia cho một người thật thà như ngươi uống, chắc chắn sẽ rất vui lòng."'
      }
    ]
  },
  {
    id: 'hong_dou_heart_8',
    npcId: 'hong_dou',
    requiredFriendship: 2400,
    title: 'Túy Hậu Chân Ngôn',
    scenes: [
      {
        text: 'Đêm Trung thu, Hồng Đậu kéo bạn lên ngọn đồi nhỏ phía sau làng. Nàng vác theo một vò rượu, mang theo hai chiếc bát. Vầng trăng vừa to vừa tròn treo trên bầu trời đêm đen kịt, bên dưới là ánh đèn nhà nhà của Đào Nguyên Hương.'
      },
      {
        text: '"Lại đây! Ngắm trăng thưởng rượu!" Hồng Đậu đập vỡ niêm phong vò rượu, rót đầy cho bạn một bát. Nàng cũng tự rót cho mình một bát, ngửa đầu uống một hơi cạn sạch. Dưới ánh trăng, sườn mặt của nàng bớt đi vài phần hào sảng ngày thường, thêm vào đó vài phần nhu hòa.'
      },
      {
        text: 'Uống cạn vài bát rượu, Hồng Đậu bắt đầu nói nhiều hơn. Nàng ngồi khoanh chân, ngước nhìn trăng sáng: "Ngươi nói xem... một nữ nhân như ta, liệu có ai thích không? Ăn to nói lớn, thích uống rượu, lại chẳng đủ dịu dàng..." Nàng hiếm khi để lộ ra vẻ mặt thiếu tự tin như vậy.',
        choices: [
          {
            text: '"Nàng là người chân thật nhất, cuốn hút nhất mà ta từng gặp."',
            friendshipChange: 120,
            response: 'Hồng Đậu ngây người một lát, sau đó "phụt" cười ra tiếng, đấm một cái vào vai bạn: "Cái tên này... uống có vài bát đã bắt đầu ăn nói hàm hồ rồi." Nhưng ánh mắt của nàng, lại còn sáng rực rỡ hơn cả ánh trăng.'
          },
          {
            text: 'Lặng lẽ đổ rượu của mình vào trong bát của nàng. "Đêm nay nàng muốn uống bao nhiêu, ta sẽ bồi nàng bấy nhiêu."',
            friendshipChange: 120,
            response: 'Hồng Đậu cúi đầu nhìn rượu trong bát, bỗng nhiên trở nên im lặng. "Cái tên này..." Giọng nói của nàng nhẹ đi rất nhiều, "Luôn luôn nói những lời đúng đắn nhất vào đúng lúc ta cần nhất."'
          }
        ]
      },
      {
        text: 'Đêm đã khuya, Hồng Đậu tựa đầu lên vai bạn, dáng vẻ nửa say nửa tỉnh. "Ta nói cho ngươi nghe một bí mật nhé." Giọng nàng mơ hồ nhưng vô cùng nghiêm túc, "Vò rượu này gọi là \'Tương Tư Nương\', là ta... đặc biệt ủ vì một người. Ủ ròng rã suốt nửa năm, dùng những đóa hoa đào tốt nhất, nguồn nước suối trong trẻo nhất."'
      },
      {
        text: 'Nàng ngoảnh đầu lại, ngắm nhìn bạn dưới ánh trăng, ánh mắt trong veo không giống như một người đã uống nhiều rượu đến vậy: "Người đó chính là ngươi. Từ lần đầu tiên uống rượu cùng ngươi ta đã biết —— người có thể khiến ta cam tâm tình nguyện chia sẻ một nửa thứ rượu tốt nhất của mình, đời này chỉ có mình ngươi thôi." Nàng đưa bát rượu tới trước mặt bạn, "Uống cạn bát này, coi như... là người của ta rồi. Đùa chút thôi." Nàng cười nói, nhưng đôi tay lại đang run lẩy bẩy.'
      }
    ]
  },

  // ============================================================
  // 丹青 (dan_qing) —— 书生，儒雅温文
  // ============================================================
  {
    id: 'dan_qing_heart_3',
    npcId: 'dan_qing',
    requiredFriendship: 800,
    title: 'Luận Đạo Rừng Trúc',
    scenes: [
      {
        text: 'Trong rừng trúc sau làng, bạn tình cờ gặp gỡ Đan Thanh. Chàng đang tựa vào một cây trúc xanh, trong tay cầm một cuốn sách, miệng khẽ nhẩm đọc thứ gì đó.'
      },
      {
        text: '"Ồ?" Chàng nhìn thấy bạn, nở nụ cười ôn hòa, "Khu rừng trúc này là nơi đọc sách yêu thích nhất của ta. Đốt trúc rỗng tuếch, lá trúc thanh liêm —— chính là phẩm cách mà những kẻ đọc sách nên noi theo."'
      },
      {
        text: 'Chàng gấp sách lại, mời bạn ngồi xuống. "Trước khi tới Đào Nguyên Hương, ngươi sống ở thành thị đúng không? Cớ sao lại chịu từ bỏ sự phồn hoa đô hội, đến chốn thôn quê hoang dã này để cày cấy?"',
        choices: [
          {
            text: '"Thay vì ở thành thị sống những ngày tháng vô vị, chi bằng về chốn làng quê làm những công việc thiết thực."',
            friendshipChange: 120,
            response:
              'Mắt Đan Thanh sáng lên: "Một câu \'thiết thực\' thật hay! \'Nhà mình không quét sao có thể quét thiên hạ\', tâm tính cước đạp thực địa này của ngươi, còn giỏi hơn rất nhiều kẻ tự xưng là người có ăn học." Chàng chắp tay hành lễ với bạn.'
          },
          {
            text: '"Cũng không nói rõ được vì sao, chỉ là cảm thấy nơi này rất tốt."',
            friendshipChange: 40,
            response: 'Đan Thanh mỉm cười: "Đôi khi, không cần lý do cũng có thể đưa ra được sự lựa chọn tuyệt vời nhất. Đúng như câu \'Đạo Pháp Tự Nhiên\'." Ánh mắt chàng dịu dàng nhìn bạn.'
          }
        ]
      },
      {
        text: 'Lúc xế chiều, Đan Thanh đứng dậy thu dọn sách vở. Chàng bỗng cất lời: "Tại hạ du học nhiều năm, đã đi qua rất nhiều nơi, gặp gỡ rất nhiều người. Nhưng nơi thực sự khiến ta muốn dừng chân... chỉ có Đào Nguyên Hương." Chàng khẽ mỉm cười, "Bởi vì ở nơi đây có người xứng đáng để ta dừng bước." Chàng không nói rõ người đó là ai, nhưng trong ánh mắt chàng nhìn bạn đã chứa đựng câu trả lời.'
      }
    ]
  },
  {
    id: 'dan_qing_heart_5',
    npcId: 'dan_qing',
    requiredFriendship: 1600,
    title: 'Chí Hướng Thư Sinh',
    scenes: [
      {
        text: 'Bạn đi ngang qua căn nhà nhỏ Đan Thanh đang mượn tạm, nghe thấy bên trong vọng ra tiếng xé giấy. Đẩy cửa bước vào, thấy trên mặt đất vương vãi những cục giấy bị vo viên. Đan Thanh đang ngồi trước án thư, tờ giấy trước mặt viết rồi lại gạch xóa, gạch xóa rồi lại viết.'
      },
      {
        text: '"Viết không ra." Chàng nhìn thấy bạn, lắc đầu cười khổ, "Ta vẫn luôn muốn viết một cuốn sách về lịch sử của Đào Nguyên Hương, muốn lưu truyền những câu chuyện nơi này cho thế hệ mai sau. Thế nhưng... đã viết suốt ba năm rồi, vẫn luôn cảm thấy thiếu vắng thứ gì đó."'
      },
      {
        text: 'Chàng cầm một xấp bản thảo lên cho bạn xem. Chữ viết ngay ngắn thanh tú, ghi chép lại địa lý, sản vật, nhân văn của Đào Nguyên Hương. Quả thực viết rất hay —— nhưng đúng như chàng nói, luôn cảm thấy thiếu đi một loại sức sống và hơi ấm.',
        choices: [
          {
            text: '"Có lẽ thứ chàng thiếu không phải là văn phong, mà là cuộc sống. Chàng nên đi dạo quanh ruộng đồng nhiều hơn, đi lắng nghe những câu chuyện của chính người dân nơi đây."',
            friendshipChange: 120,
            response:
              'Đan Thanh sửng sốt, sau đó vỗ bàn đánh đét: "Một lời đánh thức người trong mộng! Ta vẫn luôn giam mình trong phòng, làm sao có thể viết ra được những dòng chữ có sinh mệnh chứ!" Chàng vơ lấy giấy bút, nhiệt tình nhìn bạn, "Ngươi có bằng lòng dẫn ta đến điền trang của ngươi xem thử không? Bắt đầu từ ruộng đồng!"'
          },
          {
            text: '"Từ từ đã, bài viết hay không phải một sớm một chiều là xong."',
            friendshipChange: 80,
            response:
              'Đan Thanh thở dài một hơi, nhưng vẫn gật đầu: "Ngươi nói đúng. \'Văn chương thiên cổ sự, đắc thất thốn tâm tri.\' Có lẽ là do ta quá nôn nóng rồi." Chàng mỉm cười nhẹ, "Nói chuyện với ngươi xong, trong lòng đã an ổn hơn nhiều."'
          }
        ]
      },
      {
        text: 'Vài ngày sau, Đan Thanh hào hứng ôm theo chương sách mới viết tới tìm bạn. "Ngươi xem đoạn này —— viết về tiệm Vạn Vật của Bác Trần, đã mở từ đời ông nội của bác ấy rồi. Còn có xưởng đậu hũ của Thím Mập, dùng nước muối làm đậu cả trăm năm rồi." Câu chữ của chàng quả nhiên đã trở nên sống động, tràn ngập khói lửa nhân gian. Chàng nhìn bạn, ánh mắt dịu dàng và đầy biết ơn: "Cảm hứng của chương này, toàn bộ đều nhờ một câu nói của ngươi. Ta đã ghi lại trong lời tựa rồi."'
      }
    ]
  },
  {
    id: 'dan_qing_heart_8',
    npcId: 'dan_qing',
    requiredFriendship: 2400,
    title: 'Dĩ Bút Vi Thệ',
    scenes: [
      {
        text: 'Đan Thanh mời bạn đêm Trung Thu đến rừng trúc tụ họp. Dưới ánh trăng, bóng trúc lả lướt, chàng đã trải sẵn giấy Tuyên Thành trên bàn đá, mài sẵn mực.'
      },
      {
        text: '"Sách đã viết xong rồi." Chàng bình thản nói, đặt một tập bản thảo được đóng thành sách ngay ngắn trước mặt bạn. Trên trang bìa viết ba chữ 《Đào Nguyên Chí》, còn ở trang lót có ghi: 「Dành tặng cho người đã giúp ta tìm thấy cố hương」.'
      },
      {
        text: '"Du học mười năm, ta vẫn luôn tìm kiếm một vùng đất xứng đáng để ghi chép lại, cũng vẫn luôn tìm kiếm một người xứng đáng để vì người đó mà dừng chân." Chàng nhấc bút lên, hạ nét chữ dưới ánh trăng, ngòi bút trầm ổn đầy sức lực. Bạn ghé tới gần nhìn —— thứ chàng viết, chính là tên của bạn.',
        choices: [
          {
            text: '"Đan Thanh, sách của chàng nhất định sẽ được lưu truyền hậu thế."',
            friendshipChange: 80,
            response: 'Đan Thanh đặt bút xuống, lắc đầu nói: "Sách có truyền lại cho đời sau hay không, ta chẳng bận tâm. Thứ ta quan tâm là —— trong khoảng thời gian viết nên cuốn sách này, ngươi luôn ở bên cạnh ta."'
          },
          {
            text: 'Cầm lấy một cây bút khác, viết tên mình ngay cạnh tên chàng.',
            friendshipChange: 160,
            response:
              'Đan Thanh nhìn hai cái tên sóng vai nhau trên trang giấy, bờ môi khẽ run rẩy, vành mắt đỏ ửng. "Ngươi..." Giọng chàng nghẹn ngào, mãi một lúc sau mới tìm lại được, "Ngươi có biết hành động này vào thời cổ đại có ý nghĩa gì không?"'
          }
        ]
      },
      {
        text: 'Đan Thanh đứng dậy, ánh trăng chiếu lên khuôn mặt thanh tú của chàng. Chàng cúi gập người hành lễ với bạn —— đây không phải là lễ nghi thông thường, mà là tâm ý trịnh trọng nhất của người xưa.'
      },
      {
        text: '"Tại hạ là Đan Thanh, chỉ là một thư sinh nghèo kiết xác, không vàng không bạc. Chỉ có một bụng thi thư và một trái tim chân thành." Chàng thẳng người lên, ánh mắt trong veo như ánh trăng, giọng nói dịu dàng nhưng vô cùng kiên định, "Ta nguyện dùng ngòi bút lập lời thề, lấy mực thước làm minh ước —— từ nay về sau mỗi một áng văn, mỗi một bài thơ, mỗi một lần mặt trời mọc rồi lặn, đều muốn được trải qua cùng với ngươi."'
      }
    ]
  },

  // ============================================================
  // 阿铁 (a_tie) —— 铁匠学徒，憨厚老实
  // ============================================================
  {
    id: 'a_tie_heart_3',
    npcId: 'a_tie',
    requiredFriendship: 800,
    title: 'Hoa Sắt Nở Rộ',
    scenes: [
      {
        text: 'Khi bạn tới tiệm rèn, Thợ rèn Tôn không có ở đó, chỉ có một mình A Thiết đang đánh thép. Mồ hôi anh nhễ nhại, chiếc búa trên tay gõ đinh đang kêu vang, nhưng nhìn kỹ lại —— thanh sắt anh đang gõ đã bị lệch rồi.'
      },
      {
        text: '"Á! Không không không! Lại lệch nữa rồi!" A Thiết cuống cuồng vò đầu bứt tai, vứt lại thanh sắt vào lò lửa. Lúc này anh mới chú ý tới bạn, mặt đỏ bừng: "Cậu, cậu thấy hết rồi à... Tôi đang tập rèn cuốc, nhưng toàn đánh cong queo. Sư phụ bảo lực tay của tôi không đều..."'
      },
      {
        text: 'Anh có chút rầu rĩ ngồi bên cái đe, bàn tay thô to cứ vò vào nhau. "Tay nghề của sư phụ giỏi như vậy, tôi học ba năm rồi mà vẫn thế này. Đôi khi tôi cứ nghĩ... có phải mình quá ngốc rồi không."',
        choices: [
          {
            text: '"Lại đây, tôi giúp anh giữ chặt, anh làm lại lần nữa xem."',
            friendshipChange: 120,
            response:
              'Mắt A Thiết sáng rực: "Thật, thật sao?" Có bạn giúp cố định lại thanh sắt, cuối cùng anh cũng rèn ra được một cái cuốc ra hồn. Anh giơ cái cuốc lên nhìn ngắm không chán mắt, vui sướng hệt như một đứa trẻ: "Thẳng rồi! Thật sự thẳng rồi này! Tất cả đều là nhờ công lao của cậu cả đấy!"'
          },
          {
            text: '"Ngốc hay không không quan trọng, sự kiên trì mới là quan trọng. Anh đã giỏi hơn ba năm trước nhiều rồi."',
            friendshipChange: 80,
            response: 'A Thiết sững người, sau đó gãi gãi gáy, cười hềnh hệch: "Cậu, cậu thực sự thấy vậy sao? Hì hì... Sư phụ chưa bao giờ khen ngợi tôi, cậu là người đầu tiên nói như vậy đấy."'
          }
        ]
      },
      {
        text: 'Sau khi tan làm, A Thiết lén nhét vào tay bạn một chiếc nhẫn sắt nhỏ. Làm ra vô cùng thô ráp, nhưng có thể thấy được anh đã tốn rất nhiều tâm tư. "Đây, đây là đồ tôi làm lúc tập tành... không đáng tiền. Thế nhưng, thế nhưng... tặng cho cậu." Anh đỏ mặt chạy biến đi, suýt chút nữa thì đâm sầm vào khung cửa.'
      }
    ]
  },
  {
    id: 'a_tie_heart_5',
    npcId: 'a_tie',
    requiredFriendship: 1600,
    title: 'Trái Tim Lò Lửa',
    scenes: [
      {
        text: 'Đêm khuya, bạn bị đánh thức bởi một tiếng gõ đập. Lần theo âm thanh đi tới tiệm rèn, bạn phát hiện A Thiết đang ở một mình cạnh lò lửa, cả người đầy mồ hôi và muội than, không ngừng dùng búa gõ lên một miếng sắt.'
      },
      {
        text: 'Anh nhìn thấy bạn thì giật thót mình: "Cậu, sao cậu lại tới đây! Khuya thế này rồi!" Anh muốn giấu món đồ trong tay đi, nhưng không kịp nữa —— bạn nhìn thấy thứ anh đang rèn là một đóa hoa sắt được chế tác rất tinh xảo, cánh hoa xếp lớp lớp tầng tầng lên nhau, đã bắt đầu thành hình.'
      },
      {
        text: '"Sư phụ bảo tôi chỉ biết làm việc thô, không rèn được những vật nhỏ tinh tế." A Thiết cúi gầm mặt, "Nhưng tôi muốn chứng minh tôi có thể làm được. Tối nào tôi cũng đợi sư phụ về rồi lén lút luyện tập." Anh xòe bàn tay mình ra —— toàn là những vết bỏng và chai sần.',
        choices: [
          {
            text: 'Nắm lấy đôi tay đầy thương tích của anh. "Những vết sẹo này chính là minh chứng cho sự nỗ lực của anh."',
            friendshipChange: 160,
            response:
              'Toàn thân A Thiết cứng đờ, hồi lâu chẳng dám nhúc nhích. Lò lửa phản chiếu lên khuôn mặt đỏ bừng của anh —— không biết là do bị lửa hơ hay do xấu hổ nữa. "Tay, tay cậu... thật ấm." Anh nhỏ giọng lầm bầm, nhưng không hề rút tay về.'
          },
          {
            text: '"Cố lên nhé, A Thiết. Tôi tin anh chắc chắn sẽ làm ra những món đồ sắt tuyệt vời nhất."',
            friendshipChange: 80,
            response: 'A Thiết gật đầu thật mạnh, trong đôi mắt to tròn phản chiếu lò lửa đang nhảy múa và cả hình bóng của bạn. "Ừm! Tôi, tôi nhất định sẽ cố gắng! Có cậu tin tưởng, tôi chẳng sợ gì hết!"'
          }
        ]
      },
      {
        text: 'Một tháng sau, A Thiết rốt cuộc cũng hoàn thành đóa hoa sắt kia. Anh đặt nó dưới ánh mặt trời —— những cánh hoa mỏng như cánh ve, dưới ánh sáng khúc xạ ra màu sắc rực rỡ như cầu vồng. Ngay cả Thợ rèn Tôn nhìn thấy cũng kinh ngạc đến mức không thốt nên lời. "Cái này... là do con rèn sao A Thiết?" A Thiết đỏ bừng mặt gật đầu mạnh, sau đó vội vàng chạy tới tìm bạn, nhét đóa hoa sắt vào tay bạn: "Đóa, đóa hoa này... chỉ có cậu, cậu mới xứng đáng với nó thôi."'
      }
    ]
  },
  {
    id: 'a_tie_heart_8',
    npcId: 'a_tie',
    requiredFriendship: 2400,
    title: 'Bách Luyện Thành Cương',
    scenes: [
      {
        text: 'Thợ rèn Tôn tìm đến bạn, hiếm khi để lộ ra vẻ mặt nghiêm túc lại pha chút vui mừng. "Cái thằng nhóc A Thiết ấy... không biết đã uống lộn thuốc gì, dạo này tiến bộ thần tốc. Nó bảo muốn rèn một tác phẩm \'Xuất Sư Chi Tác\' (Tác phẩm học thành tài), tự nhốt mình trong tiệm ba ngày rồi, ai cũng không cho vào." Ông thở dài một hơi, "Tuy nhiên... nó bảo là sẽ cho cậu vào."'
      },
      {
        text: 'Bạn đi đến tiệm rèn. A Thiết đang đứng cạnh chiếc đe, cả người gầy sọp đi một vòng, nhưng ánh mắt lại sáng rực lạ thường. Trên giá gỗ phía sau anh được đặt một thanh kiếm —— không, không chỉ là một thanh kiếm, trên thân kiếm được điêu khắc những hoa văn cực kỳ tinh tế, ở phần chuôi kiếm lại được quấn quanh bằng những nhánh hoa đào bằng sắt. Đây là một thanh bội kiếm đạt đến trình độ của một tác phẩm nghệ thuật.'
      },
      {
        text: '"Tôi, tôi làm ra được rồi." Giọng A Thiết khàn đặc nhưng lại tràn đầy sự kiêu hãnh. Anh đưa thanh kiếm cho bạn, hai bàn tay hơi run rẩy. "Sư phụ bảo... đời người thợ rèn chỉ rèn ra một món \'Định Tâm Chi Tác\' duy nhất, dùng hết mọi sở học của bản thân, kính dâng cho người quan trọng nhất."',
        choices: [
          {
            text: 'Trịnh trọng đón lấy thanh kiếm, quan sát thật tỉ mỉ. "A Thiết, thanh kiếm này... thật sự quá lộng lẫy."',
            friendshipChange: 120,
            response:
              'A Thiết chà xát tay thật mạnh, toét miệng cười, nụ cười thật thà và vô cùng thuần khiết: "Cậu, cậu thực sự thích nó sao? Vậy thì tôi yên tâm rồi! Vì để rèn ra thanh kiếm này, mấy ngón tay tôi đều bị phỏng đến trọc lóc luôn, hì hì, nhưng mà xứng đáng!"'
          },
          {
            text: '"A Thiết, anh không còn là cái gã học trò rèn cuốc cũng không thẳng ngày trước nữa rồi."',
            friendshipChange: 120,
            response: 'Vành mắt A Thiết thoắt cái đã đỏ hoe. Anh cố sức dụi dụi mắt: "Tôi, tôi có khóc đâu! Là do khói hun vào mắt thôi!" Anh sụt sịt mũi thật mạnh, "Có thể trở nên như ngày hôm nay... tất cả đều là nhờ có cậu."'
          }
        ]
      },
      {
        text: 'A Thiết hít một hơi thật sâu, ưỡn thẳng lưng lên. Trước đây anh luôn khom lưng rụt cổ, dường như sợ mình chiếm quá nhiều diện tích. Nhưng ngay lúc này anh lại đứng thẳng tắp, ánh mắt vô cùng chân thành và cháy bỏng.'
      },
      {
        text: '"Tôi, tôi không biết nói mấy câu văn vẻ ướt át, cũng không biết làm thơ giống như Đan Thanh." Bàn tay to lớn của anh túm chặt lấy chiếc tạp dề, những đốt ngón tay trắng bệch, "Nhưng tôi có thể... tôi có thể dùng đôi tay này, rèn cho cậu những công cụ tốt nhất trên thế gian, sửa lại căn nhà kiên cố nhất, rèn ra những đóa hoa sắt đẹp mắt nhất. Đời này, đời sau, đời sau nữa đều rèn cho cậu!" Khuôn mặt anh đỏ đến mức có thể dùng để nung sắt, "Thế nên... cậu có bằng, bằng lòng... để tôi luôn luôn ở bên cạnh cậu không?"'
      }
    ]
  },

  // ============================================================
  // 云飞 (yun_fei) —— 猎人，桀骜不羁
  // ============================================================
  {
    id: 'yun_fei_heart_3',
    npcId: 'yun_fei',
    requiredFriendship: 800,
    title: 'Cuộc Gặp Gỡ Nơi Rừng Sâu',
    scenes: [
      {
        text: 'Khi bạn đang thu thập ở núi sau thì bị lạc đường, sắc trời dần tối lại, xung quanh chỉ toàn là những bóng cây dày đặc và thi thoảng lại truyền tới vài tiếng chim kêu. Ngay lúc bạn đang vô cùng sốt ruột, một bóng người từ trong bụi cây bước ra —— là Vân Phi.'
      },
      {
        text: '"Lại là ngươi." Vân Phi dựa vào một gốc cây thông, mặt không cảm xúc nhìn chằm chằm bạn, "Lạc đường rồi sao?" Hắn không đợi bạn trả lời, đã quay người bỏ đi, "Đi theo ta, đừng có tụt lại đấy."'
      },
      {
        text: 'Hắn dẫn bạn đi xuyên qua khu rừng rậm rạp, bước chân nhẹ nhàng mà vô cùng chuẩn xác, cứ như đã thông thuộc từng gốc cây ngọn cỏ, từng tảng đá nơi này. Đột nhiên hắn dừng lại, ra hiệu bảo bạn ngồi xổm xuống —— ở bãi đất trống phía trước, một con hươu mẹ đang dẫn hươu con đi uống nước, ánh trăng rải xuống người chúng, một bức tranh tĩnh lặng và thật đẹp.',
        choices: [
          {
            text: 'Nín thở, lặng lẽ chiêm ngưỡng khung cảnh này.',
            friendshipChange: 120,
            response:
              'Vân Phi nghiêng đầu nhìn bạn một cái, dường như có chút bất ngờ với sự tĩnh lặng của bạn. Chờ đàn hươu đi xa, hắn mới cất lời: "... Không tồi. Người bình thường mà thấy hươu thì kiểu gì cũng la hét ầm ĩ." Đây có lẽ là lời khen cao nhất mà hắn từng thốt ra rồi.'
          },
          {
            text: '"Chúng không sợ anh sao?"',
            friendshipChange: 40,
            response:
              'Vân Phi khẽ hừ một tiếng: "Ta có săn chúng đâu. Ta chỉ săn những con đáng để săn, không giết con non, không giết thú mang thai. Quy củ trong núi —— lấy phải có chừng có mực." Giọng nói của hắn tuy lạnh lùng, nhưng bạn cảm nhận được một sự kính úy với thiên nhiên.'
          }
        ]
      },
      {
        text: 'Lúc đi ra khỏi khu rừng, Vân Phi đột nhiên dừng bước, móc từ trong ba lô ra một nắm thảo dược rồi ném cho bạn. "Trong núi có rắn rết, vò nát cái này rồi xoa lên cổ chân đi." Nói xong hắn sải bước bỏ đi luôn, không hề ngoảnh đầu lại. Nhưng bạn tinh ý nhận ra, hắn đã đứng trên sườn núi phía xa, chờ đợi cho đến khi bạn tiến vào làng an toàn thì mới xoay người rời đi.'
      }
    ]
  },
  {
    id: 'yun_fei_heart_5',
    npcId: 'yun_fei',
    requiredFriendship: 1600,
    title: 'Thương Tích Của Sói Độc Hành',
    scenes: [
      {
        text: 'Bạn phát hiện Vân Phi đang tựa lưng vào một gốc cây ở ngọn núi phía sau, trên cánh tay trái quấn một dải ruy băng thô ráp, máu thấm ướt đẫm cả một mảng. Hắn nhắm nghiền mắt, sắc mặt tái nhợt.'
      },
      {
        text: 'Nghe thấy tiếng bước chân, hắn đột ngột mở bừng mắt, tay đã rút sẵn con dao săn giắt ở bên hông. Thấy là bạn, hắn mới từ từ nới lỏng tay. "... Không sao. Bị lợn rừng húc trúng thôi." Giọng hắn yếu ớt nhưng vẫn rất cứng cỏi, "Không cần bận tâm đến ta, lát nữa là khỏe lại thôi."'
      },
      {
        text: 'Bạn ngồi xổm xuống kiểm tra vết thương của hắn —— da thịt toác ra một mảng, chảy rất nhiều máu. Cái này căn bản không thể tự lành lại bằng "một lát" được.',
        choices: [
          {
            text: 'Mặc kệ sự phản đối của hắn, mạnh mẽ giúp hắn tháo ra băng bó lại vết thương.',
            friendshipChange: 160,
            response:
              'Vân Phi muốn đẩy tay bạn ra, nhưng không còn sức. Hắn ngoảnh mặt đi, nghiến chặt răng. Đợi bạn băng bó xong, hắn im lặng một hồi lâu, mới nặn ra được mấy chữ qua kẽ răng: "... Tay ngươi khá vững đấy."'
          },
          {
            text: '"Một mình anh ở trong núi quá nguy hiểm. Lần sau vào núi nhớ báo cho tôi một tiếng."',
            friendshipChange: 80,
            response: 'Vân Phi cười nhạt một tiếng: "Ta đã sống trong núi này được mười năm rồi, không cần ——" Lời nói mới ra đến nửa, cơn đau nhói từ vết thương truyền đến khiến hắn phải hừ nhẹ một tiếng. Cuối cùng hắn cũng hết cáu kỉnh, "... Tùy ngươi."'
          }
        ]
      },
      {
        text: 'Bạn dìu hắn xuống núi trở về nhà nhỏ của hắn. Căn phòng đơn sơ đến mức khiến người ta xót xa —— một chiếc giường phản gỗ, một cây cung săn, vài bộ quần áo cũ nát. Trên vách tường có treo một bức tranh đã phai màu, vẽ một người phụ nữ trẻ đang ôm một cậu bé con.'
      },
      {
        text: 'Vân Phi nhận ra ánh nhìn của bạn, giọng nói bỗng trầm xuống: "Đó là nương của ta. Khi sinh ra ta vì khó sinh nên đã qua đời. Cha ta đổ lỗi cho ta, năm lên sáu đã ném ta vào sâu trong núi." Sắc mặt hắn chẳng hề dao động, tựa như đang kể chuyện của một người khác vậy, "Từ lúc đó trở đi, rừng núi chính là nhà của ta, chim thú chính là bạn đồng hành của ta. Còn tốt hơn cả loài người —— chí ít thì chúng không bao giờ vứt bỏ ngươi." Hắn liếc nhìn bạn một cái, rồi rất nhanh rời mắt đi, "... Ngươi là một ngoại lệ."'
      }
    ]
  },
  {
    id: 'yun_fei_heart_8',
    npcId: 'yun_fei',
    requiredFriendship: 2400,
    title: 'Lời Hẹn Ước Nơi Đỉnh Núi',
    scenes: [
      {
        text: 'Một sớm nọ, Vân Phi xuất hiện trước cửa nhà bạn. Hắn tựa lưng vào khung cửa, ngượng nghịu không nhìn bạn. "... Đi với ta. Có một nơi, ta muốn dẫn ngươi đến." Hắn ngừng lại, "Chỉ một mình ngươi thôi."'
      },
      {
        text: 'Hắn dẫn bạn băng qua đỉnh núi cao nhất của ngọn núi phía sau —— nơi đó ngay cả những thợ săn trong làng cũng chẳng dám tùy tiện đặt chân tới. Hai người đi xuyên qua rừng rậm, trèo qua vách núi cheo leo, cuối cùng đứng trên đỉnh núi.'
      },
      {
        text: 'Cảnh tượng hiện ra trước mắt khiến bạn quên cả hít thở —— ngay dưới chân là một biển mây vô tận, mặt trời mọc nhô lên từ tầng mây, nhuộm đỏ rực cả một bầu trời. Khói bếp của Đào Nguyên Hương vương lên giữa biển mây, khiến nó trông giống như một ngôi làng lơ lửng chốn thần tiên.',
        choices: [
          {
            text: '"Vân Phi... chỗ này đẹp quá đi mất. Cảm ơn anh đã dẫn tôi tới đây."',
            friendshipChange: 120,
            response: 'Vân Phi đứng ngay bên cạnh, gió thổi tung mái tóc dài của hắn. Hắn dõi mắt nhìn về phía xa, giọng nói mềm mại hơn ngày thường rất nhiều: "Đây là bí mật của ta. Mười năm rồi, chưa từng dẫn bất kỳ ai tới đây."'
          },
          {
            text: 'Bình lặng đứng kề vai cùng hắn, cùng nhau ngắm bình minh.',
            friendshipChange: 120,
            response: 'Một khoảng thời gian rất lâu, cả hai người không ai nói một lời nào. Thế nhưng sự yên lặng này lại vô cùng thoải mái —— tựa như giữa hai người không cần ngôn từ cũng đã tỏ tường tâm ý của nhau.'
          }
        ]
      },
      {
        text: 'Mặt trời đã hoàn toàn mọc lên. Vân Phi bỗng lên tiếng, giọng rất thấp, giống như đang trò chuyện cùng ngọn gió: "Trước đây ta luôn cho rằng... con người đều không đáng tin cậy. Chẳng bằng một con chó săn, chẳng bằng một cây tùng." Hắn xoay người lại, cực kỳ nghiêm túc —— có lẽ đây là lần nghiêm túc nhất trong cuộc đời của hắn —— chăm chú nhìn vào bạn.'
      },
      {
        text: '"Nhưng ngươi đã thay đổi ta." Giọng hắn hơi khàn, giống như đây là lần đầu tiên nói những lời như vậy, mỗi một chữ đều như bị hắn lôi thẳng từ trong tim ra ngoài, "Ngươi... khiến ta muốn bước ra khỏi cánh rừng này, muốn lưu lại nơi có con người sinh sống. Và người đó chính là ngươi." Tay hắn hơi run rẩy cầm lấy tay bạn, nắm rất chặt, tựa hồ sợ vừa buông lỏng ra sẽ chẳng bao giờ bắt lại được nữa, "Ta không biết nói lời hay ý đẹp... nhưng ta có thể lấy cái mạng này ra để bảo vệ ngươi. Ngọn núi này chính là nhân chứng của ta."'
      }
    ]
  },

  // ============================================================
  // 大牛 (da_niu) —— 牧场小伙，憨直热情
  // ============================================================
  {
    id: 'da_niu_heart_3',
    npcId: 'da_niu',
    requiredFriendship: 800,
    title: 'Đỡ Đẻ Bê Con',
    scenes: [
      {
        text: 'Đại Ngưu cuống cuồng chạy tới tìm bạn, vẻ mặt đầy sốt ruột: "Nguy rồi nguy rồi! Bò mẹ nhà tôi sắp đẻ tới nơi rồi! Nhưng có mỗi một mình tôi không kịp xoay xở! Bạn qua phụ tôi một tay được không?"'
      },
      {
        text: 'Bạn chạy theo Đại Ngưu về mục trường. Một con bò vàng to lớn đang nằm bò trong lều cỏ, bồn chồn thở phì phò. Đại Ngưu ngồi thụp xuống bên cạnh, vừa dỗ dành nó vừa lo lắng chà xát tay vào nhau. "Ngoan ngoan ngoan, đừng sợ nhé, có anh Đại Ngưu ở đây rồi."'
      },
      {
        text: 'Dưới sự hướng dẫn của Đại Ngưu, bạn giúp bưng nước nóng, chuẩn bị rơm khô. Khoảng một canh giờ sau, một con bê nhỏ cả thân dính đầy nước ối cuối cùng cũng chào đời. Nó lảo đảo đứng lên, dùng chiếc mũi ẩm ướt cọ cọ vào lòng bàn tay bạn.',
        choices: [
          {
            text: 'Cẩn thận ôm lấy con bê nhỏ, lau khô nước trên người nó.',
            friendshipChange: 120,
            response:
              'Đại Ngưu nhìn động tác dịu dàng của bạn, vành mắt đỏ hoe: "Bạn xem nó thích bạn chưa kìa! Bê con biết nhận người đấy, cái nhìn đầu tiên nó thấy ai thì sẽ thân thiết với người đó." Cậu sụt sịt mũi, "Cảm ơn bạn đã tới giúp đỡ nhé!"'
          },
          {
            text: '"Đại Ngưu, cậu chăm sóc động vật giỏi thật đấy."',
            friendshipChange: 80,
            response: 'Đại Ngưu ngại ngùng gãi gãi đầu: "Hì hì, từ nhỏ tôi đã thích rồi mà! Tôi cảm thấy động vật là quan trọng hơn bất cứ thứ gì! Chúng đối tốt với bạn, thì bạn lại càng phải đối xử tốt với chúng hơn!" Cậu nở nụ cười rạng rỡ như một đứa trẻ.'
          }
        ]
      },
      {
        text: 'Đại Ngưu đặt tên cho con bê con là "Phúc Bảo". "Vì do tự tay cậu giúp đỡ đẻ, cho nên đây chính là phúc khí!" Cậu vỗ mạnh vào vai bạn, lực đạo lớn đến nỗi suýt chút nữa đập ngã bạn, "Sau này lúc nào rảnh cậu cứ đến thăm Phúc Bảo nhé! Nó cũng là nửa đứa con của cậu đấy!"'
      }
    ]
  },
  {
    id: 'da_niu_heart_5',
    npcId: 'da_niu',
    requiredFriendship: 1600,
    title: 'Mục Trường Đêm Bão',
    scenes: [
      {
        text: 'Một trận mưa bão ập tới. Bạn lo lắng cho mục trường của Đại Ngưu nên đội mưa chạy qua xem —— quả nhiên, hàng rào đã bị gió thổi sập mất mấy đoạn, vài con cừu đã xổng ra ngoài. Đại Ngưu chạy ngược chạy xuôi trong mưa, toàn thân ướt đẫm, khản cả giọng gào thét gọi bầy cừu.'
      },
      {
        text: '"Sao cậu lại ra đây! Về nhà mau!" Thấy bạn, Đại Ngưu vừa ngạc nhiên vừa lo lắng. Nhưng bước chân của cậu vẫn không hề dừng lại —— cậu đang mải đuổi theo một con cừu đang hoảng sợ.'
      },
      {
        text: 'Bạn giúp cậu lùa cừu, sửa chữa lại hàng rào. Giữa cơn bão giật đùng đùng, hai người hợp sức tìm về được con cừu cuối cùng đi lạc. Khi mọi thứ đã được sắp xếp ổn thỏa, hai người mệt lả ngồi bệt xuống lều cỏ, người ngợm ướt sũng như chuột lột.',
        choices: [
          {
            text: '"Đại Ngưu, một mình cậu gánh vác cả cái mục trường này, quả thực không dễ dàng gì."',
            friendshipChange: 120,
            response:
              'Đại Ngưu im lặng một lát, sau đó cười ngu ngơ, nhưng nụ cười lại mang theo vẻ đắng chát: "Không dễ dàng thì đúng là không dễ dàng... nhưng nhìn thấy bọn chúng được an toàn, thì cũng đáng mà." Cậu nhìn bạn, đôi mắt tràn ngập sự cảm động, "Hôm nay may mà có cậu. Thật lòng đó."'
          },
          {
            text: 'Chia cho cậu một nửa phần lương khô còn sót lại của mình.',
            friendshipChange: 120,
            response:
              'Đại Ngưu nhận lấy phần lương khô, mũi chua xót: "Cậu, cậu còn đang đói meo đấy thôi..." Cậu cắn một miếng thật to, nhai nhóp nhép, nước mắt và nước mưa hòa quyện vào nhau trôi tuột xuống gò má. "Tôi có khóc đâu! Là nước mưa đó!"'
          }
        ]
      },
      {
        text: 'Trời đã tạnh mưa, tia nắng tà dương le lói sau những đám mây đen kịt. Đại Ngưu đứng lên, ngắm nhìn mục trường của mình —— hàng rào tuy sửa lại cong cong vẹo vẹo, nhưng những con thú nuôi bên trong đều bình an vô sự. Cậu hít sâu một hơi, nói lớn: "Con người tôi chẳng có tài cán gì, chỉ được cái đối xử tốt với động vật. Trước đây luôn nghĩ rằng chỉ cần có chúng là đủ rồi..." Cậu ngoảnh đầu lại nhìn bạn, đôi mắt to tròn lấp lánh tia sáng rực rỡ, "Nhưng hôm nay tôi mới hiểu ra rằng, có một người nguyện cùng tôi dầm mưa, còn quan trọng hơn bất cứ thứ gì trên đời."'
      }
    ]
  },
  {
    id: 'da_niu_heart_8',
    npcId: 'da_niu',
    requiredFriendship: 2400,
    title: 'Khúc Nhạc Mục Đồng',
    scenes: [
      {
        text: 'Đại Ngưu mời bạn tới mục trường, bảo rằng có "chuyện vô cùng quan trọng". Lúc bạn đến nơi, phát hiện mục trường đã được thu dọn sạch sẽ —— Đại Ngưu bình thường lôi thôi lếch thếch, hôm nay thế mà lại diện một bộ quần áo mới tinh tươm, tóc tai cũng được chải chuốt gọn gàng đâu ra đấy (tuy vẫn còn một lọn cứ chỉa lên không sao vuốt xuống được).'
      },
      {
        text: '"Cậu tới rồi sao!" Cậu khẩn trương đến mức chân tay không biết vứt đi đâu cho phải, nụ cười cứng đờ như thể đã tập luyện cả trăm lần, "Ngồi, ngồi bên kia đi! Tôi cho cậu xem một thứ này!"'
      },
      {
        text: 'Cậu thổi vang một tiếng sáo trúc —— giai điệu có chút mộc mạc nhưng lại vô cùng vui tươi, thế mà lại là một khúc nhạc mục đồng. Theo tiếng sáo, bầy gia súc gia cầm trong mục trường lục tục bước ra, ngoan ngoãn xếp thành một hàng. Trên cổ mỗi con thú đều được buộc một đóa hoa nhỏ xíu. Bạn cẩn thận nhìn kỹ lại —— những bông hoa đó đã xếp lại tạo thành hai chữ.',
        choices: [
          {
            text: 'Đứng hình một lúc, sau đó không nhịn được phải bật cười. "Đại Ngưu, cậu đã tập tành trò này bao lâu rồi?"',
            friendshipChange: 120,
            response: 'Mặt Đại Ngưu đỏ gay: "Tập suốt nửa tháng lận đó! Con Phúc Bảo cứ không nghe lời chạy sai vị trí hoài à... Hì hì." Cậu chà xát tay, "Đẹp không?"'
          },
          {
            text: 'Cảm động đến mức không thốt nên lời, chỉ biết dùng sức gật đầu mạnh một cái.',
            friendshipChange: 120,
            response: 'Hai mắt Đại Ngưu thoắt cái đã sáng bừng lên: "Cậu, cậu thích sao?! Tốt quá rồi! Tôi còn sợ cậu sẽ chê cười tôi ngốc nghếch cơ..." Cậu vui mừng đến mức nhảy cẫng lên tại chỗ, dọa mấy con gà bên cạnh sợ quýnh quáng đập cánh loạn xạ.'
          }
        ]
      },
      {
        text: 'Những đóa hoa trên người bầy thú xếp lại thành hai chữ, là "Thích Ngươi".'
      },
      {
        text: 'Đại Ngưu ngượng ngùng đứng trước mặt bạn, đôi bàn tay to lớn cứ cọ sát vào nhau, mặt đỏ lựng như quả cà chua luộc. "Tôi, tôi không biết làm thơ, cũng chẳng biết nói những lời hay ý đẹp. Nhưng tôi hiểu rõ một chuyện ——" Cậu bỗng dưng ngẩng phắt đầu lên, gào lớn bằng tất cả sức lực, âm thanh đinh tai nhức óc làm bầy chim đậu trên cành sợ hãi bay tứ tán, "Tôi thích cậu!! Rất cực kỳ thích cậu!! Còn thích hơn cả bò nữa!!" Cậu gào xong thì tự mình ngớ người ra, rồi mặt đỏ thêm vài phần nữa, "... Tôi nói to quá rồi đúng không?" Con Phúc Bảo ở bên cạnh "Bòooo" một tiếng, giống như đang tiếp sức cho cậu vậy.'
      }
    ]
  },

  // ============================================================
  // 墨白 (mo_bai) —— 乐师，文静忧郁
  // ============================================================
  {
    id: 'mo_bai_heart_3',
    npcId: 'mo_bai',
    requiredFriendship: 800,
    title: 'Thanh Âm Của Sự Đứt Dây',
    scenes: [
      {
        text: 'Bạn bị thu hút bởi một khúc nhạc cầm, lần theo âm thanh đi đến đầu cây cầu nhỏ ở phía tây làng. Mặc Bạch đang ngồi nơi đầu cầu, ôm ấp một cây cổ cầm, đầu ngón tay lướt chậm rãi trên dây đàn. Dưới ánh trăng mờ ảo, tiếng đàn tựa như đang khóc lóc tỉ tê, giống như đang kể lể một câu chuyện bi ai mà không một ai thấu hiểu.'
      },
      {
        text: 'Đột nhiên, "Pằng" một tiếng —— dây đàn đã bị đứt. Mặc Bạch dừng động tác lại, đăm chiêu nhìn sợi dây đứt, chìm vào trầm mặc. Khi bạn tiến lại gần, chàng vẫn không hề ngẩng đầu lên: "... Nghe bao lâu rồi?"'
      },
      {
        text: '"Cây đàn này là do sư phụ truyền lại cho ta. Người từng nói, dây đàn bị đứt, chính là đàn đang muốn nói cho ngươi biết, có một vài chuyện đến lúc nên buông bỏ rồi." Giọng chàng rất nhẹ, tựa như đang lẩm bẩm với chính mình.',
        choices: [
          {
            text: '"Buông bỏ điều gì chứ?" Khẽ hỏi lại.',
            friendshipChange: 120,
            response:
              'Mặc Bạch lặng thinh rất lâu. Dưới ánh trăng, sườn mặt của chàng giống hệt một bức tranh thủy mặc. "Buông bỏ quá khứ đi." Rốt cuộc chàng cũng mở lời, "Ta rời khỏi nơi sống lúc trước, là bởi vì... không còn một ai muốn nghe ta gảy đàn nữa. Bọn họ chê những bản nhạc của ta quá đỗi bi thương."'
          },
          {
            text: 'Yên lặng ngồi xuống cạnh chàng, không lên tiếng khuyên nhủ lấy một lời.',
            friendshipChange: 80,
            response:
              'Mặc Bạch ngước lên nhìn bạn một cái, dường như có chút bất ngờ trước sự tĩnh lặng của bạn. "... Ngươi là người đầu tiên không cất miệng hỏi tại sao." Qua một lúc sau, chàng lại mở lời, "Trước đây ta vẫn luôn cho rằng việc không được thấu hiểu là chuyện đương nhiên thôi. Nhưng khi ngươi ngồi cạnh ta... ta cảm giác như mình không còn thấy đơn độc nữa."'
          }
        ]
      },
      {
        text: 'Chàng lấy từ trong vạt áo ra một sợi dây đàn mới, cẩn thận thay vào. Sau khi chỉnh lại cao độ, chàng lại gảy một khúc —— hoàn toàn khác biệt so với lúc trước, bản nhạc này tuy vẫn mang một nỗi bi thương nhè nhẹ, nhưng phần kết âm lại vương vấn thêm một tia hơi ấm. "Khúc nhạc này tên là 《Hội Ngộ》." Chàng nói, "Vừa mới sáng tác hôm nay." Chàng không giải thích gì thêm, nhưng bạn biết rõ ý nghĩa của nó.'
      }
    ]
  },
  {
    id: 'mo_bai_heart_5',
    npcId: 'mo_bai',
    requiredFriendship: 1600,
    title: 'Tiếng Đàn Trong Mưa',
    scenes: [
      {
        text: 'Mưa rả rích kéo dài mấy ngày liền khiến ngôi làng chìm trong một mảng màu xám xịt ảm đạm. Bạn đi ngang qua căn nhà nhỏ của Mặc Bạch, nghe thấy tiếng đàn vẳng ra —— khác hẳn với bình thường, tiếng đàn lần này ngập tràn sự nóng nảy bồn chồn và bất an, tựa như một chú chim đang tuyệt vọng giãy giụa trong giông bão.'
      },
      {
        text: 'Bạn đẩy cửa tiến vào. Mặc Bạch đang cuộn mình trong góc nhà ôm chặt lấy cây đàn, sắc mặt tái nhợt đến đáng sợ, mấy ngón tay cứ gảy lộn xộn lên dây đàn. Thấy bạn, ánh mắt của chàng chợt hoảng hốt trong nháy mắt. "... Ngươi không nên tới đây." Giọng nói của chàng nghẹn đắng, "Trạng thái hôm nay của ta không tốt chút nào. Tệ lắm."'
      },
      {
        text: '"Con người ta... có nhiều lúc sẽ tự mình đắm chìm vào trong đó, rồi không thoát ra được." Chàng vùi gục mặt vào cánh tay, "Những lúc không sao soạn được khúc nhạc mới, những lúc trời mưa rả rích, những lúc cảm thấy thế gian này không một ai đoái hoài đến mình... trong đầu ta toàn là tạp âm rác rưởi."',
        choices: [
          {
            text: 'Bạn đi về phía chàng, nhẹ nhàng đặt tay lên vai chàng. "Đã có ta ở đây rồi."',
            friendshipChange: 160,
            response:
              'Cơ thể của Mặc Bạch khẽ run lên. Trôi qua rất lâu sau, chàng mới chầm chậm ngẩng đầu lên. Vành mắt của chàng đỏ ửng, giọng nói tựa như vọng về từ một nơi rất xa xôi: "Ngươi có biết không... khi có ai đó ở đây cùng ta, quả thực rất khác biệt." Chàng gắng gượng mỉm cười, dẫu cho nụ cười vô cùng nhạt nhòa, nhưng lại vô cùng chân thật.'
          },
          {
            text: '"Vậy thì đừng sáng tác nữa. Hôm nay không cần làm gì hết, cứ ngồi yên ở đây thôi."',
            friendshipChange: 120,
            response:
              'Mặc Bạch ngẩn người. "Không làm gì hết?" Chàng dường như chưa từng xem xét đến lựa chọn này. Chàng từ từ đặt cây đàn xuống, tựa người vào vách tường, nhắm nghiền hai mắt. "... Cũng tốt. Không cần làm gì hết." Nhịp thở của chàng dần dần ổn định lại.'
          }
        ]
      },
      {
        text: 'Bạn nán lại bầu bạn cùng chàng suốt cả một buổi chiều. Tiếng mưa rơi rả rích đã dần trở nên dịu êm hơn. Chập tối, Mặc Bạch lại ôm đàn lên gảy một khúc nhạc ngắn —— đơn điệu, thanh bình, giống như một con suối trong vắt sau cơn mưa.'
      },
      {
        text: '"Trước kia những lúc tâm trạng tồi tệ, ta chỉ có cây đàn bầu bạn." Mặc Bạch khẽ nói, ngón tay vẫn nhẹ lướt trên dây, "Nhưng cây đàn không biết đáp lại lời ta. Hôm nay... ngươi đã tới." Chàng ngẩng đầu, trong ánh mắt mang theo một sự ấm áp mà trước đây chưa từng có, "Cảm ơn ngươi đã không rời bỏ ta."'
      }
    ]
  },
  {
    id: 'mo_bai_heart_8',
    npcId: 'mo_bai',
    requiredFriendship: 2400,
    title: 'Tri Âm',
    scenes: [
      {
        text: 'Buổi chập tối nào đó khi trời đã sang thu, Mặc Bạch tìm gặp bạn, đưa cho bạn một tờ giấy nhỏ mộc mạc. Bên trên chỉ viết duy nhất một dòng: "Giờ Tý đêm nay, đầu cầu. Xin hãy mang theo trái tim của ngươi." Nét chữ thanh tú nhưng rất mạnh mẽ.'
      },
      {
        text: 'Giờ Tý, bạn bước tới cây cầu nhỏ phía tây làng. Hai bên cầu thắp vài ngọn đèn thanh đạm, ánh sáng êm dịu y hệt ánh trăng. Mặc Bạch ngồi trên cầu, cổ cầm để vắt ngang đùi, áo trắng khẽ phấp phới trong làn gió đêm. Thấy bạn đến, ánh mắt của chàng dường như đã đợi được điều gì đó từ lâu lắm rồi.'
      },
      {
        text: '"Ta đã viết một bản nhạc dành cho ngươi." Giọng chàng tĩnh lặng nhưng lại mang theo một chút run rẩy, "Viết rất lâu. Sửa đi sửa lại rất nhiều lần. Bởi vì... trong bản nhạc này ta đã đưa vào một vài thứ mà ta chưa từng đặt vào bất kỳ âm thanh nào trước đây." Chàng hít một hơi sâu, đầu ngón tay hạ xuống dây đàn.',
        choices: [
          {
            text: 'Nhẹ nhàng nhắm mắt lại, dốc lòng lắng nghe.',
            friendshipChange: 120,
            response:
              'Bạn khép mắt lại, để tiếng đàn lấp đầy từng giác quan. Bản nhạc bắt đầu từ sự cô đơn —— lạnh lẽo, trống vắng, tựa như một người độc hành trên một vùng hoang dã bao la. Rồi dần dần, một giai điệu ấm áp khác xen vào, quyện chặt cùng âm điệu hiu quạnh ban đầu, cuối cùng hòa hợp làm một. Khi khúc nhạc dứt, bạn chợt nhận ra khóe mắt mình đã ươn ướt từ bao giờ.'
          },
          {
            text: 'Nghiêm túc chăm chú nhìn dáng vẻ lúc chàng gảy đàn.',
            friendshipChange: 120,
            response:
              'Bạn nhìn những ngón tay của Mặc Bạch liên tục nâng lên hạ xuống trên dây đàn. Chàng gảy đàn vô cùng say sưa, đôi mắt hơi nhắm lại, đôi môi mấp máy không phát ra tiếng, giống như đang kể lể một điều gì đó. Lần đầu tiên bạn nhận ra —— những lúc chàng gảy đàn, sự phiền muộn u uất đã hoàn toàn biến mất, thay vào đó là một vẻ đẹp thuần túy, tỏa sáng rực rỡ.'
          }
        ]
      },
      {
        text: 'Nốt nhạc cuối cùng tan biến vào trong gió đêm. Mặc Bạch từ từ mở mắt, ánh mắt trong veo như một mặt hồ. Chàng khẽ đặt cây cổ cầm sang một bên, đứng người dậy.'
      },
      {
        text: '"Khúc nhạc này có tên là 《Tri Âm》." Giọng chàng vô cùng trầm thấp, tựa hồ sợ sẽ làm kinh động đến ánh trăng. "Cao sơn lưu thủy mịch tri âm —— ta đã đánh đàn suốt mười năm nay, đi qua rất nhiều vùng đất, gặp gỡ rất nhiều con người. Thế nhưng người thực sự mang đến cho ta cảm giác \'được lắng nghe\'... chỉ có mỗi ngươi." Chàng giơ tay ra, đầu ngón tay khẽ run rẩy, dừng lại ở khoảng cách rất gần với bạn. "Con người ta tính khí thất thường, lầm lì ít nói, có đôi khi còn tự khép mình lại. Một người như ta... ngươi có bằng lòng trở thành thính giả của ta cả đời này không?" Dưới ánh trăng tỏ, vành mắt chàng đã hơi phiếm hồng, nhưng trên khóe môi lại hiện lên một nụ cười thật nông, thật đỗi chân thành.'
      }
    ]
  },

  // ============================================================
  // 知己心事件 — 每NPC 2个 (zhiji_7 + zhiji_9)
  // ============================================================

  // --- 柳娘 知己 ---
  {
    id: 'liu_niang_zhiji_7',
    npcId: 'liu_niang',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Hội Thơ Dưới Trăng',
    scenes: [
      { text: 'Liễu Nương mời bạn đến một đình nghỉ mát ở sân sau. Ánh trăng chiếu xuống tựa như nước, nàng trải giấy Tuyên ra, mài mực sẵn sàng. "Ánh trăng đêm nay đẹp quá, chúng ta hãy tổ chức một hội làm thơ đi."' },
      { text: 'Nàng viết một câu trước: "Đào hoa ổ lý đào hoa am, đào hoa am hạ đào hoa tiên." Rồi đưa bút cho bạn. "Giữa những người tri kỷ, mượn thơ kết bạn, chính là chuyện tao nhã nhất trên đời."' },
      {
        text: 'Hai người kẻ xướng người họa, viết kín cả một mặt giấy. Liễu Nương nhìn lại thành quả đạt được, khẽ cười. "Những câu thơ này, sau này chỉ có hai chúng ta mới hiểu được thôi."',
        choices: [
          { text: '"Tài hoa của Liễu Nương quả thực khiến người ta bái phục."', friendshipChange: 120, response: 'Liễu Nương cúi đầu cười trừ. "Có được tri kỷ như {player}, tài hoa mới mang ý nghĩa."' },
          {
            text: '"Sau này đêm trăng tròn nào chúng ta cũng đến ngâm thơ nhé."',
            friendshipChange: 80,
            response: '"Một lời đã định." Liễu Nương cẩn thận thu dọn lại tờ giấy Tuyên viết kín chữ. "Đây chính là trang thứ nhất của chúng ta."'
          }
        ]
      }
    ]
  },
  {
    id: 'liu_niang_zhiji_9',
    npcId: 'liu_niang',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Đào Hoa Tiễn',
    scenes: [
      { text: 'Liễu Nương lấy ra một chiếc hộp gấm tinh xảo. "Đây là hoa tiễn do chính tay ta dùng cánh hoa đào làm ra, có cả thảy hai cuốn. Ngươi một cuốn, ta một cuốn."' },
      {
        text: '"Sau này những lời muốn nói, những bài thơ muốn viết, đều ghi chép hết lên đây." Nàng nghiêm túc nhìn bạn, "Ngay cả khi không ở bên cạnh nhau, chỉ cần lật mở hoa tiễn, sẽ giống như tri kỷ vẫn còn ở ngay cạnh bên vậy."',
        choices: [
          {
            text: 'Bạn trịnh trọng đón lấy hoa tiễn. "Đào hoa tiễn khắc cốt tri kỷ tâm, đời này nguyện trân giữ."',
            friendshipChange: 160,
            response: 'Khóe mắt Liễu Nương hơi ửng đỏ. "{player}... có được ngươi làm tri kỷ, chính là sự may mắn lớn nhất của ta đời này."'
          },
          {
            text: '"Liễu Nương, ta nhất định sẽ cẩn thận viết kín nó."',
            friendshipChange: 120,
            response: '"Ừm." Liễu Nương khẽ lật mở trang đầu tiên, bên trên đã viết sẵn một dòng chữ nhỏ: "Tri kỷ như lan, bất dĩ vô nhân nhi bất phương."'
          }
        ]
      }
    ]
  },

  // --- 阿石 知己 ---
  {
    id: 'a_shi_zhiji_7',
    npcId: 'a_shi',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Hẹn Ước Nơi Sâu Thẳm Hang Mỏ',
    scenes: [
      { text: 'A Thạch hiếm khi chủ động đến tìm bạn, trong tay xách theo hai chiếc đèn mỏ. "... Theo tôi. Có thứ này muốn cho cậu xem. Chỉ có tri kỷ mới được xem thôi."' },
      { text: 'Anh đưa bạn đi đến một góc khuất nơi sâu nhất trong hang mỏ. Trên vách đá tự nhiên hình thành hai mạch khoáng song song, một vàng một bạc, uốn lượn đan xen nhưng trước sau vẫn không hề tách rời.' },
      {
        text: '"Hai mạch, không phải một mạch... nhưng luôn luôn kề vai nhau. Giống như chúng ta vậy."',
        choices: [
          {
            text: '"A Thạch... thứ này còn trân quý hơn bất kỳ viên đá quý nào khác."',
            friendshipChange: 120,
            response: 'A Thạch hiếm hoi bật cười. "Ừ. Cho nên tôi đã không đụng tới nó. Cứ lưu nó lại ở chỗ này là tốt nhất."'
          },
          { text: '"Anh quả là một người coi trọng tình nghĩa."', friendshipChange: 80, response: 'A Thạch ngoảnh mặt đi, đỏ cả gốc tai. "... Giữa những người tri kỷ nên có một nơi thuộc về riêng hai người chứ."' }
        ]
      },
      { text: 'Trước lúc rời đi, A Thạch khắc lên vách đá hai ký hiệu nhỏ bé. "Làm vậy sau này mới có thể dễ dàng tìm ra chỗ này." Anh nói, "Chỉ có hai chúng ta biết thôi đấy."' }
    ]
  },
  {
    id: 'a_shi_zhiji_9',
    npcId: 'a_shi',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Minh Ước Bàn Thạch',
    scenes: [
      { text: 'A Thạch tìm đến bạn, trong tay cầm một cái túi vải. Biểu cảm của anh nghiêm túc hơn lúc bình thường.' },
      { text: 'Anh đưa cái túi vải cho bạn —— bên trong là hai mặt dây chuyền ngọc thạch giống hệt nhau, xanh mướt trong vắt, được xỏ lại bằng chỉ đỏ. "Đây là hai hòn đá duy nhất bị lỏng ra trên mạch khoáng kia. Mỗi người một khối."' },
      {
        text: '"Những hòn đá sinh ra từ cùng một mạch khoáng, bất kể cách xa bao nhiêu đi chăng nữa, thì vẫn là một thể thống nhất. Tri kỷ... cũng vậy."',
        choices: [
          {
            text: 'Trịnh trọng đeo mặt dây chuyền lên cổ. "Minh ước bàn thạch, đời này không đổi thay."',
            friendshipChange: 160,
            response: 'A Thạch cũng đeo khối ngọc còn lại trước ngực. Anh ngẩng lên nhìn bạn, ánh mắt tựa như những viên pha lê nơi đáy mỏ —— yên tĩnh, nhưng lại rực cháy. "Ừ. Không đổi thay."'
          },
          { text: '"A Thạch, có được người tri kỷ như anh, tôi thật sự rất may mắn."', friendshipChange: 120, response: 'A Thạch chìm trong tĩnh lặng hồi lâu, rồi khẽ gật đầu. "... Tôi cũng vậy."' }
        ]
      }
    ]
  },

  // --- 秋月 知己 ---
  {
    id: 'qiu_yue_zhiji_7',
    npcId: 'qiu_yue',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Điểm Câu Bí Mật',
    scenes: [
      { text: 'Thu Nguyệt kéo bạn chạy tới một nơi mà bạn chưa từng đặt chân đến —— bên dưới một thác nước nhỏ ven vách đá, có ẩn giấu một đầm nước. "Đây là điểm câu cá bí mật của mình đó! Trước nay chưa từng dắt ai đến đây đâu!"' },
      { text: 'Hai người vai kề vai ngồi trên mỏm đá, mỗi người cầm một chiếc cần. Thu Nguyệt hiếm hoi mới yên tĩnh được một lúc, sau đó nói: "Tri kỷ ấy mà, chính là kiểu người có thể cùng nhau ngồi phát ngốc mà không thấy gượng gạo."' },
      {
        text: 'Bỗng nhiên, cả hai chiếc cần câu cùng lúc có động tĩnh! Hai bạn nhìn nhau, đồng thời bật cười ha hả.',
        choices: [
          {
            text: '"Thu Nguyệt, ở bên cạnh bạn vĩnh viễn sẽ không bao giờ cảm thấy nhàm chán."',
            friendshipChange: 120,
            response: '"Chuyện đó là đương nhiên rồi!" Thu Nguyệt kiêu ngạo hếch cằm lên, "Sau này chỗ này chính là căn cứ bí mật của hai đứa mình nhé! Móc ngoéo nào!"'
          },
          { text: '"Điểm câu cá này quả thực quá tuyệt vời!"', friendshipChange: 80, response: '"Phải không phải không!" Thu Nguyệt sung sướng vỗ tay, "Chỉ có tri kỷ mới có tư cách tới nơi này thôi!"' }
        ]
      }
    ]
  },
  {
    id: 'qiu_yue_zhiji_9',
    npcId: 'qiu_yue',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Song Ngư Kết',
    scenes: [
      { text: 'Thu Nguyệt đưa cho bạn một sợi dây đeo tay bện bằng dây câu, bên trên thắt hình hai chú cá nhỏ. "Đây là Song Ngư Kết của dân chài lưới đó! Nghe bảo hai người cùng đeo cái này, cả đời sẽ là bạn đồng hành tốt của nhau!"' },
      {
        text: '"Mình đã tiêu tốn mấy ngày mới tết xong đó..." Thu Nguyệt gãi gãi đầu, hiếm hoi mới có chút ngại ngùng, "Đã là tri kỷ mà, phải có tín vật mới ra dáng chứ!"',
        choices: [
          {
            text: 'Ngay lập tức đeo lên cổ tay. "Song Ngư Kết, mãi mãi không chia lìa!"',
            friendshipChange: 160,
            response: 'Thu Nguyệt cũng lắc lắc cổ tay có đeo sợi dây y hệt. "Hê hê! Bây giờ tụi mình đã chính thức trở thành tri kỷ rồi nhé! Bất kỳ ai cũng không thể chia rẽ được đâu!"'
          },
          {
            text: '"Thu Nguyệt, tay nghề thủ công của bạn còn lợi hại hơn cả câu cá nữa."',
            friendshipChange: 120,
            response: '"Ha ha ha! Cái này thì mình sẽ không khách khí đâu nhé!" Thu Nguyệt vỗ vỗ lên vai bạn, cười rạng rỡ như ánh dương. "Sau này có chuyện gì, tri kỷ này sẽ bảo kê cho bạn!"'
          }
        ]
      }
    ]
  },

  // --- 春兰 知己 ---
  {
    id: 'chun_lan_zhiji_7',
    npcId: 'chun_lan',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Dạ Thoại Vườn Trà',
    scenes: [
      { text: 'Xuân Lan mời bạn thưởng trà nơi sâu thẳm trong vườn trà. Dưới ánh trăng, lá trà tỏa ra thứ ánh bạc lấp lánh. Nàng pha một ấm trà chưa từng đãi khách bao giờ. "Trà này có tên là \'Tri Kỷ Túy\', là công thức do chính ta tự sáng tạo ra."' },
      {
        text: '"Trước đây chỉ có mình ta uống, cảm thấy danh không xứng với thực." Xuân Lan khẽ cúi đầu, "Bây giờ có {player} rồi... cái tên này rốt cuộc cũng xứng đáng."',
        choices: [
          {
            text: '"Xuân Lan, đây là loại trà ngon nhất mà ta từng uống."',
            friendshipChange: 120,
            response: 'Xuân Lan mỉm cười, khóe mắt cong cong như hình trăng khuyết. "Vậy sau này mỗi năm có trà mới, chén trà đầu tiên sẽ luôn phần lại cho chàng."'
          },
          {
            text: '"Tri Kỷ Túy... một cái tên rất hay."',
            friendshipChange: 80,
            response: '"Bởi vì trà ngon phải để tri kỷ tới thưởng thức." Xuân Lan lại rót thêm cho bạn một chén, "Cứ từ từ mà uống, đêm nay chúng ta có rất nhiều thời gian."'
          }
        ]
      }
    ]
  },
  {
    id: 'chun_lan_zhiji_9',
    npcId: 'chun_lan',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Ấm Tử Sa Một Cặp',
    scenes: [
      { text: 'Xuân Lan bưng ra một chiếc hộp gỗ, bên trong là một cặp ấm tử sa —— hình dáng giống nhau, nhưng kích cỡ lại khác, trên thân ấm có khắc một đóa hoa lan. "Đây là chiếc ấm tri kỷ do đời trước truyền lại, một to một nhỏ, một âm một dương."' },
      {
        text: '"Nghe nói nếu tách cặp ấm này ra thì hương vị trà sẽ rất bình thường, nhưng nếu để cùng nhau để pha trà thì sẽ cực kỳ ngọt ngào thanh tao." Nàng đưa chiếc ấm nhỏ cho bạn, "Ấm to giữ lại trà trang, ấm nhỏ chàng cứ mang theo bên người."',
        choices: [
          {
            text: 'Dùng hai tay đón lấy chiếc ấm tử sa. "Xuân Lan, chiếc ấm này ở trong tay, giống hệt như tri kỷ đang ở bên cạnh."',
            friendshipChange: 160,
            response: 'Xuân Lan nhẹ nhàng đặt chiếc ấm to ở vị trí nổi bật nhất trên bàn trà. "Sau này có người hỏi tới, ta sẽ nói rằng —— một nửa của chiếc ấm này, đang nằm trong tay vị tri kỷ tuyệt vời nhất của ta."'
          },
          {
            text: '"Ta sẽ trân quý nó thật cẩn thận."',
            friendshipChange: 120,
            response: '"Trà phải thường xuyên uống mới tốt." Xuân Lan mỉm cười, "Ấm cũng phải hay dùng thì mới có linh khí. Giống như tri kỷ... phải năng lui tới với nhau thì mới lâu dài được."'
          }
        ]
      }
    ]
  },

  // --- 雪芹 知己 ---
  {
    id: 'xue_qin_zhiji_7',
    npcId: 'xue_qin',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Bức Họa Vô Danh',
    scenes: [
      { text: 'Trong phòng tranh của Tuyết Cần chất đầy những bức họa. Nàng chỉ vào một bức tranh bị mảnh vải che lấp trong góc rồi nói: "Bức tranh đó, ta đã vẽ ròng rã suốt ba năm, nhưng vẫn chưa từng hài lòng. Ngươi ra xem thử đi."' },
      { text: 'Lật mảnh vải ra, trên tranh là một vùng sơn thủy mờ ảo, nhưng ở vị trí trung tâm lại để trống, không có thứ gì. "Luôn cảm thấy thiếu đi thứ gì đó, không thể nào vẽ tiếp được."' },
      {
        text: 'Tuyết Cần cầm cọ vẽ lên, im lặng một hồi, sau đó vẽ hai cái bóng người đang ngồi cạnh nhau ở khoảng trống đó. "... Thì ra thứ còn thiếu chính là cái này."',
        choices: [
          {
            text: '"Tuyết Cần, bức tranh này... là bức tranh cảm động nhất mà ta từng được chiêm ngưỡng."',
            friendshipChange: 120,
            response: 'Tuyết Cần hiếm hoi mới đỏ mặt. "... Đừng khen nữa. Bức tranh này sau này sẽ có tên là 《Tri Kỷ Đồ》. Sẽ không bán đâu."'
          },
          {
            text: '"Hóa ra trong thâm tâm nàng vẫn luôn tìm kiếm một người tri kỷ."',
            friendshipChange: 80,
            response: '"... Câm miệng." Tuyết Cần quay mặt đi, nhưng khóe miệng lại hơi cong lên. "Tuy nhiên... ngươi nói rất đúng."'
          }
        ]
      }
    ]
  },
  {
    id: 'xue_qin_zhiji_9',
    npcId: 'xue_qin',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Người Trong Tranh',
    scenes: [
      { text: 'Tuyết Cần đưa cho bạn một cuộn tranh. "Mở ra xem thử đi." Giọng điệu của nàng hiếm khi lộ ra vẻ căng thẳng.' },
      { text: 'Trải cuộn tranh ra, là một bức tranh công bút (vẽ chi tiết) —— y phục, thần thái của người trong tranh giống y hệt như đúc với bạn, bối cảnh là bốn mùa của Đào Nguyên Hương. Từng nét bút tỉ mỉ đến mức có thể nhìn thấy rõ ràng từng cánh hoa đào.' },
      {
        text: '"Đã vẽ rất lâu rồi." Tuyết Cần khẽ nói, "Một bức tranh đẹp cần một người mẫu giỏi. Mà một người mẫu giỏi... lại cần một người đáng để vẽ. Ngươi là người duy nhất mà ta cam tâm tình nguyện bỏ ra nhiều thời gian đến thế để khắc họa."',
        choices: [
          {
            text: '"Tuyết Cần, bức họa này ta sẽ treo ở nơi nổi bật nhất trong nhà."',
            friendshipChange: 160,
            response: 'Khóe miệng của Tuyết Cần cuối cùng cũng nở một nụ cười rạng rỡ. "... Vậy sau này nếu có cảm hứng, ta sẽ chạy tới nhà ngươi vẽ. Đã là tri kỷ mà, không cần phải khách sáo."'
          },
          {
            text: '"Đây là món quà trân quý nhất mà ta từng được nhận."',
            friendshipChange: 120,
            response: '"Hừ." Tuyết Cần ngượng ngùng quay đầu đi, nhưng giọng nói lại vô cùng dịu dàng. "Sau này sẽ còn có nhiều hơn nữa. Bởi vì... có tri kỷ ở đây, nguồn cảm hứng sẽ chẳng bao giờ cạn kiệt."'
          }
        ]
      }
    ]
  },

  // --- 素素 知己 ---
  {
    id: 'su_su_zhiji_7',
    npcId: 'su_su',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Đồng Tâm Kết',
    scenes: [
      { text: 'Tố Tố đang đợi bạn ở sân sau của tiệm tơ lụa. Trên bàn bày biện đủ loại tơ lụa nhiều màu sắc. "Ta muốn dạy chàng đan một thứ." Nàng cười nói, "Là thứ mà chỉ giữa những người tri kỷ với nhau mới đan thôi —— Đồng Tâm Kết."' },
      { text: 'Nàng kiên nhẫn dạy bạn từng bước xâu kim, thắt nút. Ngón tay của hai người thỉnh thoảng lại chạm vào nhau, những lúc như vậy Tố Tố sẽ rụt rè thu tay về, rồi lại tiếp tục.' },
      {
        text: 'Cuối cùng, hai chiếc đồng tâm kết giống y hệt nhau đã hoàn thành. Một đỏ một xanh, đan xen vào nhau. "Màu đỏ là trái tim của ta, màu xanh là trái tim của chàng." Tố Tố khẽ nói, "Buộc chặt vào nhau rồi, sẽ chẳng bao giờ tách rời nữa."',
        choices: [
          {
            text: '"Tố Tố, chiếc đồng tâm kết này ta sẽ luôn mang theo bên mình."',
            friendshipChange: 120,
            response: 'Tố Tố buộc chiếc dây màu đỏ lên cổ tay bạn, động tác vô cùng dịu dàng cẩn thận. "Ừm... tri kỷ đồng tâm, vạn sự giai thành."'
          },
          {
            text: '"Tay nghề của nàng đúng là khéo léo đoạt thiên công."',
            friendshipChange: 80,
            response: '"Bởi vì là đan cho tri kỷ, nên mới đặc biệt dụng tâm như vậy." Tố Tố mím môi cười khẽ, tự buộc chiếc dây màu xanh lên cổ tay mình.'
          }
        ]
      }
    ]
  },
  {
    id: 'su_su_zhiji_9',
    npcId: 'su_su',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Tri Kỷ Y',
    scenes: [
      { text: 'Tố Tố lấy ra một bộ y phục được may vá tỉ mỉ. Chất vải mềm mại, màu sắc nhã nhặn, ở ống tay và cổ áo được thêu những họa tiết vô cùng tinh xảo. "Bộ y phục này, ta đã làm ròng rã tròn một tháng trời."' },
      {
        text: '"Vải vóc là loại lụa thượng hạng ta đã chắt chiu từ rất lâu rồi. Hoa văn là do tự tay ta thiết kế —— hoa đào và lan thảo đan vào nhau, tượng trưng cho tình cảm tri kỷ." Đôi mắt nàng sáng ngời, "Mặc thử xem sao?"',
        choices: [
          {
            text: 'Khoác y phục lên người, trịnh trọng hành lễ. "Tố Tố, bộ y phục này giống như tấm lòng tri kỷ, ta sẽ trân quý nó suốt đời."',
            friendshipChange: 160,
            response: 'Khóe mắt Tố Tố ươn ướt. "Ừm... mỗi một mũi kim đều là tấm lòng của ta. Chàng khoác nó lên người, tựa như ta vẫn luôn ở cạnh bên bầu bạn cùng chàng vậy."'
          },
          {
            text: '"Quá lộng lẫy rồi, Tố Tố. Nàng chính là người thợ may tài ba nhất."',
            friendshipChange: 120,
            response: '"Là bởi vì chàng là người tri kỷ tuyệt vời nhất." Tố Tố chỉnh lại cổ áo giúp bạn, động tác vô cùng mềm mỏng. "Đẹp... đẹp quá đi mất."'
          }
        ]
      }
    ]
  },

  // --- 红豆 知己 ---
  {
    id: 'hong_dou_zhiji_7',
    npcId: 'hong_dou',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Tri Kỷ Tửu',
    scenes: [
      { text: 'Hồng Đậu kéo bạn tới nơi sâu nhất của hầm rượu, lấy từ trên ngăn cao nhất xuống một vò rượu phủ đầy bụi bặm. "Vò rượu này, được ủ từ lúc phụ thân ta còn sống. Nói là đợi đến khi nào ta gặp được tri kỷ mới được phép mở ra."' },
      { text: 'Nàng đập lớp bùn niêm phong ra, hương rượu thơm lừng bay khắp nơi. Hồng Đậu rót cho bạn một bát đầy tràn, lại rót cho mình một bát. "Tới! Tri kỷ tửu, cạn!"' },
      {
        text: 'Một bát trôi xuống bụng, ngọt ngào thuần hậu, dư vị kéo dài. Hồng Đậu quệt khóe môi, hốc mắt hơi đỏ. "Phụ thân ta từng bảo, tri kỷ còn khó kiếm hơn cả rượu ngon. Gặp được rồi thì đừng buông tay."',
        choices: [
          {
            text: '"Hồng Đậu, vò rượu này đáng giá hơn bất kỳ thứ gì. Tình tri kỷ cũng vậy."',
            friendshipChange: 120,
            response: 'Hồng Đậu vỗ một cái thật mạnh lên lưng bạn. "Nói hay lắm! Làm thêm bát nữa! Ha ha ha!" Cười cười một lúc, nước mắt lại bất giác rơi xuống. "Nếu phụ thân ta còn sống... chắc chắn ông ấy cũng sẽ rất vui."'
          },
          {
            text: '"Cảm ơn nàng đã chia sẻ cho ta một vò rượu quan trọng thế này."',
            friendshipChange: 80,
            response: '"Cảm ơn cái gì chứ!" Hồng Đậu hào sảng xua tay, "Giữa tri kỷ với nhau không nói chữ cảm ơn! Lại đây, chúng ta uống cho cạn vò này nào!"'
          }
        ]
      }
    ]
  },
  {
    id: 'hong_dou_zhiji_9',
    npcId: 'hong_dou',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Tửu Minh',
    scenes: [
      { text: 'Hồng Đậu dọn sẵn một bàn rượu thịt dưới gốc đào sau tửu trang. "Hôm nay phải làm thật tử tế mới được!" Nàng lấy từ trong ngực ra hai chiếc chén rượu giống hệt nhau, bên trên khắc hai chữ "Tri Kỷ".' },
      {
        text: '"Từ hôm nay trở đi, chén này chính là chén tri kỷ của chúng ta." Dáng vẻ khi Hồng Đậu nghiêm túc hoàn toàn khác xa với vẻ xuề xòa thường ngày, "Trời đất chứng giám, hoa đào làm mai —— hai chúng ta kết nghĩa tri kỷ, có phúc cùng hưởng, có họa cùng chia!"',
        choices: [
          {
            text: 'Nâng chén. "Có phúc cùng hưởng, có họa cùng chia! Cạn!"',
            friendshipChange: 160,
            response: 'Hai chén cụng vào nhau, bọt rượu văng tung tóe. Hồng Đậu cười ha hả: "Đã quá! Kể từ hôm nay, ngươi chính là tri kỷ ruột thịt của Hồng Đậu ta!" Nàng lại rót đầy rượu, "Tới tới tới, không say không về!"'
          },
          {
            text: '"Hồng Đậu, nàng sống tình cảm hơn vẻ bề ngoài rất nhiều."',
            friendshipChange: 120,
            response: '"Hứ!" Mặt Hồng Đậu ửng đỏ, "Đừng tưởng ta không biết xấu hổ! ... Nhưng trước mặt tri kỷ, ta sẽ không giả vờ. Nào, uống rượu!"'
          }
        ]
      }
    ]
  },

  // --- 丹青 知己 ---
  {
    id: 'dan_qing_zhiji_7',
    npcId: 'dan_qing',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Ước Hẹn Lan Đình',
    scenes: [
      { text: 'Đan Thanh trải giấy mực bút nghiên ra bàn đá trong rừng trúc. "Năm xưa Vương Hi Chi tụ họp ở Lan Đình, thu hút muôn vàn hiền tài. Hôm nay dẫu chỉ có hai người chúng ta, nhưng cũng có một thú vui riêng."' },
      { text: 'Chàng thấm đẫm mực, viết một mạch bốn chữ: "Cao Sơn Lưu Thủy". Sau đó đưa bút cho bạn. "Tri kỷ giao du, mượn văn kết bạn. Mời."' },
      {
        text: 'Hai bạn thay phiên nhau viết chữ, thưởng bình, luận bàn kim cổ. Trong mắt Đan Thanh lấp lánh ánh sáng. "Tử Kỳ gặp Bá Nha, tương tri chẳng cần nói nhiều. {player}, ngươi chính là Tử Kỳ của ta."',
        choices: [
          {
            text: '"Đan Thanh, tài hoa của chàng khiến người ta khâm phục. Được làm Tử Kỳ của chàng, chính là vinh hạnh của ta."',
            friendshipChange: 120,
            response: 'Đan Thanh mỉm cười, viết thêm hai chữ lên giấy: "Tri Kỷ". "Hai chữ này, xin tặng cho {player}. Đóng khung treo trong thư phòng, ngày ngày đều có thể thấy."'
          },
          {
            text: '"Cao sơn lưu thủy, tri âm khó tìm. May mắn gặp được Đan Thanh."',
            friendshipChange: 80,
            response: '"Tuyệt diệu!" Đan Thanh vỗ tay cười lớn, "Câu nói này ta phải chép lại vào thi tập mới được. Lời của tri kỷ, từng chữ đáng ngàn vàng."'
          }
        ]
      }
    ]
  },
  {
    id: 'dan_qing_zhiji_9',
    npcId: 'dan_qing',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Giao Tình Đoạn Kim',
    scenes: [
      { text: 'Đan Thanh trịnh trọng đưa cho bạn một cuốn sách chép tay. Trên bìa viết ba chữ "Tri Kỷ Tập". "Đây là toàn bộ thơ văn ta đã viết trong những năm qua —— trong đó có không ít bài là viết sau khi gặp {player}."' },
      {
        text: '"《Kinh Dịch》 có câu: Hai người đồng lòng, sức mạnh cắt đứt được cả kim loại. (Nhị nhân đồng tâm, kỳ lợi đoạn kim)" Giọng của Đan Thanh vô cùng ôn hòa kiên định, "Tại hạ tuy chỉ là một thư sinh trói gà không chặt. Nhưng nếu tri kỷ gặp nạn, Đan Thanh nhất định xông pha khói lửa, vạn chết không từ."',
        choices: [
          {
            text: '"Đan Thanh, tình bạn đồng tâm hiệp lực này, đời này quyết không phụ."',
            friendshipChange: 160,
            response: 'Vành mắt Đan Thanh rơm rớm, nhưng chàng nhanh chóng mỉm cười che giấu đi. "Một câu \'đời này quyết không phụ\' thật hay. {player}, có được bốn chữ này của ngươi, Đan Thanh đời này không còn gì ân hận."'
          },
          {
            text: '"Cuốn Tri Kỷ Tập này ta sẽ trân quý thật cẩn thận."',
            friendshipChange: 120,
            response: '"Thơ văn cũng chỉ là giấy mực." Đan Thanh lắc đầu, "Thứ thực sự quý giá, là tình nghĩa đằng sau những trang giấy đó. {player} ghi nhớ là được rồi."'
          }
        ]
      }
    ]
  },

  // --- 阿铁 知己 ---
  {
    id: 'a_tie_zhiji_7',
    npcId: 'a_tie',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Bí mật của thợ rèn',
    scenes: [
      { text: 'A Thiết lén lút kéo bạn ra phía sau tiệm rèn. "Có, có thứ này... tôi chỉ cho tri kỷ xem thôi." Anh lục trong tủ ra một con dao nhỏ có hình thù kỳ dị.' },
      { text: '"Đây là tác phẩm do tôi tự mình hoàn thành lần đầu tiên... Sư phụ không biết đâu." Lưỡi dao có vài chỗ bị khuyết điểm rất rõ ràng, nhưng trên chuôi dao có khắc một chữ "Thiết" xiêu vẹo.' },
      {
        text: '"Rất xấu xí đúng không..." A Thiết đỏ mặt cúi đầu, "Nhưng, nhưng đây là thứ quan trọng nhất của tôi. Tôi muốn... cho tri kỷ xem thử."',
        choices: [
          {
            text: '"A Thiết, con dao này còn ý nghĩa hơn bất cứ thứ thần binh lợi khí nào."',
            friendshipChange: 120,
            response: 'A Thiết bỗng ngẩng phắt đầu lên, hai mắt sáng rực. "Thật, thật sao?! Vậy... vậy sau này lúc xuất sư rồi, tôi sẽ rèn cho {player} một con tốt hơn! Nhất định đấy!"'
          },
          {
            text: '"Cảm ơn anh đã tin tưởng tôi. Giữa tri kỷ với nhau vốn dĩ nên như vậy."',
            friendshipChange: 80,
            response: '"Ừm!" A Thiết gật đầu thật mạnh, hai tai đỏ ửng. "Tri, tri kỷ chính là... người mà ta có thể kể cho nghe những chuyện đáng xấu hổ nhất!"'
          }
        ]
      }
    ]
  },
  {
    id: 'a_tie_zhiji_9',
    npcId: 'a_tie',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Cặp Vòng Sắt',
    scenes: [
      { text: 'A Thiết ướt sũng mồ hôi chạy tới tìm bạn. "Làm, làm xong rồi!" Anh cẩn thận mở một chiếc hộp sắt ra, bên trong là hai chiếc vòng tay bằng sắt giản dị nhưng được mài giũa sáng bóng.' },
      {
        text: '"Đây, đây là do tôi dùng loại sắt tốt nhất để rèn đấy! Tốn mất bảy ngày bảy đêm!" A Thiết đỏ bừng mặt, "Sư phụ bảo, tác phẩm tốt nhất của người thợ rèn nên tặng cho người quan trọng nhất. Tri kỷ... chính là người quan trọng nhất!"',
        choices: [
          {
            text: 'Đeo chiếc vòng sắt lên tay, nắm chặt lấy tay A Thiết. "Huynh đệ!"',
            friendshipChange: 160,
            response: 'A Thiết cũng đeo chiếc còn lại lên tay, dùng sức nắm chặt tay bạn. "Tri... tri kỷ! Còn thân thiết hơn cả anh em ruột thịt! A Thiết tôi xin thề, sau này mọi công cụ của cậu cứ để tôi thầu hết!"'
          },
          {
            text: '"A Thiết, chiếc vòng tay này dẫu làm bằng sắt, nhưng tình nghĩa lại nặng hơn cả vàng."',
            friendshipChange: 120,
            response: 'Viền mắt A Thiết đỏ hoe. "Tôi, tôi không biết nói những câu dễ nghe... nhưng {player} cậu là tri kỷ quan, quan trọng nhất của tôi! Đời này kiếp này không thay đổi!"'
          }
        ]
      }
    ]
  },

  // --- 云飞 知己 ---
  {
    id: 'yun_fei_zhiji_7',
    npcId: 'yun_fei',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Tổ Đại Bàng',
    scenes: [
      { text: 'Vân Phi dẫn bạn trèo lên vách núi cao nhất ở ngọn núi phía sau. Trên đỉnh núi có một cây thông mọc trơ trọi, trên cành có một cái tổ đại bàng khổng lồ. "Tổ chim này, ta đã canh giữ suốt ba năm rồi."' },
      { text: 'Một con chim ưng bay lượn vòng rồi đậu xuống cành thông, thế mà không hề bị sự xuất hiện của hai người làm hoảng sợ. "Nó tin ta." Vân Phi nói, "Bây giờ... cũng tin ngươi rồi."' },
      {
        text: '"Ta không dễ dãi đưa ai đến đây bao giờ." Vân Phi nhìn những rặng núi phía xa, giọng nói hiếm hoi trở nên mềm mỏng, "Nhưng ngươi là tri kỷ. Mọi thứ ở nơi này... cũng đều là của ngươi."',
        choices: [
          {
            text: '"Vân Phi, anh đã chia sẻ cho tôi một bí mật vô cùng quý giá."',
            friendshipChange: 120,
            response: 'Vân Phi yên lặng hồi lâu, rồi khẽ thốt ra hai chữ: "Xứng đáng." Con chim ưng kia lại cất cánh bay lượn trong ánh tà dương, tựa như đang canh gác cho hai người.'
          },
          {
            text: '"Cảm ơn sự tín nhiệm của anh."',
            friendshipChange: 80,
            response: '"... Không cần cảm ơn." Khóe miệng Vân Phi hơi nhếch lên một chút gần như không thể thấy, "Giữa tri kỷ với nhau không cần nói mấy lời khách sáo này."'
          }
        ]
      }
    ]
  },
  {
    id: 'yun_fei_zhiji_9',
    npcId: 'yun_fei',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Ước Hẹn Thợ Săn',
    scenes: [
      { text: 'Vân Phi cắm một con dao găm xuống khoảng đất giữa hai người. Lưỡi dao lóe lên tia sáng lạnh lẽo dưới ánh trăng. "Con dao này đã theo ta suốt mười năm ròng."' },
      {
        text: '"Thợ săn có một quy củ —— giao bội đao cho một người khác, có nghĩa là giao phó cả sinh mạng của mình cho người đó." Vân Phi nhìn thẳng vào mắt bạn, "Ta tặng nó cho ngươi."',
        choices: [
          {
            text: 'Rút con dao găm lên, trịnh trọng cất vào trong vạt áo. "Mạng của anh, cũng chính là mạng của tôi."',
            friendshipChange: 160,
            response: 'Vân Phi hiếm hoi mỉm cười —— không phải kiểu cười chế giễu, cũng không phải cười nhạt, mà là một nụ cười rạng rỡ từ tận đáy lòng. "... Tốt. Vậy sau này vào núi, ta sẽ bảo vệ tấm lưng của ngươi."'
          },
          {
            text: '"Vân Phi... vật này quá mức đắt giá rồi."',
            friendshipChange: 120,
            response: '"Nếu chê đắt giá thì đừng làm tri kỷ của ta nữa." Vân Phi lườm bạn một cái, ngay sau đó thở dài một hơi. "Giữ lấy đi. Ta đã sớm muốn tìm một người đáng tin cậy để san sẻ gánh nặng rồi."'
          }
        ]
      }
    ]
  },

  // --- 大牛 知己 ---
  {
    id: 'da_niu_zhiji_7',
    npcId: 'da_niu',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Lời Thề Sữa Bò',
    scenes: [
      { text: 'Đại Ngưu hào hứng kéo bạn tới chuồng bò. "Lại đây lại đây! Hôm nay Phúc Bảo cho sữa rồi! Bát đầu tiên nhất định phải dành cho tri kỷ uống!"' },
      { text: 'Cậu lóng ngóng rót sữa tươi vào hai cái bát, làm bắn sữa tung tóe khắp bàn. "Hì hì... lỡ tay rồi."' },
      {
        text: 'Đại Ngưu bưng bát lên. "Đại Ngưu tôi học thức cạn hẹp, không biết nói những câu dễ nghe. Nhưng tôi biết —— anh em tốt chính là người có thể cùng nhau uống sữa bò! Cạn!"',
        choices: [
          {
            text: 'Bưng bát uống một hơi cạn sạch. "Huynh đệ tốt! Cùng nhau uống sữa bò, cùng nhau xông pha thiên hạ!"',
            friendshipChange: 120,
            response: '"Đúng vậy!" Đại Ngưu vỗ vỗ ngực, "Sau này bò của tôi cũng là bò của cậu! Mục trường của tôi cũng là mục trường của cậu! Tri kỷ cơ mà!"'
          },
          {
            text: '"Đại Ngưu, cậu biết ăn nói hơn cậu nghĩ nhiều đấy."',
            friendshipChange: 80,
            response: '"Vậy, vậy sao?" Đại Ngưu gãi đầu, toét miệng cười, "Hì hì, được tri kỷ khen ngợi rồi! Còn vui sướng hơn cả việc bị chục con bò liếm nữa!"'
          }
        ]
      }
    ]
  },
  {
    id: 'da_niu_zhiji_9',
    npcId: 'da_niu',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Liên Minh Mục Trường',
    scenes: [
      { text: 'Đại Ngưu treo một tấm biển gỗ mới khắc lên hàng rào mục trường. Bên trên viết xiêu vẹo hai cái tên —— tên của cậu và tên của bạn.' },
      {
        text: '"Kể từ hôm nay trở đi, mục trường này chính là của hai chúng ta!" Mắt Đại Ngưu đỏ hoe, "Tôi vẫn luôn mơ ước có một người cộng tác... Tri kỷ chính là người cộng tác tuyệt vời nhất!"',
        choices: [
          {
            text: 'Vỗ vỗ vai Đại Ngưu. "Liên minh mục trường, mãi không đổi ý!"',
            friendshipChange: 160,
            response: 'Đại Ngưu gật đầu thật mạnh, sau đó ôm chầm lấy bạn, suýt chút nữa siết bạn đến ngất xỉu. "Tốt quá rồi!! Tri kỷ hợp tác! Thiên hạ vô địch! Tôi đi kiếm thêm đồ ăn cho lũ bò để ăn mừng đây!"'
          },
          {
            text: '"Đại Ngưu, có cậu làm tri kỷ, thật là phúc phận của tôi."',
            friendshipChange: 120,
            response: 'Đại Ngưu òa lên khóc nức nở. "Hu hu... {player} cậu đừng nói nữa... Cứ bị cảm động là tôi không kìm nén được... hu hu... nhưng mà tôi thực sự rất vui!"'
          }
        ]
      }
    ]
  },

  // --- 墨白 知己 ---
  {
    id: 'mo_bai_zhiji_7',
    npcId: 'mo_bai',
    requiredFriendship: 1750,
    requiresZhiji: true,
    title: 'Khúc Nhạc Không Lời',
    scenes: [
      { text: 'Dưới ánh trăng, Mặc Bạch gảy một khúc nhạc mà bạn chưa từng được nghe. Giai điệu khi thì tươi vui, lúc lại u sầu, cuối cùng quay về với sự tĩnh lặng. Gảy xong, chàng lẳng lặng nhìn bạn.' },
      {
        text: '"Khúc nhạc này không có tên, cũng không có lời." Chàng khẽ nói, "Bởi vì nó không phải dùng để nghe —— mà là dùng để \'Cảm nhận\'. Chỉ có tri kỷ... mới có thể cảm nhận được."',
        choices: [
          {
            text: '"Mặc Bạch, ta đã nghe thấy rồi. Niềm vui, nỗi buồn, sự thanh thản... tất cả đều gói gọn trong đó."',
            friendshipChange: 120,
            response: 'Mặc Bạch ngây ngẩn cả người. Sau đó chàng cúi đầu, ngón tay nhẹ lướt qua những sợi dây đàn. "... Ngươi thực sự nghe hiểu được. Mười năm nay, ngươi là người đầu tiên đấy."'
          },
          {
            text: '"Khúc nhạc này thật êm dịu."',
            friendshipChange: 80,
            response: '"Êm dịu sao?" Mặc Bạch lắc đầu, "Không, khúc nhạc này là sự \'Chân Thật\'. Chỉ khi ở trước mặt tri kỷ, ta mới có thể gảy ra một khúc nhạc \'Chân Thật\' đến vậy."'
          }
        ]
      }
    ]
  },
  {
    id: 'mo_bai_zhiji_9',
    npcId: 'mo_bai',
    requiredFriendship: 2250,
    requiresZhiji: true,
    title: 'Tri Âm Cầm',
    scenes: [
      {
        text: 'Mộ Bài mở chiếc đàn piano mà bạn chưa từng thấy trước đây. Bên trong có một cây đàn piano nhỏ đơn giản với dòng chữ ""Tri Âm"Hai từ."Cây đàn piano này được chủ nhân của tôi để lại cho tôi. Anh ấy nói rằng khi tôi tìm được tri kỷ, tôi sẽ truyền bá."'
      },
      {
        text: '"Ngươi không nhất thiết phải biết gảy." Mặc Bạch nhẹ nhàng đưa cây đàn vào tay bạn, "Chỉ cần nó ở bên ngươi, thì sẽ giống như tiếng đàn của ta vẫn luôn ở cạnh bầu bạn. Cánh mắt chàng mang theo một nét dịu dàng hiếm thấy. "Bá Nha vì Tử Kỳ mà đập vỡ đàn... nhưng ta sẽ không làm vậy. Bởi vì ngươi vẫn luôn ở đây."',
        choices: [
          {
            text: 'Hai tay đón lấy cây cổ cầm. "Có đàn Tri Âm trong tay, tựa như được nghe âm thanh của Mặc Bạch. Đời này kiếp này, ta không làm Tử Kỳ, ta sẽ làm thính giả vĩnh viễn của chàng."',
            friendshipChange: 160,
            response: 'Mặc Bạch khép mi lại, khẽ gảy một nốt nhạc trên cây đàn của mình. Nốt nhạc đó văng vẳng trong không trung hồi lâu mới tắt. "... Được. Vĩnh viễn."'
          },
          {
            text: '"Mặc Bạch, ta sẽ cất giữ cây đàn này thật cẩn thận."',
            friendshipChange: 120,
            response: '"Không cần cất giữ làm gì." Mặc Bạch khẽ mỉm cười, "Đàn là để gảy. Khi nào ngươi học được nốt nhạc đầu tiên, hãy gảy cho ta nghe."'
          }
        ]
      }
    ]
  }
]

/** 婚礼事件定义 (通用，npcId 在运行时替换) */
export const WEDDING_EVENT: HeartEventDef = {
  id: 'wedding_ceremony',
  npcId: '',
  requiredFriendship: 0,
  title: 'Trăm năm hạnh phúc',
  scenes: [
    {
      text: 'Hôm nay là một ngày mà bạn đã mong ngóng từ rất lâu. Ánh nắng sớm mai rải xuống quảng trường Đào Nguyên Hương, dân làng đã thức dậy từ sớm để trang hoàng lụa đỏ và đèn lồng. Bác Trần đứng trước cửa tươi cười chào đón khách khứa, Thím Vương thì tất bật ngược xuôi lo liệu cho tiệc hỉ.'
    },
    {
      text: 'Bạn khoác lên mình bộ hỉ phục mới tinh, đứng ngay giữa quảng trường. Trưởng thôn Liễu với tư cách là người chứng hôn, hắng giọng phát biểu: "Hôm nay là ngày lành tháng tốt, Đào Nguyên Hương lại có thêm một chuyện hỉ." Xung quanh vang lên tiếng vỗ tay reo hò.'
    },
    {
      text: 'Người thương của bạn chầm chậm bước tới, mặc giá y màu đỏ rực, trên môi mang theo nụ cười e thẹn. Dưới sự chứng kiến của tất cả mọi người, hai bạn đã trao đổi tín vật cho nhau. Trưởng thôn Liễu dõng dạc tuyên bố: "Buổi lễ hoàn tất! Trăm năm hạnh phúc, răng long đầu bạc!"'
    },
    {
      text: 'Trong bữa tiệc, Thím Mập bưng lên những món ăn tủ của mình, Lão Lục mang ra những vò rượu quý cất giấu đã lâu, Chu tú tài cao hứng viết tặng một bài thơ chúc mừng. Tiểu Mãn và Thạch Đầu lén chui xuống gầm bàn ăn vụng điểm tâm, A Hoa thì tò mò mở to hai mắt nhìn hai bạn chằm chằm. Cả Đào Nguyên Hương chìm ngập trong bầu không khí hân hoan rộn rã.'
    },
    {
      text: 'Màn đêm buông xuống, khách khứa dần tản đi. Hai người trở về căn nhà ấm áp của mình, bắt đầu một cuộc sống hoàn toàn mới. Từ nay về sau, nơi này không còn là điền trang của riêng một mình bạn nữa —— mà là tổ ấm chung của cả hai người.'
    }
  ]
}

/** 根据NPC ID获取其所有心事件 */
export const getHeartEventsForNpc = (npcId: string): HeartEventDef[] => {
  return HEART_EVENTS.filter(e => e.npcId === npcId)
}

/** 根据事件ID获取心事件定义 */
export const getHeartEventById = (id: string): HeartEventDef | undefined => {
  return HEART_EVENTS.find(e => e.id === id)
}
