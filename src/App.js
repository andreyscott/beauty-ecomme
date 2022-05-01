
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Product from './Pages/Product';
import ProductList from './Pages/ProductList';
import Cart from './Pages/Cart';
import Panel from './Pages/Panel';


import { auth } from './firebase-config';
import {onAuthStateChanged} from "firebase/auth"

function App() {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  })

  return (
    <>
    <Router>
      <Switch>
  

    <Route  path="/products">
    <ProductList/>
    </Route>

    <Route  path="/product/:idProduct">
    <Product/>
    </Route>

    <Route  path="/cart">
    <Cart/>
    </Route>



      <Route  exact path="/">
    <Home/>
    </Route>
    
    <Route  path="/sign-in">
    <Login/>
    </Route>

    <Route  path="/sign-up">
    <Register />
    </Route>

    <Route path="/panel/:link">
<Panel />
      </Route>

    

    </Switch>
    </Router>
    </>
  );
}

export default App;
