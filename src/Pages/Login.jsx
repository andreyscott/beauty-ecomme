
import { useState } from "react";
import styled from "styled-components";
import { ErrorOutline, VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";
import {XS} from "../responsive";

import { Link, Redirect } from "react-router-dom";
import Footer from "../Components/Footer"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(200, 165, 255, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("../Images/sign-in2-1.jpg")
      center;
  /* background:url("../Images/sign-in2-1.jpg")center; */
  background-color:#C6B1FF;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
   ${XS({background:"#C6B1FF"})}
`

const Wrapper = styled.div`
     width: 370px;
    padding: 20px;
    background-color: #fff;
    box-shadow: -6px 6px 20px 1px #939393ed;
    border-radius: 5px;

  ${XS({ width: "300px"})} 
`

const Title = styled.h2`
  
  padding: 0 5px 15px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Box = styled.div`
  border: 1px solid #b2b2b2;
  border-radius: 3px;
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  position:relative;

`
const BoxTitle = styled.h3`
font-size: .8rem;
color: #9d9d9d;
padding: 5px 5px 0;
`
const Icon = styled.span`
position:absolute;
bottom: 4px;
right: 10px;
cursor: pointer;
svg{
  color: #b2b2b2;
}
`
const Input = styled.input`
background: transparent;
border: none;
width: 94%;
padding: 5px 10px 8px;
font-size:1rem;
&:focus{
  outline:none;
}
`

const Button = styled.button`
width: 100%;
border: none;
padding: 15px 20px;
background-color: #5d54c4;
color: white;
cursor: pointer;
margin: 30px 0 15px;
height: 45px;
border-radius: 5px;
font-size:1rem;
box-shadow: 0 10px 18px -6px #5d54c4b5;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`

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


const Login = () => {
 
  document.body.style.overflowY = "scroll";

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    var errorMessage;

    const [email, password] = event.target.elements;

    const loginEmail = email.value;
    const loginPassword = password.value;

    try{
      const user = await signInWithEmailAndPassword(auth,loginEmail,loginPassword);
      console.log(user);
      //  history.push("/panel/dashboard");
    } catch (error){
      // console.log(error.message);
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Your email address appears to be malformed.";
          break;
            case "auth/wrong-password":
              errorMessage = "Wrong password combination.";
              break;
        case "auth/user-not-found":
          errorMessage = "User with this email doesn't exist.";
          break;
        case "auth/internal-error":
          errorMessage = "Please make sure all fields are filled in correctly";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many requests. Try again later.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Signing in with Email and Password is not enabled.";
          break;
        default:
          errorMessage = "An undefined Error happened.";
     
          
      }
      console.log(error.code);
    }

    setError(errorMessage);

       

  };


  if (auth.currentUser) {
    return <Redirect to="/panel/dashboard" />;
  }

 
  return (
    <>
    <Container>
      <Wrapper>
        <Title>Sign in to your account</Title>

        {error !== "" && 
        <Error><ErrorOutline /> {error}</Error> 
        }

        <Form onSubmit={handleSubmit}> 
        <Box>
        <BoxTitle>Email</BoxTitle>
          <Input
            type="email"
            placeholder="email"/>

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
          <Button  type="submit">
            Sign In
          </Button >
         
        
          <LinkTag>DON'T HAVE AN ACCOUNT YET ?<Link to="/sign-up">CREATE A NEW ACCOUNT</Link></LinkTag>
        </Form>
      </Wrapper>
    </Container>

     <Footer/>
     
    </>
  );
};

export default Login;
