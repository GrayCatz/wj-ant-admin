import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import Avatar from './Avatar';
import OSS from 'ali-oss';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


@Form.create()
class EditForm extends React.Component {

  state = {
    loading: false,
    portrait: null,
    portraitUrl: null,
    // current: {},
  };

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

  formItemLayout = {
    // labelCol: {
    //   xs: { span: 24 },
    //   sm: { span: 7 },
    // },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 16 },
    // },
  };

  componentWillReceiveProps() {
    this.setState({
      portrait: null,
      portraitUrl: this.props.current.portrait,
    });
  }

  handleOk = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (this.state.portrait && this.state.portrait != null) {
        put(this.state.portrait, (url) => {
          fieldsValue.portrait = url;
          this.props.handleSave(fieldsValue);
        });
      } else {
        this.props.handleSave(fieldsValue);
      }

    });

  };

  handleCancel = () => {
    this.props.showEdit(false);
  };

  savePortrait = (file) => {
    getBase64(file, imageUrl => this.setState({
      portrait: file,
      portraitUrl: imageUrl,
    }));
    console.log(file);
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    console.log("roles:",this.props.roles)
    return (
      <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          style={{ display: 'none' }}
          label="id"
        >
          {getFieldDecorator('id', {
            initialValue: this.props.current.id,
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          label="头像"
        >
          {getFieldDecorator('avatar', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Avatar
              url={this.state.portraitUrl}
              // url={this.props.current.portrait}
              savePortrait={this.savePortrait}/>,
          )}
        </Form.Item>
        <Form.Item
          label="用户名"
        >
          {getFieldDecorator('username', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.props.current.username,
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.props.current.password,
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          label="真实姓名"
        >
          {getFieldDecorator('realName', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.props.current.realName,
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          label="电话号码"
        >
          {getFieldDecorator('phone', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.props.current.phone,
          })(
            <Input/>,
          )}
        </Form.Item>
        <Form.Item
          label="角色"
        >
          {getFieldDecorator('roleId', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.props.current.roleId,
          })(
            <Select style={{ width: 120 }}>
              {this.props.roles.map((item) =>
                <Option value={String(item.id)}>{item.name}</Option>,
              )}
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label="个人简介（可鉴别）"
        >
          {getFieldDecorator('profile', {
            rules: [{
              // type: 'email', message: 'The input is not valid E-mail!',
            }, {
              // required: true, message: 'Please input your E-mail!',
            }],
            initialValue: this.props.current.profile,
          })(
            <TextArea/>,
          )}
        </Form.Item>
        <Form.Item
          label="鉴别要求"
        >
          {getFieldDecorator('requirement', {
            rules: [],
            initialValue: this.props.current.requirement,
          })(
            <TextArea/>,
          )}
        </Form.Item>
      </Form>
    );
  }

  render() {

    return (
      <div>
        <Modal
          destroyOnClose
          visible={this.props.visible}
          title="创建用户"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              保存
            </Button>,
          ]}
        >
          {this.renderForm()}
        </Modal>
      </div>);
  }

}

export default EditForm;
