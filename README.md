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

### TikTok
- Con `mostrarPerfilTiktok: true` y la lista `tiktokVideos` vacía, se muestra el embed oficial del perfil @manuleiva91 con sus últimos videos (se actualiza solo).
- Si preferís elegir videos puntuales, pegá sus links en `tiktokVideos`.

### Newsletter
Pegá en `newsletterAction` la URL del formulario de tu servicio (Buttondown, Mailchimp, Brevo). Mientras esté vacío, el botón abre un mail para pedir la suscripción.

## Publicar

Es un sitio estático. Está publicado con **GitHub Pages** en https://manuleiva.com (repo `ManuLeiva91/manuel-leiva-web`, rama `main`). Cada `git push` a `main` republica el sitio en uno o dos minutos. El archivo `CNAME` le indica a GitHub el dominio: no borrarlo.
- **DNS:** se administra en Donweb (zona DNS de manuleiva.com). Registros A hacia GitHub Pages, CNAME de `www`, y MX/TXT de ImprovMX para el reenvío de `hola@manuleiva.com`.

## Tareas futuras

- [ ] **DNS Donweb:** confirmar que los MX y el TXT de ImprovMX estén publicados en los tres servidores (`ns1`, `ns2`, `ns3.hostmar.com`). A la última revisión solo `ns2` los tenía. Si no se sincronizan, escribir a soporte de Donweb. Probar con un mail a `hola@manuleiva.com`.
- [ ] Cargar los otros 3 registros A de GitHub Pages (`185.199.109.153`, `.110.153`, `.111.153`); hoy hay solo uno.
- [ ] **Newsletter:** conectar EnvíaloSimple (reemplaza a Mailchimp). Necesita lista, formulario HTML y remitente `hola@manuleiva.com` verificado.
- [ ] **Sección sobre Redjar** en la web (por ahora solo hay un link en "Hagamos contacto").
- [ ] Cambiar el mail de contacto a `hola@manuleiva.com` cuando el reenvío funcione.
- [ ] Confirmar la cifra de 400.000 puestos de trabajo (Foro Valor Argentino) y el año de fundación de FACTTIC (la web dice 2012; otras fuentes, 2011).
- [ ] Fecha de la entrevista de La Capital Más ("In Situ") y de "Las cooperativas construyen un mundo mejor".
- [ ] Video del Plenario FACTTIC (hoy el tile lleva al Instagram de FACTTIC).
- [ ] Mejorar el área táctil en mobile de los links del footer y del logo del menú.
