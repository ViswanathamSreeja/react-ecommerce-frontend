import React from 'react';
import { useState } from 'react';
import { Menu, Badge } from 'antd';
import { AppstoreOutlined, SettingOutlined, ShoppingCartOutlined, UserAddOutlined, ShoppingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Search from '../forms/Search'

const { SubMenu, Item } = Menu;

const Header = () => {
    const dispatch = useDispatch()
    const { user, cart } = useSelector(state => ({ ...state }))
    const history = useHistory()
    const [current, setCurrent] = useState("home")

    const clickHandler = (e) => {
        setCurrent(e.key)
    }
    const Logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null,
        })
        history.push("/Login")

    }
    return (
        <Menu theme="dark" onClick={clickHandler} selectedKeys={[current]} mode="horizontal">

            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <Item key="shop" style={{ color: "white" }} icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>
            <Item key="cart" style={{ color: "white" }} icon={<ShoppingCartOutlined />}>
                <Link to="/cart">

                    <Badge count={cart.length} offset={[-9, -10]}>

                    </Badge>

                </Link>
            </Item>
            {user && (
                <SubMenu key="SubMenu" icon={<SettingOutlined />}
                    title={user.email && user.email.split('@')[0]}  //spliting at @ and taking oth element
                    className="float-right">
                    {user && user.role === "subscriber" && <Menu.Item><Link to="/User/History">Dashboard</Link></Menu.Item>}
                    {user && user.role === "admin" && <Menu.Item><Link to="/Admin/Dashboard">Dashboard</Link></Menu.Item>}

                    <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={Logout}>Logout</Menu.Item>


                </SubMenu>
            )}
            {!user && (
                <Item key="Register" style={{ color: "whitesmokes" }} icon={<UserAddOutlined />} className="float-right">
                    <Link to="/Register">Register</Link>
                </Item>
            )}
            {!user && (
                <Item key="Login" style={{ color: "whitesmokes" }} icon={<UserOutlined />} className="float-right">
                    <Link to="/Login">Login</Link>
                </Item>

            )}


            <span className="float-right p-1">
                <Search />
            </span>

        </Menu >
    )

}
export default Header
