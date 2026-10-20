/* ---------- utilidades ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => Math.random().toString(36).slice(2, 9);
const ICO = {
  home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  book:'<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h5z"/>',
  cards:'<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v12"/>',
  chart:'<path d="M5 20V11M11 20V5M17 20v-6M3 20h18"/>',
  cap:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
  spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  check:'<path d="M5 12l5 5L20 7"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
  file:'<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  flame:'<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  next:'<path d="M9 5l7 7-7 7"/>',
  send:'<path d="M4 12l16-8-6 16-2-7z"/>',
  flip:'<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M20 4v5h-5M4 20v-5h5"/>',
  pulse:'<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17h.01"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  up:'<path d="M6 15l6-6 6 6"/>',
  down:'<path d="M6 9l6 6 6-6"/>',
  share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  case:'<path d="M9 3h6v4H9z"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M12 11v6M9 14h6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
  redo:'<path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v5h5"/>',
  chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  pill:'<path d="M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z"/><path d="M7 7l7 7"/>',
  stetho:'<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/>',
  bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
  flask:'<path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M7 15h10"/>',
  calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h1M12 11h1M16 11h0M8 15h1M12 15h1M8 18h1M12 18h1M16 14v4"/>',
  more:'<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  play:'<path d="M7 4l13 8-13 8z"/>',
  pause:'<path d="M8 5v14M16 5v14"/>',
  archive:'<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4"/>',
  grid:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M9 9v12M15 9v12"/>'
};
const I = (n, s = 18) => `<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[n]}</svg>`;

const DAY = 864e5;
const sod = d => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
const TODAY = sod(new Date());
const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const pISO = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); };
const addD = n => iso(new Date(TODAY.getTime() + n*DAY));
const daysTo = s => Math.round((pISO(s) - TODAY) / DAY);
const MES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const DOW = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const fmtLong = s => { const d = pISO(s); return `${DOW[d.getDay()]} ${d.getDate()} de ${MES[d.getMonth()]}`; };
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
function shuffle(a){ a = a.slice(); for (let i = a.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function lev(a, b){ const m = a.length, n = b.length, d = Array.from({length:m+1}, (_, i) => [i]); for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1)); return d[m][n]; }

/* ---------- datos de ejemplo ---------- */
const mkQ = (materiaId, u, q, ops, exp, tipo) => ({ id: uid(), materiaId, u, q, ops, a: 0, exp, tipo });
const CASOS = () => [
  mkQ('fisio','f2','Paciente de 24 años, deportista, con frecuencia cardíaca de reposo de 50 lpm, sin síntomas y con ECG en ritmo sinusal. ¿Cuál es la explicación más probable?',['Bradicardia sinusal fisiológica por mayor tono vagal y volumen sistólico aumentado','Bloqueo auriculoventricular completo','Hipertiroidismo','Shock hipovolémico'],'En deportistas entrenados el volumen sistólico aumentado mantiene el gasto cardíaco con menor frecuencia, y el tono vagal es mayor.','caso'),
  mkQ('fisio','f3','Paciente de 30 años con una crisis de ansiedad: respira rápido y refiere hormigueo en las manos y alrededor de la boca. ¿Qué alteración esperás en la gasometría?',['Alcalosis respiratoria (PaCO₂ baja)','Acidosis respiratoria (PaCO₂ alta)','Acidosis metabólica','Alcalosis metabólica'],'La hiperventilación elimina CO₂. La alcalosis baja el calcio iónico y eso produce las parestesias.','caso'),
  mkQ('farma','p2','Una paciente que toma anticonceptivos orales empieza tratamiento para tuberculosis con rifampicina. ¿Qué le aconsejás?',['Usar un método anticonceptivo adicional, porque la rifampicina puede reducir la eficacia del anticonceptivo','No hace falta ningún cambio','Duplicar la dosis de rifampicina','Suspender la rifampicina'],'La rifampicina induce el CYP3A4 y acelera el metabolismo de estrógenos y progestágenos.','caso'),
  mkQ('farma','p5','Paciente de 68 años con dolor articular crónico que toma ibuprofeno todos los días hace meses consulta por deposiciones negras. ¿Qué sospechás primero?',['Hemorragia digestiva alta por úlcera asociada a AINEs','Hepatotoxicidad por paracetamol','Reacción alérgica al ibuprofeno','Hipoglucemia'],'Los AINEs inhiben la COX-1 y reducen las prostaglandinas que protegen la mucosa gástrica. La melena sugiere sangrado digestivo alto.','caso'),
  mkQ('anat','a2','Paciente con fractura del tercio medio de la diáfisis del húmero que no puede extender la muñeca (mano caída). ¿Qué nervio se lesionó?',['Nervio radial','Nervio mediano','Nervio cubital','Nervio axilar'],'El nervio radial recorre el canal de torsión del húmero; su lesión produce la mano caída.','caso'),
  mkQ('anat','a3','Después de una caída jugando al fútbol, un paciente tiene dolor en la rodilla y la prueba del cajón anterior es positiva. ¿Qué estructura está lesionada?',['Ligamento cruzado anterior','Ligamento cruzado posterior','Menisco lateral','Ligamento colateral medial'],'El cruzado anterior impide el desplazamiento anterior de la tibia; el cajón anterior y el Lachman lo exploran.','caso')
];
const BONE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="400" height="480"><rect width="400" height="480" fill="#ffffff"/>
<g stroke="#8A7556" stroke-width="2" fill="#EADFC8"><ellipse cx="140" cy="70" rx="70" ry="50"/><ellipse cx="140" cy="410" rx="70" ry="50"/>
<path d="M88 100 L192 100 L165 152 L115 152 Z"/><path d="M115 328 L165 328 L192 380 L88 380 Z"/><rect x="115" y="150" width="50" height="180"/></g>
<rect x="128" y="160" width="24" height="160" rx="10" fill="#C99C6E"/>
<path d="M72 60 A70 50 0 0 1 208 60" fill="none" stroke="#5B9BD5" stroke-width="7" stroke-linecap="round"/>
<path d="M72 420 A70 50 0 0 0 208 420" fill="none" stroke="#5B9BD5" stroke-width="7" stroke-linecap="round"/>
<g stroke="#4A5A58" stroke-width="1.5"><line x1="160" y1="22" x2="245" y2="30"/><line x1="205" y1="78" x2="245" y2="78"/><line x1="178" y1="128" x2="245" y2="128"/><line x1="165" y1="230" x2="245" y2="230"/><line x1="150" y1="280" x2="245" y2="280"/><line x1="178" y1="354" x2="245" y2="354"/><line x1="205" y1="402" x2="245" y2="402"/></g>
<g font-family="Arial, sans-serif" font-size="15" fill="#13201E"><text x="250" y="35">Cartílago articular</text><text x="250" y="83">Epífisis proximal</text><text x="250" y="133">Metáfisis</text><text x="250" y="235">Diáfisis</text><text x="250" y="285">Cavidad medular</text><text x="250" y="359">Metáfisis</text><text x="250" y="407">Epífisis distal</text></g></svg>`;
const imgCard = () => ({ id: uid(), materiaId:'anat', u:'a1', term:'Partes del hueso largo',
  def:'De arriba hacia abajo: cartílago articular, epífisis proximal, metáfisis, diáfisis (con la cavidad medular adentro), metáfisis y epífisis distal. Entre la epífisis y la metáfisis está la placa de crecimiento (fisis).',
  img:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(BONE_SVG),
  boxes:[3.9,14,24.4,45.6,56,71.5,81.5].map(y => ({ x:61.5, y, w:37, h:4.6 })), propia:false, box:1, ok:0, bad:0 });
const B4_TEXTO = 'Ciclo cardíaco. Sístole ventricular: empieza con la contracción isovolumétrica (todas las válvulas cerradas, la presión ventricular sube rápido). Cuando la presión ventricular supera a la aórtica se abre la válvula aórtica y empieza la eyección. Diástole: relajación isovolumétrica, después llenado ventricular rápido, llenado lento (diástasis) y contracción auricular, que aporta alrededor del 20 % del llenado. Primer ruido (R1): cierre de las válvulas mitral y tricúspide, marca el inicio de la sístole. Segundo ruido (R2): cierre de las válvulas aórtica y pulmonar, marca el inicio de la diástole. Volumen sistólico = volumen de fin de diástole − volumen de fin de sístole (aprox. 120 − 50 = 70 mL). Fracción de eyección = VS / VFD, normal mayor al 55 %. Gasto cardíaco = FC × VS.';
const mkF = o => ({ id: uid(), ...o });
// Correlatividades de ejemplo: para cursar hace falta tenerlas regulares; para rendir el final, aprobadas
const CORREL = { bioq:['bioc'], fisio:['anat','histo','bioc'], farma:['fisio','bioq'], micro:['bioc'], pato:['anat','histo','fisio'], semio:['anat','fisio'], mi:['semio','pato','farma'], ciru:['semio','pato'], pedia:['mi'], gine:['mi'] };
const VIEJOS = () => [
  { id:'vf1', materiaId:'fisio', titulo:'2º parcial 2025', temas:['f2t0','f2t1','f2t2','f3t1','f3t2'] },
  { id:'vf2', materiaId:'fisio', titulo:'2º parcial 2024', temas:['f2t0','f2t2','f2t3','f3t0','f3t1'] },
  { id:'vf3', materiaId:'fisio', titulo:'Recuperatorio 2024', temas:['f2t1','f2t2','f3t1','f3t3'] },
  { id:'va1', materiaId:'anat', titulo:'2º parcial 2025', temas:['a3t1','a3t3','a4t1','a4t2'] },
  { id:'va2', materiaId:'anat', titulo:'2º parcial 2024', temas:['a3t0','a3t3','a4t1','a4t3'] },
  { id:'vp1', materiaId:'farma', titulo:'1º parcial 2025', temas:['p1t1','p1t2','p2t0','p2t3'] },
  { id:'vp2', materiaId:'farma', titulo:'1º parcial 2024', temas:['p1t2','p2t0','p2t2','p2t3'] }
].map(v => ({ ...v, t: TODAY.getTime() }));
const FICHAS = () => ({
  farmacos: [
    mkF({ nombre:'Ibuprofeno', grupo:'AINE (derivado del ácido propiónico)', materiaId:'farma', u:'p5', mecanismo:'Inhibe de forma reversible y no selectiva la ciclooxigenasa (COX-1 y COX-2) y reduce la síntesis de prostaglandinas.', indicaciones:'Dolor leve a moderado, fiebre e inflamación (artritis, dismenorrea, dolor musculoesquelético).', adversos:'Gastritis, úlcera y sangrado digestivo; daño renal; aumento de la presión arterial; mayor riesgo cardiovascular con uso prolongado; broncoespasmo en asmáticos sensibles.', contraindicaciones:'Úlcera péptica activa o sangrado digestivo, insuficiencia renal o cardíaca grave, tercer trimestre del embarazo, alergia a AINEs.', interacciones:'Anticoagulantes (más sangrado), IECA y diuréticos (menor efecto y más riesgo renal), litio y metotrexato (aumenta sus niveles).' }),
    mkF({ nombre:'Paracetamol', grupo:'Analgésico y antipirético', materiaId:'farma', u:'p5', mecanismo:'Inhibe la síntesis de prostaglandinas sobre todo en el sistema nervioso central; casi no tiene efecto antiinflamatorio.', indicaciones:'Dolor leve a moderado y fiebre.', adversos:'Bien tolerado en dosis terapéuticas. En sobredosis produce hepatotoxicidad grave por acumulación de NAPQI; el antídoto es la N-acetilcisteína.', contraindicaciones:'Insuficiencia hepática grave. Precaución en alcoholismo y desnutrición.', interacciones:'El alcohol crónico y los inductores enzimáticos aumentan el riesgo de daño hepático; en uso regular puede potenciar a la warfarina.' }),
    mkF({ nombre:'Amoxicilina', grupo:'Betalactámico (aminopenicilina)', materiaId:'farma', u:'p4', mecanismo:'Se une a las proteínas fijadoras de penicilina (PBP) e inhibe la síntesis de la pared bacteriana. Es bactericida.', indicaciones:'Faringitis estreptocócica, otitis media, sinusitis, neumonía de la comunidad, algunas infecciones urinarias y erradicación de Helicobacter pylori.', adversos:'Diarrea, náuseas y exantema; reacciones alérgicas, incluida la anafilaxia.', contraindicaciones:'Alergia a las penicilinas.', interacciones:'El alopurinol aumenta el riesgo de exantema; el probenecid aumenta sus niveles en sangre.' }),
    mkF({ nombre:'Enalapril', grupo:'IECA (inhibidor de la enzima convertidora de angiotensina)', materiaId:'farma', mecanismo:'Inhibe la enzima convertidora: baja la angiotensina II y la aldosterona y aumenta la bradicinina. Produce vasodilatación.', indicaciones:'Hipertensión arterial, insuficiencia cardíaca, después de un infarto y nefropatía diabética.', adversos:'Tos seca (por la bradicinina), hiperpotasemia, hipotensión con la primera dosis, deterioro de la función renal y angioedema.', contraindicaciones:'Embarazo, antecedente de angioedema y estenosis bilateral de las arterias renales.', interacciones:'Suplementos de potasio y diuréticos ahorradores de potasio (hiperpotasemia); AINEs (menor efecto y daño renal); aumenta los niveles de litio.' }),
    mkF({ nombre:'Propranolol', grupo:'Betabloqueante no selectivo', materiaId:'farma', u:'p3', mecanismo:'Bloquea los receptores β1 y β2: baja la frecuencia cardíaca, la contractilidad y la liberación de renina.', indicaciones:'Hipertensión, angina, arritmias, profilaxis de la migraña, temblor esencial y síntomas del hipertiroidismo.', adversos:'Bradicardia, broncoespasmo, cansancio, extremidades frías; puede enmascarar los síntomas de una hipoglucemia.', contraindicaciones:'Asma, bloqueo auriculoventricular de 2º o 3º grado, bradicardia sintomática e insuficiencia cardíaca descompensada.', interacciones:'Verapamilo y diltiazem (bradicardia y bloqueo); insulina e hipoglucemiantes (enmascara la hipoglucemia).' }),
    mkF({ nombre:'Atropina', grupo:'Antagonista muscarínico (anticolinérgico)', materiaId:'farma', u:'p3', mecanismo:'Bloquea de forma competitiva los receptores muscarínicos de la acetilcolina.', indicaciones:'Bradicardia sintomática, intoxicación por organofosforados, premedicación anestésica para reducir secreciones y midriasis en oftalmología.', adversos:'Boca seca, taquicardia, retención urinaria, constipación, visión borrosa y confusión, sobre todo en personas mayores.', contraindicaciones:'Glaucoma de ángulo cerrado e hipertrofia prostática con retención urinaria.', interacciones:'Suma efectos con otros fármacos anticolinérgicos, como antihistamínicos y antidepresivos tricíclicos.' }),
    mkF({ nombre:'Morfina', grupo:'Analgésico opioide (agonista μ)', materiaId:'farma', u:'p5', mecanismo:'Activa los receptores opioides μ e inhibe la transmisión del dolor en el sistema nervioso central.', indicaciones:'Dolor intenso agudo o crónico (posoperatorio, oncológico, infarto de miocardio).', adversos:'Depresión respiratoria, constipación, náuseas y vómitos, sedación, miosis, retención urinaria, tolerancia y dependencia. El antídoto es la naloxona.', contraindicaciones:'Depresión respiratoria, crisis asmática grave e íleo paralítico.', interacciones:'Benzodiacepinas, alcohol y otros depresores del sistema nervioso central (aumenta la depresión respiratoria).' })
  ],
  enfermedades: [
    mkF({ nombre:'Hipertensión arterial', especialidad:'Cardiología', materiaId:'mi', etiologia:'Primaria o esencial en la gran mayoría de los casos (genética, edad, obesidad, consumo de sal, sedentarismo). Secundaria a enfermedad renal, hiperaldosteronismo, feocromocitoma, apnea del sueño o fármacos.', fisiopato:'Aumento sostenido de la resistencia vascular periférica y/o del gasto cardíaco, con participación del sistema renina-angiotensina-aldosterona y del sistema nervioso simpático.', clinica:'Suele ser asintomática. Puede dar cefalea. Las complicaciones afectan al corazón, el cerebro, el riñón y la retina.', diagnostico:'Presión arterial ≥ 140/90 mmHg en consultorio en varias mediciones, o confirmación con monitoreo ambulatorio (MAPA) o domiciliario.', tratamiento:'Cambios de estilo de vida (menos sal, actividad física, bajar de peso) y fármacos: IECA o ARA II, bloqueantes cálcicos o diuréticos tiazídicos.' }),
    mkF({ nombre:'Diabetes mellitus tipo 2', especialidad:'Endocrinología', materiaId:'mi', etiologia:'Resistencia a la insulina con déficit relativo de su secreción. Factores de riesgo: obesidad, sedentarismo, antecedentes familiares y edad.', fisiopato:'La resistencia a la insulina en músculo, hígado y tejido adiposo, sumada a la falla progresiva de la célula β, produce hiperglucemia crónica.', clinica:'Muchas veces asintomática. Puede dar poliuria, polidipsia, polifagia, pérdida de peso e infecciones a repetición. Complicaciones micro y macrovasculares.', diagnostico:'Glucemia en ayunas ≥ 126 mg/dL en dos ocasiones, HbA1c ≥ 6,5 %, glucemia ≥ 200 mg/dL a las 2 horas de una prueba de tolerancia oral, o glucemia al azar ≥ 200 mg/dL con síntomas.', tratamiento:'Plan alimentario, actividad física y metformina como primera línea; se suman otros fármacos o insulina según el control y las comorbilidades.' }),
    mkF({ nombre:'Neumonía adquirida en la comunidad', especialidad:'Neumonología', materiaId:'mi', etiologia:'El germen más frecuente es Streptococcus pneumoniae; también Haemophilus influenzae, Mycoplasma pneumoniae y virus respiratorios.', fisiopato:'Los microorganismos llegan al alvéolo (sobre todo por microaspiración), superan las defensas y generan una inflamación que llena los alvéolos de exudado (consolidación).', clinica:'Fiebre, tos con expectoración, dolor torácico tipo puntada y disnea. Al examen: crepitantes, soplo tubario y matidez.', diagnostico:'Clínica compatible más un infiltrado nuevo en la radiografía de tórax. Escalas como CURB-65 ayudan a decidir si hay que internar.', tratamiento:'Antibiótico empírico según gravedad y factores de riesgo (por ejemplo, amoxicilina en pacientes ambulatorios sin comorbilidades), hidratación y control.' }),
    mkF({ nombre:'Asma', especialidad:'Neumonología', materiaId:'mi', etiologia:'Enfermedad inflamatoria crónica de la vía aérea con factores genéticos y ambientales: alérgenos, infecciones virales, humo, ejercicio o frío.', fisiopato:'La inflamación crónica produce hiperreactividad bronquial y obstrucción variable y reversible del flujo aéreo (broncoespasmo, edema y moco).', clinica:'Episodios de disnea, sibilancias, opresión en el pecho y tos, sobre todo de noche o al despertar.', diagnostico:'Clínica compatible y espirometría con obstrucción reversible: mejora del VEF1 de al menos 12 % y 200 mL después del broncodilatador.', tratamiento:'Corticoides inhalados como base, broncodilatadores β2 agonistas y evitar desencadenantes. En la crisis: β2 agonistas de acción corta, corticoides sistémicos y oxígeno.' })
  ]
});
const MNEMOS = () => [
  mkF({ titulo:'Pares craneales (en orden)', materiaId:'anat', texto:'Oye Oye, Mamá Pepa: Tomá Mate Frío Al Ganar Nuestro Equipo Hoy', detalle:'Olfatorio · Óptico · Motor ocular común · Patético · Trigémino · Motor ocular externo · Facial · Auditivo · Glosofaríngeo · Neumogástrico (vago) · Espinal · Hipogloso.' }),
  mkF({ titulo:'Huesos del carpo', materiaId:'anat', texto:'Es-Se-Pi-Pi / Tra-Tra-Gran-Gan', detalle:'Fila proximal: escafoides, semilunar, piramidal, pisiforme. Fila distal: trapecio, trapezoide, grande, ganchoso. De lateral (lado del pulgar) a medial.' }),
  mkF({ titulo:'Signos de inflamación', materiaId:'', texto:'Ru-Ca-Tu-Do… y no funciona', detalle:'Rubor, calor, tumor (hinchazón) y dolor, los cuatro signos de Celso, más la pérdida de la función que agregó Virchow.' })
];
const HORARIO = () => [
  mkF({ materiaId:'anat', dia:1, desde:'08:00', hasta:'11:00', tipo:'Teórico', lugar:'Aula Magna' }),
  mkF({ materiaId:'anat', dia:3, desde:'14:00', hasta:'17:00', tipo:'Práctico', lugar:'Sala de disección' }),
  mkF({ materiaId:'fisio', dia:2, desde:'09:00', hasta:'12:00', tipo:'Teórico', lugar:'Aula 2' }),
  mkF({ materiaId:'fisio', dia:4, desde:'09:00', hasta:'11:00', tipo:'Seminario', lugar:'Aula 5' }),
  mkF({ materiaId:'farma', dia:4, desde:'14:00', hasta:'16:00', tipo:'Práctico', lugar:'Aula 7' }),
  mkF({ materiaId:'farma', dia:5, desde:'08:00', hasta:'10:00', tipo:'Teórico', lugar:'Aula 4' })
];
const SESIONES = () => [[1,'fisio',50],[1,'anat',25],[2,'farma',25],[3,'fisio',25],[3,'fisio',25],[4,'anat',50],[5,'farma',25],[6,'fisio',25],[6,'anat',25],[8,'fisio',50],[9,'farma',25]]
  .map(([d, materiaId, min]) => mkF({ t: TODAY.getTime() - d * DAY + 18 * 36e5, materiaId, min }));
function addV3(D){
  const hasMat = id => D.materias.some(m => m.id === id);
  D.errores = D.errores || [];
  D.erroresResueltos = D.erroresResueltos || 0;
  D.simulacros = D.simulacros || [];
  D.explicaciones = D.explicaciones || [];
  D.viejos = D.viejos || VIEJOS().filter(v => hasMat(v.materiaId));
  D.fichas = D.fichas || FICHAS();
  D.mnemos = D.mnemos || MNEMOS();
  D.horario = D.horario || HORARIO().filter(c => hasMat(c.materiaId));
  D.sesiones = D.sesiones || SESIONES().filter(s => hasMat(s.materiaId));
  D.pomo = D.pomo || { foco:25, pausa:5, materiaId:'' };
  D.hoy = D.hoy || { fecha:'', ok:0, n:0 };
  D.materias.forEach(m => { if (!m.correl) m.correl = (CORREL[m.id] || []).filter(hasMat); });
  const micro = D.materias.find(m => m.id === 'micro');
  if (micro && micro.estado === 'pendiente'){ micro.estado = 'regular'; micro.regularHasta = addD(45); micro.color = micro.color || '#4F8A3A'; }
  // preguntas de ejemplo que también salieron en exámenes anteriores
  const tag = (txt, id) => { const q = D.preguntas.find(x => x.q.includes(txt)); if (q && !q.origen && D.viejos.some(v => v.id === id)) q.origen = id; };
  tag('Según Frank-Starling', 'vf1'); tag('La capacidad vital', 'vf2'); tag('Un antagonista competitivo', 'vp1'); tag('vidas medias', 'vp2'); tag('cruzado anterior de la rodilla impide', 'va1');
  // cuaderno de errores inicial con lo que más se falló
  if (!D.errores.length){
    D.cards.filter(c => c.bad > c.ok).slice(0, 5).forEach((c, i) => D.errores.push({ id: uid(), kind:'card', ref:c.id, materiaId:c.materiaId, streak: i % 2, t: Date.now() - (i + 1) * DAY }));
    [...new Set(D.historial.filter(h => h.tipo === 'cuest' && !h.ok).map(h => h.ref))].slice(0, 4).forEach((ref, i) => {
      const q = D.preguntas.find(x => x.q === ref); if (q) D.errores.push({ id: uid(), kind:'preg', ref:q.id, materiaId:q.materiaId, streak:0, t: Date.now() - (i + 2) * DAY }); });
  }
  D.v = 3;
}
// Cuenta nueva sin datos de ejemplo: solo vienen las fichas y mnemotecnias de referencia
function emptyState(){
  return { v:2, perfil:{ anioActual:1 }, notif:{ dias:5 }, materias:[], unidades:{}, eventos:[], biblio:[], cards:[], preguntas:[], historial:[], racha:{ dias:0, ultimo:'' } };
}
function seed(){
  const U = (id, nombre, temas, hechos) => ({ id, nombre, temas: temas.map((t, i) => ({ id: id + 't' + i, nombre: t, ok: i < hechos })) });
  const materias = [
    { id:'anat', nombre:'Anatomía', anio:1, estado:'cursando', color:'#B4513A' },
    { id:'fisio', nombre:'Fisiología', anio:2, estado:'cursando', color:'#2F6FB5' },
    { id:'farma', nombre:'Farmacología', anio:3, estado:'cursando', color:'#7A55A8' },
    { id:'histo', nombre:'Histología', anio:1, estado:'aprobada', nota:8 },
    { id:'bioc', nombre:'Biología celular', anio:1, estado:'aprobada', nota:9 },
    { id:'intro', nombre:'Introducción a la medicina', anio:1, estado:'aprobada', nota:7 },
    { id:'bioq', nombre:'Bioquímica', anio:2, estado:'aprobada', nota:7 },
    { id:'micro', nombre:'Microbiología', anio:2, estado:'pendiente' },
    { id:'pato', nombre:'Patología', anio:3, estado:'pendiente' },
    { id:'semio', nombre:'Semiología', anio:3, estado:'pendiente' },
    { id:'mi', nombre:'Medicina interna', anio:4, estado:'pendiente' },
    { id:'ciru', nombre:'Cirugía', anio:4, estado:'pendiente' },
    { id:'pedia', nombre:'Pediatría', anio:5, estado:'pendiente' },
    { id:'gine', nombre:'Ginecología y obstetricia', anio:5, estado:'pendiente' }
  ];
  const unidades = {
    anat: [
      U('a1','Generalidades y osteología',['Planos y ejes anatómicos','Clasificación de los huesos','Estructura del hueso largo','Tipos de articulaciones'],4),
      U('a2','Miembro superior',['Huesos del miembro superior','Plexo braquial','Músculos del hombro y brazo','Irrigación del miembro superior'],3),
      U('a3','Miembro inferior',['Huesos de la pelvis y miembro inferior','Plexo lumbosacro','Músculos del muslo','Articulación de la rodilla'],1),
      U('a4','Tórax',['Pared torácica','Mediastino','Corazón: configuración externa','Pleuras y pulmones'],0),
      U('a5','Abdomen',['Pared abdominal y conducto inguinal','Peritoneo','Vísceras supramesocolónicas','Irrigación del tubo digestivo'],0)
    ],
    fisio: [
      U('f1','Fisiología celular',['Transporte a través de membrana','Potencial de membrana en reposo','Potencial de acción','Sinapsis'],4),
      U('f2','Cardiovascular',['Ciclo cardíaco','Gasto cardíaco y sus determinantes','Ley de Frank-Starling','Regulación de la presión arterial'],2),
      U('f3','Respiratorio',['Mecánica ventilatoria','Volúmenes y capacidades','Intercambio gaseoso','Transporte de O₂ y CO₂'],0),
      U('f4','Renal',['Filtración glomerular','Reabsorción tubular','Concentración de la orina','Equilibrio ácido-base'],0),
      U('f5','Endocrino',['Eje hipotálamo-hipófisis','Tiroides','Páncreas endocrino','Glándulas suprarrenales'],0)
    ],
    farma: [
      U('p1','Farmacología general',['Conceptos básicos','Receptores','Curvas dosis-respuesta','Interacciones farmacológicas'],2),
      U('p2','Farmacocinética',['Absorción y biodisponibilidad','Distribución','Metabolismo hepático','Excreción y vida media'],1),
      U('p3','Sistema nervioso autónomo',['Agonistas colinérgicos','Anticolinérgicos','Agonistas adrenérgicos','Betabloqueantes'],0),
      U('p4','Antimicrobianos',['Betalactámicos','Macrólidos','Aminoglucósidos','Mecanismos de resistencia'],0),
      U('p5','AINEs y analgésicos',['Mecanismo de los AINEs (COX)','Paracetamol','Opioides','Efectos adversos de los AINEs'],0)
    ]
  };
  const eventos = [
    { id:'e1', materiaId:'fisio', tipo:'Parcial', titulo:'2º parcial', fecha:addD(4), hecho:false, unidades:['f2','f3'] },
    { id:'e2', materiaId:'farma', tipo:'TP', titulo:'Informe: curvas dosis-respuesta', fecha:addD(3), hecho:false, unidades:['p1'] },
    { id:'e3', materiaId:'anat', tipo:'TP', titulo:'TP Miembro superior', fecha:addD(-2), hecho:true, unidades:['a2'] },
    { id:'e4', materiaId:'fisio', tipo:'TP', titulo:'TP 3: Potencial de acción', fecha:addD(-9), hecho:true, unidades:['f1'] },
    { id:'e9', materiaId:'farma', tipo:'TP', titulo:'TP 2: Farmacocinética', fecha:addD(9), hecho:false, unidades:['p2'] },
    { id:'e5', materiaId:'farma', tipo:'Parcial', titulo:'1º parcial', fecha:addD(13), hecho:false, unidades:['p1','p2'] },
    { id:'e6', materiaId:'anat', tipo:'Parcial', titulo:'2º parcial', fecha:addD(21), hecho:false, unidades:['a3','a4'] },
    { id:'e7', materiaId:'anat', tipo:'Final', titulo:'Final', fecha:addD(54), hecho:false, unidades:['a1','a2','a3','a4','a5'] },
    { id:'e8', materiaId:'fisio', tipo:'Final', titulo:'Final', fecha:addD(60), hecho:false, unidades:['f1','f2','f3','f4','f5'] }
  ];
  const biblio = [
    { id:'b1', materiaId:'anat', titulo:'Guía de trabajos prácticos', tipo:'Apunte de cátedra', detalle:'PDF · 42 págs.' },
    { id:'b2', materiaId:'anat', titulo:'Resumen Unidad 2: Miembro superior', tipo:'Mis apuntes', detalle:'PDF · 12 págs.' },
    { id:'b3', materiaId:'anat', titulo:'Latarjet – Anatomía humana', tipo:'Referencia', detalle:'Libro de cátedra (consultar en biblioteca)' },
    { id:'b4', materiaId:'fisio', titulo:'Esquemas de ciclo cardíaco', tipo:'Mis apuntes', detalle:'PDF · 6 págs.', texto: B4_TEXTO },
    { id:'b5', materiaId:'fisio', titulo:'Guyton & Hall – Tratado de fisiología médica', tipo:'Referencia', detalle:'Caps. 9 a 13 para el 2º parcial' },
    { id:'b6', materiaId:'fisio', titulo:'Guía de seminarios: Respiratorio', tipo:'Apunte de cátedra', detalle:'PDF · 18 págs.' },
    { id:'b7', materiaId:'farma', titulo:'Tabla de farmacocinética', tipo:'Mis apuntes', detalle:'PDF · 3 págs.' },
    { id:'b8', materiaId:'farma', titulo:'Goodman & Gilman – Bases farmacológicas', tipo:'Referencia', detalle:'Sección I: principios generales' }
  ];
  const C = (materiaId, u, term, def) => ({ id: uid(), materiaId, u, term, def, propia:false, box:1, ok:0, bad:0 });
  const cards = [
    C('anat','a5','Anastomosis','Comunicación entre dos vasos sanguíneos (o nervios) que permite un camino alternativo para el flujo.'),
    C('anat','a1','Foramen','Orificio en un hueso por el que pasan vasos o nervios.'),
    C('anat','a1','Apófisis','Saliente o prominencia de un hueso, donde suelen insertarse músculos o ligamentos.'),
    C('anat','a1','Articulación sinovial','Articulación móvil con cavidad articular, cápsula y líquido sinovial (diartrosis).'),
    C('anat','a2','Plexo braquial','Red nerviosa formada por las ramas anteriores de C5 a T1 que inerva el miembro superior.'),
    C('anat','a1','Fascia','Lámina de tejido conectivo que envuelve músculos, vasos y órganos.'),
    C('anat','a1','Meato','Orificio de entrada a un conducto, como el meato acústico externo.'),
    C('anat','a2','Tróclea','Superficie articular en forma de polea, como la del húmero que articula con el cúbito.'),
    C('anat','a4','Mediastino','Espacio central del tórax entre ambas pleuras que contiene corazón, grandes vasos, tráquea y esófago.'),
    C('anat','a5','Peritoneo','Membrana serosa que recubre la cavidad abdominal y muchas de sus vísceras.'),
    C('fisio','f1','Homeostasis','Mantenimiento de condiciones internas relativamente constantes frente a cambios del medio.'),
    C('fisio','f1','Potencial de acción','Cambio rápido y transitorio del potencial de membrana (despolarización y repolarización) que se propaga en células excitables.'),
    C('fisio','f2','Gasto cardíaco','Volumen de sangre que expulsa cada ventrículo por minuto: frecuencia cardíaca por volumen sistólico.'),
    C('fisio','f2','Ley de Frank-Starling','A mayor llenado ventricular (precarga), mayor fuerza de contracción y volumen sistólico, dentro de límites fisiológicos.'),
    C('fisio','f4','Filtración glomerular','Paso de plasma desde los capilares glomerulares a la cápsula de Bowman, formando el ultrafiltrado.'),
    C('fisio','f2','Presión oncótica','Presión osmótica generada por las proteínas plasmáticas, sobre todo la albúmina, que retiene líquido dentro de los vasos.'),
    C('fisio','f3','Surfactante','Mezcla de lípidos y proteínas producida por los neumocitos tipo II que reduce la tensión superficial alveolar.'),
    C('fisio','f1','Retroalimentación negativa','Mecanismo de control en el que la respuesta reduce el estímulo que la originó.'),
    C('fisio','f3','Distensibilidad pulmonar','Cambio de volumen pulmonar por cada unidad de cambio de presión (compliance).'),
    C('fisio','f3','Ventilación alveolar','Volumen de aire nuevo que llega a los alvéolos por minuto, descontando el espacio muerto.'),
    C('farma','p2','Farmacocinética','Estudio de lo que el organismo le hace al fármaco: absorción, distribución, metabolismo y excreción.'),
    C('farma','p1','Farmacodinamia','Estudio de lo que el fármaco le hace al organismo: mecanismo de acción y efectos.'),
    C('farma','p2','Biodisponibilidad','Fracción de la dosis administrada que llega inalterada a la circulación sistémica.'),
    C('farma','p2','Vida media','Tiempo necesario para que la concentración plasmática de un fármaco disminuya a la mitad.'),
    C('farma','p1','Agonista','Fármaco que se une a un receptor y lo activa, produciendo una respuesta.'),
    C('farma','p1','Antagonista competitivo','Fármaco que compite con el agonista por el mismo sitio del receptor sin activarlo; su efecto se supera aumentando la dosis del agonista.'),
    C('farma','p1','Índice terapéutico','Relación entre la dosis tóxica y la dosis eficaz (DT50/DE50); indica el margen de seguridad.'),
    C('farma','p2','Efecto de primer paso','Metabolización del fármaco en el hígado o el intestino antes de llegar a la circulación sistémica, que reduce su biodisponibilidad oral.'),
    C('farma','p2','Volumen de distribución','Volumen teórico en el que tendría que disolverse la dosis para alcanzar la concentración plasmática observada.'),
    C('farma','p2','Inductor enzimático','Sustancia que aumenta la actividad de enzimas metabolizadoras (como el citocromo P450) y acelera el metabolismo de otros fármacos.')
  ];
  const Q = (materiaId, u, q, ops, exp) => ({ id: uid(), materiaId, u, q, ops, a: 0, exp });
  const preguntas = [
    Q('anat','a2','¿Qué raíces forman el plexo braquial?',['C5 a T1','C1 a C4','L1 a L4','C3 a C7'],'Se forma con las ramas anteriores de C5, C6, C7, C8 y T1.'),
    Q('anat','a1','Un plano sagital divide al cuerpo en:',['Derecha e izquierda','Anterior y posterior','Superior e inferior','Proximal y distal'],'El plano frontal (coronal) separa anterior y posterior; el transversal, superior e inferior.'),
    Q('anat','a4','¿Qué estructura NO está en el mediastino?',['Los pulmones','El corazón','El esófago','La tráquea'],'Los pulmones están en las cavidades pleurales, a los lados del mediastino.'),
    Q('anat','a2','El músculo deltoides está inervado por el nervio:',['Axilar (circunflejo)','Mediano','Cubital','Musculocutáneo'],'El nervio axilar sale del fascículo posterior e inerva deltoides y redondo menor.'),
    Q('anat','a3','El ligamento cruzado anterior de la rodilla impide sobre todo:',['El desplazamiento anterior de la tibia respecto al fémur','El desplazamiento posterior de la tibia','La rotación externa del fémur','La hiperflexión'],'Por eso se explora con la prueba del cajón anterior y la de Lachman.'),
    Q('anat','a5','En el hombre, el conducto inguinal contiene:',['El cordón espermático','La arteria femoral','El nervio obturador','El uréter'],'En la mujer contiene el ligamento redondo del útero.'),
    Q('fisio','f2','El gasto cardíaco se calcula como:',['Frecuencia cardíaca × volumen sistólico','Presión arterial × resistencia','Volumen sistólico ÷ frecuencia','Frecuencia × presión arterial media'],'GC = FC × VS. En reposo ronda los 5 L/min en un adulto.'),
    Q('fisio','f1','La despolarización del potencial de acción neuronal se debe sobre todo a:',['La entrada de Na⁺','La salida de K⁺','La entrada de Cl⁻','La salida de Ca²⁺'],'Se abren canales de Na⁺ dependientes de voltaje; la salida de K⁺ produce la repolarización.'),
    Q('fisio','f3','¿Qué células producen el surfactante pulmonar?',['Neumocitos tipo II','Neumocitos tipo I','Macrófagos alveolares','Células caliciformes'],'Los neumocitos tipo I forman la barrera de intercambio; los tipo II secretan surfactante.'),
    Q('fisio','f2','Según Frank-Starling, un aumento de la precarga produce:',['Aumento del volumen sistólico','Disminución del volumen sistólico','Disminución de la frecuencia cardíaca','Vasoconstricción'],'Más estiramiento de las fibras, dentro de límites fisiológicos, da una contracción más fuerte.'),
    Q('fisio','f4','La tasa de filtración glomerular normal de un adulto es de aproximadamente:',['125 mL/min','12 mL/min','1.250 mL/min','500 mL/min'],'Equivale a unos 180 litros de filtrado por día.'),
    Q('fisio','f3','La capacidad vital es la suma de:',['Volumen corriente + reserva inspiratoria + reserva espiratoria','Volumen residual + volumen corriente','Capacidad residual funcional + volumen residual','Reserva espiratoria + volumen residual'],'No incluye el volumen residual, que no se puede espirar.'),
    Q('farma','p2','La biodisponibilidad de un fármaco por vía intravenosa es:',['100 %','50 %','Depende del efecto de primer paso','0 %'],'Por vía IV toda la dosis llega a la circulación sistémica.'),
    Q('farma','p2','¿Cuántas vidas medias hacen falta, aproximadamente, para llegar al estado estacionario?',['4 a 5','1','2','10 a 12'],'También son unas 4 a 5 vidas medias para eliminar casi todo el fármaco.'),
    Q('farma','p1','Un antagonista competitivo produce en la curva dosis-respuesta del agonista:',['Un desplazamiento a la derecha sin cambiar el efecto máximo','Una disminución del efecto máximo','Un desplazamiento a la izquierda','Ningún cambio'],'Baja la potencia aparente del agonista, pero no su eficacia máxima.'),
    Q('farma','p2','La rifampicina es un ejemplo clásico de:',['Inductor enzimático','Inhibidor enzimático','Antagonista competitivo','Profármaco'],'Induce el citocromo P450 y reduce el efecto de otros fármacos, como los anticonceptivos orales.'),
    Q('farma','p1','Un índice terapéutico bajo indica:',['Un margen de seguridad estrecho','Un fármaco muy seguro','Alta biodisponibilidad','Vida media larga'],'Ejemplos: digoxina, litio, warfarina. Suelen requerir monitoreo.'),
    Q('farma','p5','Los AINEs actúan inhibiendo:',['La ciclooxigenasa (COX)','La lipooxigenasa','Los receptores opioides','La fosfolipasa A2'],'Al inhibir la COX disminuye la síntesis de prostaglandinas.')
  ];
  preguntas.push(...CASOS());
  cards.push(imgCard());
  // historial de ejemplo para que Progreso tenga datos
  let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const historial = [];
  const hard = ['Ley de Frank-Starling','Distensibilidad pulmonar','Volumen de distribución','Efecto de primer paso','Tróclea','Presión oncótica'];
  cards.forEach(c => {
    const n = Math.floor(rnd() * 4);
    for (let k = 0; k < n; k++){
      const ok = rnd() > (hard.includes(c.term) ? 0.7 : 0.25);
      ok ? c.ok++ : c.bad++;
      historial.push({ t: TODAY.getTime() - Math.floor(rnd()*13)*DAY - 36e5, tipo: rnd() > .5 ? 'flash' : 'quiz', materiaId: c.materiaId, u: c.u, ref: c.term, ok });
    }
    c.box = Math.max(1, Math.min(5, 1 + c.ok - c.bad));
  });
  preguntas.forEach(p => {
    const n = 1 + Math.floor(rnd() * 2);
    for (let k = 0; k < n; k++){
      const ok = rnd() > (['f3','p2','a3'].includes(p.u) ? 0.65 : 0.3);
      historial.push({ t: TODAY.getTime() - Math.floor(rnd()*13)*DAY - 72e5, tipo:'cuest', materiaId: p.materiaId, u: p.u, ref: p.q, ok });
    }
  });
  return { v:2, perfil:{ anioActual:2 }, notif:{ dias:5 }, materias, unidades, eventos, biblio, cards, preguntas, historial, racha:{ dias:6, ultimo: iso(new Date(TODAY.getTime()-DAY)) } };
}

// main.js prepara la cuenta: datos guardados en la nube, cómo guardar y cómo registrar el uso
const HOST = window.__VDM__ || {};
const IA = false; // las funciones con IA quedan ocultas hasta que se conecte la API de Claude
const track = (evento, detalle) => { try { HOST.track && HOST.track(evento, detalle); } catch (e) {} };
let S = HOST.data || null;
const nuevo = !S || S.v !== 3;
if (S && S.v === 1){ // suma lo nuevo sin perder lo que ya se tildó
  S.preguntas.push(...CASOS()); S.cards.push(imgCard()); S.notif = { dias:5 };
  const b4 = S.biblio.find(b => b.id === 'b4'); if (b4 && !b4.texto) b4.texto = B4_TEXTO;
  S.v = 2;
}
if (!S || (S.v !== 2 && S.v !== 3)) S = HOST.inicio === 'vacio' ? emptyState() : seed();
const save = () => { try { HOST.save && HOST.save(S); } catch (e) {} };
if (S.v === 2) addV3(S); // suma lo de la versión 3 sin tocar lo que ya se cargó
if (nuevo) save();
// Terminología: términos propios de la cuenta y progreso de práctica (los compartidos vienen de la base)
if (!S.glosario) S.glosario = { propios: [], stats: {}, hist: [] };

/* ---------- consultas ---------- */
const mat = id => S.materias.find(m => m.id === id);
const units = id => S.unidades[id] || [];
const unitById = uId => { for (const k in S.unidades){ const u = S.unidades[k].find(x => x.id === uId); if (u) return u; } return null; };
const progMat = id => { const t = units(id).flatMap(u => u.temas); return { done: t.filter(x => x.ok).length, total: t.length }; };
const progUnit = u => ({ done: u.temas.filter(t => t.ok).length, total: u.temas.length });
const evStatus = e => e.hecho ? 'ok' : daysTo(e.fecha) < 0 ? 'past' : daysTo(e.fecha) <= 5 ? 'urgent' : 'next';
const doneLbl = e => e.tipo === 'TP' ? 'Entregado' : 'Rendido';
const statusPill = e => { const st = evStatus(e), d = daysTo(e.fecha);
  const txt = st === 'ok' ? doneLbl(e) : st === 'past' ? 'Vencido' : d === 0 ? 'Hoy' : d === 1 ? 'Mañana' : `En ${d} días`;
  return `<span class="pill p-${st}">${st === 'ok' ? I('check',12) : ''}${txt}</span>`; };
// materias activas: las que se cursan y las regulares (final pendiente)
const cursando = () => S.materias.filter(m => m.estado === 'cursando' || m.estado === 'regular');
const matColor = m => m.color || '#5A6B68';
function markStudy(){ const t = iso(TODAY); if (S.racha.ultimo === t) return; S.racha.dias = S.racha.ultimo === iso(new Date(TODAY.getTime()-DAY)) ? S.racha.dias + 1 : 1; S.racha.ultimo = t; renderStreak(); }
function logH(tipo, materiaId, u, ref, ok){ S.historial.push({ t: Date.now(), tipo, materiaId, u, ref, ok }); markStudy(); save(); track('respuesta', tipo); }

/* ---------- navegación ---------- */
const NAV = [['inicio','Inicio','home'],['horario','Horario','grid'],['materias','Materias','book'],['practicar','Practicar','cards'],['fichas','Fichas','pill'],['terminos','Terminología','list'],['referencia','Referencia','flask'],['progreso','Progreso','chart'],['carrera','Carrera','cap']];
const NAV_M = ['inicio','materias','practicar','fichas'], MORE = ['horario','terminos','referencia','progreso','carrera'];
if (HOST.user && HOST.user.isAdmin){ NAV.push(['admin','Uso de la app','pulse']); MORE.push('admin'); }
let R = { view:'inicio' };
function go(view, params = {}){ closeModal(); R = { view, ...params }; render(); window.scrollTo(0,0); track('vista', view); }
function renderNav(){
  const top = R.view === 'materia' ? 'materias' : R.view === 'evento' ? 'inicio' : R.view;
  const b = ([v,l,i]) => `<button class="nav-btn" data-act="go" data-view="${v}" ${top === v ? 'aria-current="page"' : ''}>${I(i,20)}<span>${l}</span></button>`;
  $('#nav-side').innerHTML = NAV.map(b).join('');
  $('#nav-bottom').innerHTML = NAV.filter(n => NAV_M.includes(n[0])).map(([v,l,i]) => `<button data-act="go" data-view="${v}" ${top === v ? 'aria-current="page"' : ''}>${I(i,22)}<span>${l}</span></button>`).join('')
    + `<button data-act="more" ${MORE.includes(top) ? 'aria-current="page"' : ''}>${I('more',22)}<span>Más</span></button>`;
}
function renderStreak(){ $('#streak').innerHTML = `${I('flame',16)}<span class="num">${S.racha.dias}</span><span class="lbl">días seguidos</span>`; }

let timer = null;
function render(){
  clearInterval(timer);
  renderNav(); renderBell();
  const V = { inicio:vInicio, materias:vMaterias, materia:vMateria, evento:vEvento, practicar:vPracticar, progreso:vProgreso, carrera:vCarrera, horario:vHorario, fichas:vFichas, referencia:vReferencia, admin:vAdmin, terminos:vTerminos }[R.view] || vInicio;
  $('#view').innerHTML = V();
  if (R.view === 'evento') { tickCountdown(); timer = setInterval(tickCountdown, 30000); }
  if (R.view === 'referencia' && RF.tab === 'calc') CALCS.forEach(c => runCalc(c.id));
}

/* ---------- vistas: inicio ---------- */
let calMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
function evRow(e){
  const st = evStatus(e), d = pISO(e.fecha), m = mat(e.materiaId), dd = daysTo(e.fecha);
  const right = st === 'ok' ? `<span class="pill p-ok">${I('check',12)}${doneLbl(e)}</span>`
    : st === 'past' ? `<span class="pill p-past">Vencido</span>`
    : `<div class="count" style="color:${st==='urgent'?'var(--danger)':'inherit'}">${dd === 0 ? 'Hoy' : dd + (dd === 1 ? ' día' : ' días')}<small>faltan</small></div>`;
  return `<button class="ev ${st}" data-act="go" data-view="evento" data-id="${e.id}">
    <div class="ev-date"><b>${d.getDate()}</b><span>${MES[d.getMonth()].slice(0,3)}</span></div>
    <div style="min-width:0"><div class="ev-title">${esc(e.tipo === 'TP' ? e.titulo : e.tipo + ' · ' + m.nombre)}</div>
    <div class="small muted">${esc(e.tipo === 'TP' ? 'Trabajo práctico · ' + m.nombre : e.titulo)}</div></div>${right}</button>`;
}
function calendar(){
  const y = calMonth.getFullYear(), mo = calMonth.getMonth();
  const first = new Date(y, mo, 1), start = new Date(y, mo, 1 - ((first.getDay() + 6) % 7));
  let cells = '';
  for (let i = 0; i < 42; i++){
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i), k = iso(d);
    if (i >= 35 && d.getMonth() !== mo) break;
    const evs = S.eventos.filter(e => e.fecha === k);
    const cls = ['cal-day', d.getMonth() !== mo ? 'out' : '', k === iso(TODAY) ? 'today' : '', evs.length ? 'has' : ''].join(' ');
    const label = evs.length ? `${d.getDate()} de ${MES[d.getMonth()]}: ` + evs.map(e => e.tipo + ' de ' + mat(e.materiaId).nombre).join(', ') : `${d.getDate()} de ${MES[d.getMonth()]}`;
    cells += `<button class="${cls}" ${evs.length ? `data-act="cal-day" data-date="${k}"` : 'tabindex="-1"'} aria-label="${esc(label)}">${d.getDate()}<span class="dots">${evs.map(e => `<i class="dot ${evStatus(e)}"></i>`).join('')}</span></button>`;
  }
  return `<div class="card">
    <div class="card-h"><h2 style="text-transform:capitalize">${MES[mo]} ${y}</h2>
      <div class="row" style="gap:4px"><button class="btn sm ghost" data-act="cal-nav" data-d="-1" aria-label="Mes anterior">${I('back',16)}</button>
      <button class="btn sm" data-act="cal-nav" data-d="0">Hoy</button>
      <button class="btn sm ghost" data-act="cal-nav" data-d="1" aria-label="Mes siguiente">${I('next',16)}</button></div></div>
    <div class="cal-grid">${['lun','mar','mié','jue','vie','sáb','dom'].map(d => `<div class="cal-dow">${d}</div>`).join('')}${cells}</div>
    <div class="legend"><span><i class="dot urgent"></i>Faltan 5 días o menos</span><span><i class="dot"></i>Próximo</span><span><i class="dot ok"></i>Entregado o rendido</span></div>
  </div>`;
}
function studyPlan(e){
  const pend = units(e.materiaId).filter(u => e.unidades.includes(u.id)).flatMap(u => u.temas.filter(t => !t.ok).map(t => ({ ...t, unidad: u.nombre })));
  const tf = topicFreq(e.materiaId); pend.sort((a, b) => (tf.f[b.id] || 0) - (tf.f[a.id] || 0)); // primero lo que más se toma
  const days = Math.max(1, daysTo(e.fecha) - 1);
  const per = Math.ceil(pend.length / days) || 0;
  const plan = [];
  for (let i = 0; i < days && i * per < pend.length; i++) plan.push({ fecha: addD(i), temas: pend.slice(i*per, (i+1)*per) });
  return { pend, plan, per };
}
function vInicio(){
  const up = S.eventos.filter(e => !e.hecho && daysTo(e.fecha) >= 0).sort((a,b) => a.fecha.localeCompare(b.fecha));
  const urgent = up.filter(e => daysTo(e.fecha) <= 5);
  const recent = S.eventos.filter(e => e.hecho).sort((a,b) => b.fecha.localeCompare(a.fecha)).slice(0,2);
  const nextExam = up.find(e => e.tipo !== 'TP' && studyPlan(e).pend.length);
  let planHtml = '<p class="muted">No hay temas pendientes para tus próximos exámenes.</p>';
  if (nextExam){ const sp = studyPlan(nextExam); const today = sp.plan[0];
    planHtml = `<p class="small muted" style="margin-bottom:10px">Para el ${nextExam.tipo.toLowerCase()} de ${esc(mat(nextExam.materiaId).nombre)} quedan <b>${sp.pend.length} temas</b> en ${daysTo(nextExam.fecha)} días. Hoy te tocan:</p>
      <div class="stack" style="gap:6px">${today.temas.map(t => `<label class="topic" style="border:1px solid var(--line);border-radius:10px"><input type="checkbox" data-change="topic" data-m="${nextExam.materiaId}" data-t="${t.id}"><span>${esc(t.nombre)} <span class="muted small">· ${esc(t.unidad)}</span></span></label>`).join('')}</div>
      <div class="row" style="margin-top:12px"><button class="btn sm" data-act="go" data-view="evento" data-id="${nextExam.id}">Ver plan completo</button>
      <button class="btn sm" data-act="start-cuest" data-m="${nextExam.materiaId}" data-units="${nextExam.unidades.join(',')}">${I('quiz',15)}Repasar con preguntas</button></div>`; }
  const h = new Date().getHours();
  return `<div class="stack">
    <div class="row between" style="align-items:flex-end"><div><p class="eyebrow">${fmtLong(iso(TODAY))}</p><h1>${h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches'}</h1></div>
      <button class="btn" data-act="pomo-open">${I('timer',16)}Pomodoro</button></div>
    ${urgent.length ? `<button class="alert" data-act="go" data-view="evento" data-id="${urgent[0].id}"><span class="num">${urgent.length}</span><span style="flex:1">${urgent.length === 1 ? 'fecha vence' : 'fechas vencen'} en los próximos 5 días: ${urgent.map(e => esc(e.tipo === 'TP' ? 'TP de ' + mat(e.materiaId).nombre : e.tipo + ' de ' + mat(e.materiaId).nombre)).join(', ')}</span>${I('next',18)}</button>` : ''}
    <div class="grid g2">${hoyCard()}${hoyFacuCard()}</div>
    <div class="grid g-home">
      ${calendar()}
      <div class="stack">
        <div class="card"><div class="card-h"><h2>Próximas fechas</h2><span class="small muted">${up.length} pendientes</span></div>
          <div class="stack" style="gap:8px">${up.slice(0,4).map(evRow).join('')}${recent.map(evRow).join('')}</div></div>
      </div>
    </div>
    <div class="grid g2">
      <div class="card"><div class="card-h"><h2>Plan de hoy</h2><span class="pill p-warm">${I('spark',12)}Automático</span></div>${planHtml}</div>
      <div class="card"><div class="card-h"><h2>Tus materias</h2><button class="btn sm ghost" data-act="go" data-view="materias">Ver todas</button></div>
        <div class="stack" style="gap:12px">${cursando().map(m => { const p = progMat(m.id); return `<button class="row" style="border:0;background:none;padding:0;text-align:left;flex-wrap:nowrap" data-act="go" data-view="materia" data-id="${m.id}">
          <span class="mat-ico" style="background:${matColor(m)}">${esc(m.nombre[0])}</span>
          <span style="flex:1;min-width:0"><span class="row between"><b>${esc(m.nombre)}${m.estado === 'regular' ? ' <span class="small muted" style="font-weight:500">· final pendiente</span>' : ''}</b><span class="num small">${pct(p.done,p.total)}%</span></span><span class="bar" style="display:block;margin-top:6px"><i style="width:${pct(p.done,p.total)}%"></i></span></span></button>`; }).join('') || `<p class="small muted">Todavía no cargaste materias.</p><button class="btn sm pri" style="align-self:flex-start" data-act="add-materia">${I('plus',14)}Agregar materia</button>`}</div></div>
    </div>
  </div>`;
}

/* ---------- vistas: materias ---------- */
let matFilter = 'cursando';
function ring(p, size = 64, color = 'var(--accent)'){
  const r = size/2 - 6, c = 2*Math.PI*r;
  return `<div class="ring" style="width:${size}px;height:${size}px"><svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="7"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${c*p/100} ${c}" transform="rotate(-90 ${size/2} ${size/2})"/></svg><b>${p}%</b></div>`;
}
function vMaterias(){
  const list = S.materias.filter(m => matFilter === 'todas' || m.estado === matFilter).sort((a,b) => a.anio - b.anio);
  return `<div class="stack">
    <div class="row between"><h1>Materias</h1><button class="btn pri" data-act="add-materia">${I('plus',16)}Agregar materia</button></div>
    <div class="tabs" role="tablist">${[['cursando','Cursando'],['regular','Regulares'],['aprobada','Aprobadas'],['pendiente','Pendientes'],['todas','Todas']].map(([k,l]) => `<button role="tab" aria-selected="${matFilter===k}" data-act="mat-filter" data-f="${k}">${l}</button>`).join('')}</div>
    ${list.length ? `<div class="grid g3">${list.map(m => { const p = progMat(m.id), next = S.eventos.filter(e => e.materiaId === m.id && !e.hecho && daysTo(e.fecha) >= 0).sort((a,b) => a.fecha.localeCompare(b.fecha))[0];
      return `<div class="card mat" data-act="go" data-view="materia" data-id="${m.id}" role="button" tabindex="0">
        <div class="row between" style="flex-wrap:nowrap"><span class="mat-ico" style="background:${matColor(m)}">${esc(m.nombre[0])}</span>${m.estado === 'aprobada' ? `<span class="pill p-ok">${I('check',12)}Aprobada${m.nota ? ' · ' + m.nota : ''}</span>` : m.estado === 'pendiente' ? '<span class="pill p-past">Pendiente</span>' : m.estado === 'regular' ? '<span class="pill p-warm">Regular</span>' : '<span class="pill p-next">Cursando</span>'}</div>
        <div><h2>${esc(m.nombre)}</h2><p class="small muted">${m.anio}º año${p.total ? ` · ${p.done} de ${p.total} temas estudiados` : ''}</p></div>
        ${m.estado === 'regular' ? `<div>${regPill(m)}</div>` : ''}${asistResumen(m)}
        ${p.total ? `<div class="bar"><i style="width:${pct(p.done,p.total)}%"></i></div>` : ''}
        ${next ? `<div class="row small" style="gap:6px">${I('cal',14)}<span>${esc(next.tipo === 'TP' ? next.titulo : next.tipo + ' ' + next.titulo.toLowerCase())}</span>${statusPill(next)}</div>` : ''}
      </div>`; }).join('')}</div>` : '<div class="empty">No hay materias en esta lista.</div>'}
  </div>`;
}
function vMateria(){
  const m = mat(R.id); if (!m) return vMaterias();
  const tab = R.tab || 'unidades', p = progMat(m.id);
  const evs = S.eventos.filter(e => e.materiaId === m.id).sort((a,b) => a.fecha.localeCompare(b.fecha));
  const docs = S.biblio.filter(b => b.materiaId === m.id);
  const nCards = S.cards.filter(c => c.materiaId === m.id).length, nQ = S.preguntas.filter(q => q.materiaId === m.id).length;
  const hor = S.horario.filter(c => c.materiaId === m.id).sort(clsSort).map(c => `${DIAS[c.dia].slice(0, 3)} ${c.desde}`).join(' · ');
  let body = '';
  if (tab === 'unidades') body = unitsToolbar(m) + (R.edit ? unitsEditor(m) : units(m.id).length ? `<div class="stack" style="gap:10px">${units(m.id).map((u, i) => { const pu = progUnit(u);
      return `<details class="unit" ${i < 3 ? 'open' : ''}><summary><span class="num muted small">U${i+1}</span><b style="flex:1">${esc(u.nombre)}</b><span class="bar ${pu.done===pu.total?'ok':''}"><i style="width:${pct(pu.done,pu.total)}%"></i></span><span class="num small muted">${pu.done}/${pu.total}</span></summary>
      ${u.temas.map(t => `<label class="topic ${t.ok?'done':''}"><input type="checkbox" ${t.ok?'checked':''} data-change="topic" data-m="${m.id}" data-t="${t.id}"><span>${esc(t.nombre)}${hotPill(m.id, t.id)}</span></label>`).join('')}</details>`; }).join('')}</div>`
    : `<div class="empty">Esta materia todavía no tiene unidades cargadas.<br>Agregalas una por una o pegá el programa de la cátedra.<div class="row" style="justify-content:center;margin-top:10px"><button class="btn sm" data-act="add-unidad" data-m="${m.id}">${I('plus',14)}Agregar unidad</button><button class="btn sm" data-act="import-prog" data-m="${m.id}">Importar programa</button></div></div>`);
  if (tab === 'biblio') body = `<div class="stack" style="gap:10px">
      <label class="drop" for="up-${m.id}">${I('upload',22)}<b>Subir apunte o PDF</b><span class="small">${IA ? 'Los PDF y archivos de texto los lee la IA para armarte preguntas, resúmenes y flashcards' : 'Tus PDF y apuntes quedan guardados en la materia y podés buscar palabras dentro de ellos'}</span></label>
      <input type="file" id="up-${m.id}" data-change="upload" data-m="${m.id}" hidden multiple accept=".pdf,.txt,.md,.doc,.docx,image/*">
      ${docs.map(docItem).join('')}</div>`;
  if (tab === 'fechas') body = `<div class="stack" style="gap:8px">${evs.length ? evs.map(evRow).join('') : '<div class="empty">Sin fechas cargadas.</div>'}<button class="btn" data-act="add-evento" data-m="${m.id}">${I('plus',16)}Agregar fecha</button></div>`;
  if (tab === 'viejos') body = viejosTab(m);
  if (tab === 'asist') body = asistTab(m);
  if (tab === 'practicar') body = `<div class="grid g3">
      <button class="card mat" data-act="practice" data-tab="flash" data-m="${m.id}">${I('cards',24)}<h2>Flashcards</h2><p class="small muted">${nCards} tarjetas</p></button>
      <button class="card mat" data-act="practice" data-tab="quiz" data-m="${m.id}">${I('pulse',24)}<h2>Quiz</h2><p class="small muted">Escribí la definición o el término</p></button>
      <button class="card mat" data-act="start-cuest" data-m="${m.id}">${I('quiz',24)}<h2>Cuestionario</h2><p class="small muted">${nQ} preguntas</p></button></div>`;
  return `<div class="stack">
    <button class="back" data-act="go" data-view="materias">${I('back',16)}Materias</button>
    <div class="card"><div class="row" style="gap:16px;flex-wrap:nowrap">${ring(pct(p.done,p.total), 72, matColor(m))}
      <div style="flex:1;min-width:0"><p class="eyebrow">${m.anio}º año · ${m.estado}</p><h1>${esc(m.nombre)}</h1><p class="small muted">${p.done} de ${p.total} temas estudiados · ${docs.length} apuntes · ${nCards} flashcards</p>${hor ? `<p class="small muted row" style="gap:6px;margin-top:4px">${I('grid',14)}${esc(hor)}</p>` : ''}${m.estado === 'regular' ? `<div style="margin-top:6px">${regPill(m)}</div>` : ''}</div>
      <button class="btn sm" data-act="edit-materia" data-id="${m.id}" style="align-self:flex-start">${I('edit',15)}<span>Editar</span></button></div></div>
    <div class="tabs" role="tablist">${[['unidades','Unidades y temas'],['biblio','Bibliografía'],['fechas','Fechas'],['asist','Asistencia'],['viejos','Exámenes anteriores'],['practicar','Practicar']].map(([k,l]) => `<button role="tab" aria-selected="${tab===k}" data-act="mat-tab" data-tab="${k}">${l}</button>`).join('')}</div>
    ${body}
  </div>`;
}

