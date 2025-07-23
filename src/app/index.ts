export type NavItem = {
  label: string;        // Text to display
  href: string;         // URL path
  requiresAuth?: boolean; // Optional: show only if user is logged in
};

export type Item = {
  id: string;
  userid: string;
  title: string;
  description: string;
  status: 'lost' | 'found';
  img_url: string;
  location: string;
  date_found: string;
  // add any other fields you have
};

export type User = {
  id: string;
  email: string | null;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
  created_at: string;
};
