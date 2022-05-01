import styled from "styled-components";

const Container=styled.div`

width: 100%;


`
const List = styled.ul`
padding: 0;
border: ${(props)=>props.type !== "top" && "1px solid #eee"};
margin: 1rem 0 ;


`
const ListItem = styled.li`
padding: ${(props)=>props.type === "top" ? 0 : "8px 12px"};
font-weight: 700;
border-bottom:1px solid #eee;
color: #9b9b9b;

`
const Desc = styled.span`
font-weight: 300;
padding: 5px 0;
color:#1B1E1E;
`

const TopListItem = styled.span`
display: flex;
align-items: center;
width: 100%;



::before{
    content:"";
    display: inline-block;
    width: 2%;
    height: 1px;
    background:#969696;
    margin-right: 15px;
    
}
::after{
    content:"";
    display: inline-block;
    width: 76%;
    height: 1px;
    background:#969696;
    margin-left: 15px;
    
}

`
const TopListItemTitle = styled.a`
min-width: 215px;
display: block;
font-weight: 700;
font-size: 1.3rem;
color:#5d54c4;
 `



const ProInformation = () => {
    return (
        <Container>
            
            <List type="top">
            
                    
<TopListItem> <TopListItemTitle>Product details </TopListItemTitle></TopListItem>

<List >
    <ListItem>Product Dimensions: <Desc>  0.7 x 0.6 x 3.1 inches; 0.32 Ounces</Desc></ListItem>
    <ListItem>Product Dimensions: <Desc>  0.7 x 0.6 x 3.1 inches; 0.32 Ounces</Desc></ListItem>
    <ListItem>Product Dimensions: <Desc>  0.7 x 0.6 x 3.1 inches; 0.32 Ounces</Desc></ListItem>
    <ListItem>Product Dimensions: <Desc>  0.7 x 0.6 x 3.1 inches; 0.32 Ounces</Desc></ListItem>
</List>
              
            </List>
            <List type="top">
                <ListItem type="top">
                    
<TopListItem> <TopListItemTitle> Important information </TopListItemTitle></TopListItem>

<List >
    
    <ListItem>Product Dimensions: <Desc>  0.7 x 0.6 x 3.1 inches; 0.32 Ounces</Desc></ListItem>
    <ListItem>Product Dimensions: <Desc>  0.7 x 0.6 x 3.1 inches; 0.32 Ounces</Desc></ListItem>
    <ListItem>Product Dimensions: <Desc>  0.7 x 0.6 x 3.1 inches; 0.32 Ounces</Desc></ListItem>
</List>
                </ListItem>
            </List>
        </Container>
    )
}

export default ProInformation
