import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <h3>Nome do Usuário</h3>
      </header>
    );
  }
}

export default Header;
