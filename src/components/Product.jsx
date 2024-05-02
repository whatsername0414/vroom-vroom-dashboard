import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { getImageUrl } from '../utils/utils';

const Product = ({ defaultImage, product, productSectionId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  return (
    <li class="flex flex-row shadow rounded-2xl transition dark:bg-gray-800 duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
      <div class="select-none flex flex-1 items-center p-4">
        <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
          <img
            alt="profil"
            src={
              product.product_img_url
                ? getImageUrl(product.product_img_url)
                : getImageUrl(defaultImage)
            }
            class="mx-auto object-cover rounded-full h-10 w-10 border border-gray-200"
          />
        </div>
        <div class="flex-1 pl-1 mr-16">
          <div class="text-xs dark:text-gray-200">{product.name}</div>
        </div>
        <div class="text-gray-600 dark:text-gray-200 text-xs font-semibold">
          ₱{product.price}
        </div>
        <button
          class="w-24 text-right flex justify-end cursor-default"
          onClick={() => {
            dispatch({
              type: 'GET_PRODUCT',
              payload: { product: product },
            });
            navigate(
              `/merchants/${id}/products/${productSectionId}/${product._id}`
            );
          }}
        >
          <FiEdit className="cursor-pointer text-gray-700 dark:text-gray-200" />
        </button>
      </div>
    </li>
  );
};

export default Product;
