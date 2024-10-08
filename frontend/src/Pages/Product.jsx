import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { Breadcrumbs } from '../Components/Breadcrumbs/Breadcrumbs'
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay'
import { DescriptiionBox } from '../Components/DescriptionBox/DescriptiionBox'
import { RelatedProduct } from '../Components/Related Products/RelatedProduct'

export const Product = () => {
  const {all_products} = useContext(ShopContext)
  const {productId} = useParams();
  const product = all_products.find((e)=> e.id === Number(productId))

  return (
    <div>
      <Breadcrumbs product={product}/>
      <ProductDisplay product={product}/>
      <DescriptiionBox/>
      <RelatedProduct/>
    </div>
  )
}
