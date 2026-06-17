import React from 'react';
import DeptTemplate from '../../components/DeptTemplate';
import { departments } from '../../constants';

const dept = departments.find((d) => d.key === 'xs');

function Xuesheng() {
  return <DeptTemplate dept={dept} seed={2} />;
}

export default Xuesheng;
