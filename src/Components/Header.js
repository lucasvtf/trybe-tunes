import React from 'react';
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
      </header>
    );
  }
}

export default Header;
