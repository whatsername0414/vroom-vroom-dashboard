import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const ConfirmDialog = ({
  title,
  message,
  negativeButtonTitle,
  positiveButtonTitle,
  negativeButtonListener,
  positiveButtonListener,
}) => {
  const { activeMenu, currentColor } = useStateContext();
  return (
    <div class="relative">
      <div
        class="bg-half-transparent w-screen fixed h-screen z-20 inset-0 overflow-y-auto"
        style={{
          left: activeMenu ? '18rem' : '0',
          paddingRight: activeMenu ? '6rem' : '0',
        }}
      >
        <div class="flex items-center justify-center min-h-screen pt-4 text-center sm:block sm:p-0">
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
                class="rounded-2xl p-4 w-80 dark:bg-gray-800 bg-white shadow"
                style={{ marginRight: activeMenu ? '18rem' : '0' }}
              >
                <div class="p-4 text-xl text-start">
                  <p>{title}</p>
                  <div
                    className="w-6 h-1 border-gray-200 border-b-2 mb-2"
                    style={{ borderColor: currentColor }}
                  ></div>
                  <p class="text-gray-600 dark:text-gray-100 text-sm mt-4 mb-8">
                    {message}
                  </p>
                  <div className="flex text-sm gap-4">
                    <button
                      style={{ backgroundColor: currentColor }}
                      type="button"
                      className="text-center h-10 w-full py-2 px-4 border border-transparent shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-transparent"
                      onClick={positiveButtonListener}
                    >
                      {positiveButtonTitle}
                    </button>
                    <button
                      style={{ borderColor: currentColor, color: currentColor }}
                      type="button"
                      className="text-center h-10 w-full py-2 px-4 border-2 shadow-sm text-sm rounded-full text-white focus:outline-none focus:ring-transparent"
                      onClick={negativeButtonListener}
                    >
                      {negativeButtonTitle}
                    </button>
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

export default ConfirmDialog;
