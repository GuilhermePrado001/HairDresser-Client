import { Select, Typography } from "antd";
import { useContext, useState, useEffect } from "react";
import { SchedulingContext } from "../../Context/SchedulingContext";
import { GetAllServices } from "../../Models/Services";

const { Option } = Select;

const FirstStep = () => {
  const { scheduling, setScheduling } = useContext(SchedulingContext);
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    (async () => {
      var result = await GetAllServices();

      setServiceList(result.filter((item) => !item.isDeleted));
    })();
  }, []);

  const sexoHandler = (e) => {
    scheduling.sexo = e;
    setScheduling(scheduling);
  };

  const serviceHandler = (e) => {
    scheduling.services = e;
    setScheduling(scheduling);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <Typography.Title level={4} strong>
            Sexo
          </Typography.Title>
          <Select
            style={{ width: 130 }}
            defaultValue={scheduling.sexo}
            onChange={sexoHandler}
          >
            <Option value="feminino">Feminino</Option>
            <Option value="masculino">Masculino</Option>
          </Select>
        </div>
        <div className="col-md-6">
          <Typography.Title level={4} strong>
            Tipo de Serviço
          </Typography.Title>
          <Select
            style={{ width: "80%" }}
            mode="multiple"
            placeholder="Escolha os serviços desejados"
            onChange={serviceHandler}
            defaultValue={scheduling.services}
          >
            {serviceList.map((e) => {
              return (
                <Option key={e.id} value={e.id}>
                  {e.name}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
    </>
  );
};

export default FirstStep;
