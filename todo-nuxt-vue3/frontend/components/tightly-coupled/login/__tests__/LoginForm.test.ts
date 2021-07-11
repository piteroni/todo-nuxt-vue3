import { mount, createLocalVue } from "@vue/test-utils"
import { AxiosErrorStub, createMock, useStderrMock, waitUntilForDone } from "@/shared/testing"
import LoginForm from "@/components/tightly-coupled/login/LoginForm.vue"

const localVue = createLocalVue()

describe("ログインフォーム", () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
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

  it("メールアドレス欄に空文字が入力されている場合、エラーメッセージが表示され、ログインは実施されない", async () => {
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

    await loginForm.find("#email").setValue("")
    await loginForm.find("#password").setValue("password1!")
    await loginForm.find(".loginButton").trigger("click")

    await waitUntilForDone()

    expect(loginMock).toBeCalledTimes(0)
    expect(loginForm.find(".emailErrorMessage").exists()).toBeTruthy()
    expect(loginForm.find(".emailErrorMessage").text()).not.toBe("")
  })

  it("パスワード欄に空文字が入力されている場合、エラーメッセージが表示され、ログインは実施されない", async () => {
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

    await loginForm.find("#email").setValue("user@example.com")
    await loginForm.find("#password").setValue("")
    await loginForm.find(".loginButton").trigger("click")

    await waitUntilForDone()

    expect(loginMock).toBeCalledTimes(0)
    expect(loginForm.find(".passwordErrorMessage").exists()).toBeTruthy()
    expect(loginForm.find(".passwordErrorMessage").text()).not.toBe("")
  })

  it("ログインに失敗すると、エラーメッセージが表示される", async () => {
    const throwAxiosError = () => {
      throw createMock(AxiosErrorStub, {
        isAxiosError: true,
        response: {
          status: 422, // 入力内容がドメインに従わない場合のステータスコード
          data: {
            message: "error message"
          }
        }
      })
    }

    const loginMock = jest.fn(throwAxiosError)

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

    await loginForm.find("#email").setValue("user@example.com")
    await loginForm.find("#password").setValue("password1!")
    await loginForm.find(".loginButton").trigger("click")

    expect(loginMock).toBeCalledTimes(1)
    expect(loginForm.find(".errorMessage").exists()).toBeTruthy()
    expect(loginForm.find(".errorMessage").text()).toBe("error message")
  })

  it("ログイン中に例外が発生した場合に、例外のハンドリングが行われる", async () => {
    const errorMock = jest.fn()
    const loginMock = jest.fn(() => { throw new Error("error-message") })

    const loginForm = mount(LoginForm, {
      localVue,
      mocks: {
        $nuxt: {
          context: {
            $auth: {
              login: loginMock,
            },
            error: errorMock
          }
        }
      }
    })

    const stderr = useStderrMock()

    await loginForm.find("#email").setValue("user@example.com")
    await loginForm.find("#password").setValue("password1!")
    await loginForm.find(".loginButton").trigger("click")

    expect(loginMock).toBeCalledTimes(1)
    /* エラーページ表示が要求される */
    expect(errorMock).toBeCalledTimes(1)
    expect(errorMock).toBeCalledWith({ message: "error-message" })
    /* エラーオブジェクトがコンソールに渡される */
    expect(stderr).toBeCalledTimes(1)
    expect(stderr.mock.calls[0][0]).toBeInstanceOf(Error)
  })

  it("ログイン中にネットワークエラーが発生した場合に、コンポーネント側で例外のハンドリングは特段行われない", async () => {
    const throwAxiosError = () => {
      throw createMock(AxiosErrorStub, {
        isAxiosError: true,
        response: undefined
      })
    }

    const loginMock = jest.fn(throwAxiosError)
    const loginForm = mount(LoginForm, {
      localVue,
      mocks: {
        $nuxt: {
          context: {
            $auth: {
              login: loginMock,
            },
          }
        }
      }
    })

    await loginForm.find("#email").setValue("user@example.com")
    await loginForm.find("#password").setValue("password1!")
    await loginForm.find(".loginButton").trigger("click")

    expect(loginMock).toBeCalledTimes(1)
  })
})
