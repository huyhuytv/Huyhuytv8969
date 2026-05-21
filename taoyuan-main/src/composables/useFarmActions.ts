import { ref } from 'vue'
import { useAchievementStore } from '@/stores/useAchievementStore'
import { useBreedingStore } from '@/stores/useBreedingStore'
import { useCookingStore } from '@/stores/useCookingStore'
import { useFarmStore } from '@/stores/useFarmStore'
import { useGameStore } from '@/stores/useGameStore'
import { useInventoryStore } from '@/stores/useInventoryStore'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useQuestStore } from '@/stores/useQuestStore'
import { useShopStore } from '@/stores/useShopStore'
import { useSkillStore } from '@/stores/useSkillStore'
import { useWalletStore } from '@/stores/useWalletStore'
import { useHiddenNpcStore } from '@/stores/useHiddenNpcStore'
import { getCropById, getItemById } from '@/data'
import { getFertilizerById } from '@/data/processing'
import { ACTION_TIME_COSTS } from '@/data/timeConstants'
import type { Quality, ItemCategory } from '@/types'
import type { SeedGenetics } from '@/types/breeding'
import type { FertilizerType } from '@/types/processing'
import { shouldReturnBreedingSeed, generateGeneticsId } from '@/data/breeding'
import { addLog, showFloat } from './useGameLog'
import { handleEndDay } from './useEndDay'
import { sfxDig, sfxPlant, sfxWater, sfxHarvest, sfxLevelUp, sfxBuy, sfxCoin } from './useAudio'
import i18n from '@/locales'

const tText = (zh: string, vi: string) => {
  return i18n.global.locale.value === 'vi' ? vi : zh
}

export const QUALITY_NAMES: Record<Quality, string> = {
  get normal() { return tText('Bình thường', 'Thường') },
  get fine() { return tText('Tuyệt vời', 'Tốt') },
  get excellent() { return tText('Cửa hàng nhỏ', 'Hiếm') },
  get supreme() { return tText('điều tốt nhất', 'Cực phẩm') }
} as any

/** 仙缘结缘：作物祝福（crop_blessing）概率品质+1 */
const QUALITY_ORDER: Quality[] = ['normal', 'fine', 'excellent', 'supreme']
export const applyCropBlessing = (quality: Quality): Quality => {
  const bondBonus = useHiddenNpcStore().getBondBonusByType('crop_blessing')
  if (bondBonus?.type === 'crop_blessing' && Math.random() < bondBonus.chance) {
    const idx = QUALITY_ORDER.indexOf(quality)
    if (idx < QUALITY_ORDER.length - 1) return QUALITY_ORDER[idx + 1]!
  }
  return quality
}

// 模块级单例状态
const selectedSeed = ref<{ cropId: string; quality?: Quality } | null>(null)

