import styled from 'styled-components';
import { StarOutlined, ThumbDownOutlined, ThumbUpOutlined} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { SM, XS } from '../responsive';
import { Rating } from '@mui/material';

const Container = styled.div`
padding: 1rem;
${SM({display: "flex",flexDirection:"column-reverse",padding: "0"})}
`

const Form = styled.div`
display: flex;
flex-direction: column;
${SM({paddingLeft: "40px"})}
${XS({paddingLeft: "10px"})}

form{display: flex;
flex-direction: column;}
`

const Heading = styled.div`
display: flex;
align-items: center;
margin: 20px 0;
font-weight: 500;
cursor: pointer;
`
const Error = styled.p`
color:${(props)=> props.color};
 font-weight:500;
 font-size:1.2rem;
 border: 1px solid;
 border-color:${(props)=> props.color};
 padding:5px 10px;
 text-align: center;
width: 30%;
margin: 10px 0;
 `

const Title = styled.h3` `
const TitleForm = styled.h4`
padding: 20px 0 10px;
`
const Input = styled.input`
width: 50%;
padding: 5px 10px;
border: 1px solid #b4b4b4;
${SM({width: "70%"})}
${XS({width: "90%"})}
`
const Comment = styled.textarea`
min-height: 80px;
padding: 5px 10px;
width: 50%;
border: 1px solid #b4b4b4;
${SM({width: "70%"})}
${XS({width:"90%"})}
`
const Button = styled.button`
    width: 152px;
    padding: 10px;
    margin-top: 3rem;
    background-color: #3c3c3c;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 3px;
    box-shadow:-5px 6px 10px -6px rgba(6, 6, 6, 0.45);
    ${XS({width: "auto"})}
    
    :hover{
        background-color: #666;
       
    }
`


const Rate = styled.div`
position: relative;
display: flex;
align-items: center;
width: ${(props)=>props.size==="small" ? "96px" : "160px"};

`


const RateNumber = styled.span`
position: absolute;
right: -70%;

`



const AllReviews = styled.div`
margin: 5rem 0 2rem;
${SM({margin:"2rem 0"})}
`

const Sort=styled.div`
display: flex;
align-items: center;
padding: 0 10px;
${XS({margin:"30px 0 15px"})}
`
const TopContainer = styled.div`
display: flex;
justify-content: space-between;
padding: 30px 40px 0;
${XS({padding:"0",flexDirection:"column"})}
${SM({padding:"30px 0 0"})}
`

const SortList=styled.select`
width: 150px;
height: 40px;
background-color: transparent;
border: 1px solid #3a3a3a;
border-radius: 4px;
cursor: pointer;
`
const SortListItem=styled.option``

const BottomContainer = styled.div`

padding: 40px;
${XS({padding:"10px"})}
`
const Review = styled.div`
border-bottom: 1px solid #eee;
margin-bottom: 10px;
padding-bottom:10px ;
`
const Row = styled.div`
display: flex;
align-items: center;
margin-bottom: 10px;
`
const ProPhoto = styled.img`
border-radius: 50%;
width: 45px;
height: 45px;
`
const Name = styled.span`
padding: 0 10px;
font-weight: 500;
`
const Date = styled.span`
padding: 0 20px;
`
const Text = styled.p`
margin: 5px 0 10px;
`
const Icon = styled.span`
display: flex;
align-items: center;
justify-content: space-between;
width: 40px;
margin: 0 8px;
color:#4d4d4d;
svg{
   
    margin-left: 3px;
    cursor: pointer;
    color:#9c9c9c;
}

`



