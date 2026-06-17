import React, { useState } from 'react';
import { Layout, Menu, theme, Dropdown, Avatar, Space, Typography, Badge, Button, Tooltip } from 'antd';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  FireOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  ExperimentOutlined,
  BarChartOutlined,
  DesktopOutlined,
  ToolOutlined,
  IdcardOutlined,
  SafetyOutlined,
  FundOutlined,
  AuditOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { departments } from '../constants';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const deptIcons = {
  '后勤处': <ToolOutlined />,
  '教务处': <TrophyOutlined />,
  '学生处': <IdcardOutlined />,
  '保卫处': <SafetyOutlined />,
  '信息化办公室': <DesktopOutlined />,
  '行政管理处': <AuditOutlined />,
};

const allGroupKeys = ['/campus-group', '/feedback-group', '/departments-group'];

const menuItems = [
  {
    key: '/campus-group',
    icon: <EnvironmentOutlined />,
    label: '校区统计',
    children: [
      { key: '/dashboard', icon: <DashboardOutlined />, label: '统计概况' },
      { key: '/campus/stats', icon: <BarChartOutlined />, label: '校区对比' },
      { key: '/campus/longzihu', icon: <EnvironmentOutlined />, label: '龙子湖校区' },
      { key: '/campus/wenhua', icon: <EnvironmentOutlined />, label: '文化路校区' },
      { key: '/campus/xuchang', icon: <EnvironmentOutlined />, label: '许昌校区' },
    ],
  },
  {
    key: '/feedback-group',
    icon: <UnorderedListOutlined />,
    label: '反馈管理',
    children: [
      { key: '/feedback', icon: <UnorderedListOutlined />, label: '所有反馈' },
      { key: '/unresolved', icon: <ExclamationCircleOutlined />, label: '未处理反馈' },
      { key: '/resolved', icon: <CheckCircleOutlined />, label: '已处理反馈' },
    ],
  },
  {
    key: '/departments-group',
    icon: <TeamOutlined />,
    label: '部门分配',
    children: [
      { key: '/departments/overview', icon: <FundOutlined />, label: '部门总览' },
      ...departments.map((d) => ({
        key: `/departments/${d.key === 'hq' ? 'houqin' : d.key === 'jw' ? 'jiaowu' : d.key === 'xs' ? 'xuesheng' : d.key === 'bw' ? 'baowei' : d.key === 'xx' ? 'xinxihua' : 'xingzheng'}`,
        icon: deptIcons[d.name] || <TeamOutlined />,
        label: d.name,
      })),
    ],
  },
  { type: 'divider' },
  {
    key: '/hot-issues',
    icon: <FireOutlined />,
    label: (
      <Space>
        热点追踪
        <Badge count={2} size="small" style={{ marginLeft: 4 }} />
      </Space>
    ),
  },
];

const themeBtnConfig = {
  light: { icon: <MoonOutlined />, label: '暗黑', next: 'dark' },
  dark: { icon: <ExperimentOutlined />, label: '玻璃', next: 'glass' },
  glass: { icon: <SunOutlined />, label: '亮色', next: 'light' },
};

