// Estructura de datos de las preguntas del diagnóstico, separada de los
// componentes visuales. Añadir, quitar o condicionar preguntas se hace aquí,
// sin tocar la interfaz.
//
// kind: "single" | "multi" | "textarea"
// options[].other: true  -> al seleccionarla se muestra un campo de texto libre opcional

export const QUESTIONS = [
  {
    id: "process",
    kind: "single",
    question: "¿Qué quieres mejorar?",
    helper: "Selecciona la opción que más se aproxima. No pasa nada si todavía no lo tienes claro.",
    options: [
      { value: "facturas", label: "Facturas" },
      { value: "email", label: "Email" },
      { value: "documentacion", label: "Documentación" },
      { value: "contratos", label: "Contratos" },
      { value: "altas", label: "Altas y onboarding" },
      { value: "conocimiento", label: "Conocimiento interno" },
      { value: "otro-proceso", label: "Otro proceso", other: true },
      { value: "no-claro", label: "No lo tengo claro" },
    ],
  },
  {
    id: "area",
    kind: "single",
    question: "¿En qué área ocurre principalmente?",
    options: [
      { value: "administracion", label: "Administración" },
      { value: "finanzas", label: "Finanzas" },
      { value: "comercial", label: "Comercial" },
      { value: "atencion-cliente", label: "Atención al cliente" },
      { value: "proveedores", label: "Proveedores" },
      { value: "personas-rrhh", label: "Personas / RRHH" },
      { value: "operaciones", label: "Operaciones" },
      { value: "direccion", label: "Dirección" },
      { value: "varias-areas", label: "Varias áreas" },
      { value: "otra-area", label: "Otra", other: true },
    ],
  },
  {
    id: "problems",
    kind: "multi",
    question: "¿Qué problemas reconoces actualmente?",
    helper: "Puedes seleccionar varios.",
    options: [
      { value: "tareas-manuales", label: "Demasiadas tareas manuales" },
      { value: "informacion-dispersa", label: "Información dispersa" },
      { value: "copiar-datos", label: "Copiar datos entre herramientas" },
      { value: "dificultad-encontrar", label: "Dificultad para encontrar documentos" },
      { value: "errores-duplicidades", label: "Errores o duplicidades" },
      { value: "falta-seguimiento", label: "Falta de seguimiento" },
      { value: "dependencia-email", label: "Dependencia del email" },
      { value: "dependencia-personas", label: "Dependencia de determinadas personas" },
      { value: "mucho-volumen", label: "Mucho volumen de documentación" },
      { value: "falta-control", label: "Falta de control o trazabilidad" },
      { value: "otro-problema", label: "Otro", other: true },
    ],
  },
  {
    id: "information",
    kind: "multi",
    question: "¿Qué tipo de información interviene?",
    options: [
      { value: "documentos-pdf", label: "Documentos / PDF" },
      { value: "email", label: "Email" },
      { value: "hojas-calculo", label: "Hojas de cálculo" },
      { value: "formularios", label: "Formularios" },
      { value: "datos-sistemas", label: "Datos de sistemas" },
      { value: "escaneados", label: "Imágenes o documentos escaneados" },
      { value: "documentacion-interna", label: "Documentación interna" },
      { value: "otra-informacion", label: "Otra", other: true },
    ],
  },
  {
    id: "description",
    kind: "textarea",
    optional: true,
    question: "Cuéntanos brevemente cómo funciona ahora.",
    helper:
      "No necesitas utilizar términos técnicos. Describe qué ocurre desde que empieza el proceso hasta que termina.",
    placeholder:
      "Por ejemplo: las facturas llegan a varios emails, descargamos los PDF manualmente, copiamos los datos a una hoja de cálculo, los revisamos y después los enviamos a la gestoría...",
    maxLength: 500,
  },
  {
    id: "frequency",
    kind: "single",
    question: "¿Con qué frecuencia ocurre?",
    options: [
      { value: "varias-dia", label: "Varias veces al día" },
      { value: "diaria", label: "Diariamente" },
      { value: "varias-semana", label: "Varias veces por semana" },
      { value: "semanal", label: "Semanalmente" },
      { value: "mensual", label: "Mensualmente" },
      { value: "puntual", label: "Puntualmente" },
      { value: "no-se-frecuencia", label: "No lo sé" },
    ],
  },
  {
    id: "tools",
    kind: "multi",
    question: "¿Qué herramientas intervienen actualmente?",
    options: [
      { value: "google-workspace", label: "Google Workspace" },
      { value: "microsoft-365", label: "Microsoft 365" },
      { value: "excel", label: "Excel / hojas de cálculo" },
      { value: "erp", label: "ERP" },
      { value: "crm", label: "CRM" },
      { value: "software-contable", label: "Software contable" },
      { value: "gestor-documental", label: "Gestor documental" },
      { value: "apps-propias", label: "Aplicaciones propias" },
      { value: "otras-herramientas", label: "Otras", other: true },
      { value: "no-se-herramientas", label: "No lo sé" },
    ],
  },
  {
    id: "goals",
    kind: "multi",
    question: "¿Qué te gustaría mejorar principalmente?",
    helper: "Selecciona hasta 3.",
    maxSelect: 3,
    options: [
      { value: "ahorrar-tiempo", label: "Ahorrar tiempo" },
      { value: "reducir-errores", label: "Reducir errores" },
      { value: "organizar-informacion", label: "Organizar mejor la información" },
      { value: "mejorar-control", label: "Mejorar el control" },
      { value: "mejorar-trazabilidad", label: "Mejorar la trazabilidad" },
      { value: "reducir-dependencia-manual", label: "Reducir dependencia de tareas manuales" },
      { value: "aumentar-capacidad", label: "Aumentar capacidad sin aumentar trabajo administrativo" },
      { value: "encontrar-rapido", label: "Encontrar información más rápido" },
      { value: "otro-objetivo", label: "Otro", other: true },
    ],
  },
];

export function findOption(questionId, value) {
  const question = QUESTIONS.find((q) => q.id === questionId);
  return question?.options?.find((option) => option.value === value);
}

export function optionLabel(questionId, value) {
  return findOption(questionId, value)?.label ?? value;
}
