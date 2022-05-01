import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
padding: 1rem;
`
const Title=styled.h2`
  margin-bottom:1rem;
`
const Notice = styled.h2`
 
color:#a8a8a8b0;
 `

const Orders = () => {
    return (
        <Container>
        <Title>Your Orders</Title>
       
   <Notice>You don't have any Order !</Notice>
        </Container>
    )
}

export default Orders
