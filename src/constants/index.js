import { ToolOutlined, TrophyOutlined, IdcardOutlined, SafetyOutlined, DesktopOutlined, AuditOutlined } from '@ant-design/icons';

export const deptIconMap = {
  ToolOutlined: <ToolOutlined />,
  TrophyOutlined: <TrophyOutlined />,
  IdcardOutlined: <IdcardOutlined />,
  SafetyOutlined: <SafetyOutlined />,
  DesktopOutlined: <DesktopOutlined />,
  AuditOutlined: <AuditOutlined />,
};

export const campusOptions = [
  { value: '龙子湖校区', label: '龙子湖校区', color: '#1677ff' },
  { value: '文化路校区', label: '文化路校区', color: '#52c41a' },
  { value: '许昌校区', label: '许昌校区', color: '#fa8c16' },
];

export const tagOptions = [
  { value: '教学管理', label: '教学管理', color: '#1677ff' },
  { value: '食堂餐饮', label: '食堂餐饮', color: '#52c41a' },
  { value: '宿舍管理', label: '宿舍管理', color: '#fa8c16' },
  { value: '校园安全', label: '校园安全', color: '#ff4d4f' },
  { value: '设施维修', label: '设施维修', color: '#722ed1' },
  { value: '学生事务', label: '学生事务', color: '#13c2c2' },
  { value: '师德师风', label: '师德师风', color: '#eb2f96' },
  { value: '行政管理', label: '行政管理', color: '#faad14' },
  { value: '其他问题', label: '其他问题', color: '#8c8c8c' },
];

export const statusOptions = [
  { value: '待处理', label: '待处理', color: '#fa8c16' },
  { value: '处理中', label: '处理中', color: '#1677ff' },
  { value: '已解决', label: '已解决', color: '#52c41a' },
];

export const tagColorMap = Object.fromEntries(tagOptions.map((t) => [t.value, t.color]));
export const statusColorMap = Object.fromEntries(statusOptions.map((s) => [s.value, s.color]));

export const departments = [
  { key: 'hq', name: '后勤处', leader: '王建国', phone: '0371-63558001', email: 'hq@henau.edu.cn', office: '行政楼 302', color: '#1677ff', icon: 'ToolOutlined', tags: ['食堂餐饮', '宿舍管理', '设施维修'] },
  { key: 'jw', name: '教务处', leader: '李明华', phone: '0371-63558002', email: 'jw@henau.edu.cn', office: '行政楼 205', color: '#52c41a', icon: 'TrophyOutlined', tags: ['教学管理'] },
  { key: 'xs', name: '学生处', leader: '赵文博', phone: '0371-63558003', email: 'xs@henau.edu.cn', office: '行政楼 108', color: '#722ed1', icon: 'IdcardOutlined', tags: ['学生事务', '师德师风'] },
  { key: 'bw', name: '保卫处', leader: '陈志强', phone: '0371-63558110', email: 'bw@henau.edu.cn', office: '行政楼 101', color: '#ff4d4f', icon: 'SafetyOutlined', tags: ['校园安全'] },
  { key: 'xx', name: '信息化办公室', leader: '刘洋', phone: '0371-63558005', email: 'xxb@henau.edu.cn', office: '图书馆 401', color: '#13c2c2', icon: 'DesktopOutlined', tags: ['校园安全', '其他问题'] },
  { key: 'xzb', name: '行政管理处', leader: '孙晓峰', phone: '0371-63558006', email: 'xzb@henau.edu.cn', office: '行政楼 501', color: '#faad14', icon: 'AuditOutlined', tags: ['行政管理', '其他问题'] },
];

export const deptStats = [
  { dept: '后勤处', total: 128, solved: 95, processing: 20, pending: 13, color: '#1677ff' },
  { dept: '教务处', total: 86, solved: 68, processing: 12, pending: 6, color: '#52c41a' },
  { dept: '学生处', total: 57, solved: 42, processing: 10, pending: 5, color: '#722ed1' },
  { dept: '保卫处', total: 42, solved: 30, processing: 8, pending: 4, color: '#ff4d4f' },
  { dept: '信息化办', total: 35, solved: 28, processing: 5, pending: 2, color: '#13c2c2' },
  { dept: '行政管理处', total: 25, solved: 20, processing: 3, pending: 2, color: '#faad14' },
];
