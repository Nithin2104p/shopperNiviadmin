import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import cross_icon from '../../assets/cross_icon.png'


const Listproduct = () => {

    const [allproducts, setAllproducts] = useState([]);
    const fetchInfo = async () => {
        await fetch('https://shopper-8qol.onrender.com/allproducts').then((res) => res.json()).then((data) => { setAllproducts(data) });

    }
    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ id: id })
        })
        await fetchInfo()
    }


    return (
        <div className='list-product'>
            <h1>All Product List</h1>
            <div className="listproducts-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return <> <div key={index} className="listproducts-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img src={cross_icon} onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' alt="" />
                    </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    )
}

export default Listproduct
