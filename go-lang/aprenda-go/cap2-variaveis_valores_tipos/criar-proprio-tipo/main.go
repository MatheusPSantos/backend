package main

import "fmt"

type hotdog int
var b hotdog

var c hotdog = 102

func main(){
	x := 10
	fmt.Printf("%T\n", b)
	fmt.Printf("%T\n", x)

	//x = c

	// conversao de tipo
	fmt.Printf("%v\n", x)
	x = int(c)
	fmt.Printf("%v\n", x)
}