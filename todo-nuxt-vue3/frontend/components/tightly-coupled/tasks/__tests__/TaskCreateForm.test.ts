import { createLocalVue, mount } from "@vue/test-utils"
import { provide } from "@nuxtjs/composition-api"
import { useRetainedTask, retainedTaskKey } from "@/composables/retainedTask"
import { waitUntilForMounted } from "@/shared/testing"
import TaskList from "@/components/tightly-coupled/tasks/TaskList.vue"

const localVue = createLocalVue()

describe("保有タスクリスト", () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it("保有タスクリスト上に保存された保有タスクが表示される", async () => {
    const composition = () => useRetainedTask({
      tasks: [
        {
          id: 1,
          name: "task-1"
        },
        {
          id: 2,
          name: "task-2"
        }
      ]
    })

    const taskList = mount(TaskList, {
      localVue,
      setup() {
        provide(retainedTaskKey, composition())
      }
    })

    await waitUntilForMounted()

    const tasks = taskList.findAll(".taskList .task")

    expect(tasks.exists()).toBeTruthy()
    expect(tasks.length).toBe(2)
    expect(tasks.at(0).text()).toBe("task-1")
    expect(tasks.at(1).text()).toBe("task-2")
  })

  it("タスク削除ボタンを押下すると、タスク削除処理を呼ばれる", async () => {
    const deleteTaskMock = jest.fn()

    const composition = () => useRetainedTask({
      tasks: [
        {
          id: 20,
          name: "task-20"
        },
        {
          id: 21,
          name: "task-21"
        },
        {
          id: 22,
          name: "task-22"
        }
      ]
    })

    const taskList = mount(TaskList, {
      localVue,
      setup() {
        provide(retainedTaskKey, {
          ...composition(),
          deleteTask: deleteTaskMock
        })
      }
    })

    await waitUntilForMounted()

    await taskList.find(".taskList .task .deleteButton").trigger("click")

    /* 保有タスク削除APIが呼ばれる */
    expect(deleteTaskMock).toBeCalledTimes(1)
    expect(deleteTaskMock).toBeCalledWith(20)
  })
})
