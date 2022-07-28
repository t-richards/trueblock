import { h } from 'preact'
import { render } from '@testing-library/preact'

import OptionsPage from './OptionsPage'

describe('OptionsPage', () => {
  it('renders two sections', () => {
    const { getByRole } = render(<OptionsPage />)

    expect(getByRole('section', { name: 'Blocked sites' })).toBeInTheDocument()
    expect(getByRole('section', { name: 'Block a new site' })).toBeInTheDocument()
  })
})
