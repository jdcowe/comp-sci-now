import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Header, Button, Icon } from "semantic-ui-react";
import HomePage from "./components/HomePage";
import AudioPlayer from "./components/AudioPlayer";
import ShowNotes from "./components/ShowNotes";
import axios from "axios";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/player" component={AudioPlayer} />
        <Route path="/shownotes" component={ShowNotes} />
      </Router>
    );
  }
}

export default App;
