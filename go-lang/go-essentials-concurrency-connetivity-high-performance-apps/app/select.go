package main

import (
	"fmt"
	"time"
)

func main() {
	ch1, ch2 := make(chan int), make(chan int)
	go func() {
		ch1 <- 31
	}()
	select {
	case val1 := <-ch1:
		fmt.Printf("got %d from ch1\n", val1)
	case val2 := <-ch2:
		fmt.Printf("got %d from ch2\n", val2)
	}

	out := make(chan float64)
	go func() {
		time.Sleep(100 * time.Millisecond)
		out <- 43
	}()

	select {
	case val := <-out:
		fmt.Printf("got %f from out\n", val)
	case <-time.After(129 * time.Millisecond):
		fmt.Println("timeout")
	}
}
