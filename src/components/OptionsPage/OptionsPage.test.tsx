import { h } from 'preact'
import { render, fireEvent, waitFor } from '@testing-library/preact'

import OptionsPage from './'

const stubRules = (count: number) => {
  const rules = {}
  for (let i = 0; i < count; i++) {
    const domain = `example${i}.net`
    rules[domain] = {
      id: i,
      domain: `example${i}.net`,
      note: `I do not like this website ${i}`,
      enabled: true
    }
  }

  chrome.storage.sync.get = jest.fn(async () => {
    return rules
  })
}

describe('OptionsPage', () => {
  it('renders the component with no data', () => {
    const { getByRole } = render(<OptionsPage />)

    expect(getByRole('heading', { name: 'Blocked sites' })).toBeInTheDocument()
    expect(getByRole('heading', { name: 'Block a new site' })).toBeInTheDocument()
  })

  it('renders one rule', async () => {
    stubRules(1)

    const { getByText } = render(<OptionsPage />)

    await waitFor(() => expect(getByText('example0.net')).toBeInTheDocument())
  })

  it('renders multiple rules', async () => {
    stubRules(5)

    const { getByText } = render(<OptionsPage />)

    await waitFor(() => {
      expect(getByText('example0.net')).toBeInTheDocument()
      expect(getByText('example1.net')).toBeInTheDocument()
      expect(getByText('example2.net')).toBeInTheDocument()
      expect(getByText('example3.net')).toBeInTheDocument()
      expect(getByText('example4.net')).toBeInTheDocument()
    })
  })

  it('deletes a rule', async () => {
    stubRules(1)
    const { getByText, getByRole } = render(<OptionsPage />)
    await waitFor(() => expect(getByText('example0.net')).toBeInTheDocument())

    fireEvent.click(getByRole('button', { name: 'Delete' }))

    expect(chrome.storage.sync.remove).toHaveBeenCalledWith('example0.net')
  })
})
