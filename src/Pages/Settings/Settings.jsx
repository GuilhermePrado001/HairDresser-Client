import "../Settings/Settings.scss";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Switch, Typography, Input, TimePicker, Button } from "antd";
import { SettingsContext } from "../../Context/SettingsContext";
import moment from "moment";
import UserModal from "../../Components/Modals/UserModal/UserModal";
import ProductModal from "../../Components/Modals/ProductModal/ProductModal";
import { UpdateDescription } from "../../Models/SalonDetails";
import { hoursToTicks } from "../../Helpers/CommonFunctions";
import { UpdateWorkTime } from "../../Models/WorkTime";
import ServicesModal from "../../Components/Modals/ServicesModal/ServicesModal";

const { TextArea } = Input;
const { RangePicker } = TimePicker;

function Settings() {
  const {
    description,
    setDescription,
    setWorkTimeInit,
    workTimeInit,
    setWorkTimeEnd,
    workTimeEnd,
    storedSettings,
  } = useContext(SettingsContext);

  const [userModalVisibility, setUserModalVisibility] = useState(false);
  const [productModalVisibility, setProductModalVisibility] = useState(false);
  const [serviceModalVisibility, setServiceModalVisibility] = useState(false);

  useEffect(() => {
    moment.locale("pt-br");
  }, []);

  const onTextChange = async (e) => {
    setDescription(e.target.value);

    await UpdateDescription({
      Id: storedSettings?.salonDetailId,
      Text: e.target.value,
      SettingsId: storedSettings?.id,
    });
  };

  const onChangeWorkTime = (e) => {
    (async () => {
      setWorkTimeInit(e[0]);
      setWorkTimeEnd(e[1]);
      const detailData = storedSettings.workTime;
      detailData.init = moment(e[0]).format("HH:mm");
      detailData.end = moment(e[1]).format("HH:mm");
      await UpdateWorkTime(detailData);
    })();
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Configurações</CardTitle>
          <div className="row">
            <div className="col-md-4">
              <Card>
                <CardBody className="config-card">
                  <Typography.Title level={4} strong>
                    Loja
                  </Typography.Title>
                  <Typography.Paragraph className="mt-4" level={4} strong>
                    Gerenciar Loja
                  </Typography.Paragraph>
                  <Button
                    type="primary"
                    onClick={() => setProductModalVisibility(true)}
                  >
                    Gerenciar Produtos
                  </Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardBody className="config-card">
                  <Typography.Title level={4} strong>
                    Descrição do Salão
                  </Typography.Title>
                  <TextArea
                    value={description}
                    autoSize={{ maxRows: 4, minRows: 4 }}
                    maxLength={200}
                    showCount
                    onChange={(e) => onTextChange(e)}
                    placeholder="Escreva sobre seu salão"
                  />
                </CardBody>
              </Card>
            </div>
            <div className="col-md-4">
              <Card>
                <CardBody className="config-card">
                  <Typography.Title level={4} strong>
                    Horários
                  </Typography.Title>
                  <div className="row">
                    <div className="col-md-12">
                      <Typography.Paragraph level={4} strong>
                        Funcionamento
                      </Typography.Paragraph>
                      <RangePicker
                        allowClear={false}
                        value={[workTimeInit, workTimeEnd]}
                        rangePlaceholder={["Inicio", "Fim"]}
                        format="HH:mm"
                        minuteStep={10}
                        onChange={(e) => {
                          if (!e) return;
                          onChangeWorkTime(e);
                        }}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="col-md-4 mt-4">
              <Card>
                <CardBody className="config-card">
                  <Typography.Title level={4} strong>
                    Usúarios
                  </Typography.Title>
                  <Button
                    type="primary"
                    onClick={() => setUserModalVisibility(!userModalVisibility)}
                  >
                    Gerenciar Usúarios
                  </Button>
                </CardBody>
              </Card>
            </div>

            <div className="col-md-4 mt-4">
              <Card>
                <CardBody className="config-card">
                  <Typography.Title level={4} strong>
                    Serviços Prestados
                  </Typography.Title>
                  <Button
                    type="primary"
                    onClick={() =>
                      setServiceModalVisibility(!serviceModalVisibility)
                    }
                  >
                    Gerenciar Serviços
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </CardBody>
      </Card>
      <UserModal
        isVisible={userModalVisibility}
        setIsVisible={setUserModalVisibility}
      />
      <ProductModal
        isVisible={productModalVisibility}
        setIsVisible={setProductModalVisibility}
      />
      <ServicesModal
        isVisible={serviceModalVisibility}
        setIsVisible={setServiceModalVisibility}
      />
    </>
  );
}

export default Settings;
