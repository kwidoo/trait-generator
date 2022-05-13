<template>
  <input
    v-model="response"
    class="border rounded-r px-4 py-2 w-full mx-1"
    type="text"
    :placeholder="placeholder"
  />
</template>
<script lang="ts">
import { Component, Prop, VModel, Vue } from 'nuxt-property-decorator'
@Component({})
export default class ClassModelInput extends Vue {
  @VModel({ type: String }) response!: String
  @Prop() placeholder!: String
}
</script>
