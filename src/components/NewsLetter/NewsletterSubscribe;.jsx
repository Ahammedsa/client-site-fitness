import React from 'react';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const NewsletterSubscribe = () => {  
  const { user, loading } = useAuth(); 
  const naviGate = useNavigate()

  // Handle login check
  const handleLoginCheck = (e) => {
    e.preventDefault(); 

    if (!user) {
      console.log('User not logged in. Redirect to login.');
      naviGate('/login')
    } else {
      console.log('User is logged in:', user);
    
    }
  };

  return (
    <div className="container px-6 py-10 mx-auto flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-md  mx-auto max-w-md ">
        <h2 className="text-2xl font-semibold text-center mb-6">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 text-center mb-6">
          Get the latest updates, offers, and news delivered straight to your inbox.
        </p>
        <form className="space-y-4" onSubmit={handleLoginCheck}>
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Checkbox for terms and conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="accept-terms"
              className="checkbox mr-2 border-gray-300 rounded"
            />
            <label htmlFor="accept-terms" className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="underline text-blue-600">
                terms and conditions
              </a>.
            </label>
          </div>

          {/* Submit button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;
