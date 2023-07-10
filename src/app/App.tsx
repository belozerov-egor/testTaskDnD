import {styled} from 'styled-components'
import './App.css'
import {Header} from './components/Header'
import {SideBar} from './components/SideBar'
import {Content} from './components/Content'
import {Routes, Route} from "react-router-dom";


function App() {


  return (
    <>
    <Header/>
    <MainBlock>
      <SideBar/>
      <Routes>
        <Route path={'/testTaskDnD/panel'} element={<Content/>}/>
      </Routes>
    </MainBlock>
    </>
  )
}

export default App

const MainBlock = styled.div`
  display: flex;
`
