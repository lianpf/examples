/**
 * @author lianPf
 * @date 17-12-04
 */
import { hashHistory } from 'dva/router';
import development from './develop.json';
import test from './test.json';
import production from './production.json';


const env = 'development';

const history = hashHistory;
let config = {};

switch (env) {
  case 'development':
    config = { history, ...development };
    break;
  case 'test':
    config = { history, ...test };
    break;
  case 'production':
    config = { history, ...production };
    break;
}

export default config;
