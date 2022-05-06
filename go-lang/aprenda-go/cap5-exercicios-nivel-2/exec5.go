package main

import "fmt"

func main() {
	var literal = `
		<html lang="en-us">
			<head>
				<title>String literal</title>
			</head>
			<body>
				<h1>Hello world</h1>
			</body>
		</html>
	`

	fmt.Print(literal)
}
