import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from '@material-ui/icons';
import {SM,XS} from "../responsive" 


const Container = styled.footer`
  background-color: #eeeeee;
  padding: 16px 24px;
  display:flex;
  flex-direction:column;
  align-items:center;
  
`;

const Wrapper = styled.div`

  display: flex;
  justify-content: space-around;
  align-items: center;
  width:100%;
  padding:15px 0 30px;
  ${SM({flexDirection:"column"})}

`;
const Section = styled.div`
display:flex;
flex-direction: column;
justify-content: space-between;

${SM({alignItems:"center"})};
`


const LogoContainer = styled.div`
 
  display: flex;
  flex-direction:column;
  width: 355px;
  ${SM({alignItems:"center"})};

`;
const Text = styled.h4`
font-weight:400; 
${SM({textAlign:"center"})};

`;
const Logo = styled.img` 
width:180px;
`;

const SocialIcons = styled.div`
  display: flex;
  padding-top: 28px;
  max-width: 160px;
  justify-content: space-between;
  ${SM({maxWidth:"100%"})};
 
  a{
  :hover svg{
    color:#5d54c4;
  }
  ${SM({padding:"0 10px"})};
}
`;

const Links = styled.div`
   display: flex;
   justify-content: center;
   width:100%;
  align-items: center;
  padding:2rem 0;
  ${XS({flexDirection:"column"})}
 
   
`;
const LinkItems = styled.div`
    display: flex;
    flex-flow: column;
    line-height: 30px;
    padding: 0 3rem;   
    ${XS({alignItems:"center",margin:"10px 0"})};
    ${SM({padding:"0 1rem"})};
   
   
`;
const LinkItemTitle = styled.h3`
        margin-bottom: 15px;
        font-weight: 700;
   
`;




const Footer = () => {


  
    return(
        <Container>
            <Wrapper>

                            <Section>
                            <LogoContainer>
                            <Link to='/'> <Logo src="../Images/logo.png"/></Link>
                              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur omnis quisquam ratione facilis ut numquam, cupiditate quos impedit</Text>
                            </LogoContainer>
                       
  
                        <SocialIcons>
                        <Link to='/' className="social-icon-link"> 
                     <Facebook className="social-icon" />
                     </Link>
                     <Link to='/' className="social-icon-link">
                     <Instagram className="social-icon"/>
                     </Link>
                     <Link to='/' className="social-icon-link">
                     <Twitter className="social-icon" />
                     </Link>
                     <Link to='/' className="social-icon-link">
                     <YouTube className="social-icon" />
                     </Link>
                     <Link to='/' className="social-icon-link">
                     <LinkedIn className="social-icon" />
                     </Link>

                        </SocialIcons>
                  
           
                   </Section>
                   <Section>
                <Links>


                <LinkItems>
                <LinkItemTitle>About Us</LinkItemTitle>
                <Link to='/'>How it works?</Link>
                <Link to='/'>Features</Link>
                <Link to='/'>News and Blog</Link>
                <Link to='/'>Why ”Jewel Beauty” ?</Link>
                
                </LinkItems>

                <LinkItems>
                <LinkItemTitle>Support</LinkItemTitle>
                <Link to='/'>How it works?</Link>
                <Link to='/'>Features</Link>
                <Link to='/'>News and Blog</Link>
                <Link to='/'>Why ”Jewel Beauty” ?</Link>
                
                </LinkItems>

                <LinkItems>
                <LinkItemTitle>Support</LinkItemTitle>
                <Link to='/'>How it works?</Link>
                <Link to='/'>Features</Link>
                <Link to='/'>News and Blog</Link>
                <Link to='/'>Why ”Jewel Beauty” ?</Link>
                
                </LinkItems>

               

                </Links>

            
                </Section>


           
            </Wrapper>
            <small>jewel-beauty.com © 2021. All rights reserved</small>
  
        </Container>
    );
};

export default Footer;
