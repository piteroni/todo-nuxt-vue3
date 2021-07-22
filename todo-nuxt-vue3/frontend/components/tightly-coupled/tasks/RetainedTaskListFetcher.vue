<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, useContext } from "@nuxtjs/composition-api"
import { RetainedTask, retainedTaskKey } from "@/composables/retainedTask"

export default defineComponent({
  setup() {
    const { $axios } = useContext()

    const { sync } = inject(retainedTaskKey)!!

    $axios.$get<RetainedTask[]>("/users/current/tasks").then(b => sync(b))
  }
})
</script>
