import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    userName: '',
    saveBtnDisabled: true,
    loading: false,
    redirect: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }, () => {
      const { userName } = this.state;
      const MIN_NAME_LENGTH = 3;
      if (userName.length >= MIN_NAME_LENGTH) {
        this.setState({ saveBtnDisabled: false });
      } else {
        this.setState({ saveBtnDisabled: true });
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
    const { userName, saveBtnDisabled, loading, redirect } = this.state;
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
                  disabled={ saveBtnDisabled }
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
