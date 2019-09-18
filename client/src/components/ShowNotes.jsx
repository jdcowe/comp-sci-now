import React, { Component, Fragment } from "react";
import {
  Menu,
  Container,
  Grid,
  Segment,
  List,
  Header,
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import AudioCard from "audiocard";

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

function createMarkup(source) {
  return { __html: source };
}

export default class ShowNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const response = await axios.get("/routes/episodes");
    this.setState({ data: response.data });
    console.log(response);
  }

  render(props) {
    return (
      <Fragment>
        <Menu borderless fixed="top" style={fixedMenuStyle}>
          <Container text>
            <Menu.Item header as={Link} to="/">
              compSci.Now()
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item as={Link} to="/player">
                Listen
              </Menu.Item>
              <Menu.Item active="true">Show Notes</Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        <Container text style={{ marginTop: "4.5em" }}>
          {this.state.data.map(item => (
            <Segment raised padded>
              <Grid>
                <Grid.Column width={4}>
                  <Image src={item.cover} size="medium" rounded />
                </Grid.Column>
                <Grid.Column width={11}>
                  <Header a="h1">{`Ep ${item.episodenumber}. - ${item.title}`}</Header>
                  <AudioCard
                    title={`Ep ${item.episodenumber}. - ${item.title}`}
                    source="https://dts.podtrac.com/redirect.mp3/seekjustice.fm/media/001.mp3"
                    skipBackSeconds={10}
                    skipForwardSeconds={30}
                  />
                  <div
                    style={{ marginTop: "1em" }}
                    dangerouslySetInnerHTML={createMarkup(item.content)}
                  />
                </Grid.Column>
              </Grid>
            </Segment>
          ))}
        </Container>
      </Fragment>
    );
  }
}
