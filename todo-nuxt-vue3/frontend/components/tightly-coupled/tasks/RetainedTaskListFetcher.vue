<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "@nuxtjs/composition-api"
import { retainedTaskKey } from "@/composables/retainedTask"

export default defineComponent({
  setup() {
    const { fetch } = inject(retainedTaskKey)!!

    fetch()
  }
})
</script>
