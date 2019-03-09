import { Upload, Icon, message } from 'antd';
import React from 'react';
import AvatarStyle from './Avatar.css'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const uploadButton = (
      <div className={AvatarStyle['plus-btn']}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
      </div>
    );
    const imageUrl = this.props.url?this.props.url:this.state.imageUrl;
    console.log("imageUrl:",this.props.url)

    return (
      <Upload
        name="avatar"
        // listType="picture-card"
        className={AvatarStyle['uploader']}
        showUploadList={false}
        // action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img className={AvatarStyle['upload-img']} src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}
export default Avatar;