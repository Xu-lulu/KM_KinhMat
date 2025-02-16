import React, { useState } from "react";
import { Form, Select, Row, Col } from "antd";

const { Option } = Select;

const AddressForm = ({ provinces, districts, wards }) => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    const newDistricts = districts.filter((d) => d.provinceCode === value);
    setFilteredDistricts(newDistricts);
    setFilteredWards([]); // Reset wards khi chọn tỉnh mới
  };

  const handleDistrictChange = (value) => {
    const newWards = wards.filter((w) => w.districtCode === value);
    setFilteredWards(newWards);
  };

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        {/* Chọn Tỉnh/Thành phố */}
        <Col span={8}>
          <Form.Item
            label="Tỉnh/Thành phố"
            name="province"
            rules={[{ required: true, message: "Chọn tỉnh/thành phố!" }]}
          >
            <Select
              placeholder="Chọn tỉnh/thành phố"
              onChange={handleProvinceChange}
            >
              {provinces.map((city) => (
                <Option key={city.code} value={city.code}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Chọn Quận/Huyện */}
        <Col span={8}>
          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[{ required: true, message: "Chọn quận/huyện!" }]}
          >
            <Select
              placeholder="Chọn quận/huyện"
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
            >
              {filteredDistricts.map((district) => (
                <Option key={district.code} value={district.code}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Chọn Xã/Phường */}
        <Col span={8}>
          <Form.Item
            label="Xã/Phường"
            name="ward"
            rules={[{ required: true, message: "Chọn xã/phường!" }]}
          >
            <Select
              placeholder="Chọn xã/phường"
              disabled={filteredWards.length === 0}
            >
              {filteredWards.map((ward) => (
                <Option key={ward.code} value={ward.code}>
                  {ward.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddressForm;
