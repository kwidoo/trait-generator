<template>
  <div class="flex items-center">
    <label class="mr-1">Laravel Version:</label>
    <div class="form-check mr-2">
      <label class="flex">
        <Radio
          v-model="form.version"
          name="version"
          value="8up"
          class="mr-1"
          checked
          @input="debounceInput"
        />
        v.8 and up
      </label>
    </div>
    <div class="form-check mr-2">
      <label class="flex">
        <Radio
          v-model="form.version"
          name="version"
          value="8down"
          class="mr-1"
          @input="debounceInput"
        />
        v.7 and below
      </label>
    </div>
    <div class="form-check mr-2">
      <label class="flex">
        <Radio
          v-model="form.version"
          name="version"
          value="custom"
          class="mr-1"
          @input="onClick"
        />
        Custom
      </label>
    </div>
    <div class="w-1/5">
      <ModelInput
        ref="custom"
        v-model="form.modelsFolder"
        placeholder="Model's Folder..."
        @input="debounceInput"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Radio } from 'vue-checkbox-radio'
import { debounce } from 'debounce'

import VForm from 'vform'

@Component({
  components: {
    Radio,
  },
})
export default class ClassSettings extends Vue {
  $refs!: {
    custom: HTMLFormElement
  }

  debounceInput: CallableFunction = debounce(this.onChange, 10)

  form: VForm = this.$vform({
    version: '8up',
    modelsFolder: 'App\\Models\\',
  })

  onChange(value: String) {
    if (value === '8up') {
      this.form.modelsFolder = 'App\\Models\\'
    }
    if (value === '8down') {
      this.form.modelsFolder = 'App\\'
    }
    if (value !== '8up' && value !== '8down') {
      this.form.version = 'custom'
    }
  }

  onClick() {
    this.$refs.custom.$el.focus()
  }
}
</script>
