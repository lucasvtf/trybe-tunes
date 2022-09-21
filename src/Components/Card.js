import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { albumId, imgURL, artistName, albumName } = this.props;
    return (
      <section className="p-4 h-96 w-96 hover:shadow-md">
        <Link to={ `/album/${albumId}` }>
          <img src={ imgURL } alt={ artistName } className="mb-4 h-1/2" />
          <p className="text-clip text-center text-lg">{ artistName }</p>
          <p className="text-clip text-center text-lg">{ albumName }</p>
        </Link>
      </section>
    );
  }
}

Card.propTypes = {
  albumId: PropTypes.string,
  imgURL: PropTypes.string,
  artistName: PropTypes.string,
  albumName: PropTypes.string,
}.isRequired;

export default Card;
