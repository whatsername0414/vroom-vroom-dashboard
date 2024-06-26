import React, { useRef, useEffect, useState } from 'react';
import moment from 'moment';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { Toast } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import TextField from '@mui/material/TextField';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TOAST_OBJECT } from '../utils/constants';
import { toast } from 'react-toastify';
import { getImageUrl } from '../utils/utils';
import logo from '../data/vroomvroom_logo.png';

mapboxgl.accessToken =
  'pk.eyJ1Ijoid2g0dHNlcm5hbWUiLCJhIjoiY2wxOWtwdGhwMDU3ajNrcTQwem9lM2tiYiJ9.Jurn11JV-n1-gl71YM8BCw';

const getMillis = (time) => {
  const hour = time.split(':')[0];
  const minute = time.split(':')[1];
  return hour * 60 * 60 + minute * 60;
};

const EditMerchantDetails = ({
  currentMerchant,
  positiveButtonListener,
  negativeButtonListener,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const { currentColor, activeMenu, currentMode } = useStateContext();
  const [merchant, setMerchant] = useState();
  const [categories, setCategories] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [isDropdownActive, setIsDropdownActive] = useState();
  const [lngLat, setLngLat] = useState([123.729734, 13.359208]);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    merchant === undefined &&
      setMerchant({
        ...merchant,
        name: currentMerchant?.name,
        image: currentMerchant?.image,
        opening: moment
          .duration(currentMerchant?.opening, 'seconds')
          .format('hh:mm', {
            trim: false,
          }),
        closing: moment
          .duration(currentMerchant?.closing, 'seconds')
          .format('hh:mm', {
            trim: false,
          }),
      });
    !categories && setCategories(currentMerchant?.categories);

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: !currentMerchant?.location
          ? lngLat
          : [currentMerchant?.location[1], currentMerchant?.location[0]],
        zoom: zoom,
      });
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
    map.current &&
      map.current.on('move', () => {
        setLngLat([
          map.current.getCenter().lng.toFixed(6),
          map.current.getCenter().lat.toFixed(6),
        ]);
        setZoom(map.current.getZoom().toFixed(2));
      });
  }, [currentMerchant, merchant, categories, isDropdownActive]);

  currentMode === 'Light'
    ? map?.current?.setStyle('mapbox://styles/mapbox/outdoors-v11')
    : map?.current?.setStyle('mapbox://styles/mapbox/dark-v10');

  const handleDeleteCategory = (index) => {
    const newCategories = categories.filter(
      (category) => category !== categories[index]
    );
    setCategories(newCategories);
  };

  const getImage = (e) => {
    const file = e.target.files[0];
    setMerchant({ ...merchant, image: file });
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <Toast />
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
                <div class="rounded-2xl p-4 bg-white shadow dark:bg-gray-800 max-w-sm">
                  <div class="bg-white dark:bg-gray-800 ">
                    <div class="sm:px-6 lg:py-4 lg:px-8 z-10">
                      <div className="flex flex-col">
                        <label class="text-gray-700 dark:text-gray-200 text-left">
                          Image
                        </label>
                        <div className="mt-2 flex justify-center px-6 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-lg">
                          <div className="space-y-1 text-center">
                            {merchant?.image ? (
                              <img
                                alt="productImage"
                                src={
                                  imagePreview
                                    ? imagePreview
                                    : merchant.image
                                    ? getImageUrl(merchant.image)
                                    : logo
                                }
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
                            <div className="flex justify-center text-xs text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus:outline-none focus:ring-transparent"
                              >
                                <span>
                                  {merchant?.image
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
                                      : toast.error(
                                          'Invalid image',
                                          TOAST_OBJECT
                                        )
                                  }
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, JPEG up to 3MB
                            </p>
                          </div>
                        </div>
                        <label
                          for="required-option-name"
                          class="text-gray-700 dark:text-gray-200 text-left text-sm mt-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          autoComplete="off"
                          id="name"
                          class="rounded-lg border-transparent mt-2 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm text-start focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                          name="name"
                          value={merchant?.name}
                          onChange={(e) =>
                            setMerchant({
                              ...merchant,
                              name: e.target.value,
                            })
                          }
                          placeholder="Merchant Name"
                        />
                        {/* <label
                          for="categories"
                          class="text-gray-700 dark:text-gray-200 text-left text-sm mt-2"
                        >
                          Categories
                        </label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {categories?.map((category, index) => (
                            <span
                              key={category._id}
                              class="px-2 py-1 flex items-center justify-between text-xs rounded-full text-white bg-gray-400"
                            >
                              <p className="truncate">{category.name}</p>
                              {categories.length > 1 && (
                                <button
                                  class="bg-transparent hover"
                                  onClick={() => handleDeleteCategory(index)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    fill="currentColor"
                                    class="ml-2"
                                    viewBox="0 0 1792 1792"
                                  >
                                    <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
                                  </svg>
                                </button>
                              )}
                            </span>
                          ))}
                        </div> */}
                        {/* <div class="relative mt-2 inline-block text-left">
                          <div>
                            <button
                              type="button"
                              class=" border border-gray-300 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between w-full rounded-lg  px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-light-gray dark:hover:bg-gray-500  focus:outline-none focus:ring-transparent"
                              id="options-menu"
                              onClick={() =>
                                setIsDropdownActive(!isDropdownActive)
                              }
                            >
                              Add Category
                              {isDropdownActive ? (
                                <IoIosArrowUp />
                              ) : (
                                <IoIosArrowDown />
                              )}
                            </button>
                          </div>
                          {isDropdownActive && (
                            <div class="absolute z-10 mt-2 transform px-2 w-full sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                              <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 max-h-32 overflow-y-scroll">
                                <ul class="relative grid gap-2 bg-white dark:bg-gray-800 px-2 py-2 sm:gap-4 sm:p-4 divide-y divide-gray-100">
                                  {currentCategories?.map((category, index) => (
                                    <li
                                      class="-m-2 p-2 flex items-center hover:bg-light-gray"
                                      key={category._id}
                                      onClick={() => {
                                        const picked =
                                          currentCategories[index].name;
                                        if (!categories.includes(picked)) {
                                          setCategories((prevCategories) => [
                                            ...prevCategories,
                                            picked,
                                          ]);
                                        }
                                        setIsDropdownActive(false);
                                      }}
                                    >
                                      <img
                                        alt="category"
                                        src={category.image}
                                        className="mx-4 object-cover rounded-full h-6 w-6 border-4"
                                      />
                                      <p class="text-xs text-gray-900 dark:text-white">
                                        {category.name}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div> */}
                        <label
                          for="time"
                          class="text-gray-700 dark:text-gray-200 text-left text-sm mt-2"
                        >
                          Time
                        </label>
                        <div className="flex items-center justify-between mt-2 space-x-2">
                          <TextField
                            id="opening"
                            label="Opening"
                            type="time"
                            value={merchant?.opening}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                            }}
                            onChange={(e) =>
                              setMerchant({
                                ...merchant,
                                opening: e.target.value,
                              })
                            }
                          />
                          <TextField
                            id="closing"
                            label="Closing"
                            type="time"
                            value={merchant?.closing}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                            }}
                            onChange={(e) => {
                              setMerchant({
                                ...merchant,
                                closing: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <label
                          for="location"
                          class="text-gray-700 dark:text-gray-200 text-left text-sm mt-2"
                        >
                          Location
                        </label>
                        <div className="relative">
                          <div className="absolute z-10 top-2/4 left-2/4 right-0">
                            <IoLocationSharp
                              style={{ color: currentColor }}
                              className="text-2xl -mt-4 -ml-3"
                            />
                          </div>
                          <div
                            ref={mapContainer}
                            className="absolute h-32 mt-2"
                          />
                        </div>
                      </div>
                      <div class="lg:flex-shrink-0 mt-8 space-x-4">
                        <button
                          style={{ backgroundColor: currentColor }}
                          type="button"
                          class="text-center h-10 w-32 py-2 px-4 border border-transparent shadow-sm text-sm text-white rounded-full focus:outline-none focus:ring-2 focus:ring-transparent"
                          onClick={() => {
                            if (
                              merchant.name === undefined ||
                              merchant.name === ''
                            ) {
                              toast.error(
                                'Merchant name cannot be empty!',
                                TOAST_OBJECT
                              );
                            } else if (
                              merchant.image === undefined ||
                              merchant.image === ''
                            ) {
                              toast.error(
                                'Merchant image cannot be empty!',
                                TOAST_OBJECT
                              );
                            } else {
                              const newMerchant = {
                                ...merchant,
                                categories: categories,
                                opening: getMillis(merchant?.opening),
                                closing: getMillis(merchant?.closing),
                                location: [lngLat[1], lngLat[0]],
                              };
                              positiveButtonListener(newMerchant);
                              negativeButtonListener();
                            }
                          }}
                        >
                          Update
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
    </>
  );
};

export default EditMerchantDetails;
