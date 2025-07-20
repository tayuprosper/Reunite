type NavItem = {
  label: string;        // Text to display
  href: string;         // URL path
  requiresAuth?: boolean; // Optional: show only if user is logged in
};