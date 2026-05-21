import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { RecipeDef, Quality } from '@/types'
import { getRecipeById } from '@/data'
import { useInventoryStore } from './useInventoryStore'
import { usePlayerStore } from './usePlayerStore'
import { useSkillStore } from './useSkillStore'
import { useAchievementStore } from './useAchievementStore'
import { useWalletStore } from './useWalletStore'
import { useHomeStore } from './useHomeStore'
import { useHiddenNpcStore } from './useHiddenNpcStore'
import { getCombinedItemCount, removeCombinedItem, getLowestCombinedQuality } from '@/composables/useCombinedInventory'
import i18n from '@/locales'
const tText = (zh: string, vi: string) => { return i18n.global.locale.value === 'vi' ? vi : zh }


const QUALITY_ORDER: Quality[] = ['normal', 'fine', 'excellent', 'supreme']
const QUALITY_MULTIPLIER: Record<Quality, number> = { normal: 1, fine: 1.25, excellent: 1.5, supreme: 2 }
const QUALITY_LABEL: Record<Quality, string> = { normal: '', fine: tText('Tuyệt vời', 'xuất sắc'), excellent: tText('Cửa hàng nhỏ', 'Cửa hàng nhỏ'), supreme: tText('điều tốt nhất', 'điều tốt nhất') }

