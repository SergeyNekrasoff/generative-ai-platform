<template>
  <div>
    <div>
      <div>
        <!-- <BookSearch /> -->
        Home
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
// import { useBookModel } from '@/entities/book'
// import { BookSearch } from '@/features/book'

useHead({
  title: 'textailor - Home'
})

// const bookModel = useBookModel()

// onBeforeUnmount(() => {
//   bookModel.$reset()
// })
</script>
