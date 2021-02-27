import React, { Component } from 'react';
import * as contentful from 'contentful';

import ImageLoader from './ImageLoader';
import './App.css';

require('intersection-observer'); //polyfill

class App extends Component {
  state = {
    scenes: []
  };

  client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
  });

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }

  fetchPosts = () => this.client.getEntries({'content_type': 'scene'});

  setPosts = response => {
    for (let i = response.items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [response.items[i], response.items[j]] = [response.items[j], response.items[i]];
    }

    this.setState({
      scenes: response.items
    });
  };

  render() {
    if (!this.state.scenes[0]) {
      return null;
    }

    return (
      <div className="app">
        <header>
          <div className="header-wrapper">
            <h1>
              The Offisse
            </h1>
            <p>"High end fashion inspired by The Office" <span>by <a href="https://sharonzheng.com/" target="_blank" rel="noopener noreferrer">Sharon Zheng</a></span></p>
          </div>
        </header>

        <section>
          {this.state.scenes.map((scene, i) => {
            return (
              <div className="row" key={`scene_${i}`}>
                <ImageLoader
                  alt={scene.fields.title}
                  fields={scene.fields}
                />
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
