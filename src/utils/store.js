import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import homeSliderReducer from './sliderSlice';
import categoryListReducer from './cateoryListSlice';
import footerMenuSlice from './footerSlice';
import productReducer from './productSlice';
import searchReducer from './searchSlice';
import loaderReducer from './loaderSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';
import wishlistReducer from './wishlistSlice';
import blogReducer from './newsSlice';

const rootReducer  = combineReducers({
    homeSlider: homeSliderReducer,
    categoryList: categoryListReducer,
    footerMenu: footerMenuSlice,
    product: productReducer,
    search: searchReducer,
    loader: loaderReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    blog: blogReducer,
})

// Create persist config
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['homeSlider', 'blog', 'footerMenu', 'loader', 'search', 'categoryList'],
};
  
  // Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  // Configure store
const store = configureStore({
    reducer: persistedReducer,
});
  
// Create persistor
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };