import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [
{
  title: '意向设备',
  colSpan: 0,
  dataIndex: 'device',
  render: renderContent,
}, 
{
  title: '数量',
  dataIndex: 'number',
  render: renderContent,
}];

const data = [{
  device:'swing',
  number: '5',
}, {
  device:'swing',
  number: '5',
}, {
  device:'swing',
  number: '5',
}, {
  device:'swing',
  number: '5',
}, {
  device:'swing',
  number: '5',
}];

class DescriptionTable extends React.Component{
  render(){
     
      <Table columns={columns} dataSource={data} bordered />
   
  };
}
DescriptionTable.defaultProps = {
  term: '',
};

DescriptionTable.propTypes = {
  term: PropTypes.node,
};


export default DescriptionTable;
