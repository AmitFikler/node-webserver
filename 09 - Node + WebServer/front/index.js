const form = document.querySelector("form")

function formDetails(){
    return {
        name:document.getElementById("name-input").value,
        age:document.getElementById("age-input").value,
        ability: document.getElementById("ability-input").value
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    handlesubmit(formDetails())
})

async function handlesubmit({name,age,ability}){
    try {
        const data = await axios.post("http://localhost:8080/",{
            name,
            age,
            ability
        });
        switch(data.data){
            case ("ability not allowed"):
                handleError("It is impossible to enter a course with such ability")
                break;
            case ("name not allowed"):
                handleError("It is impossible to enter a course with such a name 🤷‍♂️")
                break;
            default:
                messageStudent(data.data.name)
        }
    } catch (error) {
        console.log(error)
    }
}


function messageStudent(name){
    if (document.getElementById("welcome") === null){
        message = document.createElement("h1")
        message.setAttribute("id","welcome")
        message.innerText = `Welcome ${name}!`
        message.style.color = "green"
        document.querySelector("body").appendChild(message)

    } else{
        document.getElementById("welcome").style.color = "green"
        document.getElementById("welcome").innerText = `Welcome ${name}!`
    }
}

function handleError(err){
    if (document.getElementById("welcome") === null){
        message = document.createElement("h1")
        message.setAttribute("id","welcome")
        message.innerText = `${err}`
        message.style.color = "red"
        document.querySelector("body").appendChild(message)

    } else{
        document.getElementById("welcome").style.color = "red"
        document.getElementById("welcome").innerText = `${err}`
    }
}



