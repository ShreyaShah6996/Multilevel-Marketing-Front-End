import { combineReducers } from 'redux'

import marketing from "./marketing";
import customer from './customer';

export default combineReducers({ marketing, customer });
