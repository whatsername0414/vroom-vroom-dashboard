import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getCategories } from '../redux/actions/categories';
import {
  getMerchant,
  updateMerchant,
  editProductSections,
} from '../redux/actions/merchant';
import {
  ConfirmDialog,
  EditMerchantDetails,
  EditProductSections,
  Header,
  Loading,
  Product,
  Toast,
} from '../components';
import Rating from '@mui/material/Rating';
import { FiPlusCircle, FiEdit, FiTrash2 } from 'react-icons/fi';
import * as utils from '../utils/utils';
import { TOAST_OBJECT } from '../utils/constants';
import { useStateContext } from '../contexts/ContextProvider';
import { toast } from 'react-toastify';
import { getImageUrl } from '../utils/utils';
import emptyBox from '../data/empty-box.png';
import logo from '../data/vroomvroom_logo.png';

const Merchant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentColor,
    currentMode,
    activeProductSectionIndex,
    setActiveProductSectionIndex,
  } = useStateContext();
  const dispatch = useDispatch();
  const [mode, setMode] = useState();
  const [updateSectionIndex, setUpdateSectionIndex] = useState();
  const [deleteSectionIndex, setDeleteSectionIndex] = useState();
  const { categories } = useSelector((state) => state.categories);
  const { merchantLoading, merchantError, merchant } = useSelector(
    (state) => state.merchant
  );
  const { deleted } = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    if (deleted) {
      toast.success('Product successfully deleted!', TOAST_OBJECT);
      dispatch({ type: 'RESET' });
    }
    if (activeProductSectionIndex === undefined) {
      dispatch(getMerchant(id));
      dispatch(getCategories());
    }
    if (merchantError) {
      toast.error(merchantError, TOAST_OBJECT);
      dispatch({ type: 'RESET_MERCHANT' });
    }
  }, [
    dispatch,
    id,
    deleted,
    merchantError,
    mode,
    updateSectionIndex,
    deleteSectionIndex,
  ]);

  const handleOnSaveDetails = (merchant) => {
    dispatch(updateMerchant(id, merchant));
  };

  const handleOnSaveProductSection = (section) => {
    dispatch(
      editProductSections(
        id,
        mode,
        merchant?.product_sections[updateSectionIndex]?._id,
        section
      )
    );
    setMode(undefined);
  };

  const handleOnDeleteProductSection = () => {
    dispatch(
      editProductSections(
        id,
        mode,
        merchant?.product_sections[deleteSectionIndex]._id
      )
    );
    setMode(undefined);
  };

  const getInitial = (name) => {
    const names = name.split(' ');
    const firstNameInitial = names[0].charAt(0);
    return firstNameInitial;
  };
  return (
    <>
      {merchantLoading && <Loading />}
      <Header title={'Merchant Details'} />
      <Toast />
      {mode === 'UPDATE_DETAILS' && (
        <EditMerchantDetails
          currentCategories={categories}
          currentMerchant={merchant}
          positiveButtonListener={handleOnSaveDetails}
          negativeButtonListener={() => setMode(undefined)}
        />
      )}
      {(mode === 'ADD_SECTION' || mode === 'UPDATE_SECTION') && (
        <EditProductSections
          currentSection={
            mode === 'UPDATE_SECTION' &&
            merchant.product_sections[updateSectionIndex]
          }
          positiveButtonListener={handleOnSaveProductSection}
          negativeButtonListener={() => setMode(undefined)}
        />
      )}
      {mode === 'DELETE_SECTION' && (
        <ConfirmDialog
          title={'Delete Section'}
          message={'Are you sure you want to delete this section?'}
          positiveButtonTitle={'Delete'}
          positiveButtonListener={handleOnDeleteProductSection}
          negativeButtonTitle={'Cancel'}
          negativeButtonListener={() => setMode(undefined)}
        />
      )}
      {merchant && (
        <div className="px-12 space-y-8">
          <div class="lg:grid grid-rows-4 grid-cols-4 grid-flow-col gap-4 h-screen">
            <div class="shadow row-span-2 rounded-2xl bg-white dark:bg-secondary-dark-bg md:mt-8 mt-24 group">
              <div
                class="rounded-t-2xl h-28 w-full mb-4"
                style={{ backgroundColor: currentColor }}
              />
              <div class="flex flex-col items-center justify-center p-4 -mt-24">
                <img
                  alt="profil"
                  src={getImageUrl(merchant.image ? merchant.image : logo)}
                  class={`mx-auto object-cover rounded-full h-32 z-10 w-32 border-4 border-color-${
                    merchant.isOpen ? 'open' : 'closed'
                  }`}
                />
                <h1 class="text-gray-800 text-xl text-center dark:text-gray-200 mt-4 cursor-default">
                  {merchant.name}
                  <button
                    style={{ color: currentColor }}
                    className="text-xs text-end hidden ml-1 group-hover:inline dark:bg-light-gray dark:px-2 dark:rounded-full"
                    onClick={() => setMode('UPDATE_DETAILS')}
                  >
                    Edit
                  </button>
                </h1>
                <p class="text-gray-600 dark:text-gray-200 mt-4 mb-2 text-sm">
                  {`${utils.formatTime(
                    moment
                      .duration(merchant.opening, 'seconds')
                      .format('hh:mm', {
                        trim: false,
                      })
                  )} -
                    ${utils.formatTime(
                      moment
                        .duration(merchant.closing, 'seconds')
                        .format('hh:mm', {
                          trim: false,
                        })
                    )}`}
                </p>
                <div class="flex border-gray-200 mx-auto mb-8 text-gray-600 items-center justify-center">
                  <Rating
                    name="read-only"
                    value={
                      merchant.reviews.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / merchant.reviews.length
                    }
                    readOnly
                  />
                  <p class="text-sm text-gray-400 dark:text-gray-200 font-light ml-1">
                    {`${
                      merchant.reviews.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / merchant.reviews.length
                        ? parseFloat(
                            merchant.reviews.reduce(
                              (acc, review) => acc + review.rating,
                              0
                            ) / merchant.reviews.length
                          ).toFixed(1)
                        : parseFloat(0).toFixed(1)
                    } (${merchant.reviews.length} ${
                      merchant.reviews.length > 1 ? 'Reviews' : 'Review'
                    })`}
                  </p>
                </div>
              </div>
            </div>
            <div class="relative row-span-2 pt-6 pb-8 pl-6 pr-4 mt-4 md:mt-0 bg-white dark:bg-secondary-dark-bg rounded-2xl shadow">
              <div className="overflow-y-auto scrollbar-hide h-full">
                <ul>
                  {merchant &&
                    activeProductSectionIndex === undefined &&
                    setActiveProductSectionIndex(0)}
                  {merchant?.product_sections.map((section, index) => {
                    return (
                      <li
                        class="hover:text-gray-800 hover:bg-light-gray flex items-center justify-between py-2 pl-4 my-2 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 cursor-pointer text-gray-800 dark:text-gray-200 rounded-full group"
                        style={{
                          color:
                            section._id ===
                            merchant?.product_sections[
                              activeProductSectionIndex
                            ]?._id
                              ? currentColor
                              : '',
                          backgroundColor:
                            section._id ===
                              merchant?.product_sections[
                                activeProductSectionIndex
                              ]?._id &&
                            (currentMode === 'Light' ? '#F7F7F7' : '#F7F7F7'),
                        }}
                        key={section.name}
                      >
                        <span
                          className="w-full"
                          onClick={() => setActiveProductSectionIndex(index)}
                        >
                          {section.name}
                        </span>
                        <div className="cursor-pointer flex items-center justify-center text-sm mr-4 text-gray-800 dark:text-gray-800 group-hover:visible invisible space-x-1">
                          <button
                            type="button"
                            onClick={() => {
                              setMode('UPDATE_SECTION');
                              setUpdateSectionIndex(index);
                            }}
                          >
                            <FiEdit />
                          </button>
                          {merchant?.product_sections.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteSectionIndex(index);
                                setMode('DELETE_SECTION');
                              }}
                            >
                              <FiTrash2 className="text-red-500" />
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  className="flex items-center cursor-pointer mx-4 mt-4 text-xs text-gray-700 dark:text-gray-200"
                  onClick={() => {
                    setMode('ADD_SECTION');
                  }}
                >
                  <FiPlusCircle className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
            </div>
            <div className="shadow row-span-4 col-span-4 rounded-2xl bg-white md:mt-8 mt-4 dark:bg-secondary-dark-bg">
              {merchant?.product_sections[activeProductSectionIndex]?.products
                ?.length > 0 ? (
                <>
                  <div
                    class="pb-4 overflow-hidden hover:overflow-y-auto scrollbar-hide"
                    style={{ height: '85%' }}
                  >
                    <div className="flex justify-end bg-light-gray mx-8 mb-8 mt-8 py-2 px-2 rounded-2xl">
                      <button
                        style={{ backgroundColor: currentColor }}
                        type="button"
                        className="h-10 px-4 border border-transparent shadow-sm text-sm rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={() =>
                          navigate(
                            `/merchants/${id}/products/${merchant?.product_sections[activeProductSectionIndex]._id}`
                          )
                        }
                      >
                        Add Product
                      </button>
                    </div>
                    <ul class="px-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                      {merchant?.product_sections[activeProductSectionIndex] &&
                        merchant?.product_sections[
                          activeProductSectionIndex
                        ].products.map((product) => {
                          return (
                            <Product
                              defaultImage={merchant.image}
                              product={product}
                              productSectionId={
                                merchant?.product_sections[
                                  activeProductSectionIndex
                                ]._id
                              }
                              key={product._id}
                            />
                          );
                        })}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div class="text-center mb-8 w-64">
                    <div class="flex h-full flex-col justify-between">
                      <div className="w-full flex justify-center">
                        <img alt="profil" src={emptyBox} class="h-24 w-24" />
                      </div>
                      <p class="text-gray-700 dark:text-gray-200 text-xl mt-4">
                        Empty Section
                      </p>
                      <p class="text-gray-600 dark:text-gray-200 text-sm py-2 px-6">
                        Once you add a product it will appear here.
                      </p>
                      <div class="flex items-center justify-center w-full mt-4 px-16">
                        <button
                          style={{ backgroundColor: currentColor }}
                          type="button"
                          class="py-2 px-4 focus:outline-none w-full text-white focus:ring-2 focus:ring-offset-2 rounded-2xl"
                          onClick={() =>
                            navigate(
                              `/merchants/${id}/products/${merchant?.product_sections[activeProductSectionIndex]._id}`
                            )
                          }
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {merchant.reviews?.length > 0 && (
            <div class="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow">
              <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-4">
                {merchant.reviews.map((review) => (
                  <div class="m-2">
                    <div class="text-center mt-2 w-full">
                      <span
                        style={{ backgroundColor: currentColor }}
                        class="py-4 px-5 text-xl text-gray-200 rounded-full"
                      >
                        {getInitial(review.user.name)}
                      </span>
                    </div>
                    <div class="text-center mt-6">
                      <p class="text-sm text-gray-800 dark:text-white">
                        {review.user.name}
                      </p>
                      <div class="flex border-gray-200 mx-auto mb-2 text-gray-600 items-center justify-center">
                        <Rating
                          name="read-only"
                          size="small"
                          value={review.rating}
                          readOnly
                        />
                        <p class="text-xs text-gray-400 dark:text-gray-200 font-light ml-1">
                          {moment(review.created_at).format('L')}
                        </p>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Merchant;
