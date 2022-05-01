import styled from 'styled-components';
import Navbar from '../Components/Navbar';
import { useEffect, useState } from 'react';
import { XS ,SM} from '../responsive';
import ProInformation from '../Components/ProInformation';
import Reviews from '../Components/Reviews';
import Gallery from '../Components/Gallery';
import { useParams,Redirect } from 'react-router-dom';
import { products } from '../data';
import Newsletter from '../Components/Newsletter';
import Footer from '../Components/Footer';
import { ShoppingCartOutlined } from '@material-ui/icons';


const Container = styled.div`

`
const Wrapper = styled.div`
display: flex;
margin: 4rem 0;
${SM({flexDirection:"column"})};
`

const InfoContainer = styled.div`
flex:2;
padding: 1rem;
${SM({paddingLeft:"3rem"})}
${XS({paddingLeft:"2rem"})}

`
const Title = styled.h1`
font-weight: 200;
`
const Desc = styled.p`
padding:15px 0 ;
max-width: 80%;
${XS({maxWidth: "100%"})}
`
const Price = styled.div`

padding-top:20px ;
`
const CurrentPrice = styled.span`
font-size: 2rem;
font-weight: 200;
margin: 10px 0;
`
const OldPrice = styled.span`
text-decoration: line-through;
margin-left:10px;
`
const FilterContainer = styled.div`
padding: 2rem 0;
display: flex;
flex-direction:column;

${XS({flexDirection: "column",justifyContent:"flex-start"})}

`
const Filter = styled.div`
display: flex;
align-items: center;
margin-right: 20px;
margin-top:10px;
${XS({padding: "15px 0"})}

`
const FilterTitle = styled.h4`
font-weight: 500;

b{
    padding-right:5px;
font-weight:700;
color:#9b9b9b;
}
`
const ProOptionContainer = styled.div`
border:${(props)=>props.active===true ? "1px solid #ff8d55" : "1px solid #ccb8b8"};
border-radius:4px;
padding:5px 13px;
display:flex;
align-items:center;
margin-right:10px;
position:relative;
cursor:pointer;

`
const ProOptionPrice = styled.h4`
font-weight:400;
font-size:.9rem
`
const Color = styled.span`
width: 40px;
height: 40px;
border-radius: 4px;
background: url("${(props)=>props.color}")transparent no-repeat center;
/* background-color: ${(props)=>props.color}; */
display: block;
margin-right: 10px;

`
const Size = styled.h4`

margin-right: 10px;
padding:8px 0;
`
const DetailsContainer = styled.ul`
padding:0;


`
const Detail = styled.li`
font-weight:400;
padding:5px 0;
list-style:${(props)=>props.type ? "disc" :"none"}!important;
max-width:700px;
b{
    padding-right:5px;
font-weight:700;
color:#9b9b9b;
}

`

const AddContainer = styled.div`
display: flex;
margin-top: 20px;

`
const AmountContainer = styled.div`
display: flex;
align-items: center;
border: 1px solid #848484;
padding-left:  10px;
border-radius: 5px;
height: 40px;
background-color: rgb(230, 230, 230);
margin-right:2rem;
`
const Select = styled.select`
background-color:transparent;
border:none;
height:100%;
cursor: pointer;
padding-left: 10px;
`
const Option = styled.option`
padding:5px;
`
const AddBtn = styled.button`
   
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

const Tabs=styled.div`

margin: 1rem;
${SM({display: "none"})}
`
const BottomContainer=styled.div`

display:none;
flex-direction:column;
${SM({display: "flex",padding: "0 20px"})}

`
const Nav=styled.div`
display:flex;
`
const NavItem=styled.div`
padding:10px;
font-weight: 400;
cursor: pointer;
border: 1px solid #eee;
/* border-bottom:2px solid #fff!important; */
margin: 0 5px ;
z-index:10;
background-color: #eee;
${(props)=>props.active==="true" && {
    backgroundColor: "#fff",
    position: "relative",
    ":after":{content:"' '",position:'absolute',bottom:'-2px',left:'0',width:"100%",height:"2px",backgroundColor:"#fff"}
    
}}
`
const TabContainer=styled.div`

