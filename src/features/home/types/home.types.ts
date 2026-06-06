export type HomePackage = {
  id: string;
  name: string;
  image: string;
  price: string;
  currency?: string;
  features: string[];
  note?: string;
  buttonLabel: string;
};

export type HomeExperience = {
  id: string;
  title: string;
  image: string;
};

export type HomeContent = {
  seo: {
    title: string;
    description: string;
  };

  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryButton: string;
    secondaryButton: string;
    image: string;
  };

  packages: {
    title: string;
    subtitle: string;
    items: HomePackage[];
  };

  about: {
    title: string;
    subtitle: string;
    description: string;
    buttonLabel: string;
    image: string;
  };

  experiences: {
    backgroundImage: string;
    description: string;
    items: HomeExperience[];
  };

  magic: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
  };

  footer: {
    description: string;
    columns: {
      title: string;
      links: string[];
    }[];
  };
};