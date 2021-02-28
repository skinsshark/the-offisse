import React, { useEffect, useState } from 'react';
import * as contentful from 'contentful';

import ImageLoader from './ImageLoader';
import './App.css';

require('intersection-observer'); //polyfill

function App() {
  const [designers, setDesigners] = useState(new Set());
  const [scenes, setScenes] = useState([]);
  const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
  });

  const setPosts = response => {
    const designers = new Set();

    response.items.map((item, i) => {
      designers.add(item.fields.designer)
    })

    for (let i = response.items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [response.items[i], response.items[j]] = [response.items[j], response.items[i]];
    }

    setDesigners(designers)
    setScenes(response.items);
  };

  useEffect(() => {
    client.getEntries({'content_type': 'scene'}).then(setPosts);
  }, [])

  if (!scenes[0] || designers.size < 1) {
    return null;
  }

  return (
    <div className="app">
      <header>
        <div className="header-wrapper">
          <h1>
            The Offisse
          </h1>
        </div>
      </header>

      <div className="page-wrapper">
        <nav className="fixed-sidebar">
          <article>
            <h2>Featured Designers</h2>
            {Array.from(designers)
              .sort()
              .map((designer, i) => {
                return <li key={`designer-${i}`}>{designer}</li>
              })
            }
          </article>
        </nav>

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

        <div className="fixed-sidebar description">
          <h2>About</h2>
          <li>High end fashion inspired by <nobr>The Office (US)</nobr> by Sharon Zheng.</li>
        </div>
      </div>
    </div>
  );
}

export default App;
