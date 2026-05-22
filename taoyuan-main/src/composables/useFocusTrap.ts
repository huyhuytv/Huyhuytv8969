import { customRef, nextTick, watch, type Ref, onMounted, onUnmounted } from 'vue'

export function useFocusTrap(containerRef: Ref<HTMLElement | null>, options?: { initialFocus?: string | boolean; returnFocus?: boolean }) {
  let previousFocus: HTMLElement | null = null
  let isTrapping = false

  const focusableSelector = 'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isTrapping || !containerRef.value) return
    if (e.key !== 'Tab') return

    const focusableElements = Array.from(containerRef.value.querySelectorAll<HTMLElement>(focusableSelector))
    if (focusableElements.length === 0) {
      e.preventDefault()
      return
    }

    const firstElement = focusableElements[0]!
    const lastElement = focusableElements[focusableElements.length - 1]!

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }

  const startTrap = () => {
    if (isTrapping) return
    isTrapping = true
    previousFocus = document.activeElement as HTMLElement
    document.addEventListener('keydown', handleKeyDown)

    nextTick(() => {
      if (!containerRef.value) return
      
      if (options?.initialFocus === false) return
      
      const focusableElements = Array.from(containerRef.value.querySelectorAll<HTMLElement>(focusableSelector))
      if (focusableElements.length > 0) {
        if (typeof options?.initialFocus === 'string') {
          const el = containerRef.value.querySelector<HTMLElement>(options.initialFocus)
          if (el) el.focus()
          else focusableElements[0]!.focus()
        } else {
          focusableElements[0]!.focus()
        }
      } else {
        containerRef.value.focus()
      }
    })
  }

  const stopTrap = () => {
    if (!isTrapping) return
    isTrapping = false
    document.removeEventListener('keydown', handleKeyDown)
    if (options?.returnFocus !== false && previousFocus) {
      try {
        previousFocus.focus()
      } catch (e) {
        // ignore
      }
    }
  }

  watch(containerRef, (el) => {
    if (el) {
      startTrap()
    } else {
      stopTrap()
    }
  }, { immediate: true })

  onUnmounted(() => {
    stopTrap()
  })
}
