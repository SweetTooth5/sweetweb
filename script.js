if (localStorage.getItem("access") === "granted") {
  document.getElementById("login").style.display = "none";
  document.getElementById("content").style.display = "block";
}

function checkCode() {
  var code = document.getElementById("codeInput").value;
  if (code === "0000") {
    localStorage.setItem("access", "granted");
    location.reload();
  } else {
    alert("Wrong code");
  }
}
