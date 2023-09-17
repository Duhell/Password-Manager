const form = document.querySelector('form')
const clearAll = document.querySelector('#clear')
const loading = document.querySelector('#loading')

window.addEventListener('load',function(){
    loading.classList.add('hidden')
})

clearAll.addEventListener('click',()=>{
    const confirmation = confirm('Are you sure to delete all?')
    if(confirmation){
        localStorage.clear()
        displayData()
    }else{
        return
    }
})

form.addEventListener('submit', e => {
    e.preventDefault()

    let account = document.querySelector('input[name="account"]')
    let email = document.querySelector('input[name="email"]')
    let password = document.querySelector('input[name="password"]')

    let data = JSON.parse(localStorage.getItem('data')) || [];

    if(account.value == "" || email.value == "" || password.value == ""){
        return alert('Fields must not be empty!')
    }

    data.push({
        Website: account.value,
        Username: email.value,
        Password: password.value
    })

    localStorage.setItem('data',JSON.stringify(data))

    displayData()

    account.value = ""
    email.value = ""
    password.value = ""
})

function displayData(){

    let getData = JSON.parse(localStorage.getItem('data'))
    let table = document.querySelector('tbody')
    table.innerHTML = ""

    for(var i = 0; i < getData.length; i++){
        let row = document.createElement('tr')
        row.className = "bg-white border-b  hover:bg-gray-50 "
        
        let Website_cell = document.createElement('td')
        Website_cell.className = "px-6 py-4"
        Website_cell.textContent = getData[i].Website
        if(Website_cell.textContent == 'Facebook' || Website_cell.textContent == "facebook"){
            Website_cell.classList.add('text-blue-500')
        }else if(Website_cell.textContent == 'Instagram' || Website_cell.textContent == "instagram"){
            Website_cell.classList.add('text-rose-400')
        }
        row.appendChild(Website_cell)

        let Username_cell = document.createElement('td')
        Username_cell.className = "px-6 py-4"
        Username_cell.textContent = getData[i].Username
        row.appendChild(Username_cell)

        let Password_cell = document.createElement('td')
        Password_cell.className = "px-6 py-4"
        Password_cell.textContent = getData[i].Password
        row.appendChild(Password_cell)

        table.appendChild(row)
    }

}

displayData();