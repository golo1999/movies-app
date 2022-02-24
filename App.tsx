// Standard packages
import React from "react";
import { Provider } from "react-redux";

// Redux store
import { store } from "./store";

// Navigation
import MyStackNavigator from "./routes/myStackNavigator";

// Models
import { User } from "./models/User";

const App = () => {
  return (
    <Provider store={store}>
      <MyStackNavigator />
    </Provider>
  );
};

export default App;
