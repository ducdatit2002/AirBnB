import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  let navigate = useNavigate();
  return (
    <div>
      {" "}
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button onClick={() => { navigate("/") }} type="primary">Back Home</Button>}
      />
    </div>
  );
}
