const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


exports.testingData = functions.pubsub.schedule('every 10000 minutes').onRun(context => {
  admin.database().ref(`/`).once('value')
  .then(results => {
    //  const somethingSnapshot = results.val();
     results.forEach(element => {
      console.log("Single History: ",element.key, element.val().history);
      // element.val().history.forEach()
      let data = {};
      data.treeid = element.key;
      data.history = element.val().history;
      admin.firestore().collection('trees').doc(element.key).set(data)
     });
     // Do something with the snapshot
 })
})


exports.weekData = functions.pubsub.schedule('1 of month 00:00').onRun((context) => {
  console.log('This will be run every 5 sed!');
  return null;
});

exports.monthData = functions.pubsub.schedule('1,8,15,22 of month 00:00').onRun((context) => {
  console.log('This will be run every 5 minutes!');
  return null;
});