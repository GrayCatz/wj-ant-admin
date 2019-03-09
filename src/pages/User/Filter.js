import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';

import styles from '../brand/TableList.less';

const FormItem = Form.Item;

@Form.create()
class Filter extends React.Component {

  handleSearch=(e)=>{
    e.preventDefault();
    console.log(this.props)
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;

      // const values = {
      //   ...fieldsValue,
      //   updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      // };
      //
      // this.setState({
      //   formValues: values,
      // });
      //
      // dispatch({
      //   type: PAGING,
      //   payload: values,
      // });
      this.props.search(fieldsValue)
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('username')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
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
          <Button icon="plus" type="primary" onClick={() => {
            this.props.showEdit(true, {});
          }}>
            新建
          </Button>
        </div>
      </div>);
  }

}

export default Filter;
