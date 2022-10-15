# Redux with vanila JavaScript

In this repository we will learn how to implement redux with vanila JavaScript.


## Documentation

- Create Store 
- Initial state
- Action Function 
- Reducer Function
- dispatch action 
- bind action with bindActionCreators
- combine reducer with combineReducers
- update nested state using immer library

## How to create a store

```javascript
// importing redux form redux 
const redux = require('redux');
const createStore =redux.createStore;

// after creating initial state and reducer funtion paste it
const store = createStore(reducer);
```
## How to declare initial state 
```javascript
const initialState = {
    numofCakes:10,
}
```

## How to create  Action Function 
```javascript
// setting action type
const CAKE_ORDERED = 'CAKE_ORDERED';
// action of redux which return a object 
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}
```

## How to create  Reducer Function
```javascript
// reducer function take initial state and action and perform the action

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
```


## How to subscribe and unsubscribe and dispatch action
```javascript
// dispatch action and showing the value of updated state 

console.log('Initial state', store.getState())

const unsubscribe =store.subscribe(() => console.log('update state', store.getState()))

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
unsubscribe()
```

## How to bind action with bindActionCreators
```javascript
// import bindActionCreators . type this at the top of the page
const bindActionCreators = redux.bindActionCreators;

//  now follow this code block for bind action // binding actions
const action = bindActionCreators({ orderCake, restockCake }, store.dispatch)

// for output
action.orderCake();
action.orderCake();
action.restockCake(2);
```

## How to combined reducer using combine reducers

```javascript
// import combineReducers form redux 
// combine reducer
const combineReducers = redux.combineReducers;

// define type 

// setting action type
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// define action function 
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

// define separate state initial state for Cake and Icecream
const initialCakeState = {
  numofCakes:10,
}
const initialIcecreamState = {
  numofIcecream:20,
}

//  define separate reducer function 

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

//  combine both reducer with rootReducer

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
})

// passing rootReducer on store

const store = createStore(rootReducer);


//  for output 
console.log('Initial state', store.getState())

const unsubscribe =store.subscribe(() => console.log('update state', store.getState()))

const action = bindActionCreators({ orderCake, restockCake,orderIcecream,restockIcream }, store.dispatch)

action.orderCake();
action.orderCake();
action.restockCake(2);

action.orderIcecream();
action.orderIcecream();
action.restockIcream(2)
```



## How to updated nested state using immer library  
```javascript

const redux = require('redux')

// for updated nested state use immer library 
const produce = require('immer').produce

// initial state 
const initialState = {

    name: 'Vishwas',
    address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
    },
}

// type

const STREET_UPDATED = 'STREET_UPDATED'

// action
const updateStreet = (street) => { 

    return {
        type: STREET_UPDATED,
        payload: street,

    }
}

const reducer = (state = initialState, action) => { 

    switch (action.type) {
        case STREET_UPDATED:
            
            // old process to update value in state
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload,
            //     }

            // }


            // new process to update value in state using immer 
            return produce(state, draftState => { 
                draftState.address.street = action.payload;
            })
    
        default: {
            return state
        }
                
    }
}


// store

const store = redux.createStore(reducer)

console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState());

})

store.dispatch(updateStreet('456 Main St'))

unsubscribe()
```