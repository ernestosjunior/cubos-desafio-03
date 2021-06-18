import { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";

import "./menu.css";

import { ReactComponent as Store } from "../../assets/store.svg";
import { ReactComponent as StoreSelecionado } from "../../assets/store-selected.svg";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as UserSelecionado } from "../../assets/user-selected.svg";
import { ReactComponent as Close } from "../../assets/close.svg";

import { TokenContexto } from "../../App";

const Menu = () => {
  const { removeToken, removeUsuarioStorage } = useContext(TokenContexto);

  const history = useHistory();

  function handleClose() {
    removeToken("token");
    removeUsuarioStorage("usuario");
    history.push("/");
  }

  const path = window.location.pathname;

  return (
    <div className="Menu">
      <NavLink to="/produtos">
        {path.includes("/produtos") ? <StoreSelecionado /> : <Store />}
      </NavLink>
      <NavLink to="/perfil">
        {path.includes("/perfil") ? <UserSelecionado /> : <User />}
      </NavLink>
      <Close width="33" onClick={() => handleClose()} />
    </div>
  );
};

export default Menu;
