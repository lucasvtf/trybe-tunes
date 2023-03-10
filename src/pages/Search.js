import React from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import Card from '../Components/Card';
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
      <div data-testid="page-search" className="bg-gray-300 min-h-screen">
        <Header />
        {loading && <Loading />}
        {!loading
        && (
          <div className="flex justify-center bg-gray-300 min-h-fit m-5">
            <form>
              <label htmlFor="searchInput">
                <input
                  className="rounded border-none
                  placeholder:text-center p-2 m-2 text-xl bg-gray-200"
                  name="inputSearch"
                  type="text"
                  placeholder="Digite o nome do Artista"
                  value={ inputSearch }
                  onChange={ this.handleChange }
                  data-testid="search-artist-input"
                />
              </label>
              <button
                className="
              rounded text-white bg-black text-xl m-2 p-2"
                name="searchBtn"
                type="button"
                data-testid="search-artist-button"
                disabled={ searchBtnDisabled }
                onClick={ this.handleClick }
              >
                Procurar
              </button>
            </form>
          </div>)}
        <div>
          {
            searchResult.length === 0
              ? (
                <p
                  className="
              text-xl text-center font-bold"
                >
                  Nenhum ??lbum foi encontrado

                </p>
              )
              : (
                <div>
                  <p
                    className="
              text-xl text-center font-bold"
                  >
                    {`Resultado de ??lbuns de: ${artist}`}
                  </p>
                  <section className="flex flex-wrap place-content-evenly pb-5">
                    {searchResult
                      .map(({
                        collectionId, artistName, artworkUrl100, collectionName,
                      }) => (
                        <Card
                          key={ collectionId }
                          albumId={ collectionId }
                          imgURL={ artworkUrl100 }
                          artistName={ artistName }
                          albumName={ collectionName }
                        />
                      ))}
                  </section>
                </div>)
          }
        </div>
      </div>
    );
  }
}

export default Search;
