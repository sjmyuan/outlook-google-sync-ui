import React from 'react';

export default class ServerError extends React.Component {
  render() {
    return (
      <section className="server-error-wrapper">

        <p>We're having a break right now.</p>

        <p>Yes, we could work on our humour, but we're better at fixing technical issues like this one.</p>

        <p>We should be back to normal services soon.</p>

        <a href="/" className="button">
          <i className="rui-icon rui-icon-search"></i><span>Home</span>
        </a>

      </section>
    );
  }
}
