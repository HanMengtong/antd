import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DetailsProfile.less';

const { Description, DescriptionTable } = DescriptionList;



class BasicProfile extends Component {
  render() {
    return (
      
      <PageHeaderWrapper>
        <Card bordered={false}>
          <DescriptionList size="large" title="销售" style={{ marginBottom: 32 }}>
            <Description term="销售顾问">田勒</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="意向信息" style={{ marginBottom: 32 }}>
            <Description term="客户名称">星火万方（北京）齿科技术有限公司</Description>
            <Description term="建档日期">2017-7-22</Description>
            <Description term="来源">关系</Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 32 }}>
	          <Description term="联系人1">吴宁</Description>
	          <Description term="联系方式">1234567890</Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 32 }}>
            <Description term="联系人2">回顾</Description>
            <Description term="联系方式">1234567890</Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 32 }}>
          
            <Description term="备注">最近不考虑，过些时候再决定</Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 32 }}>
          {/* <DescriptionTable></DescriptionTable> */}

          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
         
           <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="跟进计划" style={{ marginBottom: 32 }}>
            <Description term="已跟进次数">3</Description>
            <Description term="逾期次数">0</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="上次跟进日期">2018-11-12</Description>
            <Description term="拜访方式">电话拜访</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="提醒日期">2018-11-12</Description>
            <Description term="结束日期">2018-11-12</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default BasicProfile;
