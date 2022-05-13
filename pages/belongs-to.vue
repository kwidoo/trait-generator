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
          <radio v-model="form.type" name="reverse-type" value="hasOne">
          </radio>
          HasOne
        </label>
      </div>
      <div v-if="form.reverse === true" class="form-check mr-2">
        <label class="flex">
          <radio v-model="form.type" name="reverse-type" value="hasMany">
          </radio>
          HasMany
        </label>
      </div>
    </div>
    <div class="w-5/6 mx-auto relative" @click="copy">
      <font-awesome-icon
        icon="copy"
        class="text-white absolute top-10 right-5"
      />
      <pre>
        <code :key="keyValue" v-highlight class="php rounded-md font-mono"  >{{ data }}
        </code>
      </pre>
    </div>
  </div>
</template>
<script lang="ts">
import _ from 'lodash'
import VForm from 'vform'
import { Radio, Checkbox } from 'vue-checkbox-radio'
import { Component, Vue } from 'nuxt-property-decorator'
import ClassModelBlock, { ClassBlockValue } from '~/components/ModelBlock.vue'
// @ts-ignore
import trait from '~/static/belongs-to.php'
// @ts-ignore
import scopes from '~/static/scopes.php'

@Component({
  components: {
    ModelBlock: ClassModelBlock,
    Radio,
    Checkbox,
  },
})
export default class ClassBelongsTo extends Vue {
  data: String = trait
  codeKey = 0

  form: VForm = this.$vform({
    reverse: false,
    scopes: false,
    type: 'hasOne',
    fromModel: new ClassBlockValue(),
    toModel: new ClassBlockValue(),
  })

  check(): void {
    let scopeCode = scopes
    if (this.form.scopes === false) {
      scopeCode = ''
    }

    this.codeKey++
    this.data = trait
    this.data = this.data.replace('<scopes>', scopeCode)

    this.data = this.data.replaceAll(
      '<model-studly>',
      _.upperFirst(_.camelCase(this.form.fromModel.model))
    )
    this.data = this.data.replaceAll(
      '<traitName>',
      'BelongsTo' + _.upperFirst(_.camelCase(this.form.fromModel.model))
    )

    let foreignKey: string = `constant(self::${_.toUpper(
      this.form.fromModel.model
    )}_FOREIGN_KEY)`
    if (this.form.fromModel.foreignKey1 !== null) {
      foreignKey = `'${_.snakeCase(this.form.fromModel.foreignKey1)}'`
    }
    this.data = this.data.replaceAll('<model-upper>', foreignKey)
    this.data = this.data.replaceAll(
      '<model-snake>',
      _.snakeCase(_.kebabCase(this.form.fromModel.model))
    )
    this.data = this.data.replaceAll(
      '<model-camel>',
      _.camelCase(this.form.fromModel.model)
    )

    this.data = this.data.replace('<model-folder>', '')
  }

  get keyValue(): String {
    return 'code-' + this.codeKey
  }

  async copy(): Promise<void> {
    await this.$copyText(this.data)
    this.$toast.success('Copied')
  }
}
</script>
