

type FucntionPropertyType = {
    // ()  // Call signature, which lacks return-type annotation, implicitly has an 'any' return type.
    // () :void
    // () :any
    () :unknown
    (a: number): any
    a?: {
        b: number
    }
    b?: string
    1?: boolean
    '2'?: number
    func?(): any
}

// keyof 忽略 
type Keys = keyof FucntionPropertyType  // 'a'
let a: Keys = 'a'
let b: Keys = 'b'
// let one: Keys = '1' // 1 没有
let two: Keys = '2'
let symbol: Keys = 'func'

let type: FucntionPropertyType = function () { console.log(arguments)}
type()
type(123)
// type(true)
// 不能将类型“(a: number) => void”分配给类型“FucntionPropertyType”
// let type2: FucntionPropertyType = (a: number) => {}