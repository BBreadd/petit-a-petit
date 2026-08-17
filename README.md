# Petit à Petit — sitio del menú

Sitio estático de una sola página. Sin build, sin dependencias: se abre
`index.html` y ya. Todo el contenido (postres, apartados, destacados,
promos) vive en un solo archivo de datos; el resto del código solo lo
dibuja. Esta guía explica cómo tocar ese archivo sin romper nada.

## Previsualizar

Doble clic en `index.html`. Se abre en el navegador tal cual quedaría
publicado.

## Estructura

```
sitio-web/
  index.html          esqueleto de la página (hero, nav vacía, pie)
  css/estilos.css      todo el estilo visual
  js/datos.js          ← el único archivo que van a tocar casi siempre
  js/app.js            arma la página a partir de datos.js
```

`index.html` y `app.js` casi no deberían necesitar cambios para el uso
normal del día a día. Si algo pide tocarlos seguido, es señal de que
falta modelar ese caso como dato — preguntar antes de forzarlo a mano.

## Agregar un postre

Abrir `js/datos.js`, copiar un bloque de `PRODUCTOS` y cambiar los
valores:

```js
{
  categoria: "cupcakes",       // debe existir en CATEGORIAS (ver abajo)
  nombre: "Cupcake de fresa",
  precio: "Q35.00",
  precioOriginal: "",          // "" = sin descuento; con valor, sale tachado
  descripcion: "Bizcocho de vainilla, crema batida y fresa fresca.",
  imagenes: [],                 // [] = ícono de reemplazo; hasta 3 rutas
  destacado: false,            // true = también aparece en "Destacados"
  etiqueta: ""                 // "" = sin sello; o "Nuevo", "Promo", "-20%"...
}
```

Guardar y recargar la página. No hace falta tocar ningún otro archivo.

Si `categoria` no coincide con ningún id de `CATEGORIAS`, el producto
no se pierde silenciosamente: al abrir la consola del navegador
(F12 → Console) va a aparecer una advertencia con el nombre del
producto y la categoría mal escrita. Eso fue justo lo que pasó con los
"zepelines" la primera vez.

Una categoría de `CATEGORIAS` que todavía no tiene ningún producto no se
muestra — ni la sección ni su link en el menú. Aparece sola en cuanto el
primer producto le apunta con ese `categoria`. Así se puede dejar
preparado un apartado nuevo (ej. "Roles de canela") con la categoría ya
creada, sin que se vea una sección vacía hasta tener algo que poner ahí.

## Agregar un apartado nuevo (categoría)

Esto es lo que falló con "zepelines": agregar productos con esa
categoría no alcanza, porque antes el HTML tenía una sección fija por
cada apartado (`<section id="donas">`, etc.) escrita a mano, y el
`grid-zepelines` que buscaba el JS no existía en ningún lado — de ahí
que no se "registrara".

Ahora los apartados también son datos. Para agregar uno, en
`js/datos.js`, en el arreglo `CATEGORIAS`:

```js
const CATEGORIAS = [
  { id: "cupcakes", nombre: "Cupcakes" },
  { id: "donas", nombre: "Donas" },
  { id: "pasteles", nombre: "Pasteles" },
  { id: "zepelines", nombre: "Zepelines" },
  { id: "galletas", nombre: "Galletas" }   // ← nuevo apartado
];
```

Con esa línea sola ya aparece: el link en la barra de navegación, la
sección en la página con su título, y el contenedor donde van a caer
los productos que tengan `categoria: "galletas"`. El orden del arreglo
es el orden en que se muestran.

Reglas para el `id`: una sola palabra, sin espacios ni tildes (se
usa como ancla de URL, `#galletas`), y tiene que ser exactamente el
mismo string que se use en `categoria` dentro de cada producto.

## Destacados

Es un apartado especial y temporal: no se define como categoría fija,
sino que se arma solo a partir de la propiedad `destacado` de los
productos. Cualquier producto con `destacado: true` aparece ahí
además de en su categoría normal (no se duplica el dato, solo se
muestra en dos lugares).

Si ningún producto tiene `destacado: true`, la sección "Destacados" y
su link en el menú directamente no existen en la página — no queda un
espacio vacío ni un link muerto. Para activar una promoción de
temporada: poner `destacado: true` en los productos que corresponda.
Para desactivarla: volver a `false`. Nada más que tocar.

Se decidió así (y no como una categoría más) porque un destacado
normalmente ya pertenece a otra categoría — sería raro tener que
elegir entre "está en Donas" o "está en Destacados" cuando en realidad
son las dos cosas a la vez.

## Etiquetas (sellos: "Nuevo", "Promo", "-20%"...)

