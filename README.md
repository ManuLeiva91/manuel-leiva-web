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
2. **Automático:** para que aparezcan solas las últimas publicaciones hace falta una cuenta profesional (Creador o Empresa) y un servicio que lea el feed. Puede ser la Instagram Graph API con un token, o un widget como Behold, LightWidget o Elfsight. Se reemplaza el contenido de `#instagram` por el widget.

### TikTok
- Con `mostrarPerfilTiktok: true` y la lista `tiktokVideos` vacía, se muestra el embed oficial del perfil @manuleiva91 con sus últimos videos (se actualiza solo).
- Si preferís elegir videos puntuales, pegá sus links en `tiktokVideos`.

### Newsletter
Pegá en `newsletterAction` la URL del formulario de tu servicio (Buttondown, Mailchimp, Brevo). Mientras esté vacío, el botón abre un mail para pedir la suscripción.

## Publicar

Es un sitio estático: se sube la carpeta tal cual.
- **Netlify / Cloudflare Pages / Vercel:** arrastrar la carpeta o conectar un repositorio de GitHub. Gratis.
- **Dominio propio:** se conecta desde el panel del servicio (ej. manuelleiva.com.ar).

## Pendientes de contenido

- Datos marcados como `[FECHA]`, `[LUGAR]`, `[MEDIO]` y `[Título de la nota]` en `js/contenido.js`.
- Links reales de notas y videos (`url: "#"`).
- Confirmar la cifra de 400.000 puestos de trabajo (Foro Valor Argentino).
