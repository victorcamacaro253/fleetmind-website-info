import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import HeroPremium from '../components/Hero';
import LogoMarquee from '../components/LogoMarquee';
import BentoEnvironments from '../components/BentoEnvironments';
import StickyChallenges from '../components/StickyChallenges';
import DarkMetrics from '../components/DarkMetrics';
import FinalCTA from '../components/FinalCTA';
import ValueSection from '../components/ValueSection';
import DataIntelligence from '../components/DataIntelligence';
import Industries from '../components/Industries';
import Comparison from '../components/Comparison';
import UseCases from '../components/UseCasesSection';
import DualBrain from '../components/DualBrain';
import PlatformCapabilities from '../components/PlatformCapabilities';
import CaseStudy from '../components/CaseStudy';
import Integrations from '../components/Integrations';
import WhyFleetMind from '../components/WhyFleetMind';

const Home = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500/30">
      <HeroPremium />
      <LogoMarquee />
      <BentoEnvironments />
      <DualBrain />
      <PlatformCapabilities />
      <StickyChallenges />
      <WhyFleetMind />
      <ValueSection />
      
      <CaseStudy />
      <DataIntelligence />
      < UseCases />
      
      <Integrations />       
      <Comparison />
      <FinalCTA />
    </div>
  );
};

export default Home;