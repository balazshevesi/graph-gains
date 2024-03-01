export default function getCookie(name: string) {
  // Encode the cookie name to handle special characters
  let encodedName = encodeURIComponent(name);

  // Split document.cookie on semicolons into an array of all the cookies
  let cookies = document.cookie.split(";");

  // Loop through the cookies array
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim(); // Trim whitespace from the cookie

    // Check if this cookie string begins with the encoded name followed by '='
    if (cookie.startsWith(encodedName + "=")) {
      // Decode and return the cookie value
      return decodeURIComponent(cookie.substring(encodedName.length + 1));
    }
  }

  // Return null if the cookie with the specified name is not found
  return null;
}
