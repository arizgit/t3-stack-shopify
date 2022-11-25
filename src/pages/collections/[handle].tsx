// import DUMMYPRODUCTS from '../../dummy-product-data';
import { shopifyClient } from '../../lib/shopify';
import Head from "next/head";
import ProductsList from '../../components/ProductsList';
import type { GetServerSideProps } from 'next';

export default function CollectionPage({ products }: { products: object }) {
  return (
    <>
      <Head>
        <title>Create T3 App - Collection Page</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <ProductsList products={products} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) =>  {
  const { handle } = context.query

  type Products = {
    body: { data: { collection: { products: { edges: object } } } };
  };

  const products: Products = await shopifyClient.query({
    data: `{
      collection (handle: "${handle}") {
        products(first: 15) {
          edges {
            node {
              id
              title
              handle
              featuredImage {
                url
              }
              priceRange {
                maxVariantPrice {
                  amount
                }
              }
            }
          }
        }
      }
    }`,
  });

  const productArray = products.body.data.collection.products.edges.map((node: { [x: string]: unknown; }) => node["node"]);

  return {
   props: {
    products: productArray
  },
 };
};
