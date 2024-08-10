import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './utils/store'; // Updated import
import Body from './components/Body';
import MainContainer from './components/MainContainer';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import OneEssex from './pages/OneEssex';
import SingleProduct from './pages/SingleProduct';
import CategoryProduct from './pages/CategoryProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { PersistGate } from 'redux-persist/integration/react';
import MyAccount from './pages/MyAccount';
import ThankYou from './pages/ThankYou';
import Blog from './pages/Blog';
import Partnerships from './pages/Partnerships';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body/>,
    children: [
      {
        path:'/',
        element: <MainContainer/>
      },
      {
        path: 'shop',
        element: <Shop/>
      },
      {
        path: '/shop/:slug',
        element: <CategoryProduct/>
      },
      {
        path: '/product/:productId',
        element: <SingleProduct/>
      },
      {
        path: 'cart',
        element: <Cart/>
      },
      {
        path: 'checkout',
        element: <Checkout/>
      },
      {
        path: 'one-essex',
        element: <OneEssex/>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'my-account',
        element: <MyAccount />
      },
      {
        path: 'thankyou',
        element: <ThankYou />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'partnership',
        element: <Partnerships />
      }

    ]
  }
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
        <ToastContainer 
          position="bottom-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </PersistGate>
    </Provider>
  );
}

export default App;
