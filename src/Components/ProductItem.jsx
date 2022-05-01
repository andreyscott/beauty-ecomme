import { FavoriteBorderOutlined, ShoppingCartOutlined, StarOutlined, SearchOutlined} from '@material-ui/icons'
import React,{useState} from 'react'
import styled from 'styled-components'
import {Redirect,Link } from 'react-router-dom';
import { Rating } from '@mui/material';



const Container = styled.div`
width: ${(props)=>props.width ? props.width : "225px"};
margin: ${(props)=>props.margin ? props.margin : "5px 2px 0 2px"}!important;
padding:10px;
`


const TopLink=styled(Link)`
      width:100%;
      height:100%;
      position:absolute;
      z-index:2;
      top: 0;
      left: 0;
      background-color: rgba(180, 180, 180, 0.2);
      opacity:0;
      display:flex;
      align-items:center;
      justify-content:center;

`

const Top = styled.div`
width: 100%;
height: 200px;
background-color: #ffffff;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
border-radius: 4px;
position:relative;
box-shadow: 0px 2px 5px 0px #eee;
:hover ${TopLink}{ opacity:1 }

`

const See=styled.span`

width: 35px;
height: 35px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
background-color: #cecbed;
transform: scale(1.1);
svg{color: #5d54c4; }

`


const ImageContainer = styled.div`
width: 100%;
height: 70%;
display: flex;
justify-content: center;


`
const Image = styled.img`
height: 100%;

`

const Rate = styled.div`
width:96px;
position: relative;



`


const Bottom = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
`
const Title = styled.h3`
font-weight: 700;
font-size: 1rem;
`
const Info = styled.p`
font-size: .9rem;
padding: 5px 0 10px;
max-height: 47px;
overflow: hidden;

`
const Price = styled.div`


`
const CurrentPrice = styled.span`
font-weight:700;
font-size: 1.2rem;
margin: 10px 0;
`
const OldPrice = styled.span`
text-decoration: line-through;
margin-left:10px;
`
const Row = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 1rem;
`
const Icon=styled.div`
cursor: pointer;

svg{font-size: 1.4rem; color: #424242; }

&:hover{
   
    transform: scale(1.1);
   
}
`


const Btn = styled.button`
   
    background-color: #3c3c3c;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 10px;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 3px;
    overflow:hidden;
    display:flex;
    align-items:center;
    box-shadow:-5px 6px 10px -6px rgba(6, 6, 6, 0.45);
   
    svg{font-size:1.2rem;padding-right:10px;}
    

    :hover{
        background-color: #666;
       
    }
`


const ProductItem = ({item,width,margin}) => {

    const [cart, setCart] = useState(false);
    const [wishlist, setWishlist] = useState(false);

    const calculatePrice=(100-item.discount)*(item.price)/100;
    const finalPrice=calculatePrice.toFixed(2)

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    
        });
   

        const handleFavorite=(item)=>{
            const wishlistArray=localStorage.getItem('beauty-shop-wishlist') ? JSON.parse(localStorage.getItem("beauty-shop-wishlist")) : [];
            
             const idPro=item.id;  
             const img=item.img;  
             const title=item.title;  
             const info=item.info;  
             const rate=item.rate;  
             const newObj={Id:idPro,Image:img,Title:title,Info:info,Rate:rate}
             const checkItem=wishlistArray.find(w=>w.Id===item.id)
     
           
         
                if(checkItem !== undefined) {
                
                    const itemIndex=wishlistArray.indexOf(checkItem)
                    wishlistArray.splice(itemIndex,1); 
                

                }else{
        
                wishlistArray.push(newObj); 
              
                
                }
               
                localStorage.setItem('beauty-shop-wishlist', JSON.stringify(wishlistArray));
               setWishlist(true)
            
    
        }


    const handleClick=(item)=>{
        const arrayClick=localStorage.getItem('beauty-shop-proIds') ? JSON.parse(localStorage.getItem("beauty-shop-proIds")) : [];
        
         const idPro=item.id;  
         const img=item.img;  
         const title=item.title;  
         const info=item.info;  
         const category=item.category;  
         const discount=item.discount;  
         const rate=item.rate;  
         const optionSelected=item.proOptions[0];
         const prevPrice=optionSelected.price;
         const existNum=item.existing;

            const allIds=arrayClick.map((arr)=>arr.Id);

     
            if(allIds.indexOf(idPro) !== -1) {
            
            const updatedArray=arrayClick.map((arr)=>
            arr.Id===idPro && arr.OptionSelected.id === optionSelected.id ? 
            {Qty:arr.Qty+1,Id:idPro,Image:img,Title:title,Info:info,Category:category,PrevPrice:prevPrice,Price:finalPrice,Discount:discount,Rate:rate,OptionSelected:optionSelected,ExistNum:existNum} 
            : arr
            )
            localStorage.setItem('beauty-shop-proIds', JSON.stringify(updatedArray));

        }else{

           arrayClick.push({Qty:1,Id:idPro,Image:img,Title:title,Info:info,Category:category,PrevPrice:prevPrice,Price:finalPrice,Discount:discount,Rate:rate,OptionSelected:optionSelected,ExistNum:existNum}); 
           localStorage.setItem('beauty-shop-proIds', JSON.stringify(arrayClick));
        } 
 
    
       
        setCart(true)
      
       
    }
    
   if (cart) {
    return <Redirect to="/cart" />;
  }
   if (wishlist) {
    return <Redirect to="/panel/wishlist" />;
  }
  



    return (
        <Container width={width} margin={margin}>
            <Top>
            <TopLink to={`/product/${item.id}`}>
           
            <See><SearchOutlined /></See>
            </TopLink>
               
                <ImageContainer>
                <Image src={item.img} />
                </ImageContainer>

            </Top>

            <Bottom>
                <Title>{item.title}</Title>
  
                <Rate>
                    
                <Rating  
                            value={item.rate}
                            size="small"
                            precision={0.1}
                            emptyIcon={<StarOutlined style={{ opacity: 0.55 }} fontSize="inherit" />}
                            readOnly
                    />
                
                </Rate>
             
                <Info>{item.info}</Info>
                <Price>
                <CurrentPrice>
                {formatter.format(finalPrice)}    
                </CurrentPrice>
                    {item.discount>0 &&
                    <OldPrice>${item.price}</OldPrice>
                    }
                </Price>
                <Row>
                <Btn onClick={()=>handleClick(item)}>    <ShoppingCartOutlined />ADD TO CART</Btn>
        
                <Icon onClick={()=>handleFavorite(item)}>
                <FavoriteBorderOutlined />
                </Icon>
                </Row>
            </Bottom>
        </Container>
    )
}

export default ProductItem
