import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Upload, Select, Button,Divider ,DatePicker} from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import GeographicView from './GeographicView';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PhoneView from './PhoneView';
// import { getTimeDistance } from '@/utils/utils';
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))

/*提交数据的链接*/
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))

@Form.create()
class BaseView extends Component {
	/*提交数据的内容*/
	 handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };
	
	
	
	
	/*编辑*/
  componentDidMount() {
    this.setBaseInfo();
  }
  setBaseInfo = () => {
    const {currentUser, form } = this.props;
   
  };
  render() {
  	const { submitting } = this.props;
  	const {
      form: { getFieldDecorator,getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 21 },
        sm: { span: 28 },
        md: { span: 28 },
      },
    };
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 6 },
        sm: { span:8 },
    },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 22 },
        md: { span: 16 },
      },
    };
 
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.email' })}>
           
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: false,
                   
                  },
                ],
              })(<Input />)} 
            </FormItem>
            <div className={styles.Vw}>
            <FormItem {...formItemLayout1} label={formatMessage({ id: 'app.settings.basic.nickname' })} style={{ float: 'left'}}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: false,
                   
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout1} label={formatMessage({ id: 'app.settings.basic.profile' })}  style={{ float: 'right' }}>
              {getFieldDecorator('profile', {
                rules: [
                  {
                    required: false,
                   
                  },
                ],
              })(<Input/> )}
            </FormItem>
            </div>
            <div className={styles.Vw}>
            <FormItem  {...formItemLayout1} label={formatMessage({ id: 'app.settings.basic.country' })}  style={{ float: 'left' }}>
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: false,

                  },
                ],
              })(
                <Select style={{ float: 'left',marginRight:'110px',}}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.geographic' })} style={{ float: 'right'}}>
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: false,
                  },
                  
                ],
              })(<GeographicView style={{ float: 'left',marginLeft:'40px' }}/>)}
            </FormItem>
            </div>
            <FormItem  {...formItemLayout} label={formatMessage({ id: 'app.settings.basic.address' })}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: false,
                  
                  },
                ],
              })(<Input />)}
            </FormItem>
            <Divider/>
            <div className={styles.Vw}>
            <FormItem {...formItemLayout1} label='客户类型' style={{ float: 'left' }}>
              {getFieldDecorator('name1', {
                rules: [
                  {
                    required: false,
                   
                  },
                ],
              })(<Select style={{ float: 'left',marginRight:'102px',}}>
                  <Option value="China">医院</Option>
                </Select>)}
            </FormItem>
            <FormItem {...formItemLayout1} label='规模'  style={{ float: 'right' }}>
              {getFieldDecorator('profile1', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Select style={{ float: 'left',marginRight:'74px',}}>
                  <Option value="China">500人以上</Option>
                </Select> )}
            </FormItem>
            </div>
            <div className={styles.Vw}>
            <FormItem {...formItemLayout1} label='来源' style={{ float: 'left' }}>
              {getFieldDecorator('name2', {
                rules: [
                  {
                    required: false,
                   
                  },
                ],
              })(<Select style={{ float: 'left',marginRight:'102px',}}>
                  <Option value="China">医院</Option>
                </Select>)}
            </FormItem>
            <FormItem {...formItemLayout1} style={{ float: 'left',width:'30%' }}>
              {getFieldDecorator('profile2', {
                rules: [
                  {
                    required: false,
                  
                  },
                ],
              })(<Input style={{ float: 'left',width:'172%' }}/> )}
            </FormItem>
            </div>
            <Divider />
            <div className={styles.Vw}>
            <FormItem {...formItemLayout1} label='供应商' style={{ float: 'left'}}>
              {getFieldDecorator('name3', {
                rules: [
                  {
                    required: false,
                 
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout1} label='设备品牌'  style={{ float: 'right' }}>
              {getFieldDecorator('profile3', {
                rules: [
                  {
                    required: false,
                  
                  },
                ],
              })(<Input/> )}
            </FormItem>
            </div>
            
            
           <div className={styles.Vw}>
            <FormItem {...formItemLayout1} label='设备名称' style={{ float: 'left'}}>
              {getFieldDecorator('name4', {
                rules: [
                  {
                    required: false,
                   
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout1} label='设备名称'  style={{ float: 'right' }}>
              {getFieldDecorator('profile4', {
                rules: [
                  {
                    required: false,
                   
                  },
                ],
              })(<Input/> )}
            </FormItem>
            </div>
             <div className={styles.Vw}>
            <FormItem {...formItemLayout1} label='使用年限' style={{ float: 'left' }}>
              {getFieldDecorator('name5', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout1} label='使用评价'  style={{ float: 'right' }}>
              {getFieldDecorator('profile5', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input/> )}
            </FormItem>
            </div>
           <Divider /> 
            <div className={styles.Vw}>
            <FormItem  {...formItemLayout1} label='意向设备'  style={{ float: 'left' }}>
              {getFieldDecorator('con1', {
                rules: [
                  {
                    required: false,
                    
                  },
                ],
              })(
                <Select style={{ float: 'left',marginRight:'50px'}}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem>
           <FormItem  {...formItemLayout1} label=' '  style={{ float: 'right' }}>
              {getFieldDecorator('con2', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Select style={{ float: 'left',marginRight:'50px'}}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem>
             <FormItem  {...formItemLayout1} label=' '  style={{ float: 'left' }}>
              {getFieldDecorator('con3', {
                rules: [
                  {
                    required: false,
                   
                  },
                ],
              })(
                <Select style={{ float: 'left',marginRight:'50px'}}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem>
            </div>
              <FormItem {...formItemLayout} label='数量'>
           
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: false,   
                  },
                ],
              })(<Input />)} 
            </FormItem>
            <FormItem {...formItemLayout} label='信息备注'>
              {getFieldDecorator('beizhu', {
                rules: [
                  {
                    required: false,
                   
                  },
                ],
              })(
                <Input.TextArea
                
                  rows={4}
                />
              )}
            </FormItem>
            
            <FormItem  {...formItemLayout} label="再次跟进">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入日期" />
              )}
             </FormItem>
             <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
            <Button type="primary" style={{ marginLeft:'40px'}}>
              <FormattedMessage
                id="app.settings.basic.update1"      
              />
            </Button>
          </Form>
        </div>
      
      </div>
    );
  }
}
export default BaseView;