/** 处理地块点击：翻耕/种植/浇水/收获 */
export const handlePlotClick = (plotId: number) => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const farmStore = useFarmStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()
  const achievementStore = useAchievementStore()

  const plot = farmStore.plots[plotId]
  if (!plot) return

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  if (plot.state === 'wasteland') {
    if (!inventoryStore.isToolAvailable('hoe')) {
      addLog(tText('Cuốc đang được nâng cấp và không thể canh tác được.', 'Cái cuốc đang được nâng cấp, không thể khai hoang.'))
      return
    }
    const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
    const ringFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
    const ringGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
    const cost = Math.max(
      1,
      Math.floor(
        3 *
          inventoryStore.getToolStaminaMultiplier('hoe') *
          (1 - skillStore.getStaminaReduction('farming')) *
          (1 - farmingBuff) *
          (1 - ringFarmReduction) *
          (1 - ringGlobalReduction)
      )
    )
    if (!playerStore.consumeStamina(cost)) {
      addLog(tText('Thể lực không đủ để tu luyện.', 'Thể lực không đủ, không thể khai hoang.'))
      return
    }
    farmStore.tillPlot(plotId)
    sfxDig()
    showFloat(tText(`-${cost}sức mạnh thể chất`, `-${cost} Thể lực`), 'danger')
    addLog(tText(`Bạn đã khai hoang một mảnh đất hoang.(-${cost}sức mạnh thể chất)`, `Bạn đã khai hoang một mảnh đất trống. (-${cost} Thể lực)`))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.till)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) {
      handleEndDay()
      return
    }
  } else if (plot.state === 'tilled' && selectedSeed.value) {
    const cropDef = getCropById(selectedSeed.value.cropId)
    if (!cropDef) return
    if (!inventoryStore.hasItem(cropDef.seedId)) {
      addLog(tText(`Không${cropDef.name}Hạt giống.`, `Hết hạt giống ${cropDef.name}.`))
      return
    }
    const plantQuality = selectedSeed.value.quality
    const cropFarmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
    const cropRingFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
    const cropRingGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
    const cost = Math.max(
      1,
      Math.floor(
        3 *
          inventoryStore.getToolStaminaMultiplier('hoe') *
          (1 - skillStore.getStaminaReduction('farming')) *
          (1 - cropFarmingBuff) *
          (1 - cropRingFarmReduction) *
          (1 - cropRingGlobalReduction)
      )
    )
    if (!playerStore.consumeStamina(cost)) {
      addLog(tText('Không đủ sức lực để gieo hạt.', 'Thể lực không đủ, không thể gieo hạt.'))
      return
    }
    inventoryStore.removeItem(cropDef.seedId, 1, plantQuality)
    farmStore.plantCrop(plotId, cropDef.id)
    sfxPlant()
    showFloat(tText(`-${cost}sức mạnh thể chất`, `-${cost} Thể lực`), 'danger')
    addLog(tText(`gieo${cropDef.name}.(-${cost}sức mạnh thể chất)`, `Đã gieo ${cropDef.name}. (-${cost} Thể lực)`))
    // 种植预警：作物可能无法在本季成熟
    const daysLeft = 28 - gameStore.day
    if (cropDef.growthDays > daysLeft) {
      const SEASON_ORDER = ['spring', 'summer', 'autumn', 'winter'] as const
      const nextSeason = SEASON_ORDER[(SEASON_ORDER.indexOf(gameStore.season) + 1) % 4]!
      if (!cropDef.season.includes(nextSeason)) {
        showFloat(tText(`${cropDef.name}Cần${cropDef.growthDays}Chúa ơi, mùa này là mùa duy nhất còn lại${daysLeft}Chúa!`, `${cropDef.name} cần ${cropDef.growthDays} ngày, mùa hiện tại chỉ còn ${daysLeft} ngày!`), 'danger')
        addLog(tText(`Lưu ý:${cropDef.name}cần${cropDef.growthDays}Trời chín nhưng mùa này chỉ còn lại một lần${daysLeft}Ngày tháng sẽ tàn lụi sau khi chuyển mùa.`, `Chú ý: ${cropDef.name} cần ${cropDef.growthDays} ngày để trưởng thành, mùa này chỉ còn ${daysLeft} ngày, qua mùa sẽ tàn úa.`))
      }
    }
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.plant)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) {
      handleEndDay()
      return
    }
  } else if (plot.state === 'planted' || plot.state === 'growing') {
    if (!inventoryStore.isToolAvailable('wateringCan')) {
      addLog(tText('Ấm đang được nâng cấp và không thể sử dụng để tưới nước.', 'Bình tưới nước đang nâng cấp, không thể tưới nước.'))
      return
    }
    if (plot.watered) {
      addLog(tText('Cánh đồng hôm nay đã được tưới nước.', 'Thửa đất này hôm nay đã được tưới nước.'))
      return
    }
    const crop = getCropById(plot.cropId!)
    const baseCost = crop?.deepWatering ? 3 : 2
    const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
    const waterRingFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
    const waterRingGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
    const cost = Math.max(
      1,
      Math.floor(
        baseCost *
          inventoryStore.getToolStaminaMultiplier('wateringCan') *
          (1 - skillStore.getStaminaReduction('farming')) *
          (1 - farmingBuff) *
          (1 - waterRingFarmReduction) *
          (1 - waterRingGlobalReduction)
      )
    )
    if (!playerStore.consumeStamina(cost)) {
      addLog(tText('Không đủ mạnh để tưới nước.', 'Thể lực không đủ, không thể tưới nước.'))
      return
    }
    farmStore.waterPlot(plotId)
    skillStore.addExp('farming', 2)
    sfxWater()
    showFloat(tText(`-${cost}sức mạnh thể chất`, `-${cost} Thể lực`), 'water')
    addLog(tText(`Việc tưới nước đã hoàn tất.(-${cost}sức mạnh thể chất)`, `Tưới nước hoàn tất. (-${cost} Thể lực)`))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.water)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) {
      handleEndDay()
      return
    }
  } else if (plot.state === 'harvestable') {
    if (!inventoryStore.isToolAvailable('scythe')) {
      addLog(tText('Lưỡi hái đang được nâng cấp và không thể thu hoạch được.', 'Liềm đang được nâng cấp, không thể thu hoạch.'))
      return
    }
    // 镰刀收获不消耗sức mạnh thể chất
    // 在收获清除前读取肥料信息
    const plotFertilizer = plot.fertilizer
    const result = farmStore.harvestPlot(plotId)
    const cropId = result.cropId
    const genetics = result.genetics
    if (cropId) {
      const cropDef = getCropById(cropId)
      const fertDef = plotFertilizer ? getFertilizerById(plotFertilizer) : null
      const ringCropQualityBonus = inventoryStore.getRingEffectValue('crop_quality_bonus')
      const allSkillsBuff = cookingStore.activeBuff?.type === 'all_skills' ? cookingStore.activeBuff.value : 0
      let quality = skillStore.rollCropQualityWithBonus((fertDef?.qualityBonus ?? 0) + ringCropQualityBonus, allSkillsBuff)
      quality = applyCropBlessing(quality)
      // 精耕细作天赋：20% 概率双倍收获
      const intensiveDouble = skillStore.getSkill('farming').perk10 === 'intensive' && Math.random() < 0.2
      // 育种产量加成：yield/100 × 30% 概率双收
      const yieldDouble = genetics && !intensiveDouble && Math.random() < (genetics.yield / 100) * 0.3
      // 桃源田庄：15% 概率额外收获
      const standardDouble = !intensiveDouble && !yieldDouble && gameStore.farmMapType === 'standard' && Math.random() < 0.15
      const harvestQty = intensiveDouble || yieldDouble || standardDouble ? 2 : 1
      inventoryStore.addItem(cropId, harvestQty, quality)
      achievementStore.discoverItem(cropId)
      achievementStore.recordCropHarvest()
      useQuestStore().onItemObtained(cropId, harvestQty)
      const { leveledUp, newLevel } = skillStore.addExp('farming', 10)
      const qualityLabel = quality !== 'normal' ? `(${QUALITY_NAMES[quality]})` : ''
      sfxHarvest()
      const qtyLabel = intensiveDouble || yieldDouble || standardDouble ? '×2' : ''
      showFloat(`+${cropDef?.name ?? cropId}${qtyLabel}${qualityLabel}`, 'success')
      let msg = tText(`thu hoạch${cropDef?.name ?? cropId}${qtyLabel}${qualityLabel}!`, `Thu hoạch được ${cropDef?.name ?? cropId}${qtyLabel}${qualityLabel}!`)
      if (intensiveDouble) msg += tText(' Thâm canh, thu hoạch gấp đôi!', ' Canh tác chuyên sâu, thu hoạch nhân đôi!')
      if (yieldDouble) msg += tText(' Thưởng năng suất chăn nuôi, thu hoạch gấp đôi!', ' Sản lượng phối giống tối ưu, thu hoạch nhân đôi!')
      if (standardDouble) msg += tText(' Đất đào màu mỡ, thêm mùa bội thu!', ' Thổ nhưỡng cực tốt, thu hoạch vượt trội!')
      // 育种Phần thưởng ngọt ngào：额外铜钱
      if (genetics && genetics.sweetness > 0 && cropDef) {
        const bonusMoney = Math.floor((cropDef.sellPrice * harvestQty * genetics.sweetness) / 200)
        if (bonusMoney > 0) {
          usePlayerStore().earnMoney(bonusMoney)
          msg += tText(` Phần thưởng ngọt ngào+${bonusMoney}văn bản`, ` Thưởng độ ngọt +${bonusMoney} văn`)
          showFloat(tText(`+${bonusMoney}văn bản`, `+${bonusMoney} văn`), 'accent')
        }
      }
      // 杂交种记录
      if (genetics?.isHybrid && genetics.hybridId) {
        useBreedingStore().recordHybridGrown(genetics.hybridId)
      }
      // 育种种子回收
      if (genetics && shouldReturnBreedingSeed(quality)) {
        const returned: SeedGenetics = { ...genetics, id: generateGeneticsId() }
        if (useBreedingStore().addToBox(returned)) {
          msg += tText(' Hạt giống đã được thu hồi.', ' Hạt giống phối được thu hồi.')
        } else {
          msg += tText(' Hộp hạt giống đầy và hạt giống bị thất lạc!', ' Hộp hạt giống đã đầy, hạt giống phối bị thất lạc!')
        }
      }
      if (leveledUp) {
        msg += tText(` Nông nghiệp được nâng cấp lên${newLevel}Mức độ!`, ` Kỹ năng Nông Canh lên cấp ${newLevel}!`)
        sfxLevelUp()
      }
      addLog(msg)
      const tr = gameStore.advanceTime(ACTION_TIME_COSTS.harvest)
      if (tr.message) addLog(tr.message)
      if (tr.passedOut) {
        handleEndDay()
        return
      }
    }
  }
}

