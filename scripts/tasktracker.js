const user = auth.currentUser;
const form = document.getElementById('inputtab');
const save = document.getElementById('saveitem');

const todolist = document.getElementById('itemlist');
const donelist = document.getElementById('donelist');

// Add input field data to firestore
function getInputsAndAdd() {
  save.addEventListener('click', (e) => {
    e.preventDefault();

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // Get the input values from dom form
        let title = document.getElementById('newitem').value;
        let startdate = document.getElementById('newitemstartdate').value;
        let starttime = document.getElementById('newitemstarttime').value;
        let duedate = document.getElementById('newitemduedate').value;
        let duetime = document.getElementById('newitemduetime').value;

        // Alert if there are missing fields
        if (title == "" || startdate == "" || starttime == "" || duedate == "" || duetime == "") {
          alert("Please enter all fields!");
        } else {
          // Save the input data to firestore
          db.collection('users').doc(user.uid).collection('todolist')
            .add({
              'title': title,
              'startdate': startdate,
              'starttime': starttime,
              'duedate': duedate,
              'duetime': duetime,
              'complete': false
            })
            .then(() => {
              // Reset the form after data has been added
              inputtab.reset();
            });
        }
      } else {
        alert("Please login!");
        location.assign('login.html');
      }
    });
  });
};
getInputsAndAdd();


// Change 24-Hour format to 12-Hour format
function to12HourFormat(timedata) {
  let hours = timedata.substr(0, 2);
  let minutes = timedata.substr(3, 2);
  if (hours >= 13) {
    hours -= 12;
    return `${hours}:${minutes} PM`;
  } else {
    return `${hours}:${minutes} AM`;
  }
}


// Realtime listener for todo items
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('users').doc(user.uid).collection('todolist').where("complete", "==", false)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {

          // Add new item to list and show saved list.
          if (change.type === "added") {
            console.log("New item: ", change.doc.data());

            let itemcard = document.createElement('div');
            itemcard.className = 'itemcard';
            let itemtitle = document.createElement('h4');
            let times = document.createElement('span');
            let id = change.doc.id;

            itemtitle.innerHTML = change.doc.data().title;
            times.innerHTML = "<b>Start</b> at " + to12HourFormat(change.doc.data().starttime) + " on <i>" + change.doc.data().startdate + "</i>";
            times.innerHTML += "</br><b>Due</b> at " + to12HourFormat(change.doc.data().duetime) + " on <i>" + change.doc.data().duedate + "</i>";

            // Creating done button and adding event listener to complete a todo item
            let donebutton = document.createElement('button');
            let i = document.createElement('i');
            i.className = 'material-icons';
            i.textContent = 'check_circle';
            donebutton.appendChild(i);

            donebutton.addEventListener('click', () => {
              console.log(id);
              db.collection('users').doc(user.uid).collection('todolist').doc(id).update({
                complete: true
              });
              console.log("Update success")
              todolist.removeChild(itemcard);
            });

            // Appending elements to item card
            itemcard.appendChild(itemtitle);
            itemcard.appendChild(times);
            itemcard.appendChild(donebutton);
            todolist.appendChild(itemcard);
          }
        })
      })
  }
});


// Realtime listener for completed items
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('users').doc(user.uid).collection('todolist').where("complete", "==", true)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {

          // Add new item to list and show saved list.
          if (change.type === "added") {
            console.log("Done item: ", change.doc.data());

            let itemcard = document.createElement('div');
            itemcard.className = 'itemcard';
            let itemtitle = document.createElement('h4');
            let times = document.createElement('span');
            let id = change.doc.id;

            // Creating delete button and adding event listener
            let deletebutton = document.createElement('button');
            let i = document.createElement('i');
            i.className = 'material-icons';
            i.textContent = 'delete';
            deletebutton.appendChild(i);
            // Event removes from database
            deletebutton.addEventListener('click', () => {
              console.log(id);
              db.collection('users').doc(user.uid).collection('todolist').doc(id).delete().then(() => {
                console.log("Removed from database");
                donelist.removeChild(itemcard);
              });
            });

            itemtitle.innerHTML = change.doc.data().title;
            times.innerHTML = "<b>Start</b> at " + to12HourFormat(change.doc.data().starttime) + " on <i>" + change.doc.data().startdate + "</i>";
            times.innerHTML += "</br><b>Due</b> at " + to12HourFormat(change.doc.data().duetime) + " on <i>" + change.doc.data().duedate + "</i>";

            // Appending elements to item card
            itemcard.appendChild(itemtitle);
            itemcard.appendChild(times);
            itemcard.appendChild(deletebutton);
            donelist.appendChild(itemcard);

          }
        })
      });
  }
});