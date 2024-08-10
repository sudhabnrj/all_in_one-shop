import React from 'react'

const PaymentInfo = ({VISALOGO, MASTERCARDLOGO, AMEXLOGO, PAYPALLOGO, alt, paymentMethod, checked, title, handleSelect}) => {
    return (
        <div className="card border rounded-md mb-2">
            <div className="card border payment-Method_form">
                {/* <div className='card-item'>
                    <div className="card-header flex justify-between items-center bg-light-gray p-2">
                        <div className="custom-control custom-radio">
                            <input type="radio" id="creditCard" name="radioPayment" className="custom-control-input" value="creditCard" checked />
                            <label className="font-medium ml-2" htmlFor="creditCard">Credit card</label>
                        </div>
                        <span className="flex justify-between items-center gap-2">
                            <span className='border border-gray-300 w-12 h-7 flex justify-center items-center text-center rounded-sm p-2 bg-white'>
                                <img className='w-full' src={VISALOGO} alt={'visa'} />
                            </span>
                            <span className='border border-gray-300 w-12 h-7 flex justify-center items-center text-center rounded-sm p-2 bg-white'>
                                <img className='w-full' src={MASTERCARDLOGO} alt={'Mastercard'} />
                            </span>
                            <span className='border border-gray-300 w-12 h-7 flex justify-center items-center text-center rounded-sm p-2 bg-white'>
                                <img className='w-full' src={AMEXLOGO} alt={'American-Express'} />
                            </span>
                            
                        </span>
                    </div>
                    <div className="card-body p-3" id="payment-Method_body">
                        <div className="form-group mb-2 relative">
                            <input type="tel" name="card_number" placeholder="Card number" className="border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary" />
                            <span className="position-absolute lock-icon"><i className="fa fa-lock" aria-hidden="true"></i></span>
                        </div>
                        <div className="flex">
                            <div className="form-group w-1/2 pr-2">
                                <input type="text" name="cardholder_name" placeholder="Cardholder name" className="border border-light-gray text-md px-4 py-2 outline-none rounded-md focus:border-secondary w-full" />											
                            </div>
                            <div className='w-1/2 flex'>
                                <div className="form-group w-1/2 pr-2">
                                    <input type="text" name="date" placeholder="MM/YY" className="border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary" />
                                </div>
                                <div className="form-group w-1/2 relative">
                                    <input type="tel" name="CVV" placeholder="CVV" className="border border-light-gray text-md px-4 py-2 w-full outline-none rounded-md focus:border-secondary" />
                                    <a href="JavaScript:void(0); " className="position-absolute lock-icon faqIcon"><i className="fa fa-question-circle" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-item'>
                    <div className="card-footer flex justify-between items-center bg-light-gray p-2">
                        <div className="custom-control custom-radio flex justify-start items-center">
                            <input type="radio" id="paypalPay" name="radioPayment" className="custom-control-input" value="paypal" />
                            <label className='ml-2' htmlFor="paypalPay">
                                <img className='w-24' src={PAYPALLOGO} alt={'Paypal'} />
                            </label>
                        </div>
                        <span className="flex justify-between items-center gap-2">
                            <span className='border border-gray-300 w-12 h-7 flex justify-center items-center text-center rounded-sm p-2 bg-white'>
                                <img className='w-full' src={VISALOGO} alt={'visa'} />
                            </span>
                            <span className='border border-gray-300 w-12 h-7 flex justify-center items-center text-center rounded-sm p-2 bg-white'>
                                <img className='w-full' src={MASTERCARDLOGO} alt={'Mastercard'} />
                            </span>
                            <span className='border border-gray-300 w-12 h-7 flex justify-center items-center text-center rounded-sm p-2 bg-white'>
                                <img className='w-full' src={AMEXLOGO} alt={'American-Express'} />
                            </span>
                            
                        </span>
                    </div>
                </div> */}

                <div className='card-item'>
                    <div className="card-footer flex justify-between items-center bg-light-gray p-2">
                        <div className="custom-control custom-radio flex justify-start items-center">
                            <input 
                                type="radio" 
                                id={paymentMethod} 
                                name="radioPayment" 
                                className="custom-control-input" 
                                value={paymentMethod} 
                                checked={checked} 
                                onChange={handleSelect} 
                            />
                            <label className="font-medium ml-2" htmlFor={paymentMethod}>{title}</label>
                        </div>
                        <span className="flex justify-between items-center gap-2">
                            <span className='border border-gray-300 w-12 h-7 flex justify-center items-center text-center rounded-sm p-2 bg-white'>
                                <img className='w-full' src={VISALOGO} alt={'visa'} />
                            </span>
                            <span className='border border-gray-300 w-12 h-7 flex justify-center items-center text-center rounded-sm p-2 bg-white'>
                                <img className='w-full' src={MASTERCARDLOGO} alt={'Mastercard'} />
                            </span>
                            <span className='border border-gray-300 w-12 h-7 flex justify-center items-center text-center rounded-sm p-2 bg-white'>
                                <img className='w-full' src={AMEXLOGO} alt={'American-Express'} />
                            </span>
                            
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PaymentInfo
