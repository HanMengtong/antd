import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;


const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const status = ['rs1', 'rs2', 'rs3', 'rs4'];

/* eslint react/no-multi-comp:0 */
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))

@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };





  columns = [
    {
      title: '客户编号',
      dataIndex: 'name',
    },
    {
      title: '客户名称',
      dataIndex: 'desc',
    },
    {
      title: '联系电话',
      dataIndex: 'callNo',
      align: 'right',
      render: val => `${val} `,
    },
     {
      title: '地区',
      dataIndex: 'dqu',

    },
    {
    	title: '意向设备',
      dataIndex: 'status',
  
      render(val) {
        return <Badge status={[val]} text={status[val]} />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a href="/account/settings/base">编辑</a>
          <Divider type="vertical" />
          <a href="/profile/basic">查看</a>
        </Fragment>
      ),
    },
  ];












  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }


handleStandardTableChange = (pagination, filtersArg, sorter) => {
	
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
    const newObj = { ...obj };
    newObj[key] = getValue(filtersArg[key]);
    return newObj;
}, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
dispatch({
      type: 'rule/fetch',
      payload: params,
});
    
    
};







  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };






  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };
/*删除*/
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };


 handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
 };
 
 
 
 
 /*点击查询*/

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };
  
  
  
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 22, xl: 48 }}>
          <Col md={6} sm={22}>
            <FormItem label="客户编号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={22}>
            <FormItem label="意向设备">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">R1</Option>
                  <Option value="1">R2</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={22}>
            <FormItem label="客户名称">
              {getFieldDecorator('desc')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
           <Col md={6} sm={22}>
            <FormItem label="地区">
              {getFieldDecorator('dqu')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
           <Col md={6} sm={22}>
            <FormItem label="联系电话">
              {getFieldDecorator('numr1')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={6} sm={22}>
            <FormItem label="创建日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入创建日期" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={22}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }



  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

   
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button>
              <a href="/account/settings/base">
                新建
                </a>
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
