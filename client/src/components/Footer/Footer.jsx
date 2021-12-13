import React from "react";
import { Layout } from 'antd';

import './Footer.css';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </AntFooter>
  );
};

export default Footer;
