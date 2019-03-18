import BaseService from './baseService'

export function addMarketingData(data) {
    return BaseService.post('/marketing', data);
}

export function getMarketingData() {
    return BaseService.get('/marketing/getMarketing');
}