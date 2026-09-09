"use client";

import { useMemo, useState } from "react";
import DiagnosisIntro from "./DiagnosisIntro";
import DiagnosisProgress from "./DiagnosisProgress";
import DiagnosisQuestion from "./DiagnosisQuestion";
import DiagnosisAnalyzing from "./DiagnosisAnalyzing";
import DiagnosisResults from "./DiagnosisResults";
import { QUESTIONS } from "./data/questions";
import { evaluateDiagnosis } from "./data/engine";
import { DIAGNOSIS_EVENTS, track } from "./data/analytics";
import styles from "./DiagnosisApp.module.css";

const PHASES = {
  INTRO: "intro",
  QUESTION: "question",
  ANALYZING: "analyzing",
  RESULTS: "results",
};

export default function DiagnosisApp() {
  const [phase, setPhase] = useState(PHASES.INTRO);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = QUESTIONS[stepIndex];

  const result = useMemo(() => {
    if (phase !== PHASES.RESULTS) return null;
    return evaluateDiagnosis(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function handleStart() {
    track(DIAGNOSIS_EVENTS.STARTED);
    setStepIndex(0);
    setPhase(PHASES.QUESTION);
  }

  function handleAnswer(questionId, value) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
  }

  function handleOtherText(questionId, text) {
    setAnswers((current) => ({ ...current, [`${questionId}Other`]: text }));
  }

  function handleBack() {
    if (stepIndex === 0) {
      setPhase(PHASES.INTRO);
      return;
    }
    setStepIndex((index) => index - 1);
  }

  function handleContinue() {
    track(DIAGNOSIS_EVENTS.STEP_COMPLETED, {
      step: stepIndex + 1,
      questionId: currentQuestion.id,
    });

    if (stepIndex < QUESTIONS.length - 1) {
      setStepIndex((index) => index + 1);
      return;
    }

    setPhase(PHASES.ANALYZING);
  }

  function handleAnalyzingDone() {
    setPhase(PHASES.RESULTS);
  }

  if (phase === PHASES.INTRO) {
    return <DiagnosisIntro onStart={handleStart} />;
  }

  if (phase === PHASES.ANALYZING) {
    return <DiagnosisAnalyzing onDone={handleAnalyzingDone} />;
  }

  if (phase === PHASES.RESULTS) {
    return <DiagnosisResults result={result} />;
  }

  return (
    <section className={`section ${styles.section}`} aria-labelledby="diagnosis-question-title">
      <div className="container">
        <div className={styles.centered}>
          <h1 id="diagnosis-question-title" className="visuallyHidden">
            Docusia Diagnosis
          </h1>
          <p className="eyebrow">Docusia Diagnosis</p>
          <DiagnosisProgress step={stepIndex + 1} total={QUESTIONS.length} />
          <DiagnosisQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            otherText={answers[`${currentQuestion.id}Other`]}
            onAnswer={handleAnswer}
            onOtherText={handleOtherText}
            onBack={handleBack}
            onContinue={handleContinue}
            canGoBack
            continueLabel={stepIndex === QUESTIONS.length - 1 ? "Ver mi análisis" : "Continuar"}
          />
        </div>
      </div>
    </section>
  );
}
