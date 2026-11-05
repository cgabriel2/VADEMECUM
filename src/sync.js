// Guardado en la nube sin pisar lo que se cargó en otro dispositivo.
// Cada dispositivo recuerda la última versión de la nube que vio (la "base"). Solo escribe si la nube sigue igual;
// si otro dispositivo guardó antes, trae esa versión, combina las dos y vuelve a intentar.
const esObj = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const clave = x => (esObj(x) && x.id != null ? 'id:' + x.id : 'v:' + JSON.stringify(x));

// Combina tres versiones: lo que cambió de un solo lado se respeta; si los dos cambiaron lo mismo, gana lo local.
// Algo borrado de un lado y editado del otro se conserva: mejor que sobre a que se pierda.
export function combinar(b, l, r){
  if (igual(l, r)) return l;
  if (b !== undefined && igual(l, b)) return r;
  if (b !== undefined && igual(r, b)) return l;
  if (l === undefined) return r;
  if (r === undefined) return l;
  if (esObj(l) && esObj(r)){
    const out = {};
    for (const k of new Set([...Object.keys(l), ...Object.keys(r)])){ const v = combinar(esObj(b) ? b[k] : undefined, l[k], r[k]); if (v !== undefined) out[k] = v; }
    return out;
  }
  if (Array.isArray(l) && Array.isArray(r)) return combinarListas(Array.isArray(b) ? b : [], l, r);
  return l;
}
function combinarListas(b, l, r){
  const mb = new Map(b.map(x => [clave(x), x])), ml = new Map(l.map(x => [clave(x), x])), mr = new Map(r.map(x => [clave(x), x]));
  // si un lado no cambió el orden, se usa el orden del otro
  const ordenLIgual = igual(l.map(clave).filter(k => mb.has(k)), b.map(clave).filter(k => ml.has(k)));
  const [primero, segundo] = ordenLIgual ? [r, l] : [l, r];
  const out = [], vistos = new Set();
  for (const x of [...primero, ...segundo]){
    const k = clave(x); if (vistos.has(k)) continue; vistos.add(k);
    const enL = ml.has(k), enR = mr.has(k), enB = mb.has(k);
    if (enL && enR) out.push(combinar(enB ? mb.get(k) : undefined, ml.get(k), mr.get(k)));
    else {
      const v = enL ? ml.get(k) : mr.get(k);
      if (!enB || !igual(v, mb.get(k))) out.push(v); // nuevo de un lado, o borrado de un lado y editado del otro
    }
  }
  return out;
}

// Rescate de una sola vez: suma a la nube lo que este dispositivo tenga guardado y a la nube le falte.
// Solo para lo que carga cada persona (no materias ni unidades: una copia vieja traería programas ya reemplazados).
export function rescatar(copia, nube){
  if (!esObj(copia) || !esObj(nube)) return { datos: nube, n: 0 };
  const datos = JSON.parse(JSON.stringify(nube)); let n = 0;
  const sumar = (de, a, filtro) => { if (!Array.isArray(de)) return a; const lista = Array.isArray(a) ? a : [], hay = new Set(lista.map(x => x && x.id));
    for (const x of de) if (x && x.id != null && !hay.has(x.id) && (!filtro || filtro(x))){ lista.push(x); n++; } return lista; };
  if (esObj(copia.fichas)){ datos.fichas = esObj(datos.fichas) ? datos.fichas : {}; for (const k of ['farmacos', 'enfermedades', 'generales']) { const v = sumar(copia.fichas[k], datos.fichas[k]); if (v) datos.fichas[k] = v; } }
  for (const k of ['mnemos', 'carpetas', 'plantillas']){ const v = sumar(copia[k], datos[k]); if (v) datos[k] = v; }
  const c = sumar(copia.cards, datos.cards, x => x.propia); if (c) datos.cards = c;
  if (esObj(copia.glosario) && esObj(datos.glosario)) { const v = sumar(copia.glosario.propios, datos.glosario.propios); if (v) datos.glosario.propios = v; }
  return { datos, n };
}

/* nube: { leer() → {data, error}, leerHora() → {data, error}, escribir(datos, ahora, horaBase) → {data, error}, crear(datos, ahora) → {data, error} }
   local: el localStorage; alDatos(fn): la app reemplaza sus datos por fn(actuales) y los devuelve; alEstado(textoDeError | null) */
