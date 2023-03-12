import RootNavigator from "./RootNavigator";
import {Provider} from "react-redux";
import {store} from "./store";

const App = () => {
    return (
        <Provider store={store}>
            <RootNavigator/>
        </Provider>
    );
}

export default App;
