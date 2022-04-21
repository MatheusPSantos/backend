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
- A