import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getProductsById } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import Jumbotron from '../components/cards/Jumbotron'
import LoadingCard from '../components/cards/LoadingCard'
import { getProducts } from '../functions/product'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/sub/SubList'


const Home = () => {


    return (
        <div>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron text={['New Arrivals', 'Latest Products', 'Best Sellers']} />
            </div>
            <h4 style={{ fontFamily: "Roboto Mono" }} className="text-center mt-5 mb-5 p-3 display-5 jumbotron">NEW ARRIVALS</h4>
            <div className="container">
                <NewArrivals />
            </div>
            <h4 style={{ fontFamily: "Roboto Mono" }} className="text-center mt-5 mb-5 p-3 display-5 jumbotron">BEST SELLERS</h4>
            <div className="container">
                <BestSellers />
            </div>
            <h4 style={{ fontFamily: "Roboto Mono" }} className="text-center mt-5 mb-5 p-3 display-5 jumbotron">CATEGORIES</h4>
            <div className="container">
                <CategoryList />
            </div>
            <h4 style={{ fontFamily: "Roboto Mono" }} className="text-center mt-5 mb-5 p-3 display-5 jumbotron"> SUB CATEGORIES</h4>
            <div className="container">
                <SubList />
            </div>




        </div>


    )
}
export default Home