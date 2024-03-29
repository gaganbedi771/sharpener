

    let form = document.getElementById('my-form');

    window.addEventListener("DOMContentLoaded", () => {

      axios.get("http://localhost:2000/register")
        .then(allData => {
          if (allData.data.length) {
            allData.data.forEach((data) => {

              appendDataToPage(data);

            })
          }
        })
        .catch(err => {
          console.log(err);
        })
    })

    document.getElementById("my-form").addEventListener("submit", onSubmit);
    document.getElementById("users").addEventListener("click", alterDetail);

    function onSubmit(e) {
      e.preventDefault();
      if (document.getElementById("submitbtn").value == "Update") {

        const id = document.getElementById("userId").value;
        
        const updatedName=document.getElementById("name").value;
        const updatedEmail=document.getElementById("email").value;

        axios.patch(`http://localhost:2000/update/${id}`, {
          name: updatedName,
          email: updatedEmail
        })
          .then(result => {
            document.getElementById(id).remove();
            appendDataToPage({id:id, name:updatedName, email:updatedEmail});
            
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("submitbtn").value = "Submit";
            document.getElementById("userId").value = "";
          })
          .catch(err => {
            console.log(err);
          })
      }
      else {
        axios.post("http://localhost:2000/register", {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value
        }
        )
          .then((result) => {

            appendDataToPage(result.data);
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";


          })
          .catch(err => console.log(err))
      }
    }


    function appendDataToPage(data) {
      let id = data.id;
      let name = data.name;
      let email = data.email;

      //make an li item
      let li = document.createElement("li");
      li.id = id;
      li.appendChild(document.createTextNode(`Name: ${name}, Email: ${email}`));

      //append buttons
      let btnDel = document.createElement('button');
      let btnEdit = document.createElement('button');
      btnDel.className = 'btn-delete';
      btnEdit.className = 'btn-edit';
      btnEdit.appendChild(document.createTextNode('Edit'));
      btnDel.appendChild(document.createTextNode('Delete'));
      li.append(btnEdit);
      li.append(btnDel);

      //append in dom
      document.getElementById("users").appendChild(li);
    }

    function alterDetail(e) {
      e.preventDefault();
      const id = e.target.parentNode.id;
      console.log(id);
      if (e.target.className == "btn-delete") {
        axios.delete(`http://localhost:2000/delete/${id}`)
          .then(result => {
            console.log(result)
            e.target.parentNode.remove()
          })
          .catch(err => {
            console.log(err)
          })
      }
      else if (e.target.className == "btn-edit") {
        console.log(id)

        axios.get(`http://localhost:2000/getUser/${id}`)
          .then((user) => {
            console.log(user.data.name);
            document.getElementById("name").value = user.data.name;
            document.getElementById("email").value = user.data.email;
            document.getElementById("submitbtn").value = "Update";
            document.getElementById("userId").value = id;

          })

      }
    }
