package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

func returnType(url string) {
	res, err := http.Get(url)
	if err != nil {
		fmt.Printf("error: %s\n", err)
		return
	}
	defer res.Body.Close()
	ctype := res.Header.Get("Content-Type")
	fmt.Printf("%s -> %s\n", url, ctype)
}

func siteSerial(urls []string) {
	for _, url := range urls {
		returnType(url)
	}
}

func sitesConcurrent(urls []string) {
	var wg sync.WaitGroup
	for _, url := range urls {
		wg.Add(1)
		go func(url string) {
			returnType(url)
			wg.Done()
		}(url)
	}
	wg.Wait()
}

func main() {
	urls := []string{
		"https://golang.org", "https://api.github.com", "https://httpbin.org/ip",
	}

	start := time.Now()
	siteSerial(urls)
	fmt.Println(time.Since(start))


	start2 := time.Now()
	sitesConcurrent(urls)
	fmt.Println(time.Since(start2))
}
