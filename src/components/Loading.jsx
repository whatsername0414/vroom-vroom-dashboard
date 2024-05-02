import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import loading from '../data/loading.gif';

const Loading = () => {
  const { activeMenu } = useStateContext();
  return (
    <div class="relative">
      <div
        class="bg-half-transparent w-screen fixed h-screen z-10 inset-0 overflow-y-auto"
        style={{ left: activeMenu ? '18rem' : '0' }}
      >
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
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
              <div
                class="rounded-2xl p-8 dark:bg-gray-800 bg-white shadow"
                style={{ marginRight: activeMenu ? '18rem' : '0' }}
              >
                <div class="p-4">
                  <div class="text-center mb-4 opacity-90">
                    <img
                      class="h-12 w-12 mt-4 m-auto text-green-500"
                      src={loading}
                      alt="Loading"
                    />
                  </div>
                  <div class="text-center">
                    <p class="text-gray-600 dark:text-gray-100 text-md py-2 px-6">
                      Loading...
                    </p>
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

export default Loading;
