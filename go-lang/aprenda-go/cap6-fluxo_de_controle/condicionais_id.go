package main

import "fmt"

func main() {
	x := 10
	if x < 10 {
		fmt.Print("Hello, it is true!\n")
	}

	// operador de negacao
	if !(x < 10) {
		fmt.Print("Hello, it is not true!\n")
	}
}
