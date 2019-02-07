import React from 'react'
import './UserProduct.css'
import {Link} from 'react-router-dom'

const UserProduct = ({product}) => {
  return (
    <div className="UserProduct">
      <Link className="UserProduct__Link" to={`/products/${product.id}`} >
        <div className="UserProduct__content">
          <div className="UserProduct__img-wrapper" style={{backgroundImage: `url(${product.image_url})`}}>
            <img alt={product.name} src={product.image_url} />
          </div>
          <div className="UserProduct__info">
            <div className="UserProduct__top-line">
              <h4 className="UserProduct__name">{product.name}</h4>
              <h4 className="UserProduct__price">${product.price.toFixed(2)}</h4>
            </div>
            <p>{product.description}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default UserProduct