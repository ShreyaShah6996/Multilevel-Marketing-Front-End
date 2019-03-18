import BaseService from './baseService'

export function getMarketingById(id) {
    return BaseService.get('/marketing/' + id);
}
