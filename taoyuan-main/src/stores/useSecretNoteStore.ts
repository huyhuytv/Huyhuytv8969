import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { SECRET_NOTES } from '@/data/secretNotes'
import { usePlayerStore } from './usePlayerStore'
import { useInventoryStore } from './useInventoryStore'
import { addLog } from '@/composables/useGameLog'
import i18n from '@/locales'
const tText = (zh: string, vi: string) => { return i18n.global.locale.value === 'vi' ? vi : zh }


export const useSecretNoteStore = defineStore('secretNote', () => {
  /** 已收集的笔记ID列表 */
  const collectedNotes = ref<number[]>([])
  /** 已使用的笔记ID列表（宝藏类） */
  const usedNotes = ref<number[]>([])

  const totalNotes = computed(() => SECRET_NOTES.length)
  const collectedCount = computed(() => collectedNotes.value.length)

  /** 是否已收集某笔记 */
  const isCollected = (noteId: number): boolean => {
    return collectedNotes.value.includes(noteId)
  }

  /** 是否已使用某笔记 */
  const isUsed = (noteId: number): boolean => {
    return usedNotes.value.includes(noteId)
  }

  /** 是否还有未收集的笔记 */
  const hasUncollectedNotes = computed(() => {
    return collectedNotes.value.length < SECRET_NOTES.length
  })

  /** 尝试随机收集一张笔记，返回收集到的笔记ID，或null */
  const tryCollectNote = (): number | null => {
    if (!hasUncollectedNotes.value) return null
    const uncollected = SECRET_NOTES.filter(n => !collectedNotes.value.includes(n.id))
    if (uncollected.length === 0) return null
    const note = uncollected[Math.floor(Math.random() * uncollected.length)]!
    collectedNotes.value.push(note.id)
    addLog(tText(`Ghi chú bí mật được tìm thấy #${note.id}:${note.title}`, `Đã tìm thấy ghi chú bí mật #${note.id}:${note.title}`))
    return note.id
  }

  /** 使用宝藏笔记（领取奖励） */
  const useNote = (noteId: number): { success: boolean; message: string } => {
    if (!isCollected(noteId)) return { success: false, message: tText('Ghi chú này vẫn chưa được nhận.', 'Ghi chú này vẫn chưa được nhận.') }
    if (isUsed(noteId)) return { success: false, message: tText('Ghi chú này đã được sử dụng.', 'Ghi chú này đã được sử dụng.') }

    const noteDef = SECRET_NOTES.find(n => n.id === noteId)
    if (!noteDef || !noteDef.usable) return { success: false, message: tText('Ghi chú này không có sẵn.', 'Ghi chú này không có sẵn.') }

    usedNotes.value.push(noteId)

    const playerStore = usePlayerStore()
    const inventoryStore = useInventoryStore()

    const rewards: string[] = []
    if (noteDef.reward?.money) {
      playerStore.earnMoney(noteDef.reward.money)
      rewards.push(tText(`${noteDef.reward.money}văn bản`, `${noteDef.reward.money} văn`))
    }
    if (noteDef.reward?.items) {
      for (const item of noteDef.reward.items) {
        inventoryStore.addItem(item.itemId, item.quantity)
        rewards.push(`${item.itemId}×${item.quantity}`)
      }
    }

    const rewardText = rewards.join(',')
    addLog(tText(`Ghi chú bí mật đã sử dụng #${noteId}, thu được${rewardText}!`, `Đã sử dụng ghi chú bí mật #${noteId} và nhận được ${rewardText}! `))
    return { success: true, message: tText(`có${rewardText}!`, `Nhận được ${rewardText}! `) }
  }

  const serialize = () => ({
    collectedNotes: collectedNotes.value,
    usedNotes: usedNotes.value
  })

  const deserialize = (data: any) => {
    collectedNotes.value = data.collectedNotes ?? []
    usedNotes.value = data.usedNotes ?? []
  }

  return {
    collectedNotes,
    usedNotes,
    totalNotes,
    collectedCount,
    isCollected,
    isUsed,
    hasUncollectedNotes,
    tryCollectNote,
    useNote,
    serialize,
    deserialize
  }
})
