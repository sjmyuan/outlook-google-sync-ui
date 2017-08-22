import React from 'react';
import NotFound from './common/not-found-page';
import ServerError from './common/server-error-page';
import _ from 'lodash';

export default class App extends React.Component {
  renderContent() {
    if (this.props.params.apiData.status == 404) {
      return <NotFound />;
    } else if (this.props.params.apiData.status == 500) {
      return <ServerError />;
    } else {
      return React.cloneElement(this.props.children, {...this.props, ref: "content"});
    }
  }

  componentDidMount() {
    window.Email = window.Email || {};
    window._satellite.pageBottom();
  }

  componentDidUpdate() {
    window.Email = window.Email || {};
    window._satellite.pageBottom();
  }

  render() {
    return (
      <div className="app">
        {this.renderContent()}
      </div>
    );
  }
}
