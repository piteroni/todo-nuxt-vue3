import { AxiosError } from "axios"
import { mount, createLocalVue } from "@vue/test-utils"
import { waitUntilForDone, waitUntilForMounted } from "@/shared/testing"
import LoginForm from "@/components/tightly-coupled/login/LoginForm.vue"

const localVue = createLocalVue()

describe("ログインフォーム", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("ユーザーアカウント情報を送信すると、ログイン処理が呼び出される", async () => {
    const loginMock = jest.fn()

    const loginForm = mount(LoginForm, {
      localVue,
      mocks: {
        $nuxt: {
          context: {
            $auth: {
              login: loginMock
            }
          }
        }
      }
    })

    await waitUntilForMounted()

    await loginForm.find("#email").setValue("user@example.com")
    await loginForm.find("#password").setValue("password1!")
    await loginForm.find(".loginButton").trigger("click")

    await waitUntilForDone()

    expect(loginMock).toBeCalledTimes(1)
    expect(loginMock).toBeCalledWith({
      data: {
        email: "user@example.com",
        password: "password1!",
      }
    })
  })

  it("認証に失敗すると、認証に失敗した旨が表示されログイン処理が中断される", async () => {
    const loginMock = jest.fn(() => {
      // throw new
    })

    const loginForm = mount(LoginForm, {
      localVue,
      mocks: {
        $nuxt: {
          context: {
            $auth: {
              login: loginMock
            }
          }
        }
      }
    })
  })
})
