import React from 'react';

import { Col, Row, Button } from 'react-bootstrap';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"

import { getConfig, saveConfig } from '../api';

export default class Configs extends React.Component {
  state = {
    config: '',
  };

  async componentDidMount() {
    const res = await getConfig('func');

    this.setState({
      config: res
    })
  }

  handleChange = (e) => {
    this.setState({
      config: e,
    })
  };

  handleClick = async () => {
    const res = await saveConfig(this.state.config, 'func');
  };

  render() {
    return (
      <Row className="mt-3">
        <Col className='mx-auto'>
          <h1>Mocha Configuration</h1>
          <AceEditor
            mode="javascript"
            value={this.state.config}
            theme="github"
            width='600px'
            onChange={this.handleChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true
            }}
          />
          <Button variant="primary" onClick={this.handleClick}>Save Changes</Button>
        </Col>
      </Row>
    )
  }
}