export const useCookingStore = defineStore('cooking', () => {
  const inventoryStore = useInventoryStore()
  const playerStore = usePlayerStore()
  const skillStore = useSkillStore()

  /** 已解锁的食谱ID列表 */
  const unlockedRecipes = ref<string[]>([
    'stir_fried_cabbage',
    'honey_tea',
    'ginger_soup',
    'bamboo_shoot_stir_fry',
    'dried_persimmon',
    'sesame_paste',
    'corn_pancake',
    'scrambled_egg_rice',
    'stir_fried_potato',
    'boiled_egg',
    'congee',
    'roasted_sweet_potato',
    'vegetable_soup',
    'chive_egg_stir_fry',
    'peanut_candy',
    'silkie_egg_soup'
  ])

  /** 当天生效的食物增益 */
  const activeBuff = ref<RecipeDef['effect']['buff'] | null>(null)

  /** 已解锁的食谱定义 */
  const recipes = computed(() => unlockedRecipes.value.map(id => getRecipeById(id)).filter((r): r is RecipeDef => r !== undefined))

  /** 检查是否有足够材料 */
  const canCook = (recipeId: string): boolean => {
    const recipe = getRecipeById(recipeId)
    if (!recipe) return false
    if (!unlockedRecipes.value.includes(recipeId)) return false
    // 检查技能等级门槛
    if (recipe.requiredSkill) {
      const skill = skillStore.getSkill(recipe.requiredSkill.type)
      if (skill.level < recipe.requiredSkill.level) return false
    }
    return recipe.ingredients.every(ing => getCombinedItemCount(ing.itemId) >= ing.quantity)
  }

  /** 计算最多能烹饪几phần */
  const maxCookable = (recipeId: string): number => {
    const recipe = getRecipeById(recipeId)
    if (!recipe) return 0
    if (!unlockedRecipes.value.includes(recipeId)) return 0
    if (recipe.requiredSkill) {
      const skill = skillStore.getSkill(recipe.requiredSkill.type)
      if (skill.level < recipe.requiredSkill.level) return 0
    }
    let max = Infinity
    for (const ing of recipe.ingredients) {
      const available = getCombinedItemCount(ing.itemId)
      max = Math.min(max, Math.floor(available / ing.quantity))
    }
    return max === Infinity ? 0 : max
  }

  /** 预览烹饪品质（取所有材料最低品质） */
  const previewCookQuality = (recipeId: string): Quality => {
    const recipe = getRecipeById(recipeId)
    if (!recipe) return 'normal'
    let minIdx = 3
    for (const ing of recipe.ingredients) {
      const q = getLowestCombinedQuality(ing.itemId)
      const idx = QUALITY_ORDER.indexOf(q)
      if (idx < minIdx) minIdx = idx
    }
    return QUALITY_ORDER[minIdx]!
  }

  /** 烹饪 */
  const cook = (recipeId: string, quantity: number = 1): { success: boolean; message: string } => {
    const recipe = getRecipeById(recipeId)
    if (!recipe) return { success: false, message: tText('Công thức không tồn tại.', 'Công thức không tồn tại.') }
    if (!unlockedRecipes.value.includes(recipeId)) return { success: false, message: tText('Công thức này vẫn chưa được mở khóa.', 'Công thức này vẫn chưa được mở khóa.') }

    // 计算最多能做几phần
    let maxPossible = quantity
    for (const ing of recipe.ingredients) {
      const available = getCombinedItemCount(ing.itemId)
      maxPossible = Math.min(maxPossible, Math.floor(available / ing.quantity))
    }
    if (maxPossible <= 0) return { success: false, message: tText('Không đủ vật liệu.', 'Không đủ vật liệu.') }

    // 计算品质（取所有材料中最低品质）
    let minQualityIndex = 3
    for (const ing of recipe.ingredients) {
      const quality = getLowestCombinedQuality(ing.itemId)
      const idx = QUALITY_ORDER.indexOf(quality)
      if (idx < minQualityIndex) minQualityIndex = idx
    }
    const resultQuality = QUALITY_ORDER[minQualityIndex]!

    // 批量消耗材料
    for (const ing of recipe.ingredients) {
      removeCombinedItem(ing.itemId, ing.quantity * maxPossible)
    }

    // 添加食物到背包
    inventoryStore.addItem(`food_${recipe.id}`, maxPossible, resultQuality)
    for (let i = 0; i < maxPossible; i++) {
      useAchievementStore().recordRecipeCooked()
    }
    const qualityTag = QUALITY_LABEL[resultQuality] ? `【${QUALITY_LABEL[resultQuality]}】` : ''
    const qtyTag = maxPossible > 1 ? tText(`${maxPossible}phần`, `${maxPossible} bản`) : ''
    return { success: true, message: tText(`nấu chín${qtyTag}${qualityTag}${recipe.name}!`, `Nấu ăn ${qtyTag}${qualityTag}${recipe.name}! `) }
  }

  /** 食用烹饪品 */
  const eat = (recipeId: string, quality: Quality = 'normal'): { success: boolean; message: string } => {
    const foodItemId = `food_${recipeId}`
    if (!inventoryStore.removeItem(foodItemId, 1, quality)) {
      return { success: false, message: tText('Không có thức ăn như vậy trong ba lô.', 'Không có thức ăn như vậy trong ba lô.') }
    }

    const recipe = getRecipeById(recipeId)
    if (!recipe) return { success: false, message: tText('Dữ liệu công thức bị mất.', 'Dữ liệu công thức bị mất.') }

    // 品质加成
    const qualityBonus = QUALITY_MULTIPLIER[quality]
    // 炼金师专精：食物恢复+50%
    const walletStore = useWalletStore()
    const homeStore = useHomeStore()
    const chefBonus = 1 + walletStore.getCookingRestoreBonus()
    const alchemistBonus = skillStore.getSkill('foraging').perk10 === 'alchemist' ? 1.5 : 1.0
    const kitchenBonus = homeStore.getKitchenBonus()
    // 仙缘能力：月膳（yue_tu_2）食物恢复+50%
    const moonRabbitBonus = useHiddenNpcStore().isAbilityActive('yue_tu_2') ? 1.5 : 1.0
    const staminaRestore = Math.floor(
      recipe.effect.staminaRestore * qualityBonus * alchemistBonus * chefBonus * kitchenBonus * moonRabbitBonus
    )
    playerStore.restoreStamina(staminaRestore)
    const qualityTag = QUALITY_LABEL[quality] ? `【${QUALITY_LABEL[quality]}】` : ''
    let msg = tText(`đã ăn${qualityTag}${recipe.name}, khôi phục${staminaRestore}sức mạnh thể chất`, `Sau khi ăn ${qualityTag}${recipe.name}, hãy khôi phục thể lực ${staminaRestore}`)

    if (recipe.effect.healthRestore) {
      const healthRestore = Math.floor(
        recipe.effect.healthRestore * qualityBonus * alchemistBonus * chefBonus * kitchenBonus * moonRabbitBonus
      )
      playerStore.restoreHealth(healthRestore)
      msg += tText(`,${healthRestore}HP`, `,${healthRestore}giá trị sức khỏe`)
    }
    msg += '.'

    if (recipe.effect.buff) {
      activeBuff.value = { ...recipe.effect.buff }
      msg += ` ${recipe.effect.buff.description}`
      // 「sức mạnh thể chất全恢复」类buff：立即将sức mạnh thể chất回满
      if (recipe.effect.buff.type === 'stamina') {
        playerStore.restoreStamina(playerStore.maxStamina)
      }
    }

    return { success: true, message: msg }
  }

  /** 解锁食谱 */
  const unlockRecipe = (recipeId: string): boolean => {
    if (unlockedRecipes.value.includes(recipeId)) return false
    const recipe = getRecipeById(recipeId)
    if (!recipe) return false
    unlockedRecipes.value.push(recipeId)
    return true
  }

  /** 每日重置增益 */
  const dailyReset = () => {
    activeBuff.value = null
  }

  const serialize = () => {
    return { unlockedRecipes: unlockedRecipes.value, activeBuff: activeBuff.value }
  }

  const deserialize = (data: ReturnType<typeof serialize>) => {
    unlockedRecipes.value = data.unlockedRecipes
    activeBuff.value = data.activeBuff
  }

  return {
    unlockedRecipes,
    activeBuff,
    recipes,
    canCook,
    maxCookable,
    previewCookQuality,
    cook,
    eat,
    unlockRecipe,
    dailyReset,
    serialize,
    deserialize
  }
})
