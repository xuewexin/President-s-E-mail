import React, { useState, useMemo } from 'react';
import { Table, Tag, Card, Row, Col, Statistic, Modal, Descriptions, Alert } from 'antd';
import {
  FireOutlined, AlertOutlined, WarningOutlined, ExclamationCircleOutlined,
  ArrowUpOutlined, ArrowDownOutlined, MinusOutlined,
} from '@ant-design/icons';
import { campusOptions, tagColorMap } from '../constants';

const hotIssues = [
  {
    key: '1',
    title: '食堂饭菜质量问题',
    tag: '食堂餐饮',
    count: 8,
    campuses: ['龙子湖校区', '文化路校区', '许昌校区'],
    level: 'critical',
    dept: '后勤处',
    firstTime: '2024-03-15',
    lastTime: '2024-06-14',
    trend: 'rising',
    detail: '自3月以来，三校区均收到关于食堂饭菜质量、口味的反馈。主要表现为菜品单一、口味偏重等问题。',
  },
  {
    key: '2',
    title: '宿舍热水供应不稳定',
    tag: '宿舍管理',
    count: 6,
    campuses: ['文化路校区', '龙子湖校区'],
    level: 'critical',
    dept: '后勤处',
    firstTime: '2024-04-02',
    lastTime: '2024-06-12',
    trend: 'stable',
    detail: '文化路校区和龙子湖校区多位学生反映宿舍热水供应时段不稳定，尤其是晚间高峰期水温偏低。',
  },
  {
    key: '3',
    title: '电动车停放管理问题',
    tag: '校园安全',
    count: 5,
    campuses: ['龙子湖校区', '许昌校区'],
    level: 'high',
    dept: '保卫处',
    firstTime: '2024-04-20',
    lastTime: '2024-06-10',
    trend: 'rising',
    detail: '电动车数量增加导致停车位紧张，部分区域出现乱停乱放现象，影响校园通行和安全。',
  },
  {
    key: '4',
    title: '图书馆开放时间建议',
    tag: '教学管理',
    count: 4,
    campuses: ['龙子湖校区'],
    level: 'high',
    dept: '教务处',
    firstTime: '2024-05-01',
    lastTime: '2024-06-08',
    trend: 'stable',
    detail: '多位同学建议延长图书馆晚间和周末开放时间，特别是考试周期间的需求更为迫切。',
  },
  {
    key: '5',
    title: '校园网络覆盖问题',
    tag: '校园安全',
    count: 4,
    campuses: ['文化路校区', '许昌校区'],
    level: 'high',
    dept: '信息化办公室',
    firstTime: '2024-04-15',
    lastTime: '2024-06-05',
    trend: 'falling',
    detail: '部分教学楼和宿舍区域的WiFi信号不稳定，影响在线学习和日常使用。',
  },
  {
    key: '6',
    title: '体育场馆设施老化',
    tag: '设施维修',
    count: 3,
    campuses: ['文化路校区'],
    level: 'medium',
    dept: '后勤处',
    firstTime: '2024-05-10',
    lastTime: '2024-06-01',
    trend: 'stable',
    detail: '体育馆部分器材和场地设施使用年限较长，需要进行维修或更换。',
  },
  {
    key: '7',
    title: '校园快递管理混乱',
    tag: '行政管理',
    count: 3,
    campuses: ['龙子湖校区', '文化路校区'],
    level: 'medium',
    dept: '行政管理处',
    firstTime: '2024-04-28',
    lastTime: '2024-05-30',
    trend: 'stable',
    detail: '快递收发点管理不规范，包裹堆放杂乱，学生取件不便且存在安全隐患。',
  },
  {
    key: '8',
    title: '实验室设备更新需求',
    tag: '设施维修',
    count: 3,
    campuses: ['许昌校区'],
    level: 'medium',
    dept: '后勤处',
    firstTime: '2024-04-10',
    lastTime: '2024-05-25',
    trend: 'rising',
    detail: '许昌校区部分实验室设备陈旧老化，已影响实验教学质量，需要尽快更新。',
  },
];

const campusColorMap = Object.fromEntries(campusOptions.map((c) => [c.value, c.color]));

const levelMap = {
  critical: { color: 'red', text: '紧急', icon: <FireOutlined /> },
  high: { color: 'orange', text: '高优', icon: <WarningOutlined /> },
  medium: { color: 'gold', text: '关注', icon: <ExclamationCircleOutlined /> },
};

const trendMap = {
  rising: { text: '持续上升', color: '#ff4d4f', icon: <ArrowUpOutlined /> },
  stable: { text: '保持平稳', color: '#fa8c16', icon: <MinusOutlined /> },
  falling: { text: '逐渐下降', color: '#52c41a', icon: <ArrowDownOutlined /> },
};

