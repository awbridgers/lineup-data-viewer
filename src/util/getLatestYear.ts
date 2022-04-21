import { totalData } from '../types'


export const getLatestYear = (data:totalData) : string =>{
  const keys = Object.keys(data);
  const [sorted] = keys.sort((a,b)=>{
    const yearA = +a.slice(0,4);
    const yearB = +b.slice(0,4);
    return yearB - yearA
  })
  console.log(sorted)
  return sorted
}