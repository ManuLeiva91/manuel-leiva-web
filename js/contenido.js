/* =====================================================================
   CONTENIDO DE LA WEB — este es el único archivo que hay que tocar
   para cargar eventos, notas, videos y publicaciones de redes.

   Reglas rápidas:
   - Fechas en formato "AAAA-MM-DD" (ej: "2026-10-28"). Si no la sabés, poné null.
   - Fotos: guardalas en /img/eventos/ y poné la ruta, ej: "img/eventos/mi-foto.jpg".
   - Lo que está entre [CORCHETES] es un dato pendiente de completar.
   - Respetá las comas entre elementos y las comillas.
   ===================================================================== */

window.CONTENIDO = {

  /* ---------- Redes ---------- */
  redes: {
    instagram: "manuleiva91",
    tiktok: "manuleiva91",
    linkedin: "manuleiva",
    email: "manuel.leiva@redjar.com.ar",
    facttic: "https://www.facttic.org.ar"
  },

  /* Publicaciones de Instagram a mostrar (copiá el link de cada post o reel).
     Ej: "https://www.instagram.com/p/ABC123xyz/"  o  "https://www.instagram.com/reel/ABC123xyz/"
     Si la lista está vacía, se muestran las placas de diseño de abajo (placasInstagram). */
  instagramPosts: [
    // "https://www.instagram.com/p/CODIGO/",
  ],

  /* Instagram automático (Behold, JSON feed): pegá acá la URL del feed, ej:
     "https://feeds.behold.so/XXXXXXXX". Si está cargada, tiene prioridad sobre instagramPosts.
     Si queda vacía o el servicio falla, se muestran instagramPosts o las placas de diseño. */
  instagramFeedUrl: "https://feeds.behold.so/NdjWYisAG20rPHu0nB39",

  /* Videos de TikTok a mostrar. Ej: "https://www.tiktok.com/@manuleiva91/video/7412345678901234567"
     Si la lista está vacía y mostrarPerfilTiktok es true, se muestra el perfil completo (últimos videos). */
  tiktokVideos: [
    // "https://www.tiktok.com/@manuleiva91/video/ID_DEL_VIDEO",
  ],
  mostrarPerfilTiktok: true,

  /* Newsletter (Mailchimp): pegá acá la URL de "action" del formulario embebido
     (Audience → Signup forms → Embedded forms), ej:
     "https://xxxx.us21.list-manage.com/subscribe/post?u=XXXX&id=YYYY&f_id=ZZZZ".
     Si queda vacío, el botón abre un mail. */
  newsletterAction: "",

  /* ---------- Destacado del inicio ---------- */
  destacado: {
    etiqueta: "Conferencia",
    titulo: "Congreso Internacional de Cooperativas y Mutuales",
    detalle: "Estación Fluvial, Rosario · 25 de julio de 2026",
    foto: "img/eventos/cicm-escenario.jpg",
    alt: "Manuel Leiva hablando en el escenario del CICM en Rosario",
    url: "#charlas"
  },

  /* ---------- Eventos ----------
     quien: "manuel"  → aparece en Agenda (si es futuro) o en "Dónde estuve" (si pasó y tiene foto)
            "facttic" → aparece solo en la fila "Presencia de FACTTIC"
            "ambos"   → aparece en los dos lugares
     proximo: true/false fuerza que vaya a la Agenda o no (útil si todavía no hay fecha).
     presencia: texto corto para la pastilla de "Presencia de FACTTIC" (opcional). */
  eventos: [
    {
      titulo: "Congreso Internacional de Cooperativas y Mutuales", lugar: "Rosario", tipo: "Congreso",
      fecha: "2026-07-25", fechaTexto: "25 de julio de 2026",
      tema: "Comisión Organizadora · moderador del panel «Incubando la cooperación»",
      foto: "img/eventos/cicm-escenario.jpg", alt: "Manuel Leiva hablando en el escenario del CICM en Rosario", posicion: "50% 35%",
      quien: "manuel"
    },
    {
      titulo: "General Roca", lugar: "Río Negro", tipo: "Conferencia",
      fecha: "2026-10-28", fechaFin: "2026-10-29", fechaTexto: "28 y 29 de octubre de 2026",
      tema: "IA y cooperativismo tecnológico", quien: "manuel"
    },
    {
      titulo: "Cuyo Tech Week", lugar: "Mendoza", tipo: "Conferencia",
      fecha: "2026-10-07", fechaTexto: "7 de octubre de 2026",
      tema: "Cooperar es mejor que competir",
      foto: "img/eventos/cuyo-tech-week.jpg", alt: "Manuel Leiva exponiendo en Cuyo Tech Week, Mendoza", posicion: "50% 25%",
      quien: "manuel"
    },
    {
      titulo: "Asamblea ACI", lugar: "Panamá", tipo: "Asamblea",
      fecha: "2026-09-12", fechaFin: "2026-09-19", fechaTexto: "septiembre 2026",
      foto: "img/eventos/aci-escenario.jpg", alt: "Manuel Leiva frente al escenario de la Alianza Cooperativa Internacional", posicion: "50% 35%",
      quien: "ambos", presencia: "ACI · Asamblea 2026, Panamá"
    },
    {
      titulo: "Vincular Inteligente 2026", lugar: "Rosario", tipo: "Conferencia",
      fecha: "2026-05-22", fechaTexto: "22 de mayo de 2026", tema: "IA y producción · Redjar",
      foto: "img/eventos/vincular.jpg", alt: "Manuel Leiva en Vincular Inteligente 2026", posicion: "50% 25%",
      quien: "manuel", proximo: false
    },
    {
      titulo: "Las cooperativas construyen un mundo mejor", lugar: "Santa Fe", tipo: "Panel",
      fecha: null, fechaTexto: "Congreso Internacional · 2025",
      foto: "img/eventos/mundo-mejor.jpg", alt: "Panel del congreso Las Cooperativas Construyen un Mundo Mejor",
      quien: "manuel", proximo: false
    },
    {
      titulo: "JOC 2026 · ASCOOP", lugar: "Cartagena, Colombia", tipo: "Conferencia",
      fecha: "2026-04-16", fechaFin: "2026-04-17", fechaTexto: "16 y 17 de abril de 2026", tema: "Cooperar, construir y fortalecer las redes cooperativas",
      foto: "img/eventos/joc-patio.jpg", alt: "Manuel Leiva presentando FACTTIC y PATIO en el escenario",
      quien: "manuel", proximo: false
    },
    {
      titulo: "1º Foro Internacional ASETT", lugar: "Mondragón", tipo: "Caso de éxito",
      fecha: "2025-05-27", fechaFin: "2025-05-30", fechaTexto: "27 al 30 de mayo de 2025", tema: "Redjar, caso de éxito mundial",
      foto: "img/eventos/asett-libro.jpg", alt: "Manuel Leiva con la publicación de Redjar en el foro ASETT",
      quien: "manuel", proximo: false
    },
    {
      titulo: "ICA Global Cooperative Conference", lugar: "Nueva Delhi, India", tipo: "Panel",
      fecha: "2024-11-25", fechaFin: "2024-11-30", fechaTexto: "noviembre 2024",
      tema: "Digital and New Technologies",
      foto: "img/eventos/ica-panel.jpg", alt: "Manuel Leiva en el panel Digital and New Technologies de la ICA", posicion: "30% 70%",
      quien: "ambos", presencia: "ACI · Conferencia mundial 2024, Nueva Delhi"
    },
    { titulo: "AgroTIC", quien: "facttic", fecha: null, presencia: "AgroTIC" },
    { titulo: "Congreso de Cooperativas Agropecuarias de Buenos Aires", quien: "facttic", fecha: null, presencia: "Cooperativas Agropecuarias de Buenos Aires" },
    { titulo: "ACA Jóvenes", quien: "facttic", fecha: null, presencia: "ACA Jóvenes" }
  ],

  /* ---------- Lo último: notas, videos y placas ----------
     tipo: "nota" | "video" | "placa". Las placas no llevan foto: llevan colores y titular. */
  contenidos: [
    {
      tipo: "nota", etiqueta: "Nota · IA y trabajo",
      foto: "img/eventos/congreso-panel.jpg", alt: "Panel del Congreso Internacional de Cooperativas y Mutuales",
      titulo: "Podemos desarrollar una IA argentina", detalle: "Revista Acción · 24 de septiembre de 2026", url: "https://accion.coop/2026/09/24/pais/voces/podemos-desarrollar-una-ia-argentina/"
    },
    {
      tipo: "placa", etiqueta: "Placa · Instagram",
      fondo: "#88155D", titular: "Un <span style='color:#8FD3F4'>argentino</span> vuelve a presidir el cooperativismo mundial",
      titulo: "No es un logro individual: es el reconocimiento a un modelo",
      detalle: "Carrusel · septiembre 2026", url: "https://instagram.com/manuleiva91"
    },
    {
      tipo: "nota", etiqueta: "Nota · IA y trabajo",
      foto: "img/eventos/cicm-afiche.jpg", alt: "Manuel Leiva con el afiche del CICM",
      titulo: "La salida es asociativa", detalle: "El Eslabón · 25 de julio de 2026", url: "https://elesla.com/2026/07/25/la-salida-es-asociativa/"
    },
    {
      tipo: "nota", etiqueta: "Nota · Cooperativismo tecnológico",
      foto: "img/retrato.jpg", alt: "Retrato de Manuel Leiva", posicion: "50% 20%",
      titulo: "Cooperativismo tecnológico: el potencial argentino para ser potencia mundial", detalle: "La Capital · 4 de agosto de 2026", url: "https://www.lacapital.com.ar/la-capital/cooperativismo-tecnologico-el-potencial-argentino-ser-potencia-mundial-n10273022.html"
    },
    {
      tipo: "video", etiqueta: "Video",
      foto: "img/plenario-facttic.jpg", alt: "Plenario de FACTTIC en Rosario",
      titulo: "Plenario FACTTIC en Rosario", detalle: "Diciembre de 2023", url: "https://www.instagram.com/facttic.ar/"
    },
    {
      tipo: "nota", etiqueta: "Nota · Economía social",
      foto: "img/eventos/congreso-pantallas.jpg", alt: "Manuel Leiva en las pantallas del Congreso Internacional de Cooperativas y Mutuales",
      titulo: "La potencia del sector asociativo en la vidriera: se celebra congreso internacional de cooperativas y mutuales", detalle: "El Ciudadano · 24 de julio de 2026", url: "https://elciudadanoweb.com/la-potencia-del-sector-asociativo-en-la-vidriera-se-celebra-congreso-internacional-de-cooperativas-y-mutuales/"
    },
    {
      tipo: "placa", etiqueta: "Placa · Dato",
      fondo: "#15111A", cifra: "312 a 1", bajada: "CEO frente al salario medio, S&P 500, 2025",
      titulo: "Del que más cobra al que menos", detalle: "Carrusel · Fuente: AFL-CIO", url: "https://instagram.com/manuleiva91"
    },
    {
      tipo: "video", etiqueta: "Video · Entrevista",
      foto: "img/escenario.jpg", alt: "Manuel Leiva con el micrófono en un escenario", posicion: "50% 30%",
      titulo: "“Los MEJORES programadores son ARGENTINOS”: LEIVA y las cooperativas tecnológicas", detalle: "La Capital Más · In Situ", url: "https://www.youtube.com/watch?v=LvAcQPlVugo"
    }
  ],

  /* Placas de diseño que se muestran en "En redes" mientras no cargues posts reales de Instagram */
  placasInstagram: [
    { fondo: "#1E0716", color: "#F6EEE8", aro: "rgba(232,69,44,.35)", html: "Un <span style='color:#8FD3F4'>argentino</span> vuelve a presidir el cooperativismo mundial" },
    { fondo: "#88155D", color: "#F6EEE8", aro: "rgba(246,238,232,.15)", cifra: "42", bajada: "cooperativas en FACTTIC" },
    { fondo: "#F6EEE8", color: "#15111A", aro: "rgba(176,40,120,.18)", cifra: "1%", colorCifra: "#88155D", bajada: "de rotación laboral, contra 21%" },
    { fondo: "#35124F", color: "#F6EEE8", aro: "rgba(232,69,44,.3)", html: "El futuro es <span style='color:#E8452C'>cooperativo</span>" },
    { fondo: "#15111A", color: "#F6EEE8", aro: "rgba(176,40,120,.3)", html: "Tecnología desde las personas para las personas" },
    { fondo: "#E8452C", color: "#15111A", aro: "rgba(136,21,93,.35)", html: "Cooperar es mejor que competir" }
  ]
};