/** 从商店购买种子 */
export const handleBuySeed = (seedId: string) => {
  const shopStore = useShopStore()
  const walletStore = useWalletStore()
  const seed = shopStore.availableSeeds.find(s => s.seedId === seedId)
  if (!seed) return
  const discount = walletStore.getShopDiscount()
  const actualPrice = Math.floor(seed.price * (1 - discount))
  if (shopStore.buySeed(seedId)) {
    sfxBuy()
    showFloat(tText(`-${actualPrice}văn bản`, `-${actualPrice} văn`), 'danger')
    addLog(tText(`đã mua${seed.cropName}hạt giống.(-${actualPrice}văn bản)`, `Đã mua hạt giống ${seed.cropName}. (-${actualPrice} văn)`))
  } else {
    addLog(tText('Không đủ tiền hoặc ba lô đã đầy.', 'Không đủ xu hoặc túi đồ đã đầy.'))
  }
}

/** 通过商店出售物品 */
export const handleSellItem = (itemId: string, quality: Quality) => {
  const shopStore = useShopStore()
  const itemDef = getItemById(itemId)
  if (!itemDef) return
  const earned = shopStore.sellItem(itemId, 1, quality)
  if (earned > 0) {
    sfxCoin()
    showFloat(`+${earned}văn bản`, 'accent')
    addLog(tText(`đã bán${itemDef.name}.(+${earned}văn bản)`, `Đã bán ${itemDef.name}. (+${earned} văn)`))
  }
}

