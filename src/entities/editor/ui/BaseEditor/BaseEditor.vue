<template>
  <div class="wrapper-editor" ref="wrapper">
    <div
      id="editable"
      ref="editable"
      role="textbox"
      class="app-editor"
      contenteditable="true"
      spellcheck="true"
      :disabled="isDisabled"
      :placeholder="isFocusedEditor || isFirstClick ? '' : props.placeholder"
      @input="onInput"
      @blur="onBlur"
      @keydown="onPress"
      @click="saveSelection"
      @focus="restoreSelection"
      @paste="onPaste"
    />

    <!-- Features -->
    <div class="app-editor-features">
      <div class="flex flex-col items-center justify-start mb-12 gap-1">
        <feature-h2
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          @add-h2-text="handleHeadText"
          @open-modal="setCurrentModal"
        />

        <feature-h3
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          @add-h3-text="handleHeadText"
          @open-modal="setCurrentModal"
        />

        <feature-h4
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          @add-h4-text="handleHeadText"
          @open-modal="setCurrentModal"
        />

        <feature-strong
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          @add-text-strong="handleTextStrongSelection"
          @open-modal="setCurrentModal"
        />

        <feature-quote
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          :status="statusQuoteIsChanged"
          @add-text-quote="handleQuoteSelection"
          @open-modal="setCurrentModal"
        />

        <feature-italic
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          :status="statusQuoteIsChanged"
          @add-italic-text="handleItalicText"
          @open-modal="setCurrentModal"
        />

        <feature-text-through
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          @add-text-through="handleTextThroughSelection"
          @open-modal="setCurrentModal"
        />

        <feature-list
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          @add-list="handleList"
          @open-modal="setCurrentModal"
        />

        <feature-hr
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          @add-hr="handleHr"
          @open-modal="setCurrentModal"
        />

        <feature-upload-image
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          :maxSize="CONFIG_IMAGE.fileSize"
          :accept="CONFIG_IMAGE.formats"
          @upload="uploadImage"
        />

        <feature-text-link
          v-if="currentModeEditor === ModeEditor.ADVANCED"
          :current-modal="isCurrentModal"
          @add-link="handleTextLinkSelection"
          @open-modal="setCurrentModal"
        />
      </div>

      <!-- <div class="flex flex-col items-center justify-start">
        <feature-prev @to-prev="handlePrevEvent" />

        <feature-next @to-next="handleNextEvent" />
      </div> -->
    </div>

    <!-- Submit -->
    <!-- <template v-if="typeSubmit === TYPE_SUBMIT.BUTTON">
      <button
        type="button"
        role="button"
        class="absolute bottom-2 right-24 w-24 bg-tt flex items-center justify-center rounded-md px-4 py-1 text-white transition hover:bg-grandlight xss:px-2 z-50 cursor-pointer"
        :class="getStringHTMLContent && getStringHTMLContent.length > 0 ? '' : ''"
        :disabled="disableEditor"
        @click="sendHTMLContent"
      >
        <span class="text-base font-[400] xss:hidden">Save</span>
      </button>
    </template> -->
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { ModeEditor, CONFIG_IMAGE, TYPE_SUBMIT } from '@/entities/editor/model/types'
import { useFocus, onClickOutside } from '@vueuse/core'

const FeatureH2 = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureH2.vue')
)
const FeatureH3 = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureH3.vue')
)
const FeatureH4 = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureH4.vue')
)
const FeatureStrong = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureStrong.vue')
)
const FeatureQuote = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureQuote.vue')
)
const FeatureItalic = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureItalic.vue')
)
const FeatureTextThrough = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureTextThrough.vue')
)
const FeatureList = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureList.vue')
)
const FeatureHr = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureHr.vue')
)
const FeaturePrev = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeaturePrev.vue')
)
const FeatureNext = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureNext.vue')
)
const FeatureUploadImage = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureUploadImage.vue')
)
const FeatureTextLink = defineAsyncComponent(
  () => import('@/entities/editor/ui/BaseEditor/features/FeatureTextLink.vue')
)

