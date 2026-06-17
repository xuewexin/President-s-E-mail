import React from 'react';
import DeptTemplate from '../../components/DeptTemplate';
import { departments } from '../../constants';

const dept = departments.find((d) => d.key === 'hq');

function Houqin() {
  return <DeptTemplate dept={dept} seed={1} />;
}

export default Houqin;
