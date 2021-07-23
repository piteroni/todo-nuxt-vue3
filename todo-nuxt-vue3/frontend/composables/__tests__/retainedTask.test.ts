import { createLocalVue } from "@vue/test-utils"
import { createSetupScope } from "@/shared/testing"
import { useRetainedTask, RetainedTask } from "../retainedTask"

const localVue = createLocalVue()

describe("保有タスク", () => {
  it("保有タスクを作成できる", done => {
    const postMock = jest.fn((_: string, data: { name: string }): RetainedTask => {
      return {
        id: 101,
        name: data.name
      }
    })

    const setup = createSetupScope(localVue, done, {
      $nuxt: {
        context: {
          $axios: {
            $post: postMock
          }
        }
      }
    })

    setup(async () => {
      const { tasks, createTask } = useRetainedTask({
        tasks: [
          {
            id: 100,
            name: "task-100"
          }
        ]
      })

      await createTask("new-task")

      expect(postMock).toBeCalledTimes(1)
      expect(tasks.value.length).toBe(2)
      expect(tasks.value[0]).toEqual({
        id: 100,
        name: "task-100"
      })
      expect(tasks.value[1]).toEqual({
        id: 101,
        name: "new-task"
      })
    })
  })

  it("サーバーから保有タスクリストを取得できる", done => {
    const getMock = jest.fn((): RetainedTask[] => {
      return [
        {
          id: 101,
          name: "task-101"
        },
        {
          id: 102,
          name: "task-102"
        }
      ]
    })

    const setup = createSetupScope(localVue, done, {
      $nuxt: {
        context: {
          $axios: {
            $get: getMock
          }
        }
      }
    })

    setup(async () => {
      const { tasks, fetch } = useRetainedTask()

      await fetch()

      expect(getMock).toBeCalledTimes(1)
      expect(tasks.value.length).toBe(2)
      expect(tasks.value[0]).toEqual({
        id: 101,
        name: "task-101"
      })
      expect(tasks.value[1]).toEqual({
        id: 102,
        name: "task-102"
      })
    })
  })

  it("保有タスクを削除できる", done => {
    const deleteMock = jest.fn()

    const setup = createSetupScope(localVue, done, {
      $nuxt: {
        context: {
          $axios: {
            $delete: deleteMock
          }
        }
      }
    })

    setup(async () => {
      const { tasks, deleteTask } = useRetainedTask({
        tasks: [
          {
            id: 101,
            name: "task-101"
          },
          {
            id: 102,
            name: "task-102"
          }
        ]
      })

      await deleteTask(101)

      expect(deleteMock).toBeCalledTimes(1)
      expect(deleteMock).toBeCalledWith("/users/current/tasks/101")
      expect(tasks.value.length).toBe(1)
      expect(tasks.value[0]).toEqual({
        id: 102,
        name: "task-102"
      })
    })
  })
})
