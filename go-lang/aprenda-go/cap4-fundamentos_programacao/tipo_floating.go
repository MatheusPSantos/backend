package main

import "fmt"

var a = 10
var b = 10.0

func main() {
	x := 10
	y := 10.0
	fmt.Printf("%v, %T\n", x, x)
	fmt.Printf("%v, %T\n", y, y)

	fmt.Printf("%v, %T\n", a, a)
	fmt.Printf("%v, %T\n", b, b)

	x = 10.5
	fmt.Printf("%v, %T\n", x, x)
}