interface IProps {
  // userId: number
  mode?: string
  placeholder?: string
  typeSubmit?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  mode: ModeEditor.BASE,
  placeholder: 'default',
  typeSubmit: 'none',
  disabled: false
})

const emit = defineEmits(['click', 'send'])

const currentModeEditor = ref(props.mode)

const wrapper: Ref<HTMLDivElement | null> = ref(null)
const editable: Ref<HTMLElement | null> = ref(null)
const savedRange = ref(null)

const isDisabled: Ref<boolean> = ref(props.disabled)
const isFirstClick: Ref<boolean> = ref(false)
const isFocusedEditor: Ref<boolean> = ref(false)
const isCurrentModal: Ref<string> = ref('')
const statusQuoteIsChanged: Ref<boolean> = ref(false)
const checkLastSiblingsBr: Ref<number> = ref(0)
const isLastActiveLi: Ref<boolean> = ref(false)
const disableEditor: Ref<boolean> = ref(false)

const { focused } = useFocus(editable)

const click = () => {
  if (!props.disabled) {
    emit('click')
  }
}

const onInput = (event: Event): void => {
  let selection: any
  selection = window.getSelection()
  statusQuoteIsChanged.value = true

  if (selection !== null) {
    const htmlTag = selection.anchorNode.parentNode.tagName
    const target = event.target as HTMLElement

    switch (htmlTag) {
      case 'STRONG':
        setCurrentModal('text-strong')
        break
      case 'BLOCKQUOTE':
        setCurrentModal('text-quote')
        break
      case 'A':
        setCurrentModal('text-link')
        event.preventDefault()
        return
      case 'H2':
        setCurrentModal('text-h2')
        break
      case 'H3':
        setCurrentModal('text-h3')
        break
      case 'H4':
        setCurrentModal('text-h4')
        break
      case 'S':
        setCurrentModal('text-through')
        break
      case 'I':
        setCurrentModal('text-italic')
        break
      case 'UL':
      case 'LI':
        setCurrentModal('text-list')
        break
      default:
        setCurrentModal('')
        editable.value = target
    }

    checkLastSiblingsBr.value = 0
  }
}

const onBlur = () => {
  // Send to backend API
  // emit('send', editable.value?.innerHTML)

  saveSelection()
}

const onPress = (event) => {
  if (event.keyCode == 13) {
    event.preventDefault()

    handleLineBreak()
  }
}

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault()

  let selection: any
  selection = window.getSelection()
  const text = event.clipboardData ? event.clipboardData.getData('text/plain') : ''

  if (document.queryCommandSupported?.('insertText')) {
    return document.execCommand('insertText', false, text)
  }

  if (selection === null) return

  const range = selection.getRangeAt(0)
  range.deleteContents()
  range.insertNode(new Text(text))
  range.collapse()
  selection.removeAllRanges()
  selection.addRange(range)
}

