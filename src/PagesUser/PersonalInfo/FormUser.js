import { Button, Form, Input, Select, message } from "antd";
import React from "react";
import { userServ } from "../../Services/userService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
const FormUser = ({ dataUser }) => {
  let { id } = dataUser;
  const onFinish = (values) => {
    let newData = { ...values, id };
    userServ
      .editUser(id, newData)
      .then(() => {})
      .then((res) => {
        message.success("Dữ liệu của bạn đã được cập nhật");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        message.error("Máy chủ đang bảo trì, hãy quay lại sau");
        console.log(err);
      });
  };
  const [form] = Form.useForm();
  id &&
    form.setFieldsValue({
      ...dataUser,
    });

  return (
    <div className="p-9">
      {" "}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        {" "}
        <Form.Item
          name="name"
          label="Full name"
          rules={[
            {
              required: true,
              message: "Không để trống",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="E-mail">
          <Input disabled />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item name="birthday" label="Ngày sinh">
          <Input
            type={"date"}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item name="gender" label="Giới tính">
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: true,
                label: "Nam",
              },
              {
                value: false,
                label: "Nữ",
              },
            ]}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>{" "}
    </div>
  );
};

export default FormUser;
