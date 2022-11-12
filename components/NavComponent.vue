<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl my-4 text-blue-500">
      Laravel Relation Trait Generator
    </h1>
    <div class="flex flex-row">
      <NuxtLink class="px-2 text-xl text-yinmnblue" to="belongs-to"
        >BelongsTo</NuxtLink
      >
      <NuxtLink class="px-2 text-xl text-yinmnblue" to="has-one"
        >HasOne</NuxtLink
      >
      <NuxtLink class="px-2 text-xl text-yinmnblue" to="has-many"
        >HasMany</NuxtLink
      >
      <NuxtLink class="px-2 text-xl text-yinmnblue" to="belongs-to-many"
        >BelongsToMany</NuxtLink
      >
      <NuxtLink class="px-2 text-xl text-yinmnblue" to="settings">
        <font-awesome-icon icon="gear" />
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
<style scoped>
.active-link {
  font-weight: bold;
}

/* exact link will show the primary color for only the exact matching link */
.exact-active-link {
  @apply text-old-mauve underline;
}
</style>
