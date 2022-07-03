import { store } from "./features/store";
import { Provider } from "react-redux";
import AppContainer from "./app/AppContainer";
export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
