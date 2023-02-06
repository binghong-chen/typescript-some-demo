type Tuple = [string, number, boolean]
type Head<T extends any[]> = T[0]
type Union<T, U> = T | U
type Recursion<T extends any[], E = never> = {
    1: E,
    0: Recursion<ArrayShift<T>, Union<E, Head<T>>>
}[T extends [] ? 1 : 0]

type ArrayShift<T extends any[]> = T extends [first: any, ...rest: infer R] ? R : never

// 元组转联合类型
type UnionTuple = Recursion<Tuple> // string | number | boolean

