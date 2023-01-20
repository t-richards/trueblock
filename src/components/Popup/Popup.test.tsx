import { expect, jest } from '@jest/globals'

import { h } from 'preact'
import { render } from '@testing-library/preact'

import Popup from './'

const stubOneTab = (url: string) => {
  chrome.tabs.query = jest.fn(async () => {
    return [{
      url,
      index: 0,
      highlighted: false,
      pinned: false,
      windowId: 0,
      active: true,
      incognito: false,
      selected: true,
      discarded: false,
      autoDiscardable: false,
      groupId: 0
    }]
  })
}

describe('Popup', () => {
  it('renders the basic form', () => {
    stubOneTab('https://example.net')

    const { getByRole } = render(<Popup />)

    expect(getByRole('textbox', { name: 'Domain' })).toBeInTheDocument()
    expect(getByRole('textbox', { name: 'Note (Optional)' })).toBeInTheDocument()
  })
})
