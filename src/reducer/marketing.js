const INITIAL_STATE = {
    marketingData: [],
    getMarketingData: []
}
export const ADD_MARKETING_DATA = 'ADD_MARKETING_DATA';
export const GET_MARKETING_DATA = 'GET_MARKETING_DATA';
export const FAILED = 'FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_MARKETING_DATA: {
            return Object.assign({}, state, { marketingData: action.data });
        }
        case GET_MARKETING_DATA: {
            return Object.assign({}, state, { getMarketingData: action.data });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: "" });
        }
        default:
            return state;
    }
}