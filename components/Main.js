import React from 'react'
import Form, { SEA_TOUR, FOREST_TOUR, SNOW_TOUR } from './Form'
import { AppConsumer } from '../AppProvider'

function MainMain({ value }) {
   function chooseTypeTour(e) {
      const parts = e.target.name.split('-')
      value.setTypeTour(parts[0])
      value.setTotal(parts[1])
   }
   return (
      <main>
         <section className="section-about">
            <div className="u-center-text u-margin-bottom-big">
               <h2 className="heading-secondary">
                  Exciting tours for adventurous people
      </h2>
            </div>
            <div className="row">
               <div className="col-1-of-2">
                  <h3 className="heading-tertiary u-margin-bottom-small">You're going to fall in love with nature</h3>
                  <p className="paragraph">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero
                     repellat quis consequatur
                     ducimus quam nisi exercitationem omnis earum qui.
        </p>
                  <h3 className="heading-tertiary u-margin-bottom-small">Live adventures like you never have before</h3>
                  <p className="paragraph">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nulla deserunt voluptatum nam.
        </p>
                  <a href="#" className="btn-text">Learn more →</a>
               </div>
               <div className="col-1-of-2">
                  <div className="composition">
                     <img srcSet="/static/img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w" sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px" alt="Photo 1" className="composition__photo composition__photo--p1" src="/static/img/nat-1-large.jpg" />
                     <img srcSet="/static/img/nat-2.jpg 300w, img/nat-2-large.jpg 1000w" sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px" alt="Photo 2" className="composition__photo composition__photo--p2" src="/static/img/nat-2-large.jpg" />
                     <img srcSet="/static/img/nat-3.jpg 300w, img/nat-3-large.jpg 1000w" sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px" alt="Photo 3" className="composition__photo composition__photo--p3" src="/static/img/nat-3-large.jpg" />
                     {/*
                      <img src="img/nat-1-large.jpg" alt="Photo 1" class="composition__photo composition__photo--p1">
                      <img src="img/nat-2-large.jpg" alt="Photo 2" class="composition__photo composition__photo--p2">
                      <img src="img/nat-3-large.jpg" alt="Photo 3" class="composition__photo composition__photo--p3">
                      */}
                  </div>
               </div>
            </div>
         </section>
         <section className="section-features">
            <div className="row">
               <div className="col-1-of-4">
                  <div className="feature-box">
                     <i className="feature-box__icon icon-basic-world" />
                     <h3 className="heading-tertiary u-margin-bottom-small">Explore the world</h3>
                     <p className="feature-box__text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
          </p>
                  </div>
               </div>
               <div className="col-1-of-4">
                  <div className="feature-box">
                     <i className="feature-box__icon icon-basic-compass" />
                     <h3 className="heading-tertiary u-margin-bottom-small">Meet nature</h3>
                     <p className="feature-box__text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
          </p>
                  </div>
               </div>
               <div className="col-1-of-4">
                  <div className="feature-box">
                     <i className="feature-box__icon icon-basic-map" />
                     <h3 className="heading-tertiary u-margin-bottom-small">Find your way</h3>
                     <p className="feature-box__text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
          </p>
                  </div>
               </div>
               <div className="col-1-of-4">
                  <div className="feature-box">
                     <i className="feature-box__icon icon-basic-heart" />
                     <h3 className="heading-tertiary u-margin-bottom-small">Live a healthier life</h3>
                     <p className="feature-box__text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
          </p>
                  </div>
               </div>
            </div>
         </section>
         <section className="section-tours">
            <div className="u-center-text u-margin-bottom-big">
               <h2 className="heading-secondary" id="section-tours">
                  Our tours
      </h2>
            </div>
            <div className="row">
               <div className="col-1-of-3">
                  <div className="card">
                     <div className="card__side card__side--front">
                        <div className="card__picture card__picture--1">
                           &nbsp;
            </div>
                        <h4 className="card__heading">
                           <span className="card__heading-span card__heading-span--1">The Sea Explorer</span>
                        </h4>
                        <div className="card__details">
                           <ul>
                              <li>3 day tours</li>
                              <li>Up to 30 people</li>
                              <li>2 tour guides</li>
                              <li>Sleep in cozy hotels</li>
                              <li>Difficulty: easy</li>
                           </ul>
                        </div>
                     </div>
                     <div className="card__side card__side--back card__side--back-1">
                        <div className="card__cta">
                           <div className="card__price-box">
                              <p className="card__price-only">Only</p>
                              <p className="card__price-value">$297</p>
                           </div>
                           <a href="#book__form"
                              name={`${SEA_TOUR.name}-${SEA_TOUR.total}`}
                              className="btn btn--white"
                              onClick={chooseTypeTour}
                           >Book now!</a>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-1-of-3">
                  <div className="card">
                     <div className="card__side card__side--front">
                        <div className="card__picture card__picture--2">
                           &nbsp;
            </div>
                        <h4 className="card__heading">
                           <span className="card__heading-span card__heading-span--2">The Forest Hiker</span>
                        </h4>
                        <div className="card__details">
                           <ul>
                              <li>7 day tours</li>
                              <li>Up to 40 people</li>
                              <li>6 tour guides</li>
                              <li>Sleep in provided tents</li>
                              <li>Difficulty: medium</li>
                           </ul>
                        </div>
                     </div>
                     <div className="card__side card__side--back card__side--back-2">
                        <div className="card__cta">
                           <div className="card__price-box">
                              <p className="card__price-only">Only</p>
                              <p className="card__price-value">$497</p>
                           </div>
                           <a href="#book__form"
                              className="btn btn--white"
                              name={`${FOREST_TOUR.name}-${FOREST_TOUR.total}`}
                              onClick={chooseTypeTour}
                           >Book now!</a>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-1-of-3">
                  <div className="card">
                     <div className="card__side card__side--front">
                        <div className="card__picture card__picture--3">
                           &nbsp;
            </div>
                        <h4 className="card__heading">
                           <span className="card__heading-span card__heading-span--3">The Snow Adventurer</span>
                        </h4>
                        <div className="card__details">
                           <ul>
                              <li>5 day tours</li>
                              <li>Up to 15 people</li>
                              <li>3 tour guides</li>
                              <li>Sleep in provided tents</li>
                              <li>Difficulty: hard</li>
                           </ul>
                        </div>
                     </div>
                     <div className="card__side card__side--back card__side--back-3">
                        <div className="card__cta">
                           <div className="card__price-box">
                              <p className="card__price-only">Only</p>
                              <p className="card__price-value">$897</p>
                           </div>
                           <a href="#book__form"
                              className="btn btn--white"
                              name={`${SNOW_TOUR.name}-${SNOW_TOUR.total}`}
                              onClick={chooseTypeTour}
                           >Book now!</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* <div className="u-center-text u-margin-top-huge">
               <a href="#" className="btn btn--green">Discover all tours</a>
            </div> */}
         </section>
         <section className="section-stories">
            <div className="bg-video">
               <video className="bg-video__content" autoPlay muted loop>
                  <source src="/static/img/video.mp4" type="video/mp4" />
                  <source src="/static/img/video.webm" type="video/webm" />
                  Your browser is not supported!
      </video>
            </div>
            <div className="u-center-text u-margin-bottom-big" id="stories">
               <h2 className="heading-secondary">
                  We make people genuinely happy
      </h2>
            </div>
            <div className="row">
               <div className="story">
                  <figure className="story__shape">
                     <img src="/static/img/nat-8.jpg" alt="Person on a tour" className="story__img" />
                     <figcaption className="story__caption">Mary Smith</figcaption>
                  </figure>
                  <div className="story__text">
                     <h3 className="heading-tertiary u-margin-bottom-small">I had the best week ever with my family</h3>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero
                        repellat quis consequatur
                        ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
                        repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.
          </p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="story">
                  <figure className="story__shape">
                     <img src="/static/img/nat-9.jpg" alt="Person on a tour" className="story__img" />
                     <figcaption className="story__caption">Jack Wilson</figcaption>
                  </figure>
                  <div className="story__text">
                     <h3 className="heading-tertiary u-margin-bottom-small">WOW! My life is completely different now</h3>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero
                        repellat quis consequatur
                        ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
                        repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.
          </p>
                  </div>
               </div>
            </div>
            {/* <div className="u-center-text u-margin-top-huge">
               <a href="#" className="btn-text">Read all stories →</a>
            </div> */}
         </section>
         <section className="section-book">
            <div className="row">
               <div className="book">
                  <Form />
               </div>
            </div>
         </section>
      </main>
   )
}

export default function Main() {
   return (
      <AppConsumer>
         {value => <MainMain value={value} />}
      </AppConsumer>
   )
}