const handleLineBreak = () => {
  let selection: any
  let range: any
  selection = window.getSelection()

  editable.value!.focus()

  checkLastSiblingsBr.value += 1
  statusQuoteIsChanged.value = true

  if (selection !== null) {
    const br = document.createElement('br')
    const zeroSpace = document.createTextNode('\u200b')

    range = selection.getRangeAt(0)
    const nodeContainer = range.commonAncestorContainer.parentElement?.tagName

    if (nodeContainer === 'A') {
      setCurrentModal('')

      range.deleteContents()
      range.setEndAfter(selection.anchorNode.parentNode)
      range.deleteContents()
      range.insertNode(br)
      range.collapse(false)
      range.deleteContents()
      selection.removeAllRanges()
      selection.addRange(range)

      return
    }

    if (nodeContainer === 'H2' || nodeContainer === 'H3' || nodeContainer === 'H4') {
      setCurrentModal('')

      range.deleteContents()
      range.setEndAfter(selection.anchorNode.parentNode)
      range.deleteContents()
      range.insertNode(zeroSpace)
      range.collapse(false)
      range.deleteContents()
      selection.removeAllRanges()
      selection.addRange(range)

      return
    }

    if (
      checkLastSiblingsBr.value === 2 &&
      range.commonAncestorContainer.tagName === 'UL' &&
      isLastActiveLi.value
    ) {
      const ul = selection.anchorNode
      const lastChild = ul.lastChild

      checkLastSiblingsBr.value = 0

      lastChild.remove()
      setCurrentModal('')

      range.deleteContents()
      range.setEndAfter(ul)
      range.deleteContents()
      range.insertNode(zeroSpace)
      range.collapse(false)
      range.deleteContents()
      selection.removeAllRanges()
      selection.addRange(range)

      return
    }

    if (nodeContainer === 'UL') {
      const li = document.createElement('li')
      const ul = Array.from(range.commonAncestorContainer.parentElement.querySelectorAll('li'))
      const split = ul.indexOf(range.commonAncestorContainer)
      const length = ul.length - 1

      if (ul.length - 1 !== split) {
        isLastActiveLi.value = false

        range.deleteContents()
        range.setEndAfter(range.commonAncestorContainer)
        range.deleteContents()
        range.insertNode(li)
        range.collapse(false)
        range.deleteContents()

        selection.removeAllRanges()
        selection.addRange(range)

        return
      } else {
        setCurrentModal('text-list')

        checkLastSiblingsBr.value = 0
        range.commonAncestorContainer.parentElement.lastChild.remove()

        range.deleteContents()
        range.setEndAfter(range.commonAncestorContainer.parentElement.lastChild)
        range.deleteContents()
        range.insertNode(zeroSpace)
        range.collapse(false)
        range.deleteContents()

        selection.removeAllRanges()
        selection.addRange(range)

        return
      }
    }

    if (nodeContainer === 'LI') {
      const li = document.createElement('li')
      const ul = Array.from(
        range.commonAncestorContainer.parentElement.parentElement.querySelectorAll('li')
      )
      const split = ul.indexOf(range.commonAncestorContainer.parentElement)

      setCurrentModal('text-list')

      checkLastSiblingsBr.value = 0
      isLastActiveLi.value = false

      if (selection.focusOffset === 0) {
        li.append(range.commonAncestorContainer.parentElement.textContent)
      }

      if (ul.length - 1 === split) {
        checkLastSiblingsBr.value = 0
        isLastActiveLi.value = true
      }

      range.deleteContents()
      range.setEndAfter(range.commonAncestorContainer.parentElement)
      range.deleteContents()
      range.insertNode(li)
      range.collapse(true)
      range.deleteContents()

      selection.removeAllRanges()
      selection.addRange(range)

      return
    }

    if (nodeContainer === 'BLOCKQUOTE' && checkLastSiblingsBr.value === 2) {
      const blockquote = selection.anchorNode.parentNode

      setCurrentModal('')

      checkLastSiblingsBr.value = 0

      range.deleteContents()
      range.setEndAfter(blockquote)
      range.deleteContents()
      range.insertNode(zeroSpace)
      range.collapse(false)
      range.deleteContents()

      selection.removeAllRanges()
      selection.addRange(range)

      return
    }

    if (
      ((nodeContainer === 'DIV' ||
        nodeContainer === 'STRONG' ||
        nodeContainer === 'I' ||
        nodeContainer === 'S') &&
        selection.anchorNode.tagName !== 'UL') ||
      (nodeContainer === 'BLOCKQUOTE' && checkLastSiblingsBr.value !== 2)
    ) {
      range.deleteContents()
      range.insertNode(br)
      range.collapse(false)
      range.insertNode(zeroSpace)
      range.selectNodeContents(zeroSpace)
      range.collapse(true)
      range.deleteContents()

      selection.removeAllRanges()
      selection.addRange(range)

      return
    } else {
      if (range.commonAncestorContainer.tagName === 'UL' && !isLastActiveLi.value) {
        const li = document.createElement('li')

        setCurrentModal('')

        range.deleteContents()
        range.insertNode(li)
        range.collapse(false)

        return
      } else {
        range.deleteContents()
        range.setEndAfter(range.commonAncestorContainer)
        range.deleteContents()
        range.insertNode(zeroSpace)
        range.collapse(true)
        range.deleteContents()

        selection.removeAllRanges()
        selection.addRange(range)

        return
      }
    }
  }
}

