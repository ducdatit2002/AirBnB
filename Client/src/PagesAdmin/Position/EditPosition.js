import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
import { positionSer } from "../../Services/positionService";
import { setDataPosition } from "../../Redux/actions/actionPosition";
export const EditPosition = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { id } = useParams();
  const onFinishSign = (values) => {
    positionSer
      .editPosition(id, values)
      .then((res) => {
        console.log(res.data.content);
        dispatch(setDataPosition(res.data.content));
        message.success("Cập nhật thành công");
        setTimeout(() => {
          navigate("/admin/position");
        }, 1500);
      })
      .catch((err) => {
        message.error("Thất bại xin kiểm tra lại");
        console.log(err);
      });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    positionSer
      .getDataFromId(id)
      .then((res) => {
        form.setFieldsValue({
          ...res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
          name="tenViTri"
          label="Tên vị trí"
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
          name="tinhThanh"
          label="Tên chi tiết tỉnh thành"
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
          name="quocGia"
          label="Tên quốc gia"
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
          name="hinhAnh"
          label="Hình ảnh khách sạn (URL)"
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
        <Form.Item {...tailFormItemLayout}>
          <Button className="mt-5" type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return <>{renderSign()}</>;
};

export default EditPosition;
