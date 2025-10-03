 
import type { NextConfig } from "next";

const NextConfig = {

  images:{
    dangerouslyAllowSVG : true,
    
    remotePatterns :[
     {
      protocol : 'https',
      hostname : '*',
     }
    ]
  },
 experimental:{
  ppr :"incremental",
  after : true
 },
  devIndicators :{
    
    
    position : "bottom-right"
  }
};
 