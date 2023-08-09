import {Outlet} from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './Footer'

function RootLayout() {
  return (
    <div className='root'>
        <Navbar />
        <main className="h-wrapper h-[calc(100%-56px)] ">
                <Outlet />
        </main>
        <Footer />
    </div>
  )
}
export default RootLayout