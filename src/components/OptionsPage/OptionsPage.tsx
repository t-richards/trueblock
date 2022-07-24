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
    const newRule = await updateRule(domain, note)
    setRules({ ...rules, [newRule.domain]: newRule })
    setDomain('')
    setNote('')
  }

  // table
  const handleChange = async (domain: string) => {
    // TODO(tom): this
  }

  const handleDelete = async (domain: string) => {
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
            <button type="submit">Add Rule</button>
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
                    <input type="checkbox" role="switch" id={rule.id.toString()} checked={rule.enabled} onChange={() => handleChange(rule.domain)} />
                  </th>
                  <td>{rule.domain}</td>
                  <td>{rule.note}</td>
                  <td><button class="outline contrast action" onClick={() => handleDelete(rule.domain)}><TrashIcon /></button></td>
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
