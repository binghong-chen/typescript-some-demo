
// 逆变 & 协变

type TupleToObject<T> = Omit<T, keyof []>

class Animal {
    eat() { }
}
class Dog extends Animal {
    bark() { }
}
class GermanShepherd extends Dog {
    shepherd() { }
}

type AB<A, B> = (arg: A) => B

type P<T> = (arg: T) => any
type R<T> = () => T

type TypeExtends<A, B> = A extends B ? true : false
type Extends<A, B> = () => TypeExtends<A, B>

type Y = '<=' | 'return <=' | 'arg <='
type Z = '>=' | 'return >=' | 'arg >='

type X<A, B> = {
    '<=': [TypeExtends<A, B>, '', '']
    '>=': [TypeExtends<B, A>, '', '']
    'return <=': [TypeExtends<R<A>, R<B>>, '() => ', '']
    'return >=': [TypeExtends<R<B>, R<A>>, '() => ', '']
    'arg <=': [TypeExtends<P<A>, P<B>>, '', ' => void']
    'arg >=': [TypeExtends<P<B>, P<A>>, '', ' => void']
}

type Pair = [string, any]

type X1<A extends Pair, B extends Pair> = X<A[1], B[1]>

type PairToX<A extends Pair, B extends Pair> = {
    [K in keyof X<A, B>
    as `${X1<A, B>[K][1]}${K extends Y ? A[0] : B[0]}${X1<A, B>[K][2]} <= ${X1<A, B>[K][1]}${K extends Y ? B[0] : A[0]}${X1<A, B>[K][2]}`]: X1<A, B>[K][0]
}

/**
 * 将联合类型转为对应的交叉函数类型
 * @template U 联合类型
 */
type UnionToInterFunction<U> =
    (U extends any ? (k: () => U) => void : never) extends
    ((k: infer I) => void) ? I : never

/**
 * 获取联合类型中的最后一个类型
 * @template U 联合类型
 */
type GetUnionLast<U> = UnionToInterFunction<U> extends { (): infer A; } ? A : never

/**
 * 在元组类型中前置插入一个新的类型（元素）；
 * @template Tuple 元组类型
 * @template E 新的类型
 */
type Prepend<Tuple extends any[], E> = [E, ...Tuple]

/**
 * 联合类型转元组类型；
 * @template Union 联合类型
 * @template T 初始元组类型
 * @template Last 传入联合类型中的最后一个类型（元素），自动生成，内部使用
 */
type UnionToTuple<Union, T extends any[] = [], Last = GetUnionLast<Union>> = {
    0: T;
    1: UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>
}[[Union] extends [never] ? 0 : 1]

type TypeTupleToX<T extends { [propName: string]: any }, K extends [string, string]> = PairToX<[K[0], T[K[0]]], [K[1], T[K[1]]]>

type TypeToX<T> = TypeTupleToX<T, UnionToTuple<keyof T>>

type AnimalDog = TypeToX<{
    Animal: Animal
    Dog: Dog
}>
type result2 = TypeToX<{}>
type result3 = TypeToX<{ 1: 1 }>
type numberundefined = TypeToX<{ number: number, undefined: undefined }>
type number1 = TypeToX<{ number: number, 1: 1 }>
type numberboolean = TypeToX<{ number: number, boolean: boolean }>
type anyboolean = TypeToX<{ any: any, boolean: boolean }>
type anynever = TypeToX<{ any: any, never: never }>

type Pany = P<any>
type Pboolean = P<boolean>

type anyboolean2 = any extends boolean ? true : false
type PanyPboolean = P<any> extends P<boolean> ? true : false
type PbooleanPany = P<boolean> extends P<any> ? true : false
type RanyRboolean = R<any> extends R<boolean> ? true : false
type RbooleanRany = R<boolean> extends R<any> ? true : false

type anynever2 = any extends never ? true: false
type anynever3 = never extends any ? true: false