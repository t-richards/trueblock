import { describe, expect, it, mock } from 'bun:test'
import { render } from '@testing-library/preact'
import { h } from 'preact'
import Popup from './'

const stubOneTab = (url: string) => {
  chrome.tabs.query = mock(async () => {
    return [
      {
        url,
        active: true,
        autoDiscardable: false,
        discarded: false,
        frozen: false,
        groupId: 0,
        highlighted: false,
        incognito: false,
        index: 0,
        pinned: false,
        selected: true,
        windowId: 0,
      },
    ]
  })
}

describe('Popup', () => {
  it('renders the basic form', () => {
    stubOneTab('https://example.net')

    const { getByRole } = render(<Popup />)

    expect(getByRole('textbox', { name: 'Domain' })).toBeInstanceOf(HTMLElement)
    expect(getByRole('textbox', { name: 'Note (Optional)' })).toBeInstanceOf(HTMLElement)
  })
})
