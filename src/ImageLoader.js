import lozad from 'lozad';
import React, {useEffect, useState} from 'react';

import './ImageLoader.css';

function ImageLoader(props) {
  const observer = lozad(
    '.lozad', {
      load: (el) => {
          el.src = el.dataset.src;
          el.onload = () => el.classList.remove('ready');
      }
  });

  useEffect(() => {
    observer.observe();
  })

  const GRID_WIDTH = 100;
  const source = props.fields.image.fields.file;
  const width = source.details.image.width;
  const height = source.details.image.height;
  const buffer = `${height/width*GRID_WIDTH}%`; // *grid_width

  const episodeNumberRegex = /Season (\d) Episode (\d*): (.*)/g;
  const matches = props.fields.episode.matchAll(episodeNumberRegex);
  let season, episode, title;

  for (const match of matches) {
    if (match != null) {
      season = match[1];
      episode = match[2];
      title = match[3];
    }
  }
  return (
    <>
      <div className="image-wrapper" style={{paddingBottom: buffer, width: `${GRID_WIDTH}%`}}>
        {props.fields.link ? (
          <a href={props.fields.link} target="_blank" rel="noopener noreferrer">
            <img
              className="lozad ready"
              src={`${source.url}?w=50`}
              data-src={source.url}
              alt={props.alt}
            />
            <div className="screen" style={{paddingBottom: buffer}} />
          </a>) :
          (
            <>
            <img
              className="lozad ready"
              src={`${source.url}?w=50`}
              data-src={source.url}
              alt={props.alt}
            />
            <div className="screen" style={{paddingBottom: buffer}} />
          </>
        )}
      </div>
      <h3 className="info">
        <label className="episodeData">{`S${season}E${episode}`}</label>
        <span className="title">{title}</span>
      </h3>
      <p className="quote">{props.fields.quote}</p>
    </>
  );
}

export default ImageLoader;
