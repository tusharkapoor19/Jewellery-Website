import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home-CD'
import CustomDesign from '../pages/CustomDesign'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/design" element={<CustomDesign />} />
    </Routes>
  )
}
