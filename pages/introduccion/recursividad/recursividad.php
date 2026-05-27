<?php
    // La recursividad en un lenguaje más coloquial es cuando una función se llama a sí misma. 
    // En un lenguaje más técnico, la recursividad es una técnica de programación en la que una función se llama a sí misma dentro de su propia definición para resolver un problema.

    // Ejemplo 1.- Factorial con función recursiva
    function factorial($n){ // Defino una función llamada factorial que recibe un parámetro $n, que en este caso será un número entero
        // Caso base
        if($n == 0 || $n == 1){ // Mi caso base es que si $n es igual a 0 o 1, el valor del factorial es 1, ya que 0! y 1! son ambos iguales a 1
            return 1; // Retorno el valor de 1
        }
        // Llamadas recursivas
        return $n * factorial($n - 1); // Si $n es mayor que 1, se realizará una llamada recursiva a la función factorial, en la que multiplaremos $n por el resultado de factorial($n - 1).
        // Nota: Esta llamada recursiva se repetirá hasta que $n = 1 o $n = 0
    }
    // Llamamos a la función recursiva
    echo "El factorial de 5 es: " . factorial(5);
        // Internamente la función se ejecutará de la siguiente manera:
            // factorial(5) -> 5 * factorial(4)
            // factorial(4) -> 4 * factorial(3)
            // factorial(3) -> 3 * factorial(2)
            // factorial(2) -> 2 * factorial(1)
            // factorial(1) -> 1 (caso base)
    
    echo "<br>";

    // Ejemplo 2.- Suma de los primeros n números naturales
    function suma($n){
        if($n == 0){ // $n = 0 es mi caso base, ya que la suma de los primeros 0 números naturales es 0
            return 0;
        }
        // Llamada recursiva
        return $n + suma($n - 1); // Si $n es mayor que 0, se realizará una llamada recursiva a la función suma en la que sumaremos $n al resultado de suma($n - 1)
    }
    // Llamamos a la función recursiva
    echo "La suma de los primeros 5 números naturales es: " . suma(5) . "<br>";

    // Ejemplo 3.- Contador regresivo
    function contador($n){
        if($n < 0){
            return; // Caso base: Si $n es menor que 0, se detienen las llamadas recursivas y se retorna sin hacer nada
        }
        // Llamada recursiva
        return contador($n - 1) . $n . "<br>"; // Si $n es mayor o igual a 0, se realizará una llamada recursiva a la función contador, en la que concatenamos el valor de $n al resultado de contador($n - 1), y un <br> para separar los números 
    }
    // Llamamos a la función recursiva
    echo "Contador regresivo desde 20: <br>" . contador(20);

    // Ejemplo 4.- Fibonacci


    // Ejemplo 5.- Invertir una cadena de texto
    
?>