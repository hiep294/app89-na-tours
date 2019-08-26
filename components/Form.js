import React, { useReducer } from 'react'
import { AppConsumer } from '../AppProvider'

export const SEA_TOUR = {
   name: "The sea explorer",
   total: 297
}
export const FOREST_TOUR = {
   name: "The forest hiker",
   total: 497
}
export const SNOW_TOUR = {
   name: "The snow adventurer",
   total: 897
}

const initialState = {
   name: '',
   email: '',
   phone: '',
   address: '',
   error: {}
}

const reducer = (state, action) => {
   switch (action.type) {
      case 'CHANGE_NAME':
         return { ...state, name: action.payload }
      case 'CHANGE_EMAIL':
         return { ...state, email: action.payload }
      case 'CHANGE_PHONE':
         return { ...state, phone: action.payload }
      case 'CHANGE_ADDRESS':
         return { ...state, address: action.payload }
      case 'SET_ERROR':
         return { ...state, error: action.payload }
      case 'RESET_STATE':
         return initialState
      default: throw new Error()
   }
}

function Form({ value }) {
   const [state, dispatch] = useReducer(reducer, initialState)
   const typeTour = value.typeTour
   function onChangeType(e) {
      const parts = e.target.id.split('-')
      value.setTypeTour(parts[0])
      value.setTotal(parts[1])
   }

   function onSubmit() {
      // validate
      let error = {}
      for (var key in state) {
         if (!state[key]) {
            error[key] = `${key.substring(0, 1).toUpperCase() + key.substring(1)} is empty!`
         }
      }
      if (!typeTour) error.typeTour = 'Please choose a tour!'
      if (JSON.stringify(error) !== JSON.stringify({})) {
         dispatch({
            type: 'SET_ERROR',
            payload: error
         })
      } else {
         document.getElementById("loading-icon-create-order").style.opacity = 1 
         let clone = { ...state }
         delete clone.error
         value.createOrder(clone, dispatch)
      }
   }

   function onKeyUp(e){
      if(e.keyCode === 13) onSubmit()
   }

   const styleError = {
      color: 'red',
      fontSize: '1.2rem',
      fontWeight: '700',
      marginLeft: '2rem',
      marginTop: '.7rem',
      display: 'block'
   }

   return (
      <div className="book__form" id="book__form">

         <form action="#" className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="u-margin-bottom-medium">
               <h2 className="heading-secondary">
                  Start booking now
              </h2>
            </div>
            <div className="form__group">
               <input type="text" className="form__input"
                  placeholder="Full name" id="name" required
                  value={state.name || ''}
                  onChange={e => dispatch({
                     type: 'CHANGE_NAME',
                     payload: e.target.value
                  })}
               />
               {state.error.name ?
                  (
                     <span style={styleError}>{state.error.name}</span>
                  ) : (
                     <label htmlFor="name"
                        className="form__label"
                     >Full name </label>
                  )
               }

            </div>
            <div className="form__group">

               <input type="email" className="form__input" placeholder="Email" id="email" required
                  value={state.email || ''}
                  onChange={e => dispatch({
                     type: 'CHANGE_EMAIL',
                     payload: e.target.value
                  })}
               />
               {state.error.email ?
                  (
                     <span style={styleError}
                     >{state.error.email}</span>
                  ) : (
                     <label htmlFor="email"
                        className="form__label"
                     >Email address</label>
                  )
               }

            </div>
            <div className="form__group">
               <input type="text" className="form__input" placeholder="Phone Number" id="phone-number" required
                  value={state.phone || ''}
                  onChange={e => dispatch({
                     type: 'CHANGE_PHONE',
                     payload: e.target.value
                  })}
               />
               {state.error.phone ?
                  (
                     <span style={styleError}
                     >{state.error.phone}</span>
                  ) : (
                     <label htmlFor="phone-number"
                        className="form__label"
                     >Phone Number</label>
                  )
               }

            </div>
            <div className="form__group">
               <input type="text" className="form__input" placeholder="Address" id="address" required
                  value={state.address || ''}
                  onChange={e => dispatch({
                     type: 'CHANGE_ADDRESS',
                     payload: e.target.value
                  })}
                  onKeyUp={onKeyUp}
               />
               {state.error.address ?
                  (
                     <span style={styleError}
                     >{state.error.address}</span>
                  ) : (
                     <label htmlFor="address" className="form__label">Address</label>
                  )
               }

            </div>

            <div className="form__group u-margin-bottom-medium chosen-tour">

               <div className="form__radio-group">
                  <input type="radio" className="form__radio-input"
                     id={`${SEA_TOUR.name}-${SEA_TOUR.total}`} name="typeTour"
                     onChange={onChangeType}
                     checked={typeTour === SEA_TOUR.name}
                  />
                  <label htmlFor={`${SEA_TOUR.name}-${SEA_TOUR.total}`} className="form__radio-label">
                     <span className="form__radio-button" />
                     The sea explorer
                  </label>
               </div>
               <div className="form__radio-group">
                  <input type="radio" className="form__radio-input"
                     id={`${FOREST_TOUR.name}-${FOREST_TOUR.total}`} name="typeTour"
                     checked={typeTour === FOREST_TOUR.name}
                     onChange={onChangeType}
                  />
                  <label htmlFor={`${FOREST_TOUR.name}-${FOREST_TOUR.total}`} className="form__radio-label">
                     <span className="form__radio-button" />
                     The forest hiker
                  </label>
               </div>
               <div className="form__radio-group">
                  <input type="radio" className="form__radio-input"
                     id={`${SNOW_TOUR.name}-${SNOW_TOUR.total}`} name="typeTour"
                     checked={typeTour === SNOW_TOUR.name}
                     onChange={onChangeType}
                  />
                  <label htmlFor={`${SNOW_TOUR.name}-${SNOW_TOUR.total}`} className="form__radio-label">
                     <span className="form__radio-button" />
                     The snow adventurer
                  </label>
               </div>
               {typeTour ?
                  (
                     <div className="form__radio-group">
                        <label className="form__radio-label">
                           <span style={{
                              position: 'absolute',
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '3rem'
                           }}>
                              {typeTour === SEA_TOUR.name ? `$${SEA_TOUR.total}` : typeTour === FOREST_TOUR.name ? `$${FOREST_TOUR.total}` : typeTour === SNOW_TOUR.name ? `$${SNOW_TOUR.total}` : null}
                           </span>
                        </label>
                     </div>
                  ) : state.error.typeTour ? (
                     <div className="form__radio-group">
                        <label className="form__radio-label">
                           <span style={{ color: 'red' }}>
                              {state.error.typeTour}
                           </span>
                        </label>
                     </div>
                  ) : null
               }

            </div>
            <div className="form__group">
               <a
                  className="btn btn--green"
                  onClick={onSubmit}
               >
                  Book now!
                  <span id="loading-icon-create-order" className="ml-3 mb-2" style={{ marginTop: '0.15rem', marginLeft: '0.5rem', color: '#fff', opacity: '0', transition: 'all 0.3s', position: "absolute" }}>
                     <i className="fas fa-spinner fa-lg fa-pulse" />
                  </span>
               </a>
            </div>
         </form>
      </div>
   )
}

export default function Index() {
   return (
      <AppConsumer>
         {value => <Form value={value} />}
      </AppConsumer>
   )
}