/** 出售指定物品的全部数量 */
export const handleSellItemAll = (itemId: string, quantity: number, quality: Quality) => {
  const shopStore = useShopStore()
  const itemDef = getItemById(itemId)
  if (!itemDef || quantity <= 0) return
  const earned = shopStore.sellItem(itemId, quantity, quality)
  if (earned > 0) {
    sfxCoin()
    showFloat(`+${earned}văn bản`, 'accent')
    addLog(tText(`đã bán${itemDef.name}×${quantity}.(+${earned}văn bản)`, `Đã bán ${itemDef.name}×${quantity}. (+${earned} văn)`))
  }
}

/** 一键出售背包中所有可出售物品 */
export const handleSellAll = (filterCategories?: ItemCategory[]) => {
  const shopStore = useShopStore()
  const inventoryStore = useInventoryStore()
  let totalEarned = 0
  let totalCount = 0
  const allowed = filterCategories && filterCategories.length > 0 ? new Set(filterCategories) : null
  // 快照当前可卖物品（避免遍历中修改数组）
  const sellable = inventoryStore.items
    .filter(inv => {
      const def = getItemById(inv.itemId)
      return def && def.category !== 'seed' && !inv.locked && (!allowed || allowed.has(def.category))
    })
    .map(inv => ({ itemId: inv.itemId, quantity: inv.quantity, quality: inv.quality }))
  for (const item of sellable) {
    const earned = shopStore.sellItem(item.itemId, item.quantity, item.quality)
    if (earned > 0) {
      totalEarned += earned
      totalCount += item.quantity
    }
  }
  if (totalEarned > 0) {
    sfxCoin()
    showFloat(`+${totalEarned}văn bản`, 'accent')
    addLog(tText(`Bán với một cú nhấp chuột${totalCount}mặt hàng.(+${totalEarned}văn bản)`, `Bán nhanh ${totalCount} vật phẩm. (+${totalEarned} văn)`))
  }
}

/** 一键浇水（浇所有未浇水地块，sức mạnh thể chất不足时自动停止） */
export const handleBatchWater = () => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const farmStore = useFarmStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()

  if (!inventoryStore.isToolAvailable('wateringCan')) {
    addLog(tText('Ấm đang được nâng cấp và không thể sử dụng để tưới nước.', 'Bình tưới nước đang nâng cấp, không thể tưới nước.'))
    return
  }

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  const targets = farmStore.plots.filter(p => (p.state === 'planted' || p.state === 'growing') && !p.watered)
  if (targets.length === 0) {
    addLog(tText('Không có lô nào cần tưới nước.', 'Không có ô đất nào cần tưới nước.'))
    return
  }

  let watered = 0
  const batchRingFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
  const batchRingGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
  for (const plot of targets) {
    const crop = getCropById(plot.cropId!)
    const baseCost = crop?.deepWatering ? 3 : 2
    const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
    const cost = Math.max(
      1,
      Math.floor(
        baseCost *
          inventoryStore.getToolStaminaMultiplier('wateringCan') *
          (1 - skillStore.getStaminaReduction('farming')) *
          (1 - farmingBuff) *
          (1 - batchRingFarmReduction) *
          (1 - batchRingGlobalReduction)
      )
    )
    if (!playerStore.consumeStamina(cost)) break
    farmStore.waterPlot(plot.id)
    skillStore.addExp('farming', 2)
    watered++
  }

  if (watered > 0) {
    sfxWater()
    addLog(tText(`Tưới nước chỉ bằng một cú nhấp chuột${watered}mảnh đất.`, `Đã tưới nước nhanh ${watered} mảnh đất.`))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.batchWater * inventoryStore.getToolStaminaMultiplier('wateringCan'))
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  } else {
    addLog(tText('Không đủ mạnh để tưới nước.', 'Thể lực không đủ, không thể tưới nước.'))
  }
}

