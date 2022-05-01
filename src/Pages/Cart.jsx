import Navbar from '../Components/Navbar';
import styled from "styled-components";
import { Clear } from '@material-ui/icons';
import {MD, SM,XS} from "../responsive";
import {Link } from 'react-router-dom';
import Newsletter from '../Components/Newsletter';
import Footer from '../Components/Footer';
import Announcement from '../Components/Announcement';


const Container= styled.div`
display: flex;
flex-direction: column;
padding: 20px;
margin: 1rem 0;
min-height: 52vh;
`

const Title = styled.h2`
font-size:2rem;
font-weight: 400;
padding: 10px 20px;

::after{
    content: '';
    width: 40%;
    height: 1px;
    background-color: #eee;
    display: block;
    ${SM({display:"none"})};

}
${SM({padding:"0",fontSize:"1.8rem"})};
${XS({fontSize:"1.5rem"})};

`
const Wrapper= styled.div`
display: flex;
width: 100%;
padding-top: 15px;
justify-content:space-between;
${SM({flexDirection:"column",paddingTop:"10px"})};
`
const TitleContainer= styled.div`
display:flex;
border-bottom: 1px solid #d6d6d6;
padding-bottom: 15px;
${SM({display:"none"})};
`
const BagItems= styled.div`
width: 65%;
padding: 10px 35px;

${SM({width:"100%",padding:"10px 0",borderTop:"1px solid #d6d6d6"})};
${MD({padding:"10px 0"})};
`
const Item= styled.div`
display: flex;
border-bottom: 1px solid #d6d6d6;
padding: 3rem 0;
position:relative;
${SM({padding:"1rem 10px",flexWrap:"wrap",borderBottom:"1px solid #d6d6d6"})};

`

const ColHalf= styled.div`
flex:.5;
display:flex;
align-items:center;
justify-content:center;
${SM({padding:"0 11px",position:"absolute",top:"10px",right:"10px"})};

svg{
    cursor:pointer;
    ${XS({fontSize:"1.1rem"})};
    
}
`
const Col1= styled.div`
flex:1;
display:flex;
align-items:center;

`
const Col3= styled.div`
flex:3;
display:flex;
align-items:center;
${SM({width:"100%",flexGrow:"1",flex:"none",justifyContent:"start"})};

`


const Details= styled.div` `

const ImageContainer= styled.div`
display: flex;
justify-content: center;
align-items: center;
height:100px;
margin-right:20px;
${XS({height:"65px"})};

`

const Image= styled.img`
height: 100%;
${XS({height:"100%"})}
`

const ProductRow= styled.h3`
font-weight: ${(props)=>props.type==="bold" ? "700":"400"};
font-size: ${(props)=>props.type==="bold" ? "1.3rem" :"1rem"};
padding:15px 0;
${SM({fontSize:"1rem"})};
${XS({fontSize:".9rem"})};

`

const ProOption = styled.div`

b{padding-right:5px;
font-weight:700;
color:#9b9b9b;}
${SM({padding:"10px 0"})};
`
const ResTitle = styled.span`
display:none;
padding-right:5px;
font-weight:700;
color:#9b9b9b;
${SM({display:"block"})};
`
const Color = styled.span`
width:50px;
height:50px;
border-radius: 4px;
background: url("${(props)=>props.color}")transparent no-repeat center;
/* background-color: ${(props)=>props.color}; */
display: block;
margin-right: 5px;
`

const ProductPrice= styled.h3`
font-size: ${(props)=>props.type ? "1rem": "1.3rem"};
font-weight: ${(props)=>props.type ? "300": "500"};
${XS({fontSize:"1rem",fontWeight: "500"})}
${SM({fontSize:"1.2rem"})}

`

const Summary= styled.div`
display: flex;
width: 25%;
margin: 0 18px;
border:1px solid #d6d6d6;
border-radius: 5px;
padding: 10px 15px;
flex-direction: column;
max-height:370px;
position: relative;
left:0;
right:0;
${SM({width:"80%",margin:"1rem auto"})};

`
const SummaryTitle= styled.h2`
font-weight: 400;
padding: 15px 0;
`
const SummaryItem= styled.div`
display: flex;
justify-content: space-between;
padding: 10px 0;
font-weight: ${(props)=>props.type === "total" && 700};
font-size: ${(props)=>props.type === "total" && "1.4rem"};
`
const SummaryItemTitle= styled.div``
const SummaryItemPrice= styled.div``

