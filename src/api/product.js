import request from '@/utils/request'
import qs from 'qs'

export function fetchList(query) {
  return request({
    url: '/products',
    method: 'get',
    params: {
      filter: {
        name: query && query.product_name
      },
      page: query && query.page,
      limit: query && query.limit
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
