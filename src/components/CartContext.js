import React, { useContext, useReducer } from "react";

const CarttStateContext = React.createContext();
const CartDispatchContext = React.createContext();

export const CartProvider = ({ children }) => {
  const initialState = [];

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: action.id,
            img: action.image,
            category: action.category,
            name: action.name,
            desc: action.desc,
            price: action.price,
            qty: action.qty,
            size: action.size,
            priceByOption: action.priceByOption,
          },
        ];
      case "INCREASE_QUANTITY":
        let updatedState = state.map((item, index) => {
          if (index === action.index) {
            console.log(item.qty);
            return {
              ...item,
              qty: parseInt(item.qty) + 1,
              price: parseInt(item.priceByOption) + parseInt(item.price),
            };
            // item.qty = qty + 1
          }
          return item;
        });
        return updatedState;
      case "DECREASE_QUANTITY":
        let updatedStateAterDecrement = state.map((item, index) => {
          if (index === action.index && item.qty > 1) {
            console.log(item.qty);
            return {
              ...item,
              qty: parseInt(item.qty) - 1,
              price: item.price - parseInt(item.priceByOption),
            };
            // item.qty = qty + 1
          }
          if (index === action.index && item.qty <= 1) {
            state.splice(action.index, 1);
            // return newArr;
          }
          return item;
        });
        return updatedStateAterDecrement;
      case "UPDATE_QTY":
        let updatedSize = state.map((item) => {
          if (item.id === action.id && item.size === action.size) {
            console.log(action.size);
            return {
              ...item,
              qty: parseInt(item.qty) + parseInt(action.qty),
              price: action.price + item.price,
            };
            // item.qty = qty + 1
          }
          return item;
        });
        return updatedSize;
      case "REMOVE_ITEM":
        let newState = [...state];
        newState.splice(action.index, 1);
        return newState;
      case "DROP":
        let newStateAfterCheckout = [];
        return newStateAfterCheckout;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <CartDispatchContext.Provider value={dispatch}>
        <CarttStateContext.Provider value={state}>
          {children}
        </CarttStateContext.Provider>
      </CartDispatchContext.Provider>
    </div>
  );
};

export const useCart = () => useContext(CarttStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
