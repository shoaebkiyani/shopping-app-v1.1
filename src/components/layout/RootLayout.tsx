import {Outlet} from 'react-router-dom'

import Navbar from './Navbar'

function RootLayout() {
  return (
    <div className='root'>
        <Navbar />
        <main className="h-[calc(100vh-56px)] bg-slate-300">
                <Outlet />
        </main>
    </div>
  )
}
export default RootLayout