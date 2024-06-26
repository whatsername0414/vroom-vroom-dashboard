import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { FiPlusCircle, FiTrash2, FiEdit } from 'react-icons/fi';
import {
  MdOutlineSubdirectoryArrowRight,
  MdOutlineArrowForward,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useStateContext } from '../contexts/ContextProvider';
import { EditProductOption, Header, Toast } from '../components';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../redux/actions/merchant';
import { TOAST_OBJECT } from '../utils/constants';
import loading from '../data/loading.gif';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, sectionId } = useParams();
  const [productId, setProductId] = useState();
  const { currentColor, setActiveProductSectionIndex } = useStateContext();
  const [currentProduct, setCurrentProduct] = useState();
  const [optionSections, setOptionSections] = useState([]);
  const [isAddOptionActive, setIsAddOptionActive] = useState(false);
  const [currentOptionSectionIndex, setCurrentOptionSectionIndex] = useState(0);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [mode, setMode] = useState();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [imagePreview, setImagePreview] = useState();
  const { createLoading, createError, data } = useSelector(
    (state) => state.createProduct
  );
  const { updateLoading, updateError, updated } = useSelector(
    (state) => state.updateProduct
  );
  const { deleteLoading, deleteError, deleted } = useSelector(
    (state) => state.deleteProduct
  );
  useEffect(() => {
    if (data) {
      setProductId(data.productId);
    }
    if (data || updated) {
      toast.success(
        `Product successfully ${data ? 'created' : 'updated'}!`,
        TOAST_OBJECT
      );
      dispatch({ type: 'RESET' });
      setActiveProductSectionIndex(undefined);
    } else if (deleted) {
      navigate(-1);
      setActiveProductSectionIndex(undefined);
    } else if (createError || updateError || deleteError) {
      toast.error(createError, TOAST_OBJECT);
      dispatch({ type: 'RESET' });
    }
  }, [
    currentProduct,
    optionSections,
    imagePreview,
    mode,
    forceUpdate,
    createError,
    dispatch,
    data,
    productId,
    updated,
    deleted,
  ]);
  const handleOnDeleteOption = (sectionIndex, optionIndex) => {
    if (optionSections[sectionIndex].options.length === 1) {
      optionSections.splice(sectionIndex, 1);
      setOptionSections(optionSections);
    } else {
      optionSections[sectionIndex].options.splice(optionIndex, 1);
      setOptionSections(optionSections);
    }
    setForceUpdate(forceUpdate + 1);
  };

  const handleAction = (option) => {
    switch (mode) {
      case 'EDIT':
        optionSections[currentOptionSectionIndex].options.splice(
          currentOptionIndex,
          1,
          option
        );
        setOptionSections(optionSections);
        break;
      case 'ADD_OPTION':
        optionSections[currentOptionSectionIndex].options.push(option);
        setOptionSections(optionSections);
        break;
      default:
        setOptionSections((oldoptionSections) => [
          ...oldoptionSections,
          option,
        ]);
    }
    setIsAddOptionActive(false);
    setMode(undefined);
  };

  const handleOnSave = () => {
    if (currentProduct?.name === undefined || currentProduct?.name === '') {
      toast.error('Product name cannot be empty!', TOAST_OBJECT);
      return;
    } else if (currentProduct?.price === undefined) {
      toast.error('Product price cannot be empty!', TOAST_OBJECT);
      return;
    }
    if (productId) {
      const updatedProduct = {
        ...currentProduct,
        id: productId,
        option_sections: optionSections,
      };
      dispatch(updateProduct(id, updatedProduct));
    } else {
      const createdProduct = {
        ...currentProduct,
        option_sections: optionSections,
      };
      dispatch(createProduct(id, sectionId, createdProduct));
    }
  };

  const getImage = (e) => {
    const file = e.target.files[0];
    setCurrentProduct({ ...currentProduct, image: file });
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <Header title={'Product Details'} />
      <Toast />
      <div div className="my-8 mx-12 flex relative">
        {mode && (
          <EditProductOption
            currentOption={
              mode === 'EDIT' &&
              optionSections[currentOptionSectionIndex].options[
                currentOptionIndex
              ]
            }
            newSection={mode === 'NEW_OPTION_SECTION'}
            positiveButtonListener={handleAction}
            negativeButtonListener={() => {
              setIsAddOptionActive(false);
              setMode(undefined);
            }}
          />
        )}
        <div className="flex justify-center p-2 md:p-10 bg-white w-full rounded-3xl dark:bg-secondary-dark-bg dark:text-gray-200">
          <div className="sm:rounded-md sm:overflow-hidden flex-0 w-1/2">
            <div className="px-4 py-5 space-y-6 sm:p-6">
              <div>
                <label
                  for="required-name"
                  class="text-gray-700 dark:text-gray-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  id="required-name"
                  class=" rounded-lg border-transparent mt-2 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  name="name"
                  value={currentProduct?.name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Product Name"
                />
              </div>
              <fieldset className="w-full dark:text-gray-100">
                <label
                  for="required-email"
                  class="text-gray-700 dark:text-gray-200"
                >
                  Price
                </label>
                <div className="flex">
                  <span className="rounded-l-lg border-y border-l border-gray-300 flex items-center px-3 pointer-events-none text-gray-700 text-sx bg-white">
                    ₱
                  </span>
                  <input
                    type="number"
                    autoComplete="off"
                    id="required-name"
                    class="rounded-r-lg border-transparent flex flex-1 appearance-none border border-gray-300 w-full py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    name="name"
                    value={currentProduct?.price}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: e.target.value,
                      })
                    }
                    placeholder="Product Name"
                  />
                </div>
              </fieldset>
              <div>
                <label class="text-gray-700 dark:text-gray-200">
                  Description
                </label>
                <textarea
                  class="flex-1 appearance-none mt-2 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  id="comment"
                  placeholder="Brief description of the product."
                  name="comment"
                  rows="5"
                  cols="40"
                  value={currentProduct?.description}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div>
                <label class="text-gray-700 dark:text-gray-200">Image</label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {currentProduct?.image ? (
                      <img
                        alt="productImage"
                        src={imagePreview ? imagePreview : currentProduct.image}
                        class="mx-auto object-cover rounded-full h-12 w-12 border border-gray-200"
                      />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex justify-center text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>
                          {currentProduct?.image
                            ? 'Change image'
                            : 'Upload image'}
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            ['png', 'jpg', 'jpeg'].includes(
                              e.target.files[0].type.split('/')[1]
                            )
                              ? getImage(e)
                              : toast.error('Invalid image', TOAST_OBJECT)
                          }
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, JPEG up to 3MB
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <label class="text-gray-700 dark:text-gray-200">
                    Options
                  </label>
                  <div>
                    {optionSections &&
                      optionSections.map((section, sectionIndex) => (
                        <div className="mt-2" key={section.name}>
                          <label
                            for="option-section"
                            className="text-gray-700 text-sm dark:text-gray-200"
                          >
                            {section.name}
                          </label>

                          <div class="container flex flex-col mx-auto w-full items-center justify-center mt-2">
                            <ul class="flex flex-col w-full pl-4">
                              {section?.options?.map((option, optionIndex) => (
                                <li class="border-gray-400 flex flex-row mb-2 w-full">
                                  <div class="shadow border select-none bg-white dark:bg-gray-800 rounded-2xl flex flex-1 items-center px-4 py-6">
                                    <div class="flex-1 pl-1 md:mr-16">
                                      <div class="text-xs dark:text-gray-200">
                                        {option.name}
                                      </div>
                                    </div>
                                    <div class="text-gray-600 dark:text-gray-200 text-xs">
                                      ₱
                                      {option.additional_price
                                        ? option.additional_price
                                        : '00'}
                                    </div>
                                    <div className="flex justify-end w-32 space-x-2 text-xs dark:text-gray-200">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCurrentOptionSectionIndex(
                                            sectionIndex
                                          );
                                          setCurrentOptionIndex(optionIndex);
                                          setMode('EDIT');
                                        }}
                                      >
                                        <FiEdit />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleOnDeleteOption(
                                            sectionIndex,
                                            optionIndex
                                          );
                                        }}
                                      >
                                        <FiTrash2 className="text-red-500" />
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    <div class="relative text-left">
                      <div>
                        <button
                          type="button"
                          className="flex items-center space-x-1 cursor-pointer mt-4 text-xs "
                          onClick={() => {
                            setIsAddOptionActive(!isAddOptionActive);
                          }}
                        >
                          <FiPlusCircle className="text-gray-700 h-4 w-4 mr-1 dark:text-gray-200" />
                          Add
                        </button>
                      </div>
                      {isAddOptionActive && (
                        <div class="origin-top-right absolute left-0 mt-2 ml-4 w-56 max-h-32 hover:overflow-y-scroll overflow-y-hidden rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                          <div
                            class="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            {optionSections?.map((option, index) => {
                              return (
                                <div class="block px-4 py-2 text-xs text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                                  <span
                                    className="flex items-center"
                                    onClick={() => {
                                      setCurrentOptionSectionIndex(index);
                                      setMode('ADD_OPTION');
                                    }}
                                  >
                                    <MdOutlineSubdirectoryArrowRight />
                                    <span>{option.name}</span>
                                  </span>
                                </div>
                              );
                            })}
                            <div class="block px-4 py-2 text-xs text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                              <span
                                className="flex items-center"
                                onClick={() => setMode('NEW_OPTION_SECTION')}
                              >
                                <MdOutlineArrowForward />
                                <span>New section</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 my-8 bg-light-gray flex justify-between justify-center items-center text-right sm:px-6 rounded-2xl space-x-4">
              <img
                style={{
                  visibility:
                    createLoading || updateLoading || deleteLoading
                      ? 'visible'
                      : 'hidden',
                }}
                class="h-12 w-12 text-green-500"
                src={loading}
                alt="Loading"
              />
              <div className="space-x-2">
                {productId && (
                  <button
                    style={{ borderColor: currentColor, color: currentColor }}
                    type="button"
                    className="text-center h-10 w-32 py-2 px-4 border-2 shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-transparent"
                    onClick={() =>
                      dispatch(deleteProduct(id, productId, sectionId))
                    }
                  >
                    Delete
                  </button>
                )}
                <button
                  style={{ backgroundColor: currentColor }}
                  type="button"
                  className="text-center h-10 w-32 py-2 px-4 border border-transparent shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-transparent"
                  onClick={handleOnSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
