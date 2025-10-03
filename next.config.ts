import {withSentryConfig} from "@sentry/nextjs";
 
import type { NextConfig } from "next";

const NextConfig = {

  /* config options here */
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
 