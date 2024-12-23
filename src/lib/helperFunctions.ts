
import {
  FaLeaf,
  FaHelmetSafety,
  FaTractor,
  FaBuilding,
  FaTruck,
} from "react-icons/fa6"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatDate = (dateString?: string): string => {
  const date = dateString ? new Date(dateString) : null;

  if (!date || isNaN(date.getTime())) {
    return '';
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};


export const categories: Record<string, Category> = {
  'green-energy-sustainability': {
    name: 'Green Energy',
    icon: FaLeaf,
  },
  'industrial-manufacturing': {
    name: 'Industrial',
    icon: FaHelmetSafety,
  },
  'agriculture-food': {
    name: 'Agriculture',
    icon: FaTractor,
  },
  'commercial-social': {
    name: 'Infrastructure',
    icon: FaBuilding,
  },
  'transportation-logistics': {
    name: 'Logistics',
    icon: FaTruck,
  }
};

export const handleImageName = (name: string) => {
  let displayName: string = name;
  let extension = "";
  if (name.startsWith("$")) {
    displayName = name.slice(1);
  }
  const maxLength = 18;
  const dotIndex = displayName.lastIndexOf(".");
  if (dotIndex !== -1) {
    extension = displayName.slice(dotIndex);
    displayName = displayName.slice(0, dotIndex);
  }

  const availableChars = Math.max(0, maxLength - extension.length - 3);
  if (displayName.length > availableChars) {
    return displayName.slice(0, availableChars) + "..." + extension;
  } else return displayName + extension;
};

export const handleDisplayName = (name: string) => {
  let displayName: string = name;
  if (name.startsWith("$")) {
    displayName = name.slice(1);
  } else {
    displayName = ''
  }
  return displayName;
};
