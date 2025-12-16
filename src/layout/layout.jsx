import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Link to="/">AsyncMobx</Link>
      <Link to="/syncMobx">SyncMobx</Link>
      <Outlet/>
    </div>
  )
}

export default Layout
