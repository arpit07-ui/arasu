export interface NavbarItem {
  label: string;
  path: string;
}

export interface NavbarData {
  title: string;
  menuItems: NavbarItem[];
  buttons: NavbarItem[];
}

export const initialNavbarData: NavbarData = {
  title: "🌍ARASU BIODIVERSITY FOUNDATION",
  menuItems: [
    { label: "Home", path: "/" },
    // { label: "The Foundation", path: "/foundation" },
    { label: "Projects", path: "/projects" },
    { label: "AboutUs", path: "/aboutUs" },
    // { label: "Team", path: "/team" },
    { label: "Blogs", path: "/blogs" },
    { label: "Contact", path: "/contact" },
  ],
  buttons: [
    { label: "Support", path: "/support" },
    { label: "Login", path: "/login" },
  ],
};
