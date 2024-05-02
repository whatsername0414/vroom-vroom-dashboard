import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Header = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className=" mx-10 p-2 flex justify-between">
      <p className="text-3xl font-extrabold justify-self-start dark:text-gray-200 tracking-tight text-slate-900">
        {title}
      </p>
      <button
        type="button"
        className="self-end inline-flex justify-center justify-between pr-8 items-center text-center h-10 w-32 py-2 px-4 bg-gray-700 dark:bg-gray-800 hover:bg-black shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft />
        Back
      </button>
    </div>
  );
};

export default Header;
