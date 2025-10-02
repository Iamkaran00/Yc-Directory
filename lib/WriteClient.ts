import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,token } from "../sanity/env"
import { error } from "console"
 
export const WriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token
})
if(!WriteClient.config().token){
    throw new Error("Write Token not found");
}
