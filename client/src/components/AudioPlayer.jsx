import AudioCard from "audiocard";
import { Segment, Grid, List, Menu, Container, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

import React, { Component, Fragment } from "react";

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "4em",
  transition: "box-shadow 0.5s ease, padding 0.5s ease"
};

const fixedMenuStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"
};

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentEpisode: ""
    };
  }

  async componentDidMount() {
    const response = await axios.get("/routes/episodes/player");
    this.setState({
      data: response.data,
      currentEpisode: { ...response.data[0] }
    });
    console.log(response);
  }

  render(props) {
    const { currentEpisode } = this.state;
    return (
      <Fragment>
        <Menu borderless fixed="top" style={fixedMenuStyle}>
          <Container text>
            <Menu.Item header as={Link} to="/">
              compSci.Now()
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item active="true">Listen</Menu.Item>
              <Menu.Item as={Link} to="/shownotes">
                Show Notes
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column width={10}>
            <Segment raised>
              <Segment>
                <List divided relaxed>
                  {this.state.data.map(episode => (
                    <List.Item
                      key={episode._id}
                      active={
                        this.state.currentEpisode === episode._id ? true : false
                      }
                      onClick={() => this.setState({ currentEpisode: episode })}
                    >
                      <List.Content verticalAlign="middle">
                        <List.Header>{episode.title}</List.Header>
                        {episode.shortcontent}
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Segment>
              <AudioCard
                title={`Ep ${currentEpisode.episodenumber}. - ${currentEpisode.title}`}
                art={currentEpisode.cover}
                source={currentEpisode.src}
                skipBackSeconds={10}
                skipForwardSeconds={30}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}
