import { ArrowRight, ArrowLeft} from '@material-ui/icons'
import React,{useState} from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import {sliderItems} from "../data"
import {MD, SM, XS} from "../responsive"
import { Link } from 'react-router-dom';

const Container = styled.div`
height: 75vh;
width: 100%;
display: flex;
align-items: center;
position: relative;
overflow:hidden;
/* left:0;
right:0; */
${SM({height:"50vh"})}
${XS({height:"82vh"})}




`
const Wrapper = styled.div`

display: flex;
transform: translateX(${(props) => props.slideNum * -100}vw);
transition: all .8s ease-in;
`
const Slide = styled.div`
width: 100vw;
height: 75vh;
display: flex;
align-items: center;
position: relative;
justify-content:center;
background-color: #${(props)=>props.bc};
${SM({height:"50vh"})}
${XS({height:"82vh"})};
::after{
    content:"";
    width:100%;
    height:100%;
    top:0;
    left:0;
    background-color:#000;
    opacity:.1;
    z-index:1;
    position:absolute;
    ${XS({opacity:".3"})}
}

`

const Arrow = styled.span`
width: 40px;
height: 40px;
background-color: #eeeeee82;
border: none;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
opacity: .6;
cursor: pointer;
position: absolute;
right:${(props)=>props.direction === "right" && "15px"};
left:${(props)=>props.direction === "left" && "15px"};
z-index: 2;
svg{color:#5b5b5b}
&:hover{
opacity: 1;
transform: scale(1.1);
}
${SM({width:"35px",height:"35px"})}
${XS({display:"none"})}
`

const BulletContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    justify-content: center;
    display: none;
    padding: 8px 0;
    background-color:#eeeeee0f;
    ${XS({display:"flex"})}

`
const Bullet = styled.span`

    width: 10px;
    height: 10px;
    background-color:${(props)=>props.active === true ? "#f0ae19" : "#ffffff"} ;
    display: inline-block;
    border-radius: 50%;
    margin: 0 5px;
`

const ImageContainer = styled.div`

height: 100%;
display: flex;
width:100%;
`
const Image = styled.img`
height:100%;
width:100%;
object-fit: cover;
${SM({width:"auto"})}
${XS({display:"none"})}

`
const Image2 = styled.img`
width:100%;
height:100%;
object-fit: cover;
display:none;
${XS({display:"flex"})}
`

const Info = styled.div`
position: absolute;
right: 6%;
max-width: 37%;
z-index:2;
${MD({maxWidth:"42%"})}
${XS({maxWidth:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:"0 20px",justifyContent:"end",color:"#fff",paddingBottom: "40px"})}


`
const Title = styled.h2`
font-weight: 700;
font-size: 2.5rem;
z-index:10;

${SM({fontSize:"1.8rem"})}
`
const Desc = styled.p`
margin: 10px 0 25px ;
font-weight : 400;
font-size: 1rem;
z-index:10;
${XS({textAlign:"center"})}
`

const Btn = styled.div`
    
font-size: 15px;
background-color: #171717;
border: none;
cursor: pointer;
padding: 10px 20px;
border-radius: 36px;
overflow: hidden;
margin-bottom: 28px;
max-width:85px;
 

    :hover{
  
       background-color:#6d6d6d;
    }
    a{
        color: #fff;
    }
  
`

const Brands = styled.div`
width:100%;
height:10vh;
display:flex;
justify-content:center;
box-shadow: 0px 8px 19px -14px #959595;
margin-bottom: 28px;

`
const BrandsImage = styled.div`
background:url("../Images/brands-List.png")center no-repeat;
width:100%;
height:100%;
${SM({background:"url(../Images/brands-List-sm.png)center no-repeat"})}

`


const Slider = () => {
    const [slideNum, setSlideNum] = useState(0);
    const [slideShow, setSlideShow] = useState(true);

    const maxSlide=sliderItems.length;

    const handleClick=(dir)=>{
        if(dir==="right"){
            setSlideNum(slideNum < maxSlide-1 ? slideNum+1 : 0);
            
        }else{
            setSlideNum(slideNum > 0  ? slideNum-1 : maxSlide-1);
        }

        setSlideShow(false)
        
    }

    const handleBulletClicked=(i)=>{
        setSlideNum(i);
        setSlideShow(false);
    }

      useEffect(() => {
          
          const time=slideShow ? 3000 : 9000 ;
       const text=setTimeout(() => {
            setSlideNum((slideNum) => slideNum < maxSlide-1 ? slideNum+1 : 0);
            !slideShow && setSlideShow(true)
        }, time);
         
        return () =>clearTimeout(text);
        
      });
 
    return (
        <>
        <Container>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowLeft />
                </Arrow>

                <Wrapper slideNum={slideNum}>

{sliderItems.map((s)=>(
            <Slide key={s.id} bc={s.bg}>
                <ImageContainer>
            <Image src={s.img} />
            <Image2 src={s.ResImg} />
            </ImageContainer>


            <Info>
                <Title>{s.title}</Title>
                <Desc>{s.desc}</Desc>
                <Btn type={s.btn}><Link to="/products"><b>SHOP </b>  NOW </Link></Btn>
            </Info>

            </Slide>
            ))}
 
            </Wrapper>

            <Arrow direction="right" onClick={()=>handleClick("right")}>
                <ArrowRight />
                </Arrow>
            
            <BulletContainer>
            {(() => {
                    const bullets = [];
                   

                    for (let i = 0; i < maxSlide; i++) {
                        bullets.push(<Bullet key={i} onClick={()=>handleBulletClicked(i)} active={i === slideNum && true}/>);
                        
                    }
                    return bullets;

                })()}
            </BulletContainer>
        </Container>
        <Brands>
        <BrandsImage />

        </Brands>
       </>
    )
}

export default Slider