/** 一键开垦（开垦所有荒地，sức mạnh thể chất不足时自动停止） */
export const handleBatchTill = () => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const farmStore = useFarmStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()

  if (!inventoryStore.isToolAvailable('hoe')) {
    addLog(tText('Cuốc đang được nâng cấp và không thể canh tác được.', 'Cái cuốc đang được nâng cấp, không thể khai hoang.'))
    return
  }

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  const targets = farmStore.plots.filter(p => p.state === 'wasteland')
  if (targets.length === 0) {
    addLog(tText('Không có đất hoang để được khai hoang.', 'Không có mảnh đất trống nào cần khai hoang.'))
    return
  }

  let tilled = 0
  const tillRingFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
  const tillRingGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
  for (const plot of targets) {
    const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
    const cost = Math.max(
      1,
      Math.floor(
        3 *
          inventoryStore.getToolStaminaMultiplier('hoe') *
          (1 - skillStore.getStaminaReduction('farming')) *
          (1 - farmingBuff) *
          (1 - tillRingFarmReduction) *
          (1 - tillRingGlobalReduction)
      )
    )
    if (!playerStore.consumeStamina(cost)) break
    farmStore.tillPlot(plot.id)
    tilled++
  }

  if (tilled > 0) {
    sfxDig()
    addLog(tText(`Được thu hồi chỉ bằng một cú nhấp chuột${tilled}Một mảnh đất hoang.`, `Đã khai hoang nhanh ${tilled} mảnh đất.`))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.batchTill * inventoryStore.getToolStaminaMultiplier('hoe'))
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  } else {
    addLog(tText('Thể lực không đủ để tu luyện.', 'Thể lực không đủ, không thể khai hoang.'))
  }
}

/** 一键收获（收获所有成熟作物，不消耗sức mạnh thể chất） */
export const handleBatchHarvest = () => {
  const gameStore = useGameStore()
  const farmStore = useFarmStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()
  const achievementStore = useAchievementStore()

  if (!inventoryStore.isToolAvailable('scythe')) {
    addLog(tText('Lưỡi hái đang được nâng cấp và không thể thu hoạch được.', 'Liềm đang được nâng cấp, không thể thu hoạch.'))
    return
  }

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  let harvested = 0
  const harvestedCrops: string[] = []

  // 先收获khổng lồ作物
  const giantGroups = new Set<number>()
  for (const plot of farmStore.plots) {
    if (plot.state === 'harvestable' && plot.giantCropGroup !== null) {
      giantGroups.add(plot.giantCropGroup)
    }
  }
  for (const groupId of giantGroups) {
    const groupPlot = farmStore.plots.find(p => p.giantCropGroup === groupId && p.state === 'harvestable')
    if (!groupPlot) continue
    const result = farmStore.harvestGiantCrop(groupPlot.id)
    if (result) {
      const cropDef = getCropById(result.cropId)
      inventoryStore.addItem(result.cropId, result.quantity)
      achievementStore.discoverItem(result.cropId)
      achievementStore.recordCropHarvest()
      useQuestStore().onItemObtained(result.cropId, result.quantity)
      skillStore.addExp('farming', 10)
      harvested++
      harvestedCrops.push(tText(`khổng lồ${cropDef?.name ?? result.cropId}x${result.quantity}`, `${cropDef?.name ?? result.cropId} Khổng lồ x${result.quantity}`))
    }
  }

  // 再收获Bình thường作物
  const targets = farmStore.plots.filter(p => p.state === 'harvestable' && p.giantCropGroup === null)
  let seedsReturned = 0

  for (const plot of targets) {
    const plotFertilizer = plot.fertilizer
    const result = farmStore.harvestPlot(plot.id)
    const cropId = result.cropId
    const genetics = result.genetics
    if (cropId) {
      const cropDef = getCropById(cropId)
      const fertDef = plotFertilizer ? getFertilizerById(plotFertilizer) : null
      const batchRingCropQuality = inventoryStore.getRingEffectValue('crop_quality_bonus')
      const batchAllSkillsBuff = cookingStore.activeBuff?.type === 'all_skills' ? cookingStore.activeBuff.value : 0
      let quality = skillStore.rollCropQualityWithBonus((fertDef?.qualityBonus ?? 0) + batchRingCropQuality, batchAllSkillsBuff)
      quality = applyCropBlessing(quality)
      const intensiveDouble = skillStore.getSkill('farming').perk10 === 'intensive' && Math.random() < 0.2
      const yieldDouble = genetics && !intensiveDouble && Math.random() < (genetics.yield / 100) * 0.3
      const standardDouble = !intensiveDouble && !yieldDouble && gameStore.farmMapType === 'standard' && Math.random() < 0.15
      const harvestQty = intensiveDouble || yieldDouble || standardDouble ? 2 : 1
      inventoryStore.addItem(cropId, harvestQty, quality)
      achievementStore.discoverItem(cropId)
      achievementStore.recordCropHarvest()
      useQuestStore().onItemObtained(cropId, harvestQty)
      skillStore.addExp('farming', 10)
      harvested++
      harvestedCrops.push(cropDef?.name ?? cropId)
      // 育种Phần thưởng ngọt ngào
      if (genetics && genetics.sweetness > 0 && cropDef) {
        const bonusMoney = Math.floor((cropDef.sellPrice * harvestQty * genetics.sweetness) / 200)
        if (bonusMoney > 0) {
          usePlayerStore().earnMoney(bonusMoney)
        }
      }
      if (genetics?.isHybrid && genetics.hybridId) {
        useBreedingStore().recordHybridGrown(genetics.hybridId)
      }
      // 育种种子回收
      if (genetics && shouldReturnBreedingSeed(quality)) {
        const returned: SeedGenetics = { ...genetics, id: generateGeneticsId() }
        if (useBreedingStore().addToBox(returned)) seedsReturned++
      }
    }
  }

  if (seedsReturned > 0) {
    addLog(tText(`${seedsReturned}Hạt giống đã được đưa trở lại hộp hạt giống.`, `${seedsReturned} hạt giống phối đã được thu hồi vào Hộp hạt giống.`))
  }

  if (harvested > 0) {
    sfxHarvest()
    const cropCounts = new Map<string, number>()
    for (const name of harvestedCrops) {
      cropCounts.set(name, (cropCounts.get(name) ?? 0) + 1)
    }
    const cropSummary = Array.from(cropCounts.entries())
      .map(([name, count]) => (count > 1 ? `${name}x${count}` : name))
      .join(',')
    addLog(tText(`Đạt được chỉ bằng một cú nhấp chuột${harvested}Cắt:${cropSummary}.`, `Thu hoạch nhanh ${harvested} cây trồng: ${cropSummary}.`))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.batchHarvest * inventoryStore.getToolStaminaMultiplier('scythe'))
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  } else {
    addLog(tText('Không có cây trồng để thu hoạch.', 'Không có nông sản nào có thể thu hoạch.'))
  }
}

