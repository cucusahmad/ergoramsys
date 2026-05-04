import { Banknote, Forklift, ListTodo, type LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems2: NavGroup[] = [
  {
    id: 1,
    label: "Dashboard",
    items: [
      {
        title: "Assessment Form",
        url: "/asessment/asessform",
        icon: Banknote,
      },
      {
        title: "Assessment List",
        url: "/asessment/list",
        icon: ListTodo,
      },
      {
        title: "Company",
        url: "/asessment/coming-soon",
        icon: Forklift,
        comingSoon: true,
      },
    ],
  },
  {
    id: 3,
    label: "Legacy",
    items: [
      {
        title: "asessments",
        url: "/asessment/default-v1",
        subItems: [
          { title: "Default Form", url: "/asessment/default-v1" },
          { title: "Advance Form", url: "/asessment/crm-v1" },
        ],
      },
    ],
  },
];
