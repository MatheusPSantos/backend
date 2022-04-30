package main

import "fmt"

type umTipo int

var x umTipo

func main() {
	fmt.Printf("x => %v\n", x)
	fmt.Printf("x => %T\n", x)
	x = 42
	fmt.Printf("x => %v\n", x)
	
}