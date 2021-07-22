<template>
  <div class="mt-12">
    <p class="pb-6 mt-1 text-base text-gray-500">
      タスク一覧
    </p>

    <ul class="ml-6 list-disc">
      <li v-for="(task, index) in tasks" :key="index" class="mb-2">
        <div class="flex">
          <div class="taskName w-96 overflow-hidden">
            {{ task.name }}
          </div>

          <div class="my-auto ml-4">
            <div @click="() => deleteTask(task.id)">
              <app-trash />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "@nuxtjs/composition-api"
import { retainedTaskKey } from "@/composables/retainedTask"
import AppTrash from "@/components/basic/AppTrash.vue"

export default defineComponent({
  components: {
    "app-trash": AppTrash
  },
  setup() {
    const retainedTask = inject(retainedTaskKey)!!

    const deleteTask = (id: number) => {
      retainedTask.deleteTask(id)
    }

    return {
      tasks: retainedTask.tasks,
      deleteTask
    }
  }
})
</script>
