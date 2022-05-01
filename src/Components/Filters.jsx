import { ArrowRight, Check, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import styled from "styled-components";
import "../Style.css";
import { FilterData } from '../data';
import Slider from '@material-ui/core/Slider';
import { useState } from "react";

const Container=styled.div`
width: 100%;
border: 1px solid #eee;
border-radius: 5px;
`
const Filter=styled.div`

border-bottom:${(props)=>props.type === "true" ? "1px solid #d1d1d1" : "1px solid #eee"};
height: ${(props)=>props.dropdown ? "auto" : "50px"};
overflow: hidden;

`
const FilterTop=styled.div`
display: flex;
justify-content: space-between;
height: 30px;
padding: 10px;
cursor: pointer;
`
const FilterName=styled.h2`
font-weight: 700;
font-size: 1rem;
color: #414141;
`
const FilterBottom=styled.div`
padding: 0 20px 10px;
`

const PriceFilter = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`
const MinPrice = styled.span``
const MaxPrice = styled.span``

const FilterList = styled.ul`
padding: 0;
`
const FilterListItem = styled.li`
display: flex;
padding: 10px 0;

`
const Checkbox = styled.span`
width: 18px;
height: 18px;
border-radius: 5px;
display: block;
position: relative;
background-color: ${(props)=>props.check ? "#5d54c4" : "#c7c7c7"};
margin-right: 10px;

svg{
  position: absolute;
  font-size: 1.3rem;
  z-index: 2;
  top: -2px;
  left: -1px;
  color: #fff;
  
  
}
`
const CheckInput = styled.input`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
opacity: 0;
z-index: 10;
cursor: pointer;
`

const CatList = styled.ul`
padding-left: ${(props)=>props.type === "top" ? 0 : "23px"};

`
const CatListItem = styled.li`

font-weight: 400;
padding: 5px 0;
cursor:pointer;
`
const TopCatName = styled.span`
display: flex;
align-items: center;
font-weight: 700;

`



const Filters = ({type}) => {
   

    
  const [value, setValue] =  useState([50,200]);
  const [dropdown, setDropdown] = useState([false,false,false]);
  const [checked, setChecked] = useState(
    new Array(FilterData.length).fill(false)
    ); 

    
console.log(dropdown)

  const handleClick = (indexNum) => {

    const updateDropdow = dropdown.map((item, index) =>
      index === indexNum ? !item : item
      
    );
   setDropdown(updateDropdow);
  };


  const handleCheck = (filterIndex) => {

    const updatedchecked = checked.map((item, index) =>
      index === filterIndex ? !item : item
      
    );
   setChecked(updatedchecked);
  };


  const rangeSelector = (event, newValue) => setValue(newValue);
  

  
  return (
    <>

      <Container type={type === "modal" && "true"}>

      <Filter dropdown={dropdown[0]} type={type === "modal" && "true"}>
        <FilterTop onClick={()=>handleClick(0)}>
          <FilterName>Categories</FilterName>
          {dropdown[0] ? <KeyboardArrowUp /> : <KeyboardArrowDown /> }
        </FilterTop>

        <FilterBottom>
          <CatList type="top">
              <CatListItem>
                 
                  <TopCatName> <ArrowRight />Makeup</TopCatName>
                  <CatList>
                      <CatListItem>Eyes</CatListItem>
                      <CatListItem>Lips</CatListItem>
                      <CatListItem>Eyebrows</CatListItem>
                      <CatListItem>Face</CatListItem>
              
                  </CatList>
              </CatListItem>
          </CatList>
        </FilterBottom>

        </Filter>

      <Filter dropdown={dropdown[1]} type={type === "modal" && "true"}>
        <FilterTop onClick={()=>handleClick(1)}>
          <FilterName>Price</FilterName>
          {dropdown[1] ? <KeyboardArrowUp /> : <KeyboardArrowDown /> }
        </FilterTop>

        <FilterBottom>
          

      
      <Slider
        color="gray"
        min={0}
        max={300}
        value={value}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
      />
      <PriceFilter>
      <MinPrice>${value[0]}.00</MinPrice>
      <MaxPrice>${value[1]}.00 </MaxPrice>
       
      </PriceFilter>
        </FilterBottom>

        </Filter>

       
        <Filter dropdown={dropdown[2]} type={type === "modal" && "true"}>
        <FilterTop onClick={()=>handleClick(2)}>
          <FilterName>Brands</FilterName>
          {dropdown[2] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </FilterTop>

        <FilterBottom>
         <FilterList>
      
           {FilterData.map((item, index) =>( 
           <FilterListItem>
             <Checkbox check={checked[index]}>
               <CheckInput type="checkbox"
                            checked={checked[index]}
                            onChange={()=>handleCheck(index)}
               />
               {checked[index] && <Check /> }
             </Checkbox>

            {item.name}
           </FilterListItem>

           )
           )}
         </FilterList>
        </FilterBottom>

        </Filter>
       

      </Container>
    
    
    </>
  );
}


export default Filters
