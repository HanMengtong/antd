import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;
class BasicProfile extends Component {
  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <DescriptionList size="large" title="客户信息" style={{ marginBottom: 32 }}>
            <Description term="客户编号">1000000000</Description>
            <Description term="建档日期">2017-7-22</Description>
            <Description term="客户名称">星火</Description>
            <Description term="联系方式">1234567890</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large"style={{ marginBottom: 32 }}>
            <Description term="客户类型">加工厂</Description>
            <Description term="来源">关系</Description>
            <Description term="规模">500人以上</Description>
            <Description term="地址">浙江省杭州市西湖区万塘路18号</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large"style={{ marginBottom: 32 }}>
            <Description term="已跟进">789</Description>
            <Description term="再次跟进的时间">2018-7-22</Description>
          </DescriptionList>
           <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large"style={{ marginBottom: 32 }}>
            <Description term="现有设备以及供应商">现有设备以及供应商</Description>
          </DescriptionList>
            <DescriptionList size="large"style={{ marginBottom: 32 }}>
            <Description term="意向设备">意向设备</Description>
          </DescriptionList>
            <DescriptionList size="large"style={{ marginBottom: 32 }}>
            <Description term="详细信息备注">详细信息备注</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default BasicProfile;
