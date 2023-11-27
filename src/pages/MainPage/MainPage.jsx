import './MainPage.scss';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, loadItemsNew, reset, saveItem} from "../../store/reducers/useReducer.js";
import {useEffect, useRef, useState} from "react";

const MainPage = () => {
    const [random, setRandom] = useState('')
    const [loadItems, setLoadItems] = useState('')
    const item = useSelector(state => state?.items.pizza)
    const ref = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const load = useRef(null)
    const order = useRef(null)
    const dispatch = useDispatch()
    console.log(item)
    let items = useSelector(state => state?.items)
    const inc = (id) => {
        dispatch(increment({id: id}))
    }
    const dec = (id) => {
        dispatch(decrement({id: id}))
    }
    const resetBtn = () => {
        dispatch(reset())
    }
    const loadItem = () => {
        const findItem = item.filter((item) => item.id === loadItems)
        console.log(findItem)
        dispatch(loadItemsNew({items: findItem}))
        load.current.style.display = 'none'
    }
    const showLoad = () => {
        load.current.style.display = 'block'
    }
    const hideLoad = () => {
        load.current.style.display = 'none'
    }
    const showOrder = () => {
        order.current.style.display = 'block'
    }
    const hideOrder = () => {
        order.current.style.display = 'none'
    }
    const saveItems = () => {
        if (items.total > 0) {
            let randomAlphabet = ''
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            for (let i = 0; i < 10; i++) {
                randomAlphabet += characters[Math.floor(Math.random() * characters.length)]
            }
            setRandom(randomAlphabet)
            dispatch(saveItem({id: randomAlphabet, items: items}))
            ref3.current.style.display = 'block'
            setTimeout(() => ref3.current.style.display = 'none', 5000)
        }
        dispatch(reset())
    }
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    useEffect(() => {
        if (items.total > 0) {
            ref.current.style.background = 'blue'
            ref.current.style.color = 'white'
            ref2.current.style.color = 'white'
            ref2.current.style.background = 'blue'
        } else {
            ref.current.style.background = 'rgba(0, 0, 0, 0.12)'
            ref.current.style.color = 'rgba(0, 0, 0, 0.12)'
            ref2.current.style.color = 'rgba(0, 0, 0, 0.12)'
            ref2.current.style.background = 'rgba(0, 0, 0, 0.12)'
        }
    }, [items]);
    return (
        <div className='main'>
            <div className='order' ref={order}>
                <div className='order-block'>
                    <div className='order-block-item'>
                        <h2>Your Order</h2>
                        <p>The pizza has the following ingredients:</p>
                        <ul>
                            {items.items.map((item) => {
                                if (item.count > 0) {
                                    return <li key={item.id}>{item.name}:{item.count}</li>;
                                }
                            })}
                        </ul>
                        <h3>Total price: {items.total} $</h3>
                        <div className='order-block-btn'>
                            <button onClick={hideOrder}>CANCEL</button>
                            <Link to={'/checkout'}>CONTINUE</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'main-left'}>
                <h3>Your Pizza</h3>
                <div className='main-left-img'>
                    <div className="img-block"><img src='https://hw-routing-project.vercel.app/images/Testa.jpg' alt="img"/>
                    </div>
                    {items.items.map((item) => {
                        if (item.status) {
                            return <div className="img-block" key={item.id}><img src={item.img} alt="img"/>
                            </div>
                        }
                    })}
                </div>
            </div>
            <div className={'main-right'}>
                <div className="main-right-head">
                    <h3>Your pizza</h3>
                    <span>{items.total} $</span>
                    <button onClick={resetBtn}>Reset pizza</button>
                </div>
                <div className="main-right-block">
                    <ul>
                        {items.items.map((item) => (
                            <li key={item.id}>
                                <div>
                                    <p>{item.name}</p>
                                    <p>{item.price} $</p>
                                </div>
                                <div>
                                    <button onClick={() => dec(item.id)}>-</button>
                                    <input type="number" max="10" min="0" step="1" readOnly value={item.count}/>
                                    <button onClick={() => inc(item.id)}>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="main-right-block-total">
                    <span>Total: {items.total}$</span>
                    <span></span>
                </p>
                <div className="main-right-block-btn">
                    <button onClick={saveItems} ref={ref}>save pizza</button>
                    <button onClick={showOrder} ref={ref2}>checkout</button>
                </div>
                <div className="main-right-block-load">
                    <button onClick={showLoad}>Load</button>
                </div>
                <div ref={ref3} className='main-right-block-random'>
                    <p>Your pizza configuration has been saved.</p>
                    <p>
                        Your pizza number is :
                        <span onClick={() => copyToClipboard(random)}>{random}</span>
                    </p>
                </div>
            </div>
            <div className='load' ref={load}>
                <div className='load-block'>
                    <div className='load-block-item'>
                        <span onClick={hideLoad} className='load-close'>X</span>
                        <p>Load pizza using a configuration number: </p>
                        <div className='load-block-submit'>
                            <input type="text" onChange={(e) => setLoadItems(e.target.value)}/>
                            <button onClick={loadItem}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MainPage;
