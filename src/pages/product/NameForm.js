import React, { PureComponent } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;


@Form.create()
class NameForm extends PureComponent {


  render() {
    const { visible, form, handleAdd, handleModalVisible } = this.props;
    console.log(visible)
    const okHandle = () => {
      // put();
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleModalVisible(false);
        this.props.handleAdd(fieldsValue);
      });
    };
    return (
      <Modal
        destroyOnClose
        title="添加"
        visible={visible}
        onOk={okHandle}
        onCancel={() => handleModalVisible(false)}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="必填项名称">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '名称不能为空！' }],
          })(<Input placeholder="请输入"/>)}
        </FormItem>
      </Modal>
    );
  }

}

export default NameForm;
