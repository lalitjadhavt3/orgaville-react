export const USER_KEY = '';

export const endPoints = {
  USER_LOGIN: '/api/login',
  USER_REGISTRATION: '/api/register',
  GET_OTP: '/api/getOtp',
  VERIFY_OTP: '/api/verifyOtp',
  GET_CATEGORIES: '/api/categories',
  PRODUCTS: '/api/products',
  GET_PINCODES: '/api/pinCodes',
  GET_BANNER: '/api/banners',
  SAVE_ADDRESS: '/api/saveAddressByUserId',
  GET_ADDRESS: '/api/getAllAddressByUserId',
  PLACE_ORDER: '/api/placeOrder',
  UPDATE_ADDRESS: '/api/updateAddressByUserId',
  DELETE_ADDRESS: '/api/deleteAddressByUserId',
  UPDATE_PROFILE: '/api/updateCustomer',
  ORDERS: '/api/orders',
  CANCEL_ORDERS: '/api/cancelOrder',
  UPLOAD_IMAGE: '/api/uploadImage',
  DELIVERY_BOY_ORDER_LIST: '/api/orderList',
  DELVERY_BOY_STATUS_CHANGE: '/api/changeOrderStatus',
  SEND_DEVICE_TOKEN: '/api/storeDeviceToken',
  SUB_CATEGORIES: '/api/subCategories',
  GET_PROMO_CODE: '/api/getPromoCodes',
  VALIDATE_PROMO_CODE: '/api/validatePromoCode',
  FORGOT_PASSWORD: '/api/forgotPassword',
  CHANGE_PASSWORD: '/api/changePassword',
  STORE_WISHLIST: '/api/storeProductInWishlist',
  GET_WISHLIST: '/api/wishlist',
  REMOVE_WISHLIST: '/api/removeProductFromWishlist',
  GET_USER_DETAILS: '/api/getUserDetails',
  CHECK_DELIVERY_DATE_AVAILABLE: '/api/checkDeliveryBoyAvailability',
};

export const errorCodes = {
  REQUEST_TIMEOUT: 1001,
  UNEXPECTED_ERROR: 1002,
  INTERNAL_SERVER_ERROR: 1003,
  NO_INTERNET: 1004,
  NO_DATA_FOUND: 1005,
  ACCESS_TOKEN_FAILURE: 1006,
  REFRESH_TOKEN_FAILURE: 1007,
  INVALID_CREDENTIAL: 1008,
  UNAUTHORISED_ACCESS: 1009,
};

export const TIME_OUT = 1000 * 5;
