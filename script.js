

async function loadApi(){
    let userName = document.getElementById("inputUser").value.toLowerCase()
    console.log(userName)

    let req = await fetch(`https://api.github.com/users/${userName}`)
    let json = await req.json()
    
        if(json.id == null){
            alert('usuario nao existe')
        }else{
            document.getElementById('main-list').style.display = 'block'
            document.getElementById('userNameText').innerHTML = json.name
            document.getElementById('avatar').src = json.avatar_url
            
            let reqRepo = await fetch(`https://api.github.com/users/${userName}/repos`)
            let jsonRepo = await reqRepo.json()
            
            document.getElementById('total-repos').innerHTML = `Total de repositórios: ${jsonRepo.length}`
            showRepos(jsonRepo)
        }
}


function showRepos(respo){
    let html= ''
    
    for(let i = 0; i < respo.length; i++){
        html += 
        `
        <li>
            <h3>${respo[i].name}</h3>
            <p>Data de criação: ${Intl.DateTimeFormat('pt-br').format(new Date(respo[i].created_at))}</p>
            <a target="_Blank" href="${respo[i].html_url}">Acessar Repositório</a>
        </li>
        `
    }

    document.getElementById('list').innerHTML = html
}
