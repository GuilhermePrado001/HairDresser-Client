import { Card, CardBody } from "reactstrap";
import Description from "../../Components/DescriptionCard/Description";
import ProductsList from "../../Components/ProductList/ProductList";
import logo from "../../Assets/img/logo.jpg";

import "../Home/Home.scss";

function Home() {
  return (
    <>
      <div className="row mb-2 ">
        <div className="col-md-12">
          <Card>
            <CardBody className="logo-img">
              <img alt="logotipo" height="300" src={logo} />
            </CardBody>
          </Card>
        </div>
      </div>

      <Description />
      <ProductsList />
    </>
  );
}

export default Home;
