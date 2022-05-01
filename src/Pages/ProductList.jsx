import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Filters from "../Components/Filters";
import { products } from "../data";
import ProductItem from "../Components/ProductItem";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import Announcement from "../Components/Announcement";
import { SM, XS } from "../responsive";
import { Clear, FilterList } from "@material-ui/icons";
import { useEffect, useState } from "react";

const Container=styled.div`
  
  ${SM({width:"100%",alignItems:"center"})}
`
const Wrapper=styled.div`
 display :flex;
 padding: 1rem;
 ${SM({padding:"1rem 0"})}
  
`
const FilterWrapper=styled.div`
flex: 1;
max-width: 235px;
${SM({display:"none"})}
  
`

const ProductListContainer=styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 0 25px;
  ${SM({padding:"0 10px"})}

`
const ProductListTitle=styled.h2`
font-weight: 700;
color: #464646;
margin-bottom: 1rem;
padding-left: 15px;

`
const SortContainer=styled.div`
display: flex;
width: 100%;
justify-content: space-between;
margin: 1rem 0;
`
const Sort=styled.div`
display: flex;
align-items: center;
padding: 0 10px;
`
const SortTitle=styled.span`
padding-right: 10px;
${XS({display:"none"})}
`
const ShowButton=styled.button`
padding: 8px;
background-color: #eee;
border:1px solid #b4b4b4;
border-radius: 4px;
cursor: pointer;
margin-right: 10px;

`
const SortList=styled.select`
width: 150px;
height: 40px;
background-color: transparent;
border:1px solid #b4b4b4;
border-radius: 4px;
cursor: pointer;
`
const SortListItem=styled.option``
const List=styled.div`

display: flex;
flex-wrap: wrap;
justify-content:start; 
${SM({paddingLeft: "10%"})}
${XS({paddingLeft: "0",justifyContent:"center"})}

`
const ShowFilters = styled.div`

  display:none;
  align-items:center;
  justify-content:center;
  padding:10px;
  border-radius:3px;
  cursor:pointer;
  box-shadow: -7px 6px 10px -6px rgba(6,6,6,0.22);
  border: 1px solid #bdbdbd;
  margin-top: 2rem;
  background-color: #f4f4f4;
  ${SM({display:"flex"})}
  svg{
    padding-right:10px;
  }

`
const Modal = styled.div`
display: none;
flex-direction:column;
width: 100%;
height: 100vh;
background-color: #eee;
position: fixed;
top: 0;
z-index: 100;
align-items: end;
overflow:auto;
${SM({display:"flex"})}

`
const Close=styled.span`
 padding:10px;
 cursor:pointer;
`
const ModalHeader = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
border-bottom:1px solid #b4b4b4;
margin-bottom:10px;
`
const Title = styled.h3`
padding-left:10px;

`



const ProductList = () => {

  const [showFilters, setShowFilters] = useState(false)

  const handleFilter=(type)=>{

    if(type==="open"){
    setShowFilters(true);
    document.body.style.overflowY = "hidden";
    }else{
      setShowFilters(false);
      document.body.style.overflowY = "scroll";
    }
  }
 
useEffect(() => {
  document.body.style.overflowY = "scroll";
}, [])
   
  
  return (
    <>
    <Navbar />
    <Announcement />
          
    <Container>
      <Wrapper>
      <FilterWrapper> <Filters type="default"/> </FilterWrapper>
      <ProductListContainer>
        <ProductListTitle>
          MakeUp
          </ProductListTitle>
          <ShowFilters onClick={()=>handleFilter("open")}> <FilterList /> Show Filters</ShowFilters>
        <SortContainer>
          <Sort>
            <SortTitle>
              Show In Page:
            </SortTitle>
            <ShowButton>20</ShowButton>
            <ShowButton>40</ShowButton>
            
          </Sort>
          <Sort>
            <SortTitle>
              Sort By :
            </SortTitle>
           <SortList>
             <SortListItem>Newest</SortListItem>
             <SortListItem>Price(Asc)</SortListItem>
             <SortListItem>Price(Desc)</SortListItem>
           </SortList>
          </Sort>
        </SortContainer>
          
          
        <List>
          {products.map((item)=><ProductItem item={item} width="230px" margin="15px 5px 15px 0"/>)}
        </List>
      </ProductListContainer>
      </Wrapper>
    </Container>
   
   {showFilters &&
    <Modal>
      <ModalHeader>
        <Title>Filters</Title>
       <Close><Clear onClick={()=>handleFilter("close")} /></Close> 
      </ModalHeader>
     <Filters type="modal" />
    </Modal>
    }

        <Newsletter />
        <Footer />
    </>
  );
}


export default ProductList
