import { DatePicker, Empty, Table, Typography } from "antd";
import "moment/locale/pt-br";
import locale from "antd/es/date-picker/locale/pt_BR";
import moment from "moment";
import { useContext, useState } from "react";
import { SchedulingContext } from "../../Context/SchedulingContext";
import { AvailableHours } from "../../Models/Schedule";
const columns = [
  {
    title: "Horarios Disponiveis",
    dataIndex: "scheduling",
    width: 150,
  },
];

const SecondStep = () => {
  const { scheduling, setScheduling } = useContext(SchedulingContext);
  const [timeList, setTimeList] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      scheduling.selectedTime = selectedRows[0].scheduling;
      setScheduling(scheduling);
    },
  };

  const handlerDate = async (e) => {
    scheduling.date = moment(e).format("MM/DD/YYYY");
    const data = await AvailableHours(scheduling);
    const enableTimeList = [];

    data.forEach((hour, i) => {
      enableTimeList.push({
        key: i,
        scheduling: moment(hour, "hh:mm").format("HH:mm"),
      });
    });

    setScheduling(scheduling);
    setTimeList(enableTimeList);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Typography.Title level={4} strong>
            Escolha uma data
          </Typography.Title>
          <DatePicker
            locale={locale}
            format="DD-MM-YYYY"
            onChange={handlerDate}
            disabledDate={(current) => {
              return moment().add(-1, "days") >= current;
            }}
          />
        </div>
        <div className="col-md-5 col-sm-12 mt-4">
          <Table
            locale={locale}
            columns={columns}
            dataSource={timeList}
            scroll={{ y: 240 }}
            pagination={false}
            rowSelection={{
              type: "radio",
              ...rowSelection,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SecondStep;
