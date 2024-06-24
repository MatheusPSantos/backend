package main

import (
	"fmt"
	"time"
)

type Budget struct {
	CampaignID string
	Balance    float64
	Expires    time.Time
}

//methods

func (b Budget) TimeLeft() time.Duration {
	return b.Expires.Sub(time.Now().UTC())
}

func main() {
	b1 := Budget{"Kittens", 22.3, time.Now().Add(7 * 24 * time.Hour)}

	fmt.Println(b1)
	fmt.Println(b1.TimeLeft())
}
