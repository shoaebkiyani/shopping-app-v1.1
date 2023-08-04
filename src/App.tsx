import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import RootLayout from './components/layout/RootLayout'

import Home from './components/pages/Home'
import About from './components/pages/About'


function App() {

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
    </Route>
  )
)


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
