const redux = require('redux');

const createStore =redux.createStore


const CAKE_ORDERED = 'CAKE_ORDERED';


// action of redux which return a object 
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}
// store 
const initialState = {
    numofCakes:10,
}

// (prevoiuseState, action ) => newState

const reducer = (state = initialState, action) => { 

    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numofCakes: state.numofCakes - 1
            }
        default:
            return state
    }
}


const store = createStore(reducer);

console.log('Initial state', store.getState())

const unsubscribe =store.subscribe(() => console.log('update state', store.getState()))

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
unsubscribe()