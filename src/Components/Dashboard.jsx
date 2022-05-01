import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SM,XS } from '../responsive'

import { auth , db} from '../firebase-config';
import {onAuthStateChanged} from "firebase/auth";
import { collection , doc, getDocs, updateDoc } from "firebase/firestore";
import { Clear, ErrorOutline } from '@material-ui/icons';



const Container=styled.div`
padding: 1rem;

`
const Wrapper=styled.div`
display:flex;
flex-wrap:wrap;

`

const Title=styled.h2`
    margin-bottom:1rem;
`
const BoxContainer=styled.div`

width:50%;
${SM({width:"100%"})}
`
const Box=styled.div`
padding:15px;
box-shadow: -3px 10px 10px -8px #d2d2d2;
border: 1px solid #f4f4f4;
margin:1rem;

`
const BoxTitle=styled.h3`
margin:10px 0;

`
const Inform=styled.div`
display:flex;
align-items:center;
margin-bottom:5px;
padding-left:10px;
`
const InformTitle=styled.span`
margin-right:10px;
font-weight:700;
font-size: .95rem;
  min-width:80px;

`

const ButtonContainer = styled.div`
  
width:100%;
display:flex;
justify-content:end;

`
const Button=styled.button`
padding:10px;
margin:10px;
margin-right:0;
border:none;
color:#fff;
background-color:#003c8b;
border-radius:4px;
font-weight: 500;
font-size: 1rem;
cursor:pointer;
/* max-width: 145px; */
min-width: 100px;
:hover{
    background-color:#7a9fce;
}
`

const DarkBc = styled.div`
background-color:#2d2d2de6;
width:100%;
height:100vh;
position:fixed;
z-index:100;
top:0;
left:0;
`

const Modal = styled.div`
display: flex;
flex-direction: column;
width: 480px;
height: 60vh;
background-color: #fff;
border-radius: 5px;
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
margin: auto;
z-index: 101;
overflow-y: auto;
overflow-x:hidden;
${SM({width:"55%"})};
${XS({width:"85%"})}


`
const Close=styled.span`
 padding:10px;
 svg{ cursor:pointer;}

`
const ModalHeader = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
border-bottom:1px solid #b4b4b4;
margin-bottom:10px;
`
const ModalTitle = styled.h3`
padding-left:10px;
`
const ModalWrapper = styled.div`
padding: 0 30px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
${SM({flexWrap:"no-wrap"})};


`

const Row=styled.div`
width: 47%;
display: flex;
flex-direction: column;
margin: 10px 0;
${SM({width:"100%",margin:""})}

`

const Input=styled.input`
padding:  7px;
border: 1px solid #b4b4b4;
margin-top: 5px;
background:#eee;
:disabled{
  border: none;
cursor: no-drop;
}

`
const Select=styled.select`
padding:  7px;
border: 1px solid #b4b4b4;
cursor:pointer;
margin-top: 5px;

`
const Option=styled.option`
padding:10px 5px;
cursor:pointer;
`
const Error = styled.p`
  
  color: #ff2828;
    padding-top: 5px;
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    align-items: flex-start;
    svg{
      color: #ff2828;
      font-size:1.2rem;
    }
