/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function range(start: number, end: number): number[] {
  return Array.from({ length: (end - start + 1) }, (_, k) => k + start)
}

/**
 * 指定されたオブジェクトがクラスで宣言されたか否かを取得する.
 *
 * @param value 検査対象オブジェクト
 * @returns 指定されたオブジェクトがクラスで宣言されていればtrueを返す.
 */
export function isClass(value: any): boolean {
  return value && typeof value === "function" && typeof value.constructor === "function"
}
