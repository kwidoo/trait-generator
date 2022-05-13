<template>
  <div class="flex flex-col m-4">
    <div class="flex flex-row justify-center items-center px-5 my-1">
      <ModelBlock
        v-model="form.fromModel"
        :last="false"
        :type="0"
        @changed="check"
      />
      <ModelBlock
        v-model="form.toModel"
        :last="true"
        :type="2"
        @changed="check"
      />
    </div>
    <div class="flex justify-center my-1">
      <checkbox
        v-model="form.scopes"
        name="scopes"
        :value="'true'"
        class="mr-2"
      >
        Add scopes
      </checkbox>
    </div>
    <div class="flex justify-center my-1">
      <checkbox v-model="form.reverse" name="reverse" value="true" class="mr-2">
        Make Reverse Relation
      </checkbox>
      <div v-if="form.reverse === true" class="form-check mr-2">
        <label class="flex">
          <radio v-model="form.type" name="reverse-type" value="belongsTo">
          </radio>
          BelongsTo
        </label>
      </div>
    </div>
    <pre>
    <code v-highlight class="php rounded-md font-mono">

    </code></pre>
  </div>
</template>
<script lang="ts">
import VForm from 'vform'
import { Radio, Checkbox } from 'vue-checkbox-radio'
import { Component, Vue } from 'nuxt-property-decorator'
import ClassModelBlock, { ClassBlockValue } from '~/components/ModelBlock.vue'

@Component({
  components: {
    ModelBlock: ClassModelBlock,
    Radio,
    Checkbox,
  },
})
export default class ClassBelongsTo extends Vue {
  form: VForm = this.$vform({
    reverse: false,
    scopes: false,
    type: 'belongsTo',
    fromModel: new ClassBlockValue(),
    toModel: new ClassBlockValue(),
  })
}
</script>
