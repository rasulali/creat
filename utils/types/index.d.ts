declare global {
  interface Service {
    name: string;
    description: string;
    icon: ReactNode;
    link?: string;
  }
  interface Testimonial {
    stars: 1 | 2 | 3 | 4 | 5;
    comment: string;
    name: string;
    role: string;
    image: string;
  }
  interface ColumnWidth {
    date: number;
    category: number;
    name: number;
    location: number;
    description: number;
    images: number;
  }

  type ParagraphAnimationProps = {
    children: ReactNode;
    maxDelay?: number;
    minDelay?: number;
  };

  type Item = {
    label: string;
    href: string;
  };

  type LanguageState = {
    en: boolean;
    az: boolean;
    ru: boolean;
  };

  type Category = {
    name: string;
    icon: IconType;
    description?: string;
  };

  type partnerProject = {
    name: string;
    heading: string;
    desc?: string;
    images: string[];
  };

  type partners = {
    id: number;
    name: string;
    logo: string;
    link: string;
    animated?: boolean;
    color: string;
    searchTerm?: string;
  };

  type partnerProject = {
    name: string;
    heading: string;
    desc?: string;
    images: string[];
  };

  interface PartnerProjectProps {
    activePartner: partnerProject;
    setSrcSet: (images: string[]) => void;
    setFullScreenIndex: (index: number) => void;
  }

  interface MenuDataType {
    name: string;
    email: string;
    role: string;
  }
  interface tableTypes {
    category: string;
    name: string;
    description?: string;
    images: Record<string, string>;
    location?: string;
    service?: string;
  }

  type UserDataType = {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: Date;
  };

  type ImageUrls = Record<string, string>;

  type Project = {
    id: number;
    created_at: string;
    category: string;
    description?: string;
    name: string;
    images: ImageUrls;
    location?: string;
    service?: string;
    rank: number;
    bannerImage: string;
  };

  type AboutTab = {
    [key: number]: {
      main: {
        name: string;
        desc: string;
      };
      tab_l: {
        name: string;
        desc: string;
      };
      tab_r: {
        name: string;
        desc: string;
      };
    };
  };
}

export {};
