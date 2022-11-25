import Shopify from '@shopify/shopify-api'
import { env } from '../env/server.mjs'

export const shopifyClient = new Shopify.Clients.Storefront(
  env.SHOPIFY_STORE_DOMAIN,
  env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
);
