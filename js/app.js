const ICONO_RESERVA = `
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3">
    <path d="M14 20c0-6 4.5-11 10-11s10 5 10 11" stroke-linecap="round"/>
    <path d="M10 20h28l-2 6H12l-2-6z" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 26v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 33v-4M28 33v-4" stroke-linecap="round"/>
  </svg>`;

// Arma una tarjeta de producto como elemento del DOM (no como string) para
// poder engancharle interacción: si trae 2 o 3 fotos, agrega puntos para
// pasar entre ellas a mano. Sin auto-avance por tiempo — ver README.md,
// sección "Varias fotos por producto", para el porqué.
function tarjetaProducto(producto) {
  const imagenes = Array.isArray(producto.imagenes) ? producto.imagenes.filter(Boolean) : [];
  const tieneFotos = imagenes.length > 0;

  const articulo = document.createElement("article");
  articulo.className = "tarjeta-producto";

  const marco = document.createElement("div");
  marco.className = "tarjeta-imagen";
  articulo.appendChild(marco);

  if (producto.etiqueta) {
    const sello = document.createElement("span");
    sello.className = "sello";
    sello.textContent = producto.etiqueta;
    marco.appendChild(sello);
  }

  let foto;
  if (tieneFotos) {
    foto = document.createElement("img");
    foto.src = imagenes[0];
    foto.alt = producto.nombre;
    foto.loading = "lazy";
  } else {
    foto = document.createElement("div");
    foto.innerHTML = ICONO_RESERVA;
  }
  marco.appendChild(foto);

  if (imagenes.length > 1) {
    marco.classList.add("tarjeta-imagen-galeria");
    marco.setAttribute("role", "group");
    marco.setAttribute("aria-label", `Fotos de ${producto.nombre}`);

    const puntos = document.createElement("div");
    puntos.className = "tarjeta-puntos";

    let indice = 0;
    const mostrarFoto = (nuevoIndice) => {
      indice = nuevoIndice;
      foto.style.opacity = "0";
      foto.addEventListener("load", () => { foto.style.opacity = "1"; }, { once: true });
      foto.src = imagenes[indice];
      [...puntos.children].forEach((punto, i) => punto.classList.toggle("activo", i === indice));
    };

    imagenes.forEach((_, i) => {
      const punto = document.createElement("button");
      punto.type = "button";
      punto.className = "punto" + (i === 0 ? " activo" : "");
      punto.setAttribute("aria-label", `Ver foto ${i + 1} de ${imagenes.length}`);
      punto.addEventListener("click", (evento) => {
        evento.stopPropagation();
        mostrarFoto(i);
      });
      puntos.appendChild(punto);
    });
    marco.appendChild(puntos);

    // Tocar la foto también avanza a la siguiente — cómodo en celular,
    // los puntos quedan como control fino y como referencia de posición.
    marco.addEventListener("click", () => mostrarFoto((indice + 1) % imagenes.length));
  }

  const precioAntes = producto.precioOriginal
    ? `<span class="precio-antes">${producto.precioOriginal}</span>`
    : "";

  const cuerpo = document.createElement("div");
  cuerpo.className = "tarjeta-cuerpo";
  cuerpo.innerHTML = `
    <div class="tarjeta-encabezado">
      <h3 class="tarjeta-nombre">${producto.nombre}</h3>
      <div class="precio-grupo">
        ${precioAntes}
        <span class="tarjeta-precio">${producto.precio}</span>
      </div>
    </div>
    <p class="tarjeta-descripcion">${producto.descripcion}</p>`;
  articulo.appendChild(cuerpo);

  return articulo;
}

function seccionCategoria({ id, nombre, alterna, esDestacados = false }) {
  const clases = ["categoria"];
  if (alterna) clases.push("categoria-alt");
  if (esDestacados) clases.push("categoria-destacados");

  const seccion = document.createElement("section");
  seccion.className = clases.join(" ");
  seccion.id = id;
  seccion.innerHTML = `
    ${esDestacados ? '<p class="categoria-eyebrow">Por tiempo limitado</p>' : ""}
    <h2 class="categoria-titulo">${nombre}</h2>
    <div class="divisor" aria-hidden="true"></div>
    <div class="grid-productos" id="grid-${id}"></div>`;
  return seccion;
}

function enlaceNav(id, nombre) {
  const li = document.createElement("li");
  li.innerHTML = `<a href="#${id}">${nombre}</a>`;
  return li;
}

// Arma Destacados (si aplica) y una sección por cada categoría que tenga al
// menos un producto — una categoría sin productos todavía no se muestra, ni
// en la nav ni como sección vacía. Todo sale de js/datos.js — ver README.md.
function construirMenu(categorias, productos) {
  const main = document.getElementById("mainCategorias");
  const navLinks = document.getElementById("navLinks");
  const contactoLi = navLinks.querySelector("li");

  const porCategoria = {};
  productos.forEach((producto) => {
    if (!porCategoria[producto.categoria]) porCategoria[producto.categoria] = [];
    porCategoria[producto.categoria].push(producto);
  });

  const destacados = productos.filter((producto) => producto.destacado);
  if (destacados.length > 0) {
    main.appendChild(seccionCategoria({ id: "destacados", nombre: "Destacados", esDestacados: true }));
    navLinks.insertBefore(enlaceNav("destacados", "Destacados"), contactoLi);
    const grid = document.getElementById("grid-destacados");
    destacados.forEach((producto) => grid.appendChild(tarjetaProducto(producto)));
  }

  let indiceVisible = 0;
  categorias.forEach((categoria) => {
    const productosCategoria = porCategoria[categoria.id] || [];
    if (productosCategoria.length === 0) return;

    main.appendChild(seccionCategoria({ id: categoria.id, nombre: categoria.nombre, alterna: indiceVisible % 2 === 1 }));
    navLinks.insertBefore(enlaceNav(categoria.id, categoria.nombre), contactoLi);

    const grid = document.getElementById(`grid-${categoria.id}`);
    productosCategoria.forEach((producto) => grid.appendChild(tarjetaProducto(producto)));
    indiceVisible++;
  });

  const idsConocidos = new Set(categorias.map((categoria) => categoria.id));
  productos.forEach((producto) => {
    if (!idsConocidos.has(producto.categoria)) {
      console.warn(`"${producto.nombre}" tiene categoria "${producto.categoria}", que no existe en CATEGORIAS (js/datos.js). Revisar el id.`);
    }
  });
}

function activarMenuMovil() {
  const boton = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  boton.addEventListener("click", () => {
    const abierto = links.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", String(abierto));
  });

  links.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      links.classList.remove("abierto");
      boton.setAttribute("aria-expanded", "false");
    });
  });
}

function resaltarSeccionActiva() {
  const enlaces = document.querySelectorAll(".nav-links a");
  const secciones = [...enlaces]
    .map((enlace) => document.querySelector(enlace.getAttribute("href")))
    .filter(Boolean);

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        enlaces.forEach((enlace) => enlace.classList.remove("activo"));
        const activo = document.querySelector(`.nav-links a[href="#${entrada.target.id}"]`);
        if (activo) activo.classList.add("activo");
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  secciones.forEach((seccion) => observador.observe(seccion));
}

document.getElementById("anio").textContent = new Date().getFullYear();
construirMenu(CATEGORIAS, PRODUCTOS);
activarMenuMovil();
resaltarSeccionActiva();
