import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { fetchRule, updateRule } from '../../storage/blockRules'

const Popup = () => {
  const [domain, setDomain] = useState("")
  const [note, setNote] = useState("")

  useEffect(() => {
    (async () => {
      // Get the current tab domain
      const tabs = await chrome.tabs.query({ active: true })
      const domain = tabs[0].url
      setDomain(domain)

      // Find existing rule for this domain
      const rule = await fetchRule(domain)
      if (rule !== null) {
        setNote(rule.note)
      }
    })()
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
    updateRule
  }

  return (
    <main class="container">
      <h3>Block this website</h3>

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
            rows={5}
            cols={40}
            id="note"
            name="note"
            value={note}
            onInput={handleNoteInput}
            placeholder="e.g.,
- Dark patterns
- Sketchy advertisements
- Scummy business model" />
        </fieldset>

        <fieldset>
          <input class="button-primary" type="submit" value="Add site to blocklist" />
        </fieldset>
      </form>
    </main>
  )
}

export default Popup
