import { openDB, DBSchema } from 'idb';

interface BlockedSite {
    domain: string;
    note: string;
}

interface EthicalBlockerDB extends DBSchema {
    blockedSites: {
        value: BlockedSite;
        key: string;
    };
}

export async function demo() {
    const db = await openDB<EthicalBlockerDB>('ethicalblockdb', 1, {
        upgrade(db) {
            db.createObjectStore('blockedSites', {
                keyPath: 'domain',
            });
        },
    });

    const site: BlockedSite = {
        domain: 'youtube.com',
        note: 'distraction'
    }
    db.put('blockedSites', site)
}

const newForm = document.getElementById('block-new-site')
newForm.addEventListener('submit', (evt) => {
    console.log(evt)
})
