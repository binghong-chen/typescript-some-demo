
// 元组转联合类型
type TupleToUnionType<T extends Array<any>> = T extends Array<infer U> ? U : never
type a = TupleToUnionType<[string, number, string, boolean, 'abc', 123]>
type b = TupleToUnionType<[]>
type c = TupleToUnionType<[1]>
type d = TupleToUnionType<[true, false]>
// 元组转数组
type TupleToArry<T extends Array<any>> = T extends Array<infer U> ? U[] : never
type a1 = TupleToArry<[string, number, string, boolean, 'abc', 123]>
type d1 = TupleToArry<[true, false]>
// 元组转类型
type TupleToType<T extends readonly any[]> = { [K in T[number]]: K }
type a2 = TupleToType<[string, number, string, boolean, 'abc', 123]>
type d2 = TupleToType<[true, false]>
type b2 = TupleToType<['tesla', 'model 3', 'model X', 'model Y']>
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

//readonly , extends : 当使用了 `const` 字面量代表对象字面量的属性，将使用 `readonly` 修饰，数组字面量将变成 `readonly` 元组，表达式中的任何字面量类型都不应该被扩展
//[K in T[number]] 对数组里每个index进行循环将index转换成key
type ddd = TupleToType<typeof tuple>
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}