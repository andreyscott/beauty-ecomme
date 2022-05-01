import { css } from "styled-components";

export const XS = (props)=>{
    return css`
    @media only screen and (max-width: 500px){
        ${props}
    }

    `;
};

export const SM = (props)=>{
    return css`
    @media only screen and (max-width: 960px){
        ${props}
    }

    `;
};

export const MD = (props)=>{

    return css`
    @media only screen and (max-width:1200px){
        ${props}

    }
    `;
};