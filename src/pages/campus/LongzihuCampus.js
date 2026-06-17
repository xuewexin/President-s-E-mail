import React from 'react';
import CampusTemplate from '../../components/CampusTemplate';

const color = '#1677ff';

const tagList = [
  { tag: '教学管理', count: 38 }, { tag: '食堂餐饮', count: 28 }, { tag: '宿舍管理', count: 22 },
  { tag: '校园安全', count: 18 }, { tag: '学生事务', count: 20 }, { tag: '设施维修', count: 16 },
  { tag: '师德师风', count: 12 }, { tag: '行政管理', count: 8 }, { tag: '其他问题', count: 6 },
];

const monthlyTrend = [
  { month: '1月', 反馈: 30 }, { month: '2月', 反馈: 25 }, { month: '3月', 反馈: 38 },
  { month: '4月', 反馈: 32 }, { month: '5月', 反馈: 40 }, { month: '6月', 反馈: 35 },
];

const recentList = [
  { key: '1', id: 'XX-2024051', title: '食堂饭菜质量问题反馈', tag: '食堂餐饮', status: '已解决', time: '2024-06-15' },
  { key: '2', id: 'XX-2024052', title: '校园电动车停放管理问题', tag: '校园安全', status: '处理中', time: '2024-06-14' },
  { key: '3', id: 'XX-2024053', title: '图书馆开放时间建议', tag: '教学管理', status: '待处理', time: '2024-06-12' },
  { key: '4', id: 'XX-2024054', title: '校园快递管理混乱', tag: '行政管理', status: '处理中', time: '2024-06-10' },
  { key: '5', id: 'XX-2024055', title: '运动场地使用安排建议', tag: '学生事务', status: '已解决', time: '2024-06-08' },
];

function LongzihuCampus() {
  return (
    <CampusTemplate
      name="龙子湖校区"
      color={color}
      stats={{ total: 180, solved: 118, processing: 38, pending: 24 }}
      tags={tagList}
      trend={monthlyTrend}
      list={recentList}
    />
  );
}

export default LongzihuCampus;
