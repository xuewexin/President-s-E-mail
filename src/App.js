import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import GlobalShell from './components/GlobalShell';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import MailboxDashboard from './pages/MailboxDashboard';
import MailboxFeedback from './pages/feedback/MailboxFeedback';
import UnresolvedFeedback from './pages/feedback/UnresolvedFeedback';
import ResolvedFeedback from './pages/feedback/ResolvedFeedback';
import CampusStats from './pages/campus/CampusStats';
import LongzihuCampus from './pages/campus/LongzihuCampus';
import WenhuaRoadCampus from './pages/campus/WenhuaRoadCampus';
import XuchangCampus from './pages/campus/XuchangCampus';
import HotIssues from './pages/HotIssues';
import DeptOverview from './pages/departments/Overview';
import Houqin from './pages/departments/Houqin';
import Jiaowu from './pages/departments/Jiaowu';
import Xuesheng from './pages/departments/Xuesheng';
import Baowei from './pages/departments/Baowei';
import Xinxihua from './pages/departments/Xinxihua';
import Xingzheng from './pages/departments/Xingzheng';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><MainLayout><MailboxDashboard /></MainLayout></ProtectedRoute>} />
      <Route path="/campus/stats" element={<ProtectedRoute><MainLayout><CampusStats /></MainLayout></ProtectedRoute>} />
      <Route path="/campus/longzihu" element={<ProtectedRoute><MainLayout><LongzihuCampus /></MainLayout></ProtectedRoute>} />
      <Route path="/campus/wenhua" element={<ProtectedRoute><MainLayout><WenhuaRoadCampus /></MainLayout></ProtectedRoute>} />
      <Route path="/campus/xuchang" element={<ProtectedRoute><MainLayout><XuchangCampus /></MainLayout></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><MainLayout><MailboxFeedback /></MainLayout></ProtectedRoute>} />
      <Route path="/unresolved" element={<ProtectedRoute><MainLayout><UnresolvedFeedback /></MainLayout></ProtectedRoute>} />
      <Route path="/resolved" element={<ProtectedRoute><MainLayout><ResolvedFeedback /></MainLayout></ProtectedRoute>} />
      <Route path="/departments/overview" element={<ProtectedRoute><MainLayout><DeptOverview /></MainLayout></ProtectedRoute>} />
      <Route path="/departments/houqin" element={<ProtectedRoute><MainLayout><Houqin /></MainLayout></ProtectedRoute>} />
      <Route path="/departments/jiaowu" element={<ProtectedRoute><MainLayout><Jiaowu /></MainLayout></ProtectedRoute>} />
      <Route path="/departments/xuesheng" element={<ProtectedRoute><MainLayout><Xuesheng /></MainLayout></ProtectedRoute>} />
      <Route path="/departments/baowei" element={<ProtectedRoute><MainLayout><Baowei /></MainLayout></ProtectedRoute>} />
      <Route path="/departments/xinxihua" element={<ProtectedRoute><MainLayout><Xinxihua /></MainLayout></ProtectedRoute>} />
      <Route path="/departments/xingzheng" element={<ProtectedRoute><MainLayout><Xingzheng /></MainLayout></ProtectedRoute>} />
      <Route path="/hot-issues" element={<ProtectedRoute><MainLayout><HotIssues /></MainLayout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function ThemedApp() {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const isGlass = mode === 'glass';
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const antdTheme = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#007A44',
      borderRadius: 6,
      colorBgContainer: isGlass ? 'rgba(255,255,255,0.12)' : '#ffffff',
      colorBgLayout: isGlass ? 'transparent' : (isDark ? '#0d0d0d' : '#f5f7f5'),
      fontFamily: "'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif",
    },
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <div className={`app-root theme-${mode}`}>
        <GlobalShell compact={!isLogin} mode={mode}>
          <AppRoutes />
        </GlobalShell>
      </div>
    </ConfigProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
