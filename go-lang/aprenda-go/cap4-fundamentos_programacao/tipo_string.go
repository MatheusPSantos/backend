package main

import "fmt"

func main() {
	s := "ãé"
	slice_bytes := []byte(s)

	fmt.Printf("%v\n%T\n", slice_bytes, slice_bytes)

	for _, v := range slice_bytes {
		fmt.Printf("%v - %T - %#U - %#x\n", v, v, v, v)
	}
	fmt.Println("---------------")
	for i := 0; i < len(s); i++ {
		fmt.Printf("%v - %T - %#U - %#x\n", s[i], s[i], s[i], s[i])
	}
}
