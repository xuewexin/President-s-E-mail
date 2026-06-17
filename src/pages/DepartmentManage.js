import React, { useState } from 'react';
import { Card, Row, Col, Table, Tag, Progress, Modal, Descriptions, Statistic } from 'antd';
import { TeamOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, ToolOutlined, TrophyOutlined, IdcardOutlined, SafetyOutlined, DesktopOutlined, AuditOutlined } from '@ant-design/icons';
import { departments, deptStats } from '../constants';

const iconMap = { ToolOutlined: <ToolOutlined />, TrophyOutlined: <TrophyOutlined />, IdcardOutlined: <IdcardOutlined />, SafetyOutlined: <SafetyOutlined />, DesktopOutlined: <DesktopOutlined />, AuditOutlined: <AuditOutlined /> };

const columns = [
  { title: '部门', dataIndex: 'dept', key: 'dept', width: 100 },
  { title: '总量', dataIndex: 'total', key: 'total', width: 60, sorter: (a, b) => a.total - b.total },
  { title: '已解决', dataIndex: 'solved', key: 'solved', width: 70, render: (v) => <span style={{ color: '#52c41a' }}>{v}</span> },
  { title: '处理中', dataIndex: 'processing', key: 'processing', width: 70, render: (v) => <span style={{ color: '#1677ff' }}>{v}</span> },
  { title: '待处理', dataIndex: 'pending', key: 'pending', width: 70, render: (v) => <span style={{ color: '#fa8c16' }}>{v}</span> },
  { title: '解决率', dataIndex: 'total', key: 'rate', width: 120,
    render: (total, record) => <Progress percent={Math.round((record.solved / total) * 100)} size="small" strokeColor={record.color} format={(p) => `${p}%`} /> },
];

function DepartmentManage() {
  const [detailDept, setDetailDept] = useState(null);

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#1a6b3a' }}>
        <TeamOutlined style={{ marginRight: 8 }} />部门管理 · 责任分配
      </h2>
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
      <Modal title="部门详情" open={!!detailDept} onCancel={() => setDetailDept(null)} footer={null} width={520}>
        {detailDept && (
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="部门名称"><span style={{ fontSize: 18 }}>{iconMap[detailDept.icon]}</span> {detailDept.name}</Descriptions.Item>
            <Descriptions.Item label="负责人">{detailDept.leader}</Descriptions.Item>
            <Descriptions.Item label="联系电话"><PhoneOutlined /> {detailDept.phone}</Descriptions.Item>
            <Descriptions.Item label="电子邮箱"><MailOutlined /> {detailDept.email}</Descriptions.Item>
            <Descriptions.Item label="办公地点"><EnvironmentOutlined /> {detailDept.office}</Descriptions.Item>
            <Descriptions.Item label="负责范围">{detailDept.tags.map((t) => <Tag key={t} color={detailDept.color}>{t}</Tag>)}</Descriptions.Item>
            <Descriptions.Item label="当前任务">
              {(() => {
                const stat = deptStats.find((s) => s.dept === detailDept.name);
                if (!stat) return '-';
                return (<div><Tag color="green">已解决 {stat.solved}</Tag><Tag color="blue">处理中 {stat.processing}</Tag><Tag color="orange">待处理 {stat.pending}</Tag></div>);
              })()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

export { departments, deptStats };
export default DepartmentManage;
