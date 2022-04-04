import { Lineup } from '../lineupClass';


export const sortPlayersByName = (a: string, b:string) =>{
  const [firstNameA, ...restA] = a.toLocaleLowerCase().split(' ');
  const [firstNameB, ...restB] = b.toLocaleLowerCase().split(' ');
  const lastNameA = restA.join(' ');
  const lastNameB = restB.join(' ')
  if(lastNameA > lastNameB){
    return 1
  }
  else if(lastNameA < lastNameB){
    return -1
  }
  else{
    return firstNameA >= firstNameB ? 1: -1
  }

}

