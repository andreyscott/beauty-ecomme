import { Send } from "@material-ui/icons";
import styled from "styled-components";
import {SM,XS} from "../responsive";

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items:center;
background-color:#5d54c44d;
padding:1rem 5rem;
box-shadow: 0px -12px 12px -7px rgba(199,199,199,0.32);
-webkit-box-shadow: 0px -12px 12px -7px rgba(199,199,199,0.32);
margin-top:5rem;
${XS({padding:"2rem"})};
${SM({padding:"2rem",flexDirection:"column"})};
`;

const Title = styled.h2`
${XS({fontSize:"1.5rem"})};
${SM({fontSize:"1.5rem",marginBottom:"2rem"})};
`;




const InputContainer = styled.div`
width: 50%;
display: flex;
z-index: 3;
align-items:center;
height:40px;
border: 1px solid #c2c2c2;
background-color:#fff;

${SM({width:"70%"})};
${XS({width:"100%"})};

`;

const Input = styled.input`
width: 100%;
border: none;
z-index: 3;
&:focus{outline:none;}
padding: 0 15px;
font-size:1rem;



`;

const Button = styled.button`
background:#5d54c4;;
height: 100%;
width:80px;
border:none;
cursor:pointer;

`;



const Newsletter = () => {
    return (
        <Container>
        
     
             <Title>Sign up for our newsletter!</Title>

     
         <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send style={{color:"#fff"}} />
        </Button>
      </InputContainer>

    </Container>
    )
}

export default Newsletter
