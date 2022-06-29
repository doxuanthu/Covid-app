import { useState, useEffect, useRef, memo } from "react";
import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";

highchartsMap(Highchart);

const initOptions = {
  chart: {
    height: 500,
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1, "	#7A0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Dan so",
      joinBy: ["hc-key", "key"],
    },
  ],
};

function HighMap({ mapData }) {
  const [options, setOptions] = useState({});
  const [configLoaded, setConfigLoaded] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const mockData = mapData.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));
      setOptions({
        ...initOptions,
        series: [
          {
            ...initOptions.series[0],
            mapData: mapData,
            data: mockData,
          },
        ],
      });
      if (!configLoaded) setConfigLoaded(true);
    }
  }, [mapData, configLoaded]);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      mapRef.current.chart.series[0].update({
        mapData: mapData,
      });
    }
  }, [mapData]);

  if (!configLoaded) return null;

  return (
    <HighchartsReact
      highcharts={Highchart}
      options={cloneDeep(options)}
      constructorType="mapChart"
      ref={mapRef}
    />
  );
}

export default memo(HighMap);
