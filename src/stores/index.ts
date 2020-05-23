import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import monitorReducersEnhancer from './middleware/monitorReducer'
import loggerMiddleware from './middleware/logger'
import { rootReducer } from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-community/async-storage'
import apiService from './middleware/api'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],

  // stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
}
const pReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore(preloadedState?: any) {
  const middlewares = [apiService, loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(pReducer, preloadedState, composedEnhancers)

  const persistor = persistStore(store)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return [store, persistor]
}
