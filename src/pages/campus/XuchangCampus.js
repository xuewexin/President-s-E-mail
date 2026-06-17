import React from 'react';
import CampusTemplate from '../../components/CampusTemplate';

const color = '#fa8c16';

const tagList = [
  { tag: '教学管理', count: 18 }, { tag: '食堂餐饮', count: 14 }, { tag: '宿舍管理', count: 11 },
  { tag: '校园安全', count: 9 }, { tag: '学生事务', count: 5 }, { tag: '设施维修', count: 8 },
  { tag: '师德师风', count: 4 }, { tag: '行政管理', count: 4 }, { tag: '其他问题', count: 4 },
];

const monthlyTrend = [
  { month: '1月', 反馈: 7 }, { month: '2月', 反馈: 5 }, { month: '3月', 反馈: 10 },
  { month: '4月', 反馈: 11 }, { month: '5月', 反馈: 12 }, { month: '6月', 反馈: 8 },
];

const recentList = [
  { key: '1', id: 'XX-2024071', title: '图书馆开放时间建议', tag: '教学管理', status: '待处理', time: '2024-06-14' },
  { key: '2', id: 'XX-2024072', title: '实验室设备更新需求', tag: '设施维修', status: '处理中', time: '2024-06-12' },
  { key: '3', id: 'XX-2024073', title: '校园网络覆盖问题', tag: '校园安全', status: '已解决', time: '2024-06-10' },
  { key: '4', id: 'XX-2024074', title: '心理健康辅导建议', tag: '学生事务', status: '已解决', time: '2024-06-08' },
  { key: '5', id: 'XX-2024075', title: '电动车停放管理', tag: '校园安全', status: '处理中', time: '2024-06-05' },
];

function XuchangCampus() {
  return (
    <CampusTemplate
      name="许昌校区"
      color={color}
      stats={{ total: 67, solved: 45, processing: 12, pending: 10 }}
      tags={tagList}
      trend={monthlyTrend}
      list={recentList}
    />
  );
}

export default XuchangCampus;
