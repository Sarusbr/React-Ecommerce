import React, { useEffect } from 'react'
import Description from './Description';
import ProductImg from './ProductImg';
import Info from './Info';
import Comments from './Comments';
import {useSelector} from "react-redux"
import { useParams } from 'react-router-dom';


export default function Product() {
  let { id } = useParams();

  const alldata = useSelector(state => state.products.value);
  const userId = useSelector(state => state.userInfo.value).id;
  const selectedProduct = alldata.filter((item) => item.id == id)[0];

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if(selectedProduct == undefined)
    return(<h1 className='display-1 d-flex justify-content-center'>404 ERROR!</h1>);

  return(
    <div className='container-xl'>
      <div className='row'>
        <ProductImg photos={selectedProduct.photos}/>
        <Info selectedProduct={selectedProduct} userId={userId}/>
      </div>
      <Description longDescription={selectedProduct.longDescription}/>
      <Comments comments={selectedProduct.comments} />
    </div>
  )
}