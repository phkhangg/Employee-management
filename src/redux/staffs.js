import { STAFFS } from "../share/staffs";
import * as ActionTypes from './ActionTypes';

export const Staffs =(state={
    isLoading: true,
    errMess: null,
    staffs: [],
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_STAFFS:
            return {
              ...state,
              ...{ isLoading: false, errMess: null, staffs: action.payload },
            };
          case ActionTypes.ADD_STAFF:
            return {
              ...state,
              ...{
                isLoading: false,
                errMess: null,
                staffs: state.staffs.concat(action.payload),
              },
            };
          case ActionTypes.STAFFS_LOADING:
            return { ...state, ...{ isLoading: true, errMess: null, staffs: []}};
          case ActionTypes.STAFFS_FAILED:
            return {
              ...state,
              ...{ isLoading: false, errMess: action.payload, staffs: [] },
            };
          default:
            return state;
        }
      };
      //lấy data staff of depart từ API
      export const StaffOfDeparts = (
        state = {
          isLoading: true,
          errMess: null,
          staffOfDeparts: [],
        },
        action
      ) => {
        switch (action.type) {
          case ActionTypes.ADD_STAFF_DEPART:
            return {
              ...state,
              ...{ isLoading: false, errMess: null, staffOfDeparts: action.payload },
            };
          case ActionTypes.STAFFS_DEPART_LOADING:
            return {
              ...state,
              ...{ isLoading: true, errMess: null, staffOfDeparts: [] },
            };
          case ActionTypes.STAFFS_DEPART_FAILED:
            return {
              ...state,
              ...{ isLoading: false, errMess: action.payload, staffOfDeparts: [] },
            };
          default:
            return state;
        }
      };
      
            