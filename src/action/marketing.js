import * as marketingService from '../service/marketing';
import { FAILED, ADD_MARKETING_DATA, GET_MARKETING_DATA } from '../reducer/marketing';

export const addMarketingData = (data) => {
    return (dispatch) => {
        marketingService.addMarketingData(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_MARKETING_DATA,
                        data: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: FAILED,
                        data: { error_msg: error.response.data.error }
                    });
                }
            });
    }
};

export const getMarketingData = () => {
    return (dispatch) => {
        marketingService.getMarketingData()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_MARKETING_DATA,
                        data: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: FAILED,
                        data: { error_msg: error.response.data.error }
                    });
                }
            });
    }
};