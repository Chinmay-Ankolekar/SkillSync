import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestEnded = () => {
    let Navigate = useNavigate();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Test Ended
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          You have been disqualified from the test.
        </p>
        <p className="text-lg text-gray-600">
          The reasons might be:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-600 mt-2">
          <li>You changed the tab.</li>
          <li>You reloaded the page.</li>
          <button className='text-blue-500 underline' onClick={()=> {Navigate('/login')}}>Login</button>
        </ul>
      </div>
    </div>
  );
}

export default TestEnded;
