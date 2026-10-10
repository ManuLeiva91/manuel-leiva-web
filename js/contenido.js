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

  /* ---------- Videos de YouTube (sección "Videos") ----------
     id: lo que va después de "v=" o de "youtu.be/" en el link. inicio: segundo desde el que arranca (opcional).
     El primero de la lista es el que se ve grande al entrar. Para sumar uno: copiá un bloque { ... }. */
  videos: [
    { id: "LvAcQPlVugo", titulo: "“Los MEJORES programadores son ARGENTINOS”: Leiva y las cooperativas tecnológicas", medio: "La Capital Más · In Situ",
      descripcion: "Las cooperativas pueden ayudar a que la Argentina sea una potencia tecnológica si se prioriza la soberanía tecnológica y el desarrollo local. Pueden competir con empresas extranjeras en eficiencia y rapidez; el principal obstáculo, plantea Manuel, es la falta de planificación nacional y de decisión política." },
    { id: "smOKQfChGpA", titulo: "Manuel Leiva, presidente de FACTTIC", medio: "COLSECOR",
      descripcion: "Manuel Leiva, presentado como presidente de FACTTIC, la federación argentina de cooperativas de trabajo de tecnología, innovación y conocimiento." },
    { id: "XU4L8z04wy8", titulo: "Argentina puede ser potencia en tecnología", medio: "RosarioPlus 98.9 · Con Códigos",
      descripcion: "Entrevista en el programa «Con Códigos» de RosarioPlus 98.9, con el eje puesto en que la Argentina puede ser potencia en tecnología." },
    { id: "3PVtghud0dQ", inicio: 783, titulo: "Cruje el mercado laboral: una oportunidad para las cooperativas", medio: "El Ciudadano · Economía",
      descripcion: "Fragmento del programa de Economía de El Ciudadano sobre el mercado laboral y el lugar de las cooperativas. El video arranca en el minuto 13:03." },
    { id: "lniJPU5Lj7s", titulo: "Minga: Manuel Leiva", medio: "Radio Kermés",
      descripcion: "Charla con Manuel Leiva en «Minga», el programa de Radio Kermés." },
    { id: "a-VB6cgU-bY", inicio: 17, titulo: "Nos visita Manu Leiva", medio: "Mística TV · PLR",
      descripcion: "Visita de Manuel Leiva a PLR, el programa de Mística TV." },
    { id: "OS-mEOZLl-4", inicio: 5921, titulo: "Comisión de Asuntos Cooperativos, Mutuales y ONG (22/07/2025)", medio: "Honorable Cámara de Diputados de la Nación",
      descripcion: "Reunión completa de la Comisión de Asuntos Cooperativos, Mutuales y de ONG de la Cámara de Diputados, del 22 de julio de 2025. El video se abre en el minuto 1:38:41." },
    { id: "e5WDrouQVm4", titulo: "Taller de Formación Dirigencial: segundo panel", medio: "Cooperar",
      descripcion: "Segundo panel del Taller de Formación Dirigencial organizado por Cooperar." },
    { id: "pY3f_lAR2DM", titulo: "Las mentiras del Vocero sobre las cooperativas de trabajo", medio: "Canal de Claudio Andrés De Luca",
      descripcion: "Manuel Leiva responde a lo que dijo el vocero sobre las cooperativas de trabajo." }
  ],

  /* Videos de TikTok a mostrar (hasta 8). Cada uno puede ser solo el link, o un bloque con foto y texto:
     { url: "https://www.tiktok.com/@manuleiva91/video/ID", foto: "img/tiktok/ID.jpg", titulo: "Texto corto" }
     Si la lista está vacía se muestra una tarjeta que lleva al perfil (o el embed oficial si mostrarPerfilTiktok es true). */
  tiktokVideos: [
    "https://www.tiktok.com/@manuleiva91/video/7689537806137429256",
    "https://www.tiktok.com/@manuleiva91/video/7689537489941351698",
    "https://www.tiktok.com/@manuleiva91/video/7689536131280440628",
    "https://www.tiktok.com/@manuleiva91/video/7631280980610911509",
    "https://www.tiktok.com/@manuleiva91/video/7462116471871737093"
  ],
  mostrarPerfilTiktok: false, /* true = embed oficial del perfil (fondo blanco, no se puede estilizar) */

  /* Newsletter (EnvíaloSimple): los datos salen del código de instalación del formulario:
     .../AdministratorID/205164/FormID/1/... El formulario usa el diseño de esta web
     y envía los datos a la lista de EnvíaloSimple. Si queda vacío, el botón abre un mail. */
  newsletterEnvialo: { administratorId: "205164", formId: "1" },

  /* ---------- Destacado del inicio ---------- */
  destacado: {
    etiqueta: "Conferencia",
    titulo: "Congreso Internacional de Cooperativas y Mutuales",
    detalle: "Estación Fluvial, Rosario · 25 de julio de 2026",
    foto: "img/eventos/cicm-escenario.jpg",
    alt: "Manuel Leiva hablando en el escenario del CICM en Rosario",
    url: "#charlas"
  },

  /* ---------- Sección Redjar ----------
     Fuente: redjar.com.ar (misión, visión, servicios, valores, alianzas, dirección, +10 años, +150 proyectos)
     y datos propios (+50 asociados, desde 2015). Si se borra este bloque, la sección no se muestra. */
  redjar: {
    kicker: "La cooperativa donde pertenezco",
    titulo: "Asociado a Redjar",
    sitio: "https://www.redjar.com.ar", sitioTexto: "Conocé Redjar",
    intro: "Somos la Cooperativa de Trabajo Redjar Ltda. Creamos soluciones tecnológicas para acompañar a empresas y organizaciones en su modernización y su transformación digital, desde la consultoría hasta la implementación.",
    parrafos: [
      "Somos una cooperativa de más de 50 profesionales que valora el trabajo colaborativo y la tecnología como motor de cambio.",
      "Trabajamos como socios tecnológicos: optimizamos procesos con herramientas digitales, diseñamos soluciones a medida y acompañamos a cada cliente con equipos multidisciplinarios, experiencia comprobada y compromiso a largo plazo."
    ],
    foto: "img/equipo-redjar.jpg", alt: "El equipo de Redjar reunido frente a una casona en Rosario", posicion: "50% 40%",
    foto2: "img/encuentro-escalera.jpg", alt2: "Integrantes del equipo en un encuentro, en una escalera de mármol", posicion2: "50% 30%",
    cifras: [
      { n: 50, prefijo: "+", texto: "asociados y asociadas" },
      { n: 10, prefijo: "+", texto: "años de trayectoria" },
      { n: 150, prefijo: "+", texto: "proyectos desarrollados" }
    ],
    historia: [
      { anio: "2015", texto: "Redjar empieza su camino en Rosario como cooperativa de trabajo de tecnología." },
      { anio: "Mayo 2025", texto: "Es presentada como caso de éxito en el 1º Foro Internacional ASETT, en Mondragón." },
      { anio: "Julio 2026", texto: "Integra la comisión organizadora del Congreso Internacional de Cooperativas y Mutuales, en Rosario." },
      { anio: "Hoy", texto: "Más de 50 asociados y asociadas. Segunda cooperativa tecnológica del país." }
    ],
    servicios: [
      { t: "Consultoría tecnológica", d: "Asesoría para decidir estratégicamente, definir arquitecturas y evaluar herramientas." },
      { t: "Desarrollo de software", d: "Aplicaciones multiplataforma de alta calidad, más mantenimiento evolutivo y correctivo." },
      { t: "Soluciones con IA", d: "Automatización de tareas, análisis de datos e integración de IA en sistemas existentes." },
      { t: "Migración y actualización", d: "Modernización de datos y sistemas, con integración por APIs y automatización de procesos." },
      { t: "Infraestructura y soporte", d: "Redes, infraestructura y plataformas cloud (AWS, Azure y GCP) con foco en seguridad." },
      { t: "Diseño y prototipado", d: "Del análisis de necesidades al diseño de interfaces, prototipos y validación de usabilidad." }
    ],
    modalidades: ["Staff Augmentation", "Service Management", "Llave en mano"],
    /* Organizaciones con las que trabajamos en red. logo: ruta al SVG/PNG (se muestra translúcido); url: link opcional. */
    alianzas: [
      { nombre: "Polo Tecnológico Rosario", logo: "img/logos/aliados/polo-rosario.svg" },
      { nombre: "Polo IT", logo: "img/logos/aliados/polo-bsas.svg" },
      { nombre: "PATIO.COOP", logo: "img/logos/aliados/patio.svg" },
      { nombre: "FACTTIC", logo: "img/logos/aliados/facttic.svg", url: "https://www.facttic.org.ar" },
      { nombre: "Cooperar", logo: "img/logos/aliados/cooperar.svg", url: "https://www.cooperar.coop" }
    ],
    direccion: "Pellegrini 2446, Rosario, Santa Fe"
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
