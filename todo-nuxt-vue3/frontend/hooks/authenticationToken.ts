import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { computed, InjectionKey, reactive, useContext } from "@nuxtjs/composition-api"

const state = reactive({
  token: ""
})

type State = typeof state

const authenticateTokenKey = "authenticate-token"

const isStore = (state: State) => (): boolean => {
  return state.token === ""
}

const setUp = (state: State) => (): void => {
  const token = window.localStorage.getItem(authenticateTokenKey)

  if (token) {
    state.token = token
  }
}

const verify = ($axios: NuxtAxiosInstance) => async () => {
  await $axios.$post("/credentials/verify")
}

const fetch = (state: State, $axios: NuxtAxiosInstance) => async (email: string, password: string) => {
  const response = await $axios.$post<{ token: string }>("/login", { email, password })

  state.token = response.token
  localStorage.setItem(authenticateTokenKey, response.token)
}

export const useAuthenticationToken = () => {
  const { $axios } = useContext()

  return {
    token: computed(() => state.token),
    isStore: isStore(state),
    setUp: setUp(state),
    verify: verify($axios),
    fetch: fetch(state, $axios)
  }
}

export const authenticationTokenKey: InjectionKey<AuthenticationToken> = Symbol("AuthenticationToken")

export type AuthenticationToken = ReturnType<typeof useAuthenticationToken>
