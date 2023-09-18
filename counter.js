// Check if the user has a unique visitor cookie
if (!getCookie("uniqueVisitor")) {
    // If not, set a new cookie and increment the counter
    setCookie("uniqueVisitor", "true", 365); // Expires in 365 days
    incrementCounter();
}

 

// Function to set a cookie
function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

 

// Function to get a cookie
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

 

// Function to increment the visitor counter
function incrementCounter() {
    let counter = parseInt(getCounter()) || 0;
    counter++;
    
    // Target the <p> element with id "visitorCount" and update its content
    const visitorCountElement = document.getElementById("visitorCount");
    if (visitorCountElement) {
        visitorCountElement.innerHTML = `You are visitor number ${counter}.`;
    }
    
    setCounter(counter);
}

 

// Function to get the current visitor counter value
function getCounter() {
    return localStorage.getItem("visitorCounter");
}

 

// Function to set the visitor counter value
function setCounter(value) {
    localStorage.setItem("visitorCounter", value);
}