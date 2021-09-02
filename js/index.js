let pageNum = 1;
document.addEventListener('DOMContentLoaded', function(){
    const monsterContainer = document.querySelector('#monster-container')
    const createMonster = document.querySelector('div#create-monster')
    const back = document.querySelector('#back')
    const forward = document.querySelector('#forward')

    createMonster.appendChild(createMonsterForm())

    document.querySelector("#create-button").addEventListener('click', function(e){
        e.preventDefault()
        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                newMonster(e)
            )
        }
        fetch('http://localhost:3000/monsters', configObj)
        .then(resp => resp.json())
        .then(obj => console.log(obj))

        createMonster.firstChild.reset()
    })

    back.addEventListener('click', function(){
        pageNum -= 1;
        monsterContainer.innerHTML = '';
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(resp => resp.json())
        .then(obj => {
            obj.forEach(monster => {
                monsterContainer.appendChild(monsterCard(monster))
            })
        })
    })

    forward.addEventListener('click', function(){
        pageNum += 1;
        monsterContainer.innerHTML = '';
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(resp => resp.json())
        .then(obj => {
            obj.forEach(monster => {
                monsterContainer.appendChild(monsterCard(monster))
            })
        })
    })



    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(resp => resp.json())
    .then(obj => {
        obj.forEach(monster => {
            monsterContainer.appendChild(monsterCard(monster))
        })
    })
})

function monsterCard(monster){
    let div = document.createElement('div');
    div.className = 'card';
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    h2.innerText = `Name: ${monster.name}`;
    h3.innerText = `Age: ${monster.age}`;
    p.innerText = `Bio: ${monster.description}`;
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
    return div;
}

function createMonsterForm(){
    let form = document.createElement('form');
    let nameIn = document.createElement('input');
    let ageIn = document.createElement('input');
    let descriptionIn = document.createElement('input');
    let button = document.createElement('button');
    nameIn.placeholder = 'name...';
    nameIn.id = 'name'
    ageIn.placeholder = 'age...';
    ageIn.id = 'age'
    descriptionIn.placeholder = 'description...';
    descriptionIn.id = 'description'
    button.innerText = 'Create';
    button.id = 'create-button';
    form.appendChild(nameIn);
    form.appendChild(ageIn);
    form.appendChild(descriptionIn);
    form.appendChild(button);
    return form;
}

function newMonster(event){
    let monsterObj = {};
    monsterObj.name = event.target.parentNode[0].value;
    monsterObj.age = event.target.parentNode[1].value;
    monsterObj.description = event.target.parentNode[2].value;
    return monsterObj;
}