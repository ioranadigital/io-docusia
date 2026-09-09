// Motor de evaluación de Docusia Diagnosis — V1.
//
// Determinista y basado en reglas explícitas, sin IA ni backend. Cada regla
// documenta qué respuestas la activan y a qué dimensión aporta oportunidad.
// Pensado para poder sustituirse o complementarse en el futuro (API, IA,
// n8n, CRM) sin cambiar la interfaz: recibe `answers` y devuelve un
// resultado plano que la UI simplemente pinta.
//
// No se generan puntuaciones tipo "87/100": solo estados cualitativos.

import { optionLabel } from "./questions";

export const DIMENSIONS = [
  { id: "organizacion", label: "Organización de la información" },
  { id: "manual", label: "Trabajo manual" },
  { id: "inteligencia", label: "Inteligencia" },
  { id: "automatizacion", label: "Automatización" },
  { id: "integracion", label: "Integración" },
];

const LEVELS = {
  0: "Requiere análisis",
  1: "Oportunidad baja",
  2: "Oportunidad media",
  3: "Oportunidad alta",
};

function levelFromScore(score) {
  const capped = Math.min(score, 3);
  return LEVELS[capped];
}

const HIGH_FREQUENCY = ["varias-dia", "diaria"];
const INTEGRATION_TOOLS = ["erp", "crm", "software-contable", "google-workspace", "microsoft-365"];
const READABLE_INFO = ["documentos-pdf", "email", "escaneados", "documentacion-interna"];

// Cada regla: qué dimensión incrementa, por qué (documentado para poder
// evolucionarla) y la condición determinista sobre las respuestas.
const RULES = [
  {
    id: "organizacion-dispersión",
    dimension: "organizacion",
    reason: "Información dispersa, difícil de encontrar o mucho volumen documental.",
    test: (a) =>
      a.problems.includes("informacion-dispersa") ||
      a.problems.includes("dificultad-encontrar") ||
      a.problems.includes("mucho-volumen"),
  },
  {
    id: "organizacion-control",
    dimension: "organizacion",
    reason: "Falta de control o trazabilidad sobre la información.",
    test: (a) => a.problems.includes("falta-control"),
  },
  {
    id: "manual-tareas",
    dimension: "manual",
    reason: "Demasiadas tareas manuales o copiar datos entre herramientas.",
    test: (a) => a.problems.includes("tareas-manuales") || a.problems.includes("copiar-datos"),
  },
  {
    id: "manual-frecuencia",
    dimension: "manual",
    reason: "El proceso ocurre con alta frecuencia (diaria o varias veces al día).",
    test: (a) => HIGH_FREQUENCY.includes(a.frequency),
  },
  {
    id: "inteligencia-informacion",
    dimension: "inteligencia",
    reason:
      "Interviene información que normalmente requiere leer, clasificar o extraer datos (documentos, email, escaneados, documentación interna).",
    test: (a) => a.information.some((value) => READABLE_INFO.includes(value)),
  },
  {
    id: "inteligencia-volumen",
    dimension: "inteligencia",
    reason: "El volumen o la dispersión sugieren tareas de lectura o clasificación relevantes.",
    test: (a) =>
      a.problems.includes("mucho-volumen") || a.problems.includes("dificultad-encontrar"),
  },
  {
    id: "automatizacion-tareas",
    dimension: "automatizacion",
    reason: "Tareas manuales o copiar datos son candidatas típicas a automatización basada en reglas.",
    test: (a) => a.problems.includes("tareas-manuales") || a.problems.includes("copiar-datos"),
  },
  {
    id: "automatizacion-frecuencia",
    dimension: "automatizacion",
    reason: "Frecuencia alta incrementa el retorno de automatizar el proceso.",
    test: (a) => HIGH_FREQUENCY.includes(a.frequency),
  },
  {
    id: "integracion-herramientas",
    dimension: "integracion",
    reason: "Intervienen sistemas típicamente aislados entre sí (ERP, CRM, contable, Workspace/365).",
    test: (a) => a.tools.some((value) => INTEGRATION_TOOLS.includes(value)),
  },
  {
    id: "integracion-multiples",
    dimension: "integracion",
    reason: "Participan varias herramientas distintas en el mismo proceso.",
    test: (a) => a.tools.filter((value) => value !== "no-se-herramientas").length >= 2,
  },
];

