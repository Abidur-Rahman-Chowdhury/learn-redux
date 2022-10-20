const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
// to use middleware need middleware function

const applyMiddleware = redux.applyMiddleware;


// applying middleware import redux logger and create logger 


const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()

// combine reducer

const combineReducers = redux.combineReducers;


// setting action type
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';



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

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIcream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}
// initial state
// const initialState = {
//   numofCakes: 10,
//   numofIcecream: 20,
// }

const initialCakeState = {
  numofCakes:10,
}
const initialIcecreamState = {
  numofIcecream:20,
}

// (prevoiuseState, action ) => newState

const cakeReducer = (state = initialCakeState, action) => { 

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
const iceCreamReducer = (state = initialIcecreamState, action) => { 

    switch(action.type){
     
        case ICECREAM_ORDERED:
            return {
                ...state,
                numofIcecream: state.numofIcecream - action.payload
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numofIcecream: state.numofIcecream + action.payload
            }
        default:
            return state
    }
}

//  combine reducer 
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
})
// passing middle ware function into store and pass logger as parameter 
const store = createStore(rootReducer, applyMiddleware(logger));

console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(() => {})

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3))
// unsubscribe()

// binding actions
const action = bindActionCreators({ orderCake, restockCake,orderIcecream,restockIcream }, store.dispatch)

action.orderCake();
action.orderCake();
action.restockCake(2);

action.orderIcecream();
action.orderIcecream();
action.restockIcream(2)

