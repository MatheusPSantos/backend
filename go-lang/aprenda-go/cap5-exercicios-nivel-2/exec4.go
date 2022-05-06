package main

import "fmt"

func main() {
	var variavel = 3
	fmt.Printf("%d, %b, %#x\n", variavel, variavel, variavel)

	segunda_variavel := variavel >> 1
	fmt.Printf("%d, %b, %#x\n", segunda_variavel, segunda_variavel, segunda_variavel)
}