`




const Dashboard = () => {

    const [user, setUser] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [ageChange, setAgeChange] = useState("");
    const [nameChange, setNameChange] = useState("");
    const [genderChange, setGenderChange] = useState("");
    const [error, setError] = useState("");


    const reviewNum=(JSON.parse(localStorage.getItem("beauty-shop-userReview")))?.length;
    const wishlistNum=(JSON.parse(localStorage.getItem("beauty-shop-wishlist")))?.length;

    
 
    const userCollectionRef = collection(db,"users")
    
  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  })

  const editInfo = async() => {

    const obj = {name:nameChange,age:ageChange,gender:genderChange}

    const userDoc = doc(db ,"users",user.uid);
    await updateDoc(userDoc,obj);
    setOpenModal(false);
    getUser();
 
  }


  const getUser = async () =>{
    
    const data = await getDocs(userCollectionRef);
    const users= data.docs.map((doc) => ({...doc.data(),id:doc.id}));
    const userInfo=users.find(u=>u.id === user.uid);

    setUserInfo(userInfo);

  }

  const handleForm = () =>{
    if(userInfo !== undefined){
    setAgeChange(userInfo.age);
    setNameChange(userInfo.name);
    setGenderChange(userInfo.gender);
    setOpenModal(true);
    }else{
      setError("An Error occurred, please refresh the page and try again")
    }
  }

  useEffect(()=>{

      getUser();
      
  }, [user])
  

    return (
        <>
        <Container>
            <Title>Dashboard</Title>
           
            <Wrapper>
              <BoxContainer>
           <Box>
              <BoxTitle> Information</BoxTitle>
               <Inform><InformTitle>Name</InformTitle>{userInfo !== undefined && userInfo.name} </Inform>
               <Inform><InformTitle>Age</InformTitle>{userInfo !== undefined && userInfo.age} </Inform>
               <Inform><InformTitle>Gender</InformTitle>{userInfo !== undefined && userInfo.gender}</Inform>
               <Inform><InformTitle>Email</InformTitle> {user?.email}</Inform>
               <Inform><InformTitle>Password</InformTitle>*** </Inform>
               <ButtonContainer>
               <Button onClick={handleForm}>Edit Information</Button>
               </ButtonContainer>
               {error !== "" && 
        <Error><ErrorOutline /> {error}</Error> 
        }
                
           </Box>
           </BoxContainer>
           <BoxContainer>
           <Box>
              <BoxTitle> Activity</BoxTitle>
               <Inform><InformTitle>Orders</InformTitle> 0</Inform>
               <Inform><InformTitle>Comments</InformTitle>{reviewNum === undefined ? 0 : reviewNum}</Inform>
               <Inform><InformTitle>Favorites</InformTitle>{wishlistNum === undefined ? 0 : wishlistNum}</Inform>
            
           </Box>
           <Box>
              <BoxTitle> Newsletter</BoxTitle>
               <Inform>You aren't subscribed to our newsletter ! </Inform>
               
            
           </Box>
           </BoxContainer>
           </Wrapper>
        </Container>

    {openModal &&
   <>
     <DarkBc />
    <Modal>
        
      <ModalHeader>
        <ModalTitle>Edit your Information</ModalTitle>
       <Close><Clear onClick={()=>setOpenModal(false)} /></Close> 
      </ModalHeader>
      <ModalWrapper>
   
            <Row style={{width:"100%"}}><InformTitle>Name</InformTitle><Input name='name' value={nameChange} onChange={(e)=>setNameChange(e.target.value)} /></Row>
           
            <Row><InformTitle>Age</InformTitle>
            <Select name='age' value={ageChange} onChange={(e)=>setAgeChange(e.target.value)}>
                    
                    {(() => {
                    const options = [];
                   

                    for (let i = 7; i <= 100; i++) {
                        options.push(<Option value={i}>{i}</Option>);
                        
                    }
                    return options;

                })()}
                 
                    
                </Select>
            </Row>


            <Row><InformTitle>Gender</InformTitle>
            <Select name='gender' value={genderChange} onChange={(e)=>setGenderChange(e.target.value)}>
              <Option value="female">Female</Option>
              <Option value="male">Male</Option>
              <Option value="other">Other</Option>
            </Select>
            </Row>
            <Row><InformTitle>Email</InformTitle><Input disabled={true} value={user?.email}/></Row>
            <Row><InformTitle>Password</InformTitle><Input disabled={true} value="***" /></Row>
             <ButtonContainer>
               <Button onClick={editInfo}>Submit</Button>
               </ButtonContainer>
   
      </ModalWrapper>
  
    </Modal>
    </>
    }

    </>
    )
}

export default Dashboard
