import {  ArrowRight, ArrowLeft} from '@material-ui/icons'
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {XS} from "../responsive"
import ProductItem from './ProductItem'

const Slider = styled.div`
width: 100%;
display: flex;
flex-direction: column;
padding-bottom: 1rem;


`
const Container = styled.div`

display: flex;
margin:auto;
width: 93%;
overflow: hidden;
position:relative;
${XS({width:"250px"})}
`

const Title = styled.h2`
font-size:2rem;
font-weight: 300;
padding: 15px 30px;

::after{
    content: '';
    width: 40%;
    height: 1px;
    background-color: #eee;
    display: block;
    ${XS({width:"100%"})}

}
${XS({textAlign:"center",fontSize:"1.7rem"})}

`
const Wrapper = styled.div`

display: flex;

transform: translateX(${(props) => props.slideNum * -250}px);
transition: all .5s ease-in;

`


const Arrow = styled.span`
width: 35px;
height: 35px;
background-color: transparent;
border: 1px solid #c4c4c4;
border-radius: 5px;
display: flex;
align-items: center;
justify-content: center;
opacity: .6;
cursor: pointer;
z-index: 10;
position:absolute;
margin: auto 8px;
bottom: 0;
top: 0;
background-color: #eee;
border-radius: 5px;
left:${(props)=>props.direction==="left" && "0"};
right:${(props)=>props.direction==="right" && "0"};

&:hover{
opacity: 1;
transform: scale(1.1);
}
${XS({top:"40%",width:"30px",height:"30px",margin:"0 8px"})}
` 
const ProSlider = ({data,title}) => {

    const [slideNum, setSlideNum] = useState(0);
    const [wSize, setWSize] = useState();
    const [slideShow, setSlideShow] = useState(true);

    const handleWSize = () =>{
        
        setWSize(window.innerWidth);
        setSlideNum(0);

    }

  

    const length= data.length;
    const clickNum=length-(Math.floor(wSize/250));

    const handleClick=(dir)=>{
        if(dir==="right"){
            setSlideNum(slideNum < clickNum ? slideNum+1 : 0);
            
        }else{
            setSlideNum(slideNum > 0  ? slideNum-1 : clickNum);
        }
        wSize < 501 && setSlideShow(false)
        
    }

    useEffect(() => {
        handleWSize();
       
      
     }, [])

     
     useEffect(() => {
        if( wSize < 501 ){
        const time=slideShow ? 3000 : 9000 ;
     const text=setTimeout(() => {
          setSlideNum((slideNum) => slideNum < clickNum ? slideNum+1 : 0);
          !slideShow && setSlideShow(true)
      }, time);
       
      return () =>clearTimeout(text);
    }
      
    });

     window.addEventListener('resize',handleWSize);


    return (


        <Slider>

<Title>{title}</Title>
      

        <Container>
             
            
             <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowLeft />
                </Arrow>
          
                <Wrapper slideNum={slideNum} draggable >
                {data.map((item)=>(

<ProductItem key={item.id} item={item} w={"256px"} bc={"#f0f0f0"}  />
        ))}
        </Wrapper>

                <Arrow direction="right"  onClick={()=>handleClick("right")}>
                <ArrowRight />
                </Arrow>
             
            
        </Container>     
              

        </Slider>
    )
}

export default ProSlider
