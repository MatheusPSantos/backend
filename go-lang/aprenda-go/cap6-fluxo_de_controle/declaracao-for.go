package main

import "fmt"

func main() {
	x := 0

	for x < 10 {
		fmt.Print("\nx menor que dez\n")
		x++
	}

	y := 0

	for {
		if y < 20 {
			y++
			fmt.Println("y ==> ", y)
		} else {
			fmt.Println("y maior que 20")
			break
		}
	}
}
