import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import RegisterForm from '../RegisterForm';

import './LoginForm.css';

const LoginForm = ({ onFinish }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={(value) => onFinish(value.email)}
    >
      <Form.Item name="email">
        <Input
          prefix={<MailOutlined style={{ opacity: '.3' }} />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
              !form.getFieldsValue().email
            }
          >
            Войти
          </Button>
        )}
      </Form.Item>
      <RegisterForm />
    </Form>  )
};

export default LoginForm;