const saveSelection = (): void => {
  let selection: any
  selection = window.getSelection()

  if (isFocusedEditor.value) {
    if (selection !== null) {
      savedRange.value = selection.getRangeAt(0)

      const selector = selection.anchorNode.parentNode.tagName

      switch (selector) {
        case 'STRONG':
          setCurrentModal('text-strong')
          break
        case 'BLOCKQUOTE':
          setCurrentModal('text-quote')
          break
        case 'A':
          setCurrentModal('text-link')
          break
        case 'H2':
          setCurrentModal('text-h2')
          break
        case 'H3':
          setCurrentModal('text-h3')
          break
        case 'H4':
          setCurrentModal('text-h4')
          break
        case 'S':
          setCurrentModal('text-through')
          break
        case 'I':
          setCurrentModal('text-italic')
          break
        case 'UL':
        case 'LI':
          setCurrentModal('text-list')
          break
        default:
          setCurrentModal('')
      }
    }
  }
}

const restoreSelection = (): void => {
  let selection: any
  selection = window.getSelection()

  editable.value?.focus()

  if (savedRange.value !== null) {
    if (selection !== null) {
      if (selection.rangeCount > 0) {
        selection.removeAllRanges()
        selection.addRange(savedRange.value)
      }
    } else if (document.createRange()) {
      selection.addRange(savedRange.value)
    }
  }
}

const convertStringToHTML = (value: string): DocumentFragment => {
  let fragment = document.createDocumentFragment()
  let temp = document.createElement('div')
  temp.innerHTML = value.trim()

  while (temp.firstChild) {
    fragment.appendChild(temp.firstChild)
  }

  return fragment
}

const insertNodeWithCollapse = (element: HTMLElement, selection: any, range, addRange) => {
  range.deleteContents()
  range.insertNode(element)
  range.collapse(false)
  range.insertNode(element)
  range.selectNodeContents(element)
  range.collapse(true)
  range.deleteContents()
  selection.removeAllRanges()

  if (addRange) {
    selection.addRange(range)
  }

  saveSelection()
}

const insertNodeElement = (element: HTMLElement) => {
  let selection: any
  selection = window.getSelection()

  if (selection !== null) {
    selection = selection.getRangeAt(0)
    selection.deleteContents()
    selection.insertNode(element)
    selection.collapseToEnd()
    selection.removeAllRanges()

    selection = window.document.createRange()
    selection.selectNode(element)
    selection.addRange(selection)
    selection.collapseToEnd()
  }

  saveSelection()
}

