const fs = require('fs');

let content = fs.readFileSync('./taoyuan-main/src/views/game/ShopView.vue', 'utf8');

const replacements = [
  ["'效果：' +", "(i18n.global.locale.value === 'vi' ? 'Hiệu quả: ' : '效果：') +"],
  ["'材料：' +", "(i18n.global.locale.value === 'vi' ? 'Vật liệu: ' : '材料：') +"],
  ["` + ${ring.recipeMoney}文`", "i18n.global.locale.value === 'vi' ? ` + ${ring.recipeMoney} xu` : ` + ${ring.recipeMoney}文`"],
  ["` + ${hat.recipeMoney}文`", "i18n.global.locale.value === 'vi' ? ` + ${hat.recipeMoney} xu` : ` + ${hat.recipeMoney}文`"],
  ["` + ${shoe.recipeMoney}文`", "i18n.global.locale.value === 'vi' ? ` + ${shoe.recipeMoney} xu` : ` + ${shoe.recipeMoney}文`"],
  ["return `剩余${quantity}个`", "return i18n.global.locale.value === 'vi' ? `Còn ${quantity} cái` : `剩余${quantity}个`"],
  ["attack_bonus: '攻击',", "attack_bonus: i18n.global.locale.value === 'vi' ? 'Công' : '攻击',"],
  ["crit_rate_bonus: '暴击',", "crit_rate_bonus: i18n.global.locale.value === 'vi' ? 'Bạo kích' : '暴击',"],
  ["defense_bonus: '减伤',", "defense_bonus: i18n.global.locale.value === 'vi' ? 'Giảm sát thương' : '减伤',"],
  ["vampiric: '吸血',", "vampiric: i18n.global.locale.value === 'vi' ? 'Hút máu' : '吸血',"],
  ["max_hp_bonus: '生命',", "max_hp_bonus: i18n.global.locale.value === 'vi' ? 'Máu' : '生命',"],
  ["stamina_reduction: '全局体力减免',", "stamina_reduction: i18n.global.locale.value === 'vi' ? 'Giảm tiêu hao thể lực' : '全局体力减免',"],
  ["mining_stamina: '挖矿体力减免',", "mining_stamina: i18n.global.locale.value === 'vi' ? 'Giảm thể lực đào mỏ' : '挖矿体力减免',"],
  ["farming_stamina: '农耕体力减免',", "farming_stamina: i18n.global.locale.value === 'vi' ? 'Giảm thể lực làm nông' : '农耕体力减免',"],
  ["fishing_stamina: '钓鱼体力减免',", "fishing_stamina: i18n.global.locale.value === 'vi' ? 'Giảm thể lực câu cá' : '钓鱼体力减免',"],
  ["crop_quality_bonus: '作物品质',", "crop_quality_bonus: i18n.global.locale.value === 'vi' ? 'Chất lượng nông sản' : '作物品质',"],
  ["crop_growth_bonus: '生长加速',", "crop_growth_bonus: i18n.global.locale.value === 'vi' ? 'Tăng tốc phát triển' : '生长加速',"],
  ["fish_quality_bonus: '鱼品质',", "fish_quality_bonus: i18n.global.locale.value === 'vi' ? 'Chất lượng cá' : '鱼品质',"],
  ["fishing_calm: '鱼速降低',", "fishing_calm: i18n.global.locale.value === 'vi' ? 'Giảm tốc độ cá' : '鱼速降低',"],
  ["sell_price_bonus: '售价加成',", "sell_price_bonus: i18n.global.locale.value === 'vi' ? 'Tăng giá bán' : '售价加成',"],
  ["shop_discount: '商店折扣',", "shop_discount: i18n.global.locale.value === 'vi' ? 'Giảm giá cửa hàng' : '商店折扣',"],
  ["gift_friendship: '送礼好感',", "gift_friendship: i18n.global.locale.value === 'vi' ? 'Độ hảo cảm quà tặng' : '送礼好感',"],
  ["monster_drop_bonus: '怪物掉落',", "monster_drop_bonus: i18n.global.locale.value === 'vi' ? 'Rớt đồ quái vật' : '怪物掉落',"],
  ["exp_bonus: '经验加成',", "exp_bonus: i18n.global.locale.value === 'vi' ? 'Tăng kinh nghiệm' : '经验加成',"],
  ["treasure_find: '宝箱概率',", "treasure_find: i18n.global.locale.value === 'vi' ? 'Xác suất rương báu' : '宝箱概率',"],
  ["ore_bonus: '矿石额外',", "ore_bonus: i18n.global.locale.value === 'vi' ? 'Quặng bổ sung' : '矿石额外',"],
  ["luck: '幸运',", "luck: i18n.global.locale.value === 'vi' ? 'May mắn' : '幸运',"],
  ["travel_speed: '旅行加速'", "travel_speed: i18n.global.locale.value === 'vi' ? 'Tăng tốc độ di chuyển' : '旅行加速'"],
  ["crop: '作物',", "crop: i18n.global.locale.value === 'vi' ? 'Nông sản' : '作物',"],
  ["fruit: '水果',", "fruit: i18n.global.locale.value === 'vi' ? 'Hoa quả' : '水果',"],
  ["fish: '鱼类',", "fish: i18n.global.locale.value === 'vi' ? 'Cá' : '鱼类',"],
  ["animal_product: '畜产',", "animal_product: i18n.global.locale.value === 'vi' ? 'Động vật' : '畜产',"],
  ["processed: '加工品',", "processed: i18n.global.locale.value === 'vi' ? 'Đồ chế biến' : '加工品',"],
  ["food: '料理',", "food: i18n.global.locale.value === 'vi' ? 'Món ăn' : '料理',"],
  ["ore: '矿石',", "ore: i18n.global.locale.value === 'vi' ? 'Quặng' : '矿石',"],
  ["gem: '宝石',", "gem: i18n.global.locale.value === 'vi' ? 'Đá quý' : '宝石',"],
  ["material: '材料',", "material: i18n.global.locale.value === 'vi' ? 'Vật liệu' : '材料',"],
  ["gift: '礼物',", "gift: i18n.global.locale.value === 'vi' ? 'Quà tặng' : '礼物',"],
  ["fossil: '化石',", "fossil: i18n.global.locale.value === 'vi' ? 'Hóa thạch' : '化石',"],
  ["artifact: '文物',", "artifact: i18n.global.locale.value === 'vi' ? 'Cổ vật' : '文物',"],
  ["misc: '杂货'", "misc: i18n.global.locale.value === 'vi' ? 'Tạp hóa' : '杂货'"],
  ["return (i18n.global.locale.value === 'vi' ? 'Tổng hợp' : '合成')", "return i18n.global.locale.value === 'vi' ? 'Chế tạo' : '合成'"]
];

replacements.forEach(([search, replace]) => {
  content = content.replace(search, replace);
  content = content.replace(search, replace); // Just in case it appears multiple times
});

fs.writeFileSync('./taoyuan-main/src/views/game/ShopView.vue', content);
console.log('ShopView replaced');
