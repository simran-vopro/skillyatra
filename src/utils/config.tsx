export const BASE_URL = "http://localhost:5000";
export const IMAGE_URL = "http://localhost:5000/static";

export const API_PATHS = {
  REGISTER: `${BASE_URL}/api/auth/signup`,
  LOGIN: `${BASE_URL}/api/auth/login`,

  COURSES: `${BASE_URL}/api/course`,
  COURSE_DETAIL: `${BASE_URL}/api/course/beforeDetail`,
  MY_COURSE_DETAIL: `${BASE_URL}/api/course/fullDetail`,
  MY_COURSES : `${BASE_URL}/api/course/myCourses`,

  CATEGORIES: `${BASE_URL}/api/category`,
  PRODUCTS: `${BASE_URL}/api/products`,
  GET_PRODUCT: `${BASE_URL}/api/get-product`,

  TOP_BANNERS: `${BASE_URL}/api/banner`,
  GET_FLOATING_BANNER: `${BASE_URL}/api/banner/getFloatingBanner`,

  TOP_CATEGORIES: `${BASE_URL}/api/categories/top-categories`,
  GET_BRANDS: `${BASE_URL}/api/categories/brands`,

  ADD_TO_CART: `${BASE_URL}/api/cart/add`,
  GET_CART: `${BASE_URL}/api/cart`,
  UPDATE_CART: `${BASE_URL}/api/cart/update`,
  REMOVE_CART_ITEM: `${BASE_URL}/api/cart/remove`,


  PLACE_ORDER: `${BASE_URL}/api/order/request-quote`,
  GET_ORDER: `${BASE_URL}/api/order/get-order`,
  EDIT_ORDER: `${BASE_URL}/api/order/edit-order`,


};

