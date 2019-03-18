const INITIAL_STATE = {
    getMarketingDataById: []
}
export const GET_MARKETING_DATA_BY_ID = 'GET_MARKETING_DATA_BY_ID';
export const FAILED = 'FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MARKETING_DATA_BY_ID: {
            return Object.assign({}, state, { getMarketingDataById: action.data });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: "" });
        }
        default:
            return state;
    }
}