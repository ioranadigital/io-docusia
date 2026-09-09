import {
  ProcessIcon,
  LayersIcon,
  AutomationIcon,
  DatabaseIcon,
  UsersIcon,
  SearchIcon,
} from "../icons";
import styles from "./RecommendationList.module.css";

const ICONS = {
  simplificar: ProcessIcon,
  organizar: LayersIcon,
  "asistir-ia": SearchIcon,
  automatizar: AutomationIcon,
  integrar: DatabaseIcon,
  "mantener-humano": UsersIcon,
};

export default function RecommendationList({ recommendations }) {
  if (!recommendations.length) return null;

  return (
    <div className={styles.list}>
      {recommendations.map((recommendation) => {
        const Icon = ICONS[recommendation.id] ?? ProcessIcon;
        return (
          <article className={styles.card} key={recommendation.id}>
            <span className={styles.icon} aria-hidden="true">
              <Icon size={18} />
            </span>
            <span className={styles.title}>{recommendation.title}</span>
            <span className={styles.text}>{recommendation.text}</span>
          </article>
        );
      })}
    </div>
  );
}
