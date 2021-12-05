import "../Header/Header.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";

function Header() {
  const { hasRole, loggedUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>
          <Link to="/">HairCut</Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                {hasRole("User") && <Link to="/agendamentos">Agendamento</Link>}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                {hasRole("User") && <Link to="/historico">Historico</Link>}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                {hasRole("Admin") && <Link to="/relatorios">Relatorios</Link>}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                {hasRole("Admin") && <Link to="/config">Configurações</Link>}
              </NavLink>
            </NavItem>
          </Nav>
          <div className="login-logout">
            {!!loggedUser ? (
              <Link to="/logout">Sair</Link>
            ) : (
              <Link to="/signin-oidc">Entrar</Link>
            )}
          </div>
        </Collapse>
      </Navbar>
    </>
  );
}

export default Header;
