const fs = require('fs');
const path = require('path');

const DICTIONARY = {
  // GameLayout.vue
  '状态栏': 'Thanh trạng thái',
  '内容': 'Nội dung',
  '移动端地图按钮': 'Nút bản đồ di động',
  '虚空箱远程访问按钮': 'Nút rương hư không từ xa',
  '日志按钮': 'Nút nhật ký',
  '移动端地图菜单': 'Menu bản đồ di động',
  '季节事件弹窗': 'Cửa sổ sự kiện mùa',
  '心事件弹窗': 'Cửa sổ sự kiện tim',
  '仙灵发现场景弹窗': 'Cửa sổ phát hiện tiên linh',
  '互动节日': 'Lễ hội tương tác',
  '技能专精选择弹窗': 'Cửa sổ chọn chuyên môn kỹ năng',
  '宠物领养弹窗': 'Cửa sổ nhận nuôi thú cưng',
  '子女提议弹窗': 'Cửa sổ đề nghị của con',
  '晨间选项事件弹窗': 'Cửa sổ sự kiện tùy chọn buổi sáng',
  '虚空箱远程存取弹窗': 'Cửa sổ rương hư không',
  '虚空箱列表': 'Danh sách rương hư không',
  '展开的物品列表': 'Danh sách vật phẩm đã mở',
  '虚空箱存入弹窗': 'Cửa sổ cất vào rương',
  '虚空箱数量选择弹窗': 'Cửa sổ chọn số lượng rương',
  '虚空箱道具信息弹窗': 'Thông tin đạo cụ rương',
  '日志弹窗': 'Cửa sổ nhật ký',
  '日志清空确认': 'Xác nhận xóa nhật ký',
  '休息确认': 'Xác nhận nghỉ ngơi',
  '宠物领养': 'Nhận nuôi thú cưng',
  '子女提议回应': 'Phản hồi đề nghị',
  '普通': 'Thường',
  '优良': 'Tốt',
  '卓越': 'Xuất sắc',
  '极品': 'Hoàn hảo',
  '休息确认弹窗': 'Xác nhận đi ngủ',
  '设置弹窗': 'Cài đặt',
  
  // AnimalView
  '第': 'Thứ ',
  '年': 'Năm',
  '春': 'Xuân',
  '夏': 'Hạ',
  '秋': 'Thu',
  '冬': 'Đông',
  '无': 'Không',
  '猫': 'Mèo',
  '狗': 'Chó',
  '马': 'Ngựa',
  '鸡': 'Gà',
  '白鸡': 'Gà trắng',
  '褐鸡': 'Gà nâu',
  '虚空鸡': 'Gà hư không',
  '恐龙': 'Khủng long',
  '小鸡': 'Gà con',
  '鸭': 'Vịt',
  '小鸭': 'Vịt con',
  '兔': 'Thỏ',
  '小兔': 'Thỏ con',
  '牛': 'Bò',
  '白奶牛': 'Bò sữa trắng',
  '褐奶牛': 'Bò sữa nâu',
  '小牛': 'Bê',
  '奶牛': 'Bò sữa',
  '羊': 'Cừu',
  '小羊': 'Cừu con',
  '绵羊': 'Cừu',
  '山羊': 'Dê',
  '小山羊': 'Dê con',
  '猪': 'Heo',
  '小猪': 'Heo con',
  '牦牛': 'Bò Tây Tạng',
  '小牦牛': 'Bò Tây Tạng con',
  '今天已放牧': 'Hôm nay đã thả',
  '雨天不能放牧': 'Trời mưa không thể chăn thả',
  '冬天只有牦牛可放牧': 'Mùa đông chỉ chăn thả được bò Tây Tạng',
  '先喂食再放牧': 'Cho ăn rồi mới thả',
  '没有牲畜': 'Không có gia súc',

  // BreedingView
  '育种': 'Lai tạo giống',
  '种子箱': 'Hộp hạt giống',
  '育种台': 'Bàn lai tạo',
  '图鉴': 'Thư viện',
  '建造': 'Xây dựng',
  '尚未建造育种台': 'Chưa xây bàn lai tạo',
  '建造育种台后可进行杂交育种': 'Xây xong có thể lai giống',
  '空闲': 'Trống',
  '培育中': 'Đang lai',
  '完成': 'Xong',
  '收取': 'Thu thập',
  '种子箱为空': 'Hộp hạt trống',
  '育种规则': 'Quy tắc lai tạo',
  '同种培育': 'Lai cùng loại',
  '异种杂交': 'Lai khác loại',
  '完成度': 'Tiến độ',
  '建造育种台': 'Xây bàn lai tạo',
  '所需材料': 'Vật liệu cần',
  '费用': 'Chi phí',
  '当前持有': 'Đang có',
  '确认建造': 'Xác nhận',
  '丢弃': 'Vứt',
  '阶层': 'Bậc',
  '亲本A': 'Bố',
  '亲本B': 'Mẹ',
  '甜度要求': 'Y/c độ ngọt',
  '产量要求': 'Y/c sản lượng',
  '基础属性': 'Chỉ số cơ bản',
  '甜度': 'Độ ngọt',
  '产量': 'Sản lượng',
  '抗性': 'Kháng',
  '种植次数': 'Số lần trồng',
  '种子箱信息': 'Thông tin hộp hạt',
  '当前等级': 'Cấp hiện tại',
  '容量上限': 'Sức chứa tối đa',
  '扩容种子箱': 'Mở rộng hộp',
  '确认扩容': 'Xác nhận mở rộng',
  '选择两颗种子': 'Chọn 2 hạt giống',
  '开始育种': 'Bắt đầu lai tạo',
  '全部': 'Tất cả',
  '一代': 'Đời 1',
  '二代': 'Đời 2',
  '三代': 'Đời 3',
  '四代': 'Đời 4',
  '五代': 'Đời 5',
  '六代': 'Đời 6',
  '七代': 'Đời 7',
  '八代': 'Đời 8',
  '九代': 'Đời 9',
  '十代': 'Đời 10',
  '稳定': 'Ổn định',
  '变异': 'Đột biến',

  // CottageView
  '小屋': 'Nhà',
  '等级': 'Cấp độ',
  '家人': 'Gia đình',
  '伴侣': 'Vợ/chồng',
  '聊天': 'Trò chuyện',
  '已聊天': 'Đã trò chuyện',
  '送礼': 'Tặng quà',
  '已送礼': 'Đã tặng',
  '本周已满': 'Đã đạt giới hạn tuần',
  '回应': 'Phản hồi',
  '孕期': 'Giai đoạn sinh',
  '进度': 'Tiến độ',
  '送礼物': 'Tặng quà',
  '陪伴聊天': 'Trò chuyện cùng',
  '已陪伴': 'Đã ở cùng',
  '服用补品': 'Uống thuốc bổ',
  '安排休息': 'Sắp xếp nghỉ ngơi',
  '已休息': 'Đã nghỉ',
  '选择接生方式': 'Chọn cách sinh',
  '互动': 'Tương tác',
  '还太小': 'Còn quá nhỏ',
  '送走': 'Gửi đi',
  '取消': 'Hủy',
  '雇工': 'Người làm',
  '招募': 'Chiêu mộ',
  '暂未雇佣': 'Chưa thuê',
  '升级': 'Nâng cấp',
  '取出': 'Lấy ra',
  '周期': 'Chu kỳ',
  '放入陈酿': 'Bỏ vào hầm',
  '升级农舍': 'Nâng cấp nhà',
  '时历': 'Lịch',
  '节日': 'Lễ',
  '生日': 'Sinh nhật',
  '确定雇佣': 'Xác nhận thuê',
  '负责': 'Phụ trách',
  '吗？': ' Không?',
  '确定': 'Đóng',
  '确认解雇': 'Xác nhận sa thải',
  '确认取出': 'Xác nhận lấy ra',
  '升级酒窖': 'Nâng cấp hầm rượu',
  '婴儿': 'Em bé',
  '幼儿': 'Trẻ em',
  '孩童': 'Thiếu nhi',
  '少年': 'Thiếu niên',

  // FishPondView
  '鱼塘': 'Ao cá',
  '尚未建造鱼塘': 'Chưa xây ao cá',
  '水质': 'Chất lượng nước',
  '喂食': 'Cho ăn',
  '已喂食': 'Đã cho ăn',
  '改良水质': 'Cải tạo nước',
  '放入鱼苗': 'Thả cá giống',
  '繁殖': 'Sinh sản',
  '繁殖中': 'Đang sinh sản',
  '选为繁殖亲本': 'Chọn làm cá bố mẹ',
  '取出到背包': 'Lấy ra balo',
  '当前容量': 'Sức chứa hiện tại',
  '升级至': 'Nâng cấp lên',
  '升级后容量': 'Sức chứa sau',
  '体重': 'Cân nặng',
  '生长': 'Phát triển',
  '抗病': 'Kháng bệnh',
  '品质': 'Phẩm chất',

  // FishingView
  '钓鱼地点': 'Điểm câu cá',
  '装备': 'Trang bị',
  '鱼竿': 'Cần câu',
  '鱼饵': 'Mồi câu',
  '未装备': 'Chưa trang bị',
  '浮漂': 'Phao câu',
  '抛竿': 'Quăng cần',
  '钓鱼结果': 'Kết quả câu',
  '当前可钓鱼类': 'Loại cá câu được',
  '蟹笼': 'Lồng cua',
  '放置蟹笼': 'Đặt lồng cua',
  '淘金': 'Đãi vàng',
  '淘金一次': 'Đãi vàng 1 lần',
  '当前装备': 'Đang trang bị',
  '卸下': 'Tháo ra',
  '继续钓鱼': 'Tiếp tục câu',
  '确认放弃': 'Từ bỏ',
  '结果': 'Kết quả',
  '数量': 'Số lượng',
  '难度': 'Độ khó',
  '售价': 'Giá bán',
  '成功捕获': 'Bắt thành công',
  '鱼跑了': 'Cá sổng mất',
  '简单': 'Dễ',
  '困难': 'Khó',
  '传说': 'Truyền thuyết',
  '任意': 'Bất kỳ',
  '晴': 'Nắng',
  '雨': 'Mưa',
  '雷雨': 'Mưa bão',
  '雪': 'Tuyết',
  '大风': 'Gió lớn',
  '完美': 'Hoàn hảo',
  '优秀': 'Xuất sắc',
  '良好': 'Tốt',
  '失败': 'Thất bại',

  // ForageView - generic words mostly replaced by other replacements

  // GuildView
  '冒险家公会': 'Hội mạo hiểm giả',
  '讨伐': 'Thảo phạt',
  '捐献': 'Quyên góp',
  '商店': 'Cửa hàng',
  '已完成': 'Đã hoàn thành',
  '领取奖励': 'Nhận thưởng',
  '捐献数量': 'Số lượng góp',
  '最少': 'Ít nhất',
  '最多': 'Nhiều nhất',
  '预计获得': 'Dự kiến nhận',
  '确认捐献': 'Xác nhận góp',
  '单价': 'Đơn giá',
  '价格': 'Giá',
  '持有': 'Đang có',
  '持有贡献点': 'Điểm cống hiến hiện có',
  '持有铜钱': 'Đồng tiền hiện có',
  '今日剩余': 'Hôm nay còn',
  '本周剩余': 'Tuần này còn',
  '合计': 'Tổng cộng',
  '生命': 'HP',
  '攻击': 'Công',
  '防御': 'Thủ',
  '击杀数': 'Số kill',
  '掉落物': 'Vật rơi ra',
  '装备掉落': 'Trang bị rơi',
  '必得': 'Chắc chắn nhận',
  '讨伐进度': 'Tiến độ thảo phạt',
  '浅层': 'Tầng cạn',
  '冰霜': 'Băng giá',
  '熔岩': 'Dung nham',
  '水晶': 'Pha lê',
  '暗影': 'Bóng tối',
  '深渊': 'Vực thẳm',
  '骷髅矿穴': 'Động khô lâu',

  // HanhaiView
  '通商积分': 'Điểm thương mại',
  '店铺等级': 'Cấp cửa hàng',
  '售货摊位': 'Quầy bán',
  '上架物品': 'Lên kệ vật phẩm',
  '店铺升级': 'Nâng cấp cửa hàng',
  '积分兑换': 'Đổi điểm',
  '今日剩余次数': 'Lượt còn lại hôm nay',
  '幸运轮盘': 'Vòng quay may mắn',
  '骰子猜大小': 'Đoán tài xỉu',
  '猜杯': 'Đoán cốc',
  '斗蛐蛐': 'Chọi dế',
  '翻牌寻宝': 'Lật thẻ tìm kho báu',
  '瀚海扑克': 'Poker Hãn Hải',
  '恶魔轮盘': 'Vòng quay ác quỷ',
  '挑战': 'Thử thách',
  '持有金钱': 'Tiền đang có',
  '今日赌博': 'Đánh bạc hôm nay',
  '本周限购': 'Giới hạn tuần',
  '售卖周期': 'Chu kỳ bán',
  '预计积分': 'Điểm ước tính',

  // HomeView
  '设施': 'Cơ sở hạ tầng',
  '山洞': 'Hang động',
  '蘑菇洞': 'Hang nấm',
  '蝙蝠洞': 'Hang dơi',
  '运作天数': 'Số ngày hoạt động',
  '产出品质': 'Chất lượng',
  '产出概率': 'Xác suất',
  '双倍概率': 'Xác suất x2',
  '升级山洞': 'Nâng cấp hang động',
  '解锁温室': 'Mở khóa nhà kính',
  '仓库': 'Nhà kho',
  '箱子': 'Rương',
  '解锁仓库': 'Mở khóa nhà kho',
  '添加箱子': 'Thêm rương',
  '整理': 'Sắp xếp',
  '一键存入重复物品': 'Gửi vào rương đồ trùng',
  '存入物品': 'Gửi vật phẩm',
  '拆卸确认': 'Xác nhận tháo',
  '拆卸': 'Tháo',
  '制作箱子': 'Làm rương',
  '制作': 'Làm',

  // MiningView
  '云隐矿洞': 'Mỏ Vân Ẩn',
  '未探索': 'Chưa khám phá',
  '装备与状态': 'Trang bị & Trạng thái',
  '攻击力': 'Tấn công',
  '暴击': 'Bạo kích',
  '附魔': 'Cường hóa',
  '探索': 'Khám phá',
  '已击败BOSS': 'Đã đánh bại sếp',
  '矿洞地图': 'Bản đồ mỏ',
  '进入矿洞': 'Vào mỏ',
  '进入骷髅矿穴': 'Vào động khô lâu',
  '怪物诱饵': 'Mồi quái thú',
  '使用道具': 'Dùng đạo cụ',
  '下一层': 'Tầng sau',
  '楼梯不可用': 'Không thể dùng thang',
  '离开矿洞': 'Rời mỏ',
  '减免伤害': 'Giảm sát thương',
  '逃跑': 'Bỏ chạy',
  '切换装备方案': 'Đổi bộ trang bị',
  '效果': 'Hiệu ứng',
  '剩余': 'Còn',
  '使用数量': 'Số lượng dùng',
  '确认离开': 'Xác nhận rời khỏi'
};

