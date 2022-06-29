import { Row, Col, Select, Form, Typography } from "antd";

function CountrySelector({ countries, handleCountryChange, value }) {
  return (
    <Row>
      <Col span={24}>
        <Form layout="vertical" colon={false} style={{ maxWidth: 500 }}>
          <Form.Item label="Quốc Gia">
            <Select style={{}} value={value} onChange={handleCountryChange}>
              {countries &&
                countries.length &&
                countries.map((country) => (
                  <Select.Option key={country.Slug} value={country.Slug}>
                    {country.Country}
                  </Select.Option>
                ))}
            </Select>
            <Typography.Paragraph type="secondary">
              Lựa chọn một quốc gia
            </Typography.Paragraph>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default CountrySelector;
