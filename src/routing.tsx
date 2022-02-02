import { useContext } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { FirebaseContext } from './components/FirebaseProvider'
const Routing = () => {
  const data = useContext(FirebaseContext)
  if(!data){
    return <>Loading Data...</>
  }
  return(
    <HashRouter>
      <Routes>
      <Route path = '/' element = {<App data={data.current} />}/>
      {Object.keys(data).filter((keys)=>keys!=='current').map((key,i)=>(
        <Route key = {i} path = {key} element = {<App data={data[key]}/>}/>
      ))}
      </Routes>
    </HashRouter>
  )
}



export default Routing