/* ---------- vistas: examen / evento ---------- */
function tickCountdown(){
  const el = $('#cd'); if (!el) return;
  const e = S.eventos.find(x => x.id === R.id); const target = pISO(e.fecha); target.setHours(8,0,0,0);
  let ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / DAY); ms -= d*DAY; const h = Math.floor(ms / 36e5); ms -= h*36e5; const mi = Math.floor(ms / 6e4);
  el.innerHTML = [[d,'días'],[h,'horas'],[mi,'min']].map(([n,l]) => `<div class="cd"><b>${String(n).padStart(2,'0')}</b><span>${l}</span></div>`).join('');
}
function vEvento(){
  const e = S.eventos.find(x => x.id === R.id); if (!e) return vInicio();
  const m = mat(e.materiaId), st = evStatus(e), us = units(m.id).filter(u => e.unidades.includes(u.id));
  const all = us.flatMap(u => u.temas), done = all.filter(t => t.ok).length;
  const sp = studyPlan(e);
  const docs = S.biblio.filter(b => b.materiaId === m.id);
  return `<div class="stack">
    <button class="back" data-act="go" data-view="inicio">${I('back',16)}Inicio</button>
    <div class="card ${st==='urgent'?'hero-urgent':''}">
      <div class="row between" style="align-items:flex-start;gap:16px">
        <div><p class="eyebrow">${e.tipo === 'TP' ? 'Trabajo práctico' : e.tipo} · ${esc(m.nombre)}</p><h1>${esc(e.tipo === 'TP' ? e.titulo : e.tipo + ' de ' + m.nombre)}</h1>
          <p class="muted" style="margin-top:4px;text-transform:capitalize">${fmtLong(e.fecha)} ${e.tipo !== 'TP' ? '· 8:00 h' : ''}</p></div>
        ${statusPill(e)}
      </div>
      ${st === 'urgent' || st === 'next' ? `<div class="countdown" id="cd" style="margin-top:16px"></div>` : ''}
      <div class="row" style="margin-top:16px">
        <button class="btn ${e.hecho ? '' : 'pri'}" data-act="toggle-hecho" data-id="${e.id}">${I('check',16)}${e.hecho ? 'Desmarcar' : 'Marcar como ' + doneLbl(e).toLowerCase()}</button>
        <button class="btn" data-act="start-cuest" data-m="${m.id}" data-units="${e.unidades.join(',')}">${I('quiz',16)}Repasar con preguntas</button>
        <button class="btn" data-act="practice" data-tab="flash" data-m="${m.id}">${I('cards',16)}Flashcards</button>
        <button class="btn" data-act="add-evento" data-m="${m.id}" data-id="${e.id}">${I('edit',16)}Editar fecha</button>
        <button class="btn" data-act="ai-ask" data-q="${esc(`Armame un plan de estudio para el ${e.tipo.toLowerCase()} de ${m.nombre} del ${fmtLong(e.fecha)}. Temas pendientes: ${sp.pend.map(t => t.nombre).join(', ') || 'ninguno'}.`)}">${I('spark',16)}Plan con IA</button>
      </div>
    </div>
    <div class="grid g2">
      <div class="card"><div class="card-h"><h2>Temas que entran</h2><span class="num small">${done}/${all.length}</span></div>
        <div class="bar ${done===all.length?'ok':''}" style="margin-bottom:14px"><i style="width:${pct(done,all.length)}%"></i></div>
        <div class="stack" style="gap:10px">${us.map(u => `<details class="unit" open><summary><b style="flex:1">${esc(u.nombre)}</b><span class="num small muted">${progUnit(u).done}/${progUnit(u).total}</span></summary>
        ${u.temas.map(t => `<label class="topic ${t.ok?'done':''}"><input type="checkbox" ${t.ok?'checked':''} data-change="topic" data-m="${m.id}" data-t="${t.id}"><span>${esc(t.nombre)}${hotPill(m.id, t.id)}</span></label>`).join('')}</details>`).join('')}</div></div>
      <div class="stack">
        <div class="card"><div class="card-h"><h2>Plan de estudio</h2><span class="pill p-warm">${I('spark',12)}Automático</span></div>
          ${sp.pend.length ? `<p class="small muted" style="margin-bottom:8px">${sp.pend.length} temas pendientes repartidos en ${sp.plan.length} ${sp.plan.length === 1 ? 'día' : 'días'}. El día anterior queda libre para repasar.</p>
          ${sp.plan.map((d, i) => `<div class="plan-day"><div><b class="small" style="text-transform:capitalize">${i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : DOW[pISO(d.fecha).getDay()] + ' ' + pISO(d.fecha).getDate()}</b></div><div class="small">${d.temas.map(t => esc(t.nombre)).join(' · ')}</div></div>`).join('')}
          <div class="plan-day"><div><b class="small">Día previo</b></div><div class="small">Repaso general con cuestionario y flashcards</div></div>`
          : `<p class="muted">Tenés todos los temas tildados. Hacé un cuestionario para ver cómo estás.</p>`}</div>
        <div class="card"><div class="card-h"><h2>Material</h2><button class="btn sm ghost" data-act="mat-open" data-id="${m.id}" data-tab="biblio">Ver todo</button></div>
          <div class="stack" style="gap:8px">${docs.slice(0,3).map(d => `<div class="doc"><span class="doc-ico">${I('file',18)}</span><div style="min-width:0"><b>${esc(d.titulo)}</b><p class="small muted">${esc(d.detalle)}</p></div></div>`).join('')}</div></div>
      </div>
    </div>
  </div>`;
}

/* ---------- vistas: practicar ---------- */
let P = { tab:'hoy', m:'todas', dir:'td', queue:[], i:0, flipped:false, ok:0, bad:0, quiz:null, cq:null };
function deck(){ return S.cards.filter(c => P.m === 'todas' || c.materiaId === P.m); }
function buildQueue(){ P.queue = shuffle(deck()).sort((a,b) => a.box - b.box).map(c => c.id); P.i = 0; P.flipped = false; }
function matSelect(id = 'pm'){ return `<select id="${id}" data-change="pm" style="width:auto"><option value="todas" ${P.m==='todas'?'selected':''}>Todas las materias</option>${cursando().map(m => `<option value="${m.id}" ${P.m===m.id?'selected':''}>${esc(m.nombre)}</option>`).join('')}</select>`; }
function scoreBar(){ const t = P.ok + P.bad; return `<div class="score"><div class="s-ok"><b>${P.ok}</b>correctas</div><div class="s-bad"><b>${P.bad}</b>incorrectas</div><div><b>${pct(P.ok,t)}%</b>aciertos</div></div>`; }
function vPracticar(){
  const nErr = validErrores().length;
  const tabs = [['hoy','Estudiar hoy','flame'],['flash','Flashcards','cards'],['quiz','Quiz','pulse'],['cuest','Cuestionarios','quiz'],['sim','Simulacro','clock'],['errores','Errores' + (nErr ? ` (${nErr})` : ''),'redo'],['feyn','Explicalo','chat']];
  const V = { hoy:vHoy, flash:vFlash, quiz:vQuiz, cuest:vCuest, sim:vSim, errores:vErrores, feyn:vFeyn };
  if (!V[P.tab]) P.tab = 'hoy';
  const body = V[P.tab]();
  const showSel = P.tab === 'flash' || P.tab === 'quiz' || (P.tab === 'errores' && !(HS && HS.src === 'errores'));
  return `<div class="stack">
    <div class="row between"><h1>Practicar</h1><div class="row">${showSel ? matSelect() : ''}${P.tab === 'flash' || P.tab === 'quiz' ? `<button class="btn" data-act="add-card">${I('plus',16)}Nueva flashcard</button>` : ''}${P.tab === 'flash' ? `<button class="btn" data-act="mazos">${I('share',16)}Compartir mazos</button>` : ''}</div></div>
    <div class="tabs" role="tablist">${tabs.map(([k,l,i]) => `<button role="tab" aria-selected="${P.tab===k}" data-act="p-tab" data-tab="${k}"><span class="row" style="gap:6px;flex-wrap:nowrap">${I(i,16)}${l}</span></button>`).join('')}</div>
    ${body}
  </div>`;
}
function dirToggle(){ return `<div class="tabs" style="width:max-content"><button aria-selected="${P.dir==='td'}" data-act="p-dir" data-d="td">Término → definición</button><button aria-selected="${P.dir==='dt'}" data-act="p-dir" data-d="dt">Definición → término</button></div>`; }
function vFlash(){
  if (!P.queue.length || P.queue.some(id => !S.cards.find(c => c.id === id))) buildQueue();
  if (!P.queue.length) return `<div class="empty">No hay flashcards para esta materia todavía. Creá la primera con “Nueva flashcard”.</div>`;
  if (P.i >= P.queue.length) return `<div class="card stack" style="align-items:center;text-align:center;padding:32px"><h2>¡Terminaste el mazo!</h2>${scoreBar()}<p class="muted">Las que no sabías van a aparecer primero la próxima vez.</p><button class="btn pri" data-act="flash-restart">Repasar de nuevo</button></div>`;
  const c = S.cards.find(x => x.id === P.queue[P.i]), m = mat(c.materiaId);
  let front = P.dir === 'td' ? `<div class="big">${esc(c.term)}</div>` : `<div class="def">${esc(c.def)}</div>`;
  let back = P.dir === 'td' ? `<div class="def">${esc(c.def)}</div>` : `<div class="big">${esc(c.term)}</div>`;
  if (c.img){ front = `<b>${esc(c.term)}</b>${occView(c, false)}<span class="small muted">Nombrá las partes tapadas</span>`; back = `${occView(c, true)}${c.def ? `<div class="small" style="max-width:52ch">${esc(c.def)}</div>` : ''}`; }
  const boxes = `<span class="boxes" title="Caja ${c.box} de 5">${[1,2,3,4,5].map(n => `<i class="${n <= c.box ? 'on' : ''}"></i>`).join('')}</span>`;
  return `<div class="stack">
    <div class="row between">${dirToggle()}${scoreBar()}</div>
    <div class="flip ${c.img ? 'tall' : ''} ${P.flipped ? 'on' : ''}" id="flip"><div class="flip-in" data-act="flip" role="button" tabindex="0" aria-label="Dar vuelta la tarjeta">
      <div class="face"><div class="corner"><span>${esc(m.nombre)}${c.propia ? ' · propia' : ''}</span><span class="num">${P.i+1}/${P.queue.length}</span></div>${front}<span class="small muted row" style="gap:6px">${I('flip',14)}Tocá para dar vuelta</span></div>
      <div class="face back"><div class="corner"><span>${esc(m.nombre)}</span>${boxes}</div>${back}</div>
    </div></div>
    <div class="row" style="justify-content:center">
      ${P.flipped ? `<button class="btn" style="min-width:150px;color:var(--danger)" data-act="flash-ans" data-ok="0">${I('x',16)}No la sabía</button><button class="btn pri" style="min-width:150px" data-act="flash-ans" data-ok="1">${I('check',16)}La sabía</button>`
        : `<button class="btn pri" style="min-width:200px" data-act="flip">${I('flip',16)}Ver respuesta</button>`}
    </div>
    <p class="note" style="max-width:620px;margin-inline:auto">Repetición espaciada: cada tarjeta está en una caja del 1 al 5. Si la sabés sube de caja y aparece menos; si no, vuelve a la caja 1 y la ves antes.</p>
  </div>`;
}
function newQuizItem(){ const d = deck().filter(c => !c.img); if (!d.length) return null;
  const pool = shuffle(d).sort((a,b) => (b.bad - b.ok) - (a.bad - a.ok)).slice(0, Math.max(3, Math.ceil(d.length/2)));
  return { id: pool[Math.floor(Math.random()*pool.length)].id, answer:'', res:null, ai:null }; }
