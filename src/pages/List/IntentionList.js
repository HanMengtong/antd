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
const device = ['swing', 'RS5', 'SWING HD', 'dental plus'];

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
      title: '跟进结束日期',
      dataIndex: 'followEndDate',
      align: 'center',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '客户名称',
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: '联系人',
      dataIndex: 'contacts',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: 'callNum',
      align: 'center',
      render: val => `${val} `,
    },
    {
      title: '来源',
      dataIndex: 'relationShip',
      align: 'center',
    },
    {
      title: '意向设备',
      dataIndex: 'device',
      align: 'center',
      render: val => <span>{device[val]}</span>, //静态数据展示，之后改成可筛选的
      //render(val) {
      //  return <Badge device={[val]} text={device[val]} />;
      //},
    },
    {
      title: '已跟进次数',
      dataIndex: 'followTime',
      align: 'center',
    },
    {
      title: '逾期次数',
      dataIndex: 'overdueTime',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a href="/account/settings/record">记录跟进结果</a>
          <Divider type="vertical" />
          <a href="/profile/details">查看详情</a>
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
            <FormItem label="跟进日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入跟进日期" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={22}>
            <FormItem label="客户名称">
              {getFieldDecorator('desc')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={6} sm={22}>
            <FormItem label="联系电话">
              {getFieldDecorator('numr1')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={6} sm={22}>
            <FormItem label="地区">
              {getFieldDecorator('dqu')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={6} sm={22}>
            <FormItem label="意向设备型号">
              {getFieldDecorator('device')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">RS5</Option>
                  <Option value="1">swing</Option>
                  <Option value="2">SWING HD</Option>
                  <Option value="3">dental plus</Option>
                </Select>
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
