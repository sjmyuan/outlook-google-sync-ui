import React from 'react';
import _ from 'lodash';
import when from 'when';
import Helmet from 'react-helmet';

export default class LandingPage extends React.Component {

  static fetchApiData(host, params, query) {
    return Promise.resolve({})
  }

  render() {
    return (
      <div className="login-page">
        Hello World!
      </div>
    );
  }
}
