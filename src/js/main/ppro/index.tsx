import PproApp from "./app";
import { Provider } from "react-redux";
import { store } from "./store";
import { SubscribeWatchFolder } from "./hooks/useWatchFolder";

const Ppro = () => {
  return (
    <Provider store={store}>
      <SubscribeWatchFolder />
      <PproApp />;
    </Provider>
  );
};

export default Ppro;
