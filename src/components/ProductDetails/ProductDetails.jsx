import React, { useContext } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className={`${Style['custom-prev-arrow']}`} onClick={onClick}>
         <span className={Style.customArrowIcon}>&#8592;</span>
      </button>
    );
  };
  
  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className={`${Style['custom-next-arrow']}`} onClick={onClick}>
       <span className={Style.customArrowIcon}>&#8594;</span>
      </button>
    );
  };


export default function ProductDetails() {

    const baseURL = 'https://ecommerce.routemisr.com'
    const { id } = useParams()
  
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />, // Custom previous arrow component
        nextArrow: <CustomNextArrow />, // Custom next arrow component
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const { addToCart , setCount } = useContext(CartContext)
    async function addProductToCart(productId) {
        const response = await addToCart(productId);
        if (response.data.status === 'success') {
            toast.success(response.data.message, {

                className: "bg-main text-white ",
            })
            setCount(response.data?.numOfCartItems)
            localStorage.setItem('numberOfCartItems' ,response.data?.numOfCartItems )
        }
        else {
            toast.error(response.data.message)

        }
    }

    function getSpceficProduct(id) {
        return axios.get(baseURL + `/api/v1/products/${id}`)
    }
    const { isError, isFetching, data, isLoading } = useQuery('product', () => getSpceficProduct(id))
    return (
        <>
            {data?.data.data ?
                <div className="row mb-5 mt-4 align-items-center">
                    <Helmet>
                        <title>{data?.data.data.title}</title>
                    </Helmet>
                    <div className="col-md-3 mb-4 ">
                        <Slider {...settings}>
                            {data?.data.data.images.map((imgSrc) => (
                                <img key={imgSrc} src={imgSrc} className='cursor-pointer ' />
                            ))}
                        </Slider>
                    </div>
                    {/* <img src={data?.data.data.imageCover} alt={data?.data.data.slug} className='w-100' /> */}
                    <div className="col-md-9">
                        <h2 className='h5'>{data?.data.data.title}</h2>
                        <p>{data?.data.data.description}</p>
                        <h6 className='text-main'>{data?.data.data.category.name}</h6>
                        <h6 className='text-main'>Price : {data?.data.data.price}EGP</h6>
                        <div className="d-flex justify-content-between">
                            <span>ratings quantity : {data?.data.data.ratingsQuantity}</span>
                            <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
                        </div>

                        <button onClick={() => addProductToCart(data?.data.data._id)} className='my-3 btn bg-main w-100 text-white'>add to cart</button>
                {/* <button onClick={() => addWishList(data?.data.data._id)} className='my-3 btn  btn-primary  w-100 text-white'>add to wish list</button> */}
                    </div>
                </div>
                : ''}
        </>
    )
}
