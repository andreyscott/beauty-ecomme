import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {XS,SM} from "../responsive"


const Info = styled.div`

position: absolute;
bottom:0;
display: flex;
justify-content: center;
align-items: center;
z-index: 3;
width: 100%;
background-color: #3a3a3a68;
height:15%;
transition: all .1s ease-in;
background-color:${(props)=>props.bc}
`

const Container = styled.div`
flex-grow:1;
height: 42vh;
width:20%;
margin: 5px;
position: relative;
border-radius: 4px;
overflow: hidden;
${SM({width:"30%"})}
${XS({width:"90%"})}
`
const Wrapper = styled.div`

height:100%;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
:hover ${Info}{
    height:100%;
}

`

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
position:relative;
::after{
    z-index: 1;
    content: "";
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:#000;
    opacity:.3;
    z-index:10;
}
`

const Title = styled.h2`

color: #ffffff;
font-size: 1.1em;
font-weight: 700;
z-index:4;

${SM({fontSize:"1.2rem",fontWeight:"500"})}

`
const CategoryItem = ({item}) => {
    return (
        <Container bc={item.bc && item.bc}>
            <Link to="/products">
                <Wrapper>

                  
                     <Image src={item.img} />
                  
            <Info>
                <Title>{item.title}</Title>
         
            </Info>
            </Wrapper>
            </Link>

            
        </Container>
    )
}

export default CategoryItem
