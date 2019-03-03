import React, { PureComponent } from 'react';
import OSS from 'ali-oss';
import { Form, Input, message, Modal, Select } from 'antd';
import AvatarUpload from './AvatarUpload';

const FormItem = Form.Item;

let imgUrl;
let imgFile;

// 实例化OSS Client,具体的参数可参文档配置项
const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAIavN8qvYKCn7A',
  accessKeySecret: 'RTzP3aP5QSV0SqL9TMKlwWVp0wNP5G',
  bucket: 'mz-dev-2',
});

async function put(file, callback) {
  console.log(file);
  try {
    // object表示上传到OSS的名字，可自己定义
    // file浏览器中需要上传的文件，支持HTML5 file 和 Blob类型
    let r1 = await client.put(file.name, file);
    console.log('put success: %j', r1);
    let r2 = await client.get(file.name);
    console.log('get success: %j', r2);
    callback(r1.url);
  } catch (e) {
    console.error('error: %j', e);
  }
}


let setImgFile = (file) => {
  imgFile = file;
};


@Form.create()
class CreateForm extends PureComponent {
  // 添加
  handleAdd = (fields) => {
    if (imgFile == null) {
      message.error('请先选择图片');
      return;
    }
    put(imgFile, (url) => {
      this.props.handleAddSuccess(fields, url);
    });
  };

  render() {
    const { modalVisible, form, handleAdd, handleModalVisible } = this.props;
    const okHandle = () => {
      // put();
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        this.handleAdd(fieldsValue);
      });
    };
    return (
      <Modal
        destroyOnClose
        title="添加"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片名">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '图片名不能为空！' }],
          })(<Input placeholder="请输入"/>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片类型">
          {form.getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择图片类型' }],
            initialValue: '',
          })(
            <Select
              style={{ width: '200px' }}
            >
              <Select.Option value="">请选择</Select.Option>
              <Select.Option value="PRODUCT">产品图</Select.Option>
              <Select.Option value="PRODUCT_EXAMPLE">产品鉴别图标</Select.Option>
              <Select.Option value="PRODUCT_REAL_EXAMPLE">产品鉴别示例图</Select.Option>
            </Select>,
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上传图片">
          {form.getFieldDecorator('image', {
            // rules: [{ required: true  ,message: '！}],
          })(<AvatarUpload setImgFile={setImgFile}/>)}
        </FormItem>
      </Modal>
    );
  }

}

export default CreateForm;
