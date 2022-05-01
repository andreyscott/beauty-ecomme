
import { useState } from 'react';
import styled from 'styled-components';
import {ExitToApp, Close, AccountCircleOutlined} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { Items } from '../Menu/MenuData';
import SubMenu from './SubMenu';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';


const Container = styled.div`
background-color:#2d2d2de6;
width:100%;
height:100vh;
position:fixed;
z-index:100;
top:0;
display: ${props=> props.active === true && "none"};
`

const Wrapper = styled.div`
 background: #fff;
    width: 300px;
    height: 100vh;
    justify-content: center;
    transition: all .35s ease-in;
    z-index: 999;
    overflow-y: auto;
    position: fixed;
    left: 0;
    top: 0;
   
    
`
const Top = styled.div`
display:flex;
flex-direction:column;

`
const Icon = styled.div`

  position:absolute;
  top:10px;
  right:5px;
  cursor:pointer;
  svg{ color:#303030;}

 
`
const Row = styled.div`
display:flex;
position:relative;
`
const Bottom = styled.div``
const SidebarWrap = styled.div`
    width: 100%;
    padding-top: 20px;
 

`


const LogoContainer = styled.div`
overflow:hidden;
width:100%;
height: 56px;
display: flex;
align-items: center;
justify-content:center;
`


const Logo = styled.img``

const LinkItem = styled.span`
width: 100%;
padding: 8px 25px;
background-color: #eee ;
border: none;
border-bottom: 1px solid #fff;
font-weight: 400;
font-size: .95rem;
display: flex;
align-items: center;
justify-content: start;
cursor:pointer;   
svg{
  padding-right:5px;
  color:#303030;
  font-size:1.45rem;
}
a{
  width: 100%;
  display: flex;
  align-items: center;
}
`








const Sidebar = ({sidebar,setSidebar}) => {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  })


  const logout = async () => {
  
    await signOut(auth) 
  };


  const handleSidebar = () => {
    setSidebar(false);
    document.body.style.overflowY = "scroll";
  };

  if(sidebar){
    document.body.style.overflow = "hidden";
  }
    

    return (
        <Container active={sidebar ? false : true}>
              
               <Wrapper>
               
                <Top>
                    <Row>

                    <LogoContainer><Link to="/"><Logo src="../Images/logo-2.png" /></Link></LogoContainer>
                    <Icon><Close onClick={handleSidebar}/></Icon>
                    </Row>

                    {user?.email ?    
                      <>
                      <Row><LinkItem><Link to="/panel/dashboard"> <AccountCircleOutlined />  My Account</Link></LinkItem></Row>
                      <Row onClick={()=>logout()}><LinkItem><ExitToApp /> Sign Out</LinkItem></Row>
                      </>
                      :
                      <Row><LinkItem><Link to="/sign-in"><ExitToApp /> Sign in</Link></LinkItem></Row>
                    }
                   
                </Top>
                <Bottom>
                  <SidebarWrap>
                  {Items.map((item,index)=><SubMenu key={index} item={item} />)}
                  </SidebarWrap>

                </Bottom>

               </Wrapper> 
               
           
        </Container>
    )
}

export default Sidebar
