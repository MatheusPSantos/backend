package main

import "fmt"

func main() {

	x:= "olá mundo\nComo vai?\ttudo no \"conformes\"?" // interpreted string literal
	y:= `"olá 
	mundo
		Como vai?
		tudo no \"conformes\"?
		"` // literal string
	fmt.Println(x)
	fmt.Println(y)

	t:= "oi"
	v := fmt.Sprint(t)

	fmt.Print(v)
}