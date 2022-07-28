import { h } from 'preact'
import { render, fireEvent, waitFor } from '@testing-library/preact'

import OptionsPage from './OptionsPage'

const stubOneRule = () => {
  chrome.storage.sync.get = jest.fn(async () => {
    return {
      'example.net': { id: 1, domain: 'example.net', note: 'I do not like this website', enabled: true }
    }
  })
}

describe('OptionsPage', () => {
  it('renders two headings', () => {
    const { getByRole } = render(<OptionsPage />)

    expect(getByRole('heading', { name: 'Blocked sites' })).toBeInTheDocument()
    expect(getByRole('heading', { name: 'Block a new site' })).toBeInTheDocument()
  })

  it('renders a table with rules', async () => {
    stubOneRule()

    const { getByText } = render(<OptionsPage />)

    await waitFor(() => expect(getByText('example.net')).toBeInTheDocument())
  })

  it('deletes a rule', async () => {
    stubOneRule()
    const { getByText, getByRole } = render(<OptionsPage />)
    await waitFor(() => expect(getByText('example.net')).toBeInTheDocument())

    fireEvent.click(getByRole('button', { name: 'Delete' }))

    expect(chrome.storage.sync.remove).toHaveBeenCalledWith('example.net')
  })
})
