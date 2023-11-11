import PproApp from "./app";
import { Provider } from "react-redux";
import { store } from "./store";

const Ppro = () => {
  return (
    <Provider store={store}>
      <PproApp />;
    </Provider>
  );
};

export default Ppro;
