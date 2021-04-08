const form = document.getElementById('inputtab');
const save = document.getElementById('saveitem');

const todotab = document.getElementById('nav-todo-tab');
const donetab = document.getElementById('nav-done-tab');
const statstab = document.getElementById('nav-stats-tab');

// Add input field data to firestore
function getInputsAndAdd() {
  save.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function (user) {

      if (user) {
        //get the input values
        let title = document.getElementById('newitem').value;
        let startdate = document.getElementById('newitemstartdate').value;
        let starttime = document.getElementById('newitemstarttime').value;
        let duedate = document.getElementById('newitemduedate').value;
        let duetime = document.getElementById('newitemduetime').value;

        console.log(title);
        console.log(startdate);
        console.log(starttime);

        // Alert if there are missing fields
        if (title == "" || startdate == "" || starttime == "" || duedate == "" || duetime == "") {
          alert("Please enter all fields!");
        } else {
          // Save the input data to database
          db.collection('users').doc(user.uid).collection('todolist').add({
            'title': title,
            'startdate': startdate,
            'starttime': starttime,
            'duedate': duedate,
            'duetime': duetime,
            'complete': false
          });
        }
        inputtab.reset();
      } else {
        alert("Please login!");
        location.assign('login.html');
      }
    });
  });
};
getInputsAndAdd();

// initial snapshot of todo list
auth.onAuthStateChanged(user => {
  db.collection("users").doc(user.uid).collection('todolist').where("complete", "==", false)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // doc.id, " => ", doc.data(
        console.log(doc.id);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
});

// items that changed
auth.onAuthStateChanged(user => {

  if (user) {
    db.collection('users').doc(user.uid).collection('todolist')
      .where('complete', '==', false)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {

          // let todoitemid = doc.id;
          // console.log("Todo item id : " + todoitemid);

        });
      });
  }
});


// db.collection("cities").where("state", "==", "CA")
//   .onSnapshot((snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//       if (change.type === "added") {
//         console.log("New city: ", change.doc.data());
//       }
//       if (change.type === "modified") {
//         console.log("Modified city: ", change.doc.data());
//       }
//       if (change.type === "removed") {
//         console.log("Removed city: ", change.doc.data());
//       }
//     });
//   });


// Done button and listener for updating complete field.
// let done = document.createElement('button');
// let i = document.createElement('i');
// i.className = 'material-icons';
// i.textContent = 'check_circle';
// done.appendChild(i);

// done.addEventListener('click', (e) => {
//   let id = todoitem;
//   auth.onAuthStateChanged((user) => {
//     if (user) {
//       db.collection('users').doc(user.uid).collection('todolist').doc(id).update('complete', true);
//     } else {
//       console.log('Update failed! Please log in!');
//       location.assign('login.html');
//     }
//   });
// });