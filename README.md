# Web de Manuel Leiva

Sitio estático en HTML, CSS y JavaScript, sin dependencias ni instalación.
Diseño: versión V2 del canvas "Manuel Leiva · Landing".

## Estructura

```
index.html          → la landing (inicio): hero, temas, lo último, adelantos, redes, datos
charlas/            → agenda, "ya pasaron", dónde estuve, presencia de FACTTIC
videos/             → reproductor y lista de videos (acepta /videos/?v=ID)
blog/               → índice con selector + un .html por artículo
sobre-mi/           → quién soy y, a continuación, Redjar
404.html, robots.txt, sitemap.xml
css/estilos.css     → todos los estilos (colores, tipografía, responsive)
js/contenido.js     → EL ARCHIVO PARA CARGAR CONTENIDO (eventos, notas, videos, blog, redes)
js/app.js           → la lógica (no hace falta tocarlo para cargar contenido)
img/                → fotos y logos (eventos/, logos/, logo/, og/)
tools/              → ayuda para quien edita (no es parte del sitio): plantillas y script
```

## Menú, contacto y pie compartidos

El encabezado (menú), el bloque de contacto con el newsletter y el pie son **los mismos en todas las páginas** y salen de `tools/plantillas/` (`header.html`, `contacto.html`, `footer.html`). Cada página tiene marcas `<!--LAYOUT:HEADER-->…<!--/LAYOUT:HEADER-->` (y CONTACTO y FOOTER) y un script las completa. Para cambiar el menú o el pie: editar la plantilla y correr, desde la raíz del proyecto:

```
powershell -File tools\aplicar-layout.ps1
```

Para sumar una página nueva: copiar una existente, dejar las marcas vacías y agregarla a la lista `$paginas` del script (los artículos de `blog/` se detectan solos). Los links viejos tipo `/#redjar` redirigen a la página nueva con un aviso de unas pocas líneas en `index.html`.

## Cómo verla en tu compu

Abrir `index.html` con doble clic funciona para casi todo. Los embeds de Instagram y TikTok
necesitan que la página se sirva por http. Para eso, desde esta carpeta:

```
python3 -m http.server 8000
```

y abrí http://localhost:8000. Otra opción: `npx serve`.

## Cómo cargar contenido (js/contenido.js)

### Eventos
Cada evento es un bloque `{ ... }` dentro de `eventos`. El campo `quien` decide dónde aparece:

| quien      | Dónde aparece |
|------------|---------------|
| `"manuel"` | Agenda si es futuro; "Dónde estuve" si ya pasó y tiene foto |
| `"facttic"`| Solo en la fila "Presencia de FACTTIC" |
| `"ambos"`  | En los dos lugares |

- La fecha va como `"2026-10-28"`. Cuando pasa la fecha (o `fechaFin`), el evento sale solo de la Agenda y pasa a "Dónde estuve".
- Si no hay fecha, usá `fecha: null` y `proximo: true` (va a la Agenda) o `proximo: false` (va a "Dónde estuve").
- La franja "Próxima charla" del inicio muestra automáticamente el primer evento de la Agenda.
- Foto nueva: guardala en `img/eventos/` (ideal: JPG, menos de 1400 px de ancho) y poné `foto: "img/eventos/nombre.jpg"`.

### Lo último
En `contenidos`, tipo `"nota"`, `"video"` o `"placa"`. Las notas y videos llevan foto y `url` (el link a la nota o al video). Las placas llevan colores y titular.

### Instagram
Instagram no permite mostrar el perfil completo sin una API. Hay dos caminos:

1. **Simple (ya implementado):** pegá en `instagramPosts` los links de los posts o reels que quieras mostrar. La web los muestra con el embed oficial de Instagram. Mientras la lista esté vacía, se ven las placas de diseño.
2. **Automático (activo):** `instagramFeedUrl` apunta al JSON feed de Behold (plan gratis: 6 posts y 1.200 vistas por mes; si se pasa, el servicio se pausa hasta el mes siguiente y la web vuelve sola a las placas de diseño).

### Blog
El blog vive en su propia página, `/blog/` (con el mismo menú y pie que la portada), y se llega desde "Blog" en el menú. La lista y el selector por categoría (Todo / Estudios / Notas en medios…) salen del bloque `blog` de `contenido.js`; el selector se arma solo con las categorías que haya cargadas. Hay dos tipos de entrada:
- `tipo: "articulo"`: el texto completo vive en su propia página dentro de `blog/` (ej. `blog/mi-nota.html`). Para sumar uno, copiar `blog/potencialidades-y-desafios-del-cooperativismo-tecnologico.html`, cambiar título, descripción, URLs canónicas, fechas y el JSON-LD de su `<head>`, escribir el cuerpo, agregar la entrada en `contenido.js` y la URL en `sitemap.xml`.
- `tipo: "externa"`: nota publicada en otro medio; lleva `medio`, `url` (link a la nota), `resumen` y foto. Abre en pestaña nueva y no necesita página propia.

