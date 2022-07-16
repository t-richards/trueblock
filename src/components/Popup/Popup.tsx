import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { fetchRule, updateRule } from '../../storage/blockRules'

const Popup = () => {
  const [domain, setDomain] = useState("")
  const [note, setNote] = useState("")

  // Initially, set the domain field based on the current tab
  useEffect(() => {
    // Get the current tab domain
    const tabs = await chrome.tabs.query({ active: true })
    const domain = tabs[0].url
    setDomain(domain)

    // Check if a rule for the domain exists in storage
    const rule = await fetchRule(domain)
  }, [])

  // Handle user input from the domain field
  const handleDomainInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement
    setDomain(target.value)
  }

  const handleNoteInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement
    setNote(target.value)
  }

  const handleFormSubmit = () => {
    updateRule(domain, note)
  }

  return (
    <main class="container">
      <h2>Block this website</h2>

      <form id="block-a-site" onSubmit={handleFormSubmit}>
        <fieldset>
          <label for="domain">Domain</label>
          <input
            type="text"
            id="domain"
            name="domain"
            placeholder="example.com"
            value={domain}
            onInput={handleDomainInput}
            />
        </fieldset>

        <fieldset>
          <label for="note">Note</label>
          <textarea
            rows={10}
            cols={40}
            id="note"
            name="note"
            value={note}
            onInput={handleNoteInput}
            placeholder="e.g.,
- Dark patterns
- Horrible attitude
- Thick advertisements
- Scummy business model
- Whiny tone" />
        </fieldset>

        <fieldset>
          <input class="button-primary" type="submit" value="Add site to blocklist" />
        </fieldset>
      </form>
    </main>
  )
}

export default Popup
