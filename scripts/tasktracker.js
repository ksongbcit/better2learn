const save = document.getElementById('saveitem');
const reset = document.getElementById('reset');
const logout = document.getElementById('logout');
const todotab = document.getElementById('nav-todo-tab');
const donetab = document.getElementById('nav-done-tab');
const statstab = document.getElementById('nav-stats-tab');

function getInputsAndAdd() {
  save.addEventListener('click', (e) => {

    e.preventDefault();

    firebase.auth().onAuthStateChanged(function (user) {
      //get the input values
      var title = document.getElementById('newitem').value;
      var startdate = document.getElementById('newitemstartdate').value;
      var starttime = document.getElementById('newitemstarttime').value;
      var duedate = document.getElementById('newitemduedate').value;
      var duetime = document.getElementById('newitemduetime').value;

      console.log(title);
      console.log(startdate);
      console.log(starttime);

      //save to database
      db.collection('todolist').doc(user.uid).collection('items').add({
        'title': title,
        'startdate': startdate,
        'starttime': starttime,
        'duedate': duedate,
        'duetime': duetime,
        'complete': false
      })
    });
  });
};
getInputsAndAdd();

//show todo list
function showTodoList(status) {
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection('todolist')
      .doc(user.uid)
      .collection('items')
      .where(status, '==', false)
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          let title = doc.data().title;
          let startdate = doc.data().startdate;
          let starttime = doc.data().starttime;
          let duedate = doc.data().duedate;
          let duetime = doc.data().duetime;

          console.log(title);
          console.log(startdate);
          console.log(starttime);

          $('#itemlist').append('<h4>' + title + '</h4>');
          $('#itemlist').append('<h5>' + startdate + ' at ' + starttime + '</h5>');
          $('#itemlist').append('<h5>' + duedate + ' at ' + duetime + '</h5>');

        });
      });
  });
};


// //show done list
// function showDoneList(status) {
//   firebase.auth().onAuthStateChanged(function (user) {
//     db.collection('todolist')
//       .doc(user.uid)
//       .collection('items')
//       .where(status, '==', true)
//       .get()
//       .then(function (snap) {
//         snap.forEach(function (doc) {
//           let title = doc.data().title;
//           let startdate = doc.data().startdate;
//           let starttime = doc.data().starttime;
//           let duedate = doc.data().duedate;
//           let duetime = doc.data().duetime;

//           console.log(title);
//           console.log(startdate);
//           console.log(starttime);

//           let item = document.createElement('div');
//           item.appendChild('<h4>' + title + '</h4>');
//           item.appendChild('<h5>' + startdate + " at " + starttime + '</h5>');
//           item.appendChild('<h5>' + duedate + " at " + duetime + '</h5>');

//           $('#itemlist').append(item);

//         });
//       });
//   });
// };
// showDoneList('complete');


function quit() {
  logout.addEventListener('click', () => {

    console.log("logging out user");
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
    }).catch((error) => {
      // An error happened.
    });
  });
};
quit();


function refreshTodo() {
  todotab.addEventListener('click', (e) => {
    showTodoList('complete');
  });
}
refreshTodo();