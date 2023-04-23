import promptly from "promptly";
import axios from "axios";
(async () => {
  const name = await promptly.prompt("Name: ");
  const email = await promptly.prompt("Email: ");
  const password = await promptly.password("Password: ");
  const dateOfBirth = await promptly.password("date of birth: ");

  axios
    .post("http://localhost:3000/api/v1/admin/create", {
      name,
      email,
      password,
      dateOfBirth,
      classId: "5835e6ec-d310-4f43-b4a9-e73d7ec6a33c",
      photoFile: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pe",
    })
    .then((res) => {
      console.log("ADMIN CREATED SUCCESSFULLY");
    })
    .catch((err) => {
      console.log(err);
    });
})();
