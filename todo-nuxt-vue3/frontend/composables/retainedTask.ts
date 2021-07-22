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

const deleteTask = (state: State, $axios: NuxtAxiosInstance) => async (id: number) => {
  await $axios.delete(`/users/current/tasks/${id}`)

  state.tasks = state.tasks.filter(task => task.id !== id)
}

export function useRetainedTask() {
  const { $axios } = useContext()

  return {
    tasks: computed(() => state.tasks),
    sync: sync(state),
    createTask: createTask(state, $axios),
    deleteTask: deleteTask(state, $axios)
  }
}

export type RetainedTaskComposition = ReturnType<typeof useRetainedTask>

export const retainedTaskKey: InjectionKey<RetainedTaskComposition> = Symbol("retained-task")
