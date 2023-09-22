const firebaseConfig = {
    apiKey: "AIzaSyC2jTFuVAHa2e5e-jTMAdU4Lh4a02l-Gck",
    authDomain: "realtime-view-counter-296e8.firebaseapp.com",
    databaseURL: "https://realtime-view-counter-296e8-default-rtdb.firebaseio.com",
    projectId: "realtime-view-counter-296e8",
    storageBucket: "realtime-view-counter-296e8.appspot.com",
    messagingSenderId: "503794495089",
    appId: "1:503794495089:web:71bffa9e8cfb5cff1335d0"
  };

firebase.initializeApp(firebaseConfig);


// Function to generate a UUID
function generateUUID() {
	// Generate a random UUID
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0,
		  v = c === 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
  }
  
  // Function to get or generate a visitor ID with a 365-day expiration
  function getVisitorId() {
	var visitorId = getCookieValue("visitor_id");
	if (!visitorId) {
	  visitorId = generateUUID();
	  
	  // Set the visitor ID as a cookie with a 365-day expiration
	  var expirationDate = new Date();
	  expirationDate.setDate(expirationDate.getDate() + 365); // 365 days from now
	  document.cookie = "visitor_id=" + visitorId + "; expires=" + expirationDate.toUTCString();
	}
	return visitorId;
  }
  
  // Check if a cookie exists and retrieve its value
  function getCookieValue(cookieName) {
	var name = cookieName + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var cookieArray = decodedCookie.split(';');
	for (var i = 0; i < cookieArray.length; i++) {
	  var cookie = cookieArray[i];
	  while (cookie.charAt(0) === ' ') {
		cookie = cookie.substring(1);
	  }
	  if (cookie.indexOf(name) === 0) {
		return cookie.substring(name.length, cookie.length);
	  }
	}
	return "";
  }
  
  // Function to count unique visitors
  function countUniqueVisitors() {
	var visitorId = getVisitorId();
	
	// Check if the visitor ID exists in Firebase
	var visitorDB = firebase.database().ref("unique_visitors");
	visitorDB.child(visitorId).once("value", function(snapshot) {
	  if (!snapshot.exists()) {
		// The visitor ID doesn't exist in Firebase, add it
		visitorDB.child(visitorId).set({ timestamp: Date.now() });
	  }
	  
	  // Retrieve the count of unique visitors
	  visitorDB.once("value", function(uniqueVisitorsSnapshot) {
		var uniqueVisitorsCount = uniqueVisitorsSnapshot.numChildren();
		document.getElementById("unique_visitors_text").innerHTML = uniqueVisitorsCount;
	  });
	});
  }
  
  
  // Call countUniqueVisitors when the page loads to increment the count
  window.onload = countUniqueVisitors;


