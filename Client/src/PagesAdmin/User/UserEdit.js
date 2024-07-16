import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { userServ } from "../../Services/userService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
export const UserEdit = () => {
  let { id } = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    userServ.getInfo(id).then((res) => {
      console.log(res);
      let { gender } = res.data.content;
      if (gender) {
        gender = "nam";
      } else {
        gender = "nu";
      }
      let newData = { ...res.data.content, gender: gender };
      form.setFieldsValue({
        ...newData,
      });
    });
  }, [id]);

  const onFinishSign = (values) => {
    values.gender == "nam" ? (values.gender = true) : (values.gender = false);
    userServ
      .editUser(id, values)
      .then((res) => {
        console.log(res.data.content);
        message.success("Cập nhật thành công");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        message.error("Cập nhật thất bại");
        console.log(err);
      });
  };

  const renderSign = () => {
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinishSign}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Không hợp lệ",
            },
            {
              required: true,
              message: "Xin nhập Email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="birthday"
          label="Ngày sinh"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"date"} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
            },
          ]}
          name="gender"
          label="Giới tính"
        >
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: "nam",
                label: "Nam",
              },
              {
                value: "nu",
                label: "Nữ",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
            },
          ]}
          name="role"
          label="Quản trị"
        >
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: "ADMIN",
                label: "ADMIN",
              },
              {
                value: "USER",
                label: "USER",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Full name"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
            },
          ]}
        >
          <Input
            type={"number"}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return <>{renderSign()}</>;
};

export default UserEdit;
