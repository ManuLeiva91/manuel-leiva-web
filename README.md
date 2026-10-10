# Web de Manuel Leiva

Sitio estático en HTML, CSS y JavaScript, sin dependencias ni instalación.
Diseño: versión V2 del canvas "Manuel Leiva · Landing".

## Estructura

```
index.html          → la página
css/estilos.css     → todos los estilos (colores, tipografía, responsive)
js/contenido.js     → EL ARCHIVO PARA CARGAR CONTENIDO (eventos, notas, redes)
js/app.js           → la lógica (no hace falta tocarlo para cargar contenido)
img/                → fotos y logos
  eventos/          → fotos de charlas y congresos
  logos/            → FACTTIC, Redjar, Cooperar
```

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

### Redjar
La sección "Asociado a Redjar" sale del bloque `redjar` de `contenido.js`: `kicker`, `titulo`, `intro`, `parrafos`, `foto`/`foto2`, `cifras` (se animan al aparecer), `historia`, `servicios`, `modalidades`, `alianzas` y `direccion`. Cada alianza puede llevar `logo` (SVG o PNG con fondo transparente, se muestra en blanco translúcido) y `url`. Los logos están en `img/logos/aliados/`. Si se borra el bloque, la sección y su link del menú desaparecen.

### Videos (YouTube)
Sección "Videos": reproductor grande y lista. Se cargan en `videos` de `contenido.js` (`id` del video, `titulo`, `medio`, opcional `inicio` en segundos y `descripcion`). El de arriba de la lista es el que se ve grande al entrar. El reproductor de YouTube recién se carga cuando alguien toca play.

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

- [ ] Probar un mail desde otra cuenta a `hola@manuleiva.com` y confirmar que llega a la casilla de Redjar. (Los MX de ImprovMX ya están publicados en los tres servidores de Donweb.)
- [ ] Cargar los otros 3 registros A de GitHub Pages (`185.199.109.153`, `.110.153`, `.111.153`); hoy hay solo uno.
- [ ] Newsletter (EnvíaloSimple): formulario conectado y funcionando. Falta: tocar "Verificar dominio" en EnvíaloSimple (el TXT `domain_verification.SjYbTA` ya está publicado en Donweb), cargar el DKIM si lo pide, y definir la automatización de bienvenida.
- [ ] **Descripciones de los videos:** 8 de los 9 tienen solo una línea con datos del medio. Completar con lo que Manuel dice en cada uno (pegar la transcripción o 1–2 frases por video).
- [ ] Decidir si los temas de "De qué hablo" filtran "Lo último" (hoy los cuatro llevan a la misma sección).
- [ ] **Sección "Asociado a Redjar":** ya publicada. Falta enriquecer la historia (hoy tiene 4 hitos: 2015, Foro ASETT 2025, comité del CICM 2026 y hoy) con cómo nació la cooperativa, y evaluar sumar logos de clientes y testimonios (están en redjar.com.ar).
- [ ] Cambiar el mail de contacto a `hola@manuleiva.com` cuando el reenvío funcione.
- [ ] Confirmar la cifra de 400.000 puestos de trabajo (Foro Valor Argentino) y el año de fundación de FACTTIC (la web dice 2012; otras fuentes, 2011).
- [ ] Fecha de la entrevista de La Capital Más ("In Situ") y de "Las cooperativas construyen un mundo mejor".
- [ ] Video del Plenario FACTTIC (hoy el tile lleva al Instagram de FACTTIC).
- [ ] Mejorar el área táctil en mobile de los links del footer y del logo del menú.