const ButtonContainer= styled.div`

display: flex;
flex-direction: column;
width: 100%;
margin-top: 20px;
`
const Btn= styled.button`
background-color:${(props)=>props.type === "filled" ? "#000" : "#fff"};
border: 1px solid ${(props)=>props.type === "filled" ? "#000" : "#919191"};;
color: ${(props)=>props.type === "filled" ? "#ffffff" : "#000000"};
padding: 10px;
margin: 0 22px 10px;
font-weight: 700;
font-size: 1rem;
cursor: pointer;
`

const CurrentPrice = styled.span`
font-weight:500;
font-size: 1.2rem;
margin: 10px 0;
${XS({fontSize:"1rem"})};
`

const Notice = styled.h2`
 
color:#a8a8a8b0;
margin:1rem 2rem;
${SM({margin:"1rem"})};
 `



const Cart = () => {

    const cartItems=JSON.parse(localStorage.getItem("beauty-shop-proIds"))
    const subTotal = cartItems?.map(item=> item.Qty*item.PrevPrice).reduce((prev, curr) => prev + curr, 0)
    const total = cartItems?.map(item=> item.Qty*item.Price).reduce((prev, curr) => prev + curr, 0)
    const quantity = cartItems?.map(item=> item.Qty).reduce((prev, curr) => prev + curr, 0)
    const discount = subTotal-total;

    

  console.log(subTotal)
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    
        });

        
const handleDelete=(item)=>{
    
   
    const itemIndex= cartItems.indexOf(item)
    if(itemIndex !== -1){
    cartItems.splice(itemIndex,1); 
    localStorage.setItem('beauty-shop-proIds', JSON.stringify(cartItems));
    }
    window.location.reload()
}


    return (
        <>

        <Navbar />
        <Announcement />
          
        <Container>
              
            <Title>SHOPPING CART</Title> 

            {cartItems?.length === 0 || cartItems === null ?
            
            <Notice>Your Cart is empty !</Notice>
            
            :


            <Wrapper>
             
          
                <BagItems>
                <TitleContainer>
                    
                    <Col3>Item</Col3>
                    <Col3>Option</Col3>
                    <Col1>Qty</Col1>
                    <Col1>Total</Col1>
                    <ColHalf>delete</ColHalf>
                   
                </TitleContainer>
                    {cartItems.map((item,index)=>
                    
                    <Item key={index}>
                  
                   
                        <Col3>
                        <Link to={`/product/${item.Id}`}>
                            <ImageContainer>
                        <Image src={item.Image}/>
                        </ImageContainer>
                        </Link>

                        <Details>
                      
                      <ProductRow type="bold">{item.Title} </ProductRow>
                      <ProductPrice type="sm">

                       
                       
                      
                <CurrentPrice> {formatter.format(item.Price)}</CurrentPrice>
                    
                
                     
                       </ProductPrice>
           
                     
                      </Details>
                        </Col3>
                       <Col3> 

                       
                       
                       <ProOption><b>{item.OptionSelected.type} :</b>{item.OptionSelected.title}</ProOption>
                       {item.OptionSelected.url &&
                       
                       <Color color={item.OptionSelected.url} />
                        }
                    
                       
                       </Col3>
                       <Col1>  
                
                     <ResTitle>Qty :</ResTitle>
                    {item.Qty}
             
                        </Col1>

                       <Col1>  <ResTitle>Total :</ResTitle>   <ProductPrice>   {formatter.format(item.Qty*item.Price)}</ProductPrice></Col1>
                       <ColHalf><Clear onClick={()=>handleDelete(item)}/></ColHalf>

                        
                        </Item>
                       )}
                    </BagItems>

                <Summary>

                    <SummaryTitle>SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemTitle>Subtotal</SummaryItemTitle>
                        <SummaryItemPrice> 
                            {formatter.format(subTotal) }
                       
                        </SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemTitle>Shipping Discount</SummaryItemTitle>
                        <SummaryItemPrice> -{formatter.format(discount) }</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemTitle>Quantity</SummaryItemTitle>
                        <SummaryItemPrice>{quantity}</SummaryItemPrice>
                    </SummaryItem>

                    <SummaryItem type="total">
                        <SummaryItemTitle>Total</SummaryItemTitle>
                        <SummaryItemPrice> {formatter.format(total) }</SummaryItemPrice>
                    </SummaryItem>

                    <ButtonContainer>
                    <Btn type="filled">Checkout Now</Btn>
                    <Btn><Link to="/products">Continue Shopping</Link></Btn>
                    </ButtonContainer>
                </Summary>
            </Wrapper>
}
        </Container>

        <Newsletter />
        <Footer />

        </>
    )
}

export default Cart
