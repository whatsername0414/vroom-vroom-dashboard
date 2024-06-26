import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { TOAST_OBJECT } from '../utils/constants';
import { toast } from 'react-toastify';

const EditProductOption = ({
  currentOption,
  newSection,
  positiveButtonListener,
  negativeButtonListener,
}) => {
  const { currentColor, activeMenu } = useStateContext();
  const [checked, setChecked] = useState(false);
  const [optionSection, setOptionSection] = useState({
    name: '',
    required: false,
    choices: [],
  });
  const [option, setOption] = useState({
    name: '',
    additional_price: '',
  });
  useEffect(() => {
    setOption(currentOption);
  }, [currentOption, checked]);

  const getOptionSection = () => {
    return {
      name: optionSection.name,
      required: checked,
      options: [option],
    };
  };

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
                <div class="bg-white dark:bg-gray-800 ">
                  <div class="sm:px-6 lg:py-4 lg:px-8 z-10">
                    {newSection && (
                      <div className="flex flex-col ">
                        <div class="flex justify-start mb-3 items-center">
                          <span class="text-gray-700 dark:text-gray-200 text-sm">
                            Required
                          </span>
                          <div class="relative inline-block w-8 ml-2 align-middle select-none">
                            <input
                              type="checkbox"
                              checked={checked}
                              name="toggle"
                              id="Required"
                              class="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer"
                              onChange={() => setChecked(!checked)}
                            />
                            <label
                              for="Required"
                              class="block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                          </div>
                        </div>
                        <div className="w-0">
                          <label
                            for="required-option-name"
                            class="text-gray-700 dark:text-gray-200 text-left text-sm"
                          >
                            Section
                          </label>
                          <div>
                            <input
                              type="text"
                              autoComplete="off"
                              id="required-section-name"
                              class="col-span-2 rounded-lg border-transparent mt-2 flex-1 appearance-none border border-gray-300 w-56 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                              name="name"
                              value={optionSection.name}
                              onChange={(e) =>
                                setOptionSection({
                                  ...optionSection,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Section Name"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-3 mt-4 gap-2">
                      <label
                        for="required-option-name"
                        class="text-gray-700 dark:text-gray-200 col-span-2 text-left text-sm"
                      >
                        Name
                      </label>
                      <label
                        for="required-option-name"
                        class="text-gray-700 dark:text-gray-200 text-left text-sm"
                      >
                        Price
                      </label>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        autoComplete="off"
                        id="required-name"
                        class="col-span-2 rounded-lg border-transparent mt-2 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        name="name"
                        value={option.name}
                        onChange={(e) =>
                          setOption({
                            ...option,
                            name: e.target.value,
                          })
                        }
                        placeholder="Option Name"
                      />

                      <input
                        type="number"
                        id="required-name"
                        autoComplete="off"
                        class=" rounded-lg border-transparent mt-2 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        name="name"
                        value={option.additional_price}
                        onChange={(e) =>
                          setOption({
                            ...option,
                            additional_price: e.target.value,
                          })
                        }
                        placeholder="Option Price"
                      />
                    </div>
                    <div class="flex justify-end mt-8 py-2 bg-light-gray sm:px-6 rounded-2xl space-x-2">
                      <button
                        style={{
                          borderColor: currentColor,
                          color: currentColor,
                        }}
                        type="button"
                        class="text-center h-10 w-32 py-2 px-4 border-2 shadow-sm text-sm rounded-full text-white"
                        onClick={negativeButtonListener}
                      >
                        Cancel
                      </button>
                      <button
                        style={{ backgroundColor: currentColor }}
                        type="button"
                        class="text-center h-10 w-32 py-2 px-4 border border-transparent shadow-sm text-sm rounded-full text-white"
                        onClick={() => {
                          if (
                            newSection &&
                            (optionSection.name === undefined ||
                              optionSection.name === '')
                          ) {
                            toast.error(
                              'Section name cannot be empty!',
                              TOAST_OBJECT
                            );
                          } else if (
                            option.name === undefined ||
                            option.name === ''
                          ) {
                            toast.error(
                              'Option name cannot be empty!',
                              TOAST_OBJECT
                            );
                          } else {
                            positiveButtonListener(
                              newSection ? getOptionSection() : option
                            );
                          }
                        }}
                      >
                        {newSection || currentOption ? 'Update' : 'Add'}
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

export default EditProductOption;
