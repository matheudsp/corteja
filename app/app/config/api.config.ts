export const SERVER_URL = process.env.SERVER_URL
export const API_URL = `${SERVER_URL}/api`

export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getServicesRenderedUrl = (string: string) => `/services-rendered${string}`
export const getSalonServicesUrl = (string: string) => `/salon-services${string}`
export const getSaloonsUrl = (string: string) => `/saloons${string}`
export const getCouponsUrl = (string: string) => `/coupons${string}`
export const getEmployeesUrl = (string: string) => `/employees${string}`
export const getAppointmentsUrl = (string: string) => `/appointments${string}`