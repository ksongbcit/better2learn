## My Web Application : BetterToLearn
## Authors: Kyung Min Song & Avneet Sandhu

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This is a browser based web application to help students manage their schedule, keep
a personalized todo list, and maintain a gradebook.

## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap
* JQueryUI
* Firestore
* Firebase

## Content
Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # allows user to log in for customized experience
├── main.html                # landing page after user has signed in
├── gradeBook.html           # allows user to enter and track grades they receive on assessments
                               throughout the term
├── tasktracker.html         # allows user to enter items to a to-do list and track their progress
                               through the term
├── schedule.html            # allows user to see class times and deadlines for all courses
└── README.md                # information on our application

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /background.jpg             # background image on all pages of application
├── scripts                  # Folder for scripts
    ├── gradebook-scripts       # Folder for gradebook scripts
        /course-display.js          # functions for changing colour and display of items depending on
                                      which course is selected
        /grades-set.js              # functions to setting, seeing, and changing grades
    ├── tasktracker-scripts
        /tasktracker.js             # contains functions relevant to the tracker page:
                                    # function for saving input values to firestore database,
                                    # realtime listeners for populating todo list, complete list,
                                    # function to calculate statistics in terms of time.
    /firebase-api.js            # API keys for firestore database
    /login.js                   # functions for login and creating initial collections in firestore
    /logout.js                  # function for signing out from firebase authentication.
    /main.js                    # functions for customized experience upon login

├── styles                   # Folder for styles
    ├── gradebook-styles        # Folder for gradebook styles
        /gradebook.css              # styling for gradebook feature
    ├── scedule-styles          # Folder for gradebook styles
        /schedulestyle.css          # styling for schedule feature
    ├── tasktracker-styles      # Folder for tasktracker styles
        /tasktrackerstyle.css       # styling for tasktracker feature
    /bottom-nav.css             # styling of bottom navigation bar
    /indexstyles.css            # styling for index landing page
    /loginstyles.css            # styling for login page
    /mainstyles.css             # styling for main landing page after user has logged in

Firebase hosting files:
├── .firebaserc...


```

