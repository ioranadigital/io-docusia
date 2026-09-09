"use client";

import { useId, useRef, useState } from "react";
import {
  EmailIcon,
  DocumentIcon,
  CheckIcon,
  RegistryIcon,
  ArchiveIcon,
  TagIcon,
  LayersIcon,
  SearchIcon,
  UsersIcon,
  SignatureIcon,
  AlertIcon,
  FormIcon,
  ArrowRightIcon,
} from "../icons";
import styles from "./UseCases.module.css";

const TABS = [
  {
    id: "facturas",
    label: "Facturas",
    tag: "Factura recibida",
    flow: [
      { label: "Email", Icon: EmailIcon },
      { label: "Extracción", Icon: DocumentIcon },
      { label: "Validación", Icon: CheckIcon, accent: true },
      { label: "Registro", Icon: RegistryIcon },
      { label: "Archivo", Icon: ArchiveIcon },
    ],
  },
  {
    id: "email",
    label: "Email",
    tag: "Email recibido",
    flow: [
      { label: "Recepción", Icon: EmailIcon },
      { label: "Clasificación", Icon: TagIcon },
      { label: "Extracción", Icon: DocumentIcon },
      { label: "Asignación", Icon: UsersIcon, accent: true },
      { label: "Acción", Icon: CheckIcon },
    ],
  },
  {
    id: "documentos",
    label: "Documentos",
    tag: "Documento recibido",
    flow: [
      { label: "Captura", Icon: DocumentIcon },
      { label: "Clasificación", Icon: TagIcon, accent: true },
      { label: "Organización", Icon: LayersIcon },
      { label: "Archivo", Icon: ArchiveIcon },
      { label: "Recuperación", Icon: SearchIcon },
    ],
  },
  {
    id: "contratos",
    label: "Contratos",
    tag: "Contrato recibido",
    flow: [
      { label: "Documento", Icon: SignatureIcon },
      { label: "Extracción", Icon: DocumentIcon },
      { label: "Análisis", Icon: SearchIcon, accent: true },
      { label: "Registro", Icon: RegistryIcon },
      { label: "Alertas", Icon: AlertIcon },
    ],
  },
  {
    id: "altas",
    label: "Altas",
    tag: "Nueva solicitud de alta",
    flow: [
      { label: "Solicitud", Icon: FormIcon },
      { label: "Documentación", Icon: DocumentIcon },
      { label: "Validación", Icon: CheckIcon, accent: true },
      { label: "Alta", Icon: UsersIcon },
      { label: "Notificación", Icon: AlertIcon },
    ],
  },
  {
    id: "conocimiento",
    label: "Conocimiento",
    tag: "Consulta interna",
    flow: [
      { label: "Documentos", Icon: DocumentIcon },
      { label: "Búsqueda", Icon: SearchIcon },
      { label: "Contexto", Icon: LayersIcon, accent: true },
      { label: "Respuesta", Icon: CheckIcon },
      { label: "Acción", Icon: ArrowRightIcon },
    ],
  },
];

export default function UseCases() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const baseId = useId();
  const tabRefs = useRef([]);

  const activeIndex = TABS.findIndex((tab) => tab.id === activeId);
  const active = TABS[activeIndex];

  function focusTab(index) {
    const nextIndex = (index + TABS.length) % TABS.length;
    setActiveId(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  function onKeyDown(event) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(TABS.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div id="casos-de-uso" aria-labelledby="use-cases-title">
      <p className="eyebrow">Casos de uso</p>
      <h2 id="use-cases-title" className={styles.title}>
        De información a acción.
      </h2>
      <p className={styles.intro}>
        Así convertimos documentos, email y datos en procesos que
        avanzan.
      </p>

      <div className={styles.areas} role="tablist" aria-label="Casos de uso" onKeyDown={onKeyDown}>
        {TABS.map((tab, index) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={isActive ? styles.areaActive : undefined}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        key={active.id}
        className={styles.example}
      >
        <span className={styles.exampleTag}>{active.tag}</span>
        <ol className={styles.exampleFlow}>
          {active.flow.map(({ label, Icon, accent }) => (
            <li key={label} className={accent ? styles.exampleStepAccent : undefined}>
              <span className={styles.exampleIcon}>
                <Icon size={15} />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
