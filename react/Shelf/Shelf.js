import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { graphql } from 'react-apollo'
import { Loading, useTreePath } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { useCssHandles } from 'vtex.css-handles'
import { ProductListContext } from 'vtex.product-list-context'

import OrdenationTypes, { getOrdenationValues } from '../utils/OrdenationTypes'
import ProductList from './ProductList'
import {
  productListSchemaPropTypes,
  shelfContentPropTypes,
} from '../utils/propTypes'

import productsQueryByIdentifier from '../queries/productsQueryByIDs.gql'
import { normalizeBuyable } from '../utils/normalize'

const CSS_HANDLES = ['container']

const { ProductListProvider } = ProductListContext

/**
 * Shelf Component. Queries a list of products and shows them.
 */
const Shelf = props => {
  const {
    data,
    paginationDotsVisibility = 'visible',
    productList = ProductList.defaultProps,
    cssHandleArray
  } = props

  let { trackingId } = props
  const treePath = useTreePath()
  const handles = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const { loading, error, productsByIdentifier } = data || {}
  console.log("CSS HANDLE ARRAY?!!?!?", cssHandleArray);

  if (!trackingId) {
    // Taking the block name to pass to listName if no trackingId is passed
    const treePathList =
      (typeof treePath === 'string' && treePath.split()) || []
    trackingId = treePathList[treePathList.length - 1] || 'Shelf'
  }

  const filteredProducts = useMemo(() => {
    const productos = productsByIdentifier && productsByIdentifier.map(normalizeBuyable).filter(Boolean)
    return productos
  }, [productsByIdentifier])

  const productListProps = {
    ...productList,
    isMobile,
    loading,
    paginationDotsVisibility,
    products: filteredProducts,
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return null
  }

  return (
    <div className={`${handles.container} pv4 pb9`}>
      <ProductListProvider listName={trackingId}>
        <ProductList {...productListProps} />
      </ProductListProvider>
    </div>
  )
}

Shelf.propTypes = {
  /** Graphql data response. */
  data: PropTypes.shape({
    products: shelfContentPropTypes.products,
  }),
  productsIds: PropTypes.arrayOf(Number),
  /** Category Id. */
  category: PropTypes.string,
  /** Collection Id. */
  collection: PropTypes.string,
  /** Ordenation Type. */
  orderBy: PropTypes.oneOf(getOrdenationValues()),
  /** Hide unavailable items */
  hideUnavailableItems: PropTypes.bool,
  /** Should display navigation dots below the Shelf */
  paginationDotsVisibility: PropTypes.oneOf([
    'visible',
    'hidden',
    'mobileOnly',
    'desktopOnly',
  ]),
  /** ProductList schema configuration */
  productList: PropTypes.shape(productListSchemaPropTypes),
  trackingId: PropTypes.string,
  slug: PropTypes.string,
  cssHandleArray: PropTypes.arrayOf(String)
}

const optionsByIdentifier = {
  options: ({
    productsIds = ["1", "3", "8"],
    orderBy = OrdenationTypes.ORDER_BY_TOP_SALE_DESC.value,
    maxItems = ProductList.defaultProps.maxItems
  }) => ({
    ssr: true,
    variables: {
      ids: productsIds,
      from: 0,
      to: maxItems - 1,
      orderBy
    },
  }),
}

const EnhancedShelf = graphql(productsQueryByIdentifier, optionsByIdentifier)(Shelf)

EnhancedShelf.schema = {
  title: 'admin/editor.shelf.title',
}

export default EnhancedShelf
