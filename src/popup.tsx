import React from 'react'
import { createRoot } from 'react-dom/client'

import Popup from './components/Popup'

const app = document.getElementById('app')
const root = createRoot(app)
root.render(<Popup />)