El campo `etiqueta` pone un sello sobre la foto del producto. Es un
texto libre, así que sirve para lo que haga falta: `"Nuevo"`,
`"Promo"`, `"-20%"`, `"Edición especial"`, `"Solo fin de semana"`. Con
`etiqueta: ""` no se muestra nada — la tarjeta queda igual que
cualquier otra.

## Descuentos (precio tachado)

Para una oferta real, con precio anterior tachado junto al precio
rebajado — el patrón de cualquier tienda online — se usa el campo
`precioOriginal` de cada producto:

```js
{
  ...
  precio: "Q28.00",           // el precio de ahora, con descuento
  precioOriginal: "Q35.00",   // el de antes; tachado, al lado
  etiqueta: "Oferta"          // opcional, para el sello sobre la foto
}
```

Con `precioOriginal: ""` la tarjeta se ve normal, sin nada tachado.
Para quitar una promoción, alcanza con vaciar ese campo (y volver
`precio` a su valor de siempre).

`precio` y `precioOriginal` siguen siendo texto libre, igual que antes
— no calculan el porcentaje de descuento solos. Fue a propósito:
armar ese cálculo implica también decidir un formato de precio fijo
(número, moneda aparte, decimales), y ahora mismo la ventaja de
poder escribir el precio como quieran (`"Q35.00"`, `"35 Q"`, lo que
sea) pesa más que ahorrarse escribir un `-20%` a mano en `etiqueta`
cuando haga falta. Si en algún momento quieren que el sitio calcule
el porcentaje solo, es un cambio puntual — decime y lo armamos con el
formato de precio que definamos.

## Contacto real (Instagram y WhatsApp)

Ya están puestos, en `index.html`, dentro de `.pie-enlaces`:

```html
<div class="pie-enlaces">
  <a href="https://www.instagram.com/petitapetitgt/" class="pie-enlace" target="_blank" rel="noopener noreferrer">Instagram</a>
  <a href="https://wa.me/50238704869" class="pie-enlace" target="_blank" rel="noopener noreferrer">WhatsApp</a>
</div>
```

Si hay que cambiarlos (nuevo número, nueva cuenta) o agregar un tercero
(Facebook, TikTok...), mismo patrón:

- **Instagram:** `https://www.instagram.com/usuario/` — la URL del
  perfil, sin el `?igsh=...` que agrega la app al compartir (es un
  parámetro de tracking de una sola vez, no hace falta en un link
  permanente).
- **WhatsApp:** `https://wa.me/CODIGOPAISNUMERO`, todo junto, sin `+`,
  espacios, guiones ni paréntesis — así lo pide la documentación
  oficial de WhatsApp. Opcional: `?text=Hola, quiero hacer un pedido`
  al final para que el mensaje ya venga escrito.
- **`target="_blank" rel="noopener noreferrer"`** en los tres: abre el
  enlace en pestaña nueva (no se pierde el menú de fondo) y evita que
  la página de destino pueda manipular esta pestaña — buena práctica
  de seguridad estándar para cualquier link externo.

## Fotos reales

Crear la carpeta `sitio-web/img/` y poner ahí las fotos. Después, en
cada producto de `datos.js`, poner la ruta dentro de `imagenes`:
`imagenes: ["img/nombre-del-archivo.jpg"]`.

## Varias fotos por producto (galería)

Un producto puede llevar hasta 3 fotos: `imagenes: ["img/a.jpg",
"img/b.jpg", "img/c.jpg"]`. Con 2 o más, la tarjeta muestra puntitos
abajo de la foto; tocar un punto (o tocar la foto misma) pasa a la
siguiente, con un fundido corto.

No lo hice con cambio automático por tiempo (el "cooldown" que
preguntaban), a propósito:

- Con varias tarjetas visibles a la vez en la grilla, cada una
  cambiando sola en su propio momento se ve inquieto — compite con la
  idea de un menú elegante y tranquilo, que fue el estilo que
  eligieron desde el principio.
- El cliente rara vez se queda mirando una tarjeta fija el tiempo
  suficiente como para que el cambio automático le sirva de algo;
  las más de las veces ve la primera foto nada más, o se pierde el
  cambio.
- Es una animación corriendo todo el tiempo en cada tarjeta con
  varias fotos, aunque nadie la esté mirando — gasto de más sin
  beneficio real.

Con puntos, la persona interesada en un postre puntual puede ver sus
2-3 ángulos cuando quiere, a su ritmo, y el resto de la página se
queda quieta. Si más adelante lo prueban y de verdad prefieren el
cambio automático, es un ajuste chico — decime y lo agrego.

## Publicarlo

El sitio vive en este repositorio (privado) y se publica con Netlify o
Vercel. Cualquier cambio que se suba a la rama `main` se despliega
solo — editar `datos.js`, subir el cambio, y en un minuto ya está
reflejado en el link público. No hace falta ningún paso extra de
"publicar".
