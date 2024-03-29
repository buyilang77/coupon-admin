import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}

export function signUp(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function fetchShopUsers() {
  return request({
    url: '/shopUsers',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/authorizations/current',
    method: 'delete'
  })
}
