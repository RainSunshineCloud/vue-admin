import conf from './conf.js';

conf.apiConf = process.env.NODE_ENV === 'development' ? conf.devApiConfig : conf.proApiConfig
export default conf;