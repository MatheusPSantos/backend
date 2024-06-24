package main

import (
	"fmt"
	"math"
)

type Square struct {
	Length float64
}

func (s Square) Area() float64 {
	return s.Length * s.Length
}

type Circle struct {
	Radius float64
}

func (c Circle) Area() float64 {
	return math.Pi * c.Radius * c.Radius
}

func sumAreas(shapes []Shape) float64 {
	total := 0.0

	for _, shape := range shapes {
		total += shape.Area()
	}
	return total
}

type Shape interface {
	Area() float64
}

func main() {
	sq := Square{2}
	fmt.Println(sq.Area())

	cir := Circle{2}
	fmt.Println(cir.Area())

	shap := []Shape{sq, cir}
	ar := sumAreas(shap)
	fmt.Println(ar)
}