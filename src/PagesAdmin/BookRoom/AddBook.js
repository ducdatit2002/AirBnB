import React, { useState } from "react";
import { Button, Form, Input, message, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
import { bookSer } from "../../Services/bookService";
import { setDataBooked } from "../../Redux/actions/actionsBooked";
const { RangePicker } = DatePicker;
export const AddBook = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [date, setDate] = useState([]);
  const onFinishSign = (values) => {
    if (!date[0]) {
      message.error("Kiểm tra lại thông tin còn thiếu");
      return;
    }
    let newData = { ...values, ngayDen: date[0], ngayDi: date[1] };
    bookSer
      .postBooking(newData)
      .then((res) => {
        console.log(res.data.content);
        dispatch(setDataBooked(res.data.content));
        message.success("Thêm mới thành công");
        setTimeout(() => {
          navigate("/admin/booked");
        }, 1500);
      })
      .catch((err) => {
        message.error("Thất bại xin kiểm tra lại");
        console.log(err);
      });
  };
  const onChange = (model, day) => {
    setDate(day);
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
          name="maPhong"
          label="Mã phòng"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="maNguoiDung"
          label="Mã người dùng"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="soKhach"
          label="Số khách"
          rules={[
            {
              required: true,
              message: "Không bỏ trống",
              whitespace: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Ngày"
        >
          <RangePicker className="mx-auto" onChange={onChange} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button className="mt-5" type="primary" htmlType="submit">
            Đăng Kí
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const [form] = Form.useForm();
  return <>{renderSign()}</>;
};

export default AddBook;
