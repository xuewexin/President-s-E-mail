import React, { useState, useMemo } from 'react';
import { Table, Button, Tag, Modal, Descriptions, Card, Row, Col, Select, Input, Statistic } from 'antd';
import { SearchOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { campusOptions, tagOptions, statusColorMap } from '../../constants';

function generateMockData() {
  const titles = [
    '食堂饭菜质量问题反馈', '教学楼空调故障报修', '建议延长图书馆开放时间',
    '校园电动车乱停乱放', '宿舍楼热水供应不稳定', '关于期中考试安排的建议',
    '体育场馆设施老化', '校园道路照明不足', '教师授课质量反馈',
    '学生心理健康辅导建议', '食堂窗口排队过长', '校园网络覆盖不稳定',
    '奖学金评定标准建议', '校园绿化修剪维护', '选修课程开设建议',
    '宿舍公共区域卫生', '班主任管理工作意见', '校园快递管理混乱',
    '校园文化活动建议', '实验室设备更新需求',
  ];
  const data = [];
  // 为每个标签维护独立的校区计数器，确保按标签筛选时三个校区均匀分布
  const tagCampusCounters = new Array(tagOptions.length).fill(0);
  for (let i = 1; i <= 50; i++) {
    const tagIndex = i % tagOptions.length;
    const tag = tagOptions[tagIndex];
    // 每个标签独立轮换校区：起始偏移 = tagIndex，确保相邻不同标签的记录校区也不同
    const campusIdx = (tagIndex + tagCampusCounters[tagIndex]) % 3;
    tagCampusCounters[tagIndex]++;
    const campus = campusOptions[campusIdx];
    const isPending = i % 2 === 0;
    const status = isPending ? '待处理' : '处理中';
    data.push({
      key: i.toString(), id: `XX-${2024000 + i}`,
      title: titles[i % titles.length],
      campus: campus.value, campusColor: campus.color,
      tag: tag.value, tagColor: tag.color,
      status, statusColor: statusColorMap[status],
      contact: `1380000${String(i).padStart(4, '0')}`,
      content: `尊敬的校长：\n\n　${titles[i % titles.length]}。已对日常学习生活造成影响，希望尽快协调解决。`,
      createTime: `2024-0${Math.floor(i / 18) + 3}-${String((i % 28) + 1).padStart(2, '0')} ${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
      dept: ['后勤处', '教务处', '学生处', '保卫处', '信息化办'][i % 5],
    });
  }
  return data;
}

const mockData = generateMockData();

function UnresolvedFeedback() {
  const [dataSource] = useState(mockData);
  const [searchText, setSearchText] = useState('');
  const [campusFilter, setCampusFilter] = useState(undefined);
  const [tagFilter, setTagFilter] = useState(undefined);
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const filteredData = useMemo(() => {
    return dataSource.filter((item) => {
      const matchSearch = !searchText || item.title.includes(searchText) || item.id.includes(searchText);
      const matchCampus = !campusFilter || item.campus === campusFilter;
      const matchTag = !tagFilter || item.tag === tagFilter;
      const matchStatus = !statusFilter || item.status === statusFilter;
      return matchSearch && matchCampus && matchTag && matchStatus;
    });
  }, [dataSource, searchText, campusFilter, tagFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: dataSource.length,
    pending: dataSource.filter((d) => d.status === '待处理').length,
    processing: dataSource.filter((d) => d.status === '处理中').length,
  }), [dataSource]);

  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', width: 110 },
    { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: '校区', dataIndex: 'campus', key: 'campus', width: 100, render: (c, r) => <Tag color={r.campusColor}>{c}</Tag> },
    { title: '标签', dataIndex: 'tag', key: 'tag', width: 80, render: (t, r) => <Tag color={r.tagColor}>{t}</Tag> },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s, r) => <Tag color={r.statusColor}>{s}</Tag> },
    { title: '责任部门', dataIndex: 'dept', key: 'dept', width: 80 },
    { title: '时间', dataIndex: 'createTime', key: 'createTime', width: 140 },
    { title: '操作', key: 'action', width: 60, render: (_, r) => (<Button type="link" onClick={() => { setCurrentRecord(r); setDetailVisible(true); }}>查看</Button>) },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#fa8c16' }}>
        <ExclamationCircleOutlined style={{ marginRight: 8 }} />未处理反馈
      </h2>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={8}><Card size="small"><Statistic title="未处理总计" value={stats.total} prefix={<ExclamationCircleOutlined />} styles={{ content: { color: '#fa8c16', fontSize: 22 } }} /></Card></Col>
        <Col xs={8}><Card size="small"><Statistic title="待处理" value={stats.pending} styles={{ content: { color: '#fa8c16', fontSize: 22 } }} /></Card></Col>
        <Col xs={8}><Card size="small"><Statistic title="处理中" value={stats.processing} prefix={<ClockCircleOutlined />} styles={{ content: { color: '#1677ff', fontSize: 22 } }} /></Card></Col>
      </Row>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={6}><Input placeholder="搜索标题 / 编号..." prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} allowClear /></Col>
          <Col xs={12} sm={4}><Select placeholder="校区" allowClear style={{ width: '100%' }} value={campusFilter} onChange={setCampusFilter} options={campusOptions} /></Col>
          <Col xs={12} sm={4}><Select placeholder="标签" allowClear style={{ width: '100%' }} value={tagFilter} onChange={setTagFilter} options={tagOptions} /></Col>
          <Col xs={12} sm={4}><Select placeholder="状态" allowClear style={{ width: '100%' }} value={statusFilter} onChange={setStatusFilter} options={[{ value: '待处理', label: '待处理' }, { value: '处理中', label: '处理中' }]} /></Col>
          <Col xs={12} sm={6}><Button style={{ float: 'right' }} onClick={() => { setSearchText(''); setCampusFilter(undefined); setTagFilter(undefined); setStatusFilter(undefined); }}>重置</Button></Col>
        </Row>
      </Card>
      <Card>
        <Table columns={columns} dataSource={filteredData} pagination={{ defaultPageSize: 15, showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['10', '15', '30', '50'], showTotal: (t, r) => `第 ${r[0]}-${r[1]} 条，共 ${t} 条` }} scroll={{ x: 960 }} size="middle" />
      </Card>
      <Modal title="未处理反馈详情" open={detailVisible} onCancel={() => setDetailVisible(false)} footer={null} width={620}>
        {currentRecord && (
          <div>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="编号">{currentRecord.id}</Descriptions.Item>
              <Descriptions.Item label="校区"><Tag color={currentRecord.campusColor}>{currentRecord.campus}</Tag></Descriptions.Item>
              <Descriptions.Item label="提交人">匿名用户</Descriptions.Item>
              <Descriptions.Item label="标签"><Tag color={currentRecord.tagColor}>{currentRecord.tag}</Tag></Descriptions.Item>
              <Descriptions.Item label="状态"><Tag color={currentRecord.statusColor}>{currentRecord.status}</Tag></Descriptions.Item>
              <Descriptions.Item label="责任部门"><Tag color="blue">{currentRecord.dept}</Tag></Descriptions.Item>
              <Descriptions.Item label="联系方式">{currentRecord.contact}</Descriptions.Item>
              <Descriptions.Item label="提交时间">{currentRecord.createTime}</Descriptions.Item>
            </Descriptions>
            <div style={{ padding: '12px 16px', background: '#fff7e6', borderRadius: 8, border: '1px solid #ffd591', lineHeight: 1.8, color: '#555', whiteSpace: 'pre-wrap' }}>{currentRecord.content}</div>
            <div style={{ marginTop: 12, padding: '10px', background: '#fff2f0', borderRadius: 6, border: '1px solid #ffa39e', fontSize: 13, color: '#cf1322' }}>
              <ExclamationCircleOutlined style={{ marginRight: 4 }} />此反馈尚未处理，请尽快分配相关部门跟进
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default UnresolvedFeedback;
