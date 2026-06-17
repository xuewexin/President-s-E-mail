import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography, Tag, ConfigProvider } from 'antd';
import { UserOutlined, LockOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const campuses = ['文化路校区', '龙子湖校区', '许昌校区'];

function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      const result = login(values.username, values.password);
      if (result.success) {
        message.success('登录成功，欢迎回来！');
        navigate('/dashboard');
      } else {
        message.error(result.message);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'rgba(255,255,255,0.08)',
          colorBgElevated: 'rgba(255,255,255,0.08)',
          colorBgLayout: 'transparent',
          colorBorderSecondary: 'rgba(255,255,255,0.12)',
          colorText: 'rgba(255,255,255,0.85)',
          colorTextPlaceholder: 'rgba(255,255,255,0.35)',
          colorTextDescription: 'rgba(255,255,255,0.45)',
          colorIcon: 'rgba(255,255,255,0.4)',
          colorIconHover: 'rgba(255,255,255,0.65)',
          colorPrimary: '#ffd700',
        },
      }}
    >
      <div
        style={{
          minHeight: 'calc(100vh - 180px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: `url(${process.env.PUBLIC_URL}/login-bg.jpg) center/cover no-repeat`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 0,
          }}
        />

        <div style={{ textAlign: 'center', marginBottom: 24, position: 'relative', zIndex: 1 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.2)',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/school-logo.png`}
              alt="河南农业大学校徽"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '50%',
              }}
            />
          </div>
          <Title level={2} style={{ color: '#fff', marginBottom: 0, letterSpacing: 4, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            河南农业大学
          </Title>
          <div
            style={{
              width: 60,
              height: 3,
              background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
              margin: '12px auto',
            }}
          />
          <Title level={4} style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 400, marginTop: 0, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
            校长信箱管理系统
          </Title>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
            {campuses.map((c) => (
              <Tag key={c} color="gold" style={{ margin: 0 }}>
                <EnvironmentOutlined /> {c}
              </Tag>
            ))}
          </div>
        </div>

        <Card
          className="login-glass-card"
          style={{
            width: 420,
            position: 'relative',
            zIndex: 1,
          }}
          styles={{ body: { padding: '40px 36px' } }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Text>请使用管理员账号登录系统</Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            size="large"
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="用户名"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{
                  height: 44,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #ffd700, #f0a500)',
                  border: 'none',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#1a3b1e',
                }}
              >
                登 录
              </Button>
            </Form.Item>
          </Form>

          <div
            style={{
              textAlign: 'center',
              padding: '8px 12px',
              borderRadius: 8,
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 12 }}>
              测试账号：admin / admin123
            </Text>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
}

export default Login;
