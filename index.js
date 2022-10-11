const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;


// setting action type
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';



// action of redux which return a object 
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty=1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
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
        case CAKE_RESTOCKED:
            return {
                ...state,
                numofCakes: state.numofCakes + action.payload
            }
        default:
            return state
    }
}


const store = createStore(reducer);

console.log('Initial state', store.getState())

const unsubscribe =store.subscribe(() => console.log('update state', store.getState()))

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3))
// unsubscribe()

// binding actions
const action = bindActionCreators({ orderCake, restockCake }, store.dispatch)

action.orderCake();
action.orderCake();
action.restockCake(2);