export function crearSync({ nube, local, uid, alDatos, alEstado }){
  const K = { cache: 'vdm-cache-' + uid, pend: 'vdm-pend-' + uid, base: 'vdm-base-' + uid };
  let pendiente = null, guardando = false, hora = null, base, timer = null;
  const ls = (f, porDefecto) => { try { return f(); } catch (e) { return porDefecto; } };
  const copia = x => JSON.parse(JSON.stringify(x));
  const recordarBase = () => ls(() => local.setItem(K.base, JSON.stringify({ hora, data: base })));
  const aplicar = fn => { const s = alDatos ? alDatos(fn) : null; if (s){ if (pendiente) pendiente = s; ls(() => local.setItem(K.cache, JSON.stringify(s))); } return s; };

  function guardar(S){
    pendiente = S;
    ls(() => { local.setItem(K.cache, JSON.stringify(S)); local.setItem(K.pend, String(Date.now())); });
    clearTimeout(timer); timer = setTimeout(subir, 1500);
  }
  async function subir(){
    if (!pendiente || guardando) return;
    guardando = true;
    const propio = pendiente; pendiente = null;
    const original = copia(propio); let datos = original, hubo = false;
    try {
      for (let i = 0; ; i++){
        if (i > 4) throw new Error('Demasiados intentos');
        if (hora === null){
          // no se sabe qué hay en la nube (se abrió sin conexión): primero mirar para no pisar nada
          const { data: f, error } = await nube.leer(); if (error) throw error;
          if (f){ datos = combinar(base, datos, f.data); hora = f.updated_at; base = f.data; hubo = true; }
        }
        const ahora = new Date().toISOString();
        const { data, error } = hora === null ? await nube.crear(datos, ahora) : await nube.escribir(datos, ahora, hora);
        if (error) throw error;
        if (data && data.length){ hora = data[0].updated_at; base = datos; recordarBase(); break; }
        // otro dispositivo guardó primero: traer su versión, combinar y reintentar
        const { data: f, error: e2 } = await nube.leer(); if (e2) throw e2;
        if (!f){ hora = null; continue; }
        datos = combinar(base, datos, f.data); hora = f.updated_at; base = f.data; hubo = true;
      }
      guardando = false; alEstado && alEstado(null);
      if (hubo){ const fusion = datos; aplicar(actual => combinar(original, actual, fusion)); }
      if (pendiente){ clearTimeout(timer); timer = setTimeout(subir, 1500); }
      else ls(() => local.removeItem(K.pend));
    } catch (e) {
      guardando = false; if (!pendiente) pendiente = propio;
      alEstado && alEstado('No se pudo guardar en la nube. Tus cambios quedan en este dispositivo y se reintenta solo.');
      clearTimeout(timer); timer = setTimeout(subir, 15000);
    }
  }
  // Trae lo que se haya guardado desde otro dispositivo (sin recargar la página)
  async function traer(){
    if (guardando || hora === null) return;
    const { data: h, error } = await nube.leerHora(); if (error || !h || h.updated_at === hora || guardando) return;
    const { data: f, error: e2 } = await nube.leer(); if (e2 || !f || guardando) return;
    const antes = base; hora = f.updated_at; base = f.data; recordarBase();
    aplicar(actual => combinar(antes, actual, f.data));
  }
  // Decide con qué datos abrir. Devuelve { datos, rescatadas }.
  function abrir(fila, hayError){
    const cache = ls(() => JSON.parse(local.getItem(K.cache)), null), guardada = ls(() => JSON.parse(local.getItem(K.base)), null), marca = ls(() => local.getItem(K.pend), null);
    if (hayError){ if (guardada){ hora = guardada.hora; base = guardada.data; } return { datos: cache, rescatadas: 0, subir: false }; }
    if (!fila) return { datos: cache, rescatadas: 0, subir: !!cache };
    hora = fila.updated_at; base = fila.data;
    let datos = fila.data, rescatadas = 0, hayQueSubir = false;
    if (cache && !guardada){ const r = rescatar(cache, fila.data); datos = r.datos; rescatadas = r.n; hayQueSubir = r.n > 0; }
    else if (cache && marca){ datos = combinar(guardada.data, cache, fila.data); hayQueSubir = !igual(datos, fila.data); }
    recordarBase();
    return { datos, rescatadas, subir: hayQueSubir };
  }
  return { guardar, subir, traer, abrir, cancelarEspera: () => clearTimeout(timer), hayPendiente: () => !!pendiente };
}
