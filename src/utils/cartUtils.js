import { addItem, updateQuantity } from './cartSlice';
import { toast } from 'react-toastify';

export const handleCart = (items, cartItems, dispatch, setIsAdded, quantity)=> {
    const cartItem = cartItems.some((cartItem)=> cartItem.id === items.id);

    // console.log(cartItem);
    
    if(!cartItem){
        const netItem = {...items, quantity}
        dispatch(addItem(netItem));
        setIsAdded(true);
        // console.log('Item added:', items);
        // console.log('New Item added:', netItem);
        toast.success('Item Added Successfully!')
    }
    else if(cartItem.quantity !== quantity){
        dispatch(updateQuantity({id: items.id, quantity}));
        setIsAdded(true);
        // console.log('items quantity Updated', {...cartItem, quantity});
        toast.info(`Item Quantity Updated!`);
    }
    else{
        // setIsAdded(false);
        toast.error(`Item is already in the Cart!`);
    }
}