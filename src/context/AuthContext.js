import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('mailbox_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username, password) => {
    if (username === 'admin' && password === 'admin123') {
      const userData = {
        username: 'admin',
        role: '校长',
        name: '张校长',
      };
      setUser(userData);
      sessionStorage.setItem('mailbox_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: '用户名或密码错误' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('mailbox_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}