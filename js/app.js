/* Lógica de la web: arma las secciones dinámicas a partir de js/contenido.js
   y maneja menú, filtros, animaciones y embeds de redes. No hace falta tocarlo
   para cargar contenido. */
(function () {
  'use strict';

  var C = window.CONTENIDO || {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  var PLAY = '<span class="play" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg></span>';

  function attr(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function parseFecha(s) { if (!s) return null; var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function hoy() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }

  function esProximo(e) {
    if (typeof e.proximo === 'boolean') return e.proximo;
    var fin = parseFecha(e.fechaFin || e.fecha);
    return !!fin && fin >= hoy();
  }
  function porFecha(asc) {
    return function (a, b) {
      var fa = parseFecha(a.fecha), fb = parseFecha(b.fecha);
      if (!fa && !fb) return 0; if (!fa) return 1; if (!fb) return -1;
      return asc ? fa - fb : fb - fa;
    };
  }
  var eventos = (C.eventos || []).slice();
  var deManuel = eventos.filter(function (e) { return e.quien !== 'facttic'; });
  var agenda = deManuel.filter(esProximo).sort(porFecha(true));
  var pasados = deManuel.filter(function (e) { return !esProximo(e) && e.foto; }).sort(porFecha(false));
  var yaPasaron = deManuel.filter(function (e) { return !esProximo(e); }).sort(porFecha(false));
  var presencia = eventos.filter(function (e) { return e.quien === 'facttic' || e.quien === 'ambos'; }).sort(porFecha(false));

  /* ---------- Destacado y próxima charla ---------- */
  function renderDestacado() {
    var d = C.destacado; var box = $('#destacado');
    if (!box || !d) return;
    box.href = d.url || '#charlas';
    box.innerHTML =
      '<div class="thumb"><img src="' + attr(d.foto) + '" alt="' + attr(d.alt) + '"><span class="pill c tag">' + d.etiqueta + '</span></div>' +
      '<div class="body"><p class="kick" style="margin-bottom:10px">Destacado</p><h3 class="d">' + d.titulo + '</h3><p class="by">' + d.detalle + '</p></div>';
  }
  function renderProxima() {
    var box = $('#proxima'); if (!box) return;
    var e = agenda[0];
    if (!e) { box.hidden = true; return; }
    box.innerHTML = '<span class="pill" style="border-color:#15111A">Próxima charla</span>' +
      '<b>' + e.titulo + (e.lugar ? ', ' + e.lugar : '') + '</b>' +
      '<span style="font-weight:600">' + (e.fechaTexto || '') + '</span>' +
      '<a href="#charlas">Ver agenda →</a>';
  }

  /* ---------- Agenda, dónde estuve y presencia ---------- */
  function circuloFecha(e) {
    var f = parseFecha(e.fecha);
    if (f) return '<span class="date"><b>' + f.getDate() + '</b><span>' + MESES[f.getMonth()] + ' ' + f.getFullYear() + '</span></span>';
    return '<span class="date"><b>' + (e.fechaTexto && /\d{4}/.test(e.fechaTexto) ? e.fechaTexto.match(/\d{4}/)[0] : '—') + '</b><span>' + (e.lugar || '') + '</span></span>';
  }
  function renderAgenda() {
    var box = $('#agenda'); if (!box) return;
    if (!agenda.length) { box.innerHTML = '<p class="vacio">Pronto nuevas fechas. ¿Querés que vaya a tu evento? <a href="#contacto">Escribime</a>.</p>'; }
    else box.innerHTML = agenda.map(function (e) {
      return '<a class="ev" href="' + attr(e.url || '#contacto') + '">' + circuloFecha(e) +
        '<div><h3 class="d">' + e.titulo + '</h3><p>' + [e.lugar, e.tipo, e.fechaTexto].filter(Boolean).join(' · ') + '</p></div></a>';
    }).join('');
    /* Ya pasaron: solo se ve en pantallas anchas (ver estilos.css) */
    var past = $('#agenda-pasados'); if (!past) return;
    if (!yaPasaron.length) { var pb = $('#agenda-pasados-box'); if (pb) pb.hidden = true; return; }
    past.innerHTML = yaPasaron.map(function (e) {
      var tag = e.url ? 'a' : 'div', href = e.url ? ' href="' + attr(e.url) + '"' : '';
      return '<' + tag + ' class="ev ev-pasado"' + href + '>' + circuloFecha(e) +
        '<div><h3 class="d">' + e.titulo + '</h3><p>' + [e.lugar, e.tipo, e.fechaTexto].filter(Boolean).join(' · ') + (e.tema ? '<br>' + e.tema : '') + '</p></div></' + tag + '>';
    }).join('');
  }
  function renderPasados() {
    var box = $('#estuve'); if (!box) return;
    box.innerHTML = pasados.map(function (e) {
      var pos = e.posicion ? ' style="object-position:' + attr(e.posicion) + '"' : '';
      return '<a class="card" href="' + attr(e.url || '#charlas') + '"><div class="thumb"><img loading="lazy" src="' + attr(e.foto) + '" alt="' + attr(e.alt || e.titulo) + '"' + pos + '>' +
        '<span class="pill m tag">' + (e.tipo || 'Evento') + '</span></div>' +
        '<div class="body"><h3 class="d">' + e.titulo + '</h3><p class="by">' + [e.lugar, e.fechaTexto].filter(Boolean).join(' · ') + (e.tema ? '<br>' + e.tema : '') + '</p></div></a>';
    }).join('');
  }
  function renderPresencia() {
    var box = $('#presencia'); if (!box) return;
    box.innerHTML = presencia.map(function (e) { return '<span class="pill">' + (e.presencia || e.titulo) + '</span>'; }).join('');
  }

  /* ---------- Lo último ---------- */
  var filtro = 'todo';
  function cardContenido(c) {
    var href = attr(c.url || '#');
    var ext = /^https?:/.test(c.url || '') ? ' target="_blank" rel="noopener"' : '';
    if (c.tipo === 'placa') {
      var inner = c.cifra
        ? '<p class="d placa-cifra">' + c.cifra + '</p><p style="position:relative;z-index:2;color:#F6EEE8;font-size:14px;margin:8px 0 0">' + (c.bajada || '') + '</p>'
        : '<p class="d placa-tit">' + (c.titular || '') + '</p>';
      return '<a class="card" href="' + href + '"' + ext + '><div class="thumb" style="background:' + attr(c.fondo || '#88155D') + ';display:flex;flex-direction:column;justify-content:flex-end;padding:20px">' +
        '<span class="pill c tag">' + (c.etiqueta || 'Placa') + '</span>' + inner + '</div>' +
        '<div class="body"><h3 class="d">' + c.titulo + '</h3><p class="by">' + (c.detalle || '') + '</p></div></a>';
    }
    var pos = c.posicion ? ' style="object-position:' + attr(c.posicion) + '"' : '';
    var esVideo = c.tipo === 'video';
    return '<a class="card" href="' + href + '"' + ext + '><div class="thumb' + (esVideo ? '' : ' tint') + '"><img loading="lazy" src="' + attr(c.foto) + '" alt="' + attr(c.alt || '') + '"' + pos + '>' +
      (esVideo ? PLAY : '') + '<span class="pill c tag">' + (c.etiqueta || '') + '</span></div>' +
      '<div class="body"><h3 class="d">' + c.titulo + '</h3><p class="by">' + (c.detalle || '') + (esVideo ? ' · Ver video →' : ' · Leer nota →') + '</p></div></a>';
  }
  function renderFeed() {
    var box = $('#feed'); if (!box) return;
    var items = (C.contenidos || []).filter(function (c) {
      return filtro === 'todo' || (filtro === 'notas' && c.tipo === 'nota') || (filtro === 'videos' && c.tipo === 'video') || (filtro === 'placas' && c.tipo === 'placa');
    });
    box.innerHTML = items.length ? items.map(cardContenido).join('') : '<p class="vacio">Todavía no hay contenido de este tipo.</p>';
    box.scrollLeft = 0;
  }
  function initFiltros() {
    $$('[data-filtro]').forEach(function (b) {
      b.addEventListener('click', function () {
        filtro = b.getAttribute('data-filtro');
        $$('[data-filtro]').forEach(function (x) {
          var on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        renderFeed();
      });
    });
  }

  /* ---------- Redes: Instagram y TikTok ---------- */
  function cargarScript(src, id) {
    if (document.getElementById(id)) return;
    var s = document.createElement('script'); s.async = true; s.src = src; s.id = id; document.body.appendChild(s);
  }
  function renderInstagramFeed(box, posts) {
    box.className = 'placas';
    box.innerHTML = posts.slice(0, 6).map(function (p) {
      var s = p.sizes && (p.sizes.medium || p.sizes.large || p.sizes.small);
      var img = (s && s.mediaUrl) || p.thumbnailUrl || p.mediaUrl || '';
      var txt = p.prunedCaption || p.caption || 'Publicación de Instagram';
      return '<a class="placa" href="' + attr(p.permalink) + '" target="_blank" rel="noopener" style="background:#15111A;padding:0">' +
        '<img loading="lazy" src="' + attr(img) + '" alt="' + attr(txt.slice(0, 120)) + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></a>';
    }).join('');
  }
  function renderInstagram() {
    var box = $('#instagram'); if (!box) return;
    if (C.instagramFeedUrl && window.fetch) {
      fetch(C.instagramFeedUrl).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (data) {
          var posts = (Array.isArray(data) ? data : data.posts || []).filter(function (p) { return p && p.permalink && (p.thumbnailUrl || p.mediaUrl || p.sizes); });
          if (!posts.length) throw new Error('feed vacío');
          renderInstagramFeed(box, posts);
        })
        .catch(function () { renderInstagramFallback(box); });
      return;
    }
    renderInstagramFallback(box);
  }
  function renderInstagramFallback(box) {
    var posts = (C.instagramPosts || []).filter(Boolean);
    if (posts.length) {
      box.className = 'embeds-ig';
      box.innerHTML = posts.map(function (u) {
        var url = u.split('?')[0];
        return '<blockquote class="instagram-media" data-instgrm-permalink="' + attr(url) + '?utm_source=ig_embed" data-instgrm-version="14">' +
          '<a href="' + attr(url) + '" target="_blank" rel="noopener">Ver esta publicación en Instagram</a></blockquote>';
      }).join('');
      if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
      else cargarScript('https://www.instagram.com/embed.js', 'ig-embed');
      return;
    }
    var perfil = 'https://instagram.com/' + (C.redes && C.redes.instagram || '');
    box.className = 'placas';
    box.innerHTML = (C.placasInstagram || []).map(function (p) {
      var inner = p.cifra
        ? '<p class="d" style="position:relative;font-size:64px;color:' + attr(p.colorCifra || 'inherit') + '">' + p.cifra + '</p><p style="position:relative;font-size:12px;font-weight:600;margin:6px 0 0">' + (p.bajada || '') + '</p>'
        : '<p class="d" style="position:relative">' + p.html + '</p>';
      return '<a class="placa" href="' + perfil + '" target="_blank" rel="noopener" style="background:' + attr(p.fondo) + ';color:' + attr(p.color) + '">' +
        '<span class="ring" style="background:' + attr(p.aro) + '"></span>' + inner + '</a>';
    }).join('');
  }
  /* TikTok nativo: tarjetas verticales. Cada video puede ser un link ("https://...") o un bloque
     { url, foto, titulo } con la miniatura guardada en img/tiktok/ (TikTok no deja pedirla desde el navegador). */
  function renderTiktokNativo(box, vids) {
    box.className = 'reels'; box.style.gridTemplateColumns = '';
    box.innerHTML = vids.slice(0, 8).map(function (v, i) {
      var o = typeof v === 'string' ? { url: v } : v;
      var img = o.foto ? '<img loading="lazy" src="' + attr(o.foto) + '" alt="">' : '';
      var fondo = o.foto ? '#4A2270' : 'linear-gradient(160deg,#4A2270 0%,#88155D 100%)';
      return '<a class="reel" href="' + attr(o.url) + '" target="_blank" rel="noopener" style="background:' + fondo + '">' + img +
        PLAY.replace('class="play"', 'class="play" style="width:48px;height:48px"') +
        '<span class="cap">' + attr(o.titulo || ('Video ' + (i + 1) + ' · Ver en TikTok')) + '</span></a>';
    }).join('');
  }
  function renderTiktok() {
    var box = $('#tiktok'); if (!box) return;
    var user = C.redes && C.redes.tiktok;
    var vids = (C.tiktokVideos || []).filter(Boolean);
    if (vids.length) {
      renderTiktokNativo(box, vids); return;
    } else if (!C.mostrarPerfilTiktok && user) {
      box.className = 'follow'; box.style.gridTemplateColumns = '1fr'; box.style.marginTop = '0';
      box.innerHTML = '<a class="fol" href="https://www.tiktok.com/@' + attr(user) + '" target="_blank" rel="noopener"><span class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18a3 3 0 1 1-3-3"></path><path d="M9 18V4l10-1v12"></path><circle cx="16" cy="15" r="3"></circle></svg></span><div><b>Mis videos en TikTok</b><span>@' + attr(user) + '</span></div><span class="go">Ver videos →</span></a>';
      return;
    } else if (C.mostrarPerfilTiktok && user) {
      box.style.gridTemplateColumns = '1fr';
      box.innerHTML = '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@' + attr(user) + '" data-unique-id="' + attr(user) + '" data-embed-type="creator" style="max-width:780px;min-width:288px;width:100%">' +
        '<section><a target="_blank" rel="noopener" href="https://www.tiktok.com/@' + attr(user) + '?refer=creator_embed">@' + user + '</a></section></blockquote>';
    } else { box.hidden = true; return; }
    cargarScript('https://www.tiktok.com/embed.js', 'tt-embed');
  }

  /* ---------- Videos de YouTube ---------- */
  function renderVideos() {
    var sec = $('#videos'), lista = $('#video-lista'), player = $('#video-player');
    var vids = (C.videos || []).filter(function (v) { return v && v.id; });
    if (!sec || !lista || !player) return;
    if (!vids.length) { sec.hidden = true; var l = $('a[href="#videos"]'); if (l) l.hidden = true; return; }
    var actual = 0;
    function miniatura(v) { return 'https://i.ytimg.com/vi/' + encodeURIComponent(v.id) + '/hqdefault.jpg'; }
    function mostrar(i, reproducir) {
      actual = i; var v = vids[i];
      $('#video-titulo').textContent = v.titulo || '';
      $('#video-medio').textContent = v.medio || '';
      $$('.vitem', lista).forEach(function (b, k) { var on = k === i; b.classList.toggle('is-active', on); b.setAttribute('aria-current', on ? 'true' : 'false'); });
      if (reproducir) {
        player.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '?autoplay=1&rel=0' + (v.inicio ? '&start=' + parseInt(v.inicio, 10) : '') +
          '" title="' + attr(v.titulo) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
      } else {
        player.innerHTML = '<button class="vposter" type="button" aria-label="Reproducir: ' + attr(v.titulo) + '"><img src="' + attr(miniatura(v)) + '" alt="">' + PLAY + '</button>';
        $('.vposter', player).addEventListener('click', function () { mostrar(actual, true); });
      }
    }
    lista.innerHTML = vids.map(function (v, i) {
      return '<button class="vitem" type="button" role="listitem" data-i="' + i + '"><span class="vt"><img loading="lazy" src="' + attr(miniatura(v)) + '" alt=""></span>' +
        '<span><b>' + attr(v.titulo) + '</b><small>' + attr(v.medio || '') + '</small></span></button>';
    }).join('');
    $$('.vitem', lista).forEach(function (b) {
      b.addEventListener('click', function () {
        mostrar(+b.getAttribute('data-i'), true);
        var r = player.getBoundingClientRect();
        if (r.top < 70 || r.bottom > window.innerHeight) player.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      });
    });
    mostrar(0, false);
  }

  /* ---------- Menú mobile ---------- */
  function initMenu() {
    var b = $('#burger'), nav = $('#links'); if (!b || !nav) return;
    b.addEventListener('click', function () {
      var open = nav.classList.toggle('open'); b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }); });
  }

  /* ---------- Animaciones: aparición y cifras que cuentan ---------- */
  function countUp(n) {
    if (n.getAttribute('data-done')) return; n.setAttribute('data-done', '1');
    var target = parseFloat(n.getAttribute('data-count')), pre = n.getAttribute('data-prefix') || '', suf = n.getAttribute('data-suffix') || '';
    var t0 = performance.now();
    function step(now) {
      var k = Math.min(1, (now - t0) / 1400);
      n.textContent = pre + Math.round(target * (1 - Math.pow(1 - k, 3))).toLocaleString('es-AR') + suf;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function initReveal() {
    var root = $('.v2');
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    root.classList.add('js-anim');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        $$('[data-count]', e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    $$('[data-reveal]').forEach(function (el) { io.observe(el); });
  }

  /* ---------- Newsletter ---------- */
  /* Envía la suscripción a EnvíaloSimple con el diseño de esta web. Usa el mismo
     pedido que el widget oficial del servicio (JSONP + captcha de imagen). */
  function initEnvialo(f, msg, E) {
    var BASE = 'https://backend.envialosimple.com/form/';
    var mailInput = $('#v2-mail'), box = $('#newsletter-captcha'), img = $('#newsletter-captcha-img');
    var code = $('#v2-captcha'), btn = $('button[type="submit"]', f);
    var cap = { id: '', sess: '' }, busy = false, pedido = false;
    var contacto = (C.redes && C.redes.email) || '';
    var fallo = 'No pudimos completar la suscripción. Probá de nuevo en unos minutos' + (contacto ? ' o escribinos a ' + contacto : '') + '.';

    function loadCaptcha() {
      fetch(BASE + 'getcaptcha/AdministratorID/' + E.administratorId + '/FormID/' + E.formId, { credentials: 'include' })
        .then(function (r) { return r.json(); })
        .then(function (j) { cap.id = j.captchaId; cap.sess = j.PHPSESSID; img.src = j.captchaSrc; code.value = ''; box.hidden = false; })
        .catch(function () { cap.id = ''; msg.textContent = fallo; });
    }
    function pedirCaptcha() { if (pedido) return; pedido = true; loadCaptcha(); }
    f.addEventListener('focusin', pedirCaptcha);
    $('#newsletter-captcha-refresh').addEventListener('click', loadCaptcha);

    function respuesta(res) {
      var err = res && res.error && res.error.code;
      if (err === 'errorMsg_invalidCaptcha') { msg.textContent = 'El código de la imagen no coincide. Probá de nuevo.'; loadCaptcha(); }
      else if (err === 'errorMsg_formValidations') { msg.textContent = (res.error.data && res.error.data.Email) ? 'La dirección de correo no es válida.' : 'Revisá los datos e intentá de nuevo.'; loadCaptcha(); }
      else if (err === 'errorMsg_reachedRequestLimit') { msg.textContent = 'Hay muchos pedidos en este momento. Probá de nuevo en unos minutos.'; }
      else if (err || !res || !res.result) { msg.textContent = fallo; }
      else {
        msg.textContent = res.result.needConfirmation
          ? 'Te enviamos un correo para confirmar tu suscripción. Revisá tu bandeja de entrada (y el spam).'
          : '¡Listo! Ya estás suscripto.';
        mailInput.value = ''; loadCaptcha();
      }
    }
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (busy) return;
      var mail = mailInput.value.trim();
      if (!mail) { msg.textContent = 'Escribí tu email.'; return; }
      if (!cap.id || !code.value.trim()) { pedirCaptcha(); msg.textContent = 'Escribí el código de la imagen y tocá Suscribirme.'; if (!box.hidden) code.focus(); return; }
      busy = true; btn.disabled = true; msg.textContent = 'Enviando…';
      var cb = 'envialoCb' + Date.now(), s = document.createElement('script'), hecho = false;
      function fin(res) {
        if (hecho) return; hecho = true;
        clearTimeout(timer); delete window[cb]; if (s.parentNode) s.parentNode.removeChild(s);
        busy = false; btn.disabled = false; respuesta(res);
      }
      var timer = setTimeout(function () { fin({ error: { code: 'timeout' } }); }, 30000);
      window[cb] = fin;
      s.onerror = function () { fin({ error: { code: 'red' } }); };
      var q = { callback: cb, AdministratorID: E.administratorId, FormID: E.formId, isFacebook: '0', Email: mail, captchaId: cap.id, PHPSESSID: cap.sess, captchaCode: code.value.trim(), Topo: '' };
      s.src = BASE + 'subscribe/format/jsonp?' + Object.keys(q).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(q[k]); }).join('&');
      document.head.appendChild(s);
    });
  }

  function initNewsletter() {
    var f = $('#newsletter'); if (!f) return;
    var msg = $('#newsletter-msg');
    var E = C.newsletterEnvialo;
    if (E && E.administratorId && E.formId) { initEnvialo(f, msg, E); return; }
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var mail = $('#v2-mail').value.trim();
      if (!mail) { msg.textContent = 'Escribí tu email.'; return; }
      var to = (C.redes && C.redes.email) || '';
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent('Quiero recibir novedades') + '&body=' + encodeURIComponent('Sumame a la lista: ' + mail);
      msg.textContent = 'Se abrió tu correo para confirmar la suscripción.';
    });
  }

  function init() {
    renderDestacado(); renderProxima(); renderAgenda(); renderPasados(); renderPresencia();
    renderFeed(); initFiltros(); renderVideos(); renderInstagram(); renderTiktok();
    initMenu(); initNewsletter(); initReveal();
    var y = $('#anio'); if (y) y.textContent = new Date().getFullYear();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
