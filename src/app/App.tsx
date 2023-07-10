import {styled} from 'styled-components'
import './App.css'
import {Header} from '../features/Header.tsx'
import {SideBar} from '../features/SideBar.tsx'
import {Content} from '../features/Content.tsx'
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
