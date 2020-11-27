
import React, { useEffect, useState } from 'react'
import { getShelfConfig } from './queries/shelfConfigService';
import ProductList from './Shelf/ProductList';

import Shelf from './Shelf/Shelf'

const BraindwShelf = ({ id }) => {

  const [settings, setSettings] = useState({
    productos: [1],
    paginationDotsVisibility: 'desktopOnly',
    productList: ProductList.defaultProps
  })

  const [productos, setProductos] = useState([1]);
  const [productList, setProductList] = useState(ProductList.defaultProps)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getShelfConfig(window.bdwClientKey, id)
        
        const { productos: p } = response
  
        setProductos(p)
        setProductList({
          ...productList,
          titleText: response.titleText
        })
  
        setSettings({
          ...response,
          productList: {
            ...productList,
            ...response.cfg,
            titleText: response.titleText
          }
        })
      } catch (ex) {
        console.error(ex.message)
      }
    }

    fetchData()
  }, [])

  return (
    <Shelf
      {...settings}
    />
  );
}

BraindwShelf.propTypes = {
  id: PropTypes.string
}

BraindwShelf.schema = {
  title: 'BrainDW Shelf',
}

export default BraindwShelf