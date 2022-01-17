import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import Contacts from "./pages/Contacts";
import EditContact from "./pages/EditContact";
import CreateContact from "./pages/CreateContact";
import { createBrowserHistory } from "history";
function App() {
  const hist = createBrowserHistory();
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Route exact path="/" element={<Contacts />} />
          <Route exact path="/create-contact" element={<CreateContact />} />
          <Route exact path="/edit-contact/:id" element={<EditContact />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
