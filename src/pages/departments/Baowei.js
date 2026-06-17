import React from 'react';
import DeptTemplate from '../../components/DeptTemplate';
import { departments } from '../../constants';

const dept = departments.find((d) => d.key === 'bw');

function Baowei() {
  return <DeptTemplate dept={dept} seed={4} />;
}

export default Baowei;
