import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  state = {
    inputSearch: '',
    // loading: false,
    searchBtnDisabled: true,
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

  render() {
    const { inputSearch, searchBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
            // onClick={ xx }
          >
            Prucurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
