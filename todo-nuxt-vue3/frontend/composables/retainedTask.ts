import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { computed, InjectionKey, reactive, useContext } from "@nuxtjs/composition-api"

export interface RetainedTask {
  id: number
  name: string
}

interface State {
  tasks: RetainedTask[]
}

const state: State = reactive({
  tasks: []
})

const sync = (state: State) => (tasks: RetainedTask[]) => {
  state.tasks = tasks
}

const createTask = (state: State, $axios: NuxtAxiosInstance) => async (taskName: string) => {
  const response = await $axios.post<{id: number, name: string}>("/users/current/tasks", { name: taskName })

  state.tasks.push(response.data)
}

export function useRetainedTask() {
  const { $axios } = useContext()

  return {
    tasks: computed(() => state.tasks),
    sync: sync(state),
    createTask: createTask(state, $axios)
  }
}

export type RetainedTaskComposition = ReturnType<typeof useRetainedTask>

export const retainedTaskKey: InjectionKey<RetainedTaskComposition> = Symbol("retained-task")
