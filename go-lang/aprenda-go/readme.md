# Aprendendo Go
Anotações do curso [Aprenda Go](https://www.youtube.com/playlist?list=PLCKpcjBB_VlBsxJ9IseNxFllf-UFEXOdg)

## Cap 2 - Variáveis, valores e tipos
Estrutura básica
    - package main define de onde o computador deve partir na execução do programa
    - function main: no programa podemos ter várias funções, interfaces e outras coisas, então precisamos dizer para o programa onde que ele começa e onde ele termina. É a porta de entrada e de saída em qualquer programa go.
    - notação: **package.método**
    - os `...` indica uma função variádica, ou seja, ela pode receber uma quantidade indefinida de argumentos.
    - todos os tipos implementam a interface vazia `interface{}`.
    - variáveis não declaradas dão erros.
    - blank identifier é indicado pelo `_`, significa que não queremos saber das informações.

- Variável: É um objeto, uma posição, com endereço na memória, capaz de reter ou expressar um valor ou expressão.
    - número
    - strings
    - bools (true ou false)


### Operador Curto de Declaração:    
- o operador curto de declaração é o operador `:=`
- esse é operador serve para declarar uma variável
- para mostrar o tipo e valor dentro de uma saída formatada usa-se
`fmt.Printf` e `%v` para valor e `%T` para tipo.
- A tipagem do operador curto de declaração define um tipo automático para a variável.
- se uma variável já existe e precisa-se adicionar um valor novo a mesma vaiável, usa-se um operador de declaração `= `
- o operador `:=` só funciona dentro de code blocks.

Terminologias:
- Keywords: são palavras reservadas
- operadores, operandos
- expressão: qualquer coisa que produz um resultado
- statement: (declaração, afirmação) é uma linha de instrução que forma uma ação e é formada por expressões
- scope (abrangência)
    - package-level scope
### Palavra-chave var
- Variável declarada em um code block é `undefinde` em outro
- para declarar uma variável com `package level scope` é preciso usar o `var` e fora de um code block
- Prestar atenção: chaves, colchetes e parênteses

### Tipos
- Tipos em Go são estáticos
- Ao declarar uma variável para conter valroes de um certo tipo, ela só poderá ter valores desse tipo.
- o valor pode ser declarado especificamente
    - var Nome Tipo = valor
- a declaração da variavel sem inicialização, essa inicialização so pode ser feita dentro de um code-block.
- tipos
    - int, string, bol
- Tipos compostos
    - tipos formados pelo usuário a partir dos tipos primitivos
    - slice, array, struct, map
- O ato de definir, criar e estruturar tipos compostos chama-se composição.

### Valor zero
- sempre que declarar uma variável e não inicializar ela, ela terá o valor zero.
- declaração -> alocar um espaço de memória
- inicialização -> primeiro valor guardado dentro da variável
- atribuição -> alteração do valor após ela ser inicializada
- valor zero de atribuição
    - int -> 0
    - float -> 0.0
    - boolean -> false
    - strings -> ""
    - pointers, functions, interfaces, slices, channels, maps --> nil
- usar `:=` sempre que possível
- usar `var` para package level scope


### Pacote fmt
- Setup: strings, ints, bools
- Strings: interpreted string literal vs raw string literals.
- Format printing:
    - Grupo #1: Print -> standard out
        - func Print(a ...interface{})
        - func Println(a ...interface{})
        - func Printf(a ...interface{})
            - Format verbs. (%v %T)
    - Grupo #2: Print -> string, pode ser usado como variável
        - func Sprint(a ...interface{})
        - func Sprintf(format string, a ...interface{})
        - func Sprintln(a ...interface{})
    - Grupo #3: Print -> File, write interface, e.g. arquivo ou resposta de servidor
        - func Fprint(w io.Writer, a ...interface{})
        - func Fprintf(w io.Writer, format string, a ...interface{})
        - func Fprintln(w io.Writer, a ...interface{})

### Criando o próprio tipo
- Tipos são imutáveis
- type hotdog int -> var p hotdog
- exemplo:
    ```go
    type hotdog int
    var b hotdog
    ```
### Conversão de tipos
- a = int(b)
- documentação oficial sobre conversions
    - são expressões da forma T(x) one T é o tipo e x é uma expressão que pode ser convertida para o tipo T.

## Cap 2 - Fundamentos de programação
### Tipos numéricos

- int vs. float: Números inteiros vs. números com frações
- ref/spec -> numeric types
- Integers:
    - Números inteiros
    - int & uint -> "implementation- specific size"
    - Todos os tipos são distintos, execto:
        - byte = uint8
        - rune = int32 (UTF8)
        - na codificação utf8 podemos usar 1,2 ou 3 bytes
    - Tipos são únicos
        - Go é uma linguagem estática
        - int e int32 não são a mesma coisa
        - Par "misturá-los" é necessário conversão
    - Regra gera: usar somente `int`
- Floating point:
    - São números racionais ou reais
    - Regra geral: use somente float64
- Na prática:
    - Defaults com :=
    - Tipagem com var
    - Dá pra colocar número com virgula em tipo int? não.
    - Overflow
- implementation-specific size? Runtime package. Word.
    - GOOS
    - GORUNTIME
- Overflow:
    - um uint16, por exemplo, vai de 0 a 65535
    - o que acontece se tentar usar 65536?
    - se tivermos no 65535 e adicionarmos mais 1?

### Tipos strings
- string são sequencia de bytes

### Sistemas numéricos
- decimal
- binário
- hexa-decimal
### Constantes
- são valores imutáveis
- podem ser tipadas ou não:
    - const oi = "bom dia"
    - const oi string = "bom dia"
- As não tipadas só terão um tipo atribuido a elas quando forem usadas;
    - Ex. qual o tipo de 42? int? uint? float64?
    - ou seja, é uma flexibilidade conveniente.
- Na prática: int, float, string
    - const x = y
    - const (x = y)
    - exemplo: 
    ```
    const ( 
            x = 10
            u = 012
            k = 0b23
            )
    ```

### Iotas
Dentro de uma declaração de uma constante, o identificador `iota` representa constantes sucessivos inteiros não tipados.
- uma forma de declarar iota
```
const (
	a = iota
	_
	c
	x
	y
	z
)
```
- pode-se aplicar formulas
```
const (
	a = iota * 2
	_
	c
	x
	y
	z
)
// saida => a = 0, c = 4, x = 6. y = 8, z = 10
```

### Deslocamento de bits
- Deslocamento de bits é quando deslocamos binários para a esquerda ou direita.
- Na prática:
    - %d %b
    - x << y
    - iota * 10 << 10 = kb, mb, gb