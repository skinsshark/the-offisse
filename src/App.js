import React, { useEffect, useState } from 'react';
import * as contentful from 'contentful';

import ImageLoader from './ImageLoader';
import './App.css';

require('intersection-observer'); //polyfill

function App() {
  const [scenes, setScenes] = useState([]);
  const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
  });

  const setPosts = response => {
    for (let i = response.items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [response.items[i], response.items[j]] = [response.items[j], response.items[i]];
    }

    setScenes(response.items);
  };

  useEffect(() => {
    client.getEntries({'content_type': 'scene'}).then(setPosts);
  }, [])

  if (!scenes[0]) {
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
        {scenes.map((scene, i) => {
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

export default App;