/** 一键种植（在所有空耕地上种植指定作物） */
export const handleBatchPlant = (cropId: string) => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const farmStore = useFarmStore()
  const inventoryStore = useInventoryStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()

  if (!inventoryStore.isToolAvailable('hoe')) {
    addLog(tText('Cuốc đang nâng cấp nên không thể gieo hạt được.', 'Cái cuốc đang được nâng cấp, không thể gieo hạt.'))
    return
  }

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  const cropDef = getCropById(cropId)
  if (!cropDef) return

  const targets = farmStore.plots.filter(p => p.state === 'tilled')
  if (targets.length === 0) {
    addLog(tText('Không còn đất trống để trồng trọt.', 'Không có đất cày bừa trống nào có thể trồng trọt.'))
    return
  }

  let planted = 0
  const plantRingFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
  const plantRingGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
  for (const plot of targets) {
    if (!inventoryStore.hasItem(cropDef.seedId)) break
    const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
    const cost = Math.max(
      1,
      Math.floor(
        3 *
          inventoryStore.getToolStaminaMultiplier('hoe') *
          (1 - skillStore.getStaminaReduction('farming')) *
          (1 - farmingBuff) *
          (1 - plantRingFarmReduction) *
          (1 - plantRingGlobalReduction)
      )
    )
    if (!playerStore.consumeStamina(cost)) break
    inventoryStore.removeItem(cropDef.seedId)
    farmStore.plantCrop(plot.id, cropDef.id)
    planted++
  }

  if (planted > 0) {
    sfxPlant()
    addLog(tText(`Trồng bằng một cú nhấp chuột${planted}căng thẳng${cropDef.name}.`, `Trồng nhanh ${planted} cây ${cropDef.name}.`))
    // 种植预警：作物可能无法在本季成熟
    const daysLeft = 28 - gameStore.day
    if (cropDef.growthDays > daysLeft) {
      const SEASON_ORDER = ['spring', 'summer', 'autumn', 'winter'] as const
      const nextSeason = SEASON_ORDER[(SEASON_ORDER.indexOf(gameStore.season) + 1) % 4]!
      if (!cropDef.season.includes(nextSeason)) {
        showFloat(tText(`${cropDef.name}Cần${cropDef.growthDays}Chúa ơi, mùa này là mùa duy nhất còn lại${daysLeft}Chúa!`, `${cropDef.name} cần ${cropDef.growthDays} ngày, mùa hiện tại chỉ còn ${daysLeft} ngày!`), 'danger')
        addLog(tText(`Lưu ý:${cropDef.name}cần${cropDef.growthDays}Trời chín nhưng mùa này chỉ còn lại một lần${daysLeft}Ngày tháng sẽ tàn lụi sau khi chuyển mùa.`, `Chú ý: ${cropDef.name} cần ${cropDef.growthDays} ngày để trưởng thành, mùa này chỉ còn ${daysLeft} ngày, qua mùa sẽ tàn úa.`))
      }
    }
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.plant * Math.min(planted, 3))
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  } else {
    addLog(tText('Không đủ năng lượng hoặc hạt giống để trồng.', 'Thể lực hoặc hạt giống không đủ, không thể trồng.'))
  }
}

