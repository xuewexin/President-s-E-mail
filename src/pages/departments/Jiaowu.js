import React from 'react';
import DeptTemplate from '../../components/DeptTemplate';
import { departments } from '../../constants';

const dept = departments.find((d) => d.key === 'jw');

function Jiaowu() {
  return <DeptTemplate dept={dept} seed={3} />;
}

export default Jiaowu;
