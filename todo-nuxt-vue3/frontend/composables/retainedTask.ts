import { computed, InjectionKey, reactive } from "@nuxtjs/composition-api"

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

export function useRetainedTask() {
  return {
    tasks: computed(() => state.tasks),
    sync: sync(state)
  }
}

export type RetainedTaskComposition = ReturnType<typeof useRetainedTask>

export const retainedTaskKey: InjectionKey<RetainedTaskComposition> = Symbol("retained-task")
