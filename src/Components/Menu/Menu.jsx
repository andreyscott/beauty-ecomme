import { Link } from "react-router-dom"
import styled from "styled-components"

const MenuContainer = styled.div`
width: 100%;
height: 90vh;
display:flex;
justify-Content:space-between;
background-color: #f0f0f0;
position: absolute;
top: 100%;
left: 0;
z-index: 10;

`

const MenuWrapper = styled.div`

height: 100%;
width:60%;
`

const ImageContainer = styled.div`
height: 100%;
overflow: hidden;
width: 40%;
// padding-right: 5px;
display: flex;
flex-wrap: wrap;
justify-content:flex-end;


`

const Image= styled.img`

height:100%;


`

const MenuListTop = styled.ul`

display:flex;
padding: 30px;
flex-wrap: wrap;

`
const MenuList = styled.ul`
padding-top:10px;
padding-left:5px;
`
const MenuListItemTop = styled.li`
font-weight:700;
font-size: 1rem;
width: 30%;
padding-right: 15px;

 `
const MenuListItem = styled.li`
font-weight:400;
font-size: 1rem;
padding-bottom: 10px;
:hover{a{color:#5d54c4}}
 `



const Menu = ({menuData,image}) => {


    return (
    
             <MenuContainer>
                 <MenuWrapper>
                 <MenuListTop>
                 {menuData && menuData.map((L2,index)=>(
                     
                     
                <MenuListItemTop key={index}>
               
                    <Link to="/products">{L2.title}</Link>

                    {L2.Lev3 &&
                         <MenuList>
                           {L2.Lev3.map((item,index)=>(
                             
                        <MenuListItem key={index} type="title">
                        <Link
                        to={item.path}
                        >
                            {item.title}
        
                            </Link>
                           
                            </MenuListItem> 
                            
                         ))}
                      </MenuList>
                    }
                    </MenuListItemTop> 


                  
                 )
                 
                 )}
              </MenuListTop>

           

             
                  </MenuWrapper>
                  <ImageContainer>
                   
                   
                     <Image src={image}/>
                    
           
                </ImageContainer>
              </MenuContainer>
                
            
    )
}

export default Menu
