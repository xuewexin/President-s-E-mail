import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress } from 'antd';
import {
  EnvironmentOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, LineChart, Line, Cell,
} from 'recharts';
import { tagColorMap, statusColorMap } from '../constants';

const columns = [
  { title: '编号', dataIndex: 'id', key: 'id', width: 110 },
  { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true },
  { title: '标签', dataIndex: 'tag', key: 'tag', width: 80, render: (t) => <Tag color={tagColorMap[t]}>{t}</Tag> },
  { title: '状态', dataIndex: 'status', key: 'status', width: 70, render: (s) => <Tag color={statusColorMap[s]}>{s}</Tag> },
  { title: '时间', dataIndex: 'time', key: 'time', width: 120 },
];

function CampusTemplate({ name, color, stats, tags, trend, list }) {
  const total = stats.total;
  const solved = stats.solved;
  const pending = stats.pending;

  return (
    <div>
      <h2 style={{ marginBottom: 24, color }}>
        <EnvironmentOutlined style={{ marginRight: 8 }} />
        {name} · 统计详情
      </h2>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={8}>
          <Card size="small" style={{ borderTop: `3px solid ${color}` }}>
            <Statistic title="总反馈" value={total} styles={{ content: { color } }} />
          </Card>
        </Col>
        <Col xs={8}>
          <Card size="small">
            <Statistic title="已解决" value={solved} prefix={<CheckCircleOutlined />}
              suffix={<span style={{ fontSize: 13, color: '#52c41a' }}>{Math.round((solved / total) * 100)}%</span>}
              styles={{ content: { color: '#52c41a' } }} />
          </Card>
        </Col>
        <Col xs={8}>
          <Card size="small">
            <Statistic title="待处理" value={pending} prefix={<ExclamationCircleOutlined />}
              styles={{ content: { color: '#fa8c16' } }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="月度反馈趋势" size="small">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <ReTooltip />
                <Line type="monotone" dataKey="反馈" stroke={color} strokeWidth={2} dot={{ fill: color }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="处理进度" size="small">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span>已解决</span>
                <span style={{ color: '#52c41a', fontWeight: 'bold' }}>{solved}</span>
              </div>
              <Progress percent={Math.round((solved / total) * 100)} strokeColor="#52c41a" showInfo={false} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span>处理中</span>
                <span style={{ color: '#1677ff', fontWeight: 'bold' }}>{stats.processing}</span>
              </div>
              <Progress percent={Math.round((stats.processing / total) * 100)} strokeColor="#1677ff" showInfo={false} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span>待处理</span>
                <span style={{ color: '#fa8c16', fontWeight: 'bold' }}>{pending}</span>
              </div>
              <Progress percent={Math.round((pending / total) * 100)} strokeColor="#fa8c16" showInfo={false} />
            </div>
            <div className="resolve-info-box">
              <ClockCircleOutlined style={{ marginRight: 6 }} />
              <span>解决率 {Math.round((solved / total) * 100)}%</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="分类标签分布" size="small">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tags} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="tag" width={80} />
                <ReTooltip />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
                  {tags.map((_, i) => (<Cell key={i} fill={color} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="最新反馈" size="small">
            <Table columns={columns} dataSource={list} pagination={false} size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CampusTemplate;
