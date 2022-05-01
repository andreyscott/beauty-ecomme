import { Clear, SearchOutlined } from '@material-ui/icons';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MD, SM, XS } from '../responsive';

const Container = styled.div`
padding: 1rem;
`
const Wrapper=styled.div`
display:flex;
flex-wrap:wrap;

`

const Title=styled.h2`
  margin-bottom:1rem;
`


const Product = styled.div`
display:flex;
-webkit-box-shadow: 2px 0px 7px 0px #D2D2D2; 
box-shadow: 2px 0px 7px 0px #D2D2D2;
margin: 10px 5px;
width:30%;
padding:10px;
position:relative;
${MD({width:"40%"})}
${SM({flexDirection:"Column"})}
${XS({width:"100%",flexDirection:'row'})}
`



const ImageContainer = styled.div`
flex:1;
display:flex;
align-items:center;
`
const Image = styled.img`
height:90px;

`


const InfoContainer = styled.div`
flex:2;

`

const Rate = styled.div`
position: relative;
width:96px;

`



const ProTitle = styled.h3`
font-weight: 700;
font-size: 1rem;
`
const ProInfo = styled.p`
font-size: .9rem;
padding: 5px 0 10px;
height:28px;
overflow:hidden;

`
const ButtonContainer = styled.div`

margin-top: 20px;
display: flex;
align-items: center;
justify-content:end;
 `
const Btn = styled.button`
padding: 8px;
border: none;
margin-left:5px;
color: #fff;
background-color:#003c8b ;
border-radius: 4px;
font-weight: 500;
font-size: .85rem;
cursor: pointer;
display: flex;
align-items: center;

svg{font-size:1.2rem;}
:hover{
    background-color:#7a9fce;
}
 `
const Delete = styled.button`
padding: 1px;
border: none;
color: #fff;
background-color:#acacac ;
opacity:.5;
border-radius: 4px;
cursor: pointer;
display: flex;
align-items: center;
position:absolute;
top:8px;
right:8px;
svg{font-size:1.2rem;}
:hover{opacity:1;}
 `
const Notice = styled.h2`
 
color:#a8a8a8b0;
 `

const Wishlist = () => {
    const wishlistArray=localStorage.getItem('beauty-shop-wishlist') ? JSON.parse(localStorage.getItem("beauty-shop-wishlist")) : [];

    const handleDelete=(item)=>{
     
        
          const itemIndex= wishlistArray.indexOf(item)
           if(itemIndex !== -1){
            wishlistArray.splice(itemIndex,1);  
            localStorage.setItem('beauty-shop-wishlist', JSON.stringify(wishlistArray));
           } 

           window.location.reload()
         } 
   

    return (
        <Container>
             <Title>Wishlist</Title>
            <Wrapper>

            {wishlistArray.length === 0 ? 
            
        <Notice>You don't have any product in your wishlist !</Notice>
        
        : wishlistArray.map((item,index)=>
            <Product key={index}>
 
      
           
            <ImageContainer>
            <Image src={item.Image} />
            </ImageContainer>
          
          <InfoContainer>
          <ProTitle>{item.Title}</ProTitle>
         
          <Rate>
                  <Rating name="read-only" size="small" value={item.Rate} precision={0.1} readOnly />
                
          </Rate>
           
          <ProInfo>{item.Info}</ProInfo>


            
    
         <ButtonContainer>
            <Link to={`/product/${item.Id}`} >
         <Btn><SearchOutlined />View Product</Btn>
         </Link>
         <Delete onClick={()=>handleDelete(item)}><Clear /></Delete>
         </ButtonContainer>

         </InfoContainer>
        </Product>
        )}

</Wrapper>
    </Container>
    )
}

export default Wishlist
