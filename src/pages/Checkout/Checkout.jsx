import React from 'react';
import './Checkout.scss';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const Checkout = () => {
    const items = useSelector((state) => state?.items);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [name, setName] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [showCoupon, setShowCoupon] = useState(false);
    const [coupon, setCoupon] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDeliveryMethodChange = (e) => {
        setDeliveryMethod(e.target.value);
    };

    const handleCouponCheckboxChange = () => {
        setShowCoupon(!showCoupon);
        if (!showCoupon) {
            setCoupon('');
        }
    };

    const handleCouponChange = (e) => {
        setCoupon(e.target.value);
    };

    const handleSubmit = () => {
        if (!email.includes('@')) {
            setEmailError('Email must contain @');
            return;
        }
        alert('Submited')
        handleReset()
        setEmailError('');
    };

    const handleReset = () => {
        setName('');
        setEmail('');
        setDeliveryMethod('');
        setShowCoupon(false);
        setCoupon('');
    };

    return (
        <div>
            <div className='container-check'>
                <div className='check'>
                    <div className='check-block'>
                        <div className='check-item'>
                            <h2>Ingredient info:</h2>
                            <div className='check-item-products'>
                                {items.items.map((item) => {
                                    if (item.count > 0) {
                                        return (
                                            <div key={item.id}>
                                                <h3>{item.name}</h3>
                                                <img src={item.img} alt={item.name}/>
                                                <p>{item.count}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <div className='check-item-form'>
                                <h2>Checkout info:</h2>
                                <div className='check-item-form__name'>
                                    <span>Name:</span>
                                    <input type='text' placeholder='Name' value={name} onChange={handleNameChange}/>
                                </div>
                                <div className="check-item-form__mail">
                                    <span>Email:</span>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <p>{emailError}</p>
                                </div>

                                <div/>
                                <div className='check-item-form__method'>
                                    <span>Choose delivery method: </span>
                                    <select value={deliveryMethod} onChange={handleDeliveryMethodChange}>
                                        <option value=''>Select delivery method</option>
                                        <option value='Delivery'>Delivery</option>
                                        <option value='Local pickup'>Local pickup</option>
                                    </select>
                                </div>
                                <div className='check-item-form__couponCheck'>
                                    <span>Do you have a coupon code: </span>
                                    <input type='checkbox' onChange={handleCouponCheckboxChange}/>
                                </div>
                                {showCoupon && (
                                    <div className='check-item-form__coupon'>
                                        <span>Coupon: </span>
                                        <input type='text' placeholder='Coupon' value={coupon}
                                               onChange={handleCouponChange}/>
                                    </div>
                                )}
                                <div className='check-item-form__btn'>
                                    <button onClick={handleReset}>RESET</button>
                                    <button onClick={handleSubmit}>SUBMIT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
