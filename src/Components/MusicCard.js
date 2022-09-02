import React from 'react';
import PropTypes from 'prop-types';
// import Loading from './Loading';

class MusicCard extends React.Component {
//  state = {
//    loading: false,
//  };

  render() {
    // const { loading } = this.state;
    const { trackName, previewUrl } = this.props;
    return (
      <div>
        <h6>{ trackName }</h6>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
