import request from '@/utils/request'

const userApi = {
  Login: '/auth/login',
  Register: 'auth/register',
  Logout: '/auth/logout'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function register (parameter) {
  return request({
    url: userApi.Register,
    method: 'post',
    data: parameter
  })
}
