import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/navbar'

import Dashboard from "./pages/dashboard/Dashboard";
import Twitch from './pages/twitch/Twitch';
import Posts from './pages/posts/Posts';


function App() {
  return (
    <Router>
      <Switch>
        <div>
          <Navbar name="Kraken"></Navbar>
          <Route exact path="/" component={Dashboard} />
          <Route path="/twitch" component={Twitch} />
          <Route path="/posts" component={Posts} />
        </div>
      </Switch>
    </Router>)
}

export default App;
