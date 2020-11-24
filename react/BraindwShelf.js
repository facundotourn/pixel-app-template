
import React, { useEffect, useState } from 'react'
import ProductList from './Shelf/ProductList';

import Shelf from './Shelf/Shelf'

const BraindwShelf = props => {
  console.log('PROPS DE BRAINDWSHELF:', props);

  const [productos, setProductos] = useState([1, 2, 4]);
  const productList = ProductList.defaultProps
  productList.titleText = 'Shelf custom de BrainDW'

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      const data = await response.json()
      console.log("LLEGO POKEMON!", data)
      setProductos([2, 4, 8])
    }

    fetchData()
    console.log("FUI A BUSCAR POKEMON!")
  }, [])

  return (
    <>
      <h1>Shelf de brain</h1>
      <h6>[{productos.join(', ')}]</h6>
      <h6>{window.bdwClientKey}</h6>
      <Shelf
        {...props}
        productList={productList}
        productsIds={productos}
      />
    </>
  );
}

BraindwShelf.propTypes = {
  id: PropTypes.string
}

BraindwShelf.schema = {
  title: 'BrainDW Shelf',
}

export default BraindwShelf