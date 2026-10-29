// types.ts or at top of your component
export interface Texts {
  inicio?: Array<{ es: { carreer: string }; en: { carreer: string } }>;
  sobreMi?: Array<{
    es: {
      title: string;
      span: string;
      presentation: string;
      // include other fields used in "sobreMi"
    };
    en: {
      title: string;
      span: string;
      presentation: string;
      // include other fields used in "sobreMi"
    };
  }>;
  footer?: any;
  skills?: any;
  projects?: any;
  curriculum?: any;
  Portfolio?: any;
  contact?: any;
  aboutme?: any;
    websites?: Array<{
    es: {
      title: string;
      viewDetails: string;
      visit: string;
      descriptionTitle: string;
      objective?: string;
      intendedFor?: string;
      featureTitle?: string;
      TechnicalTitle?: string;
      TechnologyTitle?: string;
      QuickLinks?: string;
      cards: Array<{
        title: string;
        description: string;
        detailedDescription: string;
        objective?: string;
        intendedFor?: string;
        url: string;
        github: string;
        gallery?: string[];
        technologies: string[];
        features: string[];
        challenges: string[];
      }>;
    };
    en: {
      title: string;
      viewDetails: string;
      visit: string;
      descriptionTitle: string;
      objective?: string;
      intendedFor?: string;
      featureTitle?: string;
      TechnicalTitle?: string;
      TechnologyTitle?: string;
      QuickLinks?: string;
      cards: Array<{
        title: string;
        description: string;
        detailedDescription: string;
        objective?: string;
        intendedFor?: string;
        url: string;
        github: string;
        gallery?: string[];
        technologies: string[];
        features: string[];
        challenges: string[];
      }>;
    };
  }>;
}

  