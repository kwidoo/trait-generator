<template>
  <div class="flex items-center">
    <div class="flex col-4 border border-old-mauve rounded p-1">
      <ModelInput
        v-model="response.model"
        :class="order[0]"
        placeholder="Model..."
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
  _model: String | null
  _foreignKey1: String | null
  _foreignKey2: String | null | null

  constructor(
    model: String | null = null,
    foreignKey1: String | null = null,
    foreignKey2: String | null = null
  ) {
    this._model = model
    this._foreignKey1 = foreignKey1
    this._foreignKey2 = foreignKey2
  }

  get model(): String | null {
    return this._model
  }

  set model(value: String | null) {
    this._model = value
  }

  get foreignKey1(): String | null {
    return this._foreignKey1
  }

  set foreignKey1(value: String | null) {
    this._foreignKey1 = value
  }

  get foreignKey2(): String | null {
    return this._foreignKey2
  }

  set foreignKey2(value: String | null) {
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

  onInput() {
    this.$emit('changed')
  }

  get order(): Array<String> {
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
