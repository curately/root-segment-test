export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type PrettifyNested<T> = {
  [K in keyof T]: T[K] extends object ? PrettifyNested<T[K]> : T[K]
} & {}

export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] }

// useful for transforming db keys in our dto to match the keys in our domain
export type RenameKeys<T, U> = {
  [K in keyof U as K extends keyof T ? (T[K] extends string ? T[K] : never) : K]: K extends keyof U ? U[K] : never
}