function gradeQuiz(c, ans, dir = P.dir){
  if (dir === 'dt'){ const a = norm(ans), t = norm(c.term); const ok = a === t || (t.length > 5 && lev(a, t) <= 2) || (a.length > 3 && t.split(' ').length > 1 && t.startsWith(a));
    return { ok, detail: ok ? 'Escribiste el término correcto.' : 'El término no coincide.' }; }
  const STOP = new Set(['para','sobre','entre','desde','hasta','donde','cuando','como','dentro','antes','menos','mayor','misma','mismo','otros','otras','suelen','produce','cada','tiene','partir','estudio']);
  const keys = [...new Set(norm(c.def).split(' ').filter(w => w.length >= 5 && !STOP.has(w)))];
  const a = norm(ans).split(' ');
  const hit = keys.filter(k => a.some(w => w.length >= 4 && (w === k || (w.length > 5 && k.startsWith(w.slice(0, 5))))));
  const r = keys.length ? hit.length / keys.length : 0;
  return { ok: r >= 0.4, detail: `Conceptos clave que mencionaste: ${hit.length} de ${keys.length} (${Math.round(r*100)}%).`, miss: keys.filter(k => !hit.includes(k)).slice(0,6) };
}
function vQuiz(){
  if (!P.quiz || !S.cards.find(c => c.id === P.quiz.id)) P.quiz = newQuizItem();
  if (!P.quiz) return `<div class="empty">No hay términos cargados para esta materia.</div>`;
  const q = P.quiz, c = S.cards.find(x => x.id === q.id), m = mat(c.materiaId);
  const ask = P.dir === 'td' ? `<p class="eyebrow">Escribí la definición de</p><div class="big">${esc(c.term)}</div>` : `<p class="eyebrow">¿Qué término corresponde a esta definición?</p><p style="margin-top:6px">${esc(c.def)}</p>`;
  let fb = '';
  if (q.res){ fb = `<div class="fb ${q.res.ok ? 'ok' : 'bad'}"><h3>${q.res.ok ? 'Correcta' : 'Incorrecta'}</h3><p class="small">${esc(q.res.detail)}</p>
      ${!q.res.ok && q.res.miss && q.res.miss.length ? `<p class="small" style="margin-top:4px">Te faltó mencionar: <b>${q.res.miss.map(esc).join(', ')}</b></p>` : ''}
      <p class="small" style="margin-top:8px"><b>Respuesta de referencia:</b> ${esc(P.dir === 'td' ? c.def : c.term)}</p>
      ${q.ai ? `<div class="note ai-out" style="margin-top:10px">${q.ai}</div>` : ''}</div>
      <div class="row">${!q.res.ok ? `<button class="btn sm" data-act="quiz-override">${I('check',14)}Estaba bien, contala como correcta</button>` : ''}
      ${P.dir === 'td' && !q.ai ? `<button class="btn sm" data-act="quiz-ai">${I('spark',14)}Corregir con IA</button>` : ''}
      <button class="btn pri" data-act="quiz-next" style="margin-left:auto">Siguiente${I('next',16)}</button></div>`; }
  return `<div class="stack" style="max-width:720px">
    <div class="row between">${dirToggle()}${scoreBar()}</div>
    <div class="prompt"><p class="small muted" style="margin-bottom:8px">${esc(m.nombre)}</p>${ask}</div>
    <form class="stack" style="gap:10px" data-form="quiz">
      ${P.dir === 'td' ? `<textarea id="qa" placeholder="Escribí la definición con tus palabras…" ${q.res ? 'disabled' : ''}>${esc(q.answer)}</textarea>` : `<input type="text" id="qa" placeholder="Escribí el término…" value="${esc(q.answer)}" ${q.res ? 'disabled' : ''} autocomplete="off">`}
      ${q.res ? '' : `<div class="row"><button class="btn pri" type="submit">Comprobar</button><button class="btn ghost" type="button" data-act="quiz-skip">No sé, mostrame</button></div>`}
    </form>
    ${fb}
  </div>`;
}
function startCuest(m, unitsList, casos, origen){
  const okTipo = q => (!casos || q.tipo === 'caso') && (!origen || (origen === 'viejos' ? !!q.origen : q.origen === origen));
  let pool = S.preguntas.filter(q => (m === 'todas' || q.materiaId === m) && (!unitsList || unitsList.includes(q.u)) && okTipo(q));
  if (!pool.length) pool = S.preguntas.filter(q => (m === 'todas' || q.materiaId === m) && okTipo(q));
  const items = shuffle(pool).slice(0, 8).map(q => ({ id: q.id, order: shuffle([0,1,2,3]), pick: null }));
  P.cq = { m, units: unitsList, casos, origen, items, i: 0, done:false };
}
function vCuest(){
  if (!P.cq) {
    const counts = cursando().map(m => [m, S.preguntas.filter(q => q.materiaId === m.id).length]);
    return `<div class="stack">
      <p class="muted" style="max-width:62ch">Elegí qué repasar. Te hago hasta 8 preguntas, te corrijo cada una y al final te digo qué unidades reforzar.</p>
      <div class="card row between" style="gap:14px"><div class="row" style="flex-wrap:nowrap;gap:14px;min-width:0"><span class="n-ico warm" style="width:44px;height:44px">${I('case',22)}</span><div style="min-width:0"><h2>Casos clínicos</h2><p class="small muted">${S.preguntas.filter(q => q.tipo === 'caso').length} casos de todas las materias: leé la situación del paciente y elegí la respuesta.</p></div></div><button class="btn pri" data-act="cuest-casos">Practicar casos</button></div>
      <div class="grid g3">${counts.map(([m, n]) => `<div class="card stack" style="gap:10px"><div class="row" style="flex-wrap:nowrap"><span class="mat-ico" style="background:${matColor(m)}">${esc(m.nombre[0])}</span><div><h2>${esc(m.nombre)}</h2><p class="small muted">${n} preguntas</p></div></div>
        <select id="cu-${m.id}"><option value="">Todas las unidades</option>${units(m.id).map(u => `<option value="${u.id}">${esc(u.nombre)}</option>`).join('')}${S.eventos.filter(e => e.materiaId === m.id && !e.hecho && e.tipo !== 'TP').map(e => `<option value="ev:${e.id}">Para el ${e.tipo.toLowerCase()} ${e.tipo === 'Parcial' ? '(' + e.titulo + ')' : ''}</option>`).join('')}<option value="casos">Solo casos clínicos</option><option value="viejos">Preguntas de exámenes anteriores</option></select>
        <div class="row"><button class="btn pri sm" data-act="cuest-go" data-m="${m.id}">Empezar</button><button class="btn sm" data-act="preg-new" data-m="${m.id}">${I('plus',14)}Agregar pregunta</button><button class="btn sm" data-act="cuest-gen" data-m="${m.id}">${I('spark',14)}Generar con IA</button></div>
        <p class="small muted" id="gen-${m.id}"></p></div>`).join('')}</div>
      <button class="btn" style="align-self:flex-start" data-act="cuest-go" data-m="todas">Mezclar todas las materias</button>
    </div>`;
  }
  const cq = P.cq;
  if (!cq.items.length) return `<div class="empty">Todavía no hay preguntas para esta selección. ${IA ? 'Volvé y probá “Generar con IA”.' : 'Volvé y cargalas con “Agregar pregunta”.'}<br><button class="btn sm" style="margin-top:10px" data-act="cuest-exit">Volver</button></div>`;
  if (cq.done){
    const res = cq.items.map(it => { const q = S.preguntas.find(x => x.id === it.id); return { q, ok: it.pick === 0 }; });
    const ok = res.filter(r => r.ok).length, byU = {};
    res.forEach(r => { const k = r.q.u; byU[k] = byU[k] || { ok:0, n:0 }; byU[k].n++; if (r.ok) byU[k].ok++; });
    const weak = Object.entries(byU).filter(([,v]) => v.ok < v.n).sort((a,b) => a[1].ok/a[1].n - b[1].ok/b[1].n);
    const p = pct(ok, res.length);
    return `<div class="stack" style="max-width:760px">
      <div class="card row" style="gap:18px;flex-wrap:nowrap">${ring(p, 84, p >= 70 ? 'var(--ok)' : p >= 50 ? 'var(--soon)' : 'var(--danger)')}
        <div><p class="eyebrow">Resultado</p><h2>${ok} de ${res.length} correctas</h2><p class="muted small">${p >= 80 ? 'Muy bien, estás para rendir esta parte.' : p >= 60 ? 'Vas bien, pero hay temas para reforzar.' : 'Conviene volver a estudiar estas unidades antes del examen.'}</p></div></div>
      ${weak.length ? `<div class="card"><h2 style="margin-bottom:10px">Qué reforzar</h2>${weak.map(([u, v]) => { const un = unitById(u); return `<div class="weak"><span>${esc(un ? un.nombre : u)}</span><span class="bar bad"><i style="width:${100 - pct(v.ok,v.n)}%"></i></span><span class="num small">${v.ok}/${v.n}</span></div>`; }).join('')}</div>` : ''}
      <div class="card"><h2 style="margin-bottom:10px">Revisión de errores</h2>${res.filter(r => !r.ok).length ? res.filter(r => !r.ok).map(r => `<div class="tip"><span class="n">${I('x',14)}</span><div><b>${esc(r.q.q)}</b><p class="small" style="margin-top:2px">Correcta: <b>${esc(r.q.ops[0])}</b></p><p class="small muted">${esc(r.q.exp)}</p></div></div>`).join('') : '<p class="muted">No tuviste errores.</p>'}</div>
      <div class="row"><button class="btn pri" data-act="cuest-again">Hacer otro</button><button class="btn" data-act="cuest-exit">Volver</button>
      ${weak.length ? `<button class="btn" data-act="ai-ask" data-q="${esc('Hice un cuestionario y fallé en: ' + weak.map(([u]) => (unitById(u)||{}).nombre).join(', ') + '. Explicame lo más importante de esos temas y dame 3 tips para estudiarlos.')}">${I('spark',16)}Explicame lo que fallé</button>` : ''}</div>
    </div>`;
  }
  const it = cq.items[cq.i], q = S.preguntas.find(x => x.id === it.id), un = unitById(q.u);
  return `<div class="stack" style="max-width:760px">
    <div class="row between"><span class="small muted">${esc(mat(q.materiaId).nombre)} · ${esc(un ? un.nombre : '')}</span><span class="num small">Pregunta ${cq.i + 1} de ${cq.items.length}</span></div>
    <div class="bar"><i style="width:${pct(cq.i, cq.items.length)}%"></i></div>
    <div class="prompt">${qHeader(q)}<b>${esc(q.q)}</b></div>
    <div class="stack" style="gap:8px">${it.order.map((o, k) => { const cls = it.pick === null ? '' : o === 0 ? 'right' : o === it.pick ? 'wrong' : '';
      return `<button class="opt ${cls}" data-act="cuest-pick" data-o="${o}" ${it.pick !== null ? 'disabled' : ''}><span class="k">${'ABCD'[k]}</span>${esc(q.ops[o])}</button>`; }).join('')}</div>
    ${it.pick !== null ? `<div class="fb ${it.pick === 0 ? 'ok' : 'bad'}"><h3>${it.pick === 0 ? 'Correcta' : 'Incorrecta'}</h3><p class="small">${esc(q.exp)}</p></div>
      <div class="row"><button class="btn pri" data-act="cuest-next" style="margin-left:auto">${cq.i + 1 < cq.items.length ? 'Siguiente' : 'Ver resultado'}${I('next',16)}</button></div>` : ''}
  </div>`;
}

/* ---------- vistas: progreso ---------- */
function vProgreso(){
  const H = S.historial;
  const by = t => { const x = H.filter(h => h.tipo === t); return { ok: x.filter(h => h.ok).length, n: x.length }; };
  const f = by('flash'), q = by('quiz'), c = by('cuest');
  const days = [...Array(14)].map((_, i) => { const d0 = TODAY.getTime() - (13 - i)*DAY; return H.filter(h => h.t >= d0 && h.t < d0 + DAY).length; });
  const mx = Math.max(1, ...days);
  const uStats = {};
  H.forEach(h => { if (!h.u) return; uStats[h.u] = uStats[h.u] || { ok:0, n:0, m:h.materiaId }; uStats[h.u].n++; if (h.ok) uStats[h.u].ok++; });
  const weakU = Object.entries(uStats).filter(([u, v]) => v.n >= 3 && unitById(u)).sort((a,b) => a[1].ok/a[1].n - b[1].ok/b[1].n).slice(0,5);
  const weakCards = S.cards.filter(x => x.bad > 0).sort((a,b) => (b.bad - b.ok) - (a.bad - a.ok)).slice(0,6);
  const matAcc = cursando().map(m => { const x = H.filter(h => h.materiaId === m.id); return [m, x.filter(h => h.ok).length, x.length]; }).filter(r => r[2] > 0);
  const tips = [];
  if (weakU[0]) tips.push(`Tu unidad más floja es <b>${esc(unitById(weakU[0][0]).nombre)}</b> (${pct(weakU[0][1].ok, weakU[0][1].n)}% de aciertos). Releé el apunte y hacé un cuestionario solo de esa unidad.`);
  if (weakCards.length) tips.push(`Hay ${weakCards.length} términos que fallás seguido. Repasalos en Flashcards en modo “Definición → término”: obliga a recordar en lugar de reconocer.`);
  const urgentEx = S.eventos.filter(e => !e.hecho && e.tipo !== 'TP' && daysTo(e.fecha) >= 0 && daysTo(e.fecha) <= 7)[0];
  if (urgentEx){ const sp = studyPlan(urgentEx); if (sp.pend.length) tips.push(`El ${urgentEx.tipo.toLowerCase()} de ${esc(mat(urgentEx.materiaId).nombre)} es en ${daysTo(urgentEx.fecha)} días y quedan ${sp.pend.length} temas. Seguí el plan automático: ${sp.per} ${sp.per === 1 ? 'tema' : 'temas'} por día.`); }
  tips.push('Estudiá en bloques de 25 minutos con 5 de descanso, y terminá cada sesión explicando el tema en voz alta sin mirar.');
  const summary = `Aciertos: flashcards ${pct(f.ok,f.n)}%, quiz ${pct(q.ok,q.n)}%, cuestionarios ${pct(c.ok,c.n)}%. Unidades más flojas: ${weakU.map(([u,v]) => unitById(u).nombre + ' ' + pct(v.ok,v.n) + '%').join(', ')}. Términos que más fallo: ${weakCards.map(x => x.term).join(', ')}.`;
  return `<div class="stack">
    <h1>Progreso</h1>
    <div class="grid g3">${[['Flashcards',f],['Quiz',q],['Cuestionarios',c]].map(([l, v]) => `<div class="card kpi"><span>${l}</span><b>${pct(v.ok,v.n)}%</b><span>${v.ok} correctas · ${v.n - v.ok} incorrectas</span><div class="bar ${pct(v.ok,v.n) >= 70 ? 'ok' : pct(v.ok,v.n) >= 50 ? 'warn' : 'bad'}" style="margin-top:10px"><i style="width:${pct(v.ok,v.n)}%"></i></div></div>`).join('')}</div>
    <div class="grid g2">
      <div class="card"><div class="card-h"><h2>Qué mejorar</h2><button class="btn sm" data-act="ai-ask" data-q="${esc('Analizá mi rendimiento y armame un plan de mejora concreto para esta semana. ' + summary)}">${I('spark',14)}Plan de mejora con IA</button></div>
        ${tips.map((t, i) => `<div class="tip"><span class="n">${i+1}</span><p>${t}</p></div>`).join('')}</div>
      <div class="card"><div class="card-h"><h2>Unidades más flojas</h2></div>
        ${weakU.length ? weakU.map(([u, v]) => `<div class="weak"><button class="back" style="color:var(--fg);text-align:left" data-act="start-cuest" data-m="${v.m}" data-units="${u}">${esc(unitById(u).nombre)}<span class="muted small" style="display:block;font-weight:500">${esc(mat(v.m).nombre)}</span></button><span class="bar ${pct(v.ok,v.n)>=70?'ok':pct(v.ok,v.n)>=50?'warn':'bad'}"><i style="width:${pct(v.ok,v.n)}%"></i></span><span class="num small">${pct(v.ok,v.n)}%</span></div>`).join('') : '<p class="muted">Todavía no hay suficientes respuestas.</p>'}
        <p class="small muted" style="margin-top:10px">Tocá una unidad para hacer un cuestionario solo de ella.</p></div>
    </div>
    <div class="grid g2">
      <div class="card"><div class="card-h"><h2>Términos que más fallás</h2><button class="btn sm ghost" data-act="practice" data-tab="flash" data-m="todas">Repasar</button></div>
        ${weakCards.map(x => `<div class="weak"><span><b>${esc(x.term)}</b> <span class="small muted">· ${esc(matName(x.materiaId))}</span></span><span class="small"><span class="s-ok num">${x.ok}✓</span> <span class="s-bad num">${x.bad}✗</span></span><span class="num small muted">C${x.box}</span></div>`).join('') || '<p class="small muted">Todavía no fallaste ningún término. Cuando practiques flashcards, acá vas a ver los que más te cuestan.</p>'}</div>
      <div class="card"><div class="card-h"><h2>Actividad</h2><span class="small muted">últimos 14 días</span></div>
        <div class="act">${days.map(n => `<i class="${n ? '' : 'z'}" style="height:${Math.max(3, n/mx*100)}%" title="${n} respuestas"></i>`).join('')}</div>
        <div class="row between small muted" style="margin-top:6px"><span>hace 2 semanas</span><span>hoy</span></div>
        <h3 style="margin:18px 0 8px">Aciertos por materia</h3>
        ${matAcc.map(([m, ok, n]) => `<div class="weak"><span>${esc(m.nombre)}</span><span class="bar"><i style="width:${pct(ok,n)}%;background:${matColor(m)}"></i></span><span class="num small">${pct(ok,n)}%</span></div>`).join('')}</div>
    </div>
    ${progresoExtra()}
  </div>`;
}

/* ---------- vistas: carrera ---------- */
function vCarrera(){
  const all = S.materias, by = e => all.filter(m => m.estado === e);
  const ap = by('aprobada'), reg = by('regular'), cur = by('cursando'), pen = by('pendiente');
  const notas = ap.filter(m => m.nota).map(m => m.nota), prom = notas.length ? fmtN(notas.reduce((a, b) => a + b, 0) / notas.length, 2) : '—';
  const years = [...new Set(all.map(m => m.anio))].sort((a, b) => a - b);
  const okInfo = m => (correlInfo(m) || {}).cls === 'ok';
  const puedeCursar = pen.filter(okInfo), puedeRendir = reg.filter(okInfo);
  const regs = reg.slice().sort((a, b) => (a.regularHasta || '9999').localeCompare(b.regularHasta || '9999'));
  const link = m => m.estado === 'cursando' || m.estado === 'regular' ? `data-act="go" data-view="materia" data-id="${m.id}"` : `data-act="edit-materia" data-id="${m.id}"`;
  const lista = (list, empty, extra) => list.length ? list.map(m => `<button class="cls" ${link(m)}><span class="dotc" style="background:${matColor(m)}"></span><span style="flex:1;min-width:0"><b class="small" style="display:block">${esc(m.nombre)}</b><span class="small muted">${m.anio}º año</span></span>${extra ? extra(m) : ''}</button>`).join('') : `<p class="small muted">${empty}</p>`;
  return `<div class="stack">
    <div class="row between"><div><p class="eyebrow">Medicina</p><h1>Mi carrera</h1></div>
      <div class="row"><label class="f" style="flex-direction:row;align-items:center;gap:8px">Año que cursás <select data-change="anio" style="width:auto">${[1,2,3,4,5,6].map(n => `<option ${S.perfil.anioActual===n?'selected':''} value="${n}">${n}º</option>`).join('')}</select></label>
      <button class="btn" data-act="go" data-view="horario">${I('grid',16)}Horario</button>
      <button class="btn pri" data-act="add-materia">${I('plus',16)}Agregar materia</button></div></div>
    <div class="card"><div class="row" style="gap:20px">${ring(pct(ap.length, all.length), 96, 'var(--ok)')}
      <div class="kpis" style="flex:1;min-width:240px">
        <div class="kpi"><b class="s-ok">${ap.length}</b><span>aprobadas</span></div>
        <div class="kpi"><b style="color:var(--warm)">${reg.length}</b><span>regulares</span></div>
        <div class="kpi"><b style="color:var(--accent)">${cur.length}</b><span>cursando</span></div>
        <div class="kpi"><b>${pen.length}</b><span>faltan</span></div>
        <div class="kpi"><b>${prom}</b><span>promedio</span></div>
      </div></div>
      <div class="bar ok" style="margin-top:16px;height:10px"><i style="width:${pct(ap.length, all.length)}%"></i></div>
      <p class="small muted" style="margin-top:6px">${ap.length} de ${all.length} materias aprobadas. Cargá el plan de estudios completo para ver el avance real.</p></div>
    <div class="grid g3">
      <div class="card stack" style="gap:8px"><h2>Podés cursar</h2><p class="small muted">Pendientes que ya tienen las correlativas regularizadas.</p>${lista(puedeCursar, 'Por ahora ninguna: todavía te faltan correlativas.')}</div>
      <div class="card stack" style="gap:8px"><h2>Podés rendir el final</h2><p class="small muted">Regulares con todas las correlativas aprobadas.</p>${lista(puedeRendir, 'Todavía no tenés finales habilitados.')}</div>
      <div class="card stack" style="gap:8px"><h2>Regularidades</h2><p class="small muted">Rendí el final antes de que se venzan.</p>${lista(regs, 'No tenés materias regulares.', regPill)}</div>
    </div>
    <div class="grid g2">${years.map(y => { const ms = all.filter(m => m.anio === y), a = ms.filter(m => m.estado === 'aprobada').length;
      return `<div class="card yr"><div class="row between"><h3>${y}º año ${S.perfil.anioActual === y ? '<span class="pill p-next">Actual</span>' : ''}</h3><span class="num small muted">${a}/${ms.length}</span></div>
      ${ms.map(m => { const info = correlInfo(m);
        return `<div class="subj"><div style="min-width:0;flex:1"><button class="back" style="color:var(--fg);text-align:left" ${link(m)}>${esc(m.nombre)}</button>${m.nota ? ` <span class="small muted">· nota ${m.nota}</span>` : ''}
          ${info ? `<p class="small ${info.cls === 'ok' ? 's-ok' : 'muted'}" style="margin-top:2px">${esc(info.txt)}</p>` : ''}${m.estado === 'regular' ? `<div style="margin-top:4px">${regPill(m)}</div>` : ''}</div>
        <select data-change="estado" data-id="${m.id}" aria-label="Estado de ${esc(m.nombre)}">${ESTADOS.map(([k, l]) => `<option value="${k}" ${m.estado === k ? 'selected' : ''}>${l}</option>`).join('')}</select></div>`; }).join('')}</div>`; }).join('')}</div>
    ${all.length ? '' : '<div class="empty">Cargá las materias de tu plan de estudios con “Agregar materia”: las aprobadas, las que cursás y las que te faltan.</div>'}
    <p class="note">Cargá los años y las correlatividades de tu plan de estudios desde el botón “Editar” de cada materia o tocando su nombre en esta pantalla.</p>
  </div>`;
}

/* ---------- modales ---------- */
function modal(html){ const w = $('#modal'); w.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`; w.hidden = false; const f = w.querySelector('input,select,textarea'); f && f.focus(); }
function closeModal(){ $('#modal').hidden = true; $('#modal').innerHTML = ''; }
const matOptions = sel => cursando().map(m => `<option value="${m.id}" ${sel===m.id?'selected':''}>${esc(m.nombre)}</option>`).join('');

/* ---------- búsqueda ---------- */
function search(qs){
  const q = norm(qs); if (q.length < 2) return [];
  const has = s => norm(s).includes(q), out = [];
  S.materias.forEach(m => has(m.nombre) && out.push({ tag:'Materia', t:m.nombre, s:`${m.anio}º año · ${m.estado}`, go:['materia', m.id] }));
  for (const k in S.unidades) S.unidades[k].forEach(u => { if (has(u.nombre)) out.push({ tag:'Unidad', t:u.nombre, s:mat(k).nombre, go:['materia', k] });
    u.temas.forEach(t => has(t.nombre) && out.push({ tag:'Tema', t:t.nombre, s:`${mat(k).nombre} · ${u.nombre}`, go:['materia', k] })); });
  S.biblio.forEach(b => { if (has(b.titulo) || has(b.tipo)) out.push({ tag:'Apunte', t:b.titulo, s:`${mat(b.materiaId).nombre} · ${b.tipo}`, go:['materia', b.materiaId, 'biblio'] });
    else if (b.texto && has(b.texto)){ const i = norm(b.texto).indexOf(q); out.push({ tag:'En apunte', t:b.titulo, s:'…' + b.texto.slice(Math.max(0, i - 30), i + 70) + '…', go:['materia', b.materiaId, 'biblio'] }); } });
  S.eventos.forEach(e => (has(e.titulo) || has(e.tipo + ' ' + mat(e.materiaId).nombre)) && out.push({ tag:e.tipo === 'TP' ? 'TP' : 'Examen', t:e.tipo === 'TP' ? e.titulo : `${e.tipo} de ${mat(e.materiaId).nombre}`, s:fmtLong(e.fecha), go:['evento', e.id] }));
  S.cards.forEach(c => (has(c.term) || has(c.def)) && out.push({ tag:'Término', t:c.term, s:c.def, card:c.id }));
  terminos().forEach(t => has(t.term) && out.push({ tag:'Terminología', t:t.term, s:t.def, tm:t.key }));
  ['farm','enf'].forEach(k => { const T = FI_TIPOS[k]; S.fichas[T.key].forEach(x => (has(x.nombre) || has(x[T.sub] || '')) && out.push({ tag: k === 'farm' ? 'Fármaco' : 'Enfermedad', t:x.nombre, s:x[T.sub] || '', ficha:x.id, fk:k })); });
  S.mnemos.forEach(x => (has(x.titulo) || has(x.texto)) && out.push({ tag:'Mnemotecnia', t:x.titulo, s:x.texto, mne:true }));
  return out.slice(0, 16);
}
let lastRes = [];
$('#q').addEventListener('input', e => {
  lastRes = search(e.target.value); const box = $('#qres');
  if (e.target.value.trim().length < 2){ box.hidden = true; return; }
  box.innerHTML = lastRes.length ? lastRes.map((r, i) => `<button data-act="q-pick" data-i="${i}"><span class="tag">${r.tag}</span><span style="min-width:0"><b>${esc(r.t)}</b><span class="small muted" style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r.s)}</span></span></button>`).join('')
    : `<p class="small muted" style="padding:10px">Sin resultados para “${esc(e.target.value)}”.</p>`;
  box.hidden = false;
});
$('#q').addEventListener('keydown', e => { if (e.key === 'Escape'){ e.target.value = ''; $('#qres').hidden = true; } if (e.key === 'Enter' && lastRes[0]) pickResult(0); });
function pickResult(i){
  const r = lastRes[i]; $('#qres').hidden = true; $('#q').value = '';
  if (r.ficha){ FI.tab = r.fk; FI.q = ''; go('fichas'); A['fi-open']({ id: r.ficha }); return; }
  if (r.mne){ FI.tab = 'mne'; FI.q = r.t; go('fichas'); return; }
  if (r.tm){ TM.tab = 'buscar'; TM.q = r.t; go('terminos'); return; }
  if (r.card){ const c = S.cards.find(x => x.id === r.card); modal(`<div class="row between"><p class="eyebrow">${esc(mat(c.materiaId).nombre)} · Término</p><button class="btn ghost sm" data-act="close-modal" aria-label="Cerrar">${I('x',16)}</button></div><h2>${esc(c.term)}</h2><p>${esc(c.def)}</p><div class="row"><button class="btn pri" data-act="practice" data-tab="flash" data-m="${c.materiaId}">Repasar flashcards de ${esc(mat(c.materiaId).nombre)}</button></div>`); return; }
  go(r.go[0], { id: r.go[1], tab: r.go[2] });
}

/* ---------- IA (capacidad sample) ---------- */
let sample = null, aiTurns = [], aiCtl = null;
(async () => { try { sample = window.claude && await window.claude.use('sample'); } catch (e) { sample = null; } })();
function aiContext(){
  const up = S.eventos.filter(e => !e.hecho && daysTo(e.fecha) >= 0).sort((a,b) => a.fecha.localeCompare(b.fecha)).slice(0,5)
    .map(e => `${e.tipo} de ${mat(e.materiaId).nombre} (${e.titulo}) el ${fmtLong(e.fecha)}, en ${daysTo(e.fecha)} días`).join('; ');
  const pend = cursando().map(m => `${m.nombre}: ${units(m.id).flatMap(u => u.temas.filter(t => !t.ok).map(t => t.nombre)).slice(0,8).join(', ')}`).join(' | ');
  return `Sos el asistente de estudio de una app para estudiantes de Medicina. Respondé en español rioplatense (voseo), claro y breve, con ejemplos o mnemotecnias cuando ayuden. Usá listas cortas. No uses tablas ni encabezados markdown. Si no estás seguro de un dato médico, decilo y sugerí verificarlo en la bibliografía de la cátedra. No des indicaciones médicas para pacientes reales.
Hoy es ${fmtLong(iso(TODAY))}. Materias que cursa: ${cursando().map(m => m.nombre).join(', ')}. Próximas fechas: ${up || 'ninguna'}. Temas todavía no estudiados: ${pend}.`;
}
const mdLite = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/^#+\s*/gm, '').replace(/^[-*]\s+/gm, '• ');
function aiMsg(cls, html){ const d = document.createElement('div'); d.className = 'msg ' + cls; d.innerHTML = html; $('#ai-log').append(d); $('#ai-log').scrollTop = 1e9; return d; }
function aiIntro(){
  if ($('#ai-log').children.length) return;
  aiMsg('a', 'Hola. Puedo explicarte temas, tomarte preguntas, armarte un plan para un examen o ayudarte con mnemotecnias.');
  const chips = document.createElement('div'); chips.className = 'chips';
  chips.innerHTML = ['Explicame la ley de Frank-Starling simple', 'Tomame 3 preguntas de farmacocinética', '¿Qué estudio hoy para el parcial de Fisiología?', 'Dame una mnemotecnia para el plexo braquial'].map(t => `<button class="chip" data-act="ai-ask" data-q="${esc(t)}">${esc(t)}</button>`).join('');
  $('#ai-log').append(chips);
}
function aiOpen(){ $('#ai').hidden = false; $('#fab').hidden = true; aiIntro(); setTimeout(() => $('#ai-in').focus(), 50); }
function aiClose(){ $('#ai').hidden = true; $('#fab').hidden = false; }
const aiErr = code => ({ not_granted:'No diste permiso para usar la IA en esta app.', sampling_disabled:'La IA no está disponible en esta cuenta.', rate_limited:'Se hicieron muchas consultas seguidas. Probá de nuevo en un rato.', refused:'No puedo responder eso. Probá reformular la pregunta.', session_expired:'Tu sesión expiró. Volvé a iniciar sesión en Claude.' }[code] || 'No se pudo conectar con la IA. Probá de nuevo.');
async function aiSend(text, extra){
  text = text.trim(); if (!text) return;
  aiOpen(); $('#ai-in').value = '';
  aiMsg('u', esc(text));
  if (!sample){ aiMsg('sys', 'El asistente funciona cuando abrís la app desde Claude. En la versión final lo conectamos a la API.'); return; }
  aiTurns.push({ role:'user', content: extra ? text + '\n\n' + extra : text });
  const bubble = aiMsg('a', 'Pensando…');
  aiCtl = new AbortController();
  const send = $('#ai-send'); send.innerHTML = I('x',16); send.setAttribute('aria-label','Detener'); send.type = 'button'; send.onclick = () => aiCtl.abort();
  try {
    const { text: out } = await sample([{ role:'user', content: aiContext() }, ...aiTurns.slice(-10)], { cache:false, signal: aiCtl.signal, onText: ({ text }) => { bubble.innerHTML = mdLite(text); $('#ai-log').scrollTop = 1e9; } });
    aiTurns.push({ role:'assistant', content: out });
  } catch (e) {
    if (e.text) { bubble.innerHTML = mdLite(e.text); aiTurns.push({ role:'assistant', content:e.text }); } else bubble.remove();
    if (e.code !== 'cancelled') aiMsg('sys', aiErr(e.code));
  } finally { send.innerHTML = I('send',16); send.setAttribute('aria-label','Enviar'); send.type = 'submit'; send.onclick = null; }
}
$('#ai-form').addEventListener('submit', e => { e.preventDefault(); aiSend($('#ai-in').value); });

/* ---------- edición de materias ---------- */
let DEL = null;
const closeX = () => `<button class="btn ghost sm" type="button" data-act="close-modal" aria-label="Cerrar">${I('x',16)}</button>`;
function unitsToolbar(m){
  return `<div class="row between" style="margin-bottom:12px"><span class="small muted">${R.edit ? 'Editando: los cambios se guardan solos' : 'Tildá lo que ya estudiaste'}</span>
    <div class="row"><button class="btn sm" data-act="import-prog" data-m="${m.id}">${I('list',15)}Importar programa</button>
    <button class="btn sm ${R.edit ? 'pri' : ''}" data-act="mat-edit">${R.edit ? I('check',15) + 'Listo' : I('edit',15) + 'Editar unidades y temas'}</button></div></div>`;
}
function unitsEditor(m){
  const us = units(m.id);
  return `<div class="stack" style="gap:10px">${us.map((u, i) => `<div class="ed-unit">
    <div class="ed-row"><span class="num muted small" style="width:28px;flex:none">U${i+1}</span>
      <input type="text" id="eu-${u.id}" value="${esc(u.nombre)}" data-change="ed-unit" data-m="${m.id}" data-u="${u.id}" aria-label="Nombre de la unidad">
      <button class="icon-btn" data-act="ed-move" data-m="${m.id}" data-u="${u.id}" data-d="-1" ${i === 0 ? 'disabled' : ''} aria-label="Subir unidad">${I('up',16)}</button>
      <button class="icon-btn" data-act="ed-move" data-m="${m.id}" data-u="${u.id}" data-d="1" ${i === us.length - 1 ? 'disabled' : ''} aria-label="Bajar unidad">${I('down',16)}</button>
      <button class="icon-btn danger ${DEL === u.id ? 'confirm' : ''}" data-act="ed-del-unit" data-m="${m.id}" data-u="${u.id}" aria-label="Eliminar unidad">${DEL === u.id ? '¿Eliminar unidad?' : I('trash',16)}</button></div>
    ${u.temas.map(t => `<div class="ed-row" style="padding-left:34px"><input type="text" id="et-${t.id}" value="${esc(t.nombre)}" data-change="ed-topic" data-m="${m.id}" data-u="${u.id}" data-t="${t.id}" aria-label="Tema"><button class="icon-btn danger" data-act="ed-del-topic" data-m="${m.id}" data-u="${u.id}" data-t="${t.id}" aria-label="Eliminar tema">${I('x',16)}</button></div>`).join('')}
    <form class="ed-row" style="padding-left:34px" data-form="ed-add-topic" data-m="${m.id}" data-u="${u.id}"><input type="text" id="en-${u.id}" placeholder="Agregar tema…" aria-label="Nuevo tema"><button class="icon-btn" type="submit" aria-label="Agregar tema">${I('plus',16)}</button></form>
  </div>`).join('')}
  <button class="btn" style="align-self:flex-start" data-act="add-unidad" data-m="${m.id}">${I('plus',16)}Agregar unidad</button></div>`;
}
function parseProgram(txt){
  const out = [], UN = /^(unidad|m[oó]dulo|bloque|eje|cap[ií]tulo)\b/i;
  txt.split('\n').map(s => s.trim()).filter(Boolean).forEach(l => {
    if (UN.test(l) || /:$/.test(l)){
      const name = l.replace(/^(unidad|m[oó]dulo|bloque|eje|cap[ií]tulo)\s*[\dIVXLC]*\s*[:.\-–]?\s*/i, '').replace(/:$/, '').trim();
      out.push({ id: uid(), nombre: name || l.replace(/:$/, ''), temas: [] });
    } else {
      const clean = l.replace(/^[-–•*·▪]+\s*/, '').replace(/^\d+(\.\d+)*[.)]?\s+/, '').trim();
      if (!out.length) out.push({ id: uid(), nombre: 'Unidad 1', temas: [] });
      if (clean) out[out.length - 1].temas.push({ id: uid(), nombre: clean, ok: false });
    }
  });
  return out;
}

/* ---------- apuntes: lectura de PDF y texto ---------- */
function docItem(d){
  return `<div class="doc" style="align-items:flex-start"><span class="doc-ico">${I('file',18)}</span><div style="flex:1;min-width:0"><b>${esc(d.titulo)}</b><p class="small muted">${esc(d.tipo)} · ${esc(d.detalle)}</p>
    ${d.leyendo ? '<p class="small" style="color:var(--accent)">Leyendo el archivo…</p>' : ''}${d.aviso ? `<p class="small muted">${esc(d.aviso)}</p>` : ''}
    ${d.texto ? `<div class="doc-actions"><span class="pill p-ok">${I('check',12)}${IA ? 'Leído' : 'Se puede buscar dentro'}</span>
      <button class="btn sm" data-act="doc-q" data-id="${d.id}">${I('quiz',14)}Generar preguntas</button>
      <button class="btn sm" data-act="doc-cards" data-id="${d.id}">${I('cards',14)}Crear flashcards</button>
      <button class="btn sm" data-act="doc-sum" data-id="${d.id}">${I('spark',14)}Resumir</button></div><p class="small muted" id="ds-${d.id}" style="margin-top:4px"></p>` : ''}
  </div><button class="icon-btn danger" data-act="doc-del" data-id="${d.id}" aria-label="Eliminar apunte">${I('trash',16)}</button></div>`;
}
let pdfReady = null;
const loadScript = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.append(s); });
function loadPdf(){
  if (!pdfReady){ const base = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
    pdfReady = loadScript(base + 'pdf.min.js').then(() => loadScript(base + 'pdf.worker.min.js')).then(() => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = base + 'pdf.worker.min.js'; return window.pdfjsLib; });
    pdfReady.catch(() => { pdfReady = null; }); }
  return pdfReady;
}
async function pdfText(file){
  const lib = await loadPdf();
  const doc = await lib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  let out = '';
  for (let i = 1; i <= Math.min(doc.numPages, 60) && out.length < 40000; i++){ const c = await (await doc.getPage(i)).getTextContent(); out += c.items.map(x => x.str).join(' ') + '\n'; }
  return { text: out.replace(/[ \t]+/g, ' ').trim().slice(0, 40000), pages: doc.numPages };
}
async function handleUpload(input){
  const m = input.dataset.m, files = [...input.files];
  for (const f of files){
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    const d = { id: uid(), materiaId: m, titulo: f.name.replace(/\.[^.]+$/, ''), tipo:'Mis apuntes', detalle: `${ext.toUpperCase()} · ${Math.max(1, Math.round(f.size/1024))} KB · subido hoy` };
    S.biblio.unshift(d);
    if (['pdf','txt','md'].includes(ext)){
      d.leyendo = true; render();
      try {
        if (ext === 'pdf'){ const r = await pdfText(f); d.texto = r.text; d.detalle = `PDF · ${r.pages} págs. · subido hoy`; }
        else d.texto = (await f.text()).slice(0, 40000);
        if (!d.texto || d.texto.length < 40){ delete d.texto; d.aviso = 'No encontré texto para leer. Si es un PDF escaneado (fotos), en la versión final lo leemos con reconocimiento de imagen.'; }
      } catch (e) { d.aviso = 'No se pudo leer el archivo.'; }
      delete d.leyendo;
    } else d.aviso = 'Por ahora la IA lee PDF y archivos de texto. Este archivo queda guardado como referencia.';
  }
  save(); render();
}
async function genQuestions(m, us, opts = {}){
  const tipoTxt = opts.casos ? 'casos clínicos breves (una viñeta de 2 a 4 oraciones con edad, motivo de consulta y hallazgos, seguida de una pregunta)' : 'preguntas';
  const fuente = opts.texto ? `\nBasate SOLO en este apunte del estudiante:\n"""${opts.texto.slice(0, 30000)}"""\n` : '';
  const arr = await sample.json(`Generá ${opts.n || 5} ${tipoTxt} de opción múltiple de nivel universitario de ${m.nombre} (carrera de Medicina).${fuente}
