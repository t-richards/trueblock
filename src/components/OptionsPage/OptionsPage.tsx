import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { TrashIcon } from '../../icons/outline'
import {
  type BlockRuleStorage,
  deleteRule,
  fetchAllRules,
  updateRule,
} from '../../storage/blockRules'

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
    ;(async () => {
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
        <h2>Blocked sites</h2>
        <figure>
          <table>
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
                    <input
                      data-domain={rule.domain}
                      type="checkbox"
                      role="switch"
                      id={rule.id.toString()}
                      aria-checked={rule.enabled}
                      checked={rule.enabled}
                      onClick={handleToggle}
                    />
                  </th>
                  <td>{rule.domain}</td>
                  <td>{rule.note}</td>
                  <td>
                    <button
                      type="button"
                      aria-label="Delete"
                      data-domain={rule.domain}
                      class="outline contrast action"
                      onClick={handleDelete}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </section>
      <section>
        <h2>Block a new site</h2>
        <form onSubmit={handleNewSiteSubmit}>
          <fieldset>
            <label>
              Domain
              <input
                type="text"
                name="domain"
                placeholder="example.net"
                value={domain}
                onInput={handleDomainInput}
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Note
              <input
                type="text"
                name="note"
                placeholder="I do not like this website"
                value={note}
                onInput={handleNoteInput}
              />
            </label>
            <button type="submit">Add site to blocklist</button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}

export default OptionsPage
