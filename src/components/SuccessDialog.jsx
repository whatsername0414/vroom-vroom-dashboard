import React from 'react';
import { useDispatch } from 'react-redux';

const SuccessDialog = ({ message, buttonTitle }) => {
  const dispatch = useDispatch();
  return (
    <div class="relative">
      <div class="bg-half-transparent w-screen fixed h-screen z-10 inset-0 overflow-y-auto ">
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
              <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto">
                <div class="w-full h-full text-center">
                  <div class="flex h-full flex-col justify-between">
                    <svg
                      class="h-12 w-12 mt-4 m-auto text-green-500"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <p class="text-gray-600 dark:text-gray-100 text-md py-2 px-6">
                      {message}
                    </p>
                    <div class="flex items-center justify-between gap-4 w-full mt-8">
                      <button
                        type="button"
                        class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
                        onClick={() => dispatch({ type: 'RESET' })}
                      >
                        {buttonTitle}
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
  );
};

export default SuccessDialog;
