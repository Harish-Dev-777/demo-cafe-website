import React, { createContext, useContext, useState, useEffect, ReactNode, PropsWithChildren } from 'react';
import { MenuItem, User, ContactMessage } from '../types';

interface AppContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  messages: ContactMessage[];
  addMessage: (msg: ContactMessage) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    category: 'coffee',
    price: 6.50,
    description: 'A bright, floral roast with distinct notes of jasmine and lemon zest.',
    image: 'https://picsum.photos/600/800?random=1',
    featured: true
  },
  {
    id: '2',
    name: 'Matcha Croissant',
    category: 'bakery',
    price: 5.00,
    description: 'Buttery, flaky layers infused with premium ceremonial grade matcha dust.',
    image: 'https://picsum.photos/600/800?random=2',
    featured: true
  },
  {
    id: '3',
    name: 'Velvet Cold Brew',
    category: 'coffee',
    price: 5.50,
    description: 'Steeped for 24 hours, nitrogen-infused for a creamy, cascading texture.',
    image: 'https://picsum.photos/600/800?random=3',
    featured: false
  },
  {
    id: '4',
    name: 'Avocado Toast Royale',
    category: 'specials',
    price: 12.00,
    description: 'Sourdough topped with smashed avocado, poached egg, and chili flakes.',
    image: 'https://picsum.photos/600/800?random=4',
    featured: true
  }
];

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from MongoDB
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [item, ...prev]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const login = (email: string) => {
    setUser({ email, role: 'admin' });
  };

  const logout = () => {
    setUser(null);
  };

  const addMessage = (msg: ContactMessage) => {
    setMessages(prev => [msg, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      menuItems, 
      addMenuItem, 
      deleteMenuItem, 
      user, 
      login, 
      logout, 
      messages, 
      addMessage,
      isLoading 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
};