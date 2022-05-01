import styled from "styled-components";
import {
  CommentOutlined,
  DirectionsOutlined,
  ExitToAppOutlined,
  FavoriteBorder,
  HomeOutlined,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import {CircularProgress } from '@material-ui/core';

import Navbar from "../Components/Navbar"

import { Link,useParams } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import Wishlist from "../Components/Wishlist";
import Orders from "../Components/Orders";
import UserReviews from "../Components/UserReviews";
import Footer from "../Components/Footer";
import Newsletter from "../Components/Newsletter";
import Announcement from "../Components/Announcement";
import { SM } from "../responsive";
import UserAddresses from "../Components/UserAddresses";

import {onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState } from "react";

const Container=styled.div`
display:flex;
padding:2rem;
${SM({flexDirection:"column-reverse"})}
`
const Leftbar=styled.div`
flex:1;
max-width: 220px;
background-color: #eee;
border-radius:4px;
height:420px;
${SM({maxWidth:"100%"})}

`
const LeftbarWrapper=styled.div``
const MenuLink=styled.div`
 padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  position:relative;
  margin-bottom: 4px;
  background-color: ${(props)=>props.active === true && "#5d54c44d"};

  :hover{ background-color:${(props)=>props.active !== true && "#5d54c41c"} }

  a{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index:2;
  }
  ::before{
    content: '';
    background-color:#5d54c4;
    width:7px;
    height:100%;
    position:${(props)=>props.active === true && "absolute" };
    left:0;
    top:0;
  }
 
`



const MenuLinkTitle =styled.span`
  margin-left: 10px;
  margin-right: 5px;
 `

const Right=styled.div`
flex:3;
`

const Loading=styled.div`
height:75vh;
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
a{
  text-decoration:underline;
  color: #1D9CF9;
}
b{
  margin-top:1.5rem;
}
`



const Panel = () => {
  
  document.body.style.overflowY = "scroll";
  const  {link}  = useParams();

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  })



    const data=[
       {id:1,
        icon:<HomeOutlined />,
        name:"dashboard",
        component:<Dashboard/>
      },
      {id:2,
        icon: <FavoriteBorder />,
        name:"wishlist",
        component:<Wishlist />
      },
      {id:3,
        icon:<CommentOutlined />,
        name:"reviews",
        component:<UserReviews />
      },
       {id:4,
        icon:<DirectionsOutlined />,
        name:"addresses",
        component:<UserAddresses user={user} />,
      },
       {id:5,
        icon:<ShoppingBasketOutlined />,
        name:"orders",
        component:<Orders />
      }

    ]

    const currentData=data.find(d=>d.name === link);
  
    const logout = async () => {
  
      await signOut(auth) 
    };
  
    
    return (
      <>   

      <Navbar />
      <Announcement />
          
          {user === null 
          
          ? <Loading><CircularProgress /><b>You didn't login to your account?</b><Link to="/sign-in">back to sign-In page</Link></Loading>
          :
      <Container>
     
    <Leftbar>

      <LeftbarWrapper>

     
      {data.map((item,index)=>
      
      <MenuLink active={item.name===link && true} key={index}>
      <Link to={`/panel/${item.name}`} />
       {item.icon}
      <MenuLinkTitle>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</MenuLinkTitle>
      </MenuLink>
      
      )}
     

      <MenuLink   onClick={() => logout()}>
      <ExitToAppOutlined />
      <MenuLinkTitle>Logout</MenuLinkTitle>
      </MenuLink>

      </LeftbarWrapper>
    </Leftbar>


        <Right>
          {currentData.component}
 
          </Right>  
            
     
     
          </Container>
          }

          <Newsletter />
          <Footer />
          </>
    );
  };
  
  export default Panel;
  
