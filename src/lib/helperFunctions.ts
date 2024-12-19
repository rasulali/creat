
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
    return "Not Available";
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
