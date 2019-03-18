import * as customerService from '../service/customer';
import { FAILED, GET_MARKETING_DATA_BY_ID } from '../reducer/customer';

export const getMarketingById = (id) => {
    return (dispatch) => {
        customerService.getMarketingById(id)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_MARKETING_DATA_BY_ID,
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
