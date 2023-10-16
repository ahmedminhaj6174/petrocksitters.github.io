// Your Firebase web app's configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-nBo_nuGkvRYc1OHmScmqeq5beHMEUNk",
    authDomain: "visitor-review.firebaseapp.com",
    databaseURL: "https://visitor-review-default-rtdb.firebaseio.com",
    projectId: "visitor-review",
    storageBucket: "visitor-review.appspot.com",
    messagingSenderId: "636856076668",
    appId: "1:636856076668:web:baaf129eed7dc0180dbcf9"
  };

  // initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");
  var messageDate = getElementVal("messageDate");
  var rating = getElementVal("rating");

  // Check if any required field is empty before submitting
  if (!name || !emailid || !msgContent || !messageDate || !rating) {
    alert('Please fill in all fields.');
    return; // Don't submit the form
  }

  saveMessages(name, emailid, msgContent, messageDate, rating);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent, messageDate, rating) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
    messageDate: messageDate,
    rating: rating,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Listen for changes in the data and display it
contactFormDB.on("child_added", function(snapshot) {
  var review = snapshot.val();

  var reviewsList = document.getElementById("reviews-list");
  var reviewContainer = document.createElement("div");
  reviewContainer.className = "review-container"; // You can style this class in your CSS

  var reviewContent = document.createElement("p");
  reviewContent.innerHTML = `<strong>${review.name}</strong> (Rating: ${review.rating})<br><br>${review.msgContent} (Date: ${review.messageDate})`;

  
  reviewContainer.appendChild(reviewContent);
  reviewsList.appendChild(reviewContainer);
});



