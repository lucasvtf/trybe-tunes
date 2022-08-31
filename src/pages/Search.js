import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artist: '',
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

  handleClick = async () => {
    const { inputSearch } = this.state;
    this.setState({ loading: true, artist: inputSearch, inputSearch: '' });
    const data = await searchAlbumsAPI(inputSearch);
    this.setState({ searchResult: data, loading: false });
  };

  render() {
    const { inputSearch, searchBtnDisabled, searchResult, loading, artist } = this.state;
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
        <div>
          {
            searchResult.length === 0
              ? <p>Nenhum álbum foi encontrado</p>
              : (
                <ul>
                  <div>
                    <p>{`Resultado de álbuns de: ${artist}`}</p>
                    {searchResult
                      .map(({
                        collectionId, artistName, artworkUrl100, collectionName,
                      }) => (
                        <Link
                          key={ collectionId }
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          <img src={ artworkUrl100 } alt={ artistName } />
                          <h4>{artistName}</h4>
                          <h5>{collectionName}</h5>
                          Perfil
                        </Link>
                      ))}
                  </div>
                </ul>)
          }

        </div>
      </div>
    );
  }
}

export default Search;
