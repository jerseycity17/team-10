// ./src/components/SubscribeForm.js
import React from 'react';
const SubscribeForm = ({thanks, history}) => {
  if(!thanks) {
    return (
      <div className="form">
        <input type="text" placeholder="Enter email address!!" />
        <button onClick={() => history.push('/thanks')}>Subscribe Now</button>
      </div>
    )
  } else {
    return (
      <div className="form">
        <button onClick={() => history.push('/thirdpage')}>Next Page</button>
      </div>
    )
  }
}
export default SubscribeForm;
