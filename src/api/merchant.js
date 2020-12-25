import request from '@/utils/request'
import qs from 'qs'

export function fetchList(query) {
  return request({
    url: '/merchants',
    method: 'get',
    params: {
      filter: {
        merchant_name: query.merchant_name
      },
      page: query.page,
      limit: query.limit
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: true })
    }
  })
}

export function fetchMerchant(id) {
  return request({
    url: '/merchants/' + id,
    method: 'get'
  })
}

export function updateMerchant(id, data) {
  return request({
    url: '/merchants/' + id,
    method: 'put',
    data
  })
}
