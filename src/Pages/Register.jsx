import { useState } from "react";
import styled from "styled-components";
import {XS} from "../responsive";
import { Check, ErrorOutline, VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";
import { Link , Redirect } from "react-router-dom";
import Footer from "../Components/Footer";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth ,db } from "../firebase-config";
import {doc,setDoc} from "firebase/firestore";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(200, 165, 255, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("../Images/sign-up2-1.jpg")
      center;
  background-color:#C6B1FF;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${XS({background:"#C6B1FF"})}
`;

const Wrapper = styled.div`
     width: 370px;
    padding: 20px;
    background-color: #fff;
    box-shadow: -6px 6px 20px 1px #939393ed;
    border-radius: 5px;

${XS ({ width: "300px"})} 
`;

const Title = styled.h2`

  padding: 0 5px 15px;
`;
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

const Form = styled.form`
  display: flex;
  flex-direction:column;
`;

const Box = styled.div`
  border: 1px solid #b2b2b2;
  border-radius: 3px;
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  position:relative;

`;
const BoxTitle = styled.h3`
font-size: .8rem;
color: #9d9d9d;
padding: 5px 5px 0;
`;
const Icon = styled.span`
position:absolute;
bottom: 4px;
right: 10px;
cursor: pointer;
svg{
  color: #b2b2b2;
}
`;
const Input = styled.input`
background: transparent;
border: none;
width: 94%;
padding: 5px 10px 8px;
font-size:1rem;
&:focus{
  outline:none;
}
`;

const Button = styled.button`
width: 100%;
border: none;
padding: 15px 20px;
background-color: #5d54c4;
color: white;
cursor: pointer;
margin-bottom: 10px;
height: 45px;
border-radius: 5px;
font-size:1rem;
box-shadow: 0 10px 18px -6px #5d54c4b5;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const LinkTag = styled.span`
  font-weight:500;
  margin: 5px 0px;
  font-size: 12px;
  a{
    text-decoration: underline;
    color:#1D9CF9;
    padding-left:5px;
  }
`;


const Agreement = styled.div`
  display:flex;
  font-size: 12px;
  margin: 20px 0px 8px;
`;
const Checkbox = styled.span`
width: 29px;
height: 15px;
border-radius: 5px;
position: relative;
margin-right: 4px;
margin-top: 5px;
background-color: ${(props)=>props.check ? "#5d54c4" : "#c7c7c7"};


svg{
  position: absolute;
  font-size: 1.1rem;
  z-index: 2;
  top: -2px;
  left: -1px;
  color: #fff;
  
}
`
const CheckInput = styled.input`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
opacity: 0;
z-index: 10;
cursor: pointer;
`




const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");


  const createUserData = async (name,id) => {
    await setDoc(doc(db, "users", id), {
      name : name
    })
  }
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      var errorMessage;
      const [name,email,password] = event.target.elements;
  
      const userName = name.value;
      const registerEmail = email.value;
      const registerPassword = password.value;

      try{
         await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
        .then(cred => {
          createUserData(userName,cred.user.uid);
          // console.log(cred.user.uid);
        });
    
      } catch (error){
        switch (error.code) {
          case "auth/weak-password":
            errorMessage = "Your password is too weak . it must be at least 6 characters long";
            break;
              case "auth/email-already-in-use":
                errorMessage = "email already exists";
                break;
          case "auth/internal-error":
            errorMessage = "Please make sure all fields are filled in correctly";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many requests. Try again later.";
            break;
          case "auth/missing-email":
            errorMessage = "Please enter your email address";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email address";
            break;
          default:
            errorMessage = "An undefined Error happened.";
       
            
        }
        console.log(error.code);
      
      }
      
       setError(errorMessage)
      
    };


  
    if (auth?.currentUser?.email) {
      return <Redirect to="/panel/dashboard" />;
    }

  return (
    <>
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>

        {error !== "" && 
        <Error><ErrorOutline /> {error}</Error> 
        }

        <Form onSubmit={handleSubmit}>
      
          <Box>
          <BoxTitle>Name</BoxTitle>
          <Input type="name" placeholder="John" />
          </Box>

          <Box>
          <BoxTitle>Email</BoxTitle>
          <Input type="email" placeholder="email" />
          </Box>

          <Box>
          <BoxTitle>Password</BoxTitle>
          <Icon onClick={()=>setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined /> }
                  
                  </Icon>
          <Input
            placeholder="123456"
            type={showPassword ? "text" : "password"}
          />
            </Box>
         
      
          <Agreement>
             <Checkbox check={checked}>
               <CheckInput type="checkbox"
                            checked={checked}
                            onChange={()=>setChecked(!checked)}
               />
               {checked && <Check /> }
             </Checkbox>
            <LinkTag>By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b></LinkTag>
          </Agreement>
          <Button disabled={!checked} type="submit" >CREATE ACCOUNT</Button>

          <LinkTag>ALREADY HAVE AN ACCOUNT?<Link to="/sign-in">Sign In to your account</Link></LinkTag>
        
        </Form>
      </Wrapper>
    </Container>
    <Footer />
    </>
  );
};

export default Register;
