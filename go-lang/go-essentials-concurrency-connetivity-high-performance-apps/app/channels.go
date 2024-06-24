package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make(chan int)
	//ch <- 353 //send

	go func() {
		ch <- 353
	}()

	val := <-ch //receive

	fmt.Printf("got %d\n", val)

	// another example
	count := 3
	go func() {
		for i := 0; i < count; i++ {
			fmt.Println("sending ", i)
			ch <- i
			time.Sleep(time.Millisecond * 500)
		}
		close(ch)
	}()

	for i := 0; i < count; i++ {
		val := <-ch
		fmt.Println("received ", val)
	}

	ch2 := make(chan int, 1)
	ch2 <- 9
	val2 := <-ch2
	fmt.Println(val2)
}
