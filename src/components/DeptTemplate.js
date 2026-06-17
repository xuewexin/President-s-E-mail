import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress, Select, Input, Button } from 'antd';
import {
  PhoneOutlined, MailOutlined, CheckCircleOutlined, ClockCircleOutlined,
  ExclamationCircleOutlined, SearchOutlined, EnvironmentOutlined,
  ToolOutlined, TrophyOutlined, IdcardOutlined, SafetyOutlined, DesktopOutlined, AuditOutlined,
} from '@ant-design/icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { tagColorMap, statusColorMap, campusOptions } from '../constants';

const iconMap = { ToolOutlined: <ToolOutlined />, TrophyOutlined: <TrophyOutlined />, IdcardOutlined: <IdcardOutlined />, SafetyOutlined: <SafetyOutlined />, DesktopOutlined: <DesktopOutlined />, AuditOutlined: <AuditOutlined /> };

function generateDeptMockData(deptTags, seed) {
  const titles = [
    '食堂饭菜质量问题反馈', '教学楼空调故障报修', '宿舍热水供应不稳定',
    '校园电动车乱停乱放', '图书馆开放时间建议', '校园道路照明不足',
    '体育场馆设施老化', '教师授课质量反馈', '学生心理健康辅导建议',
    '食堂窗口排队过长', '校园网络覆盖问题', '奖学金评定标准建议',
    '校园绿化修剪维护', '选修课程开设建议', '宿舍公共区域卫生',
    '班主任管理工作意见', '校园快递管理混乱', '校园文化活动建议',
    '实验室设备更新需求', '关于期中考试安排的建议',
  ];
  const data = [];

  // 不同部门使用不同的状态分布比例（基于seed偏移）
  // seed=1: 已解决:处理中:待处理 ≈ 25:12:8
  // seed=2: ≈ 22:14:9
  // seed=3: ≈ 20:15:10
  // seed=4: ≈ 27:10:8
  // seed=5: ≈ 18:16:11
  // seed=6: ≈ 23:13:9
  const patterns = [
    [0,0,0,0,0,0,0,0,0,0, 1,1,1,1, 2,2],            // seed=1: 10/4/2
    [0,0,0,0,0,0,0,0,0, 1,1,1,1,1, 2,2,2],            // seed=2: 9/5/3
    [0,0,0,0,0,0,0,0, 1,1,1,1,1,1, 2,2,2,2],          // seed=3: 8/6/4
    [0,0,0,0,0,0,0,0,0,0,0, 1,1,1, 2,2],              // seed=4: 11/3/2
    [0,0,0,0,0,0,0,0, 1,1,1,1,1,1,1, 2,2,2,2],        // seed=5: 8/7/4
    [0,0,0,0,0,0,0,0,0,0, 1,1,1,1, 2,2,2],            // seed=6: 10/4/3
  ];
  const pattern = patterns[(seed - 1) % patterns.length];
  // 扩展 pattern 到45个元素
  const statusSeq = [];
  for (let i = 0; i < 45; i++) {
    statusSeq.push(pattern[i % pattern.length]);
  }

  // 标签分配序列：按权重 [3,2,2,1,1,1] 循环
  const tagSeq = [];
  for (let cycle = 0; cycle < 8; cycle++) {
    for (let t = 0; t < deptTags.length; t++) {
      const w = [3, 2, 2, 1, 1, 1][t % 6];
      for (let r = 0; r < w; r++) tagSeq.push(t);
    }
  }

  const statusLabels = ['已解决', '处理中', '待处理'];
  const tagCampusCounters = new Array(deptTags.length).fill(0);

  for (let i = 0; i < 45; i++) {
    const tagIndex = tagSeq[(i + seed * 3) % tagSeq.length];
    const tag = deptTags[tagIndex];
    const campusIdx = (tagIndex + tagCampusCounters[tagIndex] + seed) % 3;
    tagCampusCounters[tagIndex]++;
    const campus = campusOptions[campusIdx];

    const statusIdx = statusSeq[i];
    const statusText = statusLabels[statusIdx];

    data.push({
      key: (i + 1).toString(),
      id: `XX-${2024001 + i + (seed - 1) * 50}`,
      title: titles[(i + seed * 3) % titles.length],
      campus: campus.value,
      campusColor: campus.color,
      tag,
      tagColor: tagColorMap[tag],
      status: statusText,
      statusColor: statusColorMap[statusText],
      createTime: `2024-0${Math.floor(i / 15) + 3}-${String((i % 28) + 1).padStart(2, '0')}`,
      reply: statusText === '已解决' ? '已安排相关人员处理完毕。' : '',
    });
  }
  return data;
}

