import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
  };

  componentDidMount() {

  }

  handleCheck = async () => {
    const { album } = this.props;
    const { checked } = this.state;
    if (checked) {
      this.setState({ loading: true });
      await removeSong(album);
      this.setState({ loading: false, checked: false });
    } else {
      this.setState({ loading: true });
      await addSong(album);
      this.setState({ loading: false, checked: true });
    }
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        {loading && <Loading />}
        <h6>{ trackName }</h6>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteCheck">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleCheck }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
