import { Clear, ErrorOutline } from '@material-ui/icons'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from '../firebase-config'
import { SM,XS} from '../responsive'

const Container=styled.div`
padding: 1rem;
min-height: 420px;


`
const Wrapper=styled.div`
display:flex;
flex-wrap:wrap;

`

const Title=styled.h2`
    margin-bottom:1rem;
`
const Box=styled.div`

width:100%;
display:flex;
flex-direction:column;
padding:15px;
box-shadow: -3px 10px 10px -8px #d2d2d2;
border: 1px solid #f4f4f4;
margin:1rem;
${SM({width:"100%"})}
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
background:#eee;
padding-top: 10px;

`

const InformTitle=styled.span`

margin-right:10px;
font-weight:700;
font-size: .95rem;
min-width:120px;

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
const ModalWrapper = styled.form`
padding: 0 30px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
${SM({flexWrap:"no-wrap"})};


`

const Inform=styled.div`
display:flex;
align-items:center;
margin-bottom:5px;
padding-left:10px;
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


const UserAddresses = ({user}) => {
    const [openModal, setOpenModal] = useState(false);
    const [userAddress, setUserAddress] = useState({});
    const [error, setError] = useState("");

    const handleSubmit= async (e) =>{
        
        e.preventDefault();
        const[nameEl,phoneNumEl,houseNumEl,countryEl,cityEl,stateEl,streetEl,zipCodeEl]=e.target.elements;
         
        const name=nameEl.value;
        const phoneNum=phoneNumEl.value;
        const houseNum=houseNumEl.value;
        const country=countryEl.value;
        const city=cityEl.value;
        const state=stateEl.value;
        const street=streetEl.value;
        const zipCode=zipCodeEl.value;
      
        if(name !=='' && phoneNum !== '' && houseNum !== '' && country!=='' && city !== '' && state !== '' && street !== '' && zipCode !== ''){
            await setDoc(doc(db, "addresses", user.uid), {
                name:name,phoneNum:phoneNum,houseNum:houseNum,country:country,city:city,state:state,street:street,zipCode:zipCode 
              });
  
              getAddress();
              setOpenModal(false);
              setError('');
        }else{
        
            setError('Please make sure all fields are filled')
          
        }
          
    }

    const userCollectionRef = collection(db,"addresses")
    const getAddress = async () =>{
    
        const data = await getDocs(userCollectionRef);
        const addresses= data.docs.map((doc) => ({...doc.data(),id:doc.id}));
        const userNewAddress=addresses.find(a=>a.id === user.uid);
         setUserAddress(userNewAddress);
    
      }

    const deleteAddress = async () =>{
       
    const addressDoc = doc(db ,"addresses",user.uid);
    await deleteDoc(addressDoc);
    setUserAddress('');
      }

      useEffect(() => {
        getAddress();
      }, [])
      

    return (
        <>
        <Container>
            <Title>Your Addresses</Title>
            
          
            <Wrapper>


                {userAddress?.length !== 0 && userAddress !== undefined
                ?
           <Box>
            
     
          
               <Inform><InformTitle>Name</InformTitle>{userAddress.name} </Inform>
               <Inform><InformTitle>Phone number</InformTitle>{userAddress.phoneNum} </Inform>
               <Inform><InformTitle>House Number</InformTitle>{userAddress.houseNum}</Inform>
               <Inform><InformTitle>Country</InformTitle>{userAddress.country}</Inform>
               <Inform><InformTitle>City</InformTitle>{userAddress.city}</Inform>
               <Inform><InformTitle>State/Province</InformTitle>{userAddress.state}</Inform>
               <Inform><InformTitle>Street</InformTitle>{userAddress.street}</Inform>
               <Inform><InformTitle>Zip/Postal Code</InformTitle>{userAddress.zipCode}</Inform>

               <ButtonContainer>
               <Button onClick={deleteAddress}>Delete Address</Button>
               </ButtonContainer>
              
        
           </Box>
           : <Button onClick={()=>setOpenModal(true)}>Add New Address</Button>


    }
        
          
   
         
           </Wrapper>
    
        </Container>

        {openModal &&
   <>
     <DarkBc />
    <Modal>
        
      <ModalHeader>
        <ModalTitle>Address</ModalTitle>
       <Close><Clear onClick={()=>{setOpenModal(false);setError('')}} /></Close> 
      </ModalHeader>

      <ModalWrapper onSubmit={handleSubmit}>
      {error !== "" && 
        <Error><ErrorOutline /> {error}</Error> 
        }
        
      <Row><InformTitle>Full Name*</InformTitle><Input name="name"/></Row>
            <Row><InformTitle>Phone Number*</InformTitle><Input name="phoneNum"/></Row>
            <Row><InformTitle>House Number*</InformTitle><Input name="houseNum"/></Row>
            <Row><InformTitle>Country*</InformTitle><Input name="country" /></Row>
            <Row><InformTitle>City*</InformTitle><Input name="city"/></Row>
            <Row><InformTitle>State/Province*</InformTitle><Input name="state"/></Row>
            <Row><InformTitle>Street*</InformTitle><Input name="street"/></Row>
            <Row><InformTitle>Zip/Postal Code*</InformTitle><Input name="zipCode" /></Row>
             <ButtonContainer>
               <Button>Submit</Button>
               </ButtonContainer>
   
      </ModalWrapper>
  
    </Modal>
    </>
    }

    </>
    )
}

export default UserAddresses
