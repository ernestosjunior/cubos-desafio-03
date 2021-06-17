import "./menu.css";

import { useHistory, NavLink } from "react-router-dom";
import { useContext } from "react";

import { TokenContexto } from "../../App";

import { ReactComponent as Store } from "../../assets/store.svg";
import { ReactComponent as StoreSelecionado } from "../../assets/store-selected.svg";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as UserSelecionado } from "../../assets/user-selected.svg";
import { ReactComponent as Close } from "../../assets/close.svg";

const Menu = () => {
  const { removeToken } = useContext(TokenContexto);

  const history = useHistory();

  function handleClose() {
    removeToken("token");
    history.push("/login");
  }

  const path = window.location.pathname;

  return (
    <div className="Menu">
      <NavLink to="/">
        {path === "/" || path === "/cadastrar-produto" ? (
          <StoreSelecionado />
        ) : (
          <Store />
        )}
      </NavLink>
      <NavLink to="/perfil">
        {path === "/perfil" || path === "/atualizar-perfil" ? (
          <UserSelecionado />
        ) : (
          <User />
        )}
      </NavLink>
      <Close width="33" onClick={() => handleClose()} />
    </div>
  );
};

export default Menu;
