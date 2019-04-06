import conf from './conf.js';

conf.apiConf = process.env.NODE_ENV === 'development' ? conf.devApiConfig : conf.proApiConfig
delete conf.devApiConfig
delete conf.proApiConfig
export default conf;