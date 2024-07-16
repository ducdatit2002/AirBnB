import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { bookSer } from "../../Services/bookService";
import { setDataBooked } from "../../Redux/actions/actionsBooked";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
export const EditBooked = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [defaultDate, setDefaultDate] = useState(null);
  const [date, setDate] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    bookSer
      .getBookedFromId(id)
      .then((res) => {
        let { ngayDen, ngayDi } = res.data.content;
        setDefaultDate([dayjs(ngayDen), dayjs(ngayDi)]);
        form.setFieldsValue({
          ...res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onFinishSign = (values) => {
    if (!date[0]) {
      message.error("Kiểm tra lại thông tin còn thiếu");
      return;
    }
    let newData = { ...values, ngayDen: date[0], ngayDi: date[1] };
    bookSer
      .editBooked(id, newData)
      .then((res) => {
        dispatch(setDataBooked(res.data.content));
        message.success("Cập nhật thành công");
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
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="soLuongKhach"
          label="Số khách"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item label="Ngày đã chọn">
          {defaultDate && <RangePicker disabled defaultValue={defaultDate} />}
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Chọn lại"
        >
          {defaultDate && <RangePicker onChange={onChange} />}
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

export default EditBooked;
