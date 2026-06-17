import React, { useState } from 'react';
import { Card, Row, Col, Table, Tag, Progress, Modal, Descriptions, Statistic } from 'antd';
import {
  TeamOutlined, PhoneOutlined, MailOutlined, CheckCircleOutlined, ClockCircleOutlined,
  ExclamationCircleOutlined, EnvironmentOutlined, ToolOutlined, TrophyOutlined,
  IdcardOutlined, SafetyOutlined, DesktopOutlined, AuditOutlined,
} from '@ant-design/icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer,
} from 'recharts';
import { departments, deptStats } from '../../constants';

const iconMap = { ToolOutlined: <ToolOutlined />, TrophyOutlined: <TrophyOutlined />, IdcardOutlined: <IdcardOutlined />, SafetyOutlined: <SafetyOutlined />, DesktopOutlined: <DesktopOutlined />, AuditOutlined: <AuditOutlined /> };

const allDeptTotal = deptStats.reduce((s, d) => s + d.total, 0);

const statusData = Object.entries(
  deptStats.reduce((acc, d) => {
    acc.solved = (acc.solved || 0) + d.solved;
    acc.processing = (acc.processing || 0) + d.processing;
    acc.pending = (acc.pending || 0) + d.pending;
    return acc;
  }, { total: allDeptTotal, solved: 0, processing: 0, pending: 0 })
).filter(([k]) => k !== 'total').map(([k, v]) => ({ status: k === 'solved' ? '已解决' : k === 'processing' ? '处理中' : '待处理', count: v, color: k === 'solved' ? '#52c41a' : k === 'processing' ? '#1677ff' : '#fa8c16' }));

const columns = [
  { title: '部门', dataIndex: 'dept', key: 'dept', width: 100 },
  { title: '总量', dataIndex: 'total', key: 'total', width: 60, sorter: (a, b) => a.total - b.total },
  { title: '已解决', dataIndex: 'solved', key: 'solved', width: 70, render: (v) => <span style={{ color: '#52c41a' }}>{v}</span> },
  { title: '处理中', dataIndex: 'processing', key: 'processing', width: 70, render: (v) => <span style={{ color: '#1677ff' }}>{v}</span> },
  { title: '待处理', dataIndex: 'pending', key: 'pending', width: 70, render: (v) => <span style={{ color: '#fa8c16' }}>{v}</span> },
  { title: '解决率', dataIndex: 'total', key: 'rate', width: 120,
    render: (total, record) => <Progress percent={Math.round((record.solved / total) * 100)} size="small" strokeColor={record.color} format={(p) => `${p}%`} /> },
];

const chartData = deptStats.map((d) => ({ name: d.dept, 已解决: d.solved, 处理中: d.processing, 待处理: d.pending, color: d.color }));

function DeptOverview() {
  const [detailDept, setDetailDept] = useState(null);

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#1a6b3a' }}>
        <TeamOutlined style={{ marginRight: 8 }} />
        部门分配 · 总览
      </h2>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="部门总数" value={departments.length} prefix={<TeamOutlined />} styles={{ content: { color: '#1a6b3a', fontSize: 24 } }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="总反馈量" value={allDeptTotal} prefix={<MailOutlined />} styles={{ content: { color: '#1677ff', fontSize: 24 } }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="已解决" value={statusData.find((s) => s.status === '已解决')?.count || 0} prefix={<CheckCircleOutlined />} styles={{ content: { color: '#52c41a', fontSize: 24 } }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="待处理" value={statusData.find((s) => s.status === '待处理')?.count || 0} prefix={<ExclamationCircleOutlined />} styles={{ content: { color: '#fa8c16', fontSize: 24 } }} /></Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {departments.map((dept) => (
          <Col xs={24} sm={12} lg={8} key={dept.key}>
            <Card hoverable style={{ borderTop: `4px solid ${dept.color}` }}
              onClick={() => setDetailDept(dept)}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 28, marginRight: 10 }}>{iconMap[dept.icon]}</span>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>{dept.name}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>负责人：{dept.leader}</div>
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <PhoneOutlined style={{ color: '#999', marginRight: 6, fontSize: 12 }} />
                <span style={{ fontSize: 12, color: '#666' }}>{dept.phone}</span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <MailOutlined style={{ color: '#999', marginRight: 6, fontSize: 12 }} />
                <span style={{ fontSize: 12, color: '#666' }}>{dept.email}</span>
              </div>
              <div>
                <span style={{ fontSize: 11, color: '#999' }}>负责标签：</span>
                {dept.tags.map((t) => <Tag key={t} color={dept.color} style={{ marginBottom: 2 }}>{t}</Tag>)}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="各部门处理统计" style={{ marginTop: 16 }}>
        <Table columns={columns} dataSource={deptStats} pagination={false} size="middle" />
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="各部门处理分布" size="small">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <ReTooltip />
                <Bar dataKey="已解决" fill="#52c41a" radius={[6, 6, 0, 0]} />
                <Bar dataKey="处理中" fill="#1677ff" radius={[6, 6, 0, 0]} />
                <Bar dataKey="待处理" fill="#fa8c16" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="处理进度总览" size="small">
            {statusData.map((item) => {
              const pct = Math.round((item.count / allDeptTotal) * 100);
              return (
                <div key={item.status} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                    <span>{item.status}</span><span style={{ color: item.color, fontWeight: 'bold' }}>{item.count}</span>
                  </div>
                  <Progress percent={pct} strokeColor={item.color} showInfo={false} />
                </div>
              );
            })}
            <div className="resolve-info-box">
              <ClockCircleOutlined style={{ marginRight: 6 }} />
              <span>总解决率 {Math.round(((statusData.find((s) => s.status === '已解决')?.count || 0) / allDeptTotal) * 100)}%</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal title="部门详情" open={!!detailDept} onCancel={() => setDetailDept(null)} footer={null} width={520}>
        {detailDept && (
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="部门名称">
              <span style={{ fontSize: 18 }}>{detailDept.icon}</span> {detailDept.name}
            </Descriptions.Item>
            <Descriptions.Item label="负责人">{detailDept.leader}</Descriptions.Item>
            <Descriptions.Item label="联系电话"><PhoneOutlined /> {detailDept.phone}</Descriptions.Item>
            <Descriptions.Item label="电子邮箱"><MailOutlined /> {detailDept.email}</Descriptions.Item>
            <Descriptions.Item label="办公地点"><EnvironmentOutlined /> {detailDept.office}</Descriptions.Item>
            <Descriptions.Item label="负责范围">
              {detailDept.tags.map((t) => <Tag key={t} color={detailDept.color}>{t}</Tag>)}
            </Descriptions.Item>
            <Descriptions.Item label="当前任务">
              {(() => {
                const stat = deptStats.find((s) => s.dept === detailDept.name);
                if (!stat) return '-';
                return (
                  <div>
                    <Tag color="green">已解决 {stat.solved}</Tag>
                    <Tag color="blue">处理中 {stat.processing}</Tag>
                    <Tag color="orange">待处理 {stat.pending}</Tag>
                  </div>
                );
              })()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

export default DeptOverview;
