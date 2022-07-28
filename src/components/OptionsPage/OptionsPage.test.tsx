import { h } from 'preact'
import { render, waitFor } from '@testing-library/preact'

import OptionsPage from './OptionsPage'

describe('OptionsPage', () => {
  it('renders two sections', () => {
    const { getByRole } = render(<OptionsPage />)

    expect(getByRole('heading', { name: 'Blocked sites' })).toBeInTheDocument()
    expect(getByRole('heading', { name: 'Block a new site' })).toBeInTheDocument()
  })

  describe('with rules in storage', () => {
    it('renders a table with rules', async () => {
      chrome.storage.sync.get = jest.fn(async () => {
        return {
          'example.net': { id: 1, domain: 'example.net', note: 'I do not like this website', enabled: true }
        }
      })

      const { getByText } = render(<OptionsPage />)

      await waitFor(() => expect(getByText('example.net')).toBeInTheDocument())
    })
  })
})
