import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const SidebarItem = styled.div`
       display: flex;
       align-items: center;
       justify-content:space-between;
       padding:10px;
       border-bottom:1px solid #dbdbdb;
       cursor:pointer;
       border-left:${(props)=>props.active && "6px solid #632ce4"};

`

const SidebarLabel = styled(Link)`
  margin-left: 16px;
  cursor:pointer;
  font-weight:${(props)=>props.type && "700"};
  
    
`
const SubnavContainer = styled.div`

padding:10px 0 10px 15px; 
`
const SubnavWrapper = styled.div`
padding-left:10px;
padding-top:8px;
display:flex;
flex-direction:column;

${SidebarLabel}{
    padding:7px 0;
         
    
}
    
`

const SubMenu = ({item}) => {
    
    const [subnav, setSubnav] = useState(false);


    return (
                  
              <>
                  <SidebarItem onClick={()=>setSubnav(!subnav)} active={subnav}>
          
                <SidebarLabel to="/products">{item.title}</SidebarLabel>
                {subnav
                ?<ArrowDropUp />
                :<ArrowDropDown />
                }
                </SidebarItem>
                    
                    {subnav && item.Lev2.map((l2,index)=>
                    
                    <SubnavContainer>
                        <SidebarLabel type="top" to="/products">{l2.title}</SidebarLabel>
                        <SubnavWrapper>
                         {l2.Lev3 && l2.Lev3.map((l3)=>
                         <SidebarLabel to="/products">{l3.title}</SidebarLabel>
        
                         )}
                         </SubnavWrapper>
                      
                    </SubnavContainer>
                    )
                    
                     
                    
                    }
                </>
      
   
    )
}

export default SubMenu
