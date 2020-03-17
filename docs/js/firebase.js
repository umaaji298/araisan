// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAU58Q3dGjp60YosKVPqwE3GUy_BHQuld0",
  authDomain: "araisan-ms.firebaseapp.com",
  databaseURL: "https://araisan-ms.firebaseio.com",
  projectId: "araisan-ms",
  storageBucket: "araisan-ms.appspot.com",
  messagingSenderId: "847938018391",
  appId: "1:847938018391:web:0030eac3a097d04f56d712"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

firebase.auth().signInAnonymously().catch(function (error) {
  console.log(error);
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

    console.log('loggedin',isAnonymous,uid);

    // const ref = db.collection('/floors/v1/datas/').doc('000000000001');
    const ref = db.collection('/floors/v1/datas').doc('NEWMAN');
    console.log(ref);

    ref.set({ foo: 'gettr', pane: 'dolis', uid: uid })
      // ref.create({foo:'bar'})
      .then(function (docRef) {
        //console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  } else {
    // User is signed out.
    // ...
  }
});



