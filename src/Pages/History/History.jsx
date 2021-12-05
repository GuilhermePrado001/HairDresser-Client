import "../History/History.scss";
import { useContext, useEffect, useState } from "react";
import { Table, Tag, Space, Card } from "antd";
import { getSchedulingByUserId } from "../../Models/Schedule";
import { UserContext } from "../../Context/UserContext";
import moment from "moment";
moment.locale("pt-br");

function History() {
  const { loggedUser } = useContext(UserContext);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const isMounted = true;

    (async () => {
      const data = await getSchedulingByUserId(loggedUser?.profile?.sub);
      console.log(data);
      if (isMounted) {
        setDataList(data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      defaultSortOrder: "ascend",
      sorter: (a, b) =>
        moment(a.data, "DD/MM/YYYY").unix() -
        moment(b.data, "DD/MM/YYYY").unix(),
    },
    {
      title: "Horário",
      dataIndex: "schedulingHour",
      key: "schedulingHour",
    },
    {
      title: "Tipo de Pagamento",
      dataIndex: "payment",
      key: " payment",
    },
    {
      title: "Tipo de Serviço",
      dataIndex: "serviceName",
      key: " serviceName",
    },
    {
      title: "Valor",
      dataIndex: "servicePrice",
      key: " servicePrice",
    },
  ];

  return (
    <div className="content">
      <Card className="card-content">
        <Table columns={columns} dataSource={dataList} pagination={false} />
      </Card>
    </div>
  );
}

export default History;
