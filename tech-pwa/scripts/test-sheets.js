const id='1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4';
async function fetchSheet(name) {
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(name)}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(`\n--- ${name} ---`);
    console.log(text.substring(0, 300));
  } catch (e) {
    console.log(`\n--- ${name} --- ERROR: ${e.message}`);
  }
}
Promise.all(['Properties', 'RMs', 'Contacts', 'Techs', 'Sheet1', 'DB'].map(fetchSheet));
