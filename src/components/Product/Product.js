import React from "react"
import "./Product.css"

const Product = ({product}) => {

const imageInlineStyle = {backgroundImage:`url(${product.image_url})`}

  return(
    <div className="Product">
      <div className="Product__img-wrapper" style={imageInlineStyle}>
        <img className="Product__image"  src={product.image_url} alt = {product.name} />
      </div>
      <div className="Product__info-wrapper">
        <div className="Product__name-wrapper">
          <h4>{product.name}</h4>
        </div>
        <div className="Product__price-wrapper">
          <h4>${product.price}</h4>
        </div>
      </div>
    </div>
  )
}

export default Product
