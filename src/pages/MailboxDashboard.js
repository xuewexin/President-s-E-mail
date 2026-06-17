import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress, Tooltip } from 'antd';
import {
  MailOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined,
  FireOutlined, EnvironmentOutlined, TeamOutlined,
} from '@ant-design/icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, Cell, Legend, LineChart, Line,
} from 'recharts';
import HenanMap from '../components/HenanMap';
import { campusOptions, tagOptions as tagOpts } from '../constants';

const campusList = campusOptions.map((c) => ({ name: c.value, color: c.color }));
const tagList = tagOpts.map((t, i) => ({ ...t, count: [86, 64, 53, 42, 38, 35, 22, 18, 15][i] }));

const statusData = [
  { status: '已解决', count: 245, color: '#52c41a' },
  { status: '处理中', count: 78, color: '#1677ff' },
  { status: '待处理', count: 50, color: '#fa8c16' },
];

const campusBreakdown = [
  { campus: '龙子湖校区', 已解决: 118, 处理中: 38, 待处理: 24, total: 180 },
  { campus: '文化路校区', 已解决: 82, 处理中: 28, 待处理: 16, total: 126 },
  { campus: '许昌校区', 已解决: 45, 处理中: 12, 待处理: 10, total: 67 },
];

const monthlyTrend = [
  { month: '1月', 龙子湖校区: 30, 文化路校区: 18, 许昌校区: 7 },
  { month: '2月', 龙子湖校区: 25, 文化路校区: 15, 许昌校区: 5 },
  { month: '3月', 龙子湖校区: 38, 文化路校区: 24, 许昌校区: 10 },
  { month: '4月', 龙子湖校区: 32, 文化路校区: 20, 许昌校区: 11 },
  { month: '5月', 龙子湖校区: 40, 文化路校区: 28, 许昌校区: 12 },
  { month: '6月', 龙子湖校区: 35, 文化路校区: 21, 许昌校区: 8 },
];

const deptOverview = [
  { dept: '后勤处', total: 128, solved: 95, color: '#1677ff', phone: '0371-63558001' },
  { dept: '教务处', total: 86, solved: 68, color: '#52c41a', phone: '0371-63558002' },
  { dept: '学生处', total: 57, solved: 42, color: '#722ed1', phone: '0371-63558003' },
  { dept: '保卫处', total: 42, solved: 30, color: '#ff4d4f', phone: '0371-63558110' },
  { dept: '信息化办', total: 35, solved: 28, color: '#13c2c2', phone: '0371-63558005' },
  { dept: '行政管理处', total: 25, solved: 20, color: '#faad14', phone: '0371-63558006' },
];

const deptAllTotal = deptOverview.reduce((s, d) => s + d.total, 0);

const hotPreview = [
  { key: '1', title: '食堂饭菜质量', count: 8, level: 'critical', tag: '食堂餐饮', dept: '后勤处' },
  { key: '2', title: '宿舍热水供应', count: 6, level: 'critical', tag: '宿舍管理', dept: '后勤处' },
  { key: '3', title: '电动车停放管理', count: 5, level: 'high', tag: '校园安全', dept: '保卫处' },
];

