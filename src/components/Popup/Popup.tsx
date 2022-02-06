import { h, render } from 'preact'
import { useState, useEffect } from 'preact/hooks'

const Popup = () => {
  // Initially, set the domain field based on the current tab
  const [domain, setDomain] = useState("")
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

  return (
    <div class="container">
      <h2>Block this website</h2>

      <form id="block-new-site">
        <fieldset>
          <label for="domain">Domain</label>
          <input type="text" id="domain" name="domain" placeholder="example.com"
            value={domain}
            onInput={handleDomainInput}
          />
        </fieldset>

        <fieldset>
          <label for="note">Note</label>
          <textarea rows={10} cols={40} id="note" name="note" placeholder="e.g.,
- Dark patterns
- Horrible attitude
- Thick advertisements
- Scummy business model
- Whiny tone"></textarea>
        </fieldset>

        <fieldset>
          <input class="button-primary" type="submit" value="Add site to blocklist" />
        </fieldset>
      </form>
    </div>
  )
}

export default Popup
