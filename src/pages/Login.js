import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    userName: '',
    SaveBtnDisabled: true,
    loading: false,
    redirect: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }, () => {
      const { userName } = this.state;
      const MIN_NAME_LENGTH = 3;
      if (userName.length >= MIN_NAME_LENGTH) {
        this.setState({ SaveBtnDisabled: false });
      } else {
        this.setState({ SaveBtnDisabled: true });
      }
    });
  };

  handleClickLogin = async () => {
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ redirect: true });
  };

  render() {
    const { userName, SaveBtnDisabled, loading, redirect } = this.state;
    return (
      redirect ? <Redirect to="/search" />
        : (
          <div data-testid="page-login">
            <Header />
            {loading && <Loading />}
            {!loading
            && (
              <form>
                <label htmlFor="nameLogin">
                  <input
                    name="userName"
                    type="text"
                    placeholder="Insira seu nome"
                    value={ userName }
                    onChange={ this.handleChange }
                    data-testid="login-name-input"
                  />
                </label>
                <button
                  name="submitBtn"
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ SaveBtnDisabled }
                  onClick={ this.handleClickLogin }
                >
                  Entrar

                </button>
              </form>
            )}

          </div>
        ));
  }
}

export default Login;