/** 一键bón phân（给所有未bón phân的非荒地施指定肥料） */
export const handleBatchFertilize = (fertilizerType: FertilizerType) => {
  const gameStore = useGameStore()
  const farmStore = useFarmStore()
  const inventoryStore = useInventoryStore()

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  const fertDef = getFertilizerById(fertilizerType)
  if (!fertDef) return

  const targets = farmStore.plots.filter(p => p.state !== 'wasteland' && !p.fertilizer)
  if (targets.length === 0) {
    addLog(tText('Không có mảnh đất nào để bón phân.', 'Không có ô đất nào có thể bón phân.'))
    return
  }

  let applied = 0
  for (const plot of targets) {
    if (!inventoryStore.hasItem(fertilizerType)) break
    if (!inventoryStore.removeItem(fertilizerType)) break
    if (farmStore.applyFertilizer(plot.id, fertilizerType)) {
      applied++
    } else {
      inventoryStore.addItem(fertilizerType)
      break
    }
  }

  if (applied > 0) {
    showFloat(tText(`bón phân ×${applied}`, `Bón phân ×${applied}`), 'success')
    addLog(tText(`Truyền bằng một cú nhấp chuột${applied}mảnh đất${fertDef.name}.`, `Bón nhanh phân ${fertDef.name} cho ${applied} mảnh đất.`))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.plant * Math.min(applied, 3))
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  } else {
    addLog(tText('Không đủ phân để bón.', 'Phân bón không đủ, không thể bón phân.'))
  }
}

/** 铲除单块作物 */
export const handleRemoveCrop = (plotId: number) => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const farmStore = useFarmStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()
  const inventoryStore = useInventoryStore()

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  const plot = farmStore.plots[plotId]
  if (!plot) return
  if (plot.state !== 'planted' && plot.state !== 'growing' && plot.state !== 'harvestable') {
    addLog(tText('Lô đất không có cây trồng để diệt trừ.', 'Ô đất này không có cây trồng nào để nhổ bỏ.'))
    return
  }

  const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
  const ringFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
  const ringGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
  const cost = Math.max(
    1,
    Math.floor(
      2 * (1 - skillStore.getStaminaReduction('farming')) * (1 - farmingBuff) * (1 - ringFarmReduction) * (1 - ringGlobalReduction)
    )
  )
  if (!playerStore.consumeStamina(cost)) {
    addLog(tText('Không đủ sức mạnh thể chất để tiêu diệt.', 'Thể lực không đủ, không thể nhổ bỏ.'))
    return
  }

  const result = farmStore.removeCrop(plotId)
  if (result.cropId) {
    const cropDef = getCropById(result.cropId)
    sfxDig()
    addLog(tText(`bị diệt trừ${cropDef?.name ?? result.cropId}.`, `Nhổ bỏ ${cropDef?.name ?? result.cropId}.`))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.till)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  }
}

/** 除虫（单块） */
export const handleCurePest = (plotId: number) => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const farmStore = useFarmStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()
  const inventoryStore = useInventoryStore()

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  const plot = farmStore.plots[plotId]
  if (!plot || !plot.infested) {
    addLog(tText('Cốt truyện không có sâu bệnh.', 'Ô đất này không có sâu bệnh.'))
    return
  }

  const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
  const ringFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
  const ringGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
  const cost = Math.max(
    1,
    Math.floor(
      2 * (1 - skillStore.getStaminaReduction('farming')) * (1 - farmingBuff) * (1 - ringFarmReduction) * (1 - ringGlobalReduction)
    )
  )
  if (!playerStore.consumeStamina(cost)) {
    addLog(tText('Không đủ sức mạnh thể chất để loại bỏ sâu bệnh.', 'Thể lực không đủ, không thể diệt trừ sâu bệnh.'))
    return
  }

  if (farmStore.curePest(plotId)) {
    sfxDig()
    addLog(tText('Sự phá hoại của sâu bệnh được loại bỏ.', 'Đã diệt trừ sâu bệnh.'))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.till)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  }
}

