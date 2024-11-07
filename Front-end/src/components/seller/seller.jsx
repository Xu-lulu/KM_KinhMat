import {
  UploadOutlined,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Upload, Checkbox, Form, Input, Steps } from "antd";
import { useState } from "react";

const Seller = () => {
  const [img, setImg] = useState([]);
  const [nameOwner, setNameowner] = useState([]);
  const [nameStore, setNamestore] = useState([]);
  const [addressStore, setAdressstore] = useState([]);
  const [phoneStore, setPhonestore] = useState([]);
  const [payStore, setPaystore] = useState([]);
  const [agreement, setAgreement] = useState(false);
  const handleSubmit = () => {
    console.log("age", agreement);
    if (!agreement) {
      console.log("vui lòng đồng ý với các điều khoản của trang web!");
      return;
    }
    console.log("gửi thành công");
  };

  return (
    <>
      {/* <Steps className="Step"
        items={[
          {
            title: "Login",
            status: "finish",
            icon: <UserOutlined />,
          },
          {
            title: "Verification",
            status: "finish",
            icon: <SolutionOutlined />,
          },
          {
            title: "Pay",
            status: "process",
            icon: <LoadingOutlined />,
          },
          {
            title: "Done",
            status: "wait",
            icon: <SmileOutlined />,
          },
        ]}
      /> */}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 900,
          width: "100%",
          alignItems: "center",
          margin: "9%",
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 style={{ paddingBottom: "5%" }}>Đăng ký quyền bán hàng</h1>
        {/* <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
        </Upload> */}
        <Form.Item
          label="Tên chủ cửa hàng"
          name="userowner"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setNameowner(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Tên cửa hàng"
          name="namestore"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setNamestore(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ cửa hàng"
          name="addressstore"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setAdressstore(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Số điện thoại cửa hàng"
          name="phonestore"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setPhonestore(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Phương thức thanh toán"
          name="paystore"
          rules={[
            {
              required: true,
              message: "Vui lòng điền đẩy thông tin!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setPaystore(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      "Vui lòng đọc điều khoản và đồng ý với mọi điều khoản!"
                    ),
            },
          ]}
        >
          <Checkbox
            checked={!agreement}
            onChange={(e) => {
              setAgreement(e.target.checked);
            }}
          >
            Tôi đồng ý rằng tôi đã trên 18 tuổi và đồng ý với các điều khoản và
            điều kiện của trang web.
          </Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Seller;
