import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import order from './order'
import productSchema from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema,order],
}
