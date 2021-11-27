function submitForm(e) {
    e.preventDefault();
    let name = document.forms["index_form"]["name"].value;
    //console.log(name);
    let email = document.forms["index_form"]["email"].value;
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    location.href = "topic.html";
  }