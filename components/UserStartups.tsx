import React from 'react'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/query'
import StartupCard, { StartupTypeCard } from './StartupCard'
import { client } from '@/sanity/lib/client'
const UserStartups = async({id} : {id : string}) => {
 const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY,{id});
  return <>
  {startups.length>0 ?startups.map((startup:StartupTypeCard)=>(
<StartupCard key  = {startup._id}   post = {startup}/>
  )):(<p className='no-result'>No Posts Yet</p>)}
  </>

  
}

export default UserStartups