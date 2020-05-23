import { PRODUCT1 } from '../../utils/image'
import {
  GET_CATEGORY,
  GET_CATEGORY_FULFILLED,
  GET_CATEGORY_REJECTED,
  RESET_STORE,
} from '../constants/category.constant'
import { ICategory } from '../object/category.object'

interface IState {
  loadingCategoryProduct: boolean;
  categoriesProduct: ICategory[];
  errorCategoriesProduct: null;
}

const initialState = {
  loadingCategoryProduct: false,
  categoriesProduct: [],
  errorCategoriesProduct: null,
}

const categoryReducer = (state = initialState, action: any): IState => {
  switch (action.type) {
    case GET_CATEGORY:
      return { ...state, loadingCategoryProduct: action.payload }
    case GET_CATEGORY_FULFILLED:
      return {
        ...state,
        categoriesProduct: action.payload,
        loadingCategoryProduct: action.loading,
      }
    case GET_CATEGORY_REJECTED:
      return {
        ...state,
        errorCategoriesProduct: action.payload,
        loadingCategoryProduct: action.loading,
      }
    case RESET_STORE:
      return initialState
    default:
      return state
  }
}

export default categoryReducer