const DIRS_TO_SCAN = ['./taoyuan-main/src/views/game', './taoyuan-main/src/views'];
const EXTS = ['.vue', '.ts'];

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(fullPath));
      } else {
        if (EXTS.some(ext => fullPath.endsWith(ext))) results.push(fullPath);
      }
    });
  } catch (err) {}
  return results;
}

let allFiles = [];
DIRS_TO_SCAN.forEach(d => {
  allFiles = allFiles.concat(walk(d));
});

// filter unique files
allFiles = Array.from(new Set(allFiles));

console.log(`Scanning ${allFiles.length} files for replacements...`);

let replacedTotal = 0;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let replaced = false;

  // Manual fast search-replace
  Object.keys(DICTIONARY).forEach(zh => {
    const vi = DICTIONARY[zh];
    // We only replace if there's an exact match and it's not already in an i18n
    // For simplicity, we just replace exact strings with Vietnamese directly since 
    // it's local strings inside template or logic. 
    // Note: this could mess up if the word is part of a longer sentence, so we do exact string replacements
    // To be safer, we replace occurrences of `>中文<` with `>Vietnamese<`, `="中文"` with `="Vietnamese"`
    // Or just simple string replace for longer text. A simple regex approach works best.
    
    // We'll use a direct string replacement if it is surrounded by quotes, backticks, or tag brackets.
    // Replace in Vue text nodes:
    const regexText = new RegExp(`>(\\s*)${zh}(\\s*)<`, 'g');
    if (regexText.test(content)) {
        content = content.replace(regexText, `>$1${vi}$2<`);
        replaced = true;
    }

    // Replace in single/double quotes:
    // (Be careful not to replace in object keys if they are just generic words, but mostly it's fine)
    const regexQuote1 = new RegExp(`'${zh}'`, 'g');
    if (regexQuote1.test(content)) {
        content = content.replace(regexQuote1, `'${vi}'`);
        replaced = true;
    }
    const regexQuote2 = new RegExp(`"${zh}"`, 'g');
    if (regexQuote2.test(content)) {
        content = content.replace(regexQuote2, `"${vi}"`);
        replaced = true;
    }
  });

  if (replaced) {
    fs.writeFileSync(file, content, 'utf8');
    replacedTotal++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Done. Updated ${replacedTotal} files.`);
