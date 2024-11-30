const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore({databaseId: "dermato-ai"});
 
  const predictCollection = db.collection('analyze_skin');
  return predictCollection.doc(id).set(data);
}
 
module.exports = storeData;