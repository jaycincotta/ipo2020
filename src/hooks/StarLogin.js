export default function StarLogin() {
  const url = "https://star.ipo.vote/user/ajaxlogin/";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var urlencoded = new URLSearchParams();
  urlencoded.append("email", "api");
  urlencoded.append("pass", "PCj4DsvyzADn9rY");
  urlencoded.append("authLength", "0");
  var options = {
    method: "POST",
    credentials: "include",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };

  console.log("Logging in...");
  fetch(url, options)
    .then(response => {
      console.log("Login Response", response);
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(json => {
      console.log("Login success", json);
    })
    .catch(err => {
      console.log("Login FAILED", err);
    });
}