function DeptTemplate({ dept, seed = 1 }) {
  const [searchText, setSearchText] = useState('');
  const [tagFilter, setTagFilter] = useState(undefined);

  const allData = useMemo(() => generateDeptMockData(dept.tags, seed), [dept.tags, seed]);
  const stat = { total: allData.length, solved: allData.filter((d) => d.status === '已解决').length, processing: allData.filter((d) => d.status === '处理中').length, pending: allData.filter((d) => d.status === '待处理').length };

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchSearch = !searchText || item.title.includes(searchText) || item.id.includes(searchText);
      const matchTag = !tagFilter || item.tag === tagFilter;
      return matchSearch && matchTag;
    });
  }, [allData, searchText, tagFilter]);

  const tagChart = dept.tags.map((t) => ({ tag: t, count: allData.filter((d) => d.tag === t).length }));

  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', width: 110 },
    { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: '校区', dataIndex: 'campus', key: 'campus', width: 100, render: (c, r) => <Tag color={r.campusColor}>{c}</Tag> },
    { title: '标签', dataIndex: 'tag', key: 'tag', width: 80, render: (t, r) => <Tag color={r.tagColor}>{t}</Tag> },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (s, r) => <Tag color={r.statusColor}>{s}</Tag> },
    { title: '时间', dataIndex: 'createTime', key: 'createTime', width: 120 },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 16, borderTop: `4px solid ${dept.color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 32 }}>{iconMap[dept.icon]}</span>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, color: dept.color }}>{dept.name}</h2>
            <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
              负责人：{dept.leader} | <PhoneOutlined /> {dept.phone} | <MailOutlined /> {dept.email} | <EnvironmentOutlined /> {dept.office}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          {dept.tags.map((t) => <Tag key={t} color={tagColorMap[t]}>{t}</Tag>)}
        </div>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {[
          { title: '总反馈', value: stat.total, color: dept.color },
          { title: '已解决', value: stat.solved, color: '#52c41a', icon: <CheckCircleOutlined /> },
          { title: '处理中', value: stat.processing, color: '#1677ff', icon: <ClockCircleOutlined /> },
          { title: '待处理', value: stat.pending, color: '#fa8c16', icon: <ExclamationCircleOutlined /> },
        ].map((s) => (
          <Col xs={12} sm={6} key={s.title}>
            <Card size="small"><Statistic title={s.title} value={s.value} prefix={s.icon}
              styles={{ content: { color: s.color, fontSize: 22 } }} /></Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="处理进度" size="small">
            {['已解决', '处理中', '待处理'].map((status) => {
              const key = status === '已解决' ? 'solved' : status === '处理中' ? 'processing' : 'pending';
              const pct = Math.round((stat[key] / stat.total) * 100);
              return (
                <div key={status} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                    <span>{status}</span><span style={{ color: statusColorMap[status], fontWeight: 'bold' }}>{stat[key]}</span>
                  </div>
                  <Progress percent={pct} strokeColor={statusColorMap[status]} showInfo={false} />
                </div>
              );
            })}
            <div className="resolve-info-box">
              <CheckCircleOutlined style={{ marginRight: 6 }} />
              <span>解决率 {Math.round((stat.solved / stat.total) * 100)}%</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="分类标签分布" size="small">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={tagChart} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="tag" width={80} />
                <ReTooltip />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
                  {tagChart.map((_, i) => (<Cell key={i} fill={dept.color} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card>
        <Row gutter={[12, 12]} style={{ marginBottom: 12 }} align="middle">
          <Col xs={24} sm={6}>
            <Input placeholder="搜索标题 / 编号..." prefix={<SearchOutlined />} value={searchText}
              onChange={(e) => setSearchText(e.target.value)} allowClear />
          </Col>
          <Col xs={12} sm={4}>
            <Select placeholder="分类标签" allowClear style={{ width: '100%' }}
              value={tagFilter} onChange={setTagFilter}
              options={dept.tags.map((t) => ({ value: t, label: t }))} />
          </Col>
          <Col xs={12} sm={4}>
            <Button onClick={() => { setSearchText(''); setTagFilter(undefined); }}>重置</Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={filteredData}
          pagination={{ defaultPageSize: 15, showSizeChanger: true, showQuickJumper: true,
            pageSizeOptions: ['10', '15', '30', '50'], showTotal: (t, r) => `第 ${r[0]}-${r[1]} 条，共 ${t} 条` }}
          scroll={{ x: 900 }} size="middle" />
      </Card>
    </div>
  );
}

export default DeptTemplate;