function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [openKeys, setOpenKeys] = useState(allGroupKeys);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleMenuSelect = ({ key }) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    { key: 'role', icon: <UserOutlined />, label: user?.role || '管理员', disabled: true },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true },
  ];

  const getPageTitle = () => {
    const titles = {
      '/dashboard': '统计概况', '/campus/stats': '校区对比', '/campus/longzihu': '龙子湖校区',
      '/campus/wenhua': '文化路校区', '/campus/xuchang': '许昌校区',
      '/feedback': '所有反馈', '/unresolved': '未处理反馈', '/resolved': '已处理反馈',
      '/departments/overview': '部门总览', '/departments/houqin': '后勤处',
      '/departments/jiaowu': '教务处', '/departments/xuesheng': '学生处',
      '/departments/baowei': '保卫处', '/departments/xinxihua': '信息化办公室',
      '/departments/xingzheng': '行政管理处', '/hot-issues': '热点追踪',
    };
    return titles[location.pathname] || '';
  };

  const isDark = mode === 'dark';
  const isGlass = mode === 'glass';
  const isLight = mode === 'light';
  const btnCfg = themeBtnConfig[mode];

  const siderBg = isGlass
    ? 'rgba(255,255,255,0.18)'
    : isDark ? '#1a1a1a' : '#f0f5f0';
  const siderBlur = (isGlass || isLight) ? 'blur(32px) saturate(160%)' : undefined;
  const siderBorder = isGlass
    ? '1px solid rgba(0,0,0,0.05)'
    : isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)';
  const siderLogoColor = isDark ? '#ffd700' : '#1a6b3a';
  const siderTitleColor = isDark ? '#fff' : '#1a3b1e';
  const siderSubColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.45)';
  const siderDivBorder = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)';
  const menuTheme = (isGlass || isLight) ? 'light' : 'dark';

  const headerBg = isGlass
    ? 'rgba(255,255,255,0.15)'
    : isDark ? '#1a1a1a' : 'rgba(255,255,255,0.6)';
  const headerBlur = (isGlass || isLight) ? 'blur(32px) saturate(160%)' : undefined;
  const headerBorder = isGlass
    ? '1px solid rgba(0,0,0,0.04)'
    : isDark ? '2px solid #4ade80' : '2px solid #1a6b3a';
  const headerTextColor = isDark ? '#e0e0e0' : '#333';
  const headerSeparator = isDark ? '#555' : '#ddd';
  const headerTitleColor = isDark ? '#4ade80' : '#1a6b3a';
  const btnColor = isDark ? '#e0e0e0' : '#555';
  const avatarBg = isDark ? '#4ade80' : '#1a6b3a';
  const userNameColor = isDark ? '#e0e0e0' : undefined;

  return (
    <Layout style={{ minHeight: '100vh', background: isGlass ? 'transparent' : undefined }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        style={{
          overflow: 'auto',
          height: 'calc(100vh - 40px)',
          position: 'fixed',
          left: 0,
          top: 40,
          bottom: 0,
          zIndex: 10,
          background: siderBg,
          backdropFilter: siderBlur,
          WebkitBackdropFilter: siderBlur,
          borderRight: siderBorder,
          willChange: 'width',
        }}
      >
        <div style={{
          height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 12px', borderBottom: siderDivBorder, background: 'transparent',
        }}>
          <div style={{
            width: collapsed ? 36 : 44,
            height: collapsed ? 36 : 44,
            borderRadius: '50%',
            overflow: 'hidden',
            background: '#1a6b3a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <img
              src={`${process.env.PUBLIC_URL}/school-logo.png`}
              alt="河南农业大学"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          {!collapsed && (
            <div style={{ marginLeft: 10 }}>
              <div style={{ color: siderTitleColor, fontSize: 15, fontWeight: 'bold', whiteSpace: 'nowrap', lineHeight: 1.3 }}>
                河南农业大学
              </div>
              <div style={{ color: siderSubColor, fontSize: 12, whiteSpace: 'nowrap', letterSpacing: 2 }}>
                校长信箱管理系统
              </div>
            </div>
          )}
        </div>
        <Menu
          theme={menuTheme}
          mode="inline"
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onSelect={handleMenuSelect}
          items={menuItems}
          style={{ borderRight: 0, fontSize: 14, background: 'transparent' }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'margin-left 0.2s', background: isGlass ? 'transparent' : undefined }}>
        <Header style={{
          padding: '0 24px',
          background: headerBg,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 9,
          borderBottom: headerBorder,
          height: 56,
          transition: 'background 0.3s, border-color 0.3s',
          position: 'sticky', top: 0,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          boxShadow: 'none',
        }}>
          <Space>
            <span style={{ fontSize: 18, cursor: 'pointer', color: headerTextColor }}
              onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            {getPageTitle() && (
              <>
                <span style={{ color: headerSeparator, fontSize: 16 }}>|</span>
                <span style={{ fontSize: 14, color: headerTitleColor, fontWeight: 500 }}>
                  {getPageTitle()}
                </span>
              </>
            )}
          </Space>
          <Space size="middle">
            <Tooltip title={`切换到${btnCfg.label}模式`}>
              <Button type="text" icon={btnCfg.icon} onClick={toggleTheme}
                style={{ fontSize: 18, color: btnColor, transition: 'all 0.3s' }} />
            </Tooltip>
            <Dropdown menu={{ items: userMenuItems, onClick: ({ key }) => { if (key === 'logout') handleLogout(); } }}>
              <Space style={{ cursor: 'pointer' }}>
                <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: avatarBg }} />
                <Text style={{ color: userNameColor }}>{user?.name || user?.username}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{
          margin: 16, padding: 20,
          background: isGlass || isLight ? 'transparent' : colorBgContainer,
          borderRadius: borderRadiusLG, minHeight: 'calc(100vh - 88px)', overflow: 'auto',
          transition: 'background 0.3s',
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