function MailboxDashboard() {
  const total = campusBreakdown.reduce((s, c) => s + c.total, 0);
  const solved = statusData.find((s) => s.status === '已解决')?.count || 0;

  const hotColumns = [
    { title: '问题', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: '次数', dataIndex: 'count', key: 'count', width: 50,
      render: (v) => <span style={{ fontWeight: 'bold', color: v >= 5 ? '#ff4d4f' : '#fa8c16' }}>{v}</span> },
    { title: '标签', dataIndex: 'tag', key: 'tag', width: 80,
      render: (t) => <Tag color={tagList.find((x) => x.value === t)?.color}>{t}</Tag> },
    { title: '优先级', dataIndex: 'level', key: 'level', width: 80,
      render: (l) => <Tag color={l === 'critical' ? 'red' : 'orange'}>{l === 'critical' ? '紧急' : '高优'}</Tag> },
    { title: '责任部门', dataIndex: 'dept', key: 'dept', width: 80 },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card
            title={<span style={{ color: '#1a6b3a' }}><EnvironmentOutlined /> 河南省校区分布 · 反馈统计</span>}
            size="small"
          >
            <HenanMap style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title={<span style={{ color: '#1a6b3a' }}><TeamOutlined /> 部门处理概览</span>} size="small">
            {deptOverview.map((dept) => (
              <Tooltip key={dept.dept} title={`${dept.dept} | 电话: ${dept.phone} | 已解决: ${dept.solved}/${dept.total}`}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                    <span style={{ color: '#333' }}>{dept.dept}</span>
                    <span style={{ color: dept.color, fontWeight: 'bold' }}>
                      {dept.solved}/{dept.total}
                      <span style={{ fontSize: 10, color: '#999', marginLeft: 4 }}>
                        ({Math.round((dept.solved / dept.total) * 100)}%)
                      </span>
                    </span>
                  </div>
                  <Progress percent={Math.round((dept.total / deptAllTotal) * 100)}
                    strokeColor={dept.color} showInfo={false} size="small" />
                </div>
              </Tooltip>
            ))}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {campusBreakdown.map((campus) => (
          <Col xs={24} sm={8} key={campus.campus}>
            <Card size="small" style={{ borderTop: `3px solid ${campusList.find((c) => c.name === campus.campus)?.color || '#ccc'}` }}>
              <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#333', fontSize: 13 }}>{campus.campus}</div>
              <Row gutter={4}>
                <Col span={8}><Statistic title="总反馈" value={campus.total} styles={{ content: { fontSize: 18 } }} /></Col>
                <Col span={8}><Statistic title="已解决" value={campus['已解决']} styles={{ content: { fontSize: 18, color: '#52c41a' } }} /></Col>
                <Col span={8}><Statistic title="待处理" value={campus['待处理']} styles={{ content: { fontSize: 18, color: '#fa8c16' } }} /></Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={6}>
          <Card size="small"><Statistic title="全校总反馈" value={total} prefix={<MailOutlined />} styles={{ content: { color: '#1a6b3a' } }} /></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card size="small"><Statistic title="已解决" value={solved}
            suffix={<span style={{ fontSize: 13, color: '#52c41a' }}>{Math.round((solved / total) * 100)}%</span>}
            prefix={<CheckCircleOutlined />} styles={{ content: { color: '#52c41a' } }} /></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card size="small"><Statistic title="待处理" value={statusData.find((s) => s.status === '待处理')?.count || 0}
            prefix={<ExclamationCircleOutlined />} styles={{ content: { color: '#fa8c16' } }} /></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card size="small"><Statistic title="热点问题" value={2} prefix={<FireOutlined />}
            styles={{ content: { color: '#ff4d4f' } }}
            suffix={<span style={{ fontSize: 11, color: '#ff4d4f' }}>紧急</span>} /></Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="三校区月度反馈趋势" size="small">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <ReTooltip />
                <Legend />
                <Line type="monotone" dataKey="龙子湖校区" stroke="#1677ff" strokeWidth={2} />
                <Line type="monotone" dataKey="文化路校区" stroke="#52c41a" strokeWidth={2} />
                <Line type="monotone" dataKey="许昌校区" stroke="#fa8c16" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="热点问题追踪" size="small"
            extra={<a href="/hot-issues" style={{ fontSize: 12 }}>查看全部 →</a>}>
            <Table columns={hotColumns} dataSource={hotPreview} pagination={false} size="small"
              showHeader={true} style={{ marginTop: -8 }} />
            <div style={{ marginTop: 12, padding: '8px 12px', background: '#fff7e6', borderRadius: 6, border: '1px solid #ffd591', fontSize: 12, color: '#ad6800' }}>
              <FireOutlined style={{ marginRight: 4, color: '#ff4d4f' }} />
              有 2 个紧急问题需立刻处理，涉及后勤处和保卫处
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="分类标签统计" size="small">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tagList} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="value" width={80} />
                <ReTooltip />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>
                  {tagList.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="处理进度" size="small">
            {statusData.map((item) => (
              <div key={item.status} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span>{item.status}</span>
                  <span style={{ color: item.color, fontWeight: 'bold' }}>{item.count}</span>
                </div>
                <Progress percent={Math.round((item.count / total) * 100)} strokeColor={item.color} showInfo={false} />
              </div>
            ))}
            <div className="resolve-info-box">
              <ClockCircleOutlined style={{ marginRight: 6 }} />
              <span>全校解决率 {Math.round((solved / total) * 100)}%</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MailboxDashboard;