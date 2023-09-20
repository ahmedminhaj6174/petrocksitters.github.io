// Check if a unique visitor cookie exists
if (!document.cookie.includes("uniqueVisitor=true")) {
    // If not, set a cookie to track the unique visitor
    document.cookie = "uniqueVisitor=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    
    // Increment the visitor count
    let visitorCount = parseInt(localStorage.getItem("visitorCount")) || 0;
    visitorCount++;
    localStorage.setItem("visitorCount", visitorCount);

    // Update the visitor count on the page
    document.getElementById("visitorCount").textContent = visitorCount;
}
