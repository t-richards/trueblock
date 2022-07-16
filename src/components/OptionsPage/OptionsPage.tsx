import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { BlockRuleStorage, clearStorage, deleteRule, fetchRules, updateRule } from '../../storage/blockRules'
import TrashOutline from '../../icons/TrashOutline'

const OptionsPage = () => {
  const [rules, setRules] = useState<BlockRuleStorage>({})
  useEffect(() => {
    (async () => {
      const result = await fetchRules()
      setRules(result)
    })()
  }, [])

  const handleAdd = async () => {
    const newRule = await updateRule('example.com', 'aaaa')
    setRules({ ...rules, [newRule.domain]: newRule })
  }

  const handleDelete = () => {
    deleteRule('example.com')
  }

  const handleClearStorage = () => {
    clearStorage()
  }

  return (
    <>
      <header>
        <hgroup>
          <h1>Debug Options</h1>
          <h2>Some cool things for testing.</h2>
        </hgroup>
        <section>
          <button onClick={handleAdd}>Add Test Rule</button>
          <button onClick={handleDelete}>Delete Test Rule</button>
          <button onClick={handleClearStorage}>Clear Storage</button>
        </section>
      </header>
      <main>
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
                {Object.entries(rules).map(([domain, rule]) => (
                  <tr id={`row_${rule.id}`} key={rule.id}>
                    <th scope="row">
                      <input type="checkbox" role="switch" id={rule.id.toString()} checked={rule.enabled} />
                    </th>
                    <td>{rule.domain}</td>
                    <td>{rule.note}</td>
                    <td><button class="outline contrast"><TrashOutline /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>
        </section>
      </main>
    </>
  )
}

export default OptionsPage
