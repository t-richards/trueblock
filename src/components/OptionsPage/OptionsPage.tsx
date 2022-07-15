import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { BlockedSite, RULES_KEY } from '../../storage/blockedSite'

const OptionsPage = () => {
  const [rules, setRules] = useState<BlockedSite[]>([])
  useEffect(() => {
    chrome.storage.sync.get([RULES_KEY], (items) => {
      if (items[RULES_KEY]?.length) {
        setRules(items as BlockedSite[])
      }
    })
  }, [])

  return (
    <main class="container">
      <section>
        <h2>Blocked Sites</h2>
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
              {rules.map(rule => (
                <tr id={`row_${rule.id}`} key={rule.id}>
                  <th scope="row">
                    <input type="checkbox" id={rule.id.toString()} checked={rule.enabled} />
                  </th>
                  <td>{rule.domain}</td>
                  <td>{rule.note}</td>
                  <td>Delete</td>
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
