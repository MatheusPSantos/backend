package main

import (
	"fmt"
	"math"
	"net/http"
	"strings"
)

func main() {
	fmt.Println("Hello World")

	// var x int
	// var y int
	var x float64
	var y float64

	x = 3.0
	y = 4.0

	fmt.Printf("x=%v, type of %T\n", x, x)
	fmt.Printf("y=%v, type of %T\n", y, y)

	mean := (x + y) / 2.0
	fmt.Printf("result: %v, type of %T\n", mean, mean)

	if frac := y / x; frac > 0.5 {
		fmt.Println("initializarion statement in if statement")
	}

	for i := 0; i <= 20; i++ {
		if i%3 == 0 {
			fmt.Println("fizz")
		} else if i%5 == 0 {
			fmt.Println("buzz")
		} else if i%3 == 0 && i%5 == 0 {
			fmt.Println("fizz buzz")
		} else {
			fmt.Println(i)
		}
	}

	book := "Refactoring"
	fmt.Println(book[4:7])

	// count := 0
	// for a := 1000; a <= 9999; a++ {
	// 	for b := a; b <= 9999; b++ {
	// 		n := a * b
	// 		s := fmt.Sprintf("%d", n)
	// 		if s[0] == s[len(s)-1] {
	// 			fmt.Println(s)
	// 			count++
	// 		}
	// 	}
	// }

	// fmt.Println("Number of even-ended: ", count)

	// chalenge

	nums := []int{16, 8, 42, 2, 23, 15}
	max := nums[0]
	for _, value := range nums[1:] {
		if value > max {
			max = value
		}
	}
	fmt.Println(max)

	// MAPS
	stocks := map[string]float64{
		"AMZN": 1234.24,
		"GOOG": 1235.86,
		"MSFT": 674123.2,
	}

	fmt.Println(stocks["MSFT"])

	// setting value
	stocks["TSLA"] = 234.52
	fmt.Println(stocks)
	// delete value
	delete(stocks, "GOOG")
	fmt.Println(stocks)

	for key, val := range stocks {
		fmt.Printf("%s -> %.2f\n", key, val)
	}

	// chalenge
	text := `
	Needles and pins
	Needles and pins
	Sew me a sail
	To catch me the wind
	`

	words := strings.Fields(text)
	counts := map[string]int{}
	for _, word := range words {
		counts[strings.ToLower(word)]++
	}
	fmt.Println(counts)

	// functions

	val := 10
	double(10)
	fmt.Println(val)
	//pointer
	doublePtr(&val)
	fmt.Println(val)

	s1, err := sqrt(2.0)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(s1)
	}
}

func double(n int) {
	n *= 2
}

func doublePtr(n *int) {
	*n *= 2
}

func sqrt(n float64) (float64, error) {
	if n < 0 {
		return 0.0, fmt.Errorf("sqrt of megative value %f", n)
	}
	return math.Sqrt(n), nil
}

// callenge
func contentType(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	ctype := resp.Header.Get("Content-Type")
	if ctype == "" {
		return "", fmt.Errorf("can't find Content-Type header")
	}
	return ctype, nil

	
}
