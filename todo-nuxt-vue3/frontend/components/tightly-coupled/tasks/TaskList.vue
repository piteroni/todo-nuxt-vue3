<template>
  <div class="mt-12">
    <p class="pb-6 mt-1 text-lg text-gray-500">
      タスク一覧
    </p>

    <ul class="ml-6 taskList list-disc">
      <li v-for="(task, index) in tasks" :key="index" class="task mb-2">
        <div class="taskName">
          {{ task.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "@nuxtjs/composition-api"
import { retainedTaskKey } from "@/composables/retainedTask"

export default defineComponent({
  setup() {
    const { tasks } = inject(retainedTaskKey)!!

    return { tasks }
  }
})
</script>
