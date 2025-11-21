export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'bakery' | 'specials';
  image?: string;
  featured?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export enum AppRoutes {
  HOME = '/',
  MENU = '/menu',
  ABOUT = '/about',
  CONTACT = '/contact',
  ADMIN = '/admin',
}

export interface User {
  email: string;
  role: 'admin' | 'customer';
}