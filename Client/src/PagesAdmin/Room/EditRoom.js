import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, message, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { roomServ } from "../../Services/roomService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";
export const EditRoom = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [checkBox, setCheckBox] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    roomServ.getDataRoom(id).then((res) => {
      let newData = [];

      for (const key in res.data.content) {
        const element = res.data.content[key];
        if (element === true) {
          newData.push(key);
        }
      }
      form.setFieldsValue({
        ...res.data.content,
      });
      setCheckBox(newData);
    });
  }, [id]);

  const [dataBox, setDataBox] = useState([
    "mayGiat",
    "tivi",
    "doXe",
    "hoBoi",
    "dieuHoa",
    "banLa",
    "banUi",
    "bep",
    "wifi",
  ]);
  const onFinishSign = (values) => {
    let newData = [];
    dataBox.forEach((item) => {
      newData[item] = true;
    });
    let dataSend = { ...values, ...newData };
    roomServ
      .editRoom(id, dataSend)
      .then((res) => {
        console.log(res.data.content);
        message.success("Update thành công");
        setTimeout(() => {
            navigate("/admin/room");
        }, 1500);
      })
      .catch((err) => {
        message.error("Thất bại xin kiểm tra lại");
        console.log(err);
      });
  };
  const onChange = (checkedValues) => {
    setDataBox(checkedValues);
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
        <Form.Item name="tenPhong" label="Tên phòng">
          <Input />
        </Form.Item>
        <Form.Item name="khach" label="Số khách">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="phongNgu" label="Số phòng ngủ">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="giuong" label="Số giường">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="phongTam" label="Phòng tắm">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="giaTien" label="Giá tiền 1 đêm">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="maViTri" label="Mã vị trí">
          <Input type={"number"} />
        </Form.Item>
        <Form.Item name="hinhAnh" label="Hình ảnh khách sạn (URL)">
          <Input />
        </Form.Item>
        <Form.Item name="moTa" label="Mô tả về phòng thuê">
          <Input.TextArea rows={4} />
        </Form.Item>
        {checkBox && (
          <Checkbox.Group
            defaultValue={checkBox}
            style={{
              width: "100%",
            }}
            onChange={onChange}
          >
            <Row>
              <Col span={8}>
                <Checkbox value="mayGiat">Máy giặt</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="banLa">Bàn là</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="banUi">Bàn ủi</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="tivi">Ti vi</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="dieuHoa">Điều hòa</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="bep">Bếp</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="doXe">Bãi đỗ xe</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="hoBoi">Hồ bơi</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="wifi">Wi fi</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        )}
        <Form.Item {...tailFormItemLayout}>
          <Button className="mt-5" type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return <>{renderSign()}</>;
};

export default EditRoom;
