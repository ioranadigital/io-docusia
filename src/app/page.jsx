"use client";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import ManualWorkFlow from "../components/ManualWorkFlow/ManualWorkFlow";
import Specialization from "../components/Specialization/Specialization";
import Solutions from "../components/Solutions/Solutions";
import Methodology from "../components/Methodology/Methodology";
import Capabilities from "../components/Capabilities/Capabilities";
import UseCases from "../components/UseCases/UseCases";
import Results from "../components/Results/Results";
import SplitSection from "../components/SplitSection/SplitSection";
import DiagnosisCTA from "../components/DiagnosisCTA/DiagnosisCTA";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ManualWorkFlow />
        <Specialization />
        <Solutions />
        <SplitSection
          tone="surface"
          ratio="60-40"
          left={<Methodology />}
          right={<Capabilities />}
        />
        <SplitSection left={<UseCases />} right={<Results />} />
        <DiagnosisCTA />
      </main>
      <Footer />
    </>
  );
}
