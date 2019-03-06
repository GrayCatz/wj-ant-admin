import React, { Fragment } from 'react';
import { Button, Card, Col, Dropdown, Form, Icon, Input, Row, Table } from 'antd';

import styles from '../brand/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;

@Form.create()
class Filter extends React.Component {


  formItems = [
    {
      label: '用户名',
      key: 'username',
    },
    {
      label: '手机号',
      key: 'phone',
    },

  ];

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {this.formItems.map((item)=>{
            return (
              <Col md={8} sm={24}>
                <FormItem label={item.label}>
                  {getFieldDecorator(item.key)(<Input placeholder="请输入"/>)}
                </FormItem>
              </Col>
            )
          })}
          <Col md={8} sm={24}>
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

  render() {

    return (
      <div>
        <div className={styles.tableListForm}>{this.renderForm()}</div>
        <div className={styles.tableListOperator}>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新建
          </Button>
        </div>
      </div>);
  }

}

export default Filter;
