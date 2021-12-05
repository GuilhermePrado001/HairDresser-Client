import { Select } from "antd";
import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardBody } from "reactstrap";
import { monthConvert } from "../../Helpers/ReportHelper";
import {
  GetMostUsedServices,
  GetProfit,
  GetSchedulesByMonth,
  GetMostPickedHours,
  GetYears,
} from "../../Models/Salon";

import "../Reports/Reports.scss";

const { Option } = Select;

const defaultChart = {
  labels: null,
  datasets: [
    {
      label: null,
      data: null,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Reports() {
  const [selectedChart, setSelectedChart] = useState();
  const [dataChart, setDataChart] = useState(defaultChart);
  const [showYears, setShowYears] = useState(false);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState();

  useEffect(() => {
    (async () => {
      const years = await GetYears();
      setAvailableYears(years.map((available) => available.year));
    })();
  }, []);

  useEffect(() => {
    if (!showYears) {
      setSelectedYear(null);
    }
  }, [showYears]);

  useEffect(() => {
    let isMounted = true;

    switch (selectedChart) {
      case "profit":
        (async () => {
          setShowYears(true);
          defaultChart.datasets[0].label = "Lucro R$";
          setDataChart(cloneDeep(defaultChart));

          if (selectedYear) {
            const data = await GetProfit(selectedYear);

            dataChart.datasets[0].label = "Lucro R$";

            if (data && isMounted) {
              dataChart.labels = data.map((item) => monthConvert(item?.month));
              dataChart.datasets[0].data = data.map((item) => item?.profit);

              setDataChart(cloneDeep(dataChart));
            }
          }
        })();
        break;
      case "hours":
        (async () => {
          setShowYears(false);
          const data = await GetMostPickedHours();

          dataChart.datasets[0].label =
            "Horário com maior numero de Agendamentos";

          if (data && isMounted) {
            dataChart.labels = data.map((item) => item?.HourInit);
            dataChart.datasets[0].data = data.map((item) => item?.qntd);

            setDataChart(cloneDeep(dataChart));
          }
        })();
        break;
      case "schedules":
        (async () => {
          setShowYears(true);
          defaultChart.datasets[0].label = "Meses com mais Agendamentos";
          setDataChart(cloneDeep(defaultChart));

          if (selectedYear) {
            const data = await GetSchedulesByMonth(selectedYear);
            dataChart.datasets[0].label = "Meses com mais Agendamentos";

            if (data && isMounted) {
              dataChart.labels = data.map((item) => monthConvert(item?.month));
              dataChart.datasets[0].data = data.map((item) => item?.schedules);

              console.log(dataChart);
              setDataChart(cloneDeep(dataChart));
            }
          }
        })();
        break;
      case "services":
        (async () => {
          setShowYears(false);
          const data = await GetMostUsedServices("2021");

          dataChart.datasets[0].label = "Serviços mais Agendados";

          if (data && isMounted) {
            dataChart.labels = data.map((item) => item?.name);
            dataChart.datasets[0].data = data.map((item) => item?.qntd);

            setDataChart(cloneDeep(dataChart));
          }
        })();
        break;
      default:
        break;
    }

    return () => {
      isMounted = false;
    };
  }, [selectedChart, selectedYear]);

  return (
    <div className="charts-container">
      <Card>
        <CardBody>
          <Select
            className="select-chart"
            placeholder="Selecione o tipo de gráfico"
            defaultActiveFirstOption={false}
            onSelect={(item) => setSelectedChart(item)}
          >
            <Option value="profit" key="profit">
              Lucro por Ano
            </Option>
            <Option value="hours" key="hours">
              Horarios mais agendados
            </Option>
            <Option value="schedules" key="schedules">
              Meses com mais agendamentos
            </Option>
            <Option value="services" key="services">
              Serviços mais solicitados
            </Option>
          </Select>

          {showYears && (
            <Select
              className="select-chart ml-4"
              placeholder="Ano"
              defaultActiveFirstOption={false}
              onSelect={(item) => setSelectedYear(item)}
            >
              {availableYears.map((year) => (
                <Option value={year} key="profit">
                  {year}
                </Option>
              ))}
            </Select>
          )}

          <div className="chart-content">
            {selectedChart && (
              <Bar
                data={dataChart}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Reports;
