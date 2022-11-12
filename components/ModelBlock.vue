<template>
  <div class="flex items-center">
    <div class="flex col-4 border border-old-mauve rounded p-1">
      <ModelInput
        v-model="response.model"
        :class="order[0]"
        :placeholder="placeholder"
        @input="onInput"
      />
      <ModelInput
        v-model="response.foreignKey1"
        :class="order[1]"
        placeholder="Key..."
        @input="onInput"
      />
      <ModelInput
        v-if="response.foreignKey2 !== null"
        v-model="response.foreignKey2"
        :class="order[2]"
        placeholder="Key..."
        @input="onInput"
      />
    </div>
    <Arrow :last="last" />
  </div>
</template>
<script lang="ts">
import { Component, ModelSync, Prop, Vue } from 'nuxt-property-decorator'
import ClassModelInput from '~/components/ModelInput.vue'
import ClassArrow from '~/components/Arrow.vue'

export class ClassBlockValue {
  _model: string | null
  _foreignKey1: string | null
  _foreignKey2: string | null | null

  constructor(
    model: string | null = null,
    foreignKey1: string | null = null,
    foreignKey2: string | null = null
  ) {
    this._model = model
    this._foreignKey1 = foreignKey1
    this._foreignKey2 = foreignKey2
  }

  get model(): string | null {
    return this._model
  }

  set model(value: string | null) {
    this._model = value
  }

  get foreignKey1(): string | null {
    return this._foreignKey1
  }

  set foreignKey1(value: string | null) {
    this._foreignKey1 = value
  }

  get foreignKey2(): string | null {
    return this._foreignKey2
  }

  set foreignKey2(value: string | null) {
    this.foreignKey2 = value
  }
}
@Component({
  components: { ModelInput: ClassModelInput, Arrow: ClassArrow },
})
export default class ClassModelBlock extends Vue {
  @ModelSync('classObject', 'input', { type: Object })
  response!: Object

  @Prop() last!: boolean
  @Prop() type!: Number
  @Prop() placeholder: string = 'Order...'

  onInput() {
    this.$emit('changed')
  }

  get order(): Array<string> {
    if (this.type === 1) {
      return ['order-3', 'order-2', 'order-1']
    }
    if (this.type === 2) {
      return ['order-2', 'order-1', 'order-3']
    }
    return ['order-1', 'order-2', 'order-3']
  }
}
</script>
