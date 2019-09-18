import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Button,
  Icon,
  Responsive,
  Visibility,
  Segment,
  Menu
} from "semantic-ui-react";

import "./HomePage.css";

const HomepageHeading = () => (
  <Container text>
    <h1
      className="typewriter"
      inverted
      style={{
        fontSize: "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: "3em"
      }}
    >
      compSci.Now()
    </h1>
    <Header
      as="h2"
      content="A Computer Science Podcast for the Newbies and the Knowledgeable. Listen in and Learn!"
      inverted
      style={{
        fontSize: "1.7em",
        fontWeight: "normal",
        marginTop: "1.5em",
        marginBottom: "1.5em"
      }}
    />
    <Link to="/player">
      <Button primary size="huge" style={{ marginRight: "0.3em" }}>
        Listen Now
        <Icon name="headphones" style={{ marginLeft: "0.3em" }} />
      </Button>
    </Link>
    <Link to="/shownotes">
      <Button primary size="huge" style={{ marginLeft: "0.3em" }}>
        Show Notes
        <Icon name="file alternate outline" style={{ marginLeft: "0.3em" }} />
      </Button>
    </Link>
  </Container>
);

export default class HomePage extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    return (
      <Responsive>
        <Segment
          inverted
          textAlign="center"
          style={{
            minHeight: "100vh",
            padding: "1em 0em"
          }}
        >
          <HomepageHeading verticalAlign="middle" />
        </Segment>
      </Responsive>
    );
  }
}
