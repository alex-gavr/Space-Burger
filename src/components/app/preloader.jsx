import React from "react";

export const Preloader = () => {
    return( 
        <div style={{ display: 'flex', justifyContent:'center', alignItems: 'center', minHeight:'100vh', width:'100%'}}>
            <p style={{fontSize:'2rem'}}>The Data is being Parsed 🙂 Please Wait</p> 
        </div>
    )
}