import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { TOAST_OBJECT } from '../utils/constants';
import { toast } from 'react-toastify';
import logo from '../data/vroomvroom_logo.png';

const EditProductOption = ({
  currentRider,
  positiveButtonListener,
  negativeButtonListener,
}) => {
  const { currentColor, activeMenu } = useStateContext();
  const [rider, setRider] = useState({
    name: '',
    email: '',
    phone: '',
  });
  useEffect(() => {
    setRider(currentRider);
  }, [currentRider]);

  return (
    <div className="relative">
      <div
        className="bg-half-transparent w-screen fixed h-screen z-10 inset-0 overflow-y-auto"
        style={{
          left: activeMenu ? '18rem' : '0',
          paddingRight: activeMenu ? '18rem' : 0,
        }}
      >
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>
          <div
            class="inline-block relative overflow-hidden transform transition-all sm:align-middle sm:max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div class="rounded-2xl p-4 bg-white shadow dark:bg-gray-800">
                <div class="bg-white dark:bg-gray-800">
                  <div class="sm:px-6 lg:py-4 lg:px-8 z-10">
                    <div class="flex flex-col justify-between">
                      <div class="self-center">
                        <img
                          class="rounded-full w-24 h-24"
                          src={logo}
                          alt="user-profile"
                        />
                      </div>
                      <input
                        type="text"
                        autoComplete="off"
                        id="required-name"
                        class="mt-8 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        name="name"
                        value={rider?.name}
                        onChange={(e) =>
                          setRider({
                            ...rider,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter Name"
                      />
                      <input
                        type="text"
                        autoComplete="off"
                        id="required-email"
                        class="mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        name="email"
                        value={rider?.email}
                        onChange={(e) =>
                          setRider({
                            ...rider,
                            email: e.target.value,
                          })
                        }
                        placeholder="Enter Email Address"
                      />
                      <input
                        type="text"
                        autoComplete="off"
                        id="required-phone"
                        class="mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        name="phone"
                        value={rider?.phone}
                        onChange={(e) =>
                          setRider({
                            ...rider,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Enter Phone Number"
                      />
                      <div class="lg:flex-shrink-0 mt-8 space-x-4">
                        <button
                          style={{ borderColor: currentColor }}
                          type="button"
                          class="text-center h-10 w-32 py-2 px-4 border-2 shadow-sm text-sm text-gray-700 dark:text-gray-200 rounded-full focus:outline-none focus:ring-transparent"
                          onClick={negativeButtonListener}
                        >
                          Cancel
                        </button>
                        <button
                          style={{ backgroundColor: currentColor }}
                          type="button"
                          class="text-center h-10 w-32 py-2 px-4 border border-transparent shadow-sm text-sm text-white rounded-full"
                          onClick={() => {
                            positiveButtonListener(rider);
                          }}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductOption;
