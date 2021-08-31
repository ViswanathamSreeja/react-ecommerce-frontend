
import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
import 'react-toastify/dist/ReactToastify.css'
import { LoadingOutlined } from '@ant-design/icons';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import CompleteRegister from './pages/auth/CompleteRegister';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import Home from './pages/Home';
// import Header from './components/nav/Header';
// import SideDrawer from './components/drawer/SideDrawer';  //should be available globally
// 
// import History from './pages/user/History';
// import UserRoute from './components/routes/UserRoute';
// import AdminRoute from "./components/routes/AdminRoute"
// import AdminDashboard from './pages/admin/AdminDashboard';
// import Password from './pages/user/Password'
// import Wishlist from './pages/user/Wishlist'
// import CategoryCreate from './pages/admin/category/CategoryCreate'
// import SubCreate from "./pages/admin/sub/SubCreate"
// import CategoryUpdate from './pages/admin/category/CategoryUpdate';
// import SubUpdate from './pages/admin/sub/SubUpdate';
// import ProductCreate from './pages/admin/product/ProductCreate';
// import AllProducts from './pages/admin/product/AllProducts';
// import ProductUpdate from './pages/admin/product/ProductUpdate';
// import Product from './pages/Product'
// import CategoryHome from './pages/category/CategoryHome';
// import SubHome from './pages/sub/SubHome'
// import Shop from "./pages/Shop"
// import Cart from "./pages/Cart"
// import CheckOut from './pages/CheckOut';
// import CreateCoupon from './pages/admin/coupon/CreateCoupon';
// import Payment from './pages/Payment';

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const CompleteRegister = lazy(() => import('./pages/auth/CompleteRegister'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Home = lazy(() => import('./pages/Home'));
const Header = lazy(() => import('./components/nav/Header'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));  //should be available globally
const History = lazy(() => import('./pages/user/History'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Password = lazy(() => import('./pages/user/Password'))
const Wishlist = lazy(() => import('./pages/user/Wishlist'))
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'))
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"))
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const Product = lazy(() => import('./pages/Product'))
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'))
const Shop = lazy(() => import("./pages/Shop"))
const Cart = lazy(() => import("./pages/Cart"))
const CheckOut = lazy(() => import('./pages/CheckOut'));
const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'));
const Payment = lazy(() => import('./pages/Payment'))
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {


      if (user) {

        const idTokenResult = await user.getIdTokenResult()

        currentUser(idTokenResult.token)           //calling func
          .then(res => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,


              }
            });
          })
          .catch(e => console.log("err", e.message))

      }
    })
    return () => unsubscribe()
  }, [dispatch])

  return (
    <Suspense fallback={
      <div className="col text-center p-5">
        __CRAZY<LoadingOutlined />SHOPPING__
      </div>
    }>
      <Header />
      <ToastContainer />
      <SideDrawer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register/Complete" component={CompleteRegister} />
        <Route exact path="/Forgot/Password" component={ForgotPassword} />
        <UserRoute exact path="/User/History" component={History} />
        <UserRoute exact path="/User/Password" component={Password} />
        <UserRoute exact path="/User/Wishlist" component={Wishlist} />
        <AdminRoute exact path="/Admin/Dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/Admin/Category" component={CategoryCreate} />
        <AdminRoute exact path="/Admin/Category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/Admin/Sub" component={SubCreate} />
        <AdminRoute exact path="/Admin/Sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/Admin/Product" component={ProductCreate} />
        <AdminRoute exact path="/Admin/Products" component={AllProducts} />
        <AdminRoute exact path="/Admin/Product/:slug" component={ProductUpdate} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />

        <UserRoute exact path="/checkout" component={CheckOut} />
        <AdminRoute exact path="/Admin/Coupon" component={CreateCoupon} />
        <UserRoute exact path="/payment" component={Payment} />







      </Switch>
    </Suspense>
  );
}

export default App;
