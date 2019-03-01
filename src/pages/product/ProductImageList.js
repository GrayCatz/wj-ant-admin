import React, { Component } from 'react';
import { Card, Icon, List } from 'antd';
import DescriptionList from '@/components/DescriptionList';

class ProductImageList extends Component {

  state = {};

  componentDidMount() {
  }

  render() {
    const { profile = {}, loading } = this.props;
    const data = [
      {
        title: 'Title 1',
      },
      {
        title: 'Title 2',
      },
      {
        title: 'Title 3',
      },
      {
        title: 'Title 4',
      },
    ];
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item
            style={{ border: '1px solid #ccc', textAlign: 'center', padding: '20px', position: 'relative' }}>
            <div>
              <span>管体正面</span>
              <div style={{ cursor: 'pointer', position: 'absolute', right: 15, top: 10 }}><Icon type="close"/>
              </div>
            </div>
            <Card hoverable
                  bodyStyle={{ padding: 0 }}
                  style={{ width: '90%', margin: '5%' }}
                  cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                              style={{ height: '180px' }}/>}/>
            <Card hoverable
                  bodyStyle={{ padding: 0 }}
                  style={{ width: '90%', margin: '5%' }}
                  cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                              style={{ height: '180px' }}/>}/>
          </List.Item>
        )}
      />

    );
  }
}

export default ProductImageList;
