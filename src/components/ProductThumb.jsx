import { Image, Link } from "@shopify/hydrogen";

import MoneyCompareAtPrice from "./MoneyCompareAtPrice.client";
import MoneyPrice from "./MoneyPrice.client";

export default function ProductThumb({ product }) {
  const selectedVariant = product.variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }

  return (
    <div className="text-md mb-4 relative">
      <Link to={`/products/${product.handle}`}>
        <div className="border-2 border-current mb-2 relative flex items-center justify-center overflow-hidden object-cover h-full w-full aspect-ratio-[1]">
          {selectedVariant.image ? (
            <Image
              className="bg-white absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-contain hover:scale-110"
              image={selectedVariant.image}
            />
          ) : null}
          {!selectedVariant?.availableForSale && (
            <div className="absolute top-3 left-3 rounded-3xl text-xs bg-black text-white py-3 px-4">
              Out of stock
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
