import React, { useState } from 'react'
import Layout from '../../components/admin/layout'
import { FEEDBACK } from '../../components/admin/layout/pageTypes'
import feedbackConn from '../../api/feedback/conn'

export default function Users() {
   const [name, setName] = useState("")
   const [text, setText] = useState("")
   const [error, setError] = useState("")
   const [link, setLink] = useState("")

   async function onSubmit() {
      if (!text) {
         setError('Sr, feedback required!')
         return
      }
      const res = await feedbackConn.createFeedback({ name, text })
      if (res.data.createFeedback.codeLink) {
         setLink(res.data.createFeedback.codeLink)
         setName("")
         setText("")
      }
   }
   return (
      <Layout name={FEEDBACK} title="User">
         <div>
            <div className="w-50">
               <p>To get full <b>SOURCE CODE</b>, please leave your recommendation of improvements, feedback,... <br />( What do you like in this app ? )<br />( What do you expect more in this current version? UX, UI, ... )</p>
               <div className="input-group flex-nowrap mb-2">
                  <input type="text" className="form-control" placeholder="Name"
                     aria-label="Name"
                     aria-describedby="addon-wrapping"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div className="input-group mb-2">
                  <textarea className="form-control"
                     aria-label="Text"
                     placeholder="Text"
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                  />
               </div>
               <button onClick={onSubmit}>Send
               </button><span className="ml-2" style={{ color: 'red' }}>
                  {error}
               </span>
            </div>
            {link ? (
               <div>
                  <p className="mb-1">
                     Thank you for the feedback! Here is the source code:{' '}
                     <a href={`${link}`} target="_blank">LINK</a>
                  </p>
                  <p>(Come back here again if you find any bug or would like to contribute a better way of code design or more feedback.)</p>
               </div>
            ) : null}
         </div>
         <div style={{
            position: 'absolute',
            bottom: '0',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            borderLeft: '6px solid #475993',
            paddingBottom: '1rem',

         }}
            className="pt-1 pb-1 pl-2">
            <div className="pt-1">
               <img src="/static/img/gmail.png" alt="" width="24px"
                  style={{ marginBottom: '0.2rem' }}
               />&nbsp;quanghiep294@gmail.com&nbsp;&nbsp;&nbsp;
               <img src="/static/img/facebook.png" alt="" width="24px"
                  style={{ marginBottom: '0.2rem' }}
               />&nbsp;http://fb.com/hiep294
            </div>
         </div>
      </Layout>
   )
}

Users.getInitialProps = async ({ res }) => {
   if (typeof window === 'undefined') res.redirect('/admin')
}
