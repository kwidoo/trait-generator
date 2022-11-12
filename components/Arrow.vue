<template>
  <span v-if="last === false" class="mx-2 text-xl"> </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class ClassArrow extends Vue {
  @Prop() last!: boolean
}
</script>
