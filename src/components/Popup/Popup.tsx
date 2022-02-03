import { h, render } from 'preact'

const Popup = () => (
    <div class="container">
        <h1>Block a website</h1>

        <form id="block-new-site">
            <div class="form-row">
                <label for="domain">Domain</label>
                <input type="text" id="domain" name="domain" placeholder="example.com" />
            </div>

            <div class="form-row">
                <label for="note">Note</label>
                <textarea rows={10} cols={40} id="note" name="note" placeholder="e.g.,
- Dark patterns
- Horrible attitude
- Thick advertisements
- Scummy business model
- Whiny tone"></textarea>
            </div>

            <div class="form-row">
                <input class="button-primary" type="submit" value="Add site to blocklist" />
            </div>
        </form>
    </div>
)

export default Popup
