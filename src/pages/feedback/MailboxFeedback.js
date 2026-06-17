import React, { useState, useMemo } from 'react';
import {
  Table, Button, Space, Tag, Modal, Descriptions, Card, Row, Col,
  Select, Input, Statistic,
} from 'antd';
import {
  SearchOutlined, EyeOutlined, DeleteOutlined, FilterOutlined,
  CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons';
import { campusOptions, tagOptions, statusColorMap } from '../../constants';

function generateMockData() {
  const titles = [
    '关于食堂饭菜质量问题的反馈', '教学楼三楼空调故障需要维修', '建议延长图书馆开放时间',
    '校园电动车乱停乱放问题', '宿舍楼热水供应不稳定', '关于期中考试时间安排的建议',
    '体育场馆设施老化需要更新', '校园内道路照明不足存在安全隐患', '关于教师授课质量的意见反馈',
    '建议增加学生心理健康辅导', '食堂窗口排队时间过长', '校园网络覆盖不稳定的问题',
    '关于奖学金评定标准的建议', '校园绿化带需要修剪维护', '建议开设更多选修课程',
    '宿舍楼公共区域卫生状况反馈', '关于班主任管理工作的意见', '校园快递点管理混乱问题',
    '建议举办更多校园文化活动', '实验室设备更新需求反馈',
  ];
  const statusTexts = ['待处理', '处理中', '已解决'];
  const data = [];
  // 为每个标签维护独立的校区计数器，确保按标签筛选时三个校区均匀分布
  const tagCampusCounters = new Array(tagOptions.length).fill(0);
  for (let i = 1; i <= 100; i++) {
    const tagIndex = i % tagOptions.length;
    const tag = tagOptions[tagIndex];
    const status = statusTexts[(Math.floor((i - 1) / tagOptions.length) + tagIndex) % 3];
    // 每个标签独立轮换校区：起始偏移 = tagIndex，确保相邻不同标签的记录校区也不同
    const campusIdx = (tagIndex + tagCampusCounters[tagIndex]) % 3;
    tagCampusCounters[tagIndex]++;
    const campus = campusOptions[campusIdx];
    data.push({
      key: i.toString(),
      id: `XX-${2024000 + i}`,
      title: titles[i % titles.length],
      campus: campus.value,
      campusColor: campus.color,
      tag: tag.value,
      tagColor: tag.color,
      status,
      statusColor: statusColorMap[status],
      contact: `1380000${String(i).padStart(4, '0')}`,
      content: `尊敬的校长：\n\n　${titles[i % titles.length]}。具体情况如下：我们经过认真了解和核实，发现此问题确实存在，并已对师生日常学习生活造成了一定影响。希望校领导能够重视此问题，尽快协调相关部门予以解决。\n\n此致\n敬礼`,
      createTime: `2024-${String(Math.floor(i / 20) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')} ${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
      reply: status === '已解决' ? '感谢您的反馈！已安排相关部门处理完毕。如有疑问请继续联系我们。' : '',
      replyTime: status === '已解决' ? `2024-${String(Math.floor(i / 20) + 1).padStart(2, '0')}-${String((i % 28) + 3).padStart(2, '0')} 09:00` : '',
    });
  }
  return data;
}

const mockData = generateMockData();

function MailboxFeedback() {
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
    solved: dataSource.filter((d) => d.status === '已解决').length,
  }), [dataSource]);

  const handleView = (record) => {
    setCurrentRecord(record);
    setDetailVisible(true);
  };

  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', width: 110 },
    { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: '校区', dataIndex: 'campus', key: 'campus', width: 100, render: (campus, record) => <Tag color={record.campusColor}>{campus}</Tag> },
    { title: '分类标签', dataIndex: 'tag', key: 'tag', width: 90, render: (tag, record) => <Tag color={record.tagColor}>{tag}</Tag> },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (status, record) => <Tag color={record.statusColor}>{status}</Tag> },
    { title: '提交时间', dataIndex: 'createTime', key: 'createTime', width: 150 },
    {
      title: '操作', key: 'action', width: 140,
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)}>查看</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#1a6b3a' }}>
        <FilterOutlined style={{ marginRight: 8 }} />反馈管理
      </h2>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {[
          { t: '全部反馈', v: stats.total, icon: null, color: '#1a6b3a' },
          { t: '待处理', v: stats.pending, icon: <ExclamationCircleOutlined />, color: '#fa8c16' },
          { t: '处理中', v: stats.processing, icon: <ClockCircleOutlined />, color: '#1677ff' },
          { t: '已解决', v: stats.solved, icon: <CheckCircleOutlined />, color: '#52c41a' },
        ].map((s) => (
          <Col xs={12} sm={6} key={s.t}>
            <Card size="small"><Statistic title={s.t} value={s.v} prefix={s.icon} styles={{ content: { color: s.color, fontSize: 24 } }} /></Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={6}><Input placeholder="搜索标题 / 编号..." prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} allowClear /></Col>
          <Col xs={12} sm={4}><Select placeholder="校区" allowClear style={{ width: '100%' }} value={campusFilter} onChange={setCampusFilter} options={campusOptions} /></Col>
          <Col xs={12} sm={4}><Select placeholder="分类标签" allowClear style={{ width: '100%' }} value={tagFilter} onChange={setTagFilter} options={tagOptions} /></Col>
          <Col xs={12} sm={4}><Select placeholder="处理状态" allowClear style={{ width: '100%' }} value={statusFilter} onChange={setStatusFilter} options={[{ value: '待处理', label: '待处理' }, { value: '处理中', label: '处理中' }, { value: '已解决', label: '已解决' }]} /></Col>
          <Col xs={12} sm={6}><Button style={{ float: 'right' }} onClick={() => { setSearchText(''); setCampusFilter(undefined); setTagFilter(undefined); setStatusFilter(undefined); }}>重置全部筛选</Button></Col>
        </Row>
      </Card>

      <Card>
        <Table columns={columns} dataSource={filteredData}
          pagination={{ defaultPageSize: 15, showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['10', '15', '30', '50'], showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条` }}
          scroll={{ x: 960 }} size="middle" />
      </Card>

      <Modal title="反馈详情" open={detailVisible} onCancel={() => setDetailVisible(false)} footer={null} width={680} destroyOnClose>
        {currentRecord && (
          <div>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="编号">{currentRecord.id}</Descriptions.Item>
              <Descriptions.Item label="校区"><Tag color={currentRecord.campusColor}>{currentRecord.campus}</Tag></Descriptions.Item>
              <Descriptions.Item label="提交人">匿名用户</Descriptions.Item>
              <Descriptions.Item label="分类标签"><Tag color={currentRecord.tagColor}>{currentRecord.tag}</Tag></Descriptions.Item>
              <Descriptions.Item label="处理状态"><Tag color={currentRecord.statusColor}>{currentRecord.status}</Tag></Descriptions.Item>
              <Descriptions.Item label="联系方式">{currentRecord.contact}</Descriptions.Item>
              <Descriptions.Item label="提交时间">{currentRecord.createTime}</Descriptions.Item>
            </Descriptions>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#333' }}>反馈内容：</div>
              <div style={{ padding: '12px 16px', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0', whiteSpace: 'pre-wrap', lineHeight: 1.8, color: '#555' }}>{currentRecord.content}</div>
            </div>
            {currentRecord.reply && (
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#52c41a' }}>回复内容：</div>
                <div className="reply-info-box">{currentRecord.reply}</div>
                <div style={{ marginTop: 8, fontSize: 12, color: '#999', textAlign: 'right' }}>回复时间：{currentRecord.replyTime}</div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MailboxFeedback;
