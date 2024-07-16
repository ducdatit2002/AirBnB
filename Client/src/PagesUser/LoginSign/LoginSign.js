import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  notification,
} from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux/actions/actionUser";
import { userServ } from "../../Services/userService";
import { tailFormItemLayout, formItemLayout } from "../../Utilities/FormLayout";
const openNotification = (desc) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Close
    </Button>
  );
  notification.open({
    message: "Tài khoản của bạn",
    description: desc,
    btn,
    key,
    duration: 60,
  });
};
export const LoginSign = ({ isLogin }) => {
  let dispatch = useDispatch();
  const onFinishLogin = (values) => {
    let onSuccess = () => {
      message.success("Đăng nhập thành công");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    };
    let onFailed = () => {
      message.error("Đăng nhập thất bại");
    };
    dispatch(setLogin(values, onSuccess, onFailed));
  };
  const onFinishSign = (values) => {
    values.gender == "nam" ? (values.gender = true) : (values.gender = false);

    userServ
      .postSign(values)
      .then((res) => {
        console.log(res.data.content);
        message.success("Đăng kí thành công");
        openNotification(
          `Email : ${values.email} / Password: ${values.password}`
        );
      })
      .catch((err) => {
        message.error("Đăng kí thất bại, email đã tồn tại hoặc lỗi kết nối");
        console.log(err);
      });
  };

  const renderLogin = () => {
    return (
      <Form
        className="w-full"
        layout="vertical"
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinishLogin}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
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
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Hãy nhập pass",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Xin nhập lại pass",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Pass nhập lại không giống"));
              },
            }),
          ]}
        >
          <Input.Password />
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

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Xin chấp nhận điều khoản")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            Tôi đã đọc và <a href="">chấp nhận các điều khoản</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Đăng Kí
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const [form] = Form.useForm();
  return <>{isLogin ? renderLogin() : renderSign()}</>;
};

export default LoginSign;
