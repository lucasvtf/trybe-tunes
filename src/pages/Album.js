import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    albumTracks: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    const albumInfo = data.filter((_, index) => index === 0)[0];
    const albumTracks = data.filter((_, index) => index !== 0);
    this.setState({
      artistName: albumInfo.artistName,
      albumName: albumInfo.collectionName,
      albumTracks,
    });
  }

  render() {
    const { artistName, albumName, albumTracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 name="artistName" data-testid="artist-name">{artistName}</h2>
        <h3 name="albumName" data-testid="album-name">{albumName}</h3>
        <div>
          {
            albumTracks.map((track) => (
              <MusicCard
                key={ track.trackId }
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
                trackId={ track.trackId }
                album={ track }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default Album;
