import {createSlice} from "@reduxjs/toolkit";


const ItemSlice = createSlice({
    name: 'item',
    initialState: {
        total: 0,
        items: [
            {
                id: 0,
                name: 'Feta',
                count: 0,
                price: 1.5,
                img: 'https://hw-routing-project.vercel.app/images/Feta.jpg',
                status: false
            },
            {
                id: 1,
                name: 'Cold cuts',
                count: 0,
                price: 3,
                img: 'https://hw-routing-project.vercel.app/images/ColdCuts.jpg',
                status: false
            },
            {
                id: 2,
                name: 'Mozzarella',
                count: 0,
                price: 1,
                img: 'https://hw-routing-project.vercel.app/images/Mozzarella.jpg',
                status: false
            },
            {
                id: 3,
                name: 'Pepperoni',
                count: 0,
                price: 2.5,
                img: 'https://hw-routing-project.vercel.app/images/Pepperoni.jpg',
                status: false
            },
            {
                id: 4,
                name: 'Spices',
                count: 0,
                price: 0.25,
                img: 'https://hw-routing-project.vercel.app/images/Spices.jpg',
                status: false
            },
            {
                id: 5,
                name: 'Swiss cheese',
                count: 0,
                price: 0.25,
                img: 'https://hw-routing-project.vercel.app/images/SwissCheese.jpg',
                status: false
            },
            {
                id: 6,
                name: 'Vegetables',
                count: 0,
                price: 0.75,
                img: 'https://hw-routing-project.vercel.app/images/Vegetables.jpg',
                status: false
            },],
        pizza: [],
    },
    reducers: {
        increment(state, action) {
            state.items = state.items.map(item =>
                item.id === action.payload.id ? {...item, count: item.count + 1, status: true} : item
            );
            state.total = state.items.reduce((total, item) => {
                return total + item.count * item.price;
            }, 0);
        },
        decrement(state, action) {
            state.items = state.items.map(item =>
                item.id === action.payload.id ? {
                    ...item,
                    count: item.count > 0 ? item.count - 1 : 0,
                    status: item.count > 1
                } : item,
            );
            state.total = state.items.reduce((total, item) => {
                return total + item.count * item.price;
            }, 0);
        },
        reset(state, action) {
            state.items = state.items.map((item) => ({...item, count: 0, status: false}))
            state.total = 0
        },
        saveItem(state, action) {
            return {
                ...state,
                pizza: [
                    ...state.pizza,
                    {
                        id: action.payload.id,
                        items: action.payload.items
                    },
                ],
            };
        },
        loadItemsNew(state,action){
            return action.payload.items[0].items
        }
    }
})
export const {loadItemsNew,increment, decrement, reset, saveItem} = ItemSlice.actions
export default ItemSlice.reducer