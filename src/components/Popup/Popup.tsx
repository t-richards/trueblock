import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { BlockedSite, updateSite } from '../../storage/blockedSite'

const Popup = () => {
  const [domain, setDomain] = useState("")
  const [note, setNote] = useState("")

  // Initially, set the domain field based on the current tab
  useEffect(() => {
    chrome
      .tabs
      .query({ active: true })
      .then(tabs => setDomain(tabs[0].url))
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
    const site: BlockedSite = {
      domain,
      note,
      enabled: true
    }
    updateSite(site)
  }

  return (
    <div class="container">
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
    </div>
  )
}

export default Popup
