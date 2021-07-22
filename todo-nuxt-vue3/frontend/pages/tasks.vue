<template>
  <retained-task-provider>
    <retained-task-list-fetcher>
      <task-create-form />
      <task-list />
    </retained-task-list-fetcher>
  </retained-task-provider>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api"
import RetainedTaskProvider from "@/composables/RetainedTaskProvider.vue"
import RetainedTaskListFetcher from "@/components/tightly-coupled/tasks/RetainedTaskListFetcher.vue"
import TaskCreateForm from "@/components/tightly-coupled/tasks/TaskCreateForm.vue"
import TaskList from "@/components/tightly-coupled/tasks/TaskList.vue"

export default defineComponent({
  components: {
    "retained-task-provider": RetainedTaskProvider,
    "retained-task-list-fetcher": RetainedTaskListFetcher,
    "task-create-form": TaskCreateForm,
    "task-list": TaskList
  },
  layout: "app",
})
</script>
