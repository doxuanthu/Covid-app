import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState, memo } from "react";
import moment from "moment";
import { Col, Radio, Row } from "antd";

const generateChart = (data) => {
  const categories = data.map((item) => moment(item.Date).format("DD/MM/YYYY"));
  return {
    chart: {
      height: 500,
    },
    title: {
      text: "Tổng ca nhiễm",
    },
    xAxis: {
      categories,
      crosshair: true,
    },
    YAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    colors: ["#F3585B"],
    tooltip: {
      headerFormat: '<span style="font-size: 10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="padding: 0">{series.name}: </td>' +
        '<td style="padding: 0"><b>{point.y} ca </b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tổng ca nhiễm",
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

function LineChart({ data }) {
  const [options, setOptions] = useState(generateChart(data));
  const [reportType, setReportType] = useState("all");

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case "7":
        customData = data.splice(data.length - 7);
        break;
      case "30":
        customData = data.splice(data.length - 30);
        break;
      default:
        customData = data;
    }
    setOptions(generateChart(customData));
  }, [data, reportType]);
  return (
    <>
      <Row>
        <Col span={24}>
          <Radio.Group
            defaultValue="all"
            style={{ float: "right", margin: "24px 0 0" }}
          >
            <Radio.Button onClick={() => setReportType("all")} value="all">
              Tất cả
            </Radio.Button>
            <Radio.Button onClick={() => setReportType("30")} value="30">
              30 ngày
            </Radio.Button>
            <Radio.Button onClick={() => setReportType("7")} value="7">
              7 ngày
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Col>
      </Row>
    </>
  );
}

export default memo(LineChart);
