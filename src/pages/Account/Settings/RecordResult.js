import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Form, Input, Select, Button, DatePicker } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const Option = Select.Option;
const { Description } = DescriptionList;

/*提交数据的链接*/
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))

class RecordProfile extends Component {

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <DescriptionList size="large" title="意向信息" style={{ marginBottom: 32 }}>
            <Description term="客户名称">星火</Description>
            <Description term="建档日期">2017-7-22</Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 32 }}>
	          <Description term="联系人1">吴宁</Description>
	          <Description term="联系方式">1234567890</Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 32 }}>
            <Description term="备注">
              <textarea style={{width:'580px',height:'86px',resize:'none'}}></textarea>
            </Description>
          </DescriptionList>    
          <DescriptionList style={{ marginBottom: 32 }}>
            {/* 新增按钮+表格 */}
          </DescriptionList>    
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="跟进结果" style={{ marginBottom: 32 }}>
            {/* 历史跟进按钮 */}
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="已跟进次数">4</Description>
	          <Description term="逾期次数">0</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="拜访方式">
              <Select defaultValue="door" style={{ width: 150 }}>
                <Option value="telephone">电话拜访</Option>
                <Option value="door">登门拜访</Option>
              </Select>
            </Description>
            <Description term="联系人">
              <Select defaultValue="lucy" style={{ width: 150 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Description>
            <Description term="联系电话">13810027998</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="再次跟进日期">
              <DatePicker  style={{ width: 200 }}  placeholder="请输入再次跟进日期" />
            </Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="沟通内容">
              <textarea style={{width:'580px',height:'86px',resize:'none'}}></textarea>
            </Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ width:'200px', marginLeft: 200 }}>
            <Button type="primary" htmlType="submit">
            <a href="/list/intentionlist">继续跟进</a>
            </Button>
            <Button type="primary" style={{ marginLeft:'40px'}}>
              {/* <FormattedMessage id="form.back" /> */}
              <a href="/list/intentionlist">返回</a>
            </Button>
          </DescriptionList>
          
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default RecordProfile;
