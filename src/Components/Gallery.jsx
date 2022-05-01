import {  ArrowRight, ArrowLeft} from '@material-ui/icons';
import InnerImageZoom from 'react-inner-image-zoom';
import styled from 'styled-components';
import  "../Style.css";
import { useEffect, useState } from 'react';
import { XS } from '../responsive';
import  SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';


const Container = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
position: relative;
margin:0 2rem ;

`
const TopContainer = styled.div`

position: relative;
::after{

    position:absolute;
    top:0;
    left:0;
    font-size:.9rem;
    color:#707070;
    width:100%;
    padding:5px 0;
    background-color:#eeeeee9e;
    text-align:center;
    ${XS({content:"'Click on the image to zoom'"})};
    
}

`

const GalleryContainer = styled.div`
margin: 15px 0;
width: 400px;
border-left:1px solid #ebebeb;

${XS({width:"100%"})};
`
const GalleryList = styled.div` 
display: flex;


`
const GalleryListItem = styled.img`
width: 75px;
margin: 0 10px;
border-radius: 4px;
cursor: pointer;

`

const Arrow = styled.span`
width: 35px;
height: 35px;
background-color: transparent;
border: 1px solid #727272;
border-radius: 5px;
position: absolute;
left: ${(props)=>props.direction === 'left' && "40%"};
right: ${(props)=>props.direction === 'right' && "40%"};
bottom: 4px;
display: flex;
align-items: center;
justify-content: center;
opacity: .6;
cursor: pointer;
z-index: 2;
margin:  auto;
background-color: #eeeeee;
overflow:hidden;
&:hover{
opacity: 1;
transform: scale(1.1);
}
` 

const Gallery = ({data,proId}) => {

    const [image, setImage] = useState();
    const [imgIndex, setImgIndex] = useState(0);


    const handleArrowClicked=(dir)=>{
        const lastItem=data.length-1;
        
          if(dir==="left"){
              handleImage(imgIndex>0 ? imgIndex-1 : lastItem);
          }else{
              handleImage(imgIndex<lastItem ? imgIndex+1 : 0);
          }
      }
  
      const handleImage=(itemIndex)=>{
          
          const imgSrc=data.find(x=>x.id===itemIndex+1).img
      
          setImage(imgSrc);
          setImgIndex(itemIndex);
          }
         
          useEffect(() => {
             
              handleImage(0);
          }, [])
          
       
    return (
        <Container>

               <TopContainer>
              
                    <InnerImageZoom 
                    zoomType="hover"
                    src={`../Images/Products/${proId}/Md/${image}`}
                    zoomSrc={`../Images/Products/${proId}/Lg/${image}`} /> 
                

                <Arrow direction="left" onClick={()=>handleArrowClicked("left")}>
                <ArrowLeft />
                </Arrow>

                <Arrow direction="right" onClick={()=>handleArrowClicked("right")}>
                <ArrowRight />
                </Arrow>
                </TopContainer>

                <GalleryContainer>
                  <SimpleBarReact forceVisible="x" >
                    <GalleryList>
                        {data.map((item,index)=><GalleryListItem key={index} src={`../Images/Products/${proId}/Sm/${item.img}`} onClick={()=>handleImage(index)} /> )}
                        
                    </GalleryList>
                    </SimpleBarReact>
                </GalleryContainer>
                </Container>
    )
}

export default Gallery
