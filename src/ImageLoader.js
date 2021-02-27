import lozad from 'lozad';
import React, { Component } from 'react';

import './ImageLoader.css';

class ImageLoader extends Component {
  constructor(props) {
    super(props);
    this.observer = lozad(
      '.lozad', {
        load: (el) => {
            el.src = el.dataset.src;
            el.onload = () => el.classList.remove('ready');
        }
    });
  }

  componentDidMount() {
    this.observer.observe();
  }

  render() {
    const GRID_WIDTH = 100;
    const source = this.props.fields.image.fields.file;
    const width = source.details.image.width;
    const height = source.details.image.height;
    const buffer = `${height/width*GRID_WIDTH}%`; // *grid_width

    const episodeNumberRegex = /Season (\d) Episode (\d*): (.*)/g;
    const matches = this.props.fields.episode.matchAll(episodeNumberRegex);
    let season, episode, title;

    for (const match of matches) {
      if (match != null) {
        season = match[1];
        episode = match[2];
        title = match[3];
      }
    }
    return (
      <React.Fragment>
        <div className="image-wrapper" style={{paddingBottom: buffer, width: `${GRID_WIDTH}%`}}>
          {this.props.fields.link ? (
            <a href={this.props.fields.link} target="_blank" rel="noopener noreferrer">
              <img
                className="lozad ready"
                src={`${source.url}?w=50`}
                data-src={source.url}
                alt={this.props.alt}
              />
              <div className="screen" style={{paddingBottom: buffer}} />
            </a>) :
            (
              <React.Fragment>
              <img
                className="lozad ready"
                src={`${source.url}?w=50`}
                data-src={source.url}
                alt={this.props.alt}
              />
              <div className="screen" style={{paddingBottom: buffer}} />
            </React.Fragment>
          )}
        </div>
        <h3 className="info">
          <label className="episodeData">{`S${season}E${episode}`}</label>
          <span className="title">{title}</span>
        </h3>
        <p className="quote">{this.props.fields.quote}</p>
      </React.Fragment>
    );
  }
}

export default ImageLoader;
