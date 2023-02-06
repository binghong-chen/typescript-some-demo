
class Animal {
    eat() { }
}
class Dog extends Animal {
    bark() { }
}
class GermanShepherd extends Dog {
    shepherd() { }
}

type Tuple = [Animal, Dog, GermanShepherd]

type TupleToObject<T extends readonly any[]> = { [K in T[number]]: K }


type Type1 = TupleToObject<Tuple>
type Type2 = TupleToObject<['Animal', 'Dog', GermanShepherd]>
type Type3 = TupleToObject<['Animal', 'Dog', 'GermanShepherd']>

// 转成这种
type Type0 = {
    0: Animal
    1: Dog
    2: GermanShepherd
}

// yes
type Type11 = Omit<Tuple, keyof []>
type Type12 = Omit<['Animal', 'Dog', GermanShepherd], keyof []>
type Type13 = Omit<['Animal', 'Dog', 'GermanShepherd'], keyof []>

type TupleToObject2<T> = Omit<T, keyof []>

type Type21 = TupleToObject2<Tuple>
type Type22 = TupleToObject2<['Animal', 'Dog', GermanShepherd]>
type Type23 = TupleToObject2<['Animal', 'Dog', 'GermanShepherd']>

// 可以提取出来 啥？
type DogObject = TupleToObject2<Dog>
type AnimalObject = TupleToObject2<Animal>

type DogType = {[K in keyof Dog]: Dog[K]}

type IsEqual<A, B> = A extends B ? B extends A ? true: false : false

type DogEqualDog = IsEqual<Dog, Dog>
type DogEqualAnimal = IsEqual<Dog, Animal>
type AnimalEqualDog = IsEqual<Animal, Dog>
type DogEqualDogType = IsEqual<Dog, DogType>
type DogTypeEqualDog = IsEqual<DogType, Dog>
type DogEqualDogObject = IsEqual<Dog, DogObject>
type DogObjectEqualDogType = IsEqual<DogObject, DogType>

type Test = IsEqual<{a: 1}, {a: number}>
type Test1 = IsEqual<{a: 1}, {a: 1.0}>
type Test2 = IsEqual<{}, {a: undefined}>
type Test3 = IsEqual<{a?: false}, {a: false}>
type Test4 = IsEqual<{readonly a: false}, {a: false}>
type Test5 = IsEqual<{a: false}, {readonly a: false}>

// 转成这种
type TypeX = {
    (_: Animal)
    (_: Dog)
    (_: GermanShepherd)
}