function computeOpportunities(answers) {
  const scores = Object.fromEntries(DIMENSIONS.map((d) => [d.id, 0]));
  const matched = Object.fromEntries(DIMENSIONS.map((d) => [d.id, []]));

  RULES.forEach((rule) => {
    if (rule.test(answers)) {
      scores[rule.dimension] += 1;
      matched[rule.dimension].push({ id: rule.id, reason: rule.reason });
    }
  });

  return DIMENSIONS.map((dimension) => ({
    id: dimension.id,
    label: dimension.label,
    score: Math.min(scores[dimension.id], 3),
    level: levelFromScore(scores[dimension.id]),
    matchedRules: matched[dimension.id],
  }));
}

// Recomendaciones preliminares: solo se muestran las relevantes.
function computeRecommendations(answers, opportunities) {
  const byId = Object.fromEntries(opportunities.map((o) => [o.id, o]));
  const recommendations = [];

  if (
    answers.problems.includes("falta-seguimiento") ||
    answers.problems.includes("errores-duplicidades")
  ) {
    recommendations.push({
      id: "simplificar",
      title: "Simplificar",
      text: "Revisar pasos que no aportan valor o generan duplicidad.",
    });
  }

  if (byId.organizacion.score >= 1) {
    recommendations.push({
      id: "organizar",
      title: "Organizar",
      text: "Estructurar mejor documentos, datos y criterios de información.",
    });
  }

  if (byId.inteligencia.score >= 1) {
    recommendations.push({
      id: "asistir-ia",
      title: "Asistir con IA",
      text: "Evaluar tareas de lectura, clasificación, extracción, resumen o validación.",
    });
  }

  if (byId.automatizacion.score >= 1) {
    recommendations.push({
      id: "automatizar",
      title: "Automatizar",
      text: "Evaluar tareas repetitivas basadas en reglas.",
    });
  }

  if (byId.integracion.score >= 1) {
    recommendations.push({
      id: "integrar",
      title: "Integrar",
      text: "Revisar movimientos manuales de información entre herramientas.",
    });
  }

  if (
    answers.problems.includes("dependencia-personas") ||
    ["contratos", "facturas"].includes(answers.process)
  ) {
    recommendations.push({
      id: "mantener-humano",
      title: "Mantener humano",
      text: "Identificar decisiones donde el criterio humano debe seguir siendo central.",
    });
  }

  return recommendations;
}

function normalizeAnswers(answers) {
  return {
    process: answers.process ?? "",
    processOther: answers.processOther ?? "",
    area: answers.area ?? "",
    areaOther: answers.areaOther ?? "",
    problems: answers.problems ?? [],
    problemsOther: answers.problemsOther ?? "",
    information: answers.information ?? [],
    informationOther: answers.informationOther ?? "",
    description: answers.description ?? "",
    frequency: answers.frequency ?? "",
    tools: answers.tools ?? [],
    toolsOther: answers.toolsOther ?? "",
    goals: answers.goals ?? [],
    goalsOther: answers.goalsOther ?? "",
  };
}

export function evaluateDiagnosis(rawAnswers) {
  const answers = normalizeAnswers(rawAnswers);
  const opportunities = computeOpportunities(answers);
  const recommendations = computeRecommendations(answers, opportunities);

  return {
    processLabel:
      answers.process === "otro-proceso" && answers.processOther
        ? answers.processOther
        : optionLabel("process", answers.process),
    areaLabel:
      answers.area === "otra-area" && answers.areaOther
        ? answers.areaOther
        : optionLabel("area", answers.area),
    problemLabels: answers.problems.map((value) =>
      value === "otro-problema" && answers.problemsOther
        ? answers.problemsOther
        : optionLabel("problems", value)
    ),
    opportunities,
    recommendations,
  };
}
