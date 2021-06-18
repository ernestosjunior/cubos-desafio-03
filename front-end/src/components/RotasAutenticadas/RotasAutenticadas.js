import { Route, Redirect } from "react-router-dom";

const RotasAutenticadas = (props) => {
  return (
    <Route
      render={() => (props.token ? props.children : <Redirect to="/" />)}
    />
  );
};

export default RotasAutenticadas;
