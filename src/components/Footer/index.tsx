/*
 * @Description: 底部版权
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-11-01 08:55:11
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-01-08 10:14:13
 */
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons'
import { Divider, Row, Space, Typography } from 'antd'
import { FC } from 'react'

import BeianImage from '@/assets/gongan.png'
import IcpImage from '@/assets/icp.png'

const { Text } = Typography;

const Footer: FC = () => {
  return (
    <Space direction="vertical" size="small" style={{ display: 'flex', flexDirection: 'column', padding: '20px 0', alignItems: 'center' }}>
      <Row justify="center" align="middle">
        <Space size="small" align="center" wrap>
          <Text type="secondary">
            <CopyrightOutlined style={{ marginRight: 5 }} />
            Power by
          </Text>
          <a href="https://github.com/baiwumm" target="_blank">
            <Text type="secondary">
              <GithubOutlined style={{ marginRight: 5 }} />
              白雾茫茫丶
            </Text>
            </a>
        </Space>
        <Divider type="vertical" />

      </Row>
      <Row justify="center" align="middle">
        <a href="https://beian.miit.gov.cn/" target="_blank" title="鲁ICP备2024111948号">
          <img src={IcpImage} alt="" style={{ width: 16, marginRight: 5 }} />
          <Text type="secondary">鲁ICP备2024111948号</Text>
        </a>
        <Divider type="vertical" />
        <a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank" title="无">
          <img src={BeianImage} alt="无" style={{ width: 16, marginRight: 5 }} />
          <Text type="secondary"></Text>
        </a>
      </Row>
    </Space>
  )
}
export default Footer
