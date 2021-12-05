import { Radio, Input, Typography } from "antd";
import { useContext, useState } from "react";
import { SchedulingContext } from "../../Context/SchedulingContext";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
  textAlign: "initial",
};

const ThirdStep = () => {
  const { scheduling, setScheduling } = useContext(SchedulingContext);

  const onChange = (e) => {
    scheduling.paymentType = e.target.value;
    setScheduling(scheduling);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <Typography.Title level={4} strong>
            Forma de Pagemento
          </Typography.Title>
          <Radio.Group
            onChange={onChange}
            defaultValue={scheduling.paymentType}
          >
            <Radio style={radioStyle} value={1}>
              Pagar no local
            </Radio>
            <Radio style={radioStyle} value={2} disabled>
              Cartão
            </Radio>
            <Radio style={radioStyle} value={3} disabled>
              Boleto
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </>
  );
};

export default ThirdStep;
