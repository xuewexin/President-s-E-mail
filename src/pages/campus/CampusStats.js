import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const campusOverview = [
  { name: '龙子湖校区', 总反馈: 180, 已解决: 118, 处理中: 38, 待处理: 24, color: '#1677ff', 解决率: 66 },
  { name: '文化路校区', 总反馈: 126, 已解决: 82, 处理中: 28, 待处理: 16, color: '#52c41a', 解决率: 65 },
  { name: '许昌校区', 总反馈: 67, 已解决: 45, 处理中: 12, 待处理: 10, color: '#fa8c16', 解决率: 67 },
];

const campusStatusComparison = [
  { status: '已解决', 龙子湖校区: 118, 文化路校区: 82, 许昌校区: 45 },
  { status: '处理中', 龙子湖校区: 38, 文化路校区: 28, 许昌校区: 12 },
  { status: '待处理', 龙子湖校区: 24, 文化路校区: 16, 许昌校区: 10 },
];

const campusTagComparison = [
  { tag: '教学管理', 龙子湖校区: 38, 文化路校区: 30, 许昌校区: 18 },
  { tag: '食堂餐饮', 龙子湖校区: 28, 文化路校区: 22, 许昌校区: 14 },
  { tag: '宿舍管理', 龙子湖校区: 22, 文化路校区: 20, 许昌校区: 11 },
  { tag: '校园安全', 龙子湖校区: 18, 文化路校区: 15, 许昌校区: 9 },
  { tag: '设施维修', 龙子湖校区: 16, 文化路校区: 14, 许昌校区: 8 },
  { tag: '学生事务', 龙子湖校区: 20, 文化路校区: 10, 许昌校区: 5 },
  { tag: '师德师风', 龙子湖校区: 8, 文化路校区: 8, 许昌校区: 4 },
  { tag: '行政管理', 龙子湖校区: 7, 文化路校区: 6, 许昌校区: 4 },
  { tag: '其他问题', 龙子湖校区: 6, 文化路校区: 5, 许昌校区: 4 },
];

const radarData = [
  { subject: '教学管理', 龙子湖校区: 90, 文化路校区: 75, 许昌校区: 50, full: 100 },
  { subject: '食堂餐饮', 龙子湖校区: 70, 文化路校区: 60, 许昌校区: 40, full: 100 },
  { subject: '宿舍管理', 龙子湖校区: 55, 文化路校区: 55, 许昌校区: 35, full: 100 },
  { subject: '校园安全', 龙子湖校区: 45, 文化路校区: 42, 许昌校区: 30, full: 100 },
  { subject: '设施维修', 龙子湖校区: 40, 文化路校区: 38, 许昌校区: 25, full: 100 },
  { subject: '学生事务', 龙子湖校区: 50, 文化路校区: 30, 许昌校区: 20, full: 100 },
];

function CampusStats() {
  const totalAll = campusOverview.reduce((s, c) => s + c['总反馈'], 0);

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#1a6b3a' }}>
        <EnvironmentOutlined style={{ marginRight: 8 }} />
        校区统计 · 三校区对比分析
      </h2>

      <Row gutter={[16, 16]}>
        {campusOverview.map((campus) => (
          <Col xs={24} md={8} key={campus.name}>
            <Card
              style={{ borderTop: `4px solid ${campus.color}` }}
              title={
                <span style={{ color: campus.color, fontWeight: 'bold', fontSize: 16 }}>
                  <EnvironmentOutlined style={{ marginRight: 6 }} />
                  {campus.name}
                </span>
              }
            >
              <Row gutter={[12, 16]}>
                <Col span={8}>
                  <Statistic title="总反馈" value={campus['总反馈']} styles={{ content: { color: campus.color } }} />
                </Col>
                <Col span={8}>
                  <Statistic title="已解决" value={campus['已解决']} styles={{ content: { color: '#52c41a' } }} />
                </Col>
                <Col span={8}>
                  <Statistic title="待处理" value={campus['待处理']} styles={{ content: { color: '#fa8c16' } }} />
                </Col>
              </Row>
              <div className="campus-rate-box">
                <span className="campus-rate-label">解决率：</span>
                <span style={{ fontWeight: 'bold', color: campus.color }}>{campus.解决率}%</span>
                <span className="campus-rate-label" style={{ marginLeft: 16 }}>占比：</span>
                <span style={{ fontWeight: 'bold', color: campus.color }}>
                  {Math.round((campus['总反馈'] / totalAll) * 100)}%
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="各校区处理状态对比">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={campusStatusComparison} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="龙子湖校区" fill="#1677ff" radius={[6, 6, 0, 0]} />
                <Bar dataKey="文化路校区" fill="#52c41a" radius={[6, 6, 0, 0]} />
                <Bar dataKey="许昌校区" fill="#fa8c16" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="校区问题关注度雷达图">
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e8e8e8" />
                <PolarAngleAxis dataKey="subject" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={10} />
                <Radar name="龙子湖校区" dataKey="龙子湖校区" stroke="#1677ff" fill="#1677ff" fillOpacity={0.15} />
                <Radar name="文化路校区" dataKey="文化路校区" stroke="#52c41a" fill="#52c41a" fillOpacity={0.15} />
                <Radar name="许昌校区" dataKey="许昌校区" stroke="#fa8c16" fill="#fa8c16" fillOpacity={0.15} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="各校区分类标签热力对比">
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={campusTagComparison} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="tag" width={80} fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="龙子湖校区" fill="#1677ff" barSize={10} radius={[0, 4, 4, 0]} />
                <Bar dataKey="文化路校区" fill="#52c41a" barSize={10} radius={[0, 4, 4, 0]} />
                <Bar dataKey="许昌校区" fill="#fa8c16" barSize={10} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CampusStats;