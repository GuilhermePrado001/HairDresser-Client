import { Steps, Button, message, Typography } from "antd";
import { useEffect, useState } from "react/cjs/react.development";
import { Card, CardBody } from "reactstrap";
import "./Scheduling.scss";
import FirstStep from "../../Components/FirstStep/FirstStep";
import SecondStep from "../../Components/SecondStep/SecondStep";
import ThirdStep from "../../Components/ThirdStep/ThirdStep";
import { SchedulingContext } from "../../Context/SchedulingContext";
import { useContext } from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { UserContext } from "../../Context/UserContext";
import { saveScheduling } from "../../Models/Schedule";

const { Step } = Steps;

const steps = [
  {
    title: "Serviços",
    content: <FirstStep />,
  },
  {
    title: "Datas",
    content: <SecondStep />,
  },
  {
    title: "Pagamento",
    content: <ThirdStep />,
  },
];

const Scheduling = () => {
  const { scheduling, setScheduling } = useContext(SchedulingContext);
  const { loggedUser } = useContext(UserContext);
  const [current, setCurrent] = useState(-1);

  const next = async () => {
    switch (current) {
      case -1:
        setCurrent(current + 1);

        //Reset context
        setScheduling({
          sexo: "Feminino",
          services: [],
          date: undefined,
          selectedTime: undefined,
          paymentType: 1,
        });

        break;
      case 0:
        //Validate first step
        if (scheduling.services.length > 0) {
          setCurrent(current + 1);
        } else {
          message.warning("Escolha pelo menos um tipo de serviço");
        }
        break;
      case 1:
        //Validate step two
        if (scheduling.date && scheduling.selectedTime) {
          setCurrent(current + 1);
        } else if (!scheduling.date) {
          message.warning("Escolha uma data");
        } else if (!scheduling.selectedTime) {
          message.warning("Escolha um horario");
        }
        break;
      case 2:
        setCurrent(current + 1);
        scheduling.userId = loggedUser.profile.sub;
        await saveScheduling(scheduling);
        break;
      default:
        break;
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return current !== -1 && current !== 3 ? (
    <div className="col-md-12">
      <Card>
        <CardBody className="card-step">
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Avançar
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => {
                  next();
                  message.success("Agendamento Realizado com Sucesso!");
                }}
              >
                Concluir
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Voltar
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  ) : current === 3 ? (
    <Card>
      <CardBody className="card-step start">
        <div class="start-scheduling d-flex justify-content-center">
          <Typography.Title level={2}>
            Agendamento realizado com sucesso!
          </Typography.Title>
          <Typography.Paragraph>
            Você pode acompanhar seu agendamento no menu "Meu Historico".
          </Typography.Paragraph>
          <div className="teste">
            <CheckCircleTwoTone
              style={{ fontSize: "100px" }}
              twoToneColor="#52c41a"
            />
          </div>
          <Button
            className="novo-agendamento"
            type="primary"
            onClick={() => setCurrent(-1)}
          >
            Novo agendamento
          </Button>
        </div>
      </CardBody>
    </Card>
  ) : (
    <Card>
      <CardBody className="card-step start">
        <div class="start-scheduling d-flex justify-content-center">
          <Typography.Paragraph strong={true}>
            Para iniciar o wizard de agendamento click no botão "Iniciar"
          </Typography.Paragraph>
          <Button onClick={() => next()} size="large" type="primary">
            Iniciar
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Scheduling;
