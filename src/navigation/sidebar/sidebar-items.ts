import {
  ShoppingBag,
  Forklift,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  SquareMenu,
  Settings2,
  type LucideIcon,
} from "lucide-react";

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

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Applications",
    items: [
      {
        title: "Default",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "CRM",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        title: "Sales",
        url: "/sales",
        icon: Banknote,
        subItems: [
          { title: "Live Orders", url: "/sales/live-orders" },
          { title: "Order History", url: "/sales/order-history" },
          { title: "Reports", url: "/sales/sales-reports" },
        ],
      },
      {
        title: "Menu Management",
        url: "/menu-management",
        icon: SquareMenu,
        subItems: [
          { title: "Menu", url: "/menu-management/menu" },
          { title: "Categories", url: "/menu-management/categories" },
          { title: "Pricing & Availability", url: "/menu-management/add-ons" },
          { title: "Recipes", url: "/menu-management/recipes" },
        ],
      },
      {
        title: "Admin Settings",
        url: "/admin-settings",
        icon: Settings2,
        subItems: [
          { title: "Organization", url: "/admin-settings/organization" },
          { title: "Users", url: "/admin-settings/users" },
          { title: "Roles & Permissions", url: "/admin-settings/roles-permissions" },
          { title: "POS & Devices", url: "/admin-settings/pos-devices" },
          { title: "Tax & Service Charges", url: "/admin-settings/tax-service" },
          { title: "System Preferences", url: "/admin-settings/system-preference" },
          { title: "Backup & Restore", url: "/admin-settings/backup-restore" },
          { title: "System Logs", url: "/admin-settings/system-logs" },
        ],
      },
      // {
      //   title: "Analytics",
      //   url: "/dashboard/coming-soon",
      //   icon: Gauge,
      //   comingSoon: true,
      // },
      // {
      //   title: "E-commerce",
      //   url: "/dashboard/coming-soon",
      //   icon: ShoppingBag,
      //   comingSoon: true,
      // },
      // {
      //   title: "Logistics",
      //   url: "/dashboard/coming-soon",
      //   icon: Forklift,
      //   comingSoon: true,
      // },
    ],
  },
  // {
  //   id: 2,
  //   label: "Pages",
  //   items: [
  //     {
  //       title: "Email",
  //       url: "/dashboard/coming-soon",
  //       icon: Mail,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Chat",
  //       url: "/dashboard/coming-soon",
  //       icon: MessageSquare,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Calendar",
  //       url: "/dashboard/coming-soon",
  //       icon: Calendar,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Kanban",
  //       url: "/dashboard/coming-soon",
  //       icon: Kanban,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Invoice",
  //       url: "/dashboard/coming-soon",
  //       icon: ReceiptText,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Users",
  //       url: "/dashboard/coming-soon",
  //       icon: Users,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Roles",
  //       url: "/dashboard/coming-soon",
  //       icon: Lock,
  //       comingSoon: true,
  //     },
  //     {
  //       title: "Authentication",
  //       url: "/auth",
  //       icon: Fingerprint,
  //       subItems: [
  //         { title: "Login v1", url: "/auth/v1/login", newTab: false },
  //         { title: "Login v2", url: "/auth/v2/login", newTab: true },
  //         { title: "Register v1", url: "/auth/v1/register", newTab: true },
  //         { title: "Register v2", url: "/auth/v2/register", newTab: true },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   label: "Misc",
  //   items: [
  //     {
  //       title: "Others",
  //       url: "/dashboard/coming-soon",
  //       icon: SquareArrowUpRight,
  //       comingSoon: true,
  //     },
  //   ],
  // },
];
