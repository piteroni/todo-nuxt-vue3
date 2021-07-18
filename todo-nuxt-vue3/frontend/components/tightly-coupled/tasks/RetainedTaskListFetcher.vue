<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, useContext, useFetch } from "@nuxtjs/composition-api"
import { retainedTaskKey } from "@/composables/retainedTask"

export default defineComponent({
  setup() {
    const { $axios } = useContext()

    const { sync } = inject(retainedTaskKey)!!

    const { fetch } = useFetch(async () => {
      sync(await $axios.$get<RetainedTask[]>("/users/current/tasks"))
    })

    fetch()
  }
})
</script>
