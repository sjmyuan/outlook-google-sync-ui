'use strict';

import hashedAssetsMapping from '../../../generated/assets.json';
import _ from 'lodash';

const serverConfig = {
  listeningHost: '0.0.0.0',
  listeningPort: 8000,
  appHost: '',
  assetsMappings: hashedAssetsMapping,
};

export default {
  serverConfig,
};
