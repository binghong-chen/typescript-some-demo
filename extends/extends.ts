class Animal {
    eat() { }
}
class Dog extends Animal {
    bark() { }
}
class GermanShepherd extends Dog {
    shepherd() { }
}


type Animal_Dog = Animal extends Dog ? true : false
type Dog_Animal = Dog extends Animal ? true : false  // Dog <= Animal
// 协变
type Animal_Dog_R = (() => Animal) extends (() => Dog) ? true : false
type Dog_Animal_R = (() => Dog) extends (() => Animal) ? true : false  // () => Dog <= () => Animal
// 逆变s
type A_Animal_Dog = ((arg: Animal) => any) extends ((arg: Dog) => any) ? true : false    // (arg: Animal) => void <= (arg: Dog) => void
type A_Dog_Animal = ((arg: Dog) => any) extends ((arg: Animal) => any) ? true : false

// 都是 false
type void_number = void extends number ? true : false
type number_void = number extends void ? true : false
type G = (() => void) extends ((arg: number) => void) ? true : false    // () => void <= (arg: number) => void
type H = ((arg: number) => void) extends (() => void) ? true : false

type I = ((arg: any) => void) extends ((arg: number) => void) ? true : false    // (arg: any) => void == (arg: number) => void
type J = ((arg: number) => void) extends ((arg: any) => void) ? true : false    // (arg: any) => void == (arg: number) => void

type k = never extends number ? true : false    // never <= number
type l = number extends never ? true : false
type K = ((arg: never) => void) extends ((arg: number) => void) ? true : false
type L = ((arg: number) => void) extends ((arg: never) => void) ? true : false    // (arg: number) => void <= (arg: never) => void
