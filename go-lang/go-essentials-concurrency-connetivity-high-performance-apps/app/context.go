package main

import (
	"context"
	"fmt"
	"time"
)

type Bid struct {
	AdURL string
	Price float64
}

func BestBid(url string) Bid {
	time.Sleep(30 * time.Millisecond)

	return Bid{
		AdURL: "https://adsPrs.com/19",
		Price: 0.04,
	}
}

var defaultBid = Bid{
	AdURL: "https://adsPrs.com/default", Price: 0.02,
}

func findBid(ctx context.Context, url string) Bid {
	ch := make(chan Bid, 1) // buffered to avois goroutine leak
	go func() {
		ch <- BestBid(url)
	}()

	select {
	case bid := <-ch:
		return bid
	case <-ctx.Done():
		return defaultBid
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()
	url := "https://http.cat/418"
	bid := findBid(ctx, url)
	fmt.Println(bid)

	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Millisecond)
	defer cancel()
	url = "https://http.cat/404"
	bid = findBid(ctx, url)
	fmt.Println(bid)
}
