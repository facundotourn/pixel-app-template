import React, { useMemo, useCallback } from 'react'
// eslint-disable-next-line no-restricted-imports
import { assocPath } from 'ramda'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ExtensionPoint } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

const Components = {
  "fragment": React.Fragment,
  "extensionPoint": ExtensionPoint
}

/**
 * ShelfItem Component. Normalizes the item received in the props
 * to adapt to the extension point prop.
 */
const ShelfItem = ({ item, summary }) => {
  const { push } = usePixel()
  const newSummary = useMemo(() => assocPath(['name', 'tag'], 'h2', summary), [
    summary,
  ])
  const product = useMemo(
    () => ProductSummary.mapCatalogProductToProductSummary(item),
    [item]
  )

  const pushPixelProductClick = useCallback(() => {
    push({
      event: 'productClick',
      product,
    })
  }, [product, push])

  console.log('PRODUCTO QUE LLEGÓ AL SHELFITEM: ', product)
  console.log('SUMMARY QUE LLEGÓ AL SHELFITEM: ', newSummary)

  // return (
  //   <>
  //     <ExtensionPoint
  //       id="product-summary"
  //       product={product}
  //       actionOnClick={pushPixelProductClick}
  //       {...newSummary}
  //     />
  //   </>
  // )

  const string = `
    {
      "component": "extensionPoint",
      "props": {
        "id": "product-summary",
        "product": "{{product}}",
        "actionOnClick": "{{pushPixelProductClick}}",
        "newSumary": "{{...newSumary}}"
      }
    }
  `

  let jsonObj = JSON.parse(string);

  Object.keys(jsonObj).forEach((k) => {
    if (k == 'component') jsonObj[k] = Components[jsonObj[k]]
  })
  
  Object.keys(jsonObj.props).forEach((k) => {
    if (jsonObj.props[k] == "{{product}}") jsonObj.props[k] = product
    
    if (jsonObj.props[k] == "{{pushPixelProductClick}}") jsonObj.props[k] = pushPixelProductClick

    if (jsonObj.props[k] == "{{...newSumary}}") 
      jsonObj.props = {
        ...jsonObj.props,
        ...newSummary
      }
  })

  console.log("JSON OBJ: ", jsonObj);

  return React.createElement(React.Fragment, {}, React.createElement(jsonObj.component, jsonObj.props));
  //return React.createElement(ExtensionPoint, jsonObj.props, ["texto de prueba"]);
}

const renderChildren = children => {

}

export default ShelfItem
