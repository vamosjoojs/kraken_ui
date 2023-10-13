import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/navbar'

import Dashboard from "./pages/dashboard/Dashboard";
import Twitch from './pages/twitch/Twitch';
import Posts from './pages/posts/Posts';
import Background from './assets/1553875.png';
import Login from './pages/login/Login';
import { useState } from 'react';
import Parameters from './pages/parameters/Parameters';
import Youtube from './pages/youtube/Youtube';
import Schedules from './pages/schedules/schedules';
import Bots from './pages/bots/bots';
import YoutubeClips from './pages/youtubeClips/YoutubeClips';


function App() {
  const myStyle = {
    backgroundImage: `url(${Background})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
  };

  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return (
      <Router>
        <Switch>
          <div>
            <Login setToken={setToken} />
            <Route exact path="/terms" render={() => { window.location.href = "terms.html" }} />
          </div>
        </Switch>
      </Router>
    )
  }

  return (
    <Router>
      <Switch>
        <div style={myStyle}>
          <Navbar name="Kraken"></Navbar>
          <Route exact path="/" component={Dashboard} />
          <Route path="/twitch" component={Twitch} />
          <Route path="/posts" component={Posts} />
          <Route path="/youtube" component={Youtube} />
          <Route path="/youtube-clips" component={YoutubeClips} />
          <Route path="/schedules" component={Schedules} />
          <Route path="/bots" component={Bots} />
          <Route path="/parameters" component={Parameters} />
          <Route exact path="/terms" render={() => { window.location.href = "terms.html" }} />
        </div>
      </Switch>
    </Router>)
}

export default App;