const columns = [
  {
    title: '优先级', dataIndex: 'level', key: 'level', width: 90,
    render: (l) => {
      const m = levelMap[l];
      return <Tag color={m.color}>{m.text}</Tag>;
    },
    sorter: (a, b) => ['critical', 'high', 'medium'].indexOf(a.level) - ['critical', 'high', 'medium'].indexOf(b.level),
  },
  { title: '问题标题', dataIndex: 'title', key: 'title', ellipsis: true },
  {
    title: '重复次数', dataIndex: 'count', key: 'count', width: 90,
    render: (v) => <span style={{ fontWeight: 'bold', color: v >= 5 ? '#ff4d4f' : '#fa8c16', fontSize: 16 }}>{v}次</span>,
    sorter: (a, b) => a.count - b.count,
  },
  {
    title: '涉及校区', dataIndex: 'campuses', key: 'campuses', width: 180,
    render: (cs) => cs.map((c) => <Tag key={c} color={campusColorMap[c]}>{c}</Tag>),
  },
  {
    title: '分类', dataIndex: 'tag', key: 'tag', width: 80,
    render: (t) => <Tag color={tagColorMap[t]}>{t}</Tag>,
  },
  { title: '负责部门', dataIndex: 'dept', key: 'dept', width: 100 },
  {
    title: '趋势', dataIndex: 'trend', key: 'trend', width: 70,
    render: (t) => {
      const m = trendMap[t];
      return m ? <span style={{ color: m.color }}>{m.icon} {m.text}</span> : <span>{t}</span>;
    },
  },
];

function HotIssues() {
  const [detailIssue, setDetailIssue] = useState(null);

  const stats = useMemo(() => ({
    total: hotIssues.length,
    critical: hotIssues.filter((h) => h.level === 'critical').length,
    high: hotIssues.filter((h) => h.level === 'high').length,
    totalReports: hotIssues.reduce((s, i) => s + i.count, 0),
  }), []);

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#1a6b3a' }}>
        <FireOutlined style={{ marginRight: 8 }} />
        热点问题 · 重复反馈追踪
      </h2>

      <Alert
        message="重复问题检测说明"
        description="同一问题在多个校区出现或同一校区多次反馈，系统自动标记为热点问题。出现5次以上标记为「紧急」，3-4次为「高优」，2-3次为「关注」。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="热点问题数" value={stats.total} prefix={<FireOutlined />}
            styles={{ content: { color: '#ff4d4f', fontSize: 24 } }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="紧急问题" value={stats.critical} prefix={<AlertOutlined />}
            styles={{ content: { color: '#ff4d4f', fontSize: 24 } }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="高优问题" value={stats.high} prefix={<WarningOutlined />}
            styles={{ content: { color: '#fa8c16', fontSize: 24 } }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="重复反馈总数" value={stats.totalReports}
            styles={{ content: { color: '#1677ff', fontSize: 24 } }} /></Card>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={hotIssues}
          pagination={false}
          size="middle"
          rowClassName={(record) => record.level === 'critical' ? 'hot-row-critical' : record.level === 'high' ? 'hot-row-high' : ''}
          onRow={(record) => ({ onClick: () => setDetailIssue(record), style: { cursor: 'pointer' } })}
        />
      </Card>

      <Modal title="热点问题详情" open={!!detailIssue} onCancel={() => setDetailIssue(null)} footer={null} width={620}>
        {detailIssue && (
          <div>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="问题">
                <span style={{ fontWeight: 'bold' }}>{detailIssue.title}</span>
              </Descriptions.Item>
              <Descriptions.Item label="优先级">
                <Tag color={levelMap[detailIssue.level]?.color}>
                  {levelMap[detailIssue.level]?.text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="重复次数">
                <span style={{ fontWeight: 'bold', color: '#ff4d4f', fontSize: 16 }}>{detailIssue.count}次</span>
              </Descriptions.Item>
              <Descriptions.Item label="趋势">
                {(() => { const tm = trendMap[detailIssue.trend]; return tm ? <span style={{ color: tm.color }}>{tm.icon} {tm.text}</span> : '-'; })()}
              </Descriptions.Item>
              <Descriptions.Item label="涉及校区">
                {detailIssue.campuses.map((c) => <Tag key={c} color={campusColorMap[c]}>{c}</Tag>)}
              </Descriptions.Item>
              <Descriptions.Item label="负责部门">
                <Tag color="blue">{detailIssue.dept}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="首次反馈">{detailIssue.firstTime}</Descriptions.Item>
              <Descriptions.Item label="最近反馈">{detailIssue.lastTime}</Descriptions.Item>
            </Descriptions>
            <div className="detail-info-box">
              <div className="detail-info-box-title">问题详情：</div>
              {detailIssue.detail}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default HotIssues;