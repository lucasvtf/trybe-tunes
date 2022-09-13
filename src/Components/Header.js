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
        <div className="flex justify-around bg-black h-20 items-center">
          <div className="flex justify-start">
            <img
              className="inline h-10"
              src="https://seeklogo.com/images/S/spotify-2015-logo-560E071CB7-seeklogo.com.png?v=637903118310000000"
              alt="spotify logo"
            />
            <h1
              className="text-white leading-10 tracking-widest pl-4 text-4xl"
            >
              TrybeTunes

            </h1>
          </div>
          {loading && <Loading />}
          <h1
            className="text-white leading-10 tracking-widest pr-4 text-4xl"
            name="userName"
            data-testid="header-user-name"
          >
            {user}

          </h1>
        </div>
        <nav className="bg-gray-500">
          <ul className="flex justify-around h-12 items-center">
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
                className="text-white leading-10 tracking-widest pl-4 text-xl"
              >
                Pesquisa

              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="text-white leading-10 tracking-widest pl-4 text-xl"
              >
                Música Favoritas
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="text-white leading-10 tracking-widest pl-4 text-xl"
              >
                Perfil

              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
