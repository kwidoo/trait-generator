<template>
  <div class="flex flex-col m-4">
    <div class="flex flex-row justify-center items-center px-5 my-1">
      <ModelBlock
        v-model="form.fromModel"
        :last="false"
        :type="0"
        placeholder="Order.."
        @changed="check"
      />
      <ModelBlock
        v-model="form.toModel"
        :last="true"
        :type="2"
        placeholder="User.."
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
        <code :key="keyValue" v-highlight class="php rounded-md font-mono"  >{{ model }}
        </code>
      </pre>
      <pre v-if="showConstants">
        <code :key="keyValue" v-highlight class="php rounded-md font-mono"  >{{ consts }}
        </code>
      </pre>
      <pre v-if="formReverseHasOne || formReverseHasMany">
        <code :key="keyValue" v-highlight class="php rounded-md font-mono"  >{{ reverseModel }}
        </code>
      </pre>
    </div>
  </div>
</template>
<script lang="ts">
import VForm from 'vform'
import { Radio, Checkbox } from 'vue-checkbox-radio'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Substitute from '../processing/substitute'
import ClassModelBlock, { ClassBlockValue } from '~/components/ModelBlock.vue'
// @ts-ignore
import trait from '~/static/belongs-to.php'
// @ts-ignore
import reverseHasOne from '~/static/has-one.php'
// @ts-ignore
import constants from '~/static/const.php'
// @ts-ignore
@Component({
  components: {
    ModelBlock: ClassModelBlock,
    Radio,
    Checkbox,
  },
})
export default class ClassBelongsTo extends Vue {
  model: string = ''
  reverseModel: string = ''
  consts: string = constants

  modelName: string = 'Order'
  modelReverseName: string = 'User'
  codeKey = 0

  form: VForm = this.$vform({
    reverse: false,
    scopes: false,
    type: 'hasOne',
    fromModel: new ClassBlockValue(),
    toModel: new ClassBlockValue(),
  })

  @Watch('model')
  onModelChange() {
    this.check()
  }

  @Watch('model')
  @Watch('reverseModel')
  @Watch('form.fromModel.foreignKey1')
  @Watch('form.fromModel.foreignKey2')
  @Watch('form.toModel.foreignKey1')
  @Watch('form.toModel.foreignKey2')
  @Watch('form.scopes')
  @Watch('form.reverse')
  onChange() {
    this.check()
  }

  mounted() {
    this.check()
  }

  check(): void {
    this.codeKey++

    if (this.form.fromModel.model !== null) {
      this.modelName = this.form.fromModel.model
    }
    if (this.form.toModel.model !== null) {
      this.modelReverseName = this.form.toModel.model
    }
    this.model = new Substitute(
      trait,
      this.modelName,
      this.modelReverseName,
      this.form.fromModel.foreignKey1,
      this.form.toModel.foreignKey1,
      this.form.scopes
    ).traitFilled

    // if (this.showConstants) {
    //   this.consts = new Substitute(
    //     constants,
    //     this.model,
    //     this.model,
    //     this.model,
    //     this.form.scopes
    //   ).traitFilled
    // }
    if (this.formReverseHasOne) {
      this.reverseModel = new Substitute(
        reverseHasOne,
        this.modelReverseName,
        this.model,
        this.form.fromModel.foreignKey1,
        this.form.toModel.foreignKey2,
        this.form.scopes
      ).traitFilled
    }
  }

  get keyValue(): string {
    return 'code-' + this.codeKey
  }

  get showConstants(): boolean {
    return (
      this.form.fromModel.foreignKey1 === null ||
      this.form.fromModel.foreignKey1 === ''
    )
  }

  get formReverseHasOne(): boolean {
    return this.form.reverse && this.form.type === 'hasOne'
  }

  get formReverseHasMany(): boolean {
    return this.form.reverse && this.form.type === 'hasMany'
  }

  async copy(): Promise<void> {
    await this.$copyText(this.model)
    this.$toast.success('Copied')
  }
}
</script>
