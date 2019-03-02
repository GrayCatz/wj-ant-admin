import React, { PureComponent } from 'react';
import OSS from 'ali-oss';
import { Button, Form, Icon, Modal, Upload } from 'antd';
import BatchUpload from './BatchUpload';

const FormItem = Form.Item;

let imgUrl;
let imgFile = [];

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


@Form.create()
class BatchImport extends PureComponent {
  // 添加
  handleAdd = (fields) => {
    put(imgFile, (url) => {
      this.props.handleAddSuccess(fields, url);
    });
  };
  setImgFile = (file) => {
    imgFile.push(file);
  };
  // 添加
  handleBatchAdd = (fields) => {
    console.log("handleBatchAdd:")
    console.log(imgFile)
    // put(imgFile, (url) => {
    //   this.props.handleAddSuccess(fields, url);
    // });
  };


  render() {
    const { modalVisible, form, handleAdd, handleModalVisible } = this.props;
    const okHandle = () => {
      // put();
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        this.handleBatchAdd(fieldsValue);
      });
    };
    return (
      <Modal
        destroyOnClose
        title="批量导入"
        visible={modalVisible}
        okText="开始导入"
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="">
          {form.getFieldDecorator('image', {
            // rules: [{ required: true  ,message: '！}],
          })(<BatchUpload setImgFile={this.setImgFile}></BatchUpload>)}
        </FormItem>
      </Modal>
    );
  }

}

export default BatchImport;
