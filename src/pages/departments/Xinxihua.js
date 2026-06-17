import React from 'react';
import DeptTemplate from '../../components/DeptTemplate';
import { departments } from '../../constants';

const dept = departments.find((d) => d.key === 'xx');

function Xinxihua() {
  return <DeptTemplate dept={dept} seed={5} />;
}

export default Xinxihua;
