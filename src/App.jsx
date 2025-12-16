import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import AsyncMobx from './pages/asynMobx'
import SyncMobx from './pages/syncMobx'
import InfoPage from './pages/infobyid'

const App = () => {
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
      {
        index:true,
        element:<AsyncMobx/>
      },
      {
        path:"/syncMobx",
        element:<SyncMobx/>
      },
      {
        path:"/infobyid/:id",
        element:<InfoPage/>
      }
    ]
  }])
  return <RouterProvider router={router}/>
}

export default App

