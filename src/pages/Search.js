import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    inputSearch: '',
    loading: false,
    searchBtnDisabled: true,
    searchResult: [],
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }, () => {
      const { inputSearch } = this.state;
      const MIN_SEARCH_LENGTH = 2;
      if (inputSearch.length >= MIN_SEARCH_LENGTH) {
        this.setState({ searchBtnDisabled: false });
      } else {
        this.setState({ searchBtnDisabled: true });
      }
    });
  };

  handleClick = () => {
    this.setState({ loading: true });
    this.fecthAlbumAPI();
  };

  fecthAlbumAPI = async () => {
    const { inputSearch } = this.state;
    const data = await searchAlbumsAPI(inputSearch);
    this.setState({ searchResult: data, loading: false });
  };

  render() {
    const { inputSearch, searchBtnDisabled, searchResult, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading && <Loading />}
        {!loading
        && (
          <form>
            <label htmlFor="searchInput">
              <input
                name="inputSearch"
                type="text"
                placeholder="Digite o nome do Artista"
                value={ inputSearch }
                onChange={ this.handleChange }
                data-testid="search-artist-input"
              />
            </label>
            <button
              name="searchBtn"
              type="button"
              data-testid="search-artist-button"
              disabled={ searchBtnDisabled }
              onClick={ this.handleClick }
            >
              Prucurar
            </button>
          </form>)}
        <h2>{`Resultado de álbuns de: ${inputSearch}`}</h2>
        <div>
          <ul>
            {searchResult.map((album) => (
              <li key={ album.artistId }>
                <img src={ album.artworkUrl100 } alt={ album.artistName } />
                <h4>{album.artistName}</h4>
                <h5>{album.collectionName}</h5>
                {/*  <Link
                  to="/album/:id"
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  Perfil

                </Link> */}
              </li>))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
