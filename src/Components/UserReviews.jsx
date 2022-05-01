import {  Clear } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { products } from '../data'
import { SM } from '../responsive'
import { Rating } from '@mui/material';


const Container = styled.div`
padding: 1rem;
`
const Wrapper=styled.div`
`

const Title=styled.h2`
  margin-bottom:1rem;
`

const Review = styled.div`
-webkit-box-shadow: 2px 0px 7px 0px #D2D2D2; 
box-shadow: 2px 0px 7px 0px #D2D2D2;
border-bottom: 1px solid #eee;
margin-bottom: 10px;
display: flex;
padding: 20px 10px;
${SM({flexDirection:"column",position:"relative"})};
`


const Date = styled.span` `

const Text = styled.p`

`

const Rate = styled.div`
position: relative;
width:96px;

`




const ProTitle = styled.h3`
font-weight: 500;
font-size: .9rem;
text-decoration:underline;
opacity: 0.8;
cursor:pointer;
:hover{opacity:1;}

`


const TitleContainer= styled.div`
display:flex;
border-bottom: 1px solid #d6d6d6;
padding-bottom: ;
padding: 15px 10px;
${SM({display:"none"})}
`

const Col2= styled.div`
flex:2;
display:flex;
${SM({padding:"0 0 10px"})}
`
const Col4= styled.div`
flex:4;
display:flex;
padding:0 10px;
align-items:center;
${SM({padding:"0 0 10px"})}
`
const ColHalf= styled.div`
flex:.5;
display:flex;
align-items:center;

svg{
    cursor:pointer;
}
${SM({position:"absolute",top:"10px",right:"10px"})}
`
const ResTitle = styled.span`
display:none;
padding-right:5px;
font-weight:700;
color:#9b9b9b;
${SM({display:"block"})};
`
const Notice = styled.h2`
 
color:#a8a8a8b0;
 `

const UserReviews = () => {


    const UserReviewsArray=localStorage.getItem('beauty-shop-userReview') ? JSON.parse(localStorage.getItem("beauty-shop-userReview")) : [];
  

    const handleDelete=(review)=>{
     
        // const UserReviewsArray=JSON.parse(localStorage.getItem("beauty-shop-userReview"));
          const itemIndex= UserReviewsArray.indexOf(review)
           if(itemIndex !== -1){
            UserReviewsArray.splice(itemIndex,1);  
            localStorage.setItem('beauty-shop-userReview', JSON.stringify(UserReviewsArray));
           } 

           window.location.reload()
         } 


    return (
        <Container>
             <Title>Your Reviews</Title>
            {UserReviewsArray.length === 0 ? 
            
        <Notice>You don't have any Review !</Notice>
        
        : <Wrapper>
         <TitleContainer>
                    <Col2>Product</Col2>
                    <Col2>Summary</Col2>
                    <Col4>Review</Col4>
                    <Col2>Rate</Col2>
                    <Col2>Date</Col2>
                    <ColHalf>delete</ColHalf>
                   
                </TitleContainer>
        {UserReviewsArray.map((review,index)=>{
            const productData=products.find(product=>product.id===review.Id);
            return(
             
                <Review key={index}>

                     <Col2>
                     <ResTitle>Product :</ResTitle>
                    <ProTitle><Link to={`/product/${productData.id}`}>{productData.title}</Link></ProTitle>
                    </Col2>

                    <Col2><ResTitle>Summary :</ResTitle><Text type="title">{review.Title}</Text></Col2>
                    <Col4><ResTitle>Review :</ResTitle><Text type="text">{review.Text}</Text></Col4>
                    
                    <Col2>
                    <ResTitle>Rate :</ResTitle>
                    <Rate>
                  <Rating name="read-only" size="small" value={review.Rate} readOnly />
                
                        </Rate>
                        </Col2>
                    <Col2><ResTitle>Date :</ResTitle><Date>June 3, 2021</Date></Col2>
                    <ColHalf><Clear  onClick={()=>handleDelete(review)}/></ColHalf>
  
       
    </Review>
     )}
     )}
    
</Wrapper>
      
        }

    </Container>
    )
}

export default UserReviews
