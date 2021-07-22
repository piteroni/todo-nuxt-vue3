<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from "@nuxtjs/composition-api"
import { retainedTaskKey, useRetainedTask } from "./retainedTask"

export default defineComponent({
  setup() {
    provide(retainedTaskKey, useRetainedTask())

    return {}
  }
})
</script>
