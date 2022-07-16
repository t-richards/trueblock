import { h, render } from 'preact'

import Popup from './components/Popup'

const parent = document.getElementById('body')
render(<Popup />, parent)
