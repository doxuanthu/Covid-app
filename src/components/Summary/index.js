import { Row, Col, Card } from "antd";
import { useEffect, useState } from "react";
import Countup from "react-countup";

function Summary({ report }) {
  const [infoRender, setInfoRender] = useState([]);
  useEffect(() => {
    const currentDayReport = report[report.length - 1];
    const infoRender = [
      {
        title: "Số Ca Nhiễm",
        count: currentDayReport && currentDayReport.Confirmed,
        type: "confirmed",
      },
      {
        title: "Số Ca Khỏi",
        count: currentDayReport && currentDayReport.Active,
        type: "recovered",
      },
      {
        title: "Số Ca Tử Vong",
        count: currentDayReport && currentDayReport.Deaths,
        type: "deaths",
      },
    ];

    setInfoRender(infoRender);
  }, [report]);
  return (
    <Row>
      {infoRender &&
        infoRender.length &&
        infoRender.map((info) => (
          <Col sm={8} xs={24} key={info.title}>
            <Card
              style={
                info.type === "confirmed"
                  ? { borderLeft: "4px solid red" }
                  : info.type === "recovered"
                  ? { borderLeft: "4px solid green" }
                  : { borderLeft: "4px solid gray" }
              }
              title={info.title}
              bordered={true}
            >
              <strong>
                <Countup end={info.count} duration={2} separator=" " />
              </strong>
            </Card>
          </Col>
        ))}
    </Row>
  );
}

export default Summary;
