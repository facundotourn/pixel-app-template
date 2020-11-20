
import React, { useEffect, useState } from 'react'

const BraindwShelf = props => {
  const [productos, setProductos] = useState([1, 2, 4]);

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
    </>
  );
}

BraindwShelf.propTypes = {

}

BraindwShelf.schema = {
  title: 'BrainDW Shelf',
}

export default BraindwShelf