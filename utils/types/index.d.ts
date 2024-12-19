declare global {
  type partners = { logo: string, name: string }

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
    name: string,
    icon: IconType,
  }

  type partnerProject = {
    name: string,
    heading: string,
    desc?: string,
    images: string[],
  }

  type partners = {
    name?: string,
    logo: string,
    link?: string,
    animated?: boolean,
    color?: string,
    projects?: partnerProject[]
  }

  type partnerProject = {
    name: string,
    heading: string,
    desc?: string,
    images: string[],
  }

  interface PartnerProjectProps {
    activePartner: partnerProject
    setSrcSet: (images: string[]) => void;
    setFullScreenIndex: (index: number) => void;
  }

  interface MenuDataType {
    name: string;
    email: string;
    role: string;
  }
  interface tableTypes {
    page: string;
    category: string;
    name: string;
    description?: string;
    images: Record<string, string>;
    location?: string;
    date?: string;
    service?: string;
  }
  interface dataTableTypes {
    date: string;
    category: string;
    page: string;
    name: string;
    description?: string;
    images: Record<string, string>;
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
    page: string;
    name: string;
    images: ImageUrls | null;
    location?: string;
    date?: string;
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

export { };

