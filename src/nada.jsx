Excelente pregunta!

Para elegir una posición de un array con la función `random`, puedes utilizar la siguiente fórmula:

```
const indiceAleatorio = Math.floor(Math.random() * array.length);
```

Donde:

- `Math.random()` genera un número aleatorio entre 0 y 1.
- `array.length` es el tamaño del array.
- `Math.floor()` redondea el número aleatorio hacia abajo, para obtener un índice válido para el array.

Aquí te presento un ejemplo:

```
const miArray = [1, 2, 3, 4, 5];
const indiceAleatorio = Math.floor(Math.random() * miArray.length);
console.log(`Índice aleatorio: ${indiceAleatorio}`);
console.log(`Valor en el índice aleatorio: ${miArray[indiceAleatorio]}`);
```

Este código generará un índice aleatorio entre 0 y 4 (el tamaño del array), y luego mostrará el valor en ese índice.

Recuerda que los índices en JavaScript comienzan en 0, por lo que el primer elemento del array está en el índice 0.