const handleHeadText = (tag: string) => {
  const hTag = document.createElement(tag)
  const zeroSpace = document.createTextNode('\u200b')
  const fragment = document.createDocumentFragment()

  let selection: any
  selection = window.getSelection()

  if (selection === null) {
    return
  }

  const range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const childNode = selection.anchorNode

  editable.value!.focus()

  if (
    parentNode.tagName === 'BLOCKQUOTE' ||
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'STRONG' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H4' ||
    parentNode.tagName === 'S' ||
    parentNode.tagName === 'I' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (parentNode.tagName !== tag.toUpperCase()) {
    if (childNode.tagName === tag.toUpperCase()) {
      childNode.remove()
    } else {
      const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (content.length > 0) {
        const textContent = convertStringToHTML(content)

        hTag.append(textContent)

        range.deleteContents()
        range.insertNode(hTag)
        range.collapse(false)

        return
      }

      hTag.append(zeroSpace)

      insertNodeWithCollapse(hTag, selection, range, true)
    }
  } else {
    const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

    if (content.length > 0) {
      const textContent = convertStringToHTML(content)

      parentNode.remove()

      range.deleteContents()
      range.insertNode(textContent)
      range.collapse(false)

      return
    }

    parentNode.remove()

    range.deleteContents()
    range.insertNode(parentNode)
    range.collapse(false)

    fragment.append(zeroSpace)

    range.deleteContents()
    range.insertNode(fragment)
    range.collapse(false)
  }
}

const handleTextStrongSelection = () => {
  const strong = document.createElement('strong')
  const zeroSpace = document.createTextNode('\u200b')
  const fragment = document.createDocumentFragment()

  let selection: any
  selection = window.getSelection()

  if (selection === null) return

  const range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const childNode = selection.anchorNode

  editable.value?.focus()

  if (
    parentNode.tagName === 'BLOCKQUOTE' ||
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H4' ||
    parentNode.tagName === 'S' ||
    parentNode.tagName === 'I' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (parentNode.tagName !== 'STRONG') {
    if (childNode.tagName === 'STRONG') {
      childNode.remove()
    } else {
      const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (content.length > 0) {
        const textContent = convertStringToHTML(content)

        strong.append(textContent)

        range.deleteContents()
        range.insertNode(strong)
        range.collapse(false)

        return
      }

      strong.append(zeroSpace)

      range.deleteContents()
      range.insertNode(strong)
    }
  } else {
    const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

    if (content.length > 0) {
      const textContent = convertStringToHTML(content)

      parentNode.remove()

      range.deleteContents()
      range.insertNode(textContent)
      range.collapse(false)

      return
    }

    parentNode.remove()

    range.deleteContents()
    range.insertNode(parentNode)
    range.collapse(false)

    fragment.append(zeroSpace)

    range.deleteContents()
    range.insertNode(fragment)
    range.collapse(false)
  }
}

const handleQuoteSelection = (): void => {
  let selection: any
  selection = window.getSelection()

  if (selection === null) return

  let range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const anchorNode = selection.anchorNode
  const focusNode = selection.focusNode
  const blockquote = document.createElement('blockquote')

  editable.value?.focus()

  setCurrentModal('text-quote')

  if (
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'STRONG' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H4' ||
    parentNode.tagName === 'S' ||
    parentNode.tagName === 'I' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (selection.rangeCount) {
    if (selection.toString().length === 0) {
      if (
        (anchorNode.parentNode.tagName === 'BLOCKQUOTE' &&
          focusNode.parentNode.tagName === 'BLOCKQUOTE') ||
        (anchorNode.tagName === 'BLOCKQUOTE' && focusNode.tagName === 'BLOCKQUOTE') ||
        range.commonAncestorContainer === 'BLOCKQUOTE'
      ) {
        return
      }

      range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(blockquote)
      range.selectNodeContents(blockquote)
      range.collapse(false)
    } else {
      if (
        (anchorNode.parentNode.tagName === 'BLOCKQUOTE' &&
          focusNode.parentNode.tagName === 'BLOCKQUOTE') ||
        (anchorNode.tagName === 'BLOCKQUOTE' && focusNode.tagName === 'BLOCKQUOTE') ||
        range.commonAncestorContainer.tagName === 'BLOCKQUOTE'
      ) {
        const content = convertStringToHTML(range.commonAncestorContainer.innerHTML)

        parentNode.remove()

        range = selection.getRangeAt(0)
        range.deleteContents()
        range.insertNode(content)
      } else {
        const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

        if (
          anchorNode.parentNode.tagName === 'BLOCKQUOTE' ||
          focusNode.parentNode.tagName === 'BLOCKQUOTE' ||
          (anchorNode.tagName === 'BLOCKQUOTE' && focusNode.tagName === 'BLOCKQUOTE') ||
          range.commonAncestorContainer.tagName === 'BLOCKQUOTE'
        ) {
          return
        }

        blockquote.innerHTML = content

        range = selection.getRangeAt(0)
        range.deleteContents()
        range.insertNode(blockquote)
        range.selectNodeContents(blockquote)
        range.collapse(false)
      }
    }
  }
}

const handleItalicText = (): void => {
  const strong = document.createElement('i')
  const zeroSpace = document.createTextNode('\u200b')
  const fragment = document.createDocumentFragment()

  let selection: any
  selection = window.getSelection()

  if (selection === null) return

  const range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const childNode = selection.anchorNode

  editable.value?.focus()

  if (
    parentNode.tagName === 'BLOCKQUOTE' ||
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H4' ||
    parentNode.tagName === 'STRONG' ||
    parentNode.tagName === 'S' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (parentNode.tagName !== 'I') {
    if (childNode.tagName === 'I') {
      childNode.remove()
    } else {
      const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (content.length > 0) {
        const textContent = convertStringToHTML(content)

        strong.append(textContent)

        range.deleteContents()
        range.insertNode(strong)
        range.collapse(false)

        return
      }

      strong.append(zeroSpace)

      range.deleteContents()
      range.insertNode(strong)
    }
  } else {
    const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

    if (content.length > 0) {
      const textContent = convertStringToHTML(content)

      parentNode.remove()

      range.deleteContents()
      range.insertNode(textContent)
      range.collapse(false)

      return
    }

    parentNode.remove()

    range.deleteContents()
    range.insertNode(parentNode)
    range.collapse(false)

    fragment.append(zeroSpace)

    range.deleteContents()
    range.insertNode(fragment)
    range.collapse(false)
  }
}

const handleTextThroughSelection = (): void => {
  const strong = document.createElement('s')
  const zeroSpace = document.createTextNode('\u200b')
  const fragment = document.createDocumentFragment()

  let selection: any
  selection = window.getSelection()

  if (selection === null) return

  const range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const childNode = selection.anchorNode

  editable.value?.focus()

  if (
    parentNode.tagName === 'BLOCKQUOTE' ||
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H4' ||
    parentNode.tagName === 'STRONG' ||
    parentNode.tagName === 'I' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (parentNode.tagName !== 'S') {
    if (childNode.tagName === 'S') {
      childNode.remove()
    } else {
      const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (content.length > 0) {
        const textContent = convertStringToHTML(content)

        strong.append(textContent)

        range.deleteContents()
        range.insertNode(strong)
        range.collapse(false)

        return
      }

      strong.append(zeroSpace)

      range.deleteContents()
      range.insertNode(strong)
    }
  } else {
    const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

    if (content.length > 0) {
      const textContent = convertStringToHTML(content)

      parentNode.remove()

      range.deleteContents()
      range.insertNode(textContent)
      range.collapse(false)

      return
    }

    parentNode.remove()

    range.deleteContents()
    range.insertNode(parentNode)
    range.collapse(false)

    fragment.append(zeroSpace)

    range.deleteContents()
    range.insertNode(fragment)
    range.collapse(false)
  }
}

const handleTextLinkSelection = () => {
  console.log(`text-link`)
}

const handleList = (): void => {
  let selection: any
  let range
  selection = window.getSelection()

  if (selection === null) return

  range = selection.getRangeAt(0)
  const parentNode = selection.anchorNode.parentNode
  const childNode = selection.anchorNode
  const htmlContent = parentNode.innerHTML
  const container = range.commonAncestorContainer

  editable.value?.focus()

  if (
    parentNode.tagName === 'BLOCKQUOTE' ||
    parentNode.tagName === 'STRONG' ||
    parentNode.tagName === 'A' ||
    parentNode.tagName === 'H2' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'H3' ||
    parentNode.tagName === 'I' ||
    parentNode.tagName === 'S' ||
    !isFocusedEditor.value
  ) {
    return
  }

  if (
    (selection.toString().length > 0 &&
      selection.anchorNode.parentNode.tagName === 'DIV' &&
      selection.focusNode.parentNode.tagName === 'LI') ||
    (selection.anchorNode.parentNode.tagName === 'LI' &&
      selection.focusNode.parentNode.tagName === 'DIV')
  ) {
    return
  }

  if (container.tagName === 'DIV') {
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    const zeroSpace = document.createTextNode('\u200b')
    li.append(zeroSpace)
    ul.append(li)

    const content = selection.toString()
    const fragment = range.commonAncestorContainer
    const textContent = content
      .split('\n')
      .map((e) => `<li>${e}</li>`)
      .join('')

    if (content.length > 0) {
      const list = convertStringToHTML(textContent)
      const ul = document.createElement('ul')

      ul.append(list)
      range.deleteContents()
      range.insertNode(ul)
      range.collapse(false)

      return
    }

    insertNodeWithCollapse(ul, selection, range, true)

    return
  }

  if (container.tagName === 'UL') {
    const content = selection.toString().replace(/(?:\r\n|\r|\n)/g, '<br />')

    if (content.length > 0) {
      const textContent = convertStringToHTML(content)

      parentNode.parentNode.remove()

      range.deleteContents()
      range.insertNode(textContent)
      range.collapse(false)

      return
    } else {
      const fragment = range.commonAncestorContainer.textContent
      const textNode = convertStringToHTML(fragment)

      while (parentNode && parentNode.parentNode) {
        const parent = parentNode.parentNode

        if (parent.tagName === 'UL') {
          parent.remove()

          range.deleteContents()
          range.insertNode(textNode)
          range.collapse(true)

          return
        }
      }
    }
  }

  if (typeof container.tagName === 'undefined') {
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    const zeroSpace = document.createTextNode('\u200b')
    li.append(zeroSpace)
    ul.append(li)

    // Concat Lists
    if (parentNode.tagName === 'LI') {
      const content = convertStringToHTML(htmlContent)
      let fragment = document.createDocumentFragment()
      const listArray: HTMLElement[] = Array.from(parentNode.parentNode.querySelectorAll('li'))
      const splitIndex = listArray.indexOf(parentNode)

      const ul1 = document.createElement('ul')
      const ul2 = document.createElement('ul')

      for (let i = 0; i < splitIndex; i++) {
        ul1.appendChild(listArray[i])
      }

      for (let i = splitIndex + 1; i < listArray.length; i++) {
        ul2.appendChild(listArray[i])
      }

      parentNode.parentNode.remove()

      fragment.append(ul1)
      fragment.append(content)
      fragment.append(ul2)

      range.deleteContents()
      range.insertNode(fragment)
      range.collapse(false)

      return
    } else if (
      (container.previousSibling && container.previousSibling.tagName === 'UL') ||
      (container.nextSibling && container.nextSibling.tagName === 'UL')
    ) {
      // Attach node li to list
      const newList = document.createElement('ul')
      const li = document.createElement('li')

      li.append(container.textContent)

      const firstListArray: HTMLElement[] = Array.from(
        container.previousSibling.querySelectorAll('li')
      )
      const lastListArray: HTMLElement[] = Array.from(container.nextSibling.querySelectorAll('li'))

      // Both lists is not exists
      if (firstListArray.length === 0 && lastListArray.length === 0) {
        newList.append(li)

        container.remove()
        insertNodeWithCollapse(newList, selection, range, true)

        return
      }

      // Both lists is exists
      if (firstListArray.length > 0 && lastListArray.length > 0) {
        for (let i = 0; i < firstListArray.length; i++) {
          newList.appendChild(firstListArray[i].cloneNode(true))
          newList.append(li)
        }

        for (let i = 0; i < lastListArray.length; i++) {
          newList.appendChild(lastListArray[i].cloneNode(true))
        }

        container.previousSibling.remove()
        container.nextSibling.remove()
        container.remove()

        range.deleteContents()
        range.insertNode(newList)
        range.collapse(false)

        return
      }

      // First list is exists
      if (firstListArray.length > 0 && lastListArray.length === 0) {
        for (let i = 0; i < firstListArray.length; i++) {
          newList.appendChild(firstListArray[i].cloneNode(true))
          newList.append(li)
        }

        container.previousSibling.remove()
        container.nextSibling.remove()
        container.remove()

        range.deleteContents()
        range.insertNode(newList)
        range.collapse(false)

        return
      }

      // Last list is exists
      if (lastListArray.length > 0 && firstListArray.length === 0) {
        newList.append(li)
        for (let i = 0; i < lastListArray.length; i++) {
          newList.appendChild(lastListArray[i].cloneNode(true))
        }

        container.previousSibling.remove()
        container.nextSibling.remove()
        container.remove()

        range.deleteContents()
        range.insertNode(newList)
        range.collapse(false)

        return
      }
    } else {
      // Mark line as li of part list
      if (container.textContent.length > 0) {
        if (
          (container.previousSibling && container.previousSibling.tagName === 'UL') ||
          (container.nextSibling && container.nextSibling.tagName === 'UL')
        ) {
          console.log(`1-4`)
          const newList = document.createElement('ul')
          const li = document.createElement('li')
          li.append(container.textContent)

          const firstListArray: HTMLElement[] = Array.from(
            container.previousSibling.querySelectorAll('li')
          )
          const secondListArray: HTMLElement[] = Array.from(
            container.nextSibling.querySelectorAll('li')
          )

          for (let i = 0; i < firstListArray.length; i++) {
            newList.appendChild(firstListArray[i].cloneNode(true))
            newList.append(li)
          }

          for (let i = 0; i < secondListArray.length; i++) {
            newList.appendChild(secondListArray[i].cloneNode(true))
          }

          container.previousSibling.remove()
          container.nextSibling.remove()
          container.remove()

          range.deleteContents()
          range.insertNode(newList)
          range.collapse(false)

          return
        } else {
          const newList = document.createElement('ul')
          const li = document.createElement('li')

          li.append(container.textContent)
          newList.append(li)

          container.remove()
          insertNodeWithCollapse(newList, selection, range, true)

          return
        }
      } else {
        insertNodeWithCollapse(ul, selection, range, true)
        return
      }
    }
  }
}

const handleHr = (): void => {
  const hr = document.createElement('hr')

  insertNodeElement(hr)
}

const handlePrevEvent = () => {
  console.log(`prev`)
}

const handleNextEvent = () => {
  console.log(`next`)
}

const uploadImage = (value: File): void => {
  editable.value?.focus()

  // if (
  //   value &&
  //   (document.getSelection().anchorNode.parentNode.id === 'editable' ||
  //     document.getSelection().anchorNode.id === 'editable')
  // ) {
  //   let { imagePath, wide } = value

  //   let el = document.createElement('img')
  //   el.src = imagePath

  //   if (wide) el.setAttribute('wide', '')

  //   insertNodeElement(el)
  // }
  console.log(`upload image`)
}

const setCurrentModal = (modal) => {
  isCurrentModal.value = modal
}

const close = () => {
  isFocusedEditor.value = false
}

const sendHTMLContent = () => {
  emit('send', editable.value?.innerHTML)
  close()
  editable.value = null
}

const getStringHTMLContent = computed(() => {
  return editable.value?.textContent
})

watch(focused, (focused) => {
  if (focused) {
    isFocusedEditor.value = true
    isFirstClick.value = true
    disableEditor.value = true
  }
})

onClickOutside(wrapper, close)
</script>

<style lang="scss">
@import 'styles';
</style>
