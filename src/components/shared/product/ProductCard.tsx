"use client";
import StarRating from "@/components/ui/StarRating";
import { CheckedFillIcon, HeartFillIcon, HeartLineIcon } from "@/icons";
import { addToCart, setCartOpen, removeFromCart } from "@/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductCardProps } from "@/types";
import Image from "next/image";
import { useState } from "react";

const ProductCard = ({ product, variant, isBestSeller }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.some((item) => item._id === product._id);

  const {
    _id,
    name,
    imageUrl,
    originalPrice,
    price,
    rating,
    isNewItem,
    isHotItem,
  } = product;

  const isHome4 = variant === "home4";

  // handle add to favorite
  const toggleFavorite = (id: string) => {
    console.log(id);
    setIsFavorite(!isFavorite);
  };

  // handle add to cart
  const toggleCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart({...product, quantity: 1}));
      dispatch(setCartOpen(true));
    }
  };

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className="relative overflow-hidden transition-all duration-300 h-full">
      {/* Product Image */}
      <div
        className={`relative bg-neutral-2 overflow-hidden ${
          isBestSeller ? "h-[250px] xs:h-[270px] sm:h-[305px]" : "h-[305px]"
        } md:h-[350px] w-full mb-3 group`}
      >
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className={`w-full h-full ${
            isHome4
              ? "object-cover group-hover:scale-110"
              : "object-contain scale-75 md:scale-90 group-hover:scale-100"
          } transition-transform duration-300 mix-blend-multiply`}
        />

        {/* New Item and Discount Badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {/* Hot Item Badge */}
          {isHotItem && (
            <span className="inline-block px-[14px] py-1 text-base font-bold text-neutral-7 bg-white rounded">
              HOT
            </span>
          )}

          {/* New Item Badge */}
          {isNewItem && (
            <span className="inline-block px-[14px] py-0.5 text-base font-bold text-neutral-7 bg-white rounded">
              NEW
            </span>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <span className="inline-block px-[14px] py-0.5 text-base font-bold text-neutral-1 bg-secondary-green rounded">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4 lg:translate-x-20 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 transition-all duration-700 ">
          <button
            onClick={() => toggleFavorite(_id)}
            className="w-8 h-8 btn btn-circle border-0 bg-white shadow-favorite-btn flex-center"
          >
            {isFavorite ? <HeartFillIcon /> : <HeartLineIcon />}
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute left-4 right-4 bottom-4 lg:translate-y-12 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={toggleCart}
            className="bg-neutral-7 text-base shadow-add-to-cart-btn font-medium py-[9px] text-neutral-1 rounded-lg hover:bg-black-primary transition-colors w-full"
          >
            {isInCart ? (
              <span className="flex-center gap-1">
                <CheckedFillIcon />
                Added
              </span>
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-0.5">
        {/* Product Rating */}
        <StarRating rating={rating} />

        {/* Product Name */}
        <span className="text-neutral-7 font-semibold text-base">
          {product.name}
        </span>

        {/* Product Price */}
        <div className="flex items-center space-x-3">
          <span className="text-neutral-7 font-semibold text-sm">
            ${product.price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-neutral-4 line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