/** 一键除虫（清除所有虫害地块，sức mạnh thể chất不足时自动停止） */
export const handleBatchCurePest = () => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const farmStore = useFarmStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()
  const inventoryStore = useInventoryStore()

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  const targets = farmStore.plots.filter(p => p.infested)
  if (targets.length === 0) {
    addLog(tText('Không có lô nào cần kiểm soát dịch hại.', 'Không có ô đất nào có sâu bệnh cần diệt trừ.'))
    return
  }

  let cured = 0
  const batchRingFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
  const batchRingGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
  for (const plot of targets) {
    const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
    const cost = Math.max(
      1,
      Math.floor(
        2 *
          (1 - skillStore.getStaminaReduction('farming')) *
          (1 - farmingBuff) *
          (1 - batchRingFarmReduction) *
          (1 - batchRingGlobalReduction)
      )
    )
    if (!playerStore.consumeStamina(cost)) break
    farmStore.curePest(plot.id)
    cured++
  }

  if (cured > 0) {
    sfxDig()
    addLog(tText(`Loại bỏ sâu bệnh chỉ bằng một cú nhấp chuột${cured}mảnh đất.`, `Diệt sâu nhanh cho ${cured} mảnh đất.`))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.batchTill)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  } else {
    addLog(tText('Không đủ sức mạnh thể chất để loại bỏ sâu bệnh.', 'Thể lực không đủ, không thể diệt trừ sâu bệnh.'))
  }
}

/** 除草（单块） */
export const handleClearWeed = (plotId: number) => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const farmStore = useFarmStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()
  const inventoryStore = useInventoryStore()

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  const plot = farmStore.plots[plotId]
  if (!plot || !plot.weedy) {
    addLog(tText('Lô đ���t không có cỏ dại.', 'Mảnh đất này không có cỏ dại.'))
    return
  }

  const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
  const ringFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
  const ringGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
  const cost = Math.max(
    1,
    Math.floor(
      2 * (1 - skillStore.getStaminaReduction('farming')) * (1 - farmingBuff) * (1 - ringFarmReduction) * (1 - ringGlobalReduction)
    )
  )
  if (!playerStore.consumeStamina(cost)) {
    addLog(tText('Không đủ mạnh để làm cỏ.', 'Thể lực không đủ, không thể dọn cỏ.'))
    return
  }

  if (farmStore.clearWeed(plotId)) {
    sfxDig()
    addLog(tText('Đã dọn sạch cỏ dại.', 'Đã dọn sạch cỏ dại.'))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.till)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  }
}

/** 一键除草（清除所有杂草地块，sức mạnh thể chất不足时自动停止） */
export const handleBatchClearWeed = () => {
  const gameStore = useGameStore()
  const playerStore = usePlayerStore()
  const farmStore = useFarmStore()
  const skillStore = useSkillStore()
  const cookingStore = useCookingStore()
  const inventoryStore = useInventoryStore()

  if (gameStore.isPastBedtime) {
    addLog(tText('Đã sáng sớm rồi2Hết rồi, cậu phải nghỉ ngơi.', 'Đã 2 giờ sáng rồi, bạn bắt buộc phải nghỉ ngơi.'))
    handleEndDay()
    return
  }

  const targets = farmStore.plots.filter(p => p.weedy)
  if (targets.length === 0) {
    addLog(tText('Không có mảnh đất nào để làm cỏ.', 'Không có ô đất nào có cỏ dại cần dọn dẹp.'))
    return
  }

  let cleared = 0
  const batchRingFarmReduction = inventoryStore.getRingEffectValue('farming_stamina')
  const batchRingGlobalReduction = inventoryStore.getRingEffectValue('stamina_reduction')
  for (const plot of targets) {
    const farmingBuff = cookingStore.activeBuff?.type === 'farming' ? cookingStore.activeBuff.value / 100 : 0
    const cost = Math.max(
      1,
      Math.floor(
        2 *
          (1 - skillStore.getStaminaReduction('farming')) *
          (1 - farmingBuff) *
          (1 - batchRingFarmReduction) *
          (1 - batchRingGlobalReduction)
      )
    )
    if (!playerStore.consumeStamina(cost)) break
    farmStore.clearWeed(plot.id)
    cleared++
  }

  if (cleared > 0) {
    sfxDig()
    addLog(tText(`Làm cỏ chỉ bằng một cú nhấp chuột${cleared}mảnh đất.`, `Dọn cỏ nhanh cho ${cleared} mảnh đất.`))
    const tr = gameStore.advanceTime(ACTION_TIME_COSTS.batchTill)
    if (tr.message) addLog(tr.message)
    if (tr.passedOut) handleEndDay()
  } else {
    addLog(tText('Không đủ mạnh để làm cỏ.', 'Thể lực không đủ, không thể dọn cỏ.'))
  }
}

export const useFarmActions = () => {
  return {
    selectedSeed,
    handlePlotClick,
    handleBuySeed,
    handleSellItem,
    handleSellItemAll,
    handleSellAll,
    handleBatchWater,
    handleBatchTill,
    handleBatchHarvest,
    QUALITY_NAMES
  }
}
