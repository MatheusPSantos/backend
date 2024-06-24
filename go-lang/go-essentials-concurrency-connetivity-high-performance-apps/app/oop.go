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

func NewBudget(campaingID string, balance float64, expires time.Time) (*Budget, error) {
	if campaingID == "" {
		return nil, fmt.Errorf("empty campaingID")
	}

	if balance <= 0 {
		return nil, fmt.Errorf("balance must be bigger than 0")
	}

	b := Budget{
		CampaignID: campaingID,
		Balance:    balance, Expires: expires,
	}

	return &b, nil
}

func main() {
	expires := time.Now().Add(7 * 24 * time.Hour)
	b1, err := NewBudget("puppies", 214.5, expires)
	if err != nil {
		fmt.Println("Error: ", err)

	} else {
		fmt.Printf("%#v\n", b1)
	}
	b2, err := NewBudget("Fly", -13.5, expires)
	if err != nil {
		fmt.Println("Error: ", err)

	} else {
		fmt.Printf("%#v\n", b2)
	}
}
