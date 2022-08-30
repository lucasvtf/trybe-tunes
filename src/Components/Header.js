import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: '',
    loading: true,
  };

  componentDidMount() {
    this.fecthUserAPI();
  }

  fecthUserAPI = async () => {
    const data = await getUser();
    this.setState({ user: data.name });
    this.setState({ loading: false });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        {loading && <Loading />}
        <h3
          name="userName"
          data-testid="header-user-name"
        >
          {user}

        </h3>
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Música Favoritas
              </Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
