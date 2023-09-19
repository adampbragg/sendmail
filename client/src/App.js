import { useState, useEffect } from 'react';
import sendmail from './dal';
import { toast } from 'bulma-toast';

function App() {
  const [message, setMessage] = useState({});
  const handleSubmitMail = async e => {
    e.preventDefault();
    const newMessage = { ...message };
    Array.from(e.target.elements).forEach(e => {
      if (e.dataset?.key) {
        newMessage[e.dataset.key] = e.value;
      }
    });
    const resp = await sendmail(newMessage);
    if (resp.error) {
      toast({
        duration: 4000,
        message: resp.error.message,
        type: 'is-danger'
      })
    } else {
      toast({
        duration: 4000,
        message: 'Your message is on its way.',
        type: 'is-success'
      })
      setMessage({});
    }
  }
  const handleMessageChange = e => {
    const fieldName = e.target.dataset.key;
    const newMessage = { ...message };
    newMessage[fieldName] = e.target.value;
    setMessage(newMessage)
  }
  return (
    <div className="container">
      <div className='section'>
        <header className="subtitle">Sendmail</header>
        <form onSubmit={handleSubmitMail}>
          <label className="label" htmlFor="toEmail">
            To Email:
            <input className='input' type="email" required={true} name="toEmail" data-key="to" onChange={handleMessageChange} value={message['to'] || ''} />
          </label>
          <label className="label" htmlFor="toName">
            To Name:
            <input className='input' type="text" required={true} name="toName" data-key="to_name" onChange={handleMessageChange} value={message['to_name'] || ''} />
          </label>
          <label className="label" htmlFor="fromEmail">
            From Email:
            <input className='input' type="email" required={true} name="fromEmail" data-key="from" onChange={handleMessageChange} value={message['from'] || ''} />
          </label>
          <label className="label" htmlFor="fromName">
            From Name:
            <input className='input' type="text" required={true} name="fromName" data-key="from_name" onChange={handleMessageChange} value={message['from_name'] || ''} />
          </label>
          <label className="label" htmlFor="subject">
            Subject:
            <input className='input' type="text" required={true} name="subject" data-key="subject" onChange={handleMessageChange} value={message['subject'] || ''} />
          </label>
          <label className="label" htmlFor="message">
            Message:
            <textarea className='textarea' required={true} name="message" data-key="text" onChange={handleMessageChange} value={message['text'] || ''}></textarea>
          </label>
          <input className='button' type="submit" value="Send Mail" />
        </form>
      </div>
    </div>
  );
}

export default App;
