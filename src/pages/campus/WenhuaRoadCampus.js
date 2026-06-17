import React from 'react';
import CampusTemplate from '../../components/CampusTemplate';

const color = '#52c41a';

const tagList = [
  { tag: '教学管理', count: 30 }, { tag: '食堂餐饮', count: 22 }, { tag: '宿舍管理', count: 20 },
  { tag: '校园安全', count: 15 }, { tag: '学生事务', count: 10 }, { tag: '设施维修', count: 14 },
  { tag: '师德师风', count: 6 }, { tag: '行政管理', count: 6 }, { tag: '其他问题', count: 5 },
];

const monthlyTrend = [
  { month: '1月', 反馈: 18 }, { month: '2月', 反馈: 15 }, { month: '3月', 反馈: 24 },
  { month: '4月', 反馈: 20 }, { month: '5月', 反馈: 28 }, { month: '6月', 反馈: 21 },
];

const recentList = [
  { key: '1', id: 'XX-2024061', title: '教学楼空调故障报修', tag: '设施维修', status: '处理中', time: '2024-06-15' },
  { key: '2', id: 'XX-2024062', title: '宿舍热水供应不稳定', tag: '宿舍管理', status: '已解决', time: '2024-06-13' },
  { key: '3', id: 'XX-2024063', title: '校园网络覆盖问题', tag: '校园安全', status: '已解决', time: '2024-06-11' },
  { key: '4', id: 'XX-2024064', title: '体育场馆设施老化', tag: '设施维修', status: '处理中', time: '2024-06-09' },
  { key: '5', id: 'XX-2024065', title: '奖学金评定标准建议', tag: '学生事务', status: '已解决', time: '2024-06-07' },
];

function WenhuaRoadCampus() {
  return (
    <CampusTemplate
      name="文化路校区"
      color={color}
      stats={{ total: 126, solved: 82, processing: 28, pending: 16 }}
      tags={tagList}
      trend={monthlyTrend}
      list={recentList}
    />
  );
}

export default WenhuaRoadCampus;
