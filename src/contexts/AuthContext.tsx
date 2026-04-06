import { createContext, useContext, useState, ReactNode } from "react";

interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
}

interface Order {
  id: string;
  date: string;
  status: "Hazırlanıyor" | "Kargoda" | "Teslim Edildi";
  total: number;
  items: { name: string; quantity: number; price: number }[];
}

interface User {
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (fullName: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("gok-findik-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const stored = localStorage.getItem("gok-findik-addresses");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem("gok-findik-orders");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("gok-findik-favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const persist = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const login = (email: string, _password: string): boolean => {
    const u = { fullName: "Kullanıcı", email };
    setUser(u);
    persist("gok-findik-user", u);
    return true;
  };

  const register = (fullName: string, email: string, _password: string): boolean => {
    const u = { fullName, email };
    setUser(u);
    persist("gok-findik-user", u);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gok-findik-user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    persist("gok-findik-user", updated);
  };

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddr = { ...address, id: Date.now().toString() };
    const updated = [...addresses, newAddr];
    setAddresses(updated);
    persist("gok-findik-addresses", updated);
  };

  const removeAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    persist("gok-findik-addresses", updated);
  };

  const addOrder = (order: Omit<Order, "id" | "date">) => {
    const newOrder: Order = {
      ...order,
      id: `GF-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString("tr-TR"),
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    persist("gok-findik-orders", updated);
  };

  const toggleFavorite = (productId: string) => {
    const updated = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];
    setFavorites(updated);
    persist("gok-findik-favorites", updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        updateProfile,
        addresses,
        addAddress,
        removeAddress,
        orders,
        addOrder,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
