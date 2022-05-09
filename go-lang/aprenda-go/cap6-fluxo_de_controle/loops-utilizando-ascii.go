package main

import "fmt"

func main() {

	for x := 33; x <= 122; x++ {
		fmt.Printf("|\t%d\t|\t%v\t|\n", x, string(x))
	}
}
