import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { computed, InjectionKey, reactive, useContext } from "@nuxtjs/composition-api"

export interface RetainedTask {
  id: number
  name: string
}

interface State {
  tasks: RetainedTask[]
}

const initialState: State = {
  tasks: []
}

const fetch = (state: State, $axios: NuxtAxiosInstance) => async () => {
  const tasks = await $axios.$get<RetainedTask[]>("/users/current/tasks")

  state.tasks = tasks
}

const createTask = (state: State, $axios: NuxtAxiosInstance) => async (taskName: string) => {
  const response = await $axios.$post<{id: number, name: string}>("/users/current/tasks", { name: taskName })

  state.tasks.push(response)
}

const deleteTask = (state: State, $axios: NuxtAxiosInstance) => async (id: number) => {
  await $axios.$delete(`/users/current/tasks/${id}`)

  state.tasks = state.tasks.filter(task => task.id !== id)
}

export function useRetainedTask(initial = initialState) {
  const { $axios } = useContext()

  const state: State = reactive(initial)

  return {
    tasks: computed(() => state.tasks),
    fetch: fetch(state, $axios),
    createTask: createTask(state, $axios),
    deleteTask: deleteTask(state, $axios)
  }
}

export type RetainedTaskComposition = ReturnType<typeof useRetainedTask>

export const retainedTaskKey: InjectionKey<RetainedTaskComposition> = Symbol("retained-task")