const Reviews = ({proId,proTitle}) => {

    console.log(proId)

    const [rateIndex, setRateIndex] = useState('1');
    const [error, setError] = useState([]);


    const [updateReview,setUpdateReview]=useState(false)
    const [userReview,setUserReview]=useState([])

    useEffect(() => {
        setUserReview(JSON.parse(localStorage.getItem("beauty-shop-userReview")))
           
       }, [updateReview])
   



    const handleSubmit = (e)=>{
        e.preventDefault();
        const [nickNameElement,titleElement,textElement]=e.target.elements;
        const rate=Number(rateIndex);
        const nickName=(nickNameElement.value).trim()
        const title=(titleElement.value).trim()
        const text=(textElement.value).trim()
     
        const userReviewArray=localStorage.getItem('beauty-shop-userReview') ? JSON.parse(localStorage.getItem("beauty-shop-userReview")) : [];
        const oldReview=userReviewArray.find(r=>r.Id===proId);
       
       if(nickName==='' || title==='' || text==='' ){
            setError({color:"#ff2d2d",text:"fill the inputs with *"})
      }else{

       if(oldReview === undefined){
            setError({color:"#009517",text:"Your Review successfully added !"})
           userReviewArray.push({Id:proId,ProductTitle:proTitle,Rate:rate,Name:nickName,Title:title,Text:text})
           localStorage.setItem('beauty-shop-userReview',JSON.stringify(userReviewArray))
       }else{
            setError({color:"#009517",text:"Your Review successfully changed !"})
            const updatedUserReview=userReviewArray.map((review)=>
            review.Id===proId ? {Id:proId,ProductTitle:proTitle,Rate:rate,Name:nickName,Title:title,Text:text} : review
            )
            localStorage.setItem('beauty-shop-userReview',JSON.stringify(updatedUserReview))

       }

    }
    setUpdateReview(!updateReview)
    

    }

  
  
 
console.log('rate',rateIndex)

    return (
        <Container>
           
           <Form>
            
               <Heading><Title> Add Your Review</Title></Heading>
               {error.length !== 0 && <Error color={error.color}>{error.text} !</Error> }
               <TitleForm>Vote</TitleForm>
              <Rate>
                  <Rating  
                            value={rateIndex}
                            onClick={(e)=>setRateIndex(e.target.value)}
                            size="large"
                            emptyIcon={<StarOutlined style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    
                    </Rate>
           
                    <form onSubmit={handleSubmit}>
               <TitleForm>Nick Name*</TitleForm>
               <Input name='nickName' />
               <TitleForm>Summary*</TitleForm>
               <Input name='title'/>
               <TitleForm>Review*</TitleForm>
               <Comment name='text'/>
               <Button>Add Review</Button>
               </form>
             
               </Form>
               

                 
           

               <AllReviews>
               <Heading> <Title> Costomer Reviews</Title></Heading>

            <TopContainer>
            <Rate>
                    
            <Rating name="read-only" value={4.4} readOnly size="large" precision={0.1}/>
                    <RateNumber>4/4 OUT OF 5</RateNumber>
                
                </Rate>

               <Sort>
          
           <SortList>
             <SortListItem>Newest</SortListItem>
             <SortListItem>Top Reviews</SortListItem>
             
           </SortList>
          </Sort>
          </TopContainer>

          <BottomContainer>
           
              <Review>
                  <Row><ProPhoto src="../Images/user-img1.jpg" /><Name>Sara Jackson</Name></Row>
                  <Row> <Title> Great lipstick</Title></Row>
                  <Row>
                  <Rate size="small">
                    
                  <Rating name="read-only" size="small" value={4} readOnly />
                
                </Rate>
                      <Date>June 3, 2021</Date></Row>
                  <Row><Text>
                      This I really liked. I like all the colors. I was not sure I would. Nice texture,and it stays on about as well as any other. 
                      </Text> </Row>
                    <Row>
                      <Icon>5<ThumbUpOutlined /> </Icon>
                      <Icon>0<ThumbDownOutlined /> </Icon> 
                      </Row>
              </Review>
              
              
              {userReview && 
              userReview.map((review,index)=>review.Id===proId && 
              <Review key={index}>
                  <Row><ProPhoto src="../Images/unknown-user.jpg" /><Name>{review.Name}</Name></Row>
                  <Row> <Title> {review.Title}</Title></Row>
                  <Row>
                  <Rate size="small">
                  <Rating name="read-only" size="small" value={review.Rate} readOnly />
                
                </Rate>
                      <Date>June 3, 2021</Date></Row>
                  <Row>
                     
                      <Text>
                     {review.Text}
                      </Text> 
                      
                      </Row>
                    <Row>
                      <Icon>0<ThumbUpOutlined /> </Icon>
                      <Icon>0<ThumbDownOutlined /> </Icon> 
                      </Row>
              </Review>
              )
                }

          </BottomContainer>

               </AllReviews>
        </Container>
    )
}

export default Reviews
