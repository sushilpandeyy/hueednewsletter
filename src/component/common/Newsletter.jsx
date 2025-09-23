import { useState, useRef } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    // Create a hidden iframe for form submission
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'mc-embedded-subscribe-frame';
    document.body.appendChild(iframe);

    // Create a form that submits to the iframe
    const form = document.createElement('form');
    form.action = 'https://gmail.us15.list-manage.com/subscribe/post?u=f039ab124ecbe9e0893d12cc8&id=91ee2091ac&f_id=006999e1f0';
    form.method = 'post';
    form.target = 'mc-embedded-subscribe-frame';
    form.style.display = 'none';

    // Add email field
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'EMAIL';
    emailInput.value = email;
    form.appendChild(emailInput);

    // Add honeypot field
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'b_f039ab124ecbe9e0893d12cc8_91ee2091ac';
    honeypot.value = '';
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-5000px';
    form.appendChild(honeypot);

    document.body.appendChild(form);
    form.submit();

    // Clean up and show success message
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="w-full max-w-sm">
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="border-b border-black flex items-center justify-between">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="uppercase bg-transparent outline-none flex-1 py-2"
            style={{fontFamily:"frankton-mono-bold"}}
            placeholder="EMAIL"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="ml-2 disabled:opacity-50"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 5L8 5M8 5L4 1M8 5L4 9" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </button>
        </div>

        {message && (
          <div className={`text-xs uppercase ${status === 'error' ? 'text-red-600' : 'text-green-600'}`} style={{fontFamily:"frankton-mono-bold"}}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Newsletter;