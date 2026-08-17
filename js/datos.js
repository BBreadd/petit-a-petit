// ---------------------------------------------------------------------------
// Única fuente de verdad del sitio. Ver README.md para la guía completa.
// ---------------------------------------------------------------------------

// Los apartados del menú, en el orden en que deben aparecer (nav y página).
// Agregar un apartado nuevo = agregar un objeto acá. No se toca HTML ni CSS.
// "id" debe ser una sola palabra, sin espacios ni tildes (se usa en la URL,
// ej. #zepelines), y debe coincidir exactamente con "categoria" en PRODUCTOS.
const CATEGORIAS = [
  { id: "cupcakes", nombre: "Cupcakes" },
  { id: "donas", nombre: "Donas" },
  { id: "pasteles", nombre: "Pasteles" },
  { id: "zepelines", nombre: "Zepelines" },
  { id: "roles", nombre: "Roles de canela"}
];

// Cada postre. Para agregar uno nuevo: copiar un bloque y cambiar los valores.
//
//   categoria       id de una categoría de CATEGORIAS (arriba).
//   nombre          nombre del postre.
//   precio          como texto, con el símbolo que usen (ej. "Q35.00"). Si
//                   hay descuento, este es el precio YA rebajado.
//   precioOriginal  "" = sin descuento, la tarjeta se ve normal. Con un
//                   valor (ej. "Q45.00"), aparece tachado junto a "precio"
//                   — el patrón de "antes/ahora" de cualquier tienda online.
//   descripcion     una línea corta.
//   imagenes     arreglo con 0 a 3 rutas de foto, ej. ["img/a.jpg", "img/b.jpg"].
//                [] (vacío) = se muestra un ícono de reemplazo. Con 2 o 3
//                fotos, la tarjeta muestra puntitos para pasar entre ellas.
//   destacado    true para que aparezca también en "Destacados", el
//                apartado especial que solo existe mientras haya al menos
//                un producto marcado así. false o ausente = no aparece.
//   etiqueta     texto corto para un sello en la tarjeta (ej. "Nuevo",
//                "Promo", "-20%", "Edición especial"). "" o ausente = sin
//                sello, la tarjeta se ve normal.
const PRODUCTOS = [
  // CUPCAKES
  {
    categoria: "cupcakes",
    nombre: "Cupcake de banano",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Cupcake de banano, tierno y húmedo, con un generoso corazón de Nutella en cada bocado.",
    imagenes: [],
    destacado: false,
    etiqueta: ""
  },
  {
    categoria: "cupcakes",
    nombre: "Cupcake con chispas de chocolate",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Cupcake clásico y esponjoso, repleto de chispas de chocolate en cada bocado.",
    imagenes: [],
    destacado: false,
    etiqueta: ""
  },
  {
    categoria: "cupcakes",
    nombre: "Cupcake de vainilla con perlas de chocolate",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Cupcake de vainilla suave, cubierto con una crema de chocolate y delicadas perlas comestibles.",
    imagenes: [],
    destacado: false,
    etiqueta: ""
  },
  // DONAS
  {
    categoria: "donas",
    nombre: "Dona glaseada clásica",
    precio: "Q28.00",
    precioOriginal: "Q35.00",
    descripcion: "Masa esponjosa con glaseado dulce.",
    imagenes: [],
    destacado: false,
    etiqueta: ""
  },
  // PASTELES
  {
    categoria: "pasteles",
    nombre: "Tiramisú",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Capas de bizcocho embebido en café, con una suave crema de mascarpone y un toque de cacao.",
    imagenes: [],
    destacado: false,
    etiqueta: ""
  },
  {
    categoria: "pasteles",
    nombre: "Pastel de zanahoria",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Tradicional bizcocho de zanahoria especiado, suave y húmedo, cubierto con un cremoso betún de queso crema.",
    imagenes: [],
    destacado: false,
    etiqueta: ""
  },
  // ZEPELINES
  {
    categoria: "zepelines",
    nombre: "Zepelin de banano",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Bizcocho de banano esponjoso, bañado en un glaseado suave que resalta su dulzura natural.",
    imagenes: ["img/Zepelin_Banano.jpeg"],
    destacado: false,
    etiqueta: ""
  },
  {
    categoria: "zepelines",
    nombre: "Zepelin de naranja",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Bizcocho de naranja ligero y aromático, coronado con delicadas rebanadas de naranja caramelizada.",
    imagenes: ["img/Zepelin_Naranja.jpeg"],
    destacado: false,
    etiqueta: ""
  },
  {
    categoria: "zepelines",
    nombre: "Zepelin de lavanda y limón",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Bizcocho aromático de lavanda con un toque cítrico de limón, una combinación floral y fresca.",
    imagenes: [],
    destacado: false,
    etiqueta: ""
  },
  {
    categoria: "zepelines",
    nombre: "Zepelin de zanahoria caramelizada",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Bizcocho de zanahoria húmedo y especiado, coronado con zanahoria caramelizada.",
    imagenes: [],
    destacado: false,
    etiqueta: ""
  },
  // ROLES
  {
    categoria: "roles",
    nombre: "Buttercream de Nutella",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Rol de canela tierno, relleno de un sedoso buttercream con un toque de Nutella.",
    imagenes: ["img/Rol_Buttercream_1.jpeg", "img/Rol_Buttercream_2.jpeg"],
    destacado: false,
    etiqueta: ""
  },
  {
    categoria: "roles",
    nombre: "Buttercream con kiwi",
    precio: "Q0.00",
    precioOriginal: "",
    descripcion: "Rol de canela esponjoso, cubierto con un fresco y delicado buttercream de kiwi.",
    imagenes: ["img/Rol_Buttercream_kiwi_1.jpeg"],
    destacado: false,
    etiqueta: ""
  }
];
