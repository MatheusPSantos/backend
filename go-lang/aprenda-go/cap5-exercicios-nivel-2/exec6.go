package main

import "fmt"

const (
	ano1 = 2022 + iota
	ano2
	ano3
	ano4
)

func main() {

	fmt.Println(ano1)
	fmt.Println(ano2)
	fmt.Println(ano3)
	fmt.Println(ano4)
}
