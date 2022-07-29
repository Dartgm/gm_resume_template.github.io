<template>
  <div class="app">
    <editor v-model="state"></editor>
  </div>
</template>

<script>
import {ref,provide} from 'vue'
import data from './data.json'
import Editor from './packages/editor.jsx'
import {registerConfig as config} from './utils/editor-config.jsx'
export default {
  components: {
    Editor
  },
  setup(){
    const state=ref(data)
    provide('config',config)
    return {
      state
    }
  }
}
</script>

