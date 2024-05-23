import { Firestore } from '@google-cloud/firestore';
 
async function storeData(id, data) {
  const db = new Firestore({
    projectId: 'submissionmlgc-dianisa',
    databaseId: 'asclepius-dianisa'
});
 
  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
}
 
export default storeData;