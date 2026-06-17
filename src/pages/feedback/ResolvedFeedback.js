import React, { useState, useMemo } from 'react';
import { Table, Button, Tag, Modal, Descriptions, Card, Row, Col, Select, Input, Statistic } from 'antd';
import { SearchOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { campusOptions, tagOptions } from '../../constants';

function generateResolvedData() {
  const titles = [
    '关于食堂饭菜质量问题的反馈', '教学楼三楼空调故障需要维修', '宿舍楼热水供应不稳定',
    '校园电动车乱停乱放问题', '关于期中考试时间安排的建议', '校园内道路照明不足存在安全隐患',
    '食堂窗口排队时间过长', '校园网络覆盖不稳定的问题', '关于奖学金评定标准的建议',
    '校园绿化带需要修剪维护', '宿舍楼公共区域卫生状况反馈', '校园快递点管理混乱问题',
    '实验室设备更新需求反馈', '图书馆座位预约系统问题', '运动场地使用时间安排建议',
  ];
  const replies = [
    '感谢您的反馈！后勤处已安排工作人员对食堂进行了全面检查，相关问题已整改完毕。',
    '已联系维修部门，空调已修复并恢复正常使用。感谢您的及时反馈！',
    '后勤集团已对宿舍热水系统进行检修升级，目前供水已恢复正常。',
    '保卫处已制定新的电动车管理规定，增设了停车区域和标识。',
    '教务处已采纳您的建议，对期中考试安排进行了合理调整。',
    '后勤处已安排对全校道路照明进行排查，新增12处照明设施。',
    '食堂已增设2个临时窗口以缓解排队压力，感谢您的建议。',
    '信息化办公室已对校园网络进行优化扩容，信号覆盖明显改善。',
    '学生处已对奖学金评定细则进行了修订，感谢您的合理化建议。',
    '后勤绿化队已完成全校绿化带的修剪和补种工作。',
    '学生公寓管理中心已加强公共区域卫生管理，实行每日检查制度。',
    '后勤处已协调快递公司在各校区设立规范的快递收发点。',
    '实验室管理处已完成设备更新采购，新设备已投入使用。',
    '图书馆已优化预约系统规则，提高了座位利用率。',
    '体育部已根据师生需求重新规划运动场地使用时间表。',
  ];
  const data = [];
  // 为每个标签维护独立的校区计数器，确保按标签筛选时三个校区均匀分布
  const tagCampusCounters = new Array(tagOptions.length).fill(0);
  for (let i = 1; i <= 80; i++) {
    const tagIndex = i % tagOptions.length;
    const tag = tagOptions[tagIndex];
    // 每个标签独立轮换校区：起始偏移 = tagIndex，确保相邻不同标签的记录校区也不同
    const campusIdx = (tagIndex + tagCampusCounters[tagIndex]) % 3;
    tagCampusCounters[tagIndex]++;
    const campus = campusOptions[campusIdx];
    data.push({
      key: i.toString(), id: `XX-${2024000 + i}`,
      title: titles[i % titles.length],
      campus: campus.value, campusColor: campus.color,
      tag: tag.value, tagColor: tag.color,
      status: '已解决', statusColor: '#52c41a',
      content: `尊敬的校长：\n\n　${titles[i % titles.length]}。\n\n此致\n敬礼`,
      createTime: `2024-${String(Math.floor(i / 16) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')} ${String(8 + (i % 12)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
      reply: replies[i % replies.length],
      replyTime: `2024-${String(Math.floor(i / 16) + 1).padStart(2, '0')}-${String(((i + 3) % 28) + 1).padStart(2, '0')} 09:30`,
      replyDept: ['后勤处', '教务处', '学生处', '保卫处', '信息化办'][i % 5],
    });
  }
  return data;
}

const resolvedData = generateResolvedData();

function ResolvedFeedback() {
  const [searchText, setSearchText] = useState('');
  const [campusFilter, setCampusFilter] = useState(undefined);
  const [tagFilter, setTagFilter] = useState(undefined);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const filteredData = useMemo(() => {
    return resolvedData.filter((item) => {
      const matchSearch = !searchText || item.title.includes(searchText) || item.id.includes(searchText);
      const matchCampus = !campusFilter || item.campus === campusFilter;
      const matchTag = !tagFilter || item.tag === tagFilter;
      return matchSearch && matchCampus && matchTag;
    });
  }, [searchText, campusFilter, tagFilter]);

  const campusStats = useMemo(() => {
    const stats = {};
    campusOptions.forEach((opt) => { stats[opt.value] = resolvedData.filter((d) => d.campus === opt.value).length; });
    return stats;
  }, []);

  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', width: 110 },
    { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: '校区', dataIndex: 'campus', key: 'campus', width: 100, render: (campus, record) => <Tag color={record.campusColor}>{campus}</Tag> },
    { title: '分类标签', dataIndex: 'tag', key: 'tag', width: 90, render: (tag, record) => <Tag color={record.tagColor}>{tag}</Tag> },
    { title: '处理部门', dataIndex: 'replyDept', key: 'replyDept', width: 90 },
    { title: '提交时间', dataIndex: 'createTime', key: 'createTime', width: 140 },
    { title: '解决时间', dataIndex: 'replyTime', key: 'replyTime', width: 140 },
    { title: '操作', key: 'action', width: 80, render: (_, record) => (<Button type="link" icon={<EyeOutlined />} onClick={() => { setCurrentRecord(record); setDetailVisible(true); }}>查看</Button>) },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#1a6b3a' }}>
        <CheckCircleOutlined style={{ marginRight: 8 }} />已处理反馈 · 归档记录
      </h2>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={6}><Card size="small"><Statistic title="已解决总计" value={resolvedData.length} prefix={<CheckCircleOutlined />} styles={{ content: { color: '#52c41a', fontSize: 24 } }} /></Card></Col>
        {campusOptions.map((campus) => (
          <Col xs={8} sm={6} key={campus.value}>
            <Card size="small"><Statistic title={campus.value} value={campusStats[campus.value]} styles={{ content: { color: campus.color, fontSize: 20 } }} /></Card>
          </Col>
        ))}
      </Row>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={8}><Input placeholder="搜索标题 / 编号..." prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} allowClear /></Col>
          <Col xs={12} sm={5}><Select placeholder="校区" allowClear style={{ width: '100%' }} value={campusFilter} onChange={setCampusFilter} options={campusOptions} /></Col>
          <Col xs={12} sm={5}><Select placeholder="分类标签" allowClear style={{ width: '100%' }} value={tagFilter} onChange={setTagFilter} options={tagOptions} /></Col>
          <Col xs={24} sm={6}><Button style={{ float: 'right' }} onClick={() => { setSearchText(''); setCampusFilter(undefined); setTagFilter(undefined); }}>重置筛选</Button></Col>
        </Row>
      </Card>
      <Card>
        <Table columns={columns} dataSource={filteredData} pagination={{ defaultPageSize: 15, showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['10', '15', '30', '50'], showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条` }} scroll={{ x: 1050 }} size="middle" />
      </Card>
      <Modal title="已处理反馈详情" open={detailVisible} onCancel={() => setDetailVisible(false)} footer={null} width={680} destroyOnClose>
        {currentRecord && (
          <div>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="编号">{currentRecord.id}</Descriptions.Item>
              <Descriptions.Item label="校区"><Tag color={currentRecord.campusColor}>{currentRecord.campus}</Tag></Descriptions.Item>
              <Descriptions.Item label="提交人">匿名用户</Descriptions.Item>
              <Descriptions.Item label="分类标签"><Tag color={currentRecord.tagColor}>{currentRecord.tag}</Tag></Descriptions.Item>
              <Descriptions.Item label="处理部门"><Tag color="blue">{currentRecord.replyDept}</Tag></Descriptions.Item>
              <Descriptions.Item label="处理状态"><Tag color="green">已解决</Tag></Descriptions.Item>
              <Descriptions.Item label="提交时间">{currentRecord.createTime}</Descriptions.Item>
              <Descriptions.Item label="解决时间">{currentRecord.replyTime}</Descriptions.Item>
            </Descriptions>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#333' }}>反馈内容：</div>
              <div style={{ padding: '12px 16px', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0', whiteSpace: 'pre-wrap', lineHeight: 1.8, color: '#555' }}>{currentRecord.content}</div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#52c41a' }}>回复内容：</div>
              <div className="reply-info-box">{currentRecord.reply}</div>
              <div style={{ marginTop: 8, fontSize: 12, color: '#999', textAlign: 'right' }}>回复时间：{currentRecord.replyTime} | 处理部门：{currentRecord.replyDept}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ResolvedFeedback;
