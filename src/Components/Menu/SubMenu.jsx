import { ArrowRight } from "@material-ui/icons"
import { Link } from "react-router-dom"
import styled from "styled-components"


const MenuContainer = styled.div`

padding: 15px;
height: 100%;
position: absolute;
left: 100%;
top: 0;

`

const MenuList = styled.ul`

display: flex;
flex-direction: column;
padding-left: 20px;



`
const MenuListItem = styled.li`
font-weight:400;
font-size: 1rem;
padding: 15px 0;
min-width:200px


:hover a{
    color:#ff6a36!important;
    font-weight: 700;
}
`


const SubMenu = ({subItems}) => {
    return (
 
             <MenuContainer>
                 <MenuList>
                 {subItems && subItems.map((item,index)=>(
                <MenuListItem key={index} type="title">
                <Link
                to={item.path}
                >
                    {item.title}

                    </Link>
                   
                    </MenuListItem> 
                    
                 ))}
              </MenuList>

              </MenuContainer>
                
            
      
    )
}

export default SubMenu