### SEO
- `index.html` y cada página del blog tienen título, descripción, URL canónica, Open Graph, Twitter Card y datos estructurados (JSON-LD: persona, organizaciones, sitio, blog, artículos). Los eventos próximos de la agenda y la lista del blog también generan JSON-LD desde `contenido.js` (para un evento hace falta `ciudad`, `region` y `pais`).
- `robots.txt` y `sitemap.xml` están en la raíz. **Al publicar un artículo nuevo, agregarlo al sitemap.**
- La imagen para compartir en redes está en `img/og/manuel-leiva-og.jpg` (1200×630).
- `404.html` es la página de error de GitHub Pages (no se indexa).
- Pendiente fuera del código: verificar el dominio en Google Search Console (propiedad de dominio, con un registro TXT en Donweb) y enviar `https://manuleiva.com/sitemap.xml`; lo mismo en Bing Webmaster Tools.

### Redjar
La sección "Asociado a Redjar" sale del bloque `redjar` de `contenido.js`: `kicker`, `titulo`, `intro`, `parrafos`, `foto`/`foto2`, `cifras` (se animan al aparecer), `historia`, `servicios`, `modalidades`, `alianzas` y `direccion`. Cada alianza puede llevar `logo` (SVG o PNG con fondo transparente, se muestra en blanco translúcido) y `url`. Los logos están en `img/logos/aliados/`. La sección está en `/sobre-mi/`, después de "Quién soy". Si se borra el bloque, la sección no se muestra.

### Videos (YouTube)
Página `/videos/` (y un adelanto de 3 en la landing): reproductor grande y lista. Se cargan en `videos` de `contenido.js` (`id` del video, `titulo`, `medio`, opcional `inicio` en segundos y `descripcion`). El de arriba de la lista es el que se ve grande al entrar. El reproductor de YouTube recién se carga cuando alguien toca play.

### TikTok
- Con links en `tiktokVideos` (hasta 8) se muestran los reproductores oficiales de TikTok en formato vertical. Hay que sumar el link a mano cuando se sube un video nuevo.
- `tiktokModo: "tarjetas"` cambia a tarjetas con foto (cada video como bloque `{ url, foto, titulo }`, con la miniatura en `img/tiktok/`). TikTok no deja pedir la miniatura desde el navegador, por eso hay que guardarla.
- Con la lista vacía se muestra una tarjeta que lleva al perfil, o el embed oficial (caja blanca, no se puede estilizar) si `mostrarPerfilTiktok: true`.

### Newsletter
El formulario usa el diseño de la web y envía los datos a **EnvíaloSimple** (`newsletterEnvialo` en `contenido.js`: `administratorId` y `formId`, que salen del código de instalación del formulario). Pide un captcha de imagen, que se carga recién cuando alguien toca el campo de email. Si `newsletterEnvialo` queda vacío, el botón abre un mail. La automatización de bienvenida y la doble confirmación se configuran en el panel de EnvíaloSimple, no en el código.

## Publicar

Es un sitio estático. Está publicado con **GitHub Pages** en https://manuleiva.com (repo `ManuLeiva91/manuel-leiva-web`, rama `main`). Cada `git push` a `main` republica el sitio en uno o dos minutos. El archivo `CNAME` le indica a GitHub el dominio: no borrarlo.
- **DNS:** se administra en Donweb (zona DNS de manuleiva.com). Registros A hacia GitHub Pages, CNAME de `www`, y MX/TXT de ImprovMX para el reenvío de `hola@manuleiva.com`.

## Tareas futuras

- [ ] **Google Search Console y Bing Webmaster Tools:** verificar `manuleiva.com` (propiedad de dominio, con un registro TXT en Donweb) y enviar `https://manuleiva.com/sitemap.xml`. Pedir que FACTTIC, Redjar, Cooperar y los perfiles sociales enlacen al sitio.
- [ ] Fechas del artículo de la exposición de Santa Fe: confirmar que fue el 26/06/2025 (figura en `contenido.js` y en `blog/la-potencia-…html`).
- [ ] Reemplazar las fotos genéricas de las entradas externas del blog (nota de La Capital y entrevista de Redacción Rosario) por fotos propias del medio o del evento.
- [ ] Cargar los otros 3 registros A de GitHub Pages en Donweb (`185.199.109.153`, `.110.153`, `.111.153`); hoy hay solo uno. Es opcional, da redundancia.
- [ ] **Descripciones de los videos:** 8 de los 9 tienen solo una línea con datos del medio. Completar con lo que Manuel dice en cada uno.
- [ ] Decidir si los temas de "De qué hablo" filtran "Lo último" (hoy los cuatro llevan a la misma sección).
- [ ] Fecha de la entrevista de La Capital Más ("In Situ") y de "Las cooperativas construyen un mundo mejor".
- [ ] Video del Plenario FACTTIC (hoy el tile lleva al Instagram de FACTTIC).
- [ ] Mejorar el área táctil en mobile de los links del footer y del logo del menú.

## Hecho

- Dominio manuleiva.com con HTTPS, mail `hola@manuleiva.com` (reenvío con ImprovMX) y dominio autenticado en EnvíaloSimple (SPF, DKIM, DMARC).
- Datos confirmados: +400.000 puestos de trabajo (Foro Valor Argentino) y FACTTIC fundada en 2012.
