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
            el.onload = () => {
              el.classList.remove('ready');
                el.classList.add('loaded', 'down');
            }
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

    return (
      <div className="image-wrapper" style={{paddingBottom: buffer}}>
        {this.props.fields.link ? (
          <a href={this.props.fields.link} target="_blank" rel="noopener noreferrer">
            <img
              className="lozad ready"
              data-src={source.url}
              alt={this.props.alt}
            />
            <div className="screen" style={{paddingBottom: buffer}} />
          </a>) :
          (
            <React.Fragment>
            <img
              className="lozad ready"
              data-src={source.url}
              alt={this.props.alt}
            />
            <div className="screen" style={{paddingBottom: buffer}} />
          </React.Fragment>
        )}
        <p>{this.props.fields.episode}</p>
      </div>
    );
  }
}

export default ImageLoader;
