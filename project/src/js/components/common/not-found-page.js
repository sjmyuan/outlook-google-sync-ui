import React from 'react';

export default class NotFound extends React.Component {
  render() {

    return (
      <section className="not-found-wrapper">

        <p>The page you requested could not be found.</p>

        <p>If you typed the URL yourself, please check your spelling. If you followed a link, it may be out of date.</p>

        <p>You can return to the home page:</p>

        <a href="/" className="button">
          <i className="rui-icon rui-icon-search"></i><span>Home</span>
        </a>

      </section>
    );
  }
}