background-color: #fff;
border: 1px solid #eee;
padding: 20px 40px;
`


const Product = () => {

    const  {idProduct}  = useParams();
    
    
    const [cart, setCart] = useState(false);
    const [tab, setTab] = useState(1);
    const [price, setPrice] = useState();
    const [proOptionIndex, setProOptionIndex] = useState(0);

  

    const proId=JSON.parse(idProduct)
    const productInfo=products.find(x => x.id === proId);
    const currentProOption=productInfo.proOptions && productInfo.proOptions.find((o=>o.id===proOptionIndex+1));
    

    
    var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    });

    const handleProOption=(index,finalPrice)=>{
        
    setPrice(finalPrice)
    setProOptionIndex(index)

    }

  

const handleSubmit=(e)=>{
         
    const arrayClick=localStorage.getItem('beauty-shop-proIds') ? JSON.parse(localStorage.getItem("beauty-shop-proIds")) : [];
    

    e.preventDefault();
        const idPro=productInfo.id;  
        const img=productInfo.img;  
        const title=productInfo.title;  
        const info=productInfo.info;  
        const category=productInfo.category;  
        const discount=productInfo.discount;  
        const rate=productInfo.rate;  
        const optionSelected=currentProOption;
        const currentPrice=price;
        const prevPrice= optionSelected.price;
        const qtyValue=e.target.qty.value;
        const qty=JSON.parse(qtyValue);
        const existNum=productInfo.existing;
        const newObj={Qty:qty,Id:idPro,Image:img,Title:title,Info:info,Category:category,PrevPrice:prevPrice,Price:currentPrice,Discount:discount,Rate:rate,OptionSelected:optionSelected,ExistNum:existNum};

      

           const allIds=arrayClick.map((arr)=>arr.Id);

    
           if(allIds.indexOf(idPro) !== -1) {
              
       
            const findMyArr= arrayClick.find(a=>a.OptionSelected.id === optionSelected.id &&  a.Id===idPro)

            
           if(findMyArr!== undefined){
            const newArr= arrayClick.map((arr)=>
           arr.Id===idPro && arr.OptionSelected.id === optionSelected.id ? {Qty:arr.Qty+qty > existNum ? existNum : arr.Qty+qty,Id:idPro,Image:img,Title:title,Info:info,Category:category,PrevPrice:prevPrice,Price:currentPrice,Discount:discount,Rate:rate,OptionSelected:optionSelected,ExistNum:existNum} 
           : arr
      
           )
           localStorage.setItem('beauty-shop-proIds', JSON.stringify(newArr));
         
           }else{

            arrayClick.push(newObj); 
            localStorage.setItem('beauty-shop-proIds', JSON.stringify(arrayClick));
           }

         
       }else{

          arrayClick.push(newObj); 
          localStorage.setItem('beauty-shop-proIds', JSON.stringify(arrayClick));
       
       } 

       setCart(true)

   }

   useEffect(() => {
             
             const calculatePrice=(100-productInfo.discount)*(productInfo.price)/100;
             const finalPrice=calculatePrice.toFixed(2)
             setPrice(finalPrice)

      }, [])

   if (cart) {
    return <Redirect to="/cart" />;
  }

   
  
    return (
        <>
        <Navbar />
        <Container>


            <Wrapper>
            <Gallery data={productInfo.gallery} proId={proId} />
           
       
                    <InfoContainer>
                <Title>{productInfo.title}</Title>
                <Desc>{productInfo.info}</Desc>
                     <Price> 
                    <CurrentPrice>{formatter.format(price)}</CurrentPrice>
                    {productInfo.discount > 0 &&
                    <OldPrice>${productInfo.price}</OldPrice>
                    }
                
                    </Price>

                    {productInfo.proOptions &&
                     <FilterContainer>
                     
            <FilterTitle><b>{currentProOption.type}</b>
            { currentProOption.title} 
             </FilterTitle>

             <Filter>
            {productInfo.proOptions.map((proOption,index)=>
               { const calculatePrice=(100-productInfo.discount)*(proOption.price)/100;
                 const finalPrice=calculatePrice.toFixed(2);
                return(
              <ProOptionContainer key={proOption.id} active={index===proOptionIndex && true} onClick={()=>handleProOption(index,finalPrice)}>
             {proOption.type==="color" ?
             <Color color={proOption.url}  />
             : <Size>{proOption.title}</Size>
            
            } 
            
              <ProOptionPrice> {formatter.format(finalPrice)}</ProOptionPrice>
             
              </ProOptionContainer>  
                )
                })}
        
           
                </Filter>

            </FilterContainer>
                    }

            {productInfo.details &&
            <DetailsContainer>

            


                {productInfo.details.map((detail,index)=>
                
                <Detail key={index} ><b>{detail.title} :</b>{detail.detail}</Detail>
                )}

            </DetailsContainer>
                }

                {productInfo.information &&
            <DetailsContainer>

                {productInfo.information.map((info,index)=>
                
                <Detail key={index} type="info" >{info.text}</Detail>
                )}

            </DetailsContainer>
                }

            <form onSubmit={handleSubmit}>
            <AddContainer>
                <AmountContainer>
                    <FilterTitle>Qty</FilterTitle>
                    <Select name='qty'>
                    
                    {(() => {
                    const options = [];
                   

                    for (let i = 1; i <= productInfo.existing; i++) {
                        options.push(<Option value={i}>{i}</Option>);
                        
                    }
                    return options;

                })()}
                 
                    
                    </Select>
                  
                </AmountContainer>

                <AddBtn type="submit"><ShoppingCartOutlined />ADD TO CART</AddBtn>

            </AddContainer>
           

            </form>
            </InfoContainer>

            </Wrapper>
         
            <Tabs>
            <Nav>
                <NavItem active={tab===0 && "true"} onClick={()=>setTab(0)}>Information</NavItem>
                <NavItem active={tab===1 && "true"} onClick={()=>setTab(1)}>Reviews</NavItem>
            </Nav>

            <TabContainer>
            {tab===0 ? <ProInformation /> : tab===1 ? <Reviews proId={proId} proTitle={productInfo.title} /> : null}
            </TabContainer>

            </Tabs>
            <BottomContainer>
            <ProInformation />
            <Reviews proId={proId} proTitle={productInfo.title} />
            </BottomContainer>
        </Container>

        <Newsletter />
        <Footer />
       
        </>
    )
}

export default Product
