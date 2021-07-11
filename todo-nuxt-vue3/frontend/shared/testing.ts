import { AxiosError } from "axios"
import flushPromises from "flush-promises"
import { isClass } from "@/shared/util"

/**
 * 例外を発生させ、処理を失敗させる.
 */
export const fail = (): void => {
  throw new Error("fail")
}

/**
 * マウントが完了するまで待つ.
 */
export const waitUntilForMounted = async (): Promise<void> => {
  await flushPromises()
}

/**
 * 処理が完了するまで待つ.
 */
export const waitUntilForDone = async (): Promise<void> => {
  await flushPromises()
}

/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * 標準出力モックを取得する.
 */
export const useStdoutMock = (): jest.SpyInstance => {
  let stdout!: jest.SpyInstance

  beforeAll(() => {
    stdout = jest.spyOn(console, "log").mockImplementation(() => {})
  })

  afterAll(() => {
    stdout.mockReset()
    stdout.mockRestore()
  })

  return stdout
}

/**
 * エラー標準出力をスタブ化する.
 */
export const stubStderr = (): jest.SpyInstance => {
  return jest.spyOn(console, "error").mockImplementation(() => {})
}

/**
 * エラー標準出力モックを取得する.
 */
export const useStderrMock = (): jest.SpyInstance => {
  return jest.spyOn(console, "error").mockImplementation(() => {})
}

/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */

export function createMock<T extends object>(o: T | Constructor<T>, entries: PartialDeep<T>): T {
  if (isClass(o)) {
    return Object.assign(new (o as Constructor<T>)(), entries)
  } else {
    return Object.assign(o as T, entries)
  }
}

type Constructor<T = {}> = new (...args: any[]) => T

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

export type PartialDeep<T> = T extends Primitive
  ? Partial<T>
  : T extends Map<infer KeyType, infer ValueType>
  ? PartialMapDeep<KeyType, ValueType>
  : T extends Set<infer ItemType>
  ? PartialSetDeep<ItemType>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? PartialReadonlyMapDeep<KeyType, ValueType>
  : T extends ReadonlySet<infer ItemType>
  ? PartialReadonlySetDeep<ItemType>
  : T extends (...args: any[]) => unknown // eslint-disable-line @typescript-eslint/no-explicit-any
  ? T | undefined
  : T extends object
  ? PartialObjectDeep<T>
  : unknown;

type PartialMapDeep<KeyType, ValueType> = Map<PartialDeep<KeyType>, PartialDeep<ValueType>>

type PartialSetDeep<T> = Set<PartialDeep<T>>

type PartialReadonlyMapDeep<KeyType, ValueType> = ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>>

type PartialReadonlySetDeep<T> = ReadonlySet<PartialDeep<T>>

type PartialObjectDeep<ObjectType extends object> = {
  [KeyType in keyof SuppressObjectPrototypeOverrides<ObjectType>]?: PartialDeep<
    SuppressObjectPrototypeOverrides<ObjectType>[KeyType]
  >;
};

type SuppressObjectPrototypeOverrides<ObjectType> = Pick<
  ObjectType,
  Exclude<keyof ObjectType, keyof Object>
> &
  Pick<Object, Extract<keyof Object, keyof ObjectType>>;

export class AxiosErrorStub extends Error implements AxiosError {
  public name = ""
  public message = ""
  public isAxiosError = true
  public config = {}
  public response = {
    data: {},
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  }

  public toJSON() {
    return () => {}
  }
}
