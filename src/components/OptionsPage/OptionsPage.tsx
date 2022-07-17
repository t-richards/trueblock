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

  const handleAdd = async () => {
    const newRule = await updateRule(domain, note)
    setRules({ ...rules, [newRule.domain]: newRule })
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
        <form>
          <fieldset>
            <label for="domain">Domain</label>
            <input type="text" id="domain" name="domain" placeholder="example.com" value={domain} onInput={handleDomainInput} />
            <label for="note">Note</label>
            <input type="text" id="note" name="note" placeholder="aaaaa" value={note} onInput={handleNoteInput} />
            <a href="#" role="button" onClick={handleAdd}>Add Rule</a>
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
                    <input type="checkbox" role="switch" id={rule.id.toString()} checked={rule.enabled} />
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
