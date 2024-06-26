/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import Rating from '@mui/material/Rating';
import * as utils from '../utils/utils';

const Merchant = ({ merchant }) => {
  momentDurationFormatSetup(moment);
  return (
    <div class="relative transition duration-300 ease-in-out transform mt-16 hover:-translate-y-1">
      <div class="text-center mb-4 absolute -top-16 right-1/2 transform translate-x-1/2">
        <Link to={`/merchants/${merchant._id}`} class="block relative">
          <img
            alt="profil"
            src={utils.getImageUrl(merchant.image)}
            class={`mx-auto object-cover rounded-full h-40 w-40 border-4 border-color-${
              merchant.is_open ? 'open' : 'closed'
            }`}
          />
        </Link>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow mt-4 px-4 py-4 pt-24">
        <div class="text-center">
          <Link
            to={`/merchants/${merchant._id}`}
            class="text-gray-800 dark:text-white"
          >
            {merchant.name}
          </Link>
          {merchant.categories.map((category) => {
            return (
              <p
                class="text-sm text-gray-400 dark:text-gray-200 font-light"
                key={category}
              >
                {category.name}
              </p>
            );
          })}
          <p class="text-gray-600 dark:text-white mt-2 text-sm">
            {`${utils.formatTime(
              moment.duration(merchant.opening, 'seconds').format('hh:mm', {
                trim: false,
              })
            )} -
              ${utils.formatTime(
                moment.duration(merchant.closing, 'seconds').format('hh:mm', {
                  trim: false,
                })
              )}`}
          </p>
          <div class="flex border-gray-200 mx-auto mb-8 text-gray-400 items-center justify-center">
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
            <p class="text-sm text-gray-400 dark:text-gray-200 font-light ml-2">
              {`${
                merchant.reviews.reduce((acc, review) => acc + review.rating, 0)
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
    </div>
  );
};

export default Merchant;
