package main

import "fmt"

var e = "This is a message"

//e := "This is a message" // isso irá resultar em um error
func main() {
	x := 10
	y := "Hello! Good Morning!"

	fmt.Printf("x: %v, %T\n", x, x)
	fmt.Printf("y: %v, %T\n", y, y)

	x = 12

	fmt.Printf("x: %v, %T\n", x, x)

	x, z := 133, 12222
	fmt.Printf("x: %v, %T\n", x, x)
	fmt.Printf("z: %v, %T\n", z, z)

	fmt.Printf("A variável 'e' tem package level scope: %v\n", e)
}
