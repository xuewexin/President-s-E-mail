import React from 'react';
import DeptTemplate from '../../components/DeptTemplate';
import { departments } from '../../constants';

const dept = departments.find((d) => d.key === 'xzb');

function Xingzheng() {
  return <DeptTemplate dept={dept} seed={6} />;
}

export default Xingzheng;