Unidades de la materia (usá el id para indicar a cuál corresponde cada pregunta):
${us.map(u => `- [${u.id}] ${u.nombre}: ${u.temas.map(t => t.nombre).join(', ')}`).join('\n') || '- (sin unidades cargadas)'}
Cada pregunta con 4 opciones; la PRIMERA opción siempre es la correcta (la app las mezcla). Datos precisos y verificables. Respondé solo un JSON array así: [{"u":"id de la unidad","q":"pregunta","ops":["correcta","incorrecta","incorrecta","incorrecta"],"exp":"explicación breve de por qué es correcta"}]`);
  const ok = (Array.isArray(arr) ? arr : []).filter(x => x && x.q && Array.isArray(x.ops) && x.ops.length === 4);
  ok.forEach(x => S.preguntas.push({ id: uid(), materiaId: m.id, u: us.some(u => u.id === x.u) ? x.u : (us[0] || {}).id, q: String(x.q), ops: x.ops.map(String), a: 0, exp: String(x.exp || ''), ia: true, tipo: opts.casos ? 'caso' : undefined, fuente: opts.fuente }));
  save(); return ok.length;
}

/* ---------- flashcards con imagen ---------- */
let NC = { img:null, boxes:[] };
const occView = (c, reveal) => `<div class="occ ${reveal ? 'reveal' : ''}"><img src="${c.img}" alt="${esc(c.term)}" draggable="false">${(c.boxes || []).map(b => `<i class="box" style="left:${b.x}%;top:${b.y}%;width:${b.w}%;height:${b.h}%"></i>`).join('')}</div>`;
function compressImg(file){
  return new Promise((res, rej) => { const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => { const s = Math.min(1, 900 / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width*s); c.height = Math.round(im.height*s);
      const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', 0.82)); };
    im.onerror = rej; im.src = url; });
}
function occEditor(){
  const host = $('#nc-occ'); if (!host) return;
  if (!NC.img){ host.innerHTML = ''; return; }
  host.innerHTML = `<p class="small muted" style="margin-bottom:6px">Arrastrá sobre la imagen para tapar lo que hay que adivinar. Tocá un recuadro para quitarlo.</p>
    <div class="occ edit" id="occ-ed"><img src="${NC.img}" alt="" draggable="false">${NC.boxes.map((b, i) => `<i class="box" data-i="${i}" style="left:${b.x}%;top:${b.y}%;width:${b.w}%;height:${b.h}%"></i>`).join('')}</div>
    <div class="row between small muted" style="margin-top:6px"><span>${NC.boxes.length} ${NC.boxes.length === 1 ? 'zona tapada' : 'zonas tapadas'}</span><button class="btn sm ghost" type="button" data-act="nc-img-del">Quitar imagen</button></div>`;
  const ed = $('#occ-ed'); let st = null, el = null;
  const pt = e => { const r = ed.getBoundingClientRect(); return { x: Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)), y: Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100)) }; };
  ed.onpointerdown = e => { e.preventDefault(); if (e.target.classList.contains('box')){ NC.boxes.splice(+e.target.dataset.i, 1); occEditor(); return; }
    st = pt(e); el = document.createElement('i'); el.className = 'box'; ed.append(el); ed.setPointerCapture(e.pointerId); };
  ed.onpointermove = e => { if (!st) return; const p = pt(e); Object.assign(el.style, { left: Math.min(st.x, p.x) + '%', top: Math.min(st.y, p.y) + '%', width: Math.abs(p.x - st.x) + '%', height: Math.abs(p.y - st.y) + '%' }); };
  ed.onpointerup = e => { if (!st) return; const p = pt(e), b = { x: Math.min(st.x, p.x), y: Math.min(st.y, p.y), w: Math.abs(p.x - st.x), h: Math.abs(p.y - st.y) }; st = null; if (b.w > 2 && b.h > 1.5) NC.boxes.push(b); occEditor(); };
}

/* ---------- avisos ---------- */
function notifs(){
  const out = [], D = (S.notif && S.notif.dias) || 5;
  S.eventos.filter(e => !e.hecho && daysTo(e.fecha) >= 0 && daysTo(e.fecha) <= D).sort((a,b) => a.fecha.localeCompare(b.fecha)).forEach(e => {
    const d = daysTo(e.fecha), cuando = d === 0 ? 'hoy' : d === 1 ? 'mañana' : `en ${d} días`, pend = studyPlan(e).pend.length;
    out.push({ cls: d <= 2 ? 'urgent' : '', ico:'cal', t: `${e.tipo === 'TP' ? 'Entrega de TP' : e.tipo} de ${esc(mat(e.materiaId).nombre)} ${cuando}`,
      s: e.tipo === 'TP' ? esc(e.titulo) : pend ? `Quedan ${pend} temas por estudiar` : 'Tenés todos los temas tildados', act: `data-act="go" data-view="evento" data-id="${e.id}"` });
  });
  const nb = S.cards.filter(c => c.box === 1).length;
  if (nb) out.push({ cls:'', ico:'cards', t:`${nb} ${nb === 1 ? 'flashcard' : 'flashcards'} para repasar`, s:'Están en la caja 1: conviene verlas hoy', act:'data-act="practice" data-tab="flash" data-m="todas"' });
  if (S.racha.ultimo !== iso(TODAY)) out.push({ cls:'warm', ico:'flame', t:`Mantené tu racha de ${S.racha.dias} días`, s:'Todavía no estudiaste hoy', act:'data-act="p-open" data-tab="hoy"' });
  S.materias.filter(m => m.estado === 'regular' && m.regularHasta && daysTo(m.regularHasta) <= 60).forEach(m => { const d = daysTo(m.regularHasta);
    out.push({ cls: d <= 30 ? 'urgent' : 'warm', ico:'cap', t: d < 0 ? `Se venció la regularidad de ${esc(m.nombre)}` : `La regularidad de ${esc(m.nombre)} vence en ${d} días`, s: d < 0 ? 'Consultá en la facultad cómo recuperarla' : 'Anotate a una mesa de final antes de que venza', act:'data-act="go" data-view="carrera"' }); });
  cursando().filter(m => m.asist).forEach(m => asistBuckets(m).filter(b => b.estado === 'bajo' || (b.estado === 'limite' && b.puede === 0)).forEach(b => {
    out.push({ cls: b.estado === 'bajo' ? 'urgent' : 'warm', ico:'check', t: `Asistencia de ${esc(m.nombre)}${b.k === '__todas' ? '' : ' (' + esc(b.nombre) + ')'} ${b.estado === 'bajo' ? 'por debajo del mínimo' : 'en el límite'}`,
      s: `${Math.round(b.p * 100)} % · mínimo ${Math.round(b.min * 100)} %`, act: `data-act="mat-open" data-id="${m.id}" data-tab="asist"` }); }));
  const ne = validErrores().length;
  if (ne >= 5) out.push({ cls:'', ico:'redo', t:`${ne} errores para reintentar`, s:'Están en tu cuaderno de errores', act:'data-act="p-open" data-tab="errores"' });
  return out;
}
function renderBell(){ const n = notifs().length; $('#bell').innerHTML = I('bell', 18) + (n ? `<span class="badge">${n}</span>` : ''); $('#bell').setAttribute('aria-label', `Avisos (${n})`); }
function renderNotif(){
  const ns = notifs();
  $('#notif').innerHTML = `<div class="row between" style="padding:6px 8px 10px"><h3>Avisos</h3><label class="small muted row" style="gap:6px">Avisarme <select id="nd" data-change="notif-dias" style="width:auto;padding:4px 8px">${[1,3,5,7,14].map(n => `<option value="${n}" ${S.notif.dias === n ? 'selected' : ''}>${n} ${n === 1 ? 'día' : 'días'}</option>`).join('')}</select> antes</label></div>
    ${ns.length ? ns.map(n => `<button class="n-item" ${n.act}><span class="n-ico ${n.cls}">${I(n.ico,16)}</span><span style="min-width:0"><b class="small" style="display:block">${n.t}</b><span class="small muted">${n.s}</span></span></button>`).join('') : '<p class="small muted" style="padding:10px">No tenés avisos pendientes.</p>'}
    <p class="note" style="margin-top:6px">En la app instalada en el celular estos avisos llegan como notificaciones, aunque la app esté cerrada.</p>`;
}

/* ---------- v3: utilidades ---------- */
const fmtN = (n, d = 1) => Number(n).toLocaleString('es-AR', { maximumFractionDigits: d });
const fmtMin = m => { m = Math.round(m); return m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ' ' + (m % 60) + ' min' : ''}` : `${m} min`; };
const fmtDate = t => { const d = new Date(t); return `${d.getDate()} de ${MES[d.getMonth()]}`; };
const fmtShort = s => { const d = pISO(s); return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; };
const fmtAgo = t => { const n = Math.round((TODAY - sod(t)) / DAY); return n <= 0 ? 'hoy' : n === 1 ? 'ayer' : `hace ${n} días`; };
const fmtClock = ms => { const s = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0'); };
const matName = id => (mat(id) || {}).nombre || (id === 'todas' ? 'Todas las materias' : 'General');
const activeIds = () => new Set(cursando().map(m => m.id));
const topicById = tId => { for (const k in S.unidades) for (const u of S.unidades[k]) { const t = u.temas.find(x => x.id === tId); if (t) return { t, u, m: k }; } return null; };
const proxExamen = () => S.eventos.filter(e => !e.hecho && e.tipo !== 'TP' && daysTo(e.fecha) >= 0 && mat(e.materiaId)).sort((a, b) => a.fecha.localeCompare(b.fecha))[0];
const arr6 = x => Array.isArray(x) ? x.filter(Boolean).map(String).slice(0, 6) : [];
const aiFail = e => e.code === 'invalid_json' ? 'La respuesta no vino en el formato esperado. Probá de nuevo.' : aiErr(e.code);
function toast(msg){ const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.h); toast.h = setTimeout(() => { t.hidden = true; }, 5000); }
function qHeader(q){
  if (!(q.tipo === 'caso' || q.ia || q.origen)) return '';
  return `<div class="row" style="gap:6px;margin-bottom:10px">${q.tipo === 'caso' ? `<span class="pill p-warm">${I('case',12)}Caso clínico</span>` : ''}${q.origen ? `<span class="pill p-next">${I('archive',12)}Salió en un examen anterior</span>` : ''}${q.ia ? `<span class="pill p-past">${I('spark',12)}${q.fuente ? 'De tu apunte: ' + esc(q.fuente) : 'Generada con IA'}</span>` : ''}</div>`;
}

/* ---------- cuaderno de errores ---------- */
const errFind = (kind, ref) => S.errores.find(x => x.kind === kind && x.ref === ref);
const errItem = e => e.kind === 'card' ? S.cards.find(c => c.id === e.ref) : S.preguntas.find(q => q.id === e.ref);
function validErrores(){ S.errores = S.errores.filter(e => errItem(e)); return S.errores; }
// Fallar agrega (o reinicia) el ítem; acertar suma a la racha y a los 2 aciertos seguidos sale del cuaderno
function errTrack(kind, ref, materiaId, ok){
  const e = errFind(kind, ref);
  if (ok){ if (e){ e.streak++; if (e.streak >= 2){ S.errores = S.errores.filter(x => x !== e); S.erroresResueltos++; } } return null; }
  if (e){ const prev = e.streak; e.streak = 0; return { created:false, prev }; }
  S.errores.push({ id: uid(), kind, ref, materiaId, streak:0, t: Date.now() }); return { created:true, prev:0 };
}
function errOverride(kind, ref, info){ // cuando una respuesta marcada como mal se corrige a bien
  if (!info) return; const e = errFind(kind, ref); if (!e) return;
  if (info.created) S.errores = S.errores.filter(x => x !== e); else { e.streak = info.prev; errTrack(kind, ref, e.materiaId, true); }
}
function vErrores(){
  if (HS && HS.src === 'errores') return vSession();
  const list = validErrores().filter(e => P.m === 'todas' || e.materiaId === P.m).sort((a, b) => b.t - a.t);
  return `<div class="stack">
    <div class="card row between" style="gap:14px"><div style="min-width:0;flex:1 1 260px"><h2>Cuaderno de errores</h2><p class="small muted">Cada pregunta o tarjeta que fallás queda acá y vuelve a aparecer en tu repaso. Sale cuando la acertás 2 veces seguidas.</p></div>
      <div class="row" style="gap:20px"><div class="kpi"><b>${list.length}</b><span>pendientes</span></div><div class="kpi"><b class="s-ok">${S.erroresResueltos}</b><span>resueltos</span></div></div></div>
    ${list.length ? `<button class="btn pri" style="align-self:flex-start" data-act="hs-start" data-src="errores">${I('redo',16)}Reintentar ${Math.min(15, list.length)} ${Math.min(15, list.length) === 1 ? 'error' : 'errores'}</button>
    <div class="stack" style="gap:8px">${list.map(e => { const it = errItem(e), txt = e.kind === 'card' ? it.term : it.q;
      return `<div class="doc"><span class="doc-ico">${I(e.kind === 'card' ? 'cards' : 'quiz', 18)}</span><div style="flex:1;min-width:0"><b class="clamp">${esc(txt)}</b><p class="small muted">${e.kind === 'card' ? 'Flashcard' : 'Pregunta'} · ${esc(matName(e.materiaId))} · fallada ${fmtAgo(e.t)}</p></div>
        <span class="sd" title="${e.streak} de 2 aciertos seguidos" aria-label="${e.streak} de 2 aciertos seguidos"><i class="${e.streak >= 1 ? 'on' : ''}"></i><i></i></span>
        <button class="icon-btn" data-act="err-del" data-id="${e.id}" aria-label="Quitar del cuaderno">${I('x',16)}</button></div>`; }).join('')}</div>`
    : `<div class="empty">No tenés errores pendientes${P.m !== 'todas' ? ' en esta materia' : ''}. Cada vez que falles una pregunta o una tarjeta va a aparecer acá.</div>`}
  </div>`;
}

/* ---------- sesiones: Estudiar hoy y reintentar errores ---------- */
let HS = null;
const mkItem = (kind, ref) => kind === 'preg' ? { kind, ref, order: shuffle([0, 1, 2, 3]), pick: null } : { kind, ref, flipped: false };
function buildHoy(){
  const act = activeIds(), items = [], seen = new Set(), counts = { err:0, card:0, ex:0, extra:0, cards:0 };
  const push = (kind, ref, tag) => { if (seen.has(kind + ref)) return; seen.add(kind + ref); const it = mkItem(kind, ref); if (tag === 'err') it.err = true; items.push(it); counts[tag]++; if (kind === 'card') counts.cards++; };
  shuffle(validErrores().filter(e => act.has(e.materiaId))).slice(0, 4).forEach(e => push(e.kind, e.ref, 'err'));
  shuffle(S.cards.filter(c => act.has(c.materiaId))).sort((a, b) => a.box - b.box).slice(0, 5).forEach(c => push('card', c.id, 'card'));
  const ex = proxExamen(), exPool = ex ? S.preguntas.filter(q => q.materiaId === ex.materiaId && ex.unidades.includes(q.u)) : [];
  shuffle(exPool).slice(0, 3).forEach(q => push('preg', q.id, 'ex'));
  shuffle(S.preguntas.filter(q => act.has(q.materiaId))).forEach(q => { if (items.length < 12) push('preg', q.id, 'extra'); });
  return { items: shuffle(items), counts, ex: counts.ex ? ex : null };
}
function startSession(src, m){
  const items = src === 'hoy' ? buildHoy().items
    : shuffle(validErrores().filter(e => !m || m === 'todas' || e.materiaId === m)).slice(0, 15).map(e => Object.assign(mkItem(e.kind, e.ref), { err: true }));
  HS = { src, items, i: 0, ok: 0, bad: 0, done: !items.length };
}
function finishSession(){ HS.done = true; if (HS.src === 'hoy' && HS.ok + HS.bad > 0){ S.hoy = { fecha: iso(TODAY), ok: HS.ok, n: HS.ok + HS.bad }; save(); } }
function hsAdvance(){ HS.i++; if (HS.i >= HS.items.length) finishSession(); render(); }
function vSession(){
  const s = HS;
  const exists = it => it.kind === 'card' ? S.cards.some(c => c.id === it.ref) : S.preguntas.some(q => q.id === it.ref);
  while (!s.done && s.i < s.items.length && !exists(s.items[s.i])) s.i++;
  if (!s.done && s.i >= s.items.length) finishSession();
  if (s.done){
    const n = s.ok + s.bad, p = pct(s.ok, n);
    const again = s.src === 'hoy' ? `<button class="btn" data-act="hs-start" data-src="hoy">${I('redo',16)}Otra ronda</button>`
      : validErrores().length ? `<button class="btn" data-act="hs-start" data-src="errores">${I('redo',16)}Otra ronda</button>` : '';
    return `<div class="card stack" style="align-items:center;text-align:center;padding:32px;gap:14px;max-width:620px;margin-inline:auto;width:100%">${n ? ring(p, 84, p >= 70 ? 'var(--ok)' : p >= 50 ? 'var(--soon)' : 'var(--danger)') : ''}
      <h2>${!n ? 'No había ejercicios para esta ronda' : s.src === 'hoy' ? '¡Listo el repaso de hoy!' : 'Terminaste la ronda de errores'}</h2>
      ${n ? `<p class="muted">${s.ok} correctas y ${s.bad} incorrectas. ${s.bad ? 'Lo que fallaste quedó en tu cuaderno de errores para reintentarlo.' : 'No fallaste ninguna.'}${s.src === 'errores' && S.erroresResueltos ? ` Llevás ${S.erroresResueltos} errores resueltos.` : ''}</p>` : ''}
      <div class="row" style="justify-content:center"><button class="btn pri" data-act="hs-exit">Volver</button>${again}</div></div>`;
  }
  const it = s.items[s.i], tag = it.err ? `<span class="pill p-urgent">${I('redo',12)}De tu cuaderno de errores</span>` : '';
  const head = `<div class="row between"><span class="small muted">${s.src === 'hoy' ? 'Estudiar hoy' : 'Cuaderno de errores'} · ${s.i + 1} de ${s.items.length}</span><div class="row" style="gap:6px"><span class="pill p-ok">${s.ok} bien</span><span class="pill p-urgent">${s.bad} mal</span><button class="btn sm ghost" data-act="hs-exit">Salir</button></div></div><div class="bar"><i style="width:${pct(s.i, s.items.length)}%"></i></div>`;
  let body;
  if (it.kind === 'card'){
    const c = S.cards.find(x => x.id === it.ref), mn = esc(matName(c.materiaId));
    let front = `<div class="big">${esc(c.term)}</div>`, back = `<div class="def">${esc(c.def)}</div>`;
    if (c.img){ front = `<b>${esc(c.term)}</b>${occView(c, false)}<span class="small muted">Nombrá las partes tapadas</span>`; back = `${occView(c, true)}${c.def ? `<div class="small" style="max-width:52ch">${esc(c.def)}</div>` : ''}`; }
    body = `${tag ? `<div>${tag}</div>` : ''}<div class="flip ${c.img ? 'tall' : ''} ${it.flipped ? 'on' : ''}" id="hflip"><div class="flip-in" data-act="hs-flip" role="button" tabindex="0" aria-label="Dar vuelta la tarjeta">
        <div class="face"><div class="corner"><span>${mn} · Flashcard</span></div>${front}<span class="small muted row" style="gap:6px">${I('flip',14)}Tocá para dar vuelta</span></div>
        <div class="face back"><div class="corner"><span>${mn}</span></div>${back}</div></div></div>
      <div class="row" style="justify-content:center">${it.flipped ? `<button class="btn" style="min-width:150px;color:var(--danger)" data-act="hs-card" data-ok="0">${I('x',16)}No la sabía</button><button class="btn pri" style="min-width:150px" data-act="hs-card" data-ok="1">${I('check',16)}La sabía</button>` : `<button class="btn pri" style="min-width:200px" data-act="hs-flip">${I('flip',16)}Ver respuesta</button>`}</div>`;
  } else {
    const q = S.preguntas.find(x => x.id === it.ref), un = unitById(q.u);
    body = `<div class="prompt">${tag ? `<div style="margin-bottom:8px">${tag}</div>` : ''}${qHeader(q)}<p class="small muted" style="margin-bottom:6px">${esc(matName(q.materiaId))}${un ? ' · ' + esc(un.nombre) : ''}</p><b>${esc(q.q)}</b></div>
      <div class="stack" style="gap:8px">${it.order.map((o, k) => { const cls = it.pick === null ? '' : o === 0 ? 'right' : o === it.pick ? 'wrong' : ''; return `<button class="opt ${cls}" data-act="hs-pick" data-o="${o}" ${it.pick !== null ? 'disabled' : ''}><span class="k">${'ABCD'[k]}</span>${esc(q.ops[o])}</button>`; }).join('')}</div>
      ${it.pick !== null ? `<div class="fb ${it.pick === 0 ? 'ok' : 'bad'}"><h3>${it.pick === 0 ? 'Correcta' : 'Incorrecta'}</h3><p class="small">${esc(q.exp)}</p></div><div class="row"><button class="btn pri" data-act="hs-next" style="margin-left:auto">${s.i + 1 < s.items.length ? 'Siguiente' : 'Terminar'}${I('next',16)}</button></div>` : ''}`;
  }
  return `<div class="stack" style="max-width:760px;width:100%;margin-inline:auto">${head}${body}</div>`;
}
function vHoy(){
  if (HS && HS.src === 'hoy') return vSession();
  const b = buildHoy(), c = b.counts, n = b.items.length, done = S.hoy && S.hoy.fecha === iso(TODAY);
  const mins = Math.max(3, Math.round(c.cards * 0.5 + (n - c.cards)));
  const exUnits = b.ex ? units(b.ex.materiaId).filter(u => b.ex.unidades.includes(u.id)).map(u => u.nombre).join(' y ') : '';
  const rows = [
    [c.err, 'Errores para reintentar', 'De tu cuaderno de errores: cada uno sale cuando lo acertás 2 veces seguidas.'],
    [c.card, 'Flashcards para repasar', 'Las de las cajas más bajas, que son las que más te cuestan.'],
    [c.ex, b.ex ? `Preguntas del ${b.ex.tipo.toLowerCase()} de ${matName(b.ex.materiaId)}` : '', b.ex ? `Es en ${daysTo(b.ex.fecha)} ${daysTo(b.ex.fecha) === 1 ? 'día' : 'días'}${exUnits ? ': entran ' + exUnits : ''}.` : ''],
    [c.extra, 'Preguntas de repaso', 'De tus materias, para no olvidar lo que ya estudiaste.']
  ].filter(r => r[0]);
  return `<div class="grid g-home">
    <div class="card stack" style="gap:14px"><div class="row between" style="align-items:flex-start"><div style="min-width:0;flex:1"><h2>Estudiar hoy</h2><p class="small muted">Una sesión corta que arma la app con lo que más te conviene repasar hoy.</p></div>${done ? `<span class="pill p-ok">${I('check',12)}Hecho hoy</span>` : ''}</div>
      ${n ? `<div>${rows.map(([k, t, s]) => `<div class="tip"><span class="n" style="background:var(--accent-soft);color:var(--accent)">${k}</span><div><b>${esc(t)}</b><p class="small muted">${esc(s)}</p></div></div>`).join('')}</div>
      <div class="row"><button class="btn pri" data-act="hs-start" data-src="hoy">${I('play',16)}${done ? 'Hacer otra ronda' : 'Empezar'} · ${n} ${n === 1 ? 'ejercicio' : 'ejercicios'} · ≈ ${mins} min</button></div>` : '<div class="empty">Todavía no hay flashcards ni preguntas para armar el repaso.</div>'}
    </div>
    <div class="card stack" style="gap:10px"><h2>Cómo funciona</h2>
      <p class="small">Mezcla flashcards y preguntas para que practiques recordar y no solo releer: es lo que más ayuda a fijar lo estudiado.</p>
      <p class="small">Lo que fallás va al cuaderno de errores y vuelve a aparecer en los próximos días hasta que lo sepas.</p>
      <p class="small">Hacerlo todos los días suma a tu racha: llevás <b>${S.racha.dias} ${S.racha.dias === 1 ? 'día' : 'días'}</b> seguidos.</p>
      ${done ? `<p class="small s-ok">Hoy hiciste ${S.hoy.ok} de ${S.hoy.n} bien.</p>` : ''}</div>
  </div>`;
}
function hoyCard(){
  const done = S.hoy && S.hoy.fecha === iso(TODAY), b = buildHoy(), c = b.counts, n = b.items.length;
  const mins = Math.max(3, Math.round(c.cards * 0.5 + (n - c.cards)));
  const chips = [c.err && `${c.err} ${c.err === 1 ? 'error' : 'errores'} para reintentar`, c.card && `${c.card} ${c.card === 1 ? 'flashcard' : 'flashcards'}`, c.ex && b.ex && `${c.ex} del ${b.ex.tipo.toLowerCase()} de ${matName(b.ex.materiaId)}`, c.extra && `${c.extra} de repaso`].filter(Boolean);
  return `<div class="card stack" style="gap:12px"><div class="row between"><h2>Estudiar hoy</h2>${done ? `<span class="pill p-ok">${I('check',12)}Hecho</span>` : n ? `<span class="pill p-warm">${I('flame',12)}≈ ${mins} min</span>` : ''}</div>
    ${done ? `<p class="small muted">Ya hiciste tu repaso de hoy: ${S.hoy.ok} de ${S.hoy.n} bien. Si querés, podés hacer otra ronda.</p>`
      : n ? `<p class="small muted">Una sesión corta con lo que más te conviene repasar hoy:</p><div class="chips">${chips.map(x => `<span class="chip" style="cursor:default">${esc(x)}</span>`).join('')}</div>`
      : '<p class="small muted">Todavía no hay material para armar el repaso. Agregá flashcards o preguntas.</p>'}
    ${n ? `<button class="btn ${done ? '' : 'pri'}" style="align-self:flex-start" data-act="hs-start" data-src="hoy">${I(done ? 'redo' : 'play',16)}${done ? 'Otra ronda' : `Empezar · ${n} ${n === 1 ? 'ejercicio' : 'ejercicios'}`}</button>` : ''}</div>`;
}

