import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { BlockRuleStorage, deleteRule, fetchAllRules, updateRule } from '../../storage/blockRules'
import { TrashIcon } from '../../icons/outline'

const OptionsPage = () => {
  // New rule form
  const [domain, setDomain] = useState('')
  const [note, setNote] = useState('')

  const handleDomainInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement
    setDomain(target.value)
  }

  const handleNoteInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement
    setNote(target.value)
  }

  // Rules storage
  const [rules, setRules] = useState<BlockRuleStorage>({})
  useEffect(() => {
    (async () => {
      const result = await fetchAllRules()
      setRules(result)
    })()
  }, [])

  const handleNewSiteSubmit = async (evt: Event) => {
    evt.preventDefault()
    const newRule = await updateRule(domain, note, true)
    setRules({ ...rules, [newRule.domain]: newRule })
    setDomain('')
    setNote('')
  }

  // table
  const handleToggle = async (evt: Event) => {
    const target = evt.currentTarget as HTMLInputElement
    const domain = target.dataset.domain
    const newRules = { ...rules }
    newRules[domain].enabled = !newRules[domain].enabled

    await updateRule(domain, newRules[domain].note, newRules[domain].enabled)
    setRules(newRules)
  }

  const handleDelete = async (evt: Event) => {
    const target = evt.currentTarget as HTMLButtonElement
    const domain = target.dataset.domain
    await deleteRule(domain)
    const newRules = { ...rules }
    delete newRules[domain]
    setRules(newRules)
  }

  return (
    <main class="container">
      <section>
        <h2>Block a new site</h2>
        <form onSubmit={handleNewSiteSubmit}>
          <fieldset>
            <label for="domain">Domain</label>
            <input type="text" id="domain" name="domain" placeholder="example.net" value={domain} onInput={handleDomainInput} />
          </fieldset>
          <fieldset>
            <label for="note">Note</label>
            <input type="text" id="note" name="note" placeholder="I do not like this website" value={note} onInput={handleNoteInput} />
            <button type="submit">Add site to blocklist</button>
          </fieldset>
        </form>
      </section>
      <section>
        <h2>Blocked sites</h2>
        <figure>
          <table role="grid">
            <thead>
              <tr>
                <th scope="col">Enabled</th>
                <th scope="col">Domain</th>
                <th scope="col">Note</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rules).map(([_domain, rule]) => (
                <tr id={`row_${rule.id}`} key={rule.id}>
                  <th scope="row">
                    <input data-domain={rule.domain} type="checkbox" role="switch" id={rule.id.toString()} checked={rule.enabled} onChange={handleToggle} />
                  </th>
                  <td>{rule.domain}</td>
                  <td>{rule.note}</td>
                  <td><button data-domain={rule.domain} class="outline contrast action" onClick={handleDelete}><TrashIcon /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </section>
    </main>
  )
}

export default OptionsPage
