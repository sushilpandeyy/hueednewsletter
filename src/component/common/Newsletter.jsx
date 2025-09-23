import { useState, useEffect } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load jQuery if not already loaded
    if (!window.jQuery) {
      const script = document.createElement('script');
      script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      script.onload = () => {
        loadMailchimpValidation();
      };
      document.head.appendChild(script);
    } else {
      loadMailchimpValidation();
    }
  }, []);

  const loadMailchimpValidation = () => {
    // Load Mailchimp validation script
    const validationScript = document.createElement('script');
    validationScript.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    validationScript.onload = () => {
      // Initialize Mailchimp validation
      if (window.jQuery) {
        window.jQuery(document).ready(function($) {
          window.fnames = new Array();
          window.ftypes = new Array();
          window.fnames[0]='EMAIL';
          window.ftypes[0]='email';
          window.fnames[1]='FNAME';
          window.ftypes[1]='text';
          window.fnames[2]='LNAME';
          window.ftypes[2]='text';
          window.fnames[3]='ADDRESS';
          window.ftypes[3]='address';
          window.fnames[4]='PHONE';
          window.ftypes[4]='phone';
          window.fnames[5]='BIRTHDAY';
          window.ftypes[5]='birthday';
          window.fnames[6]='COMPANY';
          window.ftypes[6]='text';
        });
      }
    };
    document.head.appendChild(validationScript);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('EMAIL', email);
      formData.append('b_f039ab124ecbe9e0893d12cc8_91ee2091ac', '');

      const response = await fetch(
        'https://gmail.us15.list-manage.com/subscribe/post?u=f039ab124ecbe9e0893d12cc8&id=91ee2091ac&f_id=006999e1f0',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }
      );

      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form">
        <div className="border-b border-black flex items-center justify-between">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="uppercase bg-transparent outline-none flex-1 py-2 required email"
            style={{fontFamily:"frankton-mono-bold"}}
            placeholder="EMAIL"
            disabled={status === 'loading'}
            name="EMAIL"
            id="mce-EMAIL"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="ml-2 disabled:opacity-50"
            name="subscribe"
            id="mc-embedded-subscribe"
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

        {/* Hidden honeypot field for bot protection */}
        <input
          type="text"
          name="b_f039ab124ecbe9e0893d12cc8_91ee2091ac"
          tabIndex="-1"
          defaultValue=""
          className="absolute left-[-5000px]"
          aria-hidden="true"
        />

        {/* Hidden response divs for Mailchimp validation */}
        <div id="mce-responses" className="clear foot" style={{display: 'none'}}>
          <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
          <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
        </div>
      </form>
    </div>
  );
};

export default Newsletter;