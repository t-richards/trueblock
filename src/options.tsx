import React from 'react'
import { createRoot } from 'react-dom/client'

import OptionsPage from './components/OptionsPage'

const app = document.getElementById('app')
const root = createRoot(app)
root.render(<OptionsPage />)
