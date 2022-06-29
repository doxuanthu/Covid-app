import { useState, useEffect } from "react";
import LineChart from "../Chart/LineChart";
import { Row, Col } from "antd";
import HighMap from "../Chart/HighMap";

function HighLight({ report, countrySelectedId }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (countrySelectedId) {
      import(
        `@highcharts/map-collection/countries/${countrySelectedId}/${countrySelectedId}-all.geo.json`
      ).then((data) => setMapData(data));
    }
  }, [countrySelectedId]);
  return (
    <Row>
      <Col sm={16} xs={24}>
        <LineChart data={report} />
      </Col>
      <Col sm={8} xs={24}>
        <HighMap mapData={mapData} />
      </Col>
    </Row>
  );
}

export default HighLight;
