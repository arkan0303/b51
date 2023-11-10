function submitData() {
  let name = document.getElementById("name").value;
  let number = document.getElementById("number").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("input-select").value;
  let message = document.getElementById("Description").value;

  if (name === "") {
    return alert("Tolong isi dulu nama nya");
  } else if (number === "") {
    return alert("Tolong isi dulu email nya");
  } else if (email === "") {
    return alert("Tolong isi dulu email nya");
  } else if (subject === "") {
    return alert("Tolong isi dulu subject nya");
  } else if (message === "") {
    return alert("Tolong isi dulu message nya");
  }

  let emailReceiver = "arkanuladelis8@gmail.com";
  let a = document.createElement("a");
  a.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailReceiver}&su=${subject}&body=Hello, nama saya ${name}, ${message}, Tolong hubungi saya di ${email}, atau no wa  ${number}`;
  a.click();

  let data = {
    nama: name,
    email: email,
    number: number,
    subject: subject,
    message: message,
  };
  console.log(data);
}
