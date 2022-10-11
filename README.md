
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