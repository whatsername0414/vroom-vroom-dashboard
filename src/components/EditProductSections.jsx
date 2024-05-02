import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { TOAST_OBJECT } from '../utils/constants';
import { toast } from 'react-toastify';

const EditProductSection = ({
  currentSection,
  positiveButtonListener,
  negativeButtonListener,
}) => {
  const { currentColor, activeMenu, currentMode } = useStateContext();
  const [section, setSection] = useState();
  useEffect(() => {
    !section && setSection(currentSection);
  }, [section, currentSection]);

  return (
    <div className="relative">
      <div
        className="bg-half-transparent w-screen fixed h-screen z-20 inset-0 overflow-y-auto"
        style={{
          left: activeMenu ? '18rem' : '0',
          paddingRight: activeMenu ? '18rem' : 0,
        }}
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
              <div class="rounded-2xl p-4 bg-white shadow dark:bg-gray-800">
                <div class="bg-white dark:bg-gray-800 ">
                  <div class="sm:px-6 lg:py-4 lg:px-8 z-10">
                    <div className="flex flex-col">
                      <label
                        for="required-option-name"
                        class="text-gray-700 dark:text-gray-200 text-left text-sm"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        id="required-name"
                        class="rounded-lg border-transparent mt-2 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-xs text-start focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        name="name"
                        value={section?.name}
                        onChange={(e) =>
                          setSection({
                            ...section,
                            name: e.target.value,
                          })
                        }
                        placeholder="Product Section Name"
                      />
                    </div>
                    <div class="lg:flex-shrink-0 mt-8 space-x-4">
                      <button
                        style={{ backgroundColor: currentColor }}
                        type="button"
                        class="text-center h-10 w-32 py-2 px-4 border border-transparent shadow-sm text-sm text-white rounded-full"
                        onClick={() => {
                          if (
                            section.name === undefined ||
                            section.name === ''
                          ) {
                            toast.error(
                              'Section name cannot be empty!',
                              TOAST_OBJECT
                            );
                          } else {
                            positiveButtonListener({
                              ...section,
                              products: [],
                            });
                          }
                        }}
                      >
                        {currentSection ? 'Update' : 'Add'}
                      </button>
                      <button
                        style={{
                          borderColor: currentColor,
                          color:
                            currentMode === 'Light' ? currentColor : 'E5E7EB',
                        }}
                        type="button"
                        class="text-center h-10 w-32 py-2 px-4 border-2 shadow-sm text-sm text-gray-700 dark:text-gray-200 rounded-full focus:outline-none focus:ring-transparent"
                        onClick={negativeButtonListener}
                      >
                        Cancel
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

export default EditProductSection;
