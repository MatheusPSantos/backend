package main

import "fmt"

func main() {
	expressao1 := 23 == 23
	expressao2 := 23 < 23
	expressao3 := 23 <= 24
	expressao4 := 23 > 21
	expressao5 := 23 >= 21
	expressao6 := 23 != 23

	fmt.Printf("%v\n", expressao1)
	fmt.Printf("%v\n", expressao2)
	fmt.Printf("%v\n", expressao3)
	fmt.Printf("%v\n", expressao4)
	fmt.Printf("%v\n", expressao5)
	fmt.Printf("%v\n", expressao6)

}
