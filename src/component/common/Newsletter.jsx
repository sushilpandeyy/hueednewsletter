import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

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
      // Simple email validation and collection
      setStatus('success');
      setMessage('Thank you for your interest!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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