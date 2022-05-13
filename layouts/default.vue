<template>
  <div class="bg-tea-green min-h-screen">
    <navigation />
    <Nuxt />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import navigation from '~/components/navigation.vue'
export default Vue.extend({
  components: { navigation },
})
</script>
<style scoped>
.active-link {
  font-weight: bold;
}

/* exact link will show the primary color for only the exact matching link */
.exact-active-link {
  color: #00c58e;
}
</style>
