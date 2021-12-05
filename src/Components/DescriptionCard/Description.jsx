import { useContext } from "react";
import { CardBody, Card } from "reactstrap";
import { SettingsContext } from "../../Context/SettingsContext";
import "../DescriptionCard/Description.scss";

const Description = () => {
  const { description } = useContext(SettingsContext);

  return (
    <Card>
      <CardBody className="description-text">{description}</CardBody>
    </Card>
  );
};

export default Description;
