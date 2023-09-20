
const count = document.getElementById("count");

incrementVisitsCount();

function incrementVisitsCount() {
    let visits;
    
    // Get the 'visits' cookie
    const cookieValue = getCookie("visits");

    if (!cookieValue) {
        // If the cookie doesn't exist, set it to 1
        setCookie("visits", "1", 365); // Expires in 365 days
        visits = 1;
    } else {
        // If the cookie exists, parse its value and increment it
        visits = parseInt(cookieValue) + 1;
        setCookie("visits", visits.toString(), 365); // Update the cookie with the new value
    }

    count.innerText = visits;
}

// Function to set a cookie
function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}



