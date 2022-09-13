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
              <div
                className="flex justify-center items-center bg-gray-300 min-h-screen"
              >
                <form
                  className="
                  flex flex-col h-60
                  justify-center items-center bg-gray-500
                  p-10 rounded shadow-lg space-y-4
                  leading-10 tracking-widest text-xl"
                >
                  <label htmlFor="nameLogin">
                    <input
                      className="rounded border-none placeholder:text-center pl-2"
                      name="userName"
                      type="text"
                      placeholder="Insira seu nome"
                      value={ userName }
                      onChange={ this.handleChange }
                      data-testid="login-name-input"
                    />
                  </label>
                  <button
                    className="
                    rounded text-white bg-black
                    w-full leading-10 tracking-widest
                    text-xl"
                    name="submitBtn"
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ saveBtnDisabled }
                    onClick={ this.handleClickLogin }
                  >
                    Entrar
                  </button>
                </form>
              </div>
            )}

          </div>
        ));
  }
}

export default Login;
