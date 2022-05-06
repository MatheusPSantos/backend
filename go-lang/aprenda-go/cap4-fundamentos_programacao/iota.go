package main

import "fmt"

// const (
// 	a = iota
// 	_ = iota
// 	c = iota
// 	x = iota
// 	y = iota
// 	z = iota
// )

// outra forma de declarar
const (
	a = iota * 2
	_
	c
	x
	y
	z
)

func main() {
	fmt.Println(a, c, x, y, z)
}
