import React from 'react'
import styled from 'styled-components'
import {XS,SM} from "../responsive"
import CategoryItem from './CategoryItem'


const Container = styled.div`
display: flex;
margin: 1vh 10px;
justify-content: center;
flex-direction:column;
${XS({flexDirection:"column"})}
`
const Wrapper = styled.div`
display:flex;;
align-items:center;
justify-content:center;
width:100%;
${SM({flexWrap:"wrap"})}

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

const Category = ({data,title}) => {
    
    
    return (
        <Container>
            
            <Title>{title}</Title>     
            <Wrapper>
            {data.map((item) => (

            <CategoryItem key={item.id} item={item}/>

            ))
            }
            </Wrapper>

        </Container>
    )
}

export default Category