/* ---------- simulacro de examen ---------- */
let SIM = null, simTick = null;
P.simCfg = { m:'todas', scope:'', n:20, min:30, casos:true };
const notaDe = p => p < 60 ? Math.max(1, Math.round(p / 60 * 40) / 10) : Math.round((4 + (p - 60) / 40 * 6) * 10) / 10; // 60 % = 4
function simPool(c){
  let pool = S.preguntas.filter(q => c.m === 'todas' ? activeIds().has(q.materiaId) : q.materiaId === c.m);
  if (c.scope.startsWith('ev:')){ const e = S.eventos.find(x => x.id === c.scope.slice(3)); if (e) pool = pool.filter(q => e.unidades.includes(q.u)); }
  else if (c.scope === 'viejos') pool = pool.filter(q => q.origen);
  else if (c.scope) pool = pool.filter(q => q.u === c.scope);
  if (!c.casos) pool = pool.filter(q => q.tipo !== 'caso');
  return pool;
}
function startSim(cfg, ids){
  const items = (ids ? shuffle(ids.filter(id => S.preguntas.some(q => q.id === id))) : shuffle(simPool(cfg)).slice(0, cfg.n).map(q => q.id)).map(id => ({ id, order: shuffle([0, 1, 2, 3]), pick: null }));
  if (!items.length) return;
  SIM = { cfg: { ...cfg }, items, i: 0, start: Date.now(), endsAt: Date.now() + cfg.min * 60000, done: false, armed: false };
  clearInterval(simTick); simTick = setInterval(simTickFn, 500);
}
function simTickFn(){
  if (!SIM || SIM.done){ clearInterval(simTick); return; }
  const left = SIM.endsAt - Date.now();
  if (left <= 0){ finishSim(true); return; }
  const el = $('#sim-clock'); if (el){ el.textContent = fmtClock(left); el.classList.toggle('low', left < 60000); }
}
function finishSim(auto){
  if (!SIM || SIM.done) return;
  clearInterval(simTick);
  const res = SIM.items.map(it => { const q = S.preguntas.find(x => x.id === it.id); return q ? { q, ok: it.pick === 0 } : null; }).filter(Boolean);
  const ok = res.filter(r => r.ok).length, p = pct(ok, res.length);
  res.forEach(r => { errTrack('preg', r.q.id, r.q.materiaId, r.ok); S.historial.push({ t: Date.now(), tipo:'sim', materiaId: r.q.materiaId, u: r.q.u, ref: r.q.q, ok: r.ok }); });
  const dur = Math.round((Math.min(Date.now(), SIM.endsAt) - SIM.start) / 1000);
  SIM.done = true; SIM.auto = !!auto; SIM.result = { ok, n: res.length, p, nota: notaDe(p), dur };
  S.simulacros.push({ id: uid(), t: Date.now(), materiaId: SIM.cfg.m, n: res.length, ok, nota: SIM.result.nota, dur });
  markStudy(); save();
  if (auto) toast('Se terminó el tiempo del simulacro. Ya podés ver tu resultado.');
  if (R.view === 'practicar' && P.tab === 'sim') render();
}
function vSim(){ return SIM && !SIM.done ? vSimRun() : SIM && SIM.done ? vSimRes() : vSimCfg(); }
function vSimCfg(){
  const c = P.simCfg, m = c.m !== 'todas' ? mat(c.m) : null;
  if (c.m !== 'todas' && !m) c.m = 'todas';
  const scopes = m ? [['', 'Todas las unidades'], ...S.eventos.filter(e => e.materiaId === m.id && !e.hecho && e.tipo !== 'TP').map(e => ['ev:' + e.id, `Lo que entra en el ${e.tipo.toLowerCase()} (${e.titulo})`]), ['viejos', 'Solo preguntas de exámenes anteriores'], ...units(m.id).map(u => [u.id, 'Unidad: ' + u.nombre])]
    : [['', 'Todas las unidades'], ['viejos', 'Solo preguntas de exámenes anteriores']];
  if (!scopes.some(x => x[0] === c.scope)) c.scope = '';
  const pool = simPool(c), n = Math.min(c.n, pool.length), hist = S.simulacros.slice(-6).reverse();
  return `<div class="grid g2">
    <div class="card stack" style="gap:14px"><div><h2>Simulacro de examen</h2><p class="small muted">Como el examen real: con tiempo límite y sin ver las respuestas hasta que entregás.</p></div>
      <label class="f">Materia<select id="sc-m" data-change="sim-cfg"><option value="todas" ${c.m === 'todas' ? 'selected' : ''}>Todas mis materias</option>${cursando().map(x => `<option value="${x.id}" ${c.m === x.id ? 'selected' : ''}>${esc(x.nombre)}</option>`).join('')}</select></label>
      <label class="f">Qué entra<select id="sc-s" data-change="sim-cfg">${scopes.map(([v, l]) => `<option value="${v}" ${c.scope === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
      <div class="grid g2" style="gap:12px"><label class="f">Preguntas<select id="sc-n" data-change="sim-cfg">${[10, 20, 30, 50].map(v => `<option value="${v}" ${c.n === v ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
      <label class="f">Minutos<input id="sc-t" type="number" min="1" max="300" value="${c.min}" data-change="sim-cfg"></label></div>
      <label class="row small" style="gap:8px"><input type="checkbox" id="sc-c" ${c.casos ? 'checked' : ''} data-change="sim-cfg">Incluir casos clínicos</label>
      <p class="note">${pool.length ? `Hay ${pool.length} ${pool.length === 1 ? 'pregunta disponible' : 'preguntas disponibles'}${pool.length < c.n ? `, así que el simulacro va a tener ${pool.length}. Podés sumar más en Cuestionarios con ${IA ? '“Generar con IA”' : '“Agregar pregunta”'}` : ''}.` : `No hay preguntas para esta selección. Cargá algunas en Cuestionarios con ${IA ? '“Generar con IA”' : '“Agregar pregunta”'}.`}</p>
      <button class="btn pri" data-act="sim-start" ${pool.length ? '' : 'disabled'}>${I('clock',16)}Empezar simulacro${pool.length ? ` · ${n} ${n === 1 ? 'pregunta' : 'preguntas'} · ${c.min} min` : ''}</button></div>
    <div class="card"><h2 style="margin-bottom:10px">Tus simulacros</h2>${hist.length ? hist.map(h => `<div class="weak" style="grid-template-columns:minmax(0,1fr) auto auto"><span><b>${esc(matName(h.materiaId))}</b><span class="small muted" style="display:block">${fmtDate(h.t)} · ${h.ok}/${h.n} correctas · ${fmtMin(h.dur / 60)}</span></span><span class="pill ${h.nota >= 4 ? 'p-ok' : 'p-urgent'}">${h.nota >= 4 ? 'Aprobado' : 'Desaprobado'}</span><span class="num" style="font-weight:700;font-size:1.1rem">${fmtN(h.nota)}</span></div>`).join('') : '<p class="muted small">Todavía no hiciste ninguno. El primero te da una idea de cómo llegás al examen.</p>'}
      <p class="small muted" style="margin-top:10px">Nota orientativa: 60 % de respuestas correctas equivale a un 4 (aprobado).</p></div>
  </div>`;
}
function vSimRun(){
  const s = SIM, it = s.items[s.i], q = S.preguntas.find(x => x.id === it.id);
  if (!q){ finishSim(false); return vSimRes(); }
  const un = unitById(q.u), answered = s.items.filter(x => x.pick !== null).length, left = s.endsAt - Date.now();
  return `<div class="stack" style="max-width:820px">
    <div class="card row between" style="gap:12px"><div><p class="eyebrow">Simulacro · ${esc(matName(s.cfg.m))}</p><p class="small muted">${answered} de ${s.items.length} respondidas</p></div>
      <div class="row"><span class="clock num ${left < 60000 ? 'low' : ''}" id="sim-clock" role="timer" aria-label="Tiempo restante">${fmtClock(left)}</span>
      <button class="btn ${s.armed ? 'danger' : 'pri'}" data-act="sim-finish">${s.armed ? `Te faltan ${s.items.length - answered}. ¿Entregar igual?` : 'Entregar'}</button></div></div>
    <div class="qnav" aria-label="Ir a una pregunta">${s.items.map((x, k) => `<button class="${x.pick !== null ? 'ans' : ''} ${k === s.i ? 'cur' : ''}" data-act="sim-go" data-i="${k}" aria-label="Pregunta ${k + 1}${x.pick !== null ? ', respondida' : ''}">${k + 1}</button>`).join('')}</div>
    <div class="prompt">${qHeader(q)}<p class="small muted" style="margin-bottom:6px">Pregunta ${s.i + 1} · ${esc(matName(q.materiaId))}${un ? ' · ' + esc(un.nombre) : ''}</p><b>${esc(q.q)}</b></div>
    <div class="stack" style="gap:8px">${it.order.map((o, k) => `<button class="opt ${it.pick === o ? 'sel' : ''}" data-act="sim-pick" data-o="${o}" aria-pressed="${it.pick === o}"><span class="k">${'ABCD'[k]}</span>${esc(q.ops[o])}</button>`).join('')}</div>
    <div class="row between"><button class="btn" data-act="sim-go" data-i="${s.i - 1}" ${s.i === 0 ? 'disabled' : ''}>${I('back',16)}Anterior</button><button class="btn" data-act="sim-go" data-i="${s.i + 1}" ${s.i === s.items.length - 1 ? 'disabled' : ''}>Siguiente${I('next',16)}</button></div>
  </div>`;
}
function vSimRes(){
  const s = SIM, r = s.result, aprob = r.nota >= 4;
  const rows = s.items.map((it, k) => { const q = S.preguntas.find(x => x.id === it.id); return q ? { q, it, k, ok: it.pick === 0 } : null; }).filter(Boolean);
  const byU = {}; rows.forEach(x => { const k = x.q.u || '?'; byU[k] = byU[k] || { ok:0, n:0 }; byU[k].n++; if (x.ok) byU[k].ok++; });
  const porUnidad = Object.entries(byU).filter(([u]) => unitById(u)).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n);
  const flojas = porUnidad.filter(([, v]) => v.ok < v.n).map(([u]) => unitById(u).nombre);
  return `<div class="stack" style="max-width:820px">
    <div class="card row" style="gap:20px">${ring(r.p, 96, aprob ? 'var(--ok)' : 'var(--danger)')}
      <div style="flex:1;min-width:200px"><p class="eyebrow">${s.auto ? 'Se terminó el tiempo' : 'Resultado del simulacro'}</p><div class="row" style="gap:12px;align-items:baseline"><span class="num" style="font-size:2.6rem;font-weight:700;line-height:1">${fmtN(r.nota)}</span><span class="pill ${aprob ? 'p-ok' : 'p-urgent'}">${aprob ? 'Aprobado' : 'Desaprobado'}</span></div>
      <p class="small muted" style="margin-top:6px">${r.ok} de ${r.n} correctas · ${fmtMin(r.dur / 60)} de ${s.cfg.min} min · nota orientativa (60 % = 4)</p></div></div>
    ${porUnidad.length ? `<div class="card"><h2 style="margin-bottom:10px">Por unidad</h2>${porUnidad.map(([u, v]) => `<div class="weak"><span>${esc(unitById(u).nombre)}</span><span class="bar ${pct(v.ok, v.n) >= 60 ? 'ok' : 'bad'}"><i style="width:${pct(v.ok, v.n)}%"></i></span><span class="num small">${v.ok}/${v.n}</span></div>`).join('')}</div>` : ''}
    <div class="card"><h2 style="margin-bottom:6px">Revisión</h2><p class="small muted" style="margin-bottom:6px">Las que fallaste se agregaron a tu cuaderno de errores.</p>
      ${rows.map(x => `<div class="tip"><span class="n" style="${x.ok ? 'background:var(--ok-soft);color:var(--ok)' : 'background:var(--danger-soft);color:var(--danger)'}">${I(x.ok ? 'check' : 'x', 14)}</span><div style="min-width:0"><b>${x.k + 1}. ${esc(x.q.q)}</b>
        ${x.ok ? '' : `<p class="small" style="margin-top:2px">Tu respuesta: ${x.it.pick === null ? '<i>sin responder</i>' : esc(x.q.ops[x.it.pick])}</p>`}
        <p class="small" style="margin-top:2px">Correcta: <b>${esc(x.q.ops[0])}</b></p><p class="small muted">${esc(x.q.exp)}</p></div></div>`).join('')}</div>
    <div class="row"><button class="btn pri" data-act="sim-new">Nuevo simulacro</button><button class="btn" data-act="sim-retry">Repetir las mismas preguntas</button>${flojas.length ? `<button class="btn" data-act="ai-ask" data-q="${esc('Hice un simulacro y me fue mal en: ' + flojas.join(', ') + '. Explicame lo más importante de esos temas y cómo estudiarlos.')}">${I('spark',16)}Explicame lo que fallé</button>` : ''}</div>
  </div>`;
}

/* ---------- explicalo con tus palabras (técnica Feynman) ---------- */
P.fe = { m: (cursando()[0] || {}).id || '', tema:'', libre:'', texto:'', res:null, busy:false, temaShown:'', lastTemaId:null };
function feTema(){ if (P.fe.tema === '__otro') return P.fe.libre.trim(); const x = topicById(P.fe.tema); return x ? x.t.nombre : ''; }
function feResult(r, tema, acciones){
  const li = a => (a || []).map(x => `<li>${esc(x)}</li>`).join('');
  const col = r.puntaje >= 7 ? 'var(--ok)' : r.puntaje >= 5 ? 'var(--soon)' : 'var(--danger)';
  const x = acciones && P.fe.lastTemaId ? topicById(P.fe.lastTemaId) : null;
  return `<div class="card stack" style="gap:12px"><div class="row" style="gap:16px;flex-wrap:nowrap"><span class="num" style="font-size:2.6rem;font-weight:700;line-height:1;color:${col}">${r.puntaje}<span class="muted" style="font-size:1rem">/10</span></span><div style="min-width:0"><p class="eyebrow">${esc(tema || '')}</p><p class="small">${esc(r.resumen || '')}</p></div></div>
    ${r.bien.length ? `<div><h3 class="s-ok">Lo que estuvo bien</h3><ul class="small">${li(r.bien)}</ul></div>` : ''}
    ${r.falto.length ? `<div><h3 style="color:var(--soon)">Lo que te faltó</h3><ul class="small">${li(r.falto)}</ul></div>` : ''}
    ${r.errores.length ? `<div><h3 class="s-bad">Para corregir</h3><ul class="small">${li(r.errores)}</ul></div>` : ''}
    ${r.pregunta ? `<div class="note"><b>Para profundizar:</b> ${esc(r.pregunta)}</div>` : ''}
    ${acciones ? `<div class="row">${x && !x.t.ok && r.puntaje >= 7 ? `<button class="btn pri" data-act="fe-mark">${I('check',16)}Marcar “${esc(x.t.nombre)}” como estudiado</button>` : ''}${r.pregunta ? `<button class="btn" data-act="ai-ask" data-q="${esc('Quiero responder esta pregunta sobre ' + tema + ': ' + r.pregunta + ' Ayudame a pensarla sin darme la respuesta de entrada.')}">${I('spark',16)}Responder con la IA</button>` : ''}<button class="btn" data-act="fe-new">Nueva explicación</button></div>` : ''}
  </div>`;
}
function vFeyn(){
  const f = P.fe; if (!mat(f.m)) f.m = (cursando()[0] || {}).id || '';
  const m = mat(f.m), words = f.texto.trim() ? f.texto.trim().split(/\s+/).length : 0;
  const opts = m ? units(m.id).map(u => `<optgroup label="${esc(u.nombre)}">${u.temas.map(t => `<option value="${t.id}" ${f.tema === t.id ? 'selected' : ''}>${esc(t.nombre)}</option>`).join('')}</optgroup>`).join('') : '';
  const hist = S.explicaciones.slice().reverse().slice(0, 8);
  return `<div class="grid g-home">
    <div class="stack">
      <div class="card stack" style="gap:12px"><div><h2>Explicalo con tus palabras</h2><p class="small muted">Elegí un tema y explicalo como si se lo contaras a alguien que no lo estudió. La IA te dice qué estuvo bien, qué te faltó y qué dijiste mal. Es la mejor práctica para los orales.</p></div>
        ${m ? `<div class="grid g2" style="gap:12px"><label class="f">Materia<select id="fe-m" data-change="fe-m">${cursando().map(x => `<option value="${x.id}" ${f.m === x.id ? 'selected' : ''}>${esc(x.nombre)}</option>`).join('')}</select></label>
        <label class="f">Tema<select id="fe-tema" data-change="fe-tema"><option value="">Elegí un tema…</option>${opts}<option value="__otro" ${f.tema === '__otro' ? 'selected' : ''}>Otro tema (lo escribo)</option></select></label></div>
        ${f.tema === '__otro' ? `<label class="f">¿Qué tema?<input type="text" id="fe-libre" value="${esc(f.libre)}" placeholder="Ej: Ciclo de Krebs"></label>` : ''}
        <label class="f">Tu explicación<textarea id="fe-t" style="min-height:200px" placeholder="Empezá por la idea general y después los detalles: qué es, cómo funciona, por qué importa y un ejemplo.">${esc(f.texto)}</textarea></label>
        <div class="row between"><span class="small muted" id="fe-wc">${words} palabras${words < 40 ? ' · conviene escribir al menos 40' : ''}</span>
          <button class="btn pri" data-act="fe-eval" ${f.busy ? 'disabled' : ''}>${I('spark',16)}${f.busy ? 'Evaluando…' : 'Evaluar mi explicación'}</button></div>
        <p class="small" id="fe-msg" style="color:var(--danger)"></p>` : '<div class="empty">Agregá una materia que estés cursando para usar esta sección.</div>'}
      </div>
      ${f.res ? feResult(f.res, f.temaShown, true) : ''}
    </div>
    <div class="card"><h2 style="margin-bottom:10px">Tus explicaciones</h2>${hist.length ? hist.map(h => `<button class="n-item" data-act="fe-view" data-id="${h.id}"><span class="n-ico ${h.res && h.res.puntaje < 7 ? 'warm' : ''}" style="font-family:var(--f-mono);font-weight:700;font-size:.85rem">${h.res ? h.res.puntaje : '–'}</span><span style="min-width:0"><b class="small" style="display:block">${esc(h.tema)}</b><span class="small muted">${esc(matName(h.materiaId))} · ${fmtDate(h.t)}${h.res ? '' : ' · sin evaluar'}</span></span></button>`).join('') : '<p class="muted small">Acá vas a ver tus explicaciones con el puntaje de cada una.</p>'}
      <p class="note" style="margin-top:10px">En la app instalada vas a poder dictar la explicación en voz alta en lugar de escribirla.</p></div>
  </div>`;
}

/* ---------- exámenes anteriores ---------- */
function topicFreq(mId){ const ex = S.viejos.filter(v => v.materiaId === mId), f = {}; ex.forEach(v => new Set(v.temas).forEach(t => { f[t] = (f[t] || 0) + 1; })); return { n: ex.length, f }; }
function hotPill(mId, tId){ const x = topicFreq(mId), c = x.f[tId] || 0; return x.n >= 2 && c / x.n >= 0.5 ? ` <span class="pill p-warm" style="font-size:.68rem;padding:1px 7px" title="Salió en ${c} de ${x.n} exámenes anteriores">Sale seguido</span>` : ''; }
function viejosTab(m){
  const ex = S.viejos.filter(v => v.materiaId === m.id), tf = topicFreq(m.id);
  const ranking = units(m.id).flatMap(u => u.temas.map(t => ({ t, u, c: tf.f[t.id] || 0 }))).filter(x => x.c).sort((a, b) => b.c - a.c).slice(0, 10);
  return `<div class="stack" style="gap:14px">
    <div class="card"><div class="card-h"><h2>Temas más tomados</h2><span class="small muted">en ${tf.n} ${tf.n === 1 ? 'examen cargado' : 'exámenes cargados'}</span></div>
      ${ranking.length ? ranking.map(x => `<div class="weak" style="grid-template-columns:minmax(0,1fr) 110px 64px"><span>${esc(x.t.nombre)}<span class="small muted" style="display:block">${esc(x.u.nombre)} · ${x.t.ok ? 'ya lo estudiaste' : 'sin estudiar'}</span></span><span class="bar ${x.t.ok ? 'ok' : 'warn'}"><i style="width:${pct(x.c, tf.n)}%"></i></span><span class="num small">${x.c} de ${tf.n}</span></div>`).join('')
        + '<p class="small muted" style="margin-top:10px">Los temas que salen seguido van primero en tu plan de estudio y llevan la marca “Sale seguido”.</p>'
        : '<p class="muted small">Cargá exámenes anteriores y marcá qué temas tomaron para ver cuáles se repiten.</p>'}</div>
    <div class="row between"><h2>Exámenes anteriores</h2><button class="btn pri sm" data-act="vj-new" data-m="${m.id}">${I('plus',15)}Agregar examen</button></div>
    ${ex.length ? ex.map(v => { const nq = S.preguntas.filter(q => q.origen === v.id).length, nt = v.temas.filter(t => topicById(t)).length;
      return `<div class="doc" style="align-items:flex-start"><span class="doc-ico">${I('archive',18)}</span><div style="flex:1;min-width:0"><b>${esc(v.titulo)}</b><p class="small muted">${nt} ${nt === 1 ? 'tema marcado' : 'temas marcados'} · ${nq} ${nq === 1 ? 'pregunta' : 'preguntas'}${v.texto ? ' · texto cargado' : ''}</p>
        <div class="doc-actions"><button class="btn sm" data-act="vj-temas" data-id="${v.id}">${I('list',14)}Temas que tomaron</button>${v.texto ? `<button class="btn sm" data-act="vj-ai" data-id="${v.id}">${I('spark',14)}Extraer preguntas con IA</button>` : ''}${nq ? `<button class="btn sm" data-act="vj-practice" data-id="${v.id}">${I('quiz',14)}Practicar sus preguntas</button>` : ''}</div>
        <p class="small muted" id="vs-${v.id}" style="margin-top:4px"></p></div>
        <button class="icon-btn danger" data-act="vj-del" data-id="${v.id}" aria-label="Eliminar examen">${I('trash',16)}</button></div>`; }).join('')
      : '<div class="empty">Todavía no cargaste exámenes anteriores de esta materia.</div>'}
  </div>`;
}
function vjForm(mId, v){
  modal(`<div class="row between"><h2>${v ? 'Temas que tomaron' : 'Agregar examen anterior'}</h2>${closeX()}</div>
    <form class="stack" style="gap:12px" data-form="viejo" data-m="${mId}" data-id="${v ? v.id : ''}">
      ${v ? `<p class="small muted">${esc(v.titulo)}</p>` : `<label class="f">Nombre<input id="vj-t" type="text" required placeholder="Ej: 2º parcial 2025"></label>
      <label class="f">Archivo del examen (opcional)<span class="small muted" style="font-weight:400">${IA ? 'PDF o texto. La IA puede sacar las preguntas y detectar los temas.' : 'PDF o texto, para tenerlo guardado junto al examen.'}</span><input type="file" id="vj-f" accept=".pdf,.txt,.md"></label>
      <label class="f">O pegá el texto del examen (opcional)<textarea id="vj-x" placeholder="Pegá acá las preguntas…"></textarea></label>`}
      <fieldset class="stack" style="gap:6px;border:0;padding:0;margin:0"><legend class="small" style="font-weight:600;margin-bottom:6px">Temas que tomaron</legend>
        <div class="stack" style="gap:10px;max-height:260px;overflow:auto">${units(mId).map(u => `<div><p class="small" style="font-weight:600">${esc(u.nombre)}</p>${u.temas.map(t => `<label class="row small" style="gap:8px;padding:3px 0;flex-wrap:nowrap"><input type="checkbox" class="vj-c" value="${t.id}" ${v && v.temas.includes(t.id) ? 'checked' : ''}>${esc(t.nombre)}</label>`).join('')}</div>`).join('') || '<span class="small muted">Esta materia no tiene temas cargados.</span>'}</div></fieldset>
      <p class="small" id="vj-msg" style="color:var(--danger)"></p>
      <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></form>`);
}

/* ---------- fichas y mnemotecnias ---------- */
let FI = { tab:'farm', q:'' };
const FI_TIPOS = {
  farm: { lbl:'Fármaco', one:'fármaco', ico:'pill', key:'farmacos', sub:'grupo', subLbl:'Grupo', campos:[['mecanismo','Mecanismo de acción'],['indicaciones','Indicaciones'],['adversos','Efectos adversos'],['contraindicaciones','Contraindicaciones'],['interacciones','Interacciones']] },
  enf: { lbl:'Enfermedad', one:'enfermedad', ico:'stetho', key:'enfermedades', sub:'especialidad', subLbl:'Especialidad', campos:[['etiologia','Etiología'],['fisiopato','Fisiopatología'],['clinica','Clínica'],['diagnostico','Diagnóstico'],['tratamiento','Tratamiento']] }
};
function fichaFind(id){ for (const k of ['farm', 'enf']){ const x = S.fichas[FI_TIPOS[k].key].find(f => f.id === id); if (x) return { x, k }; } return null; }
function vFichas(){
  const tabs = [['farm','Fármacos','pill'],['enf','Enfermedades','stetho'],['mne','Mnemotecnias','bulb']];
  const ph = FI.tab === 'mne' ? 'Buscar mnemotecnias' : FI.tab === 'farm' ? 'Buscar fármacos' : 'Buscar enfermedades';
  return `<div class="stack">
    <div class="row between"><div><h1>Fichas</h1><p class="small muted">Fármacos, enfermedades y mnemotecnias, ordenados y listos para repasar.</p></div>
      <button class="btn pri" data-act="fi-new">${I('plus',16)}${FI.tab === 'mne' ? 'Nueva mnemotecnia' : 'Nueva ficha'}</button></div>
    <div class="row between"><div class="tabs" role="tablist">${tabs.map(([k, l, i]) => `<button role="tab" aria-selected="${FI.tab === k}" data-act="fi-tab" data-tab="${k}"><span class="row" style="gap:6px;flex-wrap:nowrap">${I(i,16)}${l}</span></button>`).join('')}</div>
      <div class="search" style="max-width:320px;flex:1 1 220px">${I('search',18)}<input type="text" id="fi-q" value="${esc(FI.q)}" placeholder="${ph}" aria-label="${ph}" autocomplete="off"></div></div>
    <div id="fi-list">${fichaList()}</div>
  </div>`;
}
function fichaList(){
  const q = norm(FI.q);
  if (FI.tab === 'mne'){
    const list = S.mnemos.filter(x => !q || norm(`${x.titulo} ${x.texto} ${x.detalle || ''}`).includes(q));
    return list.length ? `<div class="grid g3">${list.map(x => `<div class="card stack" style="gap:8px"><div class="row between" style="flex-wrap:nowrap"><span class="pill p-warm">${esc(matName(x.materiaId))}</span><div class="row" style="gap:4px"><button class="icon-btn" data-act="mn-edit" data-id="${x.id}" aria-label="Editar mnemotecnia">${I('edit',15)}</button><button class="icon-btn danger" data-act="mn-del" data-id="${x.id}" aria-label="Eliminar mnemotecnia">${I('trash',15)}</button></div></div>
      <h3>${esc(x.titulo)}</h3><p style="font-family:var(--f-display);font-size:1.08rem;font-weight:600">${esc(x.texto)}</p>${x.detalle ? `<p class="small muted">${esc(x.detalle)}</p>` : ''}</div>`).join('')}</div>`
      : `<div class="empty">${q ? 'No hay mnemotecnias que coincidan con la búsqueda.' : 'Todavía no hay mnemotecnias. Creá la primera o pedile una a la IA.'}</div>`;
  }
  const T = FI_TIPOS[FI.tab];
  const list = S.fichas[T.key].filter(x => !q || norm([x.nombre, x[T.sub] || '', ...T.campos.map(c => x[c[0]] || '')].join(' ')).includes(q)).sort((a, b) => a.nombre.localeCompare(b.nombre));
  return list.length ? `<div class="grid g3">${list.map(x => `<div class="card mat" data-act="fi-open" data-id="${x.id}" role="button" tabindex="0"><div class="row between" style="flex-wrap:nowrap"><span class="doc-ico">${I(T.ico,18)}</span>${mat(x.materiaId) ? `<span class="small muted">${esc(matName(x.materiaId))}</span>` : ''}</div>
      <div><h2>${esc(x.nombre)}</h2><p class="small muted">${esc(x[T.sub] || '')}</p></div><p class="small clamp">${esc(x[T.campos[0][0]] || '')}</p></div>`).join('')}</div>`
    : `<div class="empty">${q ? 'No hay fichas que coincidan con la búsqueda.' : 'Todavía no hay fichas. Creá la primera con “Nueva ficha”.'}</div>`;
}
function guessUnit(mId, x, T){
  if (x.u && units(mId).some(u => u.id === x.u)) return x.u;
  const words = norm(`${x.nombre} ${x[T.sub] || ''}`).split(' ').filter(w => w.length > 4);
  const u = units(mId).find(u => [u.nombre, ...u.temas.map(t => t.nombre)].some(s => words.some(w => norm(s).includes(w))));
  return u ? u.id : undefined;
}
function fichaForm(k, x){
  const T = FI_TIPOS[k], mSel = x ? x.materiaId : (k === 'farm' && mat('farma') ? 'farma' : '');
  modal(`<div class="row between"><h2>${x ? 'Editar ficha' : 'Nueva ficha de ' + T.one}</h2>${closeX()}</div>
    <form class="stack" style="gap:12px" data-form="ficha" data-k="${k}" data-id="${x ? x.id : ''}">
      <label class="f">Nombre<input id="ff-nombre" type="text" required value="${esc(x ? x.nombre : '')}" placeholder="${k === 'farm' ? 'Ej: Metformina' : 'Ej: Insuficiencia cardíaca'}"></label>
      <button class="btn" type="button" style="align-self:flex-start" data-act="fi-ai" data-k="${k}">${I('spark',16)}Completar el resto con IA</button>
      <div class="grid g2" style="gap:12px"><label class="f">${T.subLbl}<input id="ff-sub" type="text" value="${esc(x ? x[T.sub] || '' : '')}"></label>
      <label class="f">Materia<select id="ff-m"><option value="">General</option>${S.materias.map(m => `<option value="${m.id}" ${mSel === m.id ? 'selected' : ''}>${esc(m.nombre)}</option>`).join('')}</select></label></div>
      ${T.campos.map(([c, l]) => `<label class="f">${l}<textarea id="ff-${c}" style="min-height:70px">${esc(x ? x[c] || '' : '')}</textarea></label>`).join('')}
      <p class="small muted" id="ff-msg"></p>
      <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></form>`);
}
function mnemoForm(x){
  modal(`<div class="row between"><h2>${x ? 'Editar mnemotecnia' : 'Nueva mnemotecnia'}</h2>${closeX()}</div>
    <form class="stack" style="gap:12px" data-form="mnemo" data-id="${x ? x.id : ''}">
      <label class="f">Qué querés recordar<input id="mf-t" type="text" required value="${esc(x ? x.titulo : '')}" placeholder="Ej: Ramas del arco aórtico"></label>
      <label class="f">Materia<select id="mf-m"><option value="">General</option>${S.materias.map(m => `<option value="${m.id}" ${x && x.materiaId === m.id ? 'selected' : ''}>${esc(m.nombre)}</option>`).join('')}</select></label>
      <button class="btn" type="button" style="align-self:flex-start" data-act="mn-ai">${I('spark',16)}Proponer una con IA</button>
      <label class="f">Mnemotecnia<textarea id="mf-x" required style="min-height:70px" placeholder="La frase o regla para acordarte">${esc(x ? x.texto : '')}</textarea></label>
      <label class="f">Qué significa cada parte<textarea id="mf-d" style="min-height:70px">${esc(x ? x.detalle || '' : '')}</textarea></label>
      <p class="small muted" id="mf-msg"></p>
      <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></form>`);
}

/* ---------- referencia rápida ---------- */
let RF = { tab:'lab', q:'', vals:{} };
const LAB = [
  ['Signos vitales', [['Frecuencia cardíaca','60–100','lpm','Adulto en reposo'],['Frecuencia respiratoria','12–20','rpm','Adulto en reposo'],['Presión arterial','< 120/80','mmHg','Óptima. Hipertensión: ≥ 140/90'],['Temperatura axilar','36–37,2','°C','Febrícula hasta 37,9; fiebre desde 38'],['Saturación de O₂','≥ 95','%','Respirando aire ambiente']]],
  ['Hemograma', [['Hemoglobina','M 12–16 · H 13,5–17,5','g/dL',''],['Hematocrito','M 36–46 · H 41–53','%',''],['Glóbulos blancos','4.500–11.000','/mm³',''],['Plaquetas','150.000–450.000','/mm³',''],['VCM','80–100','fL','Volumen corpuscular medio']]],
  ['Química', [['Glucemia en ayunas','70–99','mg/dL','100–125: alterada · ≥ 126: diabetes'],['Urea','15–45','mg/dL',''],['Creatinina','M 0,6–1,1 · H 0,7–1,3','mg/dL',''],['Sodio','135–145','mEq/L',''],['Potasio','3,5–5','mEq/L',''],['Cloro','98–106','mEq/L',''],['Calcio total','8,5–10,5','mg/dL','Corregir según la albúmina'],['Ácido úrico','M 2,5–6 · H 3,5–7,2','mg/dL',''],['Albúmina','3,5–5','g/dL','']]],
  ['Hepatograma', [['TGO (AST)','< 40','UI/L','Varía según el laboratorio'],['TGP (ALT)','< 40','UI/L','Varía según el laboratorio'],['Bilirrubina total','0,3–1,2','mg/dL',''],['Fosfatasa alcalina','40–130','UI/L','Más alta en niños y adolescentes'],['GGT','M < 40 · H < 60','UI/L','']]],
  ['Lípidos', [['Colesterol total','< 200','mg/dL','Deseable'],['LDL','< 130','mg/dL','El objetivo depende del riesgo cardiovascular'],['HDL','H > 40 · M > 50','mg/dL',''],['Triglicéridos','< 150','mg/dL','']]],
  ['Gases arteriales', [['pH','7,35–7,45','',''],['PaCO₂','35–45','mmHg',''],['PaO₂','80–100','mmHg','Aire ambiente'],['HCO₃⁻','22–26','mEq/L',''],['Exceso de base','−2 a +2','mEq/L','']]],
  ['Coagulación', [['Tiempo de protrombina (Quick)','70–100','%',''],['RIN','0,8–1,2','','Anticoagulados: objetivo habitual 2–3'],['KPTT','25–40','segundos','Varía según el reactivo']]],
  ['Tiroides', [['TSH','0,4–4','mUI/L',''],['T4 libre','0,8–1,8','ng/dL','']]],
  ['Orina', [['Densidad','1.005–1.030','',''],['Diuresis','800–2.000','mL/día','Oliguria: menos de 400 mL/día']]]
];
const CALCS = [
  { id:'imc', nombre:'Índice de masa corporal (IMC)', f:[['peso','Peso','kg'],['talla','Talla','cm']], ref:'Peso / talla². OMS: menos de 18,5 bajo peso · 18,5–24,9 normal · 25–29,9 sobrepeso · 30 o más obesidad.',
    calc: v => { const r = v.peso / Math.pow(v.talla / 100, 2); return [fmtN(r) + ' kg/m²', r < 18.5 ? 'Bajo peso' : r < 25 ? 'Normal' : r < 30 ? 'Sobrepeso' : r < 35 ? 'Obesidad grado I' : r < 40 ? 'Obesidad grado II' : 'Obesidad grado III', r]; } },
  { id:'cg', nombre:'Clearance de creatinina (Cockcroft-Gault)', f:[['edad','Edad','años'],['peso','Peso','kg'],['cr','Creatinina','mg/dL']], sexo:true, ref:'((140 − edad) × peso) / (72 × creatinina), × 0,85 en mujeres. Es una estimación.',
    calc: v => { const r = (140 - v.edad) * v.peso / (72 * v.cr) * (v.sexo === 'F' ? 0.85 : 1); return [fmtN(r, 0) + ' mL/min', r >= 90 ? 'Normal o alto' : r >= 60 ? 'Levemente disminuido' : r >= 30 ? 'Moderadamente disminuido' : r >= 15 ? 'Gravemente disminuido' : 'Muy bajo: falla renal', r]; } },
  { id:'ag', nombre:'Anión gap', f:[['na','Sodio','mEq/L'],['cl','Cloro','mEq/L'],['hco3','Bicarbonato','mEq/L']], ref:'Na⁺ − (Cl⁻ + HCO₃⁻). Normal aproximado: 8–12 mEq/L.',
    calc: v => { const r = v.na - (v.cl + v.hco3); return [fmtN(r) + ' mEq/L', r > 12 ? 'Elevado: pensá en una acidosis metabólica con anión gap aumentado' : r < 8 ? 'Bajo' : 'Normal', r]; } },
  { id:'ca', nombre:'Calcio corregido por albúmina', f:[['ca','Calcio total','mg/dL'],['alb','Albúmina','g/dL']], ref:'Calcio + 0,8 × (4 − albúmina).',
    calc: v => { const r = v.ca + 0.8 * (4 - v.alb); return [fmtN(r) + ' mg/dL', r < 8.5 ? 'Hipocalcemia' : r > 10.5 ? 'Hipercalcemia' : 'Normal', r]; } },
  { id:'pam', nombre:'Presión arterial media', f:[['pas','Sistólica','mmHg'],['pad','Diastólica','mmHg']], ref:'(PAS + 2 × PAD) / 3. Normal aproximado: 70–100 mmHg.',
    calc: v => { const r = (v.pas + 2 * v.pad) / 3; return [fmtN(r, 0) + ' mmHg', r < 65 ? 'Baja: riesgo de mala perfusión de los órganos' : r > 100 ? 'Elevada' : 'Normal', r]; } },
  { id:'sc', nombre:'Superficie corporal (Mosteller)', f:[['talla','Talla','cm'],['peso','Peso','kg']], ref:'√(talla × peso / 3600).',
    calc: v => { const r = Math.sqrt(v.talla * v.peso / 3600); return [fmtN(r, 2) + ' m²', 'Un adulto promedio ronda 1,7 m²', r]; } },
  { id:'dosis', nombre:'Dosis según peso', f:[['mgkg','Dosis','mg/kg'],['peso','Peso','kg'],['veces','Tomas por día','']], opt:[['max','Dosis máxima por toma (opcional)','mg']], ref:'Para practicar cálculos. Verificá siempre con la bibliografía.',
    calc: v => { let d = v.mgkg * v.peso; const cap = v.max > 0 && d > v.max; if (cap) d = v.max; return [fmtN(d) + ' mg por toma', `${fmtN(d * v.veces)} mg por día${cap ? ' · se limitó a la dosis máxima' : ''}`, d]; } },
  { id:'goteo', nombre:'Goteo de un suero', f:[['vol','Volumen','mL'],['horas','Tiempo','horas']], ref:'Macrogotero: 20 gotas = 1 mL. Microgotero: 60 microgotas = 1 mL, así que microgotas por minuto = mL por hora.',
    calc: v => { const mlh = v.vol / v.horas; return [fmtN(mlh * 20 / 60, 0) + ' gotas/min', `${fmtN(mlh, 0)} mL/h · ${fmtN(mlh, 0)} microgotas/min`, mlh]; } }
];
function labTable(){
  const q = norm(RF.q);
  return LAB.map(([g, rows]) => { const rs = rows.filter(r => !q || norm(g + ' ' + r.join(' ')).includes(q));
    return rs.length ? `<div class="card"><h2 style="margin-bottom:8px">${g}</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Parámetro</th><th>Valor normal</th><th>Unidad</th><th>Nota</th></tr></thead><tbody>${rs.map(r => `<tr><td>${esc(r[0])}</td><td class="v">${esc(r[1])}</td><td class="small muted">${esc(r[2])}</td><td class="small muted">${esc(r[3])}</td></tr>`).join('')}</tbody></table></div></div>` : ''; }).join('')
    || '<div class="empty">No encontré ese valor. Probá con otro nombre.</div>';
}
function calcCard(c){
  const val = k => esc(RF.vals[`c-${c.id}-${k}`] || '');
  return `<div class="card stack" style="gap:10px"><h3>${c.nombre}</h3>
    <div class="grid g2" style="gap:10px">${c.f.concat(c.opt || []).map(([k, l, u]) => `<label class="f">${l}${u ? ` <span class="muted" style="font-weight:400">(${u})</span>` : ''}<input type="number" step="any" min="0" inputmode="decimal" id="c-${c.id}-${k}" data-cin="${c.id}" value="${val(k)}"></label>`).join('')}
    ${c.sexo ? `<label class="f">Sexo<select id="c-${c.id}-sexo" data-cin="${c.id}"><option value="F" ${RF.vals[`c-${c.id}-sexo`] !== 'M' ? 'selected' : ''}>Femenino</option><option value="M" ${RF.vals[`c-${c.id}-sexo`] === 'M' ? 'selected' : ''}>Masculino</option></select></label>` : ''}</div>
    <div class="res" id="cr-${c.id}" aria-live="polite"><span class="small muted">Completá los datos</span></div><p class="small muted">${c.ref}</p></div>`;
}
function runCalc(id){
  const c = CALCS.find(x => x.id === id), out = $('#cr-' + id); if (!c || !out) return;
  const num = k => { const el = $(`#c-${id}-${k}`); return el ? parseFloat(String(el.value).replace(',', '.')) : NaN; };
  const v = {}; let ok = true;
  c.f.forEach(([k]) => { v[k] = num(k); if (!(v[k] > 0)) ok = false; });
  (c.opt || []).forEach(([k]) => { const n = num(k); v[k] = n > 0 ? n : 0; });
  if (c.sexo) v.sexo = $(`#c-${id}-sexo`).value;
  if (!ok){ out.innerHTML = '<span class="small muted">Completá los datos</span>'; return; }
  const [a, b, raw] = c.calc(v);
  out.innerHTML = isFinite(raw) && raw >= 0 ? `<b>${esc(a)}</b><p class="small" style="margin-top:2px">${esc(b)}</p>` : '<span class="small muted">Revisá los datos: el resultado no tiene sentido con esos valores.</span>';
}
function vReferencia(){
  return `<div class="stack">
    <div><h1>Referencia rápida</h1><p class="small muted">Valores normales de laboratorio y calculadoras médicas.</p></div>
    <div class="row between"><div class="tabs" role="tablist">${[['lab','Valores normales','flask'],['calc','Calculadoras','calc']].map(([k, l, i]) => `<button role="tab" aria-selected="${RF.tab === k}" data-act="rf-tab" data-tab="${k}"><span class="row" style="gap:6px;flex-wrap:nowrap">${I(i,16)}${l}</span></button>`).join('')}</div>
      ${RF.tab === 'lab' ? `<div class="search" style="max-width:320px;flex:1 1 220px">${I('search',18)}<input type="text" id="rf-q" value="${esc(RF.q)}" placeholder="Buscar un valor (ej: potasio)" aria-label="Buscar un valor" autocomplete="off"></div>` : ''}</div>
    ${RF.tab === 'lab' ? `<p class="note">Valores orientativos para adultos. Cada laboratorio tiene sus propios rangos: usá siempre los del informe y los que da tu cátedra.</p><div id="rf-list" class="stack">${labTable()}</div>`
      : `<p class="note">Herramientas para estudiar y practicar cálculos. No las uses para decidir tratamientos de pacientes reales.</p><div class="grid g2">${CALCS.map(calcCard).join('')}</div>`}
  </div>`;
}

/* ---------- horario de cursada ---------- */
const DIAS = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const clsSort = (a, b) => a.dia - b.dia || a.desde.localeCompare(b.desde);
const clasesDe = dia => S.horario.filter(c => c.dia === dia && mat(c.materiaId)).sort(clsSort);
const hhmmNow = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
function proximasClases(){
  const hoy = TODAY.getDay(), hoyList = hoy >= 1 && hoy <= 6 ? clasesDe(hoy) : [];
  if (hoyList.length && hoyList.some(c => c.hasta > hhmmNow())) return { hoy: true, dia: hoy, list: hoyList };
  for (let k = 1; k <= 7; k++){ const d = (hoy + k) % 7; if (d >= 1 && d <= 6){ const l = clasesDe(d); if (l.length) return { hoy: false, dia: d, k, list: l, terminaron: hoyList.length > 0 }; } }
  return null;
}
function clsRow(c, hoy){
  const m = mat(c.materiaId), past = hoy && c.hasta <= hhmmNow();
  return `<button class="cls ${past ? 'past' : ''}" data-act="cls-edit" data-id="${c.id}"><span class="dotc" style="background:${matColor(m)}"></span><span style="min-width:0;flex:1"><b class="small" style="display:block">${esc(m.nombre)} · ${esc(c.tipo)}</b><span class="small muted">${c.desde}–${c.hasta}${c.lugar ? ' · ' + esc(c.lugar) : ''}${past ? ' · terminó' : ''}</span></span></button>`;
}
function hoyFacuCard(){
  const p = proximasClases();
  let title = 'Hoy en la facu', body;
  if (!S.horario.length) body = `<p class="small muted">Cargá tu horario de cursada para ver acá las clases del día.</p><button class="btn sm" style="margin-top:10px" data-act="cls-new">${I('plus',14)}Agregar clase</button>`;
  else if (!p) body = '<p class="small muted">No tenés clases cargadas para esta semana.</p>';
  else if (p.hoy) body = `<div class="stack" style="gap:10px">${p.list.map(clsRowHoy).join('')}</div>`;
  else { title = 'Próximas clases'; body = `<p class="small muted" style="margin-bottom:8px">${p.terminaron ? 'Por hoy terminaste.' : 'Hoy no tenés clases.'} ${p.k === 1 ? 'Mañana' : 'El ' + DIAS[p.dia].toLowerCase()}:</p><div class="stack" style="gap:8px">${p.list.map(c => clsRow(c, false)).join('')}</div>`; }
  return `<div class="card"><div class="card-h"><h2>${title}</h2><button class="btn sm ghost" data-act="go" data-view="horario">Ver horario</button></div>${body}</div>`;
}
function vHorario(){
  const hoy = TODAY.getDay(), dur = c => { const [h1, m1] = c.desde.split(':').map(Number), [h2, m2] = c.hasta.split(':').map(Number); return (h2 * 60 + m2) - (h1 * 60 + m1); };
  const porMat = {}; S.horario.filter(c => mat(c.materiaId)).forEach(c => { porMat[c.materiaId] = (porMat[c.materiaId] || 0) + Math.max(0, dur(c)); });
  const tot = Object.values(porMat).reduce((a, b) => a + b, 0);
  return `<div class="stack">
    <div class="row between"><div><h1>Horario de cursada</h1><p class="small muted">Tus clases de la semana. Tocá una clase para editarla o borrarla.</p></div><button class="btn pri" data-act="cls-new">${I('plus',16)}Agregar clase</button></div>
    <div class="week">${[1, 2, 3, 4, 5, 6].map(d => { const l = clasesDe(d); return `<div class="card stack" style="gap:8px;padding:14px;${d === hoy ? 'border-color:var(--accent)' : ''}"><div class="row between"><h3>${DIAS[d]}</h3>${d === hoy ? '<span class="pill p-next">Hoy</span>' : ''}</div>${l.length ? l.map(c => clsRow(c, d === hoy)).join('') : '<p class="small muted">Sin clases</p>'}</div>`; }).join('')}</div>
    ${tot ? `<div class="card"><div class="card-h"><h2>Horas de cursada por semana</h2><span class="num">${fmtMin(tot)}</span></div>${Object.entries(porMat).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="weak"><span>${esc(mat(k).nombre)}</span><span class="bar"><i style="width:${pct(v, tot)}%;background:${matColor(mat(k))}"></i></span><span class="num small">${fmtMin(v)}</span></div>`).join('')}</div>` : ''}
  </div>`;
}
function clsForm(c){
  const ms = cursando();
  modal(`<div class="row between"><h2>${c ? 'Editar clase' : 'Agregar clase'}</h2>${closeX()}</div>
    ${ms.length ? `<form class="stack" style="gap:12px" data-form="clase" data-id="${c ? c.id : ''}">
      <label class="f">Materia<select id="cl-m">${ms.map(m => `<option value="${m.id}" ${c && c.materiaId === m.id ? 'selected' : ''}>${esc(m.nombre)}</option>`).join('')}</select></label>
      <label class="f">Día<select id="cl-d">${[1, 2, 3, 4, 5, 6].map(d => `<option value="${d}" ${c && c.dia === d ? 'selected' : ''}>${DIAS[d]}</option>`).join('')}</select></label>
      <div class="grid g2" style="gap:12px"><label class="f">Desde<input type="time" id="cl-desde" required value="${c ? c.desde : '08:00'}"></label><label class="f">Hasta<input type="time" id="cl-hasta" required value="${c ? c.hasta : '10:00'}"></label></div>
      <div class="grid g2" style="gap:12px"><label class="f">Tipo<select id="cl-t">${['Teórico','Práctico','Seminario','Taller','Consulta','Otro'].map(t => `<option ${c && c.tipo === t ? 'selected' : ''}>${t}</option>`).join('')}</select></label><label class="f">Lugar<input type="text" id="cl-l" value="${c ? esc(c.lugar || '') : ''}" placeholder="Ej: Aula 3"></label></div>
      <p class="small" id="cl-err" style="color:var(--danger)"></p>
      <div class="row" style="justify-content:space-between">${c ? `<button class="btn" type="button" style="color:var(--danger)" data-act="cls-del" data-id="${c.id}">${I('trash',16)}Eliminar</button>` : '<span></span>'}<div class="row"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></div></form>`
      : '<p class="muted">Primero agregá una materia que estés cursando.</p>'}`);
}

/* ---------- pomodoro ---------- */
const PM = { phase:'foco', running:false, left: 0, endsAt: 0, actx: null };
const pmFull = () => (PM.phase === 'foco' ? S.pomo.foco : S.pomo.pausa) * 60;
function pomoBtn(){
  const b = $('#pomo'), show = PM.running || PM.left !== pmFull();
  b.className = 'pomo-btn' + (PM.running ? (PM.phase === 'foco' ? ' run' : ' brk') : '');
  b.innerHTML = I('timer', 16) + (show ? `<span>${fmtClock(PM.left * 1000)}</span>` : '');
  b.setAttribute('aria-label', PM.running ? `Pomodoro: ${PM.phase === 'foco' ? 'foco' : 'descanso'}, quedan ${fmtClock(PM.left * 1000)}` : 'Pomodoro');
}
function renderPomo(){
  const hoyMin = S.sesiones.filter(s => s.t >= TODAY.getTime()).reduce((a, s) => a + s.min, 0), full = PM.left === pmFull();
  $('#pomo-panel').innerHTML = `<div class="row between" style="padding:6px 8px 4px"><h3>Pomodoro</h3><span class="pill ${PM.phase === 'foco' ? 'p-next' : 'p-warm'}">${PM.phase === 'foco' ? 'Foco' : 'Descanso'}</span></div>
    <div class="big-time" id="pm-big" style="padding:14px 0" role="timer">${fmtClock(PM.left * 1000)}</div>
    <div class="row" style="justify-content:center"><button class="btn pri" data-act="pm-toggle">${I(PM.running ? 'pause' : 'play',16)}${PM.running ? 'Pausar' : full ? 'Empezar' : 'Seguir'}</button><button class="btn" data-act="pm-reset">Reiniciar</button><button class="btn ghost" data-act="pm-skip">${PM.phase === 'foco' ? 'Ir al descanso' : 'Saltar descanso'}</button></div>
    <div class="stack" style="gap:10px;padding:12px 8px 4px"><label class="f">Estudiando<select id="pm-m" data-change="pm-m"><option value="">Sin materia</option>${cursando().map(m => `<option value="${m.id}" ${S.pomo.materiaId === m.id ? 'selected' : ''}>${esc(m.nombre)}</option>`).join('')}</select></label>
      <div class="row small" style="gap:6px">Bloques: ${[[25, 5], [50, 10]].map(([f, p]) => `<button class="chip ${S.pomo.foco === f ? 'on' : ''}" data-act="pm-preset" data-f="${f}" data-p="${p}">${f} min + ${p} de descanso</button>`).join('')}</div>
      <p class="small muted">Hoy registraste <b>${fmtMin(hoyMin)}</b> de estudio. Cada bloque completo suma a tu racha y a Progreso.</p></div>`;
}
function beep(){
  const ctx = PM.actx; if (!ctx) return;
  try { [0, 0.3, 0.6].forEach(d => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, ctx.currentTime + d); g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + d + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + d + 0.22);
    o.start(ctx.currentTime + d); o.stop(ctx.currentTime + d + 0.25); }); } catch (e) {}
}
function logSesion(min){ min = Math.round(min); if (min < 1) return; S.sesiones.push({ id: uid(), t: Date.now(), materiaId: S.pomo.materiaId || '', min }); markStudy(); save(); track('pomodoro', min); if (R.view === 'progreso') render(); }
function pomoSet(phase, running){ PM.phase = phase; PM.left = pmFull(); PM.running = running; PM.endsAt = Date.now() + PM.left * 1000; }
function pomoPhaseEnd(){
  beep();
  if (PM.phase === 'foco'){ logSesion(S.pomo.foco); pomoSet('pausa', true); toast(`¡Bloque terminado! Tomate ${S.pomo.pausa} minutos de descanso.`); }
  else { pomoSet('foco', false); toast('Terminó el descanso. Cuando quieras, arrancá otro bloque.'); }
  if (!$('#pomo-panel').hidden) renderPomo();
}
function pomoTick(){
  if (!PM.running) return;
  PM.left = Math.max(0, Math.round((PM.endsAt - Date.now()) / 1000));
  if (PM.left <= 0) pomoPhaseEnd();
  pomoBtn(); const big = $('#pm-big'); if (big) big.textContent = fmtClock(PM.left * 1000);
}

/* ---------- carrera: correlatividades y regularidades ---------- */
const ESTADOS = [['aprobada','Aprobada'],['regular','Regular'],['cursando','Cursando'],['pendiente','Pendiente']];
function correlInfo(m){
  const req = (m.correl || []).map(mat).filter(Boolean), names = l => l.map(x => x.nombre).join(', ');
  if (m.estado === 'aprobada'){ const hab = S.materias.filter(x => x.estado !== 'aprobada' && (x.correl || []).includes(m.id)); return hab.length ? { cls:'muted', txt:'Habilita: ' + names(hab) } : null; }
  if (m.estado === 'pendiente'){ const f = req.filter(r => r.estado !== 'regular' && r.estado !== 'aprobada'); return f.length ? { cls:'bad', txt:'Para cursarla te falta regularizar: ' + names(f) } : { cls:'ok', txt: req.length ? 'Ya podés cursarla' : 'No tiene correlativas: ya podés cursarla' }; }
  const f = req.filter(r => r.estado !== 'aprobada');
  if (f.length) return { cls:'bad', txt:'Para rendir el final te falta aprobar: ' + names(f) };
  return m.estado === 'regular' ? { cls:'ok', txt:'Ya podés rendir el final' } : { cls:'muted', txt:'Cuando la regularices vas a poder rendir el final' };
}
function regPill(m){
  if (m.estado !== 'regular' || !m.regularHasta) return '';
  const d = daysTo(m.regularHasta);
  if (d < 0) return '<span class="pill p-urgent">Regularidad vencida</span>';
  return `<span class="pill ${d <= 60 ? 'p-urgent' : d <= 180 ? 'p-warm' : 'p-next'}">${d <= 180 ? `Regularidad: vence en ${d} ${d === 1 ? 'día' : 'días'}` : 'Regular hasta el ' + fmtShort(m.regularHasta)}</span>`;
}

/* ---------- progreso: horas de estudio y exámenes ---------- */
function progresoExtra(){
  const ses = S.sesiones, wk0 = TODAY.getTime() - 6 * DAY, L = ['D','L','M','M','J','V','S'];
  const days = [...Array(7)].map((_, i) => { const d0 = wk0 + i * DAY; return { d: new Date(d0), min: ses.filter(s => s.t >= d0 && s.t < d0 + DAY).reduce((a, s) => a + s.min, 0) }; });
  const tot = days.reduce((a, x) => a + x.min, 0), mx = Math.max(1, ...days.map(x => x.min));
  const pm = {}; ses.filter(s => s.t >= wk0).forEach(s => { const k = mat(s.materiaId) ? s.materiaId : ''; pm[k] = (pm[k] || 0) + s.min; });
  const pmList = Object.entries(pm).sort((a, b) => b[1] - a[1]);
  const sims = S.simulacros.slice(-5).reverse(), simProm = S.simulacros.length ? S.simulacros.reduce((a, s) => a + s.nota, 0) / S.simulacros.length : null;
  const exps = S.explicaciones.filter(e => e.res), expProm = exps.length ? exps.reduce((a, e) => a + e.res.puntaje, 0) / exps.length : null;
  const nErr = validErrores().length;
  return `<div class="grid g2">
    <div class="card"><div class="card-h"><h2>Horas de estudio</h2><button class="btn sm" data-act="pomo-open">${I('timer',14)}Pomodoro</button></div>
      <p><span class="num" style="font-size:1.6rem;font-weight:700">${fmtMin(tot)}</span> <span class="small muted">en los últimos 7 días</span></p>
      <div class="wk" style="margin-top:12px">${days.map(x => `<div title="${fmtDate(x.d.getTime())}: ${fmtMin(x.min)}"><i class="${x.min ? '' : 'z'}" style="height:${Math.max(3, Math.round(x.min / mx * 90))}px"></i><span>${L[x.d.getDay()]}</span></div>`).join('')}</div>
      ${pmList.length ? `<h3 style="margin:16px 0 6px">Por materia</h3>${pmList.map(([k, v]) => `<div class="weak"><span>${esc(k ? mat(k).nombre : 'Sin materia')}</span><span class="bar"><i style="width:${pct(v, tot)}%;background:${k ? matColor(mat(k)) : 'var(--muted)'}"></i></span><span class="num small">${fmtMin(v)}</span></div>`).join('')}` : '<p class="small muted" style="margin-top:12px">Usá el Pomodoro para registrar tus horas de estudio.</p>'}</div>
    <div class="card"><h2 style="margin-bottom:12px">Exámenes y repaso</h2>
      <div class="kpis"><div class="kpi"><b>${simProm === null ? '—' : fmtN(simProm)}</b><span>nota promedio en simulacros</span></div>${IA ? `<div class="kpi"><b>${expProm === null ? '—' : fmtN(expProm)}</b><span>puntaje promedio explicando</span></div>` : ''}<div class="kpi"><b>${nErr}</b><span>errores pendientes</span></div><div class="kpi"><b class="s-ok">${S.erroresResueltos}</b><span>errores resueltos</span></div></div>
      ${sims.length ? `<h3 style="margin:16px 0 6px">Últimos simulacros</h3>${sims.map(s => `<div class="weak" style="grid-template-columns:minmax(0,1fr) auto auto"><span>${esc(matName(s.materiaId))}<span class="small muted" style="display:block">${fmtDate(s.t)} · ${s.ok}/${s.n}</span></span><span class="pill ${s.nota >= 4 ? 'p-ok' : 'p-urgent'}">${s.nota >= 4 ? 'Aprobado' : 'Desaprobado'}</span><span class="num" style="font-weight:700">${fmtN(s.nota)}</span></div>`).join('')}` : ''}
      <div class="row" style="margin-top:14px"><button class="btn sm" data-act="p-open" data-tab="sim">${I('clock',14)}Hacer un simulacro</button>${nErr ? `<button class="btn sm" data-act="p-open" data-tab="errores">${I('redo',14)}Ver errores</button>` : ''}<button class="btn sm" data-act="p-open" data-tab="feyn">${I('chat',14)}Explicar un tema</button></div></div>
  </div>`;
}

/* ---------- acciones ---------- */
const A = {
  go: d => go(d.view, d.id ? { id: d.id } : {}),
  'cal-nav': d => { calMonth = +d.d === 0 ? new Date(TODAY.getFullYear(), TODAY.getMonth(), 1) : new Date(calMonth.getFullYear(), calMonth.getMonth() + +d.d, 1); render(); },
  'cal-day': d => { const evs = S.eventos.filter(e => e.fecha === d.date);
    if (evs.length === 1) return go('evento', { id: evs[0].id });
    modal(`<div class="row between"><h2 style="text-transform:capitalize">${fmtLong(d.date)}</h2><button class="btn ghost sm" data-act="close-modal" aria-label="Cerrar">${I('x',16)}</button></div><div class="stack" style="gap:8px">${evs.map(evRow).join('')}</div>`); },
  'mat-filter': d => { matFilter = d.f; render(); },
  'mat-tab': d => { R.tab = d.tab; render(); },
  'mat-open': d => go('materia', { id: d.id, tab: d.tab }),
  'toggle-hecho': d => { const e = S.eventos.find(x => x.id === d.id); e.hecho = !e.hecho; save(); render(); },
  'p-tab': d => { P.tab = d.tab; render(); },
  'p-dir': d => { P.dir = d.d; P.flipped = false; P.quiz = null; render(); },
  practice: d => { closeModal(); P.tab = d.tab; P.m = d.m || 'todas'; P.queue = []; P.quiz = null; P.ok = P.bad = 0; go('practicar'); },
  flip: () => { P.flipped = !P.flipped; const f = $('#flip'); if (f) f.classList.toggle('on', P.flipped); setTimeout(render, 420); },
  'flash-ans': d => { const c = S.cards.find(x => x.id === P.queue[P.i]), ok = d.ok === '1';
    if (ok){ c.ok++; c.box = Math.min(5, c.box + 1); P.ok++; } else { c.bad++; c.box = 1; P.bad++; }
    errTrack('card', c.id, c.materiaId, ok); logH('flash', c.materiaId, c.u, c.term, ok); P.i++; P.flipped = false; render(); },
  'flash-restart': () => { P.ok = P.bad = 0; buildQueue(); render(); },
  'quiz-skip': () => { const q = P.quiz, c = S.cards.find(x => x.id === q.id); q.res = { ok:false, detail:'La dejaste en blanco.' }; c.bad++; c.box = 1; P.bad++; q.errInfo = errTrack('card', c.id, c.materiaId, false); logH('quiz', c.materiaId, c.u, c.term, false); render(); },
  'quiz-next': () => { P.quiz = newQuizItem(); render(); setTimeout(() => $('#qa') && $('#qa').focus(), 0); },
  'quiz-override': () => { const q = P.quiz, c = S.cards.find(x => x.id === q.id); q.res.ok = true; q.res.detail = 'La marcaste como correcta.'; q.res.miss = null; P.bad--; P.ok++; c.bad--; c.ok++; c.box = Math.min(5, c.box + 1);
    const h = [...S.historial].reverse().find(x => x.ref === c.term); if (h) h.ok = true; errOverride('card', c.id, q.errInfo); q.errInfo = null; save(); render(); },
  'quiz-ai': async (d, el) => {
    const q = P.quiz, c = S.cards.find(x => x.id === q.id);
    if (!sample){ q.ai = 'La corrección con IA funciona cuando abrís la app desde Claude.'; return render(); }
    el.disabled = true; el.innerHTML = I('spark',14) + 'Corrigiendo…';
    try {
      const r = await sample.json(`Sos docente de ${mat(c.materiaId).nombre} en una facultad de Medicina. Corregí la definición que escribió un estudiante.
Término: ${c.term}
Definición de referencia: ${c.def}
Respuesta del estudiante: ${q.answer}
Evaluá si el concepto es correcto aunque use otras palabras. Respondé solo un JSON así: {"correcta": true, "puntaje": 8, "comentario": "qué estuvo bien y qué le faltó, en 2 o 3 oraciones con voseo", "consejo": "un tip corto para recordarlo"}`, { modelTier:'quick' });
      q.ai = `<b>IA · ${esc(r.puntaje)}/10</b> — ${esc(r.comentario)}${r.consejo ? `<br><b>Tip:</b> ${esc(r.consejo)}` : ''}`;
      if (r.correcta && !q.res.ok) A['quiz-override']();
    } catch (e) { q.ai = esc(aiErr(e.code)); }
    render();
  },
  'start-cuest': d => { closeModal(); startCuest(d.m, d.units ? d.units.split(',') : null); P.tab = 'cuest'; go('practicar'); },
  'cuest-go': d => { const v = d.m === 'todas' ? '' : $('#cu-' + d.m).value; let us = null;
    if (v === 'casos') { startCuest(d.m, null, true); return render(); }
    if (v === 'viejos') { startCuest(d.m, null, false, 'viejos'); return render(); }
    if (v.startsWith('ev:')) us = S.eventos.find(e => e.id === v.slice(3)).unidades; else if (v) us = [v];
    startCuest(d.m, us); render(); },
  'cuest-casos': () => { startCuest('todas', null, true); render(); },
  'cuest-pick': d => { const it = P.cq.items[P.cq.i], q = S.preguntas.find(x => x.id === it.id); if (it.pick !== null) return; it.pick = +d.o; errTrack('preg', q.id, q.materiaId, it.pick === 0); logH('cuest', q.materiaId, q.u, q.q, it.pick === 0); render(); },
  'cuest-next': () => { if (P.cq.i + 1 < P.cq.items.length) P.cq.i++; else P.cq.done = true; render(); },
  'cuest-again': () => { startCuest(P.cq.m, P.cq.units, P.cq.casos, P.cq.origen); render(); },
  'cuest-exit': () => { P.cq = null; render(); },
  'cuest-gen': async (d, el) => {
    const m = mat(d.m), v = $('#cu-' + d.m).value, out = $('#gen-' + d.m);
    if (!sample){ out.textContent = 'Generar con IA funciona cuando abrís la app desde Claude.'; return; }
    const casos = v === 'casos';
    let us = units(m.id); if (v && !casos && !v.startsWith('ev:')) us = us.filter(u => u.id === v); else if (v.startsWith('ev:')) { const e = S.eventos.find(x => x.id === v.slice(3)); us = us.filter(u => e.unidades.includes(u.id)); }
    el.disabled = true; out.textContent = casos ? 'Escribiendo casos clínicos… puede tardar unos segundos.' : 'Generando preguntas… puede tardar unos segundos.';
    try {
      const n = await genQuestions(m, us, { casos });
      out.textContent = `Listo: se agregaron ${n} ${casos ? 'casos clínicos' : 'preguntas'} nuevos.`;
    } catch (e) { out.textContent = e.code === 'invalid_json' ? 'La respuesta no vino en el formato esperado. Probá de nuevo.' : aiErr(e.code); }
    el.disabled = false;
  },
  'add-card': () => { if (!cursando().length) return sinMaterias(); NC = { img:null, boxes:[] }; modal(`<div class="row between"><h2>Nueva flashcard</h2>${closeX()}</div>
    <form class="stack" style="gap:12px" data-form="card"><label class="f">Materia<select id="nc-m">${matOptions(P.m === 'todas' ? '' : P.m)}</select></label>
    <label class="f">Término o título<input id="nc-t" type="text" required placeholder="Ej: Taquicardia, o “Huesos de la mano”"></label>
    <label class="f">Definición<textarea id="nc-d" placeholder="Ej: Frecuencia cardíaca mayor a 100 latidos por minuto en reposo."></textarea></label>
    <label class="f">Imagen (opcional)<span class="small muted" style="font-weight:400">Ideal para anatomía, histología o radiografías: tapás las partes y las tenés que nombrar.</span><input id="nc-img" type="file" accept="image/*" data-change="nc-img"></label>
    <div id="nc-occ"></div>
    <p class="small" id="nc-err" style="color:var(--danger)"></p>
    <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar flashcard</button></div></form>`); },
  'nc-img-del': () => { NC = { img:null, boxes:[] }; $('#nc-img').value = ''; occEditor(); },
  'add-materia': () => modal(`<div class="row between"><h2>Agregar materia</h2><button class="btn ghost sm" data-act="close-modal" aria-label="Cerrar">${I('x',16)}</button></div>
    <form class="stack" style="gap:12px" data-form="materia"><label class="f">Nombre<input id="nm-n" type="text" required placeholder="Ej: Microbiología"></label>
    <div class="grid g2" style="gap:12px"><label class="f">Año<select id="nm-a">${[1,2,3,4,5,6].map(n => `<option value="${n}" ${n===S.perfil.anioActual?'selected':''}>${n}º año</option>`).join('')}</select></label>
    <label class="f">Estado<select id="nm-e"><option value="cursando">Cursando</option><option value="pendiente">Pendiente</option><option value="regular">Regular (falta el final)</option><option value="aprobada">Aprobada</option></select></label></div>
    <label class="f">Nota (si está aprobada)<input id="nm-nota" type="number" min="4" max="10" placeholder="Ej: 8"></label>
    <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Agregar</button></div></form>`),
  'add-unidad': d => modal(`<div class="row between"><h2>Agregar unidad</h2><button class="btn ghost sm" data-act="close-modal" aria-label="Cerrar">${I('x',16)}</button></div>
    <form class="stack" style="gap:12px" data-form="unidad" data-m="${d.m}"><label class="f">Nombre de la unidad<input id="nu-n" type="text" required placeholder="Ej: Generalidades"></label>
    <label class="f">Temas (uno por línea)<textarea id="nu-t" required placeholder="Tema 1&#10;Tema 2"></textarea></label>
    <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></form>`),
  'add-evento': d => { const e = d.id ? S.eventos.find(x => x.id === d.id) : null;
    modal(`<div class="row between"><h2>${e ? 'Editar fecha' : 'Agregar fecha'}</h2>${closeX()}</div>
    <form class="stack" style="gap:12px" data-form="evento" data-m="${d.m}" data-id="${e ? e.id : ''}"><div class="grid g2" style="gap:12px"><label class="f">Tipo<select id="ne-t">${['Parcial','Final','TP'].map(v => `<option value="${v}" ${e && e.tipo === v ? 'selected' : ''}>${v === 'TP' ? 'Trabajo práctico' : v}</option>`).join('')}</select></label>
    <label class="f">Fecha<input id="ne-f" type="date" required value="${e ? e.fecha : addD(7)}"></label></div>
    <label class="f">Título<input id="ne-n" type="text" required placeholder="Ej: 3º parcial" value="${e ? esc(e.titulo) : ''}"></label>
    <fieldset class="stack" style="gap:6px;border:0;padding:0;margin:0"><legend class="small" style="font-weight:600;margin-bottom:6px">Unidades que entran</legend>${units(d.m).map(u => `<label class="row small" style="gap:8px"><input type="checkbox" value="${u.id}" class="ne-u" ${e && e.unidades.includes(u.id) ? 'checked' : ''}>${esc(u.nombre)}</label>`).join('') || '<span class="small muted">Esta materia no tiene unidades.</span>'}</fieldset>
    <div class="row" style="justify-content:space-between">${e ? `<button class="btn" type="button" style="color:var(--danger)" data-act="del-evento" data-id="${e.id}">${I('trash',16)}Eliminar</button>` : '<span></span>'}<div class="row"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></div></form>`); },
  'del-evento': (d, el) => { if (!el.dataset.armed){ el.dataset.armed = '1'; el.classList.add('danger'); el.style.color = ''; el.innerHTML = I('trash',16) + 'Sí, eliminar fecha'; return; }
    S.eventos = S.eventos.filter(x => x.id !== d.id); save(); closeModal(); go('inicio'); },
  'edit-materia': d => { const m = mat(d.id); modal(`<div class="row between"><h2>Editar materia</h2>${closeX()}</div>
    <form class="stack" style="gap:12px" data-form="edit-materia" data-id="${m.id}"><label class="f">Nombre<input id="em-n" type="text" required value="${esc(m.nombre)}"></label>
    <div class="grid g2" style="gap:12px"><label class="f">Año<select id="em-a">${[1,2,3,4,5,6].map(n => `<option value="${n}" ${n === m.anio ? 'selected' : ''}>${n}º año</option>`).join('')}</select></label>
    <label class="f">Estado<select id="em-e">${ESTADOS.map(([k,l]) => `<option value="${k}" ${m.estado === k ? 'selected' : ''}>${l}</option>`).join('')}</select></label></div>
    <div class="grid g2" style="gap:12px"><label class="f">Nota (si está aprobada)<input id="em-nota" type="number" min="4" max="10" value="${m.nota || ''}"></label>
    <label class="f">Regular hasta (si es regular)<input id="em-reg" type="date" value="${m.regularHasta || ''}"></label></div>
    <label class="f">Color<input id="em-c" type="color" value="${m.color || '#3D7F74'}" style="height:42px;padding:4px;max-width:120px"></label>
    <fieldset class="stack" style="gap:6px;border:0;padding:0;margin:0"><legend class="small" style="font-weight:600;margin-bottom:6px">Correlativas (materias que necesitás antes)</legend>
      <div class="stack" style="gap:2px;max-height:180px;overflow:auto">${S.materias.filter(x => x.id !== m.id).sort((a, b) => a.anio - b.anio).map(x => `<label class="row small" style="gap:8px;padding:3px 0;flex-wrap:nowrap"><input type="checkbox" class="em-cor" value="${x.id}" ${(m.correl || []).includes(x.id) ? 'checked' : ''}>${esc(x.nombre)} <span class="muted">· ${x.anio}º año</span></label>`).join('')}</div></fieldset>
    <p class="note">Las unidades y los temas se editan desde la pestaña “Unidades y temas” con el botón “Editar unidades y temas”, o pegando el programa con “Importar programa”.</p>
    <div class="row" style="justify-content:space-between"><button class="btn" type="button" style="color:var(--danger)" data-act="del-materia" data-id="${m.id}">${I('trash',16)}Eliminar materia</button><div class="row"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></div></form>`); },
  'del-materia': (d, el) => { if (!el.dataset.armed){ el.dataset.armed = '1'; el.classList.add('danger'); el.style.color = ''; el.innerHTML = I('trash',16) + 'Sí, borrar con todo su contenido'; return; }
    const id = d.id; S.materias = S.materias.filter(m => m.id !== id); delete S.unidades[id];
    ['eventos','biblio','cards','preguntas','errores','viejos','horario','explicaciones'].forEach(k => S[k] = S[k].filter(x => x.materiaId !== id));
    S.materias.forEach(x => { if (x.correl) x.correl = x.correl.filter(c => c !== id); });
    [...S.fichas.farmacos, ...S.fichas.enfermedades, ...S.mnemos].forEach(x => { if (x.materiaId === id) x.materiaId = ''; });
    if (S.pomo.materiaId === id) S.pomo.materiaId = '';
    P.m = 'todas'; P.queue = []; P.quiz = null; P.cq = null; HS = null; if (SIM && !SIM.done && SIM.cfg.m === id){ clearInterval(simTick); SIM = null; }
    save(); closeModal(); go('materias'); },
  'mat-edit': () => { R.edit = !R.edit; DEL = null; render(); },
  'ed-del-topic': d => { const u = units(d.m).find(x => x.id === d.u); u.temas = u.temas.filter(x => x.id !== d.t); save(); render(); },
  'ed-del-unit': d => { if (DEL !== d.u){ DEL = d.u; return render(); }
    S.unidades[d.m] = units(d.m).filter(x => x.id !== d.u); S.eventos.forEach(e => e.unidades = e.unidades.filter(x => x !== d.u)); DEL = null; save(); render(); },
  'ed-move': d => { const a = units(d.m), i = a.findIndex(x => x.id === d.u), j = i + Number(d.d); if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; save(); render(); },
  'import-prog': d => modal(`<div class="row between"><h2>Importar programa</h2>${closeX()}</div>
    <p class="small muted">Pegá el programa de la materia tal como lo da la cátedra. Formato: una línea por unidad (que empiece con “Unidad” o termine en “:”) y debajo sus temas. Si está desordenado, tocá “Ordenar con IA” primero.</p>
    <form class="stack" style="gap:12px" data-form="import-prog" data-m="${d.m}">
    <textarea id="ip-t" style="min-height:200px" placeholder="Unidad 1: Generalidades&#10;- Planos y ejes anatómicos&#10;- Clasificación de los huesos&#10;Unidad 2: Miembro superior&#10;- Plexo braquial"></textarea>
    <div class="stack small" style="gap:6px"><label class="row" style="gap:8px"><input type="radio" name="ip-mode" id="ip-r" checked>Reemplazar las unidades actuales (se borra lo tildado y las fechas quedan sin unidades)</label><label class="row" style="gap:8px"><input type="radio" name="ip-mode" id="ip-a">Agregar al final de las actuales</label></div>
    <p class="small muted" id="ip-msg"></p>
    <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="ip-ai">${I('spark',16)}Ordenar con IA</button><button class="btn pri" type="submit">Importar</button></div></form>`),
  'ip-ai': async (d, el) => { const ta = $('#ip-t'), msg = $('#ip-msg');
    if (!ta.value.trim()){ msg.textContent = 'Primero pegá el programa.'; return; }
    if (!sample){ msg.textContent = 'Ordenar con IA funciona cuando abrís la app desde Claude. Mientras tanto podés usar el formato de arriba.'; return; }
    el.disabled = true; msg.textContent = 'Ordenando el programa…';
    try { const arr = await sample.json(`Convertí este programa de una materia de Medicina en una lista de unidades con sus temas. Mantené los nombres originales, acortá los temas muy largos a menos de 10 palabras y no inventes contenido. Respondé solo un JSON array: [{"unidad":"nombre","temas":["tema","tema"]}]\n\n"""${ta.value.slice(0, 30000)}"""`, { modelTier:'quick' });
      const ok = (Array.isArray(arr) ? arr : []).filter(x => x && x.unidad);
      ta.value = ok.map((u, i) => `Unidad ${i+1}: ${u.unidad}\n${(u.temas || []).map(t => '- ' + t).join('\n')}`).join('\n');
      msg.textContent = `Listo: ${ok.length} unidades. Revisalo y tocá “Importar”.`;
    } catch (e) { msg.textContent = e.code === 'invalid_json' ? 'La respuesta no vino en el formato esperado. Probá de nuevo.' : aiErr(e.code); }
    el.disabled = false; },
  'doc-del': (d, el) => { if (!el.dataset.armed){ el.dataset.armed = '1'; el.classList.add('confirm'); el.textContent = '¿Eliminar?'; return; } S.biblio = S.biblio.filter(x => x.id !== d.id); save(); render(); },
  'doc-sum': d => { const doc = S.biblio.find(x => x.id === d.id); aiSend(`Resumime el apunte “${doc.titulo}” en los puntos clave para estudiar y marcá lo que suelen tomar en los exámenes.`, `Texto del apunte:\n"""${doc.texto.slice(0, 25000)}"""`); },
  'doc-q': async (d, el) => { const doc = S.biblio.find(x => x.id === d.id), out = $('#ds-' + d.id);
    if (!sample){ out.textContent = 'Generar con IA funciona cuando abrís la app desde Claude.'; return; }
    el.disabled = true; out.textContent = 'Leyendo el apunte y armando preguntas…';
    try { const n = await genQuestions(mat(doc.materiaId), units(doc.materiaId), { texto: doc.texto, fuente: doc.titulo }); out.textContent = `Listo: ${n} preguntas nuevas. Las encontrás en Practicar → Cuestionarios.`; }
    catch (e) { out.textContent = e.code === 'invalid_json' ? 'La respuesta no vino en el formato esperado. Probá de nuevo.' : aiErr(e.code); }
    el.disabled = false; },
  'doc-cards': async (d, el) => { const doc = S.biblio.find(x => x.id === d.id), out = $('#ds-' + d.id), m = mat(doc.materiaId);
    if (!sample){ out.textContent = 'Crear flashcards con IA funciona cuando abrís la app desde Claude.'; return; }
    el.disabled = true; out.textContent = 'Buscando los términos clave del apunte…';
    try { const arr = await sample.json(`Del siguiente apunte de ${m.nombre} (carrera de Medicina), elegí los 8 términos más importantes para estudiar y escribí una definición breve y precisa de cada uno (una oración, basada en el apunte). Respondé solo un JSON array: [{"term":"término","def":"definición"}]\n\n"""${doc.texto.slice(0, 25000)}"""`);
      const have = new Set(S.cards.filter(c => c.materiaId === m.id).map(c => norm(c.term))); let n = 0;
      (Array.isArray(arr) ? arr : []).forEach(x => { if (!x || !x.term || !x.def || have.has(norm(x.term))) return; S.cards.push({ id: uid(), materiaId: m.id, u: (units(m.id)[0] || {}).id, term: String(x.term), def: String(x.def), propia:true, ia:true, box:1, ok:0, bad:0 }); have.add(norm(x.term)); n++; });
      save(); P.queue = []; out.textContent = `Listo: ${n} flashcards nuevas en ${m.nombre}.`; }
    catch (e) { out.textContent = e.code === 'invalid_json' ? 'La respuesta no vino en el formato esperado. Probá de nuevo.' : aiErr(e.code); }
    el.disabled = false; },
  notif: () => { const p = $('#notif'); if (!p.hidden){ p.hidden = true; return; } renderNotif(); p.hidden = false; },
  mazos: () => !cursando().length ? sinMaterias() : modal(`<div class="row between"><h2>Compartir mazos</h2>${closeX()}</div>
    <p class="small muted">Pasale tus flashcards a quien quieras con un código. La otra persona lo pega en “Importar” dentro de su app.</p>
    <h3>Compartir un mazo</h3>
    <div class="row" style="flex-wrap:nowrap"><select id="mz-m">${matOptions(P.m === 'todas' ? '' : P.m)}</select><button class="btn pri" data-act="mz-gen">Generar código</button></div>
    <div id="mz-out"></div>
    <h3 style="margin-top:8px">Importar un mazo</h3>
    <textarea id="mz-in" placeholder="Pegá acá el código que te pasaron (empieza con VDM1:)"></textarea>
    <div class="row" style="flex-wrap:nowrap"><select id="mz-dest" aria-label="Materia de destino">${matOptions(P.m === 'todas' ? '' : P.m)}</select><button class="btn" data-act="mz-imp">Importar</button></div>
    <p class="small" id="mz-msg"></p>`),
  'mz-gen': () => { const m = $('#mz-m').value, cs = S.cards.filter(c => c.materiaId === m && !c.img);
    const code = 'VDM1:' + btoa(unescape(encodeURIComponent(JSON.stringify({ n: mat(m).nombre, c: cs.map(c => [c.term, c.def]) }))));
    $('#mz-out').innerHTML = `<div class="note code" id="mz-code">${esc(code)}</div><div class="row" style="margin-top:8px"><span class="small muted">${cs.length} tarjetas de ${esc(mat(m).nombre)}</span><button class="btn sm" data-act="mz-copy" style="margin-left:auto">${I('copy',14)}Copiar código</button></div>`; },
  'mz-copy': (d, el) => { const box = $('#mz-code');
    const selectIt = () => { const r = document.createRange(); r.selectNodeContents(box); const s = getSelection(); s.removeAllRanges(); s.addRange(r); el.textContent = 'Seleccionado: copialo con Ctrl+C'; };
    try { navigator.clipboard.writeText(box.textContent).then(() => { el.innerHTML = I('check',14) + 'Copiado'; }, selectIt); } catch (e) { selectIt(); } },
  'mz-imp': () => { const msg = $('#mz-msg');
    try { const raw = $('#mz-in').value.trim(); if (!raw.startsWith('VDM1:')) throw 0;
      const data = JSON.parse(decodeURIComponent(escape(atob(raw.slice(5))))), dest = $('#mz-dest').value, list = Array.isArray(data.c) ? data.c : [];
      const have = new Set(S.cards.filter(c => c.materiaId === dest).map(c => norm(c.term))); let n = 0;
      list.forEach(([t, df]) => { if (!t || !df || have.has(norm(t))) return; S.cards.push({ id: uid(), materiaId: dest, u: (units(dest)[0] || {}).id, term: String(t), def: String(df), propia:true, compartida:true, box:1, ok:0, bad:0 }); have.add(norm(t)); n++; });
      save(); P.queue = []; render(); msg.style.color = 'var(--ok)';
      msg.textContent = `Listo: se importaron ${n} tarjetas${data.n ? ' del mazo de ' + data.n : ''}${list.length > n ? ' (las repetidas se saltearon)' : ''}.`;
    } catch (e) { msg.style.color = 'var(--danger)'; msg.textContent = 'El código no es válido. Revisá que esté completo y empiece con VDM1:'; } },
  'close-modal': closeModal,
  'q-pick': d => pickResult(+d.i),
  'ai-open': aiOpen, 'ai-close': aiClose,
  'ai-ask': d => { closeModal(); aiSend(d.q); }
};
const armed = (el, label) => { if (el.dataset.armed) return true; el.dataset.armed = '1'; if (el.classList.contains('icon-btn')){ el.classList.add('confirm'); el.textContent = label || '¿Eliminar?'; } else { el.classList.add('danger'); el.style.color = ''; el.innerHTML = I('trash',16) + (label || 'Sí, eliminar'); } return false; };
Object.assign(A, {
  more: () => modal(`<div class="row between"><h2>Más secciones</h2>${closeX()}</div><div class="more-grid">${NAV.filter(n => MORE.includes(n[0])).map(([v, l, i]) => `<button data-act="go" data-view="${v}">${I(i,22)}${l}</button>`).join('')}<button data-act="pomo-open">${I('timer',22)}Pomodoro</button></div>${HOST.user ? `<div class="row between" style="border-top:1px solid var(--line);padding-top:12px"><span class="small muted" style="min-width:0;overflow:hidden;text-overflow:ellipsis">${esc(HOST.user.email)}</span><button class="btn sm" data-act="logout">Cerrar sesión</button></div>` : ''}`),
  'p-open': d => { P.tab = d.tab; go('practicar'); },
  // estudiar hoy y errores
  'hs-start': d => { track('estudiar', d.src); startSession(d.src, P.m); P.tab = d.src === 'errores' ? 'errores' : 'hoy'; if (R.view !== 'practicar') go('practicar'); else { render(); window.scrollTo(0, 0); } },
  'hs-flip': () => { const it = HS && HS.items[HS.i]; if (!it || it.kind !== 'card') return; it.flipped = !it.flipped; const f = $('#hflip'); if (f) f.classList.toggle('on', it.flipped); setTimeout(render, 420); },
  'hs-card': d => { const it = HS.items[HS.i], c = S.cards.find(x => x.id === it.ref), ok = d.ok === '1'; if (!c) return hsAdvance();
    if (ok){ c.ok++; c.box = Math.min(5, c.box + 1); HS.ok++; } else { c.bad++; c.box = 1; HS.bad++; }
    errTrack('card', c.id, c.materiaId, ok); logH('flash', c.materiaId, c.u, c.term, ok); hsAdvance(); },
  'hs-pick': d => { const it = HS.items[HS.i]; if (it.pick !== null) return; const q = S.preguntas.find(x => x.id === it.ref); it.pick = +d.o; const ok = it.pick === 0; ok ? HS.ok++ : HS.bad++;
    errTrack('preg', q.id, q.materiaId, ok); logH('cuest', q.materiaId, q.u, q.q, ok); render(); },
  'hs-next': () => hsAdvance(),
  'hs-exit': () => { HS = null; render(); },
  'err-del': d => { S.errores = S.errores.filter(e => e.id !== d.id); save(); render(); },
  // simulacro
  'sim-start': () => { track('simulacro', P.simCfg.m); startSim(P.simCfg); render(); window.scrollTo(0, 0); },
  'sim-pick': d => { if (!SIM || SIM.done) return; SIM.items[SIM.i].pick = +d.o; SIM.armed = false; render(); },
  'sim-go': d => { if (!SIM || SIM.done) return; const i = +d.i; if (i < 0 || i >= SIM.items.length) return; SIM.i = i; SIM.armed = false; render(); },
  'sim-finish': () => { if (!SIM || SIM.done) return; const falta = SIM.items.filter(x => x.pick === null).length; if (falta && !SIM.armed){ SIM.armed = true; render(); return; } finishSim(false); render(); window.scrollTo(0, 0); },
  'sim-new': () => { SIM = null; render(); },
  'sim-retry': () => { const ids = SIM.items.map(x => x.id), cfg = SIM.cfg; startSim(cfg, ids); render(); window.scrollTo(0, 0); },
  // explicalo
  'fe-eval': async () => {
    const f = P.fe, tema = feTema(), words = f.texto.trim().split(/\s+/).filter(Boolean).length, msg = $('#fe-msg');
    if (!tema){ msg.textContent = 'Elegí o escribí el tema que vas a explicar.'; return; }
    if (words < 15){ msg.textContent = 'Escribí un poco más (al menos 15 palabras) para que la evaluación sirva.'; return; }
    const entry = { id: uid(), materiaId: f.m, temaId: f.tema && f.tema !== '__otro' ? f.tema : null, tema, texto: f.texto, res: null, t: Date.now() };
    if (!sample){ S.explicaciones.push(entry); markStudy(); save(); render(); const m2 = $('#fe-msg'); m2.style.color = 'var(--muted)'; m2.textContent = 'Guardé tu explicación. La evaluación con IA funciona cuando abrís la app desde Claude.'; return; }
    f.busy = true; render(); let err = null;
    try {
      const r = await sample.json(`Sos docente de ${matName(f.m)} en una facultad de Medicina. Un estudiante explicó con sus palabras el tema "${tema}" (técnica Feynman). Evaluá la explicación: exactitud, conceptos clave que faltan, errores conceptuales y claridad. Sé concreto y alentador, en español rioplatense con voseo.
Explicación del estudiante:
"""${f.texto.slice(0, 12000)}"""
Respondé solo un JSON así: {"puntaje": 7, "resumen": "una oración con la evaluación general", "bien": ["lo que explicó bien"], "falto": ["concepto clave que faltó"], "errores": ["afirmación incorrecta y cómo es en realidad"], "pregunta": "una pregunta de seguimiento para profundizar"}`);
      entry.res = { puntaje: Math.max(0, Math.min(10, Math.round(+r.puntaje || 0))), resumen: String(r.resumen || ''), bien: arr6(r.bien), falto: arr6(r.falto), errores: arr6(r.errores), pregunta: String(r.pregunta || '') };
      S.explicaciones.push(entry); f.res = entry.res; f.temaShown = tema; f.lastTemaId = entry.temaId; markStudy(); save();
    } catch (e) { err = aiFail(e); }
    f.busy = false; render(); if (err) $('#fe-msg').textContent = err;
  },
  'fe-view': d => { const h = S.explicaciones.find(x => x.id === d.id); if (!h) return;
    modal(`<div class="row between"><p class="eyebrow">${esc(matName(h.materiaId))} · ${fmtDate(h.t)}</p>${closeX()}</div><h2>${esc(h.tema)}</h2><div class="note" style="white-space:pre-wrap;max-height:200px;overflow:auto">${esc(h.texto)}</div>${h.res ? feResult(h.res, h.tema, false) : '<p class="small muted">Esta explicación no se evaluó con IA.</p>'}
      <div class="row"><button class="btn" data-act="fe-reuse" data-id="${h.id}">${I('edit',16)}Volver a explicarlo</button><button class="btn" style="color:var(--danger)" data-act="fe-del" data-id="${h.id}">${I('trash',16)}Eliminar</button></div>`); },
  'fe-reuse': d => { const h = S.explicaciones.find(x => x.id === d.id); if (!h) return; closeModal(); Object.assign(P.fe, { m: mat(h.materiaId) ? h.materiaId : P.fe.m, tema: h.temaId && topicById(h.temaId) ? h.temaId : '__otro', libre: h.tema, texto: '', res: null }); render(); },
  'fe-del': (d, el) => { if (!armed(el)) return; S.explicaciones = S.explicaciones.filter(x => x.id !== d.id); save(); closeModal(); render(); },
  'fe-mark': () => { const x = topicById(P.fe.lastTemaId); if (!x) return; x.t.ok = true; markStudy(); save(); toast(`Marcaste “${x.t.nombre}” como estudiado.`); render(); },
  'fe-new': () => { Object.assign(P.fe, { texto: '', res: null }); render(); const t = $('#fe-t'); t && t.focus(); },
  // exámenes anteriores
  'vj-new': d => vjForm(d.m),
  'vj-temas': d => { const v = S.viejos.find(x => x.id === d.id); if (v) vjForm(v.materiaId, v); },
  'vj-practice': d => { const v = S.viejos.find(x => x.id === d.id); if (!v) return; startCuest(v.materiaId, null, false, v.id); P.tab = 'cuest'; go('practicar'); },
  'vj-del': (d, el) => { if (!armed(el)) return; S.viejos = S.viejos.filter(x => x.id !== d.id); S.preguntas.forEach(q => { if (q.origen === d.id) delete q.origen; }); save(); render(); },
  'vj-ai': async (d, el) => {
    const v = S.viejos.find(x => x.id === d.id), out = $('#vs-' + d.id), m = mat(v.materiaId);
    if (!sample){ out.textContent = 'Extraer con IA funciona cuando abrís la app desde Claude.'; return; }
    el.disabled = true; out.textContent = 'Leyendo el examen y armando las preguntas…';
    try {
      const us = units(m.id);
      const r = await sample.json(`Este es el texto de un examen anterior de ${m.nombre} (carrera de Medicina). Extraé hasta 15 preguntas y convertí cada una en opción múltiple de 4 opciones (si ya es de opción múltiple, respetala; si es abierta, armá opciones plausibles). La PRIMERA opción siempre es la correcta. Asigná a cada pregunta la unidad y el tema que correspondan usando estos ids:
${us.map(u => `- Unidad [${u.id}] ${u.nombre}: ${u.temas.map(t => `[${t.id}] ${t.nombre}`).join(', ')}`).join('\n') || '- (sin unidades cargadas)'}
Respondé solo un JSON así: {"preguntas":[{"u":"id de unidad","t":"id de tema","q":"pregunta","ops":["correcta","incorrecta","incorrecta","incorrecta"],"exp":"explicación breve"}]}

Texto del examen:
"""${v.texto.slice(0, 30000)}"""`);
      const list = (r && Array.isArray(r.preguntas) ? r.preguntas : Array.isArray(r) ? r : []).filter(x => x && x.q && Array.isArray(x.ops) && x.ops.length === 4);
      const tIds = new Set(us.flatMap(u => u.temas.map(t => t.id)));
      list.forEach(x => { S.preguntas.push({ id: uid(), materiaId: m.id, u: us.some(u => u.id === x.u) ? x.u : (us[0] || {}).id, q: String(x.q), ops: x.ops.map(String), a: 0, exp: String(x.exp || ''), origen: v.id }); if (tIds.has(x.t) && !v.temas.includes(x.t)) v.temas.push(x.t); });
      save(); render(); const o2 = $('#vs-' + d.id); if (o2) o2.textContent = `Listo: ${list.length} preguntas nuevas y los temas marcados.`;
    } catch (e) { out.textContent = aiFail(e); el.disabled = false; }
  },
  // fichas
  'fi-tab': d => { FI.tab = d.tab; FI.q = ''; render(); },
  'fi-new': () => FI.tab === 'mne' ? mnemoForm(null) : fichaForm(FI.tab, null),
  'fi-open': d => { const r = fichaFind(d.id); if (!r) return; const T = FI_TIPOS[r.k], x = r.x;
    modal(`<div class="row between"><p class="eyebrow">${T.lbl}${x[T.sub] ? ' · ' + esc(x[T.sub]) : ''}</p>${closeX()}</div><h2>${esc(x.nombre)}</h2>
      <dl class="dl">${T.campos.filter(([k]) => x[k]).map(([k, l]) => `<div><dt>${l}</dt><dd>${esc(x[k])}</dd></div>`).join('') || '<p class="small muted">Esta ficha todavía no tiene contenido.</p>'}</dl>
      <p class="small" id="fi-msg"></p>
      <div class="row"><button class="btn pri" data-act="fi-cards" data-id="${x.id}">${I('cards',16)}Crear flashcards</button><button class="btn" data-act="ai-ask" data-q="${esc(`Explicame ${x.nombre} de forma simple y tomame 3 preguntas tipo examen sobre ${r.k === 'farm' ? 'este fármaco' : 'esta enfermedad'}.`)}">${I('spark',16)}Preguntale a la IA</button><button class="btn" data-act="fi-edit" data-id="${x.id}">${I('edit',16)}Editar</button><button class="btn" style="color:var(--danger)" data-act="fi-del" data-id="${x.id}">${I('trash',16)}Eliminar</button></div>`); },
  'fi-edit': d => { const r = fichaFind(d.id); if (r) fichaForm(r.k, r.x); },
  'fi-del': (d, el) => { if (!armed(el)) return; ['farmacos', 'enfermedades'].forEach(k => { S.fichas[k] = S.fichas[k].filter(x => x.id !== d.id); }); save(); closeModal(); render(); },
  'fi-cards': d => { const r = fichaFind(d.id); if (!r) return; const T = FI_TIPOS[r.k], x = r.x, msg = $('#fi-msg');
    const mId = mat(x.materiaId) ? x.materiaId : (cursando()[0] || {}).id;
    if (!mId){ msg.textContent = 'Primero agregá una materia.'; return; }
    const have = new Set(S.cards.filter(c => c.materiaId === mId).map(c => norm(c.term))), uId = guessUnit(mId, x, T); let n = 0;
    T.campos.forEach(([k, l]) => { if (!x[k]) return; const term = `${x.nombre}: ${l.toLowerCase()}`; if (have.has(norm(term))) return; S.cards.push({ id: uid(), materiaId: mId, u: uId, term, def: x[k], propia: true, ficha: x.id, box: 1, ok: 0, bad: 0 }); n++; });
    save(); P.queue = []; msg.style.color = 'var(--ok)'; msg.textContent = n ? `Listo: ${n} flashcards nuevas en ${matName(mId)}.` : 'Las flashcards de esta ficha ya estaban creadas.'; },
  'fi-ai': async (d, el) => {
    const T = FI_TIPOS[d.k], nombre = $('#ff-nombre').value.trim(), msg = $('#ff-msg');
    if (!nombre){ msg.textContent = 'Escribí primero el nombre.'; return; }
    if (!sample){ msg.textContent = 'Completar con IA funciona cuando abrís la app desde Claude.'; return; }
    el.disabled = true; msg.textContent = 'Buscando la información…';
    try {
      const keys = [T.sub, ...T.campos.map(c => c[0])], ej = Object.fromEntries(keys.map(k => [k, '…']));
      const r = await sample.json(`Armá una ficha de estudio para estudiantes de Medicina sobre ${d.k === 'farm' ? 'el fármaco' : 'la enfermedad'} "${nombre}". Español rioplatense, frases cortas y precisas, información verificable de nivel universitario. Campos: ${[T.subLbl, ...T.campos.map(c => c[1])].join(', ')}. Respondé solo un JSON con estas claves: ${JSON.stringify(ej)}`);
      let n = 0; keys.forEach(k => { const v = r && r[k]; const box = k === T.sub ? $('#ff-sub') : $('#ff-' + k); if (v && box){ box.value = Array.isArray(v) ? v.join('; ') : String(v); n++; } });
      msg.textContent = n ? 'Listo. Revisá la información antes de guardar: la IA puede equivocarse.' : 'No encontré información para completar. Revisá el nombre.';
    } catch (e) { msg.textContent = aiFail(e); }
    el.disabled = false;
  },
  'mn-edit': d => { const x = S.mnemos.find(m => m.id === d.id); if (x) mnemoForm(x); },
  'mn-del': (d, el) => { if (!armed(el)) return; S.mnemos = S.mnemos.filter(x => x.id !== d.id); save(); render(); },
  'mn-ai': async (d, el) => {
    const titulo = $('#mf-t').value.trim(), msg = $('#mf-msg');
    if (!titulo){ msg.textContent = 'Escribí primero qué querés recordar.'; return; }
    if (!sample){ msg.textContent = 'Proponer con IA funciona cuando abrís la app desde Claude.'; return; }
    el.disabled = true; msg.textContent = 'Pensando una mnemotecnia…';
    try {
      const r = await sample.json(`Proponé una mnemotecnia en español rioplatense, fácil de recordar, para que un estudiante de Medicina se acuerde de: "${titulo}". Verificá que el contenido sea correcto y completo. Respondé solo un JSON así: {"texto": "la frase o regla", "detalle": "qué significa cada parte, en orden"}`);
      if (r && r.texto){ $('#mf-x').value = String(r.texto); $('#mf-d').value = String(r.detalle || ''); msg.textContent = 'Listo. Revisala antes de guardar: la IA puede equivocarse.'; } else msg.textContent = 'No se me ocurrió ninguna. Probá describirlo de otra forma.';
    } catch (e) { msg.textContent = aiFail(e); }
    el.disabled = false;
  },
  // referencia
  'rf-tab': d => { RF.tab = d.tab; render(); },
  // horario
  'cls-new': () => clsForm(null),
  'cls-edit': d => { const c = S.horario.find(x => x.id === d.id); if (c) clsForm(c); },
  'cls-del': (d, el) => { if (!armed(el, 'Sí, eliminar clase')) return; S.horario = S.horario.filter(x => x.id !== d.id); save(); closeModal(); render(); },
  // pomodoro
  pomo: () => { const p = $('#pomo-panel'); if (!p.hidden){ p.hidden = true; return; } $('#notif').hidden = true; renderPomo(); p.hidden = false; },
  'pomo-open': () => { closeModal(); $('#notif').hidden = true; renderPomo(); $('#pomo-panel').hidden = false; },
  'pm-toggle': () => {
    if (!PM.actx){ try { PM.actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { PM.actx = null; } }
    try { PM.actx && PM.actx.resume && PM.actx.resume(); } catch (e) {}
    if (PM.running){ PM.left = Math.max(0, Math.round((PM.endsAt - Date.now()) / 1000)); PM.running = false; }
    else { PM.endsAt = Date.now() + PM.left * 1000; PM.running = true; }
    renderPomo(); pomoBtn(); },
  'pm-reset': () => { if (PM.phase === 'foco'){ const el = pmFull() - (PM.running ? Math.round((PM.endsAt - Date.now()) / 1000) : PM.left); if (el >= 300) logSesion(el / 60); } pomoSet('foco', false); renderPomo(); pomoBtn(); },
  'pm-skip': () => { if (PM.phase === 'foco'){ const el = pmFull() - (PM.running ? Math.round((PM.endsAt - Date.now()) / 1000) : PM.left); if (el >= 300) logSesion(el / 60); pomoSet('pausa', false); } else pomoSet('foco', false); renderPomo(); pomoBtn(); },
  'pm-preset': d => { S.pomo.foco = +d.f; S.pomo.pausa = +d.p; save(); if (!PM.running) PM.left = pmFull(); renderPomo(); pomoBtn(); }
});
document.addEventListener('click', e => {
  const t = e.target.closest('[data-act]');
  if (!e.target.closest('.search')) $('#qres').hidden = true;
  if (!e.target.closest('#pomo-panel') && !e.target.closest('#pomo')) $('#pomo-panel').hidden = true;
  if ((!e.target.closest('#notif') && !e.target.closest('#bell')) || (t && t.closest('#notif'))) $('#notif').hidden = true;
  if (e.target.id === 'modal') return closeModal();
  if (!t || t.tagName === 'INPUT') return;
  const fn = A[t.dataset.act]; if (fn){ e.preventDefault(); fn(t.dataset, t, e); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('#modal').hidden) closeModal();
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"][data-act]')){ e.preventDefault(); e.target.click(); }
});
document.addEventListener('change', e => {
  const t = e.target, k = t.dataset.change; if (!k) return;
  if (k === 'topic'){ const u = units(t.dataset.m).flatMap(u => u.temas).find(x => x.id === t.dataset.t); u.ok = t.checked; if (t.checked) markStudy(); save(); render(); }
  if (k === 'pm'){ P.m = t.value; P.queue = []; P.quiz = null; P.ok = P.bad = 0; render(); }
  if (k === 'estado'){ const m = mat(t.dataset.id); m.estado = t.value; if ((m.estado === 'cursando' || m.estado === 'regular') && !m.color) m.color = '#3D7F74'; if (m.estado === 'regular' && !m.regularHasta) m.regularHasta = addD(730); save(); render(); }
  if (k === 'anio'){ S.perfil.anioActual = +t.value; save(); render(); }
  if (k === 'upload') handleUpload(t);
  if (k === 'ed-unit'){ const u = units(t.dataset.m).find(x => x.id === t.dataset.u); if (u && t.value.trim()) u.nombre = t.value.trim(); save(); }
  if (k === 'ed-topic'){ const u = units(t.dataset.m).find(x => x.id === t.dataset.u), tp = u && u.temas.find(x => x.id === t.dataset.t); if (tp && t.value.trim()) tp.nombre = t.value.trim(); save(); }
  if (k === 'notif-dias'){ S.notif.dias = +t.value; save(); renderBell(); renderNotif(); }
  if (k === 'nc-img'){ const f = t.files[0]; if (!f) return; compressImg(f).then(u => { NC = { img:u, boxes:[] }; occEditor(); }).catch(() => { $('#nc-occ').textContent = 'No se pudo abrir la imagen.'; }); }
});
document.addEventListener('submit', e => {
  const f = e.target, k = f.dataset.form; if (!k) return; e.preventDefault();
  if (k === 'quiz'){ const q = P.quiz, c = S.cards.find(x => x.id === q.id); q.answer = $('#qa').value; if (!q.answer.trim()) return;
    q.res = gradeQuiz(c, q.answer); q.res.ok ? (P.ok++, c.ok++, c.box = Math.min(5, c.box + 1)) : (P.bad++, c.bad++, c.box = 1); q.errInfo = errTrack('card', c.id, c.materiaId, q.res.ok); logH('quiz', c.materiaId, c.u, c.term, q.res.ok); render(); }
  if (k === 'card'){ const m = $('#nc-m').value, term = $('#nc-t').value.trim(), def = $('#nc-d').value.trim();
    if (!def && !NC.img){ $('#nc-err').textContent = 'Escribí una definición o agregá una imagen.'; return; }
    if (NC.img && !NC.boxes.length){ $('#nc-err').textContent = 'Tapá al menos una zona de la imagen arrastrando sobre ella.'; return; }
    const card = { id: uid(), materiaId: m, u: (units(m)[0] || {}).id, term, def, propia:true, box:1, ok:0, bad:0 };
    if (NC.img){ card.img = NC.img; card.boxes = NC.boxes; }
    S.cards.push(card); save(); closeModal(); P.queue = []; render(); }
  if (k === 'edit-materia'){ const m = mat(f.dataset.id); m.nombre = $('#em-n').value.trim() || m.nombre; m.anio = +$('#em-a').value; m.estado = $('#em-e').value; m.nota = +$('#em-nota').value || undefined; m.color = $('#em-c').value;
    m.regularHasta = $('#em-reg').value || (m.estado === 'regular' ? addD(730) : undefined); m.correl = [...document.querySelectorAll('.em-cor:checked')].map(x => x.value); save(); closeModal(); render(); }
  if (k === 'ed-add-topic'){ const inp = f.querySelector('input'), v = inp.value.trim(); if (!v) return;
    units(f.dataset.m).find(x => x.id === f.dataset.u).temas.push({ id: uid(), nombre: v, ok:false }); save(); render();
    const n = document.getElementById('en-' + f.dataset.u); n && n.focus(); }
  if (k === 'import-prog'){ const us = parseProgram($('#ip-t').value), m = f.dataset.m;
    if (!us.length){ $('#ip-msg').textContent = 'No encontré unidades ni temas en el texto.'; return; }
    if ($('#ip-r').checked){ S.unidades[m] = us; S.eventos.forEach(e => { if (e.materiaId === m) e.unidades = []; }); } else S.unidades[m] = [...units(m), ...us];
    save(); closeModal(); R.tab = 'unidades'; R.edit = true; render(); }
  if (k === 'materia'){ const n = $('#nm-n').value.trim(), e2 = $('#nm-e').value, colors = ['#3D7F74','#B07A1F','#5B6FC2','#A24D74','#4F8A3A']; S.materias.push({ id: uid(), nombre: n, anio: +$('#nm-a').value, estado: e2, nota: +$('#nm-nota').value || undefined, color: colors[S.materias.length % colors.length], correl: [], regularHasta: e2 === 'regular' ? addD(730) : undefined }); save(); closeModal(); render(); }
  if (k === 'unidad'){ const m = f.dataset.m; (S.unidades[m] = S.unidades[m] || []).push({ id: uid(), nombre: $('#nu-n').value.trim(), temas: $('#nu-t').value.split('\n').map(s => s.trim()).filter(Boolean).map(s => ({ id: uid(), nombre: s, ok:false })) }); save(); closeModal(); render(); }
  if (k === 'evento'){ const data = { tipo: $('#ne-t').value, titulo: $('#ne-n').value.trim(), fecha: $('#ne-f').value, unidades: [...document.querySelectorAll('.ne-u:checked')].map(x => x.value) };
    const ex = f.dataset.id && S.eventos.find(x => x.id === f.dataset.id);
    if (ex) Object.assign(ex, data); else S.eventos.push({ id: uid(), materiaId: f.dataset.m, hecho:false, ...data });
    save(); closeModal(); render(); }
});
/* formularios y campos de la versión 3 */
document.addEventListener('change', e => {
  const t = e.target, k = t.dataset.change; if (!k) return;
  if (k === 'sim-cfg'){ const c = P.simCfg, prevM = c.m;
    c.m = $('#sc-m').value; c.scope = c.m !== prevM ? '' : $('#sc-s').value; c.n = +$('#sc-n').value; c.casos = $('#sc-c').checked;
    c.min = t.id === 'sc-n' ? Math.round(c.n * 1.5) : Math.max(1, Math.min(300, Math.round(+$('#sc-t').value) || 1)); render(); }
  if (k === 'fe-m'){ P.fe.m = t.value; P.fe.tema = ''; render(); }
  if (k === 'fe-tema'){ P.fe.tema = t.value; render(); if (t.value === '__otro'){ const l = $('#fe-libre'); l && l.focus(); } }
  if (k === 'pm-m'){ S.pomo.materiaId = t.value; save(); }
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'fe-t'){ P.fe.texto = t.value; const w = t.value.trim() ? t.value.trim().split(/\s+/).length : 0, wc = $('#fe-wc'); if (wc) wc.textContent = `${w} palabras${w < 40 ? ' · conviene escribir al menos 40' : ''}`; }
  if (t.id === 'fe-libre') P.fe.libre = t.value;
  if (t.id === 'fi-q'){ FI.q = t.value; $('#fi-list').innerHTML = fichaList(); }
  if (t.id === 'rf-q'){ RF.q = t.value; $('#rf-list').innerHTML = labTable(); }
  if (t.dataset && t.dataset.cin){ RF.vals[t.id] = t.value; runCalc(t.dataset.cin); }
});
document.addEventListener('submit', e => {
  const f = e.target, k = f.dataset.form; if (!k) return;
  if (k === 'ficha'){ const T = FI_TIPOS[f.dataset.k], nombre = $('#ff-nombre').value.trim(); if (!nombre) return;
    const data = { nombre, [T.sub]: $('#ff-sub').value.trim(), materiaId: $('#ff-m').value }; T.campos.forEach(([c]) => { data[c] = $('#ff-' + c).value.trim(); });
    const ex = f.dataset.id && fichaFind(f.dataset.id);
    if (ex) Object.assign(ex.x, data); else S.fichas[T.key].push({ id: uid(), ...data });
    save(); closeModal(); FI.tab = f.dataset.k; render(); if (ex) A['fi-open']({ id: ex.x.id }); }
  if (k === 'mnemo'){ const titulo = $('#mf-t').value.trim(), texto = $('#mf-x').value.trim(); if (!titulo || !texto) return;
    const data = { titulo, texto, detalle: $('#mf-d').value.trim(), materiaId: $('#mf-m').value }, ex = f.dataset.id && S.mnemos.find(x => x.id === f.dataset.id);
    if (ex) Object.assign(ex, data); else S.mnemos.push({ id: uid(), ...data }); save(); closeModal(); render(); }
  if (k === 'clase'){ const desde = $('#cl-desde').value, hasta = $('#cl-hasta').value;
    if (!desde || !hasta || hasta <= desde){ $('#cl-err').textContent = 'La hora de fin tiene que ser posterior a la de inicio.'; return; }
    const data = { materiaId: $('#cl-m').value, dia: +$('#cl-d').value, desde, hasta, tipo: $('#cl-t').value, lugar: $('#cl-l').value.trim() }, ex = f.dataset.id && S.horario.find(x => x.id === f.dataset.id);
    if (ex) Object.assign(ex, data); else S.horario.push({ id: uid(), ...data }); save(); closeModal(); render(); }
  if (k === 'viejo'){ (async () => {
    const temas = [...document.querySelectorAll('.vj-c:checked')].map(x => x.value);
    if (f.dataset.id){ const v = S.viejos.find(x => x.id === f.dataset.id); if (v) v.temas = temas; save(); closeModal(); render(); return; }
    const titulo = $('#vj-t').value.trim(); if (!titulo) return;
    let texto = $('#vj-x').value.trim(); const file = $('#vj-f').files[0], btn = f.querySelector('[type=submit]');
    if (file){ btn.disabled = true; btn.textContent = 'Leyendo el archivo…';
      try { const ext = (file.name.split('.').pop() || '').toLowerCase(); const tx = ext === 'pdf' ? (await pdfText(file)).text : (await file.text()); texto = (texto + '\n' + tx).trim(); }
      catch (err) { $('#vj-msg').textContent = 'No se pudo leer el archivo. Podés pegar el texto en el recuadro.'; btn.disabled = false; btn.textContent = 'Guardar'; return; } }
    S.viejos.push({ id: uid(), materiaId: f.dataset.m, titulo, temas, texto: texto ? texto.slice(0, 40000) : undefined, t: Date.now() });
    save(); closeModal(); render(); toast(texto ? 'Examen guardado. Ahora podés extraer sus preguntas con IA.' : 'Examen guardado.');
  })(); }
});

/* ---------- asistencia: cada estudiante configura cómo la cuenta su cátedra ---------- */
// m.asist = { modo:'junta'|'tipo', min:75, tipos:{ Práctico:{ cuenta:true, min:75 } }, registros:[{ id, fecha, tipo, presente, claseId }], base:{ clave:{ fui, total } } }
const ASIST_MIN = 75;
function asistBuckets(m){
  const a = m.asist; if (!a) return [];
  const keys = a.modo === 'tipo' ? Object.keys(a.tipos || {}).filter(k => a.tipos[k].cuenta) : ['__todas'];
  return keys.map(k => {
    const recs = (a.registros || []).filter(r => k === '__todas' || r.tipo === k), b = (a.base || {})[k] || { fui:0, total:0 };
    const fui = Math.max(0, b.fui + recs.filter(r => r.presente).length), total = Math.max(0, b.total + recs.length);
    const min = Math.min(100, Math.max(1, k === '__todas' ? a.min : a.tipos[k].min)) / 100, p = total ? fui / total : null;
    let estado = 'sin', puede = 0, recuperar = 0;
    if (total){
      if (p >= min - 1e-9){ puede = Math.max(0, Math.floor(fui / min - total + 1e-9)); estado = puede >= 2 ? 'ok' : 'limite'; }
      else { estado = 'bajo'; recuperar = min >= 1 ? Infinity : Math.ceil((min * total - fui) / (1 - min) - 1e-9); }
    }
    return { k, nombre: k === '__todas' ? 'Todas las clases' : k, fui, total, p, min, estado, puede, recuperar, recs };
  });
}
const asistColor = b => b.estado === 'bajo' ? 'var(--danger)' : b.estado === 'limite' ? 'var(--soon)' : b.estado === 'ok' ? 'var(--ok)' : 'var(--muted)';
function asistResumen(m){
  const bs = asistBuckets(m).filter(b => b.total); if (!bs.length) return '';
  const peor = bs.reduce((a, b) => (b.p - b.min) < (a.p - a.min) ? b : a);
  return `<div class="row small" style="gap:6px;color:${asistColor(peor)};font-weight:600">${I('check',14)}Asistencia ${Math.round(peor.p * 100)} %${bs.length > 1 ? ` <span class="muted" style="font-weight:500">(${esc(peor.nombre)})</span>` : ''}</div>`;
}
function asistCard(b){
  const pc = b.p === null ? 0 : Math.round(b.p * 100), mn = Math.round(b.min * 100), col = asistColor(b);
  const txt = b.estado === 'sin' ? 'Todavía no hay clases registradas.'
    : b.estado === 'bajo' ? (b.recuperar === Infinity ? 'Se pide el 100 % y ya faltaste a alguna clase: consultá con la cátedra.' : `Estás por debajo del mínimo. Para recuperarte necesitás ir a ${b.recuperar} ${b.recuperar === 1 ? 'clase seguida' : 'clases seguidas'}.`)
    : b.puede === 0 ? 'Estás justo en el límite: si faltás a una clase más quedás por debajo del mínimo.'
    : `Podés faltar a ${b.puede} ${b.puede === 1 ? 'clase más' : 'clases más'} sin bajar del mínimo.`;
  return `<div class="card stack" style="gap:12px"><div class="row between"><h3>${esc(b.nombre)}</h3><span class="small muted">Mínimo ${mn} %</span></div>
    <div class="row" style="gap:16px;flex-wrap:nowrap">${ring(pc, 72, b.estado === 'sin' ? 'var(--line)' : col)}<div style="min-width:0"><p><b class="num" style="font-size:1.25rem">${b.fui}</b> <span class="muted">de ${b.total} ${b.total === 1 ? 'clase' : 'clases'}</span></p><p class="small" style="color:${col};font-weight:600;margin-top:2px">${txt}</p></div></div>
    <div class="bar" style="position:relative" title="La línea marca el mínimo"><i style="width:${pc}%;background:${col}"></i><span style="position:absolute;left:${mn}%;top:0;bottom:0;width:2px;background:var(--fg)"></span></div></div>`;
}
function asistTab(m){
  const a = m.asist;
  if (!a) return `<div class="card stack" style="gap:12px;max-width:640px"><h2>Asistencia</h2><p class="muted small">Cada cátedra cuenta la asistencia a su manera. Configurá cómo es en ${esc(m.nombre)} y la app te muestra tu porcentaje y cuántas clases podés faltar sin quedar libre.</p><button class="btn pri" style="align-self:flex-start" data-act="as-cfg" data-m="${m.id}">${I('check',16)}Configurar asistencia</button></div>`;
  const bs = asistBuckets(m), recs = (a.registros || []).slice().sort((x, y) => y.fecha.localeCompare(x.fecha)).slice(0, 25);
  return `<div class="stack" style="gap:14px">
    ${bs.length ? `<div class="grid ${bs.length > 1 ? 'g2' : ''}">${bs.map(asistCard).join('')}</div>` : '<div class="empty">No elegiste ningún tipo de clase para contar. Tocá “Cambiar cómo se cuenta”.</div>'}
    ${bs.length ? `<div class="card stack" style="gap:10px"><h3>Registrar una clase</h3>
      <form class="row" data-form="as-add" data-m="${m.id}"><input type="date" id="as-f" value="${iso(TODAY)}" max="${iso(TODAY)}" style="width:auto" aria-label="Fecha de la clase">${a.modo === 'tipo' ? `<select id="as-t" style="width:auto" aria-label="Tipo de clase">${bs.map(b => `<option value="${esc(b.k)}">${esc(b.k)}</option>`).join('')}</select>` : ''}
        <button class="btn" type="submit" data-p="1">${I('check',16)}Fui</button><button class="btn" type="submit" data-p="0">${I('x',16)}Falté</button></form>
      <p class="small muted">Si cargaste tu horario, también podés marcarlo desde Inicio, en “Hoy en la facu”.</p></div>` : ''}
    <div class="card"><div class="card-h"><h3>Clases registradas</h3><span class="small muted">${(a.registros || []).length}</span></div>
      ${recs.length ? recs.map(r => `<div class="weak" style="grid-template-columns:minmax(0,1fr) auto auto"><span style="text-transform:capitalize">${fmtLong(r.fecha)}${r.tipo ? ` <span class="small muted" style="text-transform:none">· ${esc(r.tipo)}</span>` : ''}</span><button class="pill ${r.presente ? 'p-ok' : 'p-urgent'}" style="border:0;cursor:pointer" data-act="as-toggle" data-m="${m.id}" data-id="${r.id}" title="Tocá para cambiarlo">${r.presente ? 'Fui' : 'Falté'}</button><button class="icon-btn" data-act="as-del" data-m="${m.id}" data-id="${r.id}" aria-label="Borrar registro">${I('x',14)}</button></div>`).join('')
        : '<p class="small muted">Todavía no registraste clases. Si ya venías cursando, cargá lo que llevás con “Editar números”.</p>'}</div>
    <div class="row">${bs.length ? `<button class="btn" data-act="as-base" data-m="${m.id}">${I('edit',16)}Editar números</button>` : ''}<button class="btn ghost" data-act="as-cfg" data-m="${m.id}">Cambiar cómo se cuenta</button></div>
  </div>`;
}
function asistForm(m){
  const a = m.asist || { modo:'junta', min:ASIST_MIN, tipos:{} };
  const tipos = [...new Set(['Teórico', 'Práctico', ...S.horario.filter(c => c.materiaId === m.id).map(c => c.tipo), ...Object.keys(a.tipos || {})])];
  const opt = (v, t, d) => `<label class="auth-opt" style="flex-direction:row;gap:10px;align-items:flex-start;cursor:pointer"><input type="radio" name="as-modo" value="${v}" ${(a.modo === 'tipo') === (v === 'tipo') ? 'checked' : ''} data-change="as-modo" style="margin-top:3px"><span><b style="color:var(--fg)">${t}</b><br>${d}</span></label>`;
  modal(`<div class="row between"><h2>Asistencia de ${esc(m.nombre)}</h2>${closeX()}</div>
    <form class="stack" style="gap:14px" data-form="as-cfg" data-m="${m.id}">
      <fieldset class="stack" style="gap:8px;border:0;padding:0;margin:0"><legend class="small" style="font-weight:600;margin-bottom:6px">¿Cómo la cuenta la cátedra?</legend>
        ${opt('junta', 'Todas las clases juntas', 'Un solo porcentaje con todas las clases.')}
        ${opt('tipo', 'Por tipo de clase', 'Por ejemplo, si los prácticos son obligatorios y los teóricos no.')}</fieldset>
      <div id="as-junta" ${a.modo === 'tipo' ? 'hidden' : ''}><label class="f">Asistencia mínima (%)<input type="number" id="as-min" min="1" max="100" value="${a.min || ASIST_MIN}" style="max-width:120px"></label></div>
      <div id="as-tipo" class="stack" style="gap:8px" ${a.modo === 'tipo' ? '' : 'hidden'}><p class="small muted">Marcá qué tipos de clase se cuentan y el mínimo de cada uno.</p>
        ${tipos.map(t => { const tt = (a.tipos || {})[t] || { cuenta: t === 'Práctico', min: ASIST_MIN }; return `<div class="row" style="gap:10px;flex-wrap:nowrap"><label class="row small" style="gap:8px;flex:1;flex-wrap:nowrap"><input type="checkbox" class="as-tc" value="${esc(t)}" ${tt.cuenta ? 'checked' : ''}>${esc(t)}</label><input type="number" class="as-tm" data-t="${esc(t)}" min="1" max="100" value="${tt.min}" style="width:90px" aria-label="Mínimo para ${esc(t)}"><span class="small muted">%</span></div>`; }).join('')}</div>
      <p class="note">Muchas cátedras piden 75 %, pero cada una tiene su regla: revisala en el programa de la materia.</p>
      <p class="small" id="as-err" style="color:var(--danger)"></p>
      <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></form>`);
}
function asistBaseForm(m){
  const bs = asistBuckets(m);
  modal(`<div class="row between"><h2>Editar números</h2>${closeX()}</div>
    <form class="stack" style="gap:14px" data-form="as-base" data-m="${m.id}">
      <p class="small muted">Poné cuántas clases hubo hasta hoy y a cuántas fuiste. Sirve para cargar lo que ya llevabas o corregir un error.</p>
      ${bs.map((b, i) => `<div class="stack" style="gap:6px">${bs.length > 1 ? `<b class="small">${esc(b.nombre)}</b>` : ''}<div class="grid g2" style="gap:10px"><label class="f">Clases que hubo<input type="number" min="0" id="ab-t-${i}" value="${b.total}"></label><label class="f">Clases a las que fuiste<input type="number" min="0" id="ab-f-${i}" value="${b.fui}"></label></div></div>`).join('')}
      <p class="small" id="ab-err" style="color:var(--danger)"></p>
      <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></form>`);
}
function clsRowHoy(c){
  const m = mat(c.materiaId), a = m && m.asist;
  const cuenta = a && (a.modo !== 'tipo' || (a.tipos[c.tipo] && a.tipos[c.tipo].cuenta));
  if (!cuenta) return clsRow(c, true);
  const r = (a.registros || []).find(x => x.claseId === c.id && x.fecha === iso(TODAY));
  return `<div class="stack" style="gap:6px">${clsRow(c, true)}<div class="row" style="gap:6px;padding-left:20px">${r
    ? `<span class="pill ${r.presente ? 'p-ok' : 'p-urgent'}">${I(r.presente ? 'check' : 'x', 12)}${r.presente ? 'Fuiste' : 'Faltaste'}</span><button class="btn sm ghost" data-act="as-del" data-m="${m.id}" data-id="${r.id}">Deshacer</button>`
    : `<span class="small muted">¿Fuiste?</span><button class="btn sm" data-act="as-hoy" data-c="${c.id}" data-p="1">${I('check',14)}Fui</button><button class="btn sm" data-act="as-hoy" data-c="${c.id}" data-p="0">${I('x',14)}Falté</button>`}</div></div>`;
}
const asistRec = (m, id) => ((m.asist || {}).registros || []).find(r => r.id === id);
Object.assign(A, {
  'as-cfg': d => { const m = mat(d.m); if (m) asistForm(m); },
  'as-base': d => { const m = mat(d.m); if (m) asistBaseForm(m); },
  'as-hoy': d => { const c = S.horario.find(x => x.id === d.c), m = c && mat(c.materiaId); if (!m || !m.asist) return;
    m.asist.registros.push({ id: uid(), fecha: iso(TODAY), tipo: c.tipo, presente: d.p === '1', claseId: c.id }); save(); track('asistencia', d.p === '1' ? 'fui' : 'falte'); render(); },
  'as-del': d => { const m = mat(d.m); if (!m || !m.asist) return; m.asist.registros = m.asist.registros.filter(r => r.id !== d.id); save(); render(); },
  'as-toggle': d => { const m = mat(d.m), r = m && asistRec(m, d.id); if (!r) return; r.presente = !r.presente; save(); render(); }
});
document.addEventListener('change', e => {
  if (e.target.dataset.change !== 'as-modo') return;
  const tipo = e.target.value === 'tipo'; $('#as-junta').hidden = tipo; $('#as-tipo').hidden = !tipo;
});
document.addEventListener('submit', e => {
  const f = e.target, k = f.dataset.form; if (!['as-cfg', 'as-add', 'as-base'].includes(k)) return;
  const m = mat(f.dataset.m); if (!m) return;
  const clamp = v => Math.min(100, Math.max(1, Math.round(+v) || ASIST_MIN));
  if (k === 'as-cfg'){
    const modo = (f.querySelector('[name=as-modo]:checked') || {}).value === 'tipo' ? 'tipo' : 'junta', prev = m.asist || {};
    const tipos = {}; f.querySelectorAll('.as-tc').forEach(ch => { const inp = f.querySelector(`.as-tm[data-t="${CSS.escape(ch.value)}"]`); tipos[ch.value] = { cuenta: ch.checked, min: clamp(inp && inp.value) }; });
    if (modo === 'tipo' && !Object.values(tipos).some(t => t.cuenta)){ $('#as-err').textContent = 'Marcá al menos un tipo de clase que se cuente.'; return; }
    m.asist = { modo, min: clamp($('#as-min').value), tipos, registros: prev.registros || [], base: prev.base || {} };
    save(); track('asistencia', 'config'); closeModal(); R.tab = 'asist'; render(); toast('Listo, ya se calcula tu asistencia.');
  }
  if (k === 'as-add'){
    const fecha = $('#as-f').value || iso(TODAY), tipo = $('#as-t') ? $('#as-t').value : '', presente = !!(e.submitter && e.submitter.dataset.p === '1');
    m.asist.registros.push({ id: uid(), fecha, tipo, presente }); save(); track('asistencia', presente ? 'fui' : 'falte'); render(); toast(presente ? 'Clase registrada: fuiste.' : 'Clase registrada: faltaste.');
  }
  if (k === 'as-base'){
    const bs = asistBuckets(m), base = { ...(m.asist.base || {}) };
    for (let i = 0; i < bs.length; i++){
      const t = Math.max(0, Math.round(+$('#ab-t-' + i).value || 0)), fu = Math.max(0, Math.round(+$('#ab-f-' + i).value || 0));
      if (fu > t){ $('#ab-err').textContent = 'No podés haber ido a más clases de las que hubo.'; return; }
      const b = bs[i], recF = b.recs.filter(r => r.presente).length;
      base[b.k] = { fui: fu - recF, total: t - b.recs.length };
    }
    m.asist.base = base; save(); closeModal(); render(); toast('Números actualizados.');
  }
});

/* ---------- terminología general: compartida (base de datos) + propia de cada cuenta ---------- */
const GL = { global: (HOST.glosario || []).slice(), api: HOST.glosarioApi || null };
const esAdmin = () => !!(HOST.user ? HOST.user.isAdmin : HOST.local);
let TM = { tab:'buscar', q:'', cat:'', dir:'td', soloFallados:false, queue:[], i:0, flipped:false, ok:0, bad:0, quiz:null, mc:null };
let tmCache = null;
const tmInvalidar = () => { tmCache = null; };
const tmClave = s => s.replace(/^-/, '');
function terminos(){
  if (tmCache) return tmCache;
  const g = GL.global.map(x => ({ key:'g:' + x.id, id:x.id, term:x.term, def:x.definition, cat:x.category || '', src:x.source || '', global:true }));
  const p = (S.glosario.propios || []).map(x => ({ key:'p:' + x.id, id:x.id, term:x.term, def:x.def, cat:x.cat || '', src:x.src || '', global:false }));
  return tmCache = [...g, ...p].sort((a, b) => tmClave(a.term).localeCompare(tmClave(b.term), 'es', { sensitivity:'base' }));
}
const tmFind = k => terminos().find(t => t.key === k);
const tmStat = k => S.glosario.stats[k] || { ok:0, bad:0, box:1 };
const tmPool = () => terminos().filter(t => (!TM.cat || t.cat === TM.cat) && (!TM.soloFallados || tmStat(t.key).bad > tmStat(t.key).ok));
const tmReset = () => { TM.queue = []; TM.i = 0; TM.flipped = false; TM.quiz = null; TM.mc = null; };
function tmMarcar(k, ok){
  const s = S.glosario.stats[k] = { ...tmStat(k) };
  if (ok){ s.ok++; s.box = Math.min(5, s.box + 1); TM.ok++; } else { s.bad++; s.box = 1; TM.bad++; }
  S.glosario.hist.push({ t: Date.now(), ok }); if (S.glosario.hist.length > 2000) S.glosario.hist.splice(0, S.glosario.hist.length - 2000);
  markStudy(); save(); track('respuesta', 'terminologia');
}
const tmFuente = t => !t.src ? '' : /^https?:\/\//i.test(t.src) ? `<a href="${esc(t.src)}" target="_blank" rel="noopener noreferrer">${esc(t.src.replace(/^https?:\/\/(www\.)?/i, '').slice(0, 60))}</a>` : esc(t.src);
function vTerminos(){
  const all = terminos(), cats = [...new Set(all.map(t => t.cat).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
  if (TM.cat && !cats.includes(TM.cat)) TM.cat = '';
  const dom = all.filter(t => tmStat(t.key).box >= 3).length;
  const tabs = [['buscar','Buscar','search'],['flash','Flashcards','cards'],['quiz','Quiz','pulse'],['mc','Opción múltiple','quiz']];
  const body = ({ buscar:tmBuscar, flash:tmFlash, quiz:tmQuiz, mc:tmMC }[TM.tab] || tmBuscar)();
  return `<div class="stack">
    <div class="row between" style="align-items:flex-end"><div><h1>Terminología</h1><p class="small muted">${all.length} ${all.length === 1 ? 'término' : 'términos'} generales${all.length ? ` · dominás ${dom}` : ''}</p></div>
      <div class="row">${esAdmin() ? `<button class="btn" data-act="tm-import">${I('upload',16)}Importar lista</button>` : ''}<button class="btn pri" data-act="tm-add">${I('plus',16)}Agregar término</button></div></div>
    <div class="row between"><div class="tabs" role="tablist">${tabs.map(([k, l, i]) => `<button role="tab" aria-selected="${TM.tab === k}" data-act="tm-tab" data-tab="${k}"><span class="row" style="gap:6px;flex-wrap:nowrap">${I(i,16)}${l}</span></button>`).join('')}</div>
      ${cats.length ? `<select id="tm-cat" data-change="tm-cat" style="width:auto" aria-label="Filtrar por categoría"><option value="">Todas las categorías</option>${cats.map(c => `<option value="${esc(c)}" ${TM.cat === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select>` : ''}</div>
    ${body}
  </div>`;
}
function tmBuscar(){
  return `<div class="stack" style="gap:12px">
    <div class="search" style="max-width:none">${I('search',18)}<input type="text" id="tm-q" value="${esc(TM.q)}" placeholder="Buscar un término o una palabra de la definición…" aria-label="Buscar un término" autocomplete="off"></div>
    <div id="tm-list">${tmLista()}</div></div>`;
}
function tmLista(){
  const q = norm(TM.q), base = terminos().filter(t => !TM.cat || t.cat === TM.cat);
  const res = q ? base.filter(t => norm(t.term).includes(q) || norm(t.def).includes(q)).sort((a, b) => (norm(b.term) === q) - (norm(a.term) === q) || norm(b.term).startsWith(q) - norm(a.term).startsWith(q)) : base;
  const exacto = q && terminos().some(t => norm(t.term) === q), shown = res.slice(0, 200);
  const nuevo = TM.q.trim();
  const add = q && !exacto ? `<div class="card row between" style="gap:12px;border-style:dashed"><div style="min-width:0;flex:1 1 220px"><b>¿No encontrás “${esc(nuevo)}”?</b><p class="small muted">Agregalo con su definición y queda para buscarlo y practicarlo.</p></div><button class="btn pri" data-act="tm-add" data-term="${esc(nuevo)}">${I('plus',16)}Agregar “${esc(nuevo.length > 24 ? nuevo.slice(0, 24) + '…' : nuevo)}”</button></div>` : '';
  if (!base.length && !q) return '<div class="empty">Todavía no hay términos cargados. Agregá el primero con “Agregar término”.</div>';
  return `${add}<p class="small muted" style="margin:${add ? '12px' : '0'} 0 8px">${q ? `${res.length} ${res.length === 1 ? 'resultado' : 'resultados'}` : `${base.length} ${base.length === 1 ? 'término' : 'términos'}`}${shown.length < res.length ? ` · mostrando los primeros ${shown.length}: buscá para encontrar el resto` : ''}</p>
    <div class="stack" style="gap:8px">${shown.map(t => { const st = tmStat(t.key);
      return `<div class="doc" style="align-items:flex-start"><div style="flex:1;min-width:0"><div class="row" style="gap:8px"><b>${esc(t.term)}</b>${t.cat ? `<span class="pill p-past">${esc(t.cat)}</span>` : ''}${t.global ? '' : '<span class="pill p-warm">Propio</span>'}${st.ok + st.bad ? `<span class="small muted">${st.ok} bien · ${st.bad} mal</span>` : ''}</div>
        <p class="small" style="margin-top:4px">${esc(t.def)}</p>${t.src ? `<p class="small muted" style="margin-top:2px">Fuente: ${tmFuente(t)}</p>` : ''}</div>
        ${!t.global || esAdmin() ? `<button class="icon-btn" data-act="tm-edit" data-key="${t.key}" aria-label="Editar ${esc(t.term)}">${I('edit',15)}</button>` : ''}</div>`; }).join('')}</div>`;
}
function tmHead(){
  return `<div class="row between"><div class="row"><div class="tabs" style="width:max-content"><button aria-selected="${TM.dir === 'td'}" data-act="tm-dir" data-d="td">Término → definición</button><button aria-selected="${TM.dir === 'dt'}" data-act="tm-dir" data-d="dt">Definición → término</button></div>
    <label class="row small" style="gap:6px"><input type="checkbox" id="tm-fall" data-change="tm-fall" ${TM.soloFallados ? 'checked' : ''}>Solo los que fallé</label></div>
    <div class="score"><div class="s-ok"><b>${TM.ok}</b>correctas</div><div class="s-bad"><b>${TM.bad}</b>incorrectas</div><div><b>${pct(TM.ok, TM.ok + TM.bad)}%</b>aciertos</div></div></div>`;
}
const tmVacio = () => `<div class="empty">${TM.soloFallados ? 'No tenés términos fallados en esta selección.' : 'Todavía no hay términos para practicar en esta selección.'}</div>`;
function tmFlash(){
  const pool = tmPool();
  if (!TM.queue.length || TM.queue.some(k => !tmFind(k))){ TM.queue = shuffle(pool).sort((a, b) => tmStat(a.key).box - tmStat(b.key).box).map(t => t.key); TM.i = 0; TM.flipped = false; }
  if (!pool.length) return `<div class="stack">${tmHead()}${tmVacio()}</div>`;
  if (TM.i >= TM.queue.length) return `<div class="stack">${tmHead()}<div class="card stack" style="align-items:center;text-align:center;padding:32px"><h2>¡Terminaste la ronda!</h2><p class="muted">Los que no sabías van a aparecer primero la próxima vez.</p><button class="btn pri" data-act="tm-restart">Repasar de nuevo</button></div></div>`;
  const t = tmFind(TM.queue[TM.i]), st = tmStat(t.key), cat = esc(t.cat || 'Terminología');
  const front = TM.dir === 'td' ? `<div class="big">${esc(t.term)}</div>` : `<div class="def">${esc(t.def)}</div>`;
  const back = TM.dir === 'td' ? `<div class="def">${esc(t.def)}</div>` : `<div class="big">${esc(t.term)}</div>`;
  return `<div class="stack">${tmHead()}
    <div class="flip ${TM.flipped ? 'on' : ''}" id="tmflip"><div class="flip-in" data-act="tm-flip" role="button" tabindex="0" aria-label="Dar vuelta la tarjeta">
      <div class="face"><div class="corner"><span>${cat}</span><span class="num">${TM.i + 1}/${TM.queue.length}</span></div>${front}<span class="small muted row" style="gap:6px">${I('flip',14)}Tocá para dar vuelta</span></div>
      <div class="face back"><div class="corner"><span>${cat}</span><span class="boxes" title="Caja ${st.box} de 5">${[1,2,3,4,5].map(n => `<i class="${n <= st.box ? 'on' : ''}"></i>`).join('')}</span></div>${back}</div></div></div>
    <div class="row" style="justify-content:center">${TM.flipped ? `<button class="btn" style="min-width:150px;color:var(--danger)" data-act="tm-ans" data-ok="0">${I('x',16)}No la sabía</button><button class="btn pri" style="min-width:150px" data-act="tm-ans" data-ok="1">${I('check',16)}La sabía</button>` : `<button class="btn pri" style="min-width:200px" data-act="tm-flip">${I('flip',16)}Ver respuesta</button>`}</div></div>`;
}
function tmNuevoQuiz(){
  const pool = tmPool(); if (!pool.length) return null;
  const cand = shuffle(pool).sort((a, b) => (tmStat(b.key).bad - tmStat(b.key).ok) - (tmStat(a.key).bad - tmStat(a.key).ok)).slice(0, Math.max(3, Math.ceil(pool.length / 2)));
  return { key: cand[Math.floor(Math.random() * cand.length)].key, answer:'', res:null };
}
function tmQuiz(){
  if (!TM.quiz || !tmFind(TM.quiz.key)) TM.quiz = tmNuevoQuiz();
  if (!TM.quiz) return `<div class="stack">${tmHead()}${tmVacio()}</div>`;
  const q = TM.quiz, t = tmFind(q.key);
  const ask = TM.dir === 'td' ? `<p class="eyebrow">Escribí la definición de</p><div class="big">${esc(t.term)}</div>` : `<p class="eyebrow">¿Qué término corresponde a esta definición?</p><p style="margin-top:6px">${esc(t.def)}</p>`;
  const fb = !q.res ? '' : `<div class="fb ${q.res.ok ? 'ok' : 'bad'}"><h3>${q.res.ok ? 'Correcta' : 'Incorrecta'}</h3><p class="small">${esc(q.res.detail)}</p>
      ${!q.res.ok && q.res.miss && q.res.miss.length ? `<p class="small" style="margin-top:4px">Te faltó mencionar: <b>${q.res.miss.map(esc).join(', ')}</b></p>` : ''}
      <p class="small" style="margin-top:8px"><b>Respuesta de referencia:</b> ${esc(TM.dir === 'td' ? t.def : t.term)}</p></div>
    <div class="row">${!q.res.ok ? `<button class="btn sm" data-act="tm-override">${I('check',14)}Estaba bien, contala como correcta</button>` : ''}<button class="btn pri" data-act="tm-next" style="margin-left:auto">Siguiente${I('next',16)}</button></div>`;
  return `<div class="stack">${tmHead()}<div class="stack" style="max-width:760px">
    <div class="prompt"><p class="small muted" style="margin-bottom:8px">${esc(t.cat || 'Terminología')}</p>${ask}</div>
    <form class="stack" style="gap:10px" data-form="tm-quiz">
      ${TM.dir === 'td' ? `<textarea id="tm-qa" placeholder="Escribí la definición con tus palabras…" ${q.res ? 'disabled' : ''}>${esc(q.answer)}</textarea>` : `<input type="text" id="tm-qa" placeholder="Escribí el término…" value="${esc(q.answer)}" ${q.res ? 'disabled' : ''} autocomplete="off">`}
      ${q.res ? '' : `<div class="row"><button class="btn pri" type="submit">Comprobar</button><button class="btn ghost" type="button" data-act="tm-skip">No sé, mostrame</button></div>`}
    </form>${fb}</div></div>`;
}
function tmNuevoMC(){
  const pool = tmPool(), all = terminos(); if (!pool.length || all.length < 4) return null;
  const t = shuffle(pool).sort((a, b) => tmStat(a.key).box - tmStat(b.key).box)[Math.floor(Math.random() * Math.min(5, pool.length))];
  const distinto = x => x.key !== t.key && norm(x.def) !== norm(t.def) && norm(x.term) !== norm(t.term);
  const mismos = shuffle(all.filter(x => distinto(x) && x.cat && x.cat === t.cat)), otros = shuffle(all.filter(x => distinto(x) && !(x.cat && x.cat === t.cat)));
  const elegidos = []; [...mismos, ...otros].forEach(x => { if (elegidos.length < 3 && !elegidos.some(y => norm(y.def) === norm(x.def) || norm(y.term) === norm(x.term))) elegidos.push(x); });
  if (elegidos.length < 3) return null;
  return { key: t.key, opts: shuffle([t.key, ...elegidos.map(x => x.key)]), pick: null };
}
function tmMC(){
  if (!TM.mc || !tmFind(TM.mc.key) || TM.mc.opts.some(k => !tmFind(k))) TM.mc = tmNuevoMC();
  if (!TM.mc) return `<div class="stack">${tmHead()}${terminos().length < 4 ? '<div class="empty">Para la opción múltiple hacen falta al menos 4 términos cargados.</div>' : tmVacio()}</div>`;
  const m = TM.mc, t = tmFind(m.key);
  const ask = TM.dir === 'td' ? `<p class="eyebrow">¿Qué significa?</p><div class="big">${esc(t.term)}</div>` : `<p class="eyebrow">¿Qué término es?</p><p style="margin-top:6px">${esc(t.def)}</p>`;
  return `<div class="stack">${tmHead()}<div class="stack" style="max-width:760px">
    <div class="prompt"><p class="small muted" style="margin-bottom:8px">${esc(t.cat || 'Terminología')}</p>${ask}</div>
    <div class="stack" style="gap:8px">${m.opts.map((k, i) => { const o = tmFind(k), cls = m.pick === null ? '' : k === m.key ? 'right' : k === m.pick ? 'wrong' : '';
      return `<button class="opt ${cls}" data-act="tm-mc-pick" data-k="${k}" ${m.pick !== null ? 'disabled' : ''}><span class="k">${'ABCD'[i]}</span>${esc(TM.dir === 'td' ? o.def : o.term)}</button>`; }).join('')}</div>
    ${m.pick !== null ? `<div class="fb ${m.pick === m.key ? 'ok' : 'bad'}"><h3>${m.pick === m.key ? 'Correcta' : 'Incorrecta'}</h3><p class="small"><b>${esc(t.term)}:</b> ${esc(t.def)}</p></div><div class="row"><button class="btn pri" data-act="tm-mc-next" style="margin-left:auto">Siguiente${I('next',16)}</button></div>` : ''}
  </div></div>`;
}
function tmForm(t, termIni){
  const edit = !!t, cats = [...new Set(terminos().map(x => x.cat).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
  modal(`<div class="row between"><h2>${edit ? 'Editar término' : 'Agregar término'}</h2>${closeX()}</div>
    <form class="stack" style="gap:12px" data-form="tm-term" data-key="${edit ? t.key : ''}">
      <label class="f">Término<input type="text" id="tf-t" required value="${esc(edit ? t.term : termIni || '')}" placeholder="Ej: Hematuria"></label>
      <label class="f">Definición<textarea id="tf-d" required style="min-height:90px" placeholder="Ej: Presencia de sangre en la orina.">${esc(edit ? t.def : '')}</textarea></label>
      <div class="grid g2" style="gap:12px"><label class="f">Categoría (opcional)<input type="text" id="tf-c" list="tf-cats" value="${esc(edit ? t.cat : '')}" placeholder="Ej: Signos y síntomas"></label>
      <label class="f">Fuente (opcional)<input type="text" id="tf-s" value="${esc(edit ? t.src : '')}" placeholder="Libro, apunte o link"></label></div>
      <datalist id="tf-cats">${cats.map(c => `<option value="${esc(c)}"></option>`).join('')}</datalist>
      ${!edit && esAdmin() ? '<label class="row small" style="gap:8px"><input type="checkbox" id="tf-g" checked>Agregarlo para todas las cuentas</label>' : ''}
      <p class="small muted">${edit ? (t.global ? 'Es un término compartido: el cambio se ve en todas las cuentas.' : 'Es un término propio: solo lo ves vos.') : esAdmin() ? 'Si desmarcás la opción, queda solo en tu cuenta.' : 'Queda guardado en tu cuenta.'}</p>
      <p class="small" id="tf-err" style="color:var(--danger)"></p>
      <div class="row" style="justify-content:space-between">${edit ? `<button class="btn" type="button" style="color:var(--danger)" data-act="tm-del" data-key="${t.key}">${I('trash',16)}Eliminar</button>` : '<span></span>'}<div class="row"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Guardar</button></div></div></form>`);
}
function tmImportForm(){
  modal(`<div class="row between"><h2>Importar lista de términos</h2>${closeX()}</div>
    <form class="stack" style="gap:12px" data-form="tm-import">
      <p class="small muted">Un término por línea, separado de su definición con dos puntos, un guion entre espacios o una tabulación. Se cargan para todas las cuentas; los que ya existen se saltean.</p>
      <textarea id="ti-x" required style="min-height:200px" placeholder="Hematuria: presencia de sangre en la orina.&#10;Poliuria - aumento del volumen de orina en 24 horas."></textarea>
      <div class="grid g2" style="gap:12px"><label class="f">Categoría para todos (opcional)<input type="text" id="ti-c" placeholder="Ej: Signos y síntomas"></label><label class="f">Fuente (opcional)<input type="text" id="ti-s" placeholder="Libro, apunte o link"></label></div>
      <p class="small" id="ti-msg" style="color:var(--danger)"></p>
      <div class="row" style="justify-content:flex-end"><button class="btn" type="button" data-act="close-modal">Cancelar</button><button class="btn pri" type="submit">Importar</button></div></form>`);
}
// "Término: definición" / "Término - definición" / "Término<TAB>definición"; un guion pegado al término (sufijos como -itis) no separa
const tmParse = txt => txt.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
  const m = l.replace(/^(?:[•*·]\s*|-\s+|\d+[.)]\s+)/, '').match(/^(.+?)\s*(?::|\t|\s[-–—]\s)\s*(.+)$/);
  return m ? { term: m[1].trim(), definition: m[2].trim() } : null;
}).filter(x => x && x.term && x.definition);
Object.assign(A, {
  'tm-tab': d => { TM.tab = d.tab; render(); },
  'tm-add': d => tmForm(null, d.term ? d.term.charAt(0).toUpperCase() + d.term.slice(1) : ''),
  'tm-edit': d => { const t = tmFind(d.key); if (t) tmForm(t); },
  'tm-import': () => tmImportForm(),
  'tm-dir': d => { TM.dir = d.d; tmReset(); render(); },
  'tm-flip': () => { TM.flipped = !TM.flipped; const f = $('#tmflip'); if (f) f.classList.toggle('on', TM.flipped); setTimeout(render, 420); },
  'tm-ans': d => { const k = TM.queue[TM.i]; if (!k) return; tmMarcar(k, d.ok === '1'); TM.i++; TM.flipped = false; render(); },
  'tm-restart': () => { tmReset(); render(); },
  'tm-skip': () => { const q = TM.quiz; if (!q || q.res) return; q.prev = { ...tmStat(q.key) }; q.res = { ok:false, detail:'La dejaste en blanco.' }; tmMarcar(q.key, false); render(); },
  'tm-next': () => { TM.quiz = tmNuevoQuiz(); render(); setTimeout(() => { const x = $('#tm-qa'); x && x.focus(); }, 0); },
  'tm-override': () => { const q = TM.quiz; if (!q || !q.res || q.res.ok || !q.prev) return;
    S.glosario.stats[q.key] = { ok: q.prev.ok + 1, bad: q.prev.bad, box: Math.min(5, q.prev.box + 1) };
    const h = S.glosario.hist[S.glosario.hist.length - 1]; if (h) h.ok = true;
    TM.bad--; TM.ok++; q.res = { ok:true, detail:'La marcaste como correcta.' }; save(); render(); },
  'tm-mc-pick': d => { const m = TM.mc; if (!m || m.pick !== null) return; m.pick = d.k; tmMarcar(m.key, d.k === m.key); render(); },
  'tm-mc-next': () => { TM.mc = tmNuevoMC(); render(); },
  'tm-del': async (d, el) => {
    const t = tmFind(d.key); if (!t) return;
    if (!armed(el, 'Sí, eliminar término')) return;
    try {
      if (t.global){ el.disabled = true; await GL.api.borrar(t.id); GL.global = GL.global.filter(x => x.id !== t.id); }
      else S.glosario.propios = S.glosario.propios.filter(x => x.id !== t.id);
      delete S.glosario.stats[t.key]; save(); tmInvalidar(); tmReset(); closeModal(); render(); toast('Término eliminado.');
    } catch (e) { const m = $('#tf-err'); if (m) m.textContent = e.message || 'No se pudo eliminar.'; el.disabled = false; }
  }
});
document.addEventListener('change', e => {
  const k = e.target.dataset.change;
  if (k === 'tm-cat'){ TM.cat = e.target.value; tmReset(); render(); }
  if (k === 'tm-fall'){ TM.soloFallados = e.target.checked; tmReset(); render(); }
});
document.addEventListener('input', e => { if (e.target.id === 'tm-q'){ TM.q = e.target.value; const l = $('#tm-list'); if (l) l.innerHTML = tmLista(); } });
document.addEventListener('submit', async e => {
  const f = e.target, k = f.dataset.form; if (!['tm-quiz', 'tm-term', 'tm-import'].includes(k)) return;
  const val = id => { const el = $(id); return el ? el.value.trim() : ''; };
  if (k === 'tm-quiz'){
    const q = TM.quiz; if (!q || q.res) return; q.answer = $('#tm-qa').value; if (!q.answer.trim()) return;
    const t = tmFind(q.key); q.prev = { ...tmStat(q.key) }; q.res = gradeQuiz({ term: t.term, def: t.def }, q.answer, TM.dir); tmMarcar(q.key, q.res.ok); render();
  }
  if (k === 'tm-term'){
    const term = val('#tf-t'), def = val('#tf-d'), cat = val('#tf-c'), src = val('#tf-s'), key = f.dataset.key, err = $('#tf-err');
    if (!term || !def) return;
    const dup = terminos().find(x => norm(x.term) === norm(term) && x.key !== key);
    if (dup){ err.textContent = `“${dup.term}” ya está cargado${dup.global ? '' : ' en tus términos'}. Buscalo para verlo o editarlo.`; return; }
    const btn = f.querySelector('[type=submit]'); btn.disabled = true;
    try {
      if (key){
        const t = tmFind(key);
        if (t.global){ const row = await GL.api.editar(t.id, { term, definition: def, category: cat, source: src }); Object.assign(GL.global.find(x => x.id === t.id), row); }
        else Object.assign(S.glosario.propios.find(x => x.id === t.id), { term, def, cat, src });
      } else if ($('#tf-g') && $('#tf-g').checked && GL.api){ const row = await GL.api.agregar({ term, definition: def, category: cat, source: src }); GL.global.push(row); }
      else S.glosario.propios.push({ id: uid(), term, def, cat, src });
      save(); tmInvalidar(); track('terminologia', key ? 'editar' : 'agregar'); closeModal(); render(); toast(key ? 'Término actualizado.' : 'Término agregado.');
    } catch (ex) { err.textContent = ex.message || 'No se pudo guardar.'; btn.disabled = false; }
  }
  if (k === 'tm-import'){
    const msg = $('#ti-msg'), cat = val('#ti-c'), src = val('#ti-s'), filas = tmParse($('#ti-x').value).map(x => ({ ...x, category: cat, source: src }));
    if (!filas.length){ msg.textContent = 'No encontré líneas con el formato “término: definición”.'; return; }
    if (!GL.api) return;
    const btn = f.querySelector('[type=submit]'); btn.disabled = true; btn.textContent = 'Importando…';
    try {
      const nuevos = await GL.api.importar(filas); GL.global.push(...nuevos); tmInvalidar(); track('terminologia', 'importar');
      closeModal(); render(); toast(`Se agregaron ${nuevos.length} ${nuevos.length === 1 ? 'término' : 'términos'}${filas.length - nuevos.length ? ` (${filas.length - nuevos.length} ${filas.length - nuevos.length === 1 ? 'ya estaba' : 'ya estaban'})` : ''}.`);
    } catch (ex) { msg.textContent = ex.message || 'No se pudo importar.'; btn.disabled = false; btn.textContent = 'Importar'; }
  }
});

/* ---------- cuenta, carga manual de preguntas y panel de uso ---------- */
function renderCuenta(){
  const c = $('#cuenta'), u = HOST.user; if (!c) return;
  c.innerHTML = u ? `<div class="stack" style="gap:8px"><div style="min-width:0"><b style="display:block;color:var(--fg);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(u.nombre)}</b><span style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(u.email)}</span></div><button class="btn sm" data-act="logout">Cerrar sesión</button></div>`
    : 'Modo local de prueba: los datos quedan en este navegador.';
}
function sinMaterias(){
  modal(`<div class="row between"><h2>Primero, una materia</h2>${closeX()}</div><p class="muted">Para crear flashcards, preguntas o clases necesitás tener al menos una materia que estés cursando.</p><div class="row" style="justify-content:flex-end"><button class="btn pri" data-act="add-materia">${I('plus',16)}Agregar materia</button></div>`);
}
function pregForm(mId){
  const m = mat(mId); if (!m) return sinMaterias();
  const us = units(m.id), vs = S.viejos.filter(v => v.materiaId === m.id);
  modal(`<div class="row between"><h2>Agregar pregunta</h2>${closeX()}</div>
    <form class="stack" style="gap:12px" data-form="pregunta" data-m="${m.id}">
      <p class="small muted">${esc(m.nombre)}. Escribí la pregunta, la respuesta correcta y tres incorrectas: al practicar, la app mezcla el orden.</p>
      ${us.length ? `<label class="f">Unidad<select id="pq-u">${us.map(u => `<option value="${u.id}">${esc(u.nombre)}</option>`).join('')}</select></label>` : ''}
      <label class="f">Pregunta<textarea id="pq-q" required style="min-height:70px"></textarea></label>
      <label class="f">Respuesta correcta<input type="text" id="pq-a" required></label>
      <div class="f stack" style="gap:6px"><span class="small" style="font-weight:600">Respuestas incorrectas</span><input type="text" id="pq-b" required placeholder="Incorrecta 1" aria-label="Respuesta incorrecta 1"><input type="text" id="pq-c" required placeholder="Incorrecta 2" aria-label="Respuesta incorrecta 2"><input type="text" id="pq-d" required placeholder="Incorrecta 3" aria-label="Respuesta incorrecta 3"></div>
      <label class="f">Explicación (opcional)<textarea id="pq-e" style="min-height:60px" placeholder="Por qué es la correcta"></textarea></label>
      <label class="row small" style="gap:8px"><input type="checkbox" id="pq-caso">Es un caso clínico</label>
      ${vs.length ? `<label class="f">¿Salió en un examen anterior?<select id="pq-v"><option value="">No</option>${vs.map(v => `<option value="${v.id}">${esc(v.titulo)}</option>`).join('')}</select></label>` : ''}
      <div class="row" style="justify-content:flex-end"><button class="btn" type="submit" data-otra="1">Guardar y agregar otra</button><button class="btn pri" type="submit">Guardar</button></div></form>`);
}
document.addEventListener('submit', e => {
  const f = e.target; if (f.dataset.form !== 'pregunta') return;
  const val = id => { const el = $(id); return el ? el.value.trim() : ''; };
  const ops = [val('#pq-a'), val('#pq-b'), val('#pq-c'), val('#pq-d')];
  if (!val('#pq-q') || ops.some(o => !o)) return;
  const q = { id: uid(), materiaId: f.dataset.m, u: val('#pq-u') || undefined, q: val('#pq-q'), ops, a: 0, exp: val('#pq-e'), propia: true };
  if ($('#pq-caso').checked) q.tipo = 'caso';
  if (val('#pq-v')) q.origen = val('#pq-v');
  S.preguntas.push(q); save(); track('pregunta', 'nueva');
  const otra = e.submitter && e.submitter.dataset.otra;
  render(); if (otra){ pregForm(f.dataset.m); toast('Pregunta guardada. Cargá la siguiente.'); } else { closeModal(); toast('Pregunta guardada.'); }
});

let ADM = { data:null, loading:false, err:null };
const fmtCuando = ts => { if (!ts) return 'nunca'; const d = new Date(ts); return sod(d).getTime() === TODAY.getTime() ? `hoy ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}` : fmtAgo(d.getTime()); };
const fmtSeg = s => fmtMin((+s || 0) / 60);
function vAdmin(){
  if (!HOST.user || !HOST.user.isAdmin) return '<div class="empty">Esta sección es solo para administradoras.</div>';
  if (!ADM.data && !ADM.loading && !ADM.err){
    ADM.loading = true;
    HOST.adminStats().then(d => { ADM.data = d || {}; }, e => { ADM.err = (e && e.message) || 'No se pudieron cargar las estadísticas.'; })
      .finally(() => { ADM.loading = false; if (R.view === 'admin') render(); });
  }
  const head = `<div class="row between"><div><h1>Uso de la app</h1><p class="small muted">Quiénes la usan, cuándo y cuánto. Solo lo ven las administradoras.</p></div><button class="btn" data-act="adm-reload" ${ADM.loading ? 'disabled' : ''}>${I('redo',16)}Actualizar</button></div>`;
  if (ADM.err) return `<div class="stack">${head}<div class="empty">${esc(ADM.err)}</div></div>`;
  if (!ADM.data) return `<div class="stack">${head}<div class="empty">Cargando estadísticas…</div></div>`;
  const us = ADM.data.usuarios || [], dia = ADM.data.diario || [], ev = ADM.data.eventos || [];
  const hoyIso = iso(TODAY), porDia = Object.fromEntries(dia.map(x => [x.dia, x]));
  const dias = [...Array(30)].map((_, i) => { const k = addD(i - 29); return { k, n: +(porDia[k] || {}).usuarias || 0, s: +(porDia[k] || {}).segundos || 0 }; });
  const mx = Math.max(1, ...dias.map(x => x.n));
  const activas7 = us.filter(u => u.ultimo && Date.now() - Date.parse(u.ultimo) < 7 * DAY).length;
  const seg7 = us.reduce((a, u) => a + (+u.seg_7d || 0), 0);
  const vistas = ev.filter(x => x.evento === 'vista').sort((a, b) => b.n - a.n).slice(0, 8);
  const acciones = Object.entries(ev.filter(x => x.evento !== 'vista').reduce((o, x) => { o[x.evento] = (o[x.evento] || 0) + (+x.n || 0); return o; }, {})).sort((a, b) => b[1] - a[1]);
  const NOMBRES = { inicio:'Inicio', horario:'Horario', materias:'Materias', materia:'Una materia', evento:'Un examen', practicar:'Practicar', fichas:'Fichas', referencia:'Referencia', progreso:'Progreso', carrera:'Carrera', admin:'Uso de la app' };
  const ACC = { ingreso:'Ingresos a la app', respuesta:'Respuestas en práctica', estudiar:'Sesiones de repaso', simulacro:'Simulacros', pomodoro:'Bloques de Pomodoro', pregunta:'Preguntas cargadas' };
  const mxV = Math.max(1, ...vistas.map(x => +x.n)), mxA = Math.max(1, ...acciones.map(x => x[1]));
  return `<div class="stack">${head}
    <div class="grid g3">
      <div class="card kpi"><span>Cuentas creadas</span><b>${us.length}</b><span>${us.filter(u => Date.now() - Date.parse(u.registrada) < 7 * DAY).length} en los últimos 7 días</span></div>
      <div class="card kpi"><span>Activas</span><b>${(porDia[hoyIso] || {}).usuarias || 0}</b><span>hoy · ${activas7} en los últimos 7 días</span></div>
      <div class="card kpi"><span>Tiempo de uso (7 días)</span><b>${fmtSeg(seg7)}</b><span>${activas7 ? fmtSeg(seg7 / activas7) + ' por persona activa' : 'sin actividad'}</span></div>
    </div>
    <div class="card"><div class="card-h"><h2>Personas activas por día</h2><span class="small muted">últimos 30 días</span></div>
      <div class="act" style="height:110px">${dias.map(x => `<i class="${x.n ? '' : 'z'}" style="height:${Math.max(3, x.n / mx * 100)}%" title="${fmtDate(pISO(x.k).getTime())}: ${x.n} ${x.n === 1 ? 'persona' : 'personas'} · ${fmtSeg(x.s)}"></i>`).join('')}</div>
      <div class="row between small muted" style="margin-top:6px"><span>hace 30 días</span><span>hoy</span></div></div>
    <div class="card"><div class="card-h"><h2>Personas</h2><span class="small muted">${us.length} ${us.length === 1 ? 'cuenta' : 'cuentas'}</span></div>
      ${us.length ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Persona</th><th>Se registró</th><th>Último ingreso</th><th>Tiempo total</th><th>Últimos 7 días</th><th>Sesiones</th></tr></thead><tbody>${us.map(u => `<tr><td><b>${esc(u.nombre || '—')}</b>${u.is_admin ? ' <span class="pill p-next">admin</span>' : ''}<span class="small muted" style="display:block">${esc(u.email || '')}</span></td><td class="small">${u.registrada ? fmtDate(Date.parse(u.registrada)) : '—'}</td><td class="small">${fmtCuando(u.ultimo)}</td><td class="v">${fmtSeg(u.seg_total)}</td><td class="v">${fmtSeg(u.seg_7d)}</td><td class="v">${+u.sesiones || 0}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted small">Todavía no se registró nadie.</p>'}</div>
    <div class="grid g2">
      <div class="card"><div class="card-h"><h2>Secciones más visitadas</h2><span class="small muted">30 días</span></div>${vistas.length ? vistas.map(x => `<div class="weak"><span>${esc(NOMBRES[x.detalle] || x.detalle || '—')}</span><span class="bar"><i style="width:${pct(+x.n, mxV)}%"></i></span><span class="num small">${x.n}</span></div>`).join('') : '<p class="muted small">Sin datos todavía.</p>'}</div>
      <div class="card"><div class="card-h"><h2>Qué hacen en la app</h2><span class="small muted">30 días</span></div>${acciones.length ? acciones.map(([k, n]) => `<div class="weak"><span>${esc(ACC[k] || k)}</span><span class="bar"><i style="width:${pct(n, mxA)}%"></i></span><span class="num small">${n}</span></div>`).join('') : '<p class="muted small">Sin datos todavía.</p>'}</div>
    </div>
    <p class="note">El tiempo cuenta solo mientras la app está abierta y en pantalla. Los datos de estudio de cada persona (materias, apuntes, respuestas) son privados y no se ven acá.</p>
  </div>`;
}
Object.assign(A, {
  logout: (d, el) => { el.disabled = true; el.textContent = 'Cerrando…'; if (HOST.logout) HOST.logout(); },
  'preg-new': d => pregForm(d.m),
  'adm-reload': () => { ADM = { data:null, loading:false, err:null }; render(); }
});

// Acceso para pruebas automáticas; no existe en la versión publicada
if (import.meta.env.DEV) window.__app = { go, render, A, get S(){ return S; }, get P(){ return P; }, get HS(){ return HS; }, set HS(v){ HS = v; }, get SIM(){ return SIM; }, set SIM(v){ SIM = v; }, startSim, finishSim, startSession, simPool, errTrack, errFind, validErrores, studyPlan, pomoTick, pomoSet, PM, asistBuckets, clsRowHoy, notifs, TM, terminos, GL };

/* ---------- inicio ---------- */
document.body.classList.toggle('no-ia', !IA);
renderCuenta();
['#bm1','#bm2','#bm3'].forEach(s => $(s).innerHTML = I('pulse', 18));
$('#q-ico').outerHTML = I('search', 18);
$('#fab').innerHTML = I('spark', 20) + '<span class="lbl">Preguntale a la IA</span>';
$('#ai-x').innerHTML = I('x', 18);
$('#ai-send').innerHTML = I('send', 16);
renderStreak();
PM.left = pmFull(); pomoBtn(); setInterval(pomoTick, 1000);
render();
