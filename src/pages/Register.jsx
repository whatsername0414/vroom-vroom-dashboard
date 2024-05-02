import React from 'react';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

import { useNavigate } from 'react-router-dom';
import logo from '../data/vroomvroom_logo.png';

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-10 flex-wrap justify-center">
      <div className="flex flex-col justify-between mt-16 p-6 rounded-2xl shadow-md">
        <div className="self-center">
          <img
            className="rounded-full w-24 h-24"
            src={logo}
            alt="user-profile"
          />
        </div>
        <div className="w-72 mt-4">
          <TextBoxComponent
            cssClass="e-outline"
            placeholder="Name"
            floatLabelType="Auto"
          />
        </div>
        <div className="w-72 mt-4">
          <TextBoxComponent
            cssClass="e-outline"
            placeholder="Email"
            floatLabelType="Auto"
            type="email"
          />
        </div>
        <div className="w-72 mt-4">
          <TextBoxComponent
            cssClass="e-outline"
            placeholder="Password"
            floatLabelType="Auto"
            type="password"
          />
        </div>
        <div className="w-72 mt-4">
          <TextBoxComponent
            cssClass="e-outline"
            placeholder="Confirm Password"
            floatLabelType="Auto"
            type="password"
          />
        </div>
        <div className="w-72 mt-4 flex flex-row">
          <p className="dark:text-gray-200 text-gray-700 text-center">
            Already have an account?
          </p>
          <a
            className="text-[#A30000] ml-2 hover:drop-shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            href="/login"
          >
            Login
          </a>
        </div>
        <button
          type="button"
          style={{ backgroundColor: '#A30000' }}
          className="text-1xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-1 mt-4"
        >
          Register
        </button>
      </div>
    </div>
  );
};
export default Register;
