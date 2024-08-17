import React, {useEffect} from 'react'
import BreadcumContainer from '../components/breadcum/BreadcumContainer';
import CartSidebar from '../components/cart/CartSidebar';
import { Link } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Thumb from '../assets/images/p-2.png';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { setLoading } from '../utils/loaderSlice';
import { removeItem, clearCart, updateQuantity } from '../utils/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state)=> state.cart.items);
  const loading = useSelector((state)=> state.loader.loading);
  const dispatch = useDispatch();
  //console.log(cartItems);

  useEffect(()=> {
    dispatch(setLoading(true));
    setTimeout(()=> {
      dispatch(setLoading(false));
    }, 1000)
  }, []);

  const handleDeleteCartItem = (itemId) => {
    dispatch(removeItem(itemId));
  }

  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateQuantity({
      id: itemId,
      quantity: parseInt(quantity)
    }));
    //console.log(dispatch(updateQuantity(itemId, quantity)));
  }
  const subtotal = cartItems.reduce((acc, item)=> {
    return acc + (item.price * item.quantity);
  }, 0);

  return (
    <section className='mb-8'>
      {loading && <Loader/>}
      <div className='container mx-auto px-3 xl:px-0'>
        <ul className="bredcrumb my-4 flex items-center rounded-full bg-light-gray p-2 capitalize leading-tight text-light-dark">
          <BreadcumContainer pageName='Home' pageUrl={'/'} />
          <BreadcumContainer pageName='Cart' />
        </ul>
        <div className='pb-8'>
          <h1 className='font-bold text-2xl mb-8'>Shopping Cart</h1>
          {cartItems.length > 0 ? (
            <div className='flex flex-col lg:flex-row'>
              <div className='w-full lg:w-2/3 lg:pr-8'>
                <div className='flex justify-between flex-col items-center w-full'>
                  <div className='pb-8 border-b-8 border-black flex justify-between items-center w-full'>
                    <h3 className="font-bold lg:text-xl xl:text-3xl">Items</h3>
                    <div className='flex justify-end items-center'>
                      <Link className="flex justify-start items-center text-secondary underline font-medium">
                        <LocalPrintshopOutlinedIcon/>
                        <span className='ml-2'>Print</span>
                      </Link>
                      <button onClick={()=> dispatch(clearCart())} className="flex justify-start items-center text-primary underline font-medium ml-8">
                        <DeleteOutlinedIcon className='' />
                        <span className='ml-2'>Remove All</span>
                      </button>
                    </div>
                  </div>
                  <div className='cart-table'>
                    <table className="w-full ">
                      <thead>
                          <tr>
                            <th scope="col" className='border-none py-4 lg:text-md xl:text-xl'>Product Description</th>
                            <th scope="col" className='border-none py-4 lg:text-md xl:text-xl hidden lg:table-cell'>Quantity</th>
                            <th scope="col" className="text-center border-none py-4 lg:text-md xl:text-xl hidden lg:table-cell">Price/Unit</th>
                            <th scope="col" className="text-end border-none py-4 lg:text-md xl:text-xl">Total</th>
                          </tr>
                      </thead>
                      <tbody>
                        {cartItems && cartItems.map((item)=> (
                          <tr key={item.id}>
                            <td className="">
                                <div className="flex justify-start items-center">
                                  <div className="w-[133px] h-[150px]">
                                      <img src={item.thumbnail} alt={item.title} className="border border-light-gray rounded-md w-xl:[133px] xl:h-[150px] h-[100px]" />
                                  </div>
                                  <div className="relative ml-4">
                                    {/* <button onClick={()=> handleDeleteCartItem(item.id)} className="block lg:hidden absolute right-0 bottom-0">Remove</button> */}
                                    <Link to={`/product/${item.id}`}><h4 className="font-bold text-md lg:text-xl mb-3">{item.title}</h4></Link>
                                    <p className="text-sm lg:text-md">SKU #: <span>{item.sku}</span></p>
                                    <div className="block lg:hidden text-sm lg:text-md">
                                      <p>Price/Unit: ${item.price}</p>
                                    </div>
                                    {/* <div className="flex justify-between align-center lg:hidden">
                                      <input type="number"  name="quantity" className="text-center"   />
                                      <p className="font-bold"><span className="inline-block lg:hidden">Total:</span> $0.37</p>
                                    </div> */}
                                  </div>
                                </div>
                            </td>
                            <td className="hidden lg:table-cell">
                                <input type="number" name="quantity" className="text-center border border-light-gray w-[78px] h-[45px] outline-none" min='1' value={item.quantity} onChange={(e)=> handleUpdateQuantity(item.id, e.target.value)} />
                            </td>
                            <td className="text-center hidden lg:table-cell">
                                <p>${item.price}</p>
                            </td>
                            <td className="text-right relative">
                                <p className="font-bold"> ${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={()=> handleDeleteCartItem(item.id)} className="absolute bottom-3 right-0 flex items-center text-primary font-bold">
                                  <DeleteOutlinedIcon/>
                                  <span>Remove</span>
                                </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='w-full lg:w-1/3'>
                <CartSidebar subtotalPrice={subtotal.toFixed(2)} totalItems={cartItems.length} checkoutUrl={`/checkout`} />
              </div>
            </div>) : (
              <div>
                <h2 className='mb-4'>Your Cart is empty!</h2>
                <Link className='flex justify-center items-center bg-secondary hover:bg-sky-700 rounded-md py-2 px-4 text-white max-w-40' to='/shop'>Go to Shop</Link>
              </div>

            )
          }
        </div>
      </div>
    </section>
  )
}

export default Cart;