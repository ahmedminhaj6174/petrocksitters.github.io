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

var viewCountDB = firebase.database().ref("page_views");

function get_viewers_ip(json){
	viewers_ip = json.ip;
	// count view
	count_view(viewers_ip);
}

function count_view(viewers_ip){
	var views;
	var ip_to_string = viewers_ip.toString();

	for (var i, i = 0; i < ip_to_string.length; i++) {
		ip_to_string = ip_to_string.replace(".", "-");
	}

	firebase.database().ref().child("page_views/" + ip_to_string).set({
		viewers_ip: viewers_ip
	});

	firebase.database().ref().child("page_views").on("value", function(snapshot){
		views = snapshot.numChildren();
		document.getElementById("view_count_text").innerHTML = "" + views;
	});
}
