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