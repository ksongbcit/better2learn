function quit() {
  logout.addEventListener('click', (e) => {

    console.log("logging out user");
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      location.assign("index.html");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  });
};
quit();