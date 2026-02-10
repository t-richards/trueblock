import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { deleteRule, fetchRule, updateRule } from '../../storage/blockRules'

const Popup = () => {
  const [domain, setDomain] = useState('')
  const [note, setNote] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle')

  useEffect(() => {
    ;(async () => {
      // Get the current tab domain
      const tabs = await chrome.tabs.query({ active: true })
      if (!tabs[0]) return

      const { hostname } = new URL(tabs[0].url)
      setDomain(hostname)

      // Find existing rule for this domain
      const rule = await fetchRule(hostname)
      if (rule !== null) {
        setNote(rule.note)
        setIsBlocked(true)
      }
    })()
  }, [])

  const handleDomainInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement
    setDomain(target.value)
  }

  const handleNoteInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement
    setNote(target.value)
  }

  const reloadCurrentTab = async () => {
    const tabs = await chrome.tabs.query({ active: true })
    if (tabs[0]?.id) {
      await chrome.tabs.reload(tabs[0].id, { bypassCache: true })
    }
  }

  const handleFormSubmit = async (evt: Event) => {
    evt.preventDefault()
    await updateRule(domain, note, true)
    setIsBlocked(true)
    setSubmitStatus('success')
    setTimeout(() => setSubmitStatus('idle'), 2000)
    await reloadCurrentTab()
  }

  const handleUnblock = async () => {
    await deleteRule(domain)
    setIsBlocked(false)
    setNote('')
    await reloadCurrentTab()
  }

  const submitButtonText = () => {
    if (submitStatus === 'success') {
      return 'Saved!'
    }

    if (isBlocked) {
      return 'Save changes'
    }

    return 'Add site to blocklist'
  }

  const submitButtonClass = () => {
    const baseClasses = ['strong']
    if (submitStatus === 'success') {
      baseClasses.push('secondary')
    }

    return baseClasses.join(' ')
  }

  return (
    <main class="container">
      <h3>{isBlocked ? 'Edit blocked website' : 'Block this website'}</h3>

      <form id="block-a-site" onSubmit={handleFormSubmit}>
        <fieldset>
          <label>
            Domain
            <input
              type="text"
              name="domain"
              placeholder="example.net"
              value={domain}
              onInput={handleDomainInput}
              required
            />
          </label>
        </fieldset>

        <fieldset>
          <label>
            Note (Optional)
            <textarea
              rows={5}
              cols={40}
              name="note"
              value={note}
              onInput={handleNoteInput}
              placeholder="e.g.,
- Dark patterns
- Sketchy advertisements
- Scummy business model"
            />
          </label>
        </fieldset>

        <fieldset>
          <button type="submit" class={submitButtonClass()}>
            {submitButtonText()}
          </button>
        </fieldset>
      </form>

      {isBlocked && (
        <fieldset>
          <button type="button" onClick={handleUnblock}>
            Unblock this site
          </button>
        </fieldset>
      )}
    </main>
  )
}

export default Popup
