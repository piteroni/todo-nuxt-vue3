<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from "@nuxtjs/composition-api"
import { authenticationTokenKey, useAuthenticationToken } from "./authenticationToken"

export default defineComponent({
  setup() {
    provide(authenticationTokenKey, useAuthenticationToken())

    return {}
  }
})
</script>
