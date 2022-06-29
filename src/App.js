import { sortBy } from "lodash";
import { useEffect, useState } from "react";
import { getAllContries, getReportByCountry } from "./api";
import { Typography } from "antd";
import moment from "moment";
import "moment/locale/vi";

import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";

moment.locale("vi");
function App() {
  const [countries, setCountries] = useState([]);
  const [countrySelectedSlug, setCountrySelectedSlug] = useState("");
  const [countrySelectedId, setCountrySelectedId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getAllContries().then((country) => {
      const countries = sortBy(country.data, "Country");
      setCountries(countries);

      setCountrySelectedSlug("vietnam");
    });
  }, []);

  const handleCountryChange = (Slug) => {
    setCountrySelectedSlug(Slug);
  };

  useEffect(() => {
    countrySelectedSlug &&
      getReportByCountry(countrySelectedSlug).then((report) => {
        report.data.pop();
        setReport(report.data);

        let country = countries.find(
          (country) => country.Slug === countrySelectedSlug
        );
        setCountrySelectedId(country.ISO2.toLowerCase());
      });
  }, [countrySelectedSlug, countries]);

  return (
    <div className="app-container">
      <Typography.Title style={{ marginBottom: 0 }}>
        Số Liệu Covid-19
      </Typography.Title>
      <Typography.Paragraph style={{ margin: "0 0 12px" }}>
        <i>{moment().format("LLL")}</i>
      </Typography.Paragraph>
      <CountrySelector
        countries={countries}
        handleCountryChange={handleCountryChange}
        value={countrySelectedSlug}
      />
      <Summary report={report} />
      <HighLight report={report} countrySelectedId={countrySelectedId} />
    </div>
  );
}

export default App;
