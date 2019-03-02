import React, { Component } from 'react';
import { Card, Icon, List } from 'antd';
import ImageSelector from '../image/ImageSelector';

class ProductImageList extends Component {

  state = {
    modalVisible: false,
    curItem: null,
    // data: [
    //   {
    //     name: '管体正面',
    //     a: {
    //       url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    //     },
    //     b: {
    //       url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    //     },
    //   },
    //   {
    //     name: '管体正面',
    //     a: {
    //       url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    //     },
    //     b: {
    //       url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    //     },
    //   },
    //   {
    //     name: '管体正面',
    //     a: {
    //       url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    //     },
    //     b: {
    //       url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    //     },
    //   },
    //   {
    //     name: '管体正面',
    //     a: {
    //       url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    //     },
    //     b: {
    //       url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    //     },
    //   },
    // ],
  };

  // handleSelector = (file) => {
  //   console.log("handleSelector")
  // };
  handleModalVisible1 = (modalVisible, item) => {
    this.setState({ modalVisible });
    this.state.curItem = item;
  };

  handleModalVisible = (modalVisible) => {
    this.setState({ modalVisible });
  };

  handleSelectImage = (item) => {
    console.log(item);
    this.handleModalVisible(false);
    this.state.curItem.url = item.url;
  };

  render() {
    const { profile = {}, loading,dataSource } = this.props;

    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={dataSource}
        renderItem={item => (
          <div>
            <List.Item
              style={{ border: '1px solid #ccc', textAlign: 'center', padding: '20px', position: 'relative' }}>
              <div>
                <span>{item.name}</span>
                <div style={{ cursor: 'pointer', position: 'absolute', right: 15, top: 10 }}><Icon type="close"/>
                </div>
              </div>
              <Card hoverable
                    bodyStyle={{ padding: 0 }}
                    style={{ width: '90%', margin: '5%' }}
                    cover={<img alt="example" src={item.example.url}
                                style={{ height: '180px' }} onClick={() => {
                      this.handleModalVisible1(true, item.example);
                    }}/>}/>
              <Card hoverable
                    bodyStyle={{ padding: 0 }}
                    style={{ width: '90%', margin: '5%' }}
                    cover={<img alt="example" src={item.realExample.url}
                                style={{ height: '180px' }} onClick={() => {
                      this.handleModalVisible1(true, item.realExample);
                    }}/>}/>
            </List.Item>
            <ImageSelector modalVisible={this.state.modalVisible} handleModalVisible={this.handleModalVisible}
                           handleSelectImage={this.handleSelectImage}/>
          </div>

        )}
      />

    );
  }
}

export default ProductImageList;
