import { describe, expect, it, mock } from 'bun:test'
import { fireEvent, render, waitFor } from '@testing-library/preact'
import { h } from 'preact'

import OptionsPage from './'

const stubRules = (count: number) => {
  const rules = {}
  for (let i = 0; i < count; i++) {
    const domain = `example${i}.net`
    rules[domain] = {
      id: i,
      domain: `example${i}.net`,
      note: `I do not like this website ${i}`,
      enabled: true,
    }
  }

  chrome.storage.sync.get = mock(async () => {
    return rules
  })
}

describe('OptionsPage', () => {
  it('renders the component with no data', () => {
    const { getByRole } = render(<OptionsPage />)

    expect(getByRole('heading', { name: 'Blocked sites' })).toBeInstanceOf(HTMLElement)
    expect(getByRole('heading', { name: 'Block a new site' })).toBeInstanceOf(HTMLElement)
  })

  it('renders one rule', async () => {
    stubRules(1)

    const { getByText } = render(<OptionsPage />)

    await waitFor(() => expect(getByText('example0.net')).toBeInstanceOf(HTMLElement))
  })

  it('renders multiple rules', async () => {
    stubRules(5)

    const { getByText } = render(<OptionsPage />)

    await waitFor(() => {
      expect(getByText('example0.net')).toBeInstanceOf(HTMLElement)
      expect(getByText('example1.net')).toBeInstanceOf(HTMLElement)
      expect(getByText('example2.net')).toBeInstanceOf(HTMLElement)
      expect(getByText('example3.net')).toBeInstanceOf(HTMLElement)
      expect(getByText('example4.net')).toBeInstanceOf(HTMLElement)
    })
  })

  it('deletes a rule', async () => {
    stubRules(1)
    const { getByText, getByRole } = render(<OptionsPage />)
    await waitFor(() => expect(getByText('example0.net')).toBeInstanceOf(HTMLElement))

    fireEvent.click(getByRole('button', { name: 'Delete' }))

    expect(chrome.storage.sync.remove).toHaveBeenCalledWith('example0.net')
  })
})
