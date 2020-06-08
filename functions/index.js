const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


exports.testingData = functions.pubsub.schedule('every 1 minutes').onRun(context => {
  admin.database().ref(`/`).once('value')
  .then(results => {
      // initialization of variables
    results.forEach(element => {
      let dataHistory = {},
          date = new Date().getDate() / 7,
          month = new Date().getMonth(), 
          year = new Date().getFullYear() ,
          months = [
            'jan', 'feb', 'mar', 'apr',
            'may', 'jun', 'jul', 'aug',
            'sep', 'oct', 'nov', 'dec'
          ]; 
      date = Math.ceil(date);
      // Console various data
      console.log("Single History: ",element.key, element.val().history);
      console.log(date, month, year);

      // adjusting some stuff for 
      dataHistory.treeid = element.key;
      dataHistory.history = element.val().history;
      
      // storing in firestore
      admin.firestore()
      .collection(`trees/${element.key}/${months[month]}-${year}`).doc(`week-${date}`).set(dataHistory)
        // .then(() => {
        //   admin.firestore().collection(`trees`).doc(element.key).collection(`${months[month]}-${year}`).get()
        //   .then(records => {
        //     records.forEach()
        //   })
        // })
      })
    })
  return null;
})

// admin.firestore().collection('trees').doc(element.key).set(data)

exports.monthData = functions.pubsub.schedule('1 of month 00:00').onRun((context) => {
  admin.database().ref(`/`).once('value')
  .then(results => {
      // initialization of variables
    results.forEach(element => {
      let dataHistory = {},
          date = new Date().getDate() / 7,
          month = new Date().getMonth() - 1, 
          year = new Date().getFullYear() ,
          months = [
            'jan', 'feb', 'mar', 'apr',
            'may', 'jun', 'jul', 'aug',
            'sep', 'oct', 'nov', 'dec'
          ];
      if(month<0) month = 11;
      date = Math.ceil(date);
      
      // Console various data
      console.log("Single History: ",element.key, element.val().history);
      console.log(date, month, year);

      // adjusting some stuff for 
      dataHistory.treeid = element.key;
      dataHistory.history = element.val().history;
      // storing in firestore
      admin.firestore()
      .collection(`trees/${element.key}/${months[month]}-${year}`).doc(`week-${date}`).set(dataHistory)
        // .then(() => {
        //   admin.firestore().collection(`trees`).doc(element.key).collection(`${months[month]}-${year}`).get()
        //   .then(records => {
        //     records.forEach()
        //   })
        // })
      })
    })
  return null;
});

exports.weekData = functions.pubsub.schedule('8,15,22 of month 00:00').onRun((context) => {
  admin.database().ref(`/`).once('value')
  .then(results => {
      // initialization of variables
    results.forEach(element => {
      let dataHistory = {},
          date = new Date().getDate() / 7,
          month = new Date().getMonth(), 
          year = new Date().getFullYear(),
          months = [
            'jan', 'feb', 'mar', 'apr',
            'may', 'jun', 'jul', 'aug',
            'sep', 'oct', 'nov', 'dec'
          ]; 
      date = Math.ceil(date);
      
      // Console various data
      console.log("Single History: ",element.key, element.val().history);
      console.log(date, month, year);

      // adjusting some stuff for 
      dataHistory.treeid = element.key;
      dataHistory.history = element.val().history;
      
      // storing in firestore
      admin.firestore()
      .collection(`trees`).doc(element.key)
      .collection(`${months[month]}-${year}`).doc(`week-${date}`).set(dataHistory);
      })
    })
  return null;
})