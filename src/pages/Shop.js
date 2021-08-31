import React from 'react'
import { useState } from 'react'
import { getProductsById } from '../functions/product'
import Star from '../components/forms/Star'
import ProductCard from '../components/cards/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'
import { getCategories } from '../functions/category'
import { getSubs } from '../functions/sub'
import { fetchProductsByFilter } from '../functions/product'
import { Menu, Slider, Radio } from 'antd'
import { Checkbox } from 'antd'
const { SubMenu, ItemGroup } = Menu
const Shop = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0, 0])
    const [categoryIds, setCategoryIds] = useState([])
    const [ok, setOk] = useState(false)
    const [star, setStar] = useState("")
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState("")
    const [brand, setBrand] = useState("")
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"])
    const [color, setColor] = useState("")
    const [colors, setColors] = useState(["Red", "Brown", "Black", "White", "Green", "Yellow", "Orange"])
    const [shipping, setShipping] = useState("")
    /* const { search } = useSelector(state => ({ ...state }))
    const { text } = search */
    const { text } = useSelector(state => ({ ...state }))
    const dispatch = useDispatch()
    useEffect(() => {
        loadAllProducts()
        //fetch categories
        getCategories().then(res => setCategories(res.data))
        //fetch subs
        getSubs().then(res => setSubs(res.data))

    }, [])
    //1.default load
    const loadAllProducts = () => {
        setLoading(true)
        getProductsById(12).then(res => {
            setProducts(res.data)
            setLoading(false)
        })
    }
    //2.load products based on user Search
    useEffect(() => {
        // console.log("text", text)
        const delayedTime = setTimeout(() => {
            fetchProducts({ query: text })
            if (!text) {
                loadAllProducts()
            }

        }, 300)
        return () => clearTimeout(delayedTime)
    }, [text])
    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then(res => {
            setProducts(res.data)
        })
    }
    //3.load products based on price
    useEffect(() => {
        fetchProducts({ price })
    }, [ok])

    const handleSlider = (value) => {
        //emptying search box vslue
        //reset values
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        //reset categoriids
        setCategoryIds([])
        setPrice(value)
        setStar("")
        setSub('')
        setBrand("")
        setColor("")
        setShipping("")
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }
    //4.load products based on category
    //show categories in checkbox
    const showCategories = () => categories.map(c => <div key={c._id}>
        <Checkbox
            onChange={handleCheck}
            className="pb-2 pl-4 pr-4"
            value={c._id}
            name="category"
            checked={categoryIds.includes(c._id)}>{c.name}</Checkbox>
    </div>)
    //handleCheck for categories
    const handleCheck = (e) => {
        //emptying search box vslue
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        //reset price
        setPrice([0, 0])
        setStar("")
        setSub('')
        setBrand("")
        setColor("")
        setShipping("")
        let inTheState = [...categoryIds]
        let justChecked = e.target.value
        let foundInTheState = inTheState.indexOf(justChecked)  //move item to foundstate
        if (foundInTheState === -1) {
            //element is not checked early so move to inthestate
            inTheState.push(justChecked)

        }
        else {
            //if element is checked early now we need to remove from inthestate
            inTheState.splice(foundInTheState, 1)
        }
        setCategoryIds(inTheState)
        //   console.log(inTheState)
        fetchProducts({ category: inTheState })

    }
    //5.show stars by rating
    const showStars = () => (
        <div className="pb-2 pl-4 pr-4">

            <Star
                starClick={handleStarClick}
                numberOfStars={5} />
            <Star
                starClick={handleStarClick}
                numberOfStars={4} />
            <Star
                starClick={handleStarClick}
                numberOfStars={3} />
            <Star
                starClick={handleStarClick}
                numberOfStars={2} />
            <Star
                starClick={handleStarClick}
                numberOfStars={1} />

        </div>
    )
    const handleStarClick = (num) => {
        // resetting all necessary items
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategoryIds([])
        setSub('')
        setBrand("")
        setColor("")
        setShipping("")
        //        console.log(num)
        setStar(num)
        fetchProducts({ stars: num })

    }
    //6.show sub categories
    const showSubs = () =>
        subs.map(s => <div
            onClick={() => handleSubmit(s)}
            key={s._id}
            className="p-1 m-1 badge badge-secondary"
            style={{ cursor: "pointer" }}>{s.name}</div>)
    const handleSubmit = (sub) => {
        // resetting all necessary items
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategoryIds([])
        setStar(" ")
        setBrand("")
        setColor("")
        setShipping("")
        setSub(sub)
        fetchProducts({ sub })


    }
    //7.show products based on brand
    const showBrands = () =>
        brands.map(b =>
            <Radio
                key={b._id}
                className="pb-1 pl-4 pr-4 mr-5" key={b._id}
                checked={b === brand}
                onChange={handleBrand}
                value={b}
            >{b}</Radio>)


    const handleBrand = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategoryIds([])
        setStar(" ")
        setSub("")
        setColor("")
        setShipping("")
        setBrand(e.target.value)
        fetchProducts({ brand: e.target.value })


    }

    //8.show products based on color
    const showColors = () => colors.map(c => (<Radio key={c._id}
        checked={c === color}
        onChange={handleColor}
        value={c}
        className="pb-2 pl-4 pr-4 mr-5">{c}</Radio>))

    const handleColor = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategoryIds([])
        setStar(" ")
        setSub("")
        setBrand("")
        setShipping("")
        setColor(e.target.value)
        fetchProducts({ color: e.target.value })
    }
    //9.show products based on shipping
    const showShipping = (e) => (
        <>
            <Checkbox
                className="pb-2 pl-4 pr-4"
                onChange={handleShipping}
                value="Yes"
                checked={shipping === "Yes"}>Yes
            </Checkbox>
            <Checkbox
                className="pb-2 pl-4 pr-4"
                onChange={handleShipping}
                value="No"
                checked={shipping === "No"}>No
            </Checkbox>
        </>
    )

    const handleShipping = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0])
        setCategoryIds([])
        setStar(" ")
        setSub("")
        setBrand("")
        setColor("")
        setShipping(e.target.value)
        fetchProducts({ shipping: e.target.value })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>  search/filter menu</h4>
                    <hr />
                    <Menu defaultOpenKeys={["1", "2"]} mode="inline">
                        <SubMenu key="1" title={<span className="h6">
                            <DollarOutlined /> Price
                        </span>}>
                            <div>
                                <Slider className="ml-4 mr-4"
                                    tipFormatter={v => `$${v}`}
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max="4999" />
                            </div>
                        </SubMenu>
                        {/* SubMenu */}
                        <SubMenu key="2" title={<span className="h6">
                            <DownSquareOutlined /> Categories
                        </span>}><div style={{ marginTop: "-10px" }}>{showCategories()}</div>

                        </SubMenu>

                        <SubMenu key="3" title={<span className="h6">
                            <StarOutlined /> Rating
                        </span>}><div style={{ marginTop: "-10px" }}>{showStars()}</div>

                        </SubMenu>

                        <SubMenu key="4" title={<span className="h6">
                            <DownSquareOutlined /> SubCategories
                        </span>}><div style={{ marginTop: "-10px" }}>{showSubs()}</div>

                        </SubMenu>
                        <SubMenu key="5" title={<span className="h6">
                            <DownSquareOutlined /> Brands
                        </span>}><div style={{ marginTop: "-10px" }}>{showBrands()}</div>

                        </SubMenu>
                        <SubMenu key="6" title={<span className="h6">
                            <DownSquareOutlined /> Colors
                        </span>}><div style={{ marginTop: "-10px" }}>{showColors()}</div>

                        </SubMenu>
                        <SubMenu key="7" title={<span className="h6">
                            <DownSquareOutlined /> Shipping
                        </span>}><div style={{ marginTop: "-10px" }}>{showShipping()}</div>

                        </SubMenu>

                    </Menu>
                </div>
                <div className="col-md-9 pt-2">
                    {loading ? (<h4>Loading........</h4>)
                        : (<h4 className="text-danger">Products</h4>)}
                    {products.length < 1 && <h4>No products found</h4>}
                    <div className="row">
                        {
                            products.map(p => (
                                <div className="col-md-4" key={p._id}>
                                    <ProductCard p={p} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Shop