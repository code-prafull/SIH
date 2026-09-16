import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Assistant from './pages/Assistant.jsx'
import Home from './pages/Home.jsx'
import Language from './pages/Language.jsx'
import NotFound from './pages/NotFound.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Opportunities from './pages/Opportunities.jsx'
import Recommendations from './pages/Recommendations.jsx'
import SkillAnalysis from './pages/SkillAnalysis.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/language" element={<Language />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/analysis" element={<SkillAnalysis />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
