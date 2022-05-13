import VForm from 'vform'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $vform(data?: Record<string, any>): VForm
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $vform(data?: Record<string, any>): VForm
  }
  interface Context {
    $vform(data?: Record<string, any>): VForm
  }
}
// eslint-disable-next-line
const myPlugin: Plugin = (context, inject) => {
  inject('vform', (data?: Record<string, any>): VForm => new VForm(data))
}

export default myPlugin
