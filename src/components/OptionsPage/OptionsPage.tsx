import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import { BlockRule, BlockRuleStorage, clearStorage, deleteRule, fetchAllRules, updateRule } from '../../storage/blockRules'
import { getNextID } from '../../storage/sequence'
import { TrashIcon } from '../../icons/outline'

const OptionsPage = () => {
  const [rules, setRules] = useState<BlockRuleStorage>({})
  useEffect(() => {
    (async () => {
      const result = await fetchAllRules()
      setRules(result)
    })()
  }, [])

  // TODO(tom): Handle when a rule already exists with the same domain
  const handleAdd = async () => {
    const newRule: BlockRule = {
      id: await getNextID(),
      domain: 'example.com',
      note: 'aaa',
      enabled: true
    }
    await updateRule('example.com', newRule)
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
          <a href="#" role="button" onClick={handleAdd}>Add Test Rule</a>
          <a href="#" role="button" onClick={handleDelete}>Delete Test Rule</a>
          <a href="#" role="button" onClick={handleClearStorage}>Clear Storage</a>
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
                    <td><button class="outline contrast"><TrashIcon /></button></td>
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
