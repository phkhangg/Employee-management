import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Staffs,StaffOfDeparts} from './staffs';
import { Departments } from './departments';
import { Role } from './Role';
import {Salary} from './salary';

export const configStore=()=>{
    const store= createStore(
        combineReducers({
            staffs:Staffs,
            departments:Departments,
            salary:Salary,
            role:Role,
            staffOfDeparts:StaffOfDeparts,
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}