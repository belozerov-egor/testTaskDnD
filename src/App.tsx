import {styled} from 'styled-components'
import './App.css'
import {Header} from './components/Header'
import {SideBar} from './components/SideBar'
import {Content} from './components/Content'

function App() {


  return (
    <>
    <Header/>
    <MainBlock>
      <SideBar/>
      <Content/>
    </MainBlock>
    </>
  )
}

export default App

const MainBlock = styled.div`
  display: flex;
`
