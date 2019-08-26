import React from 'react'

export default function Popup() {
   return (
      <div className="popup" id="popup">
         <div className="popup__content">
            <div className="popup__left">
               <img src="/static/img/nat-8.jpg" alt="Tour photo" className="popup__img" />
               <img src="/static/img/nat-9.jpg" alt="Tour photo" className="popup__img" />
            </div>
            <div className="popup__right">
               <a href="#book__form" className="popup__close">×</a>
               <h2 className="heading-secondary u-margin-bottom-small">Book successfully!</h2>
               <h3 className="heading-tertiary u-margin-bottom-small">To confirm booking, please check your email!
      </h3>
               <p style={{ color: 'red' }}>
                  * This is an app demo, and it is NOT REAL, but there can check the email to confirm this order.
               </p>
               <a href="#book__form" className="btn btn--green">CLOSE</a>
            </div>
         </div>
      </div>

   )
}
