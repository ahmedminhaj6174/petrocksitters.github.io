const firebaseConfig = {
	apiKey: "AIzaSyCP_2WR2_OEprfWrhffdWm-sWdQu1Byef4",
	authDomain: "fingerprint-counter.firebaseapp.com",
	databaseURL: "https://fingerprint-counter-default-rtdb.firebaseio.com",
	projectId: "fingerprint-counter",
	storageBucket: "fingerprint-counter.appspot.com",
	messagingSenderId: "44548295494",
	appId: "1:44548295494:web:6d645357b6e5e87ada3347"
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
