import { useEffect, useState } from "react";
import { Row, Col, Select } from "antd";
import { getAllContries } from "../../api";

function CountrySelector() {
  const [countries, setCountries] = useState([]);
  //   const [initCountry, setInitCountry] = useState({});

  useEffect(() => {
    getAllContries().then((country) => {
      setCountries(country.data);
    });
  }, []);

  const handleCountryChange = (e) => {
    console.log(e);
  };

  return (
    <Row>
      <Col span={24}>
        <Select
          style={{
            minWidth: 200,
          }}
          onChange={handleCountryChange}
        >
          {countries &&
            countries.length &&
            countries.map((country) => (
              <Select.Option key={country.Slug}>
                {country.Country}
              </Select.Option>
            ))}
        </Select>
      </Col>
    </Row>
  );
}

export default CountrySelector;
