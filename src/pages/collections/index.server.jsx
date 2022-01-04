import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
  Image,
  Link,
} from "@shopify/hydrogen";
import gql from "graphql-tag";

import Layout from "../../components/Layout.server";
import FeaturedCollection from "../../components/FeaturedCollection";
import ProductThumb from "../../components/ProductThumb";

export default function Index({ country = { isoCode: "US" } }) {
  const { data } = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
  });

  const collections = data ? flattenConnection(data.collections) : [];

  return (
    <Layout>
      <div className="relative mb-12">
        <div className="bg-white p-12 shadow-xl rounded-xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {collections.map((collection) => (
              <div className="" key={collection.id}>
                {/* <Link
                  to={`/collections/${collection.handle}`}
                  className="text-blue-600 hover:underline"
                >
                  {collection.title}
                </Link> */}
                <div className="grid grid-cols-3 gap-2">
                  {flattenConnection(collection.products).map((product) => (
                    <div key={product.id}>
                      <ProductThumb product={product} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query collectionsContent(
    $country: CountryCode
    $numCollections: Int = 9
    $numProducts: Int = 9
    $includeReferenceMetafieldDetails: Boolean = false
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 1
    $numProductMedia: Int = 1
    $numProductVariantMetafields: Int = 1
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    collections(first: $numCollections) {
      edges {
        node {
          descriptionHtml
          description
          handle
          id
          title
          image {
            ...ImageFragment
          }
          products(first: $numProducts) {
            edges {
              node {
                ...ProductProviderFragment
              }
            }
          }
        }
      }
    }
  }

  ${ProductProviderFragment}
  ${Image.Fragment}
`;
