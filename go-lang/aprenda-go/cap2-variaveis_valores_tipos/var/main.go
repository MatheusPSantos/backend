package main

import "fmt"

var y = 10 // agora y pode ser acessada dentro de todo code block

func main() {

	fmt.Println("Hello!")

	y := 10

	qualquercoisa(y)
}

func qualquercoisa(x int) {
	fmt.Println(y)
	// dentro desse contexto não é possivel saber quem é y
	fmt.Println(x)
}
