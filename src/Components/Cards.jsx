import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {XS,SM} from "../responsive"


const Container = styled.div`
display: flex;
margin: 1vh 10px;
justify-content: center;
${XS({display:"none"})};

`
const Wrapper = styled.div`
display:flex;;
align-items:center;
justify-content:center;
width:100%;
${SM({flexWrap:"wrap",width:"80%"})}

`

const Card = styled.div`
flex-grow:1;
height:260px;
margin: 8px;
position: relative;
border-radius: 4px;
overflow: hidden;
background-color:${(props)=>props.bc};
display:flex;
justify-content:${(props)=>props.type === "left" ? "start" : "end"};
${SM({width:"50%",height:"30vh",alignItems:"center"})};


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

}

`
const CardWrapper = styled.div`
height:100%;
position:relative;
${SM({position:"static"})}
`

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

const Info = styled.div`

position: absolute;
top:35px;
right:${(props)=>props.type === "left" && "0"};
left:${(props)=>props.type !== "left" && "10px"};
width: ${(props)=>props.type === "left" ? "45%" : "50%"};
flex-direction: column;
${SM({padding:"0 15px"})};
`

const Title = styled.h2`
font-size: 1.9rem;
font-weight: 600;
z-index:4;
${SM({fontSize:"1.5rem",fontWeight:"700"})}



`
const Text = styled.h5`
font-weight: 500;
z-index:4;
padding-top: 11px;


`
const Btn = styled.button`
padding: 10px;
position:absolute;
right:0;
bottom:0;
border: none;
background:none;
color:#000000;
text-decoration:underline;
  cursor: pointer;
font-weight: 700;

`
const Cards= ({data}) => {
    return (

        <Container>
               <Wrapper>
        {data.map((item) => (    
      
        <Card  key={item.id} bc={item.bc && item.bc} type={item.id===1 && "left"}>
          
                <CardWrapper>

                     <Image src={item.img} />
                   
           
            <Info type={item.id===1 && "left"}>
                <Title>{item.title}</Title>
                <Text>{item.desc}</Text>
               
            </Info>
            </CardWrapper>
         
            <Btn>  <Link to="/products">SHOP NOW</Link></Btn>
            

        
        </Card>
 ))
}

</Wrapper>
        </Container>
    )
}

export default Cards
