let start = document.querySelector('.start span');
let name = document.querySelector('.name span')
let blocksCountainer = document.querySelector('.block')
let blocks = Array.from(blocksCountainer.children)
let hint = document.querySelector('.level-div span')
let levelBox = document.querySelector('.level-box')

start.addEventListener('click',function(){
    let theName = prompt('Enter Your Name');
    start.parentElement.style.display = 'none'
    
    if(theName === '' || theName === null){
        document.querySelector('.name span').innerHTML = 'Unknown'
    }else{
        document.querySelector('.name span').innerHTML = theName
    }

    
})

let orderRange = Array.from(Array(blocks.length).keys())
shuffle(orderRange)

blocks.forEach((block , index) => {
    block.style.order = orderRange[index];
    
    block.addEventListener('click',function(){
        block.classList.add('is-flipped')
        
        let flipped = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))
        if(flipped.length === 2 ){
            blocksCountainer.classList.add('no')
            setTimeout(function(){
                blocksCountainer.classList.remove('no')
            },1000)
        }
        check(flipped[0],flipped[1])
        
        let all = blocks.filter( flipdeblock => flipdeblock.classList.contains('match'))
        if(all.length === 16){
            setTimeout(function(){
                window.alert('You Win')
                blocksCountainer.classList.add('no')
                document.querySelector('button').style.display = 'block'
            },1000)
        }
        
    })
})



function shuffle (array){
    let current = array.length,
    random,
    temp;
    
    while(current > 0){
        random = Math.floor(Math.random() * current)

        temp = array[current];
        array[current] = array[random]
        array[random] = temp
        current -- ;
    }

    return array;
}
let tries = document.querySelector('.tries span')
function check (fr,sec){
    if(fr.dataset.type === sec.dataset.type){
        fr.classList.remove('is-flipped');
        sec.classList.remove('is-flipped');

        fr.classList.add('match');
        sec.classList.add('match');

        document.querySelector('video').play()
    }else{
        setTimeout(function(){
            fr.classList.remove('is-flipped');
            sec.classList.remove('is-flipped');
        },1000)
        tries.innerHTML = parseInt(tries.innerHTML) + 1; 

        let wrongTries = parseInt(tries.innerHTML); 
        if(wrongTries === theLevel ){
        setTimeout(function(){
            alert('u lose')
            start.parentElement.style.display = 'block'
            location.reload()
        },1000)
    }
    }
    
}
blocksCountainer.classList.add('no')
levelBox.addEventListener('click',function(){
    let level = document.querySelector('.level-box')
    
    if(level.value === 'easy'){
        theLevel = 10;
        hint.innerHTML = 'you have 10 tries'
        
        
    }else if(level.value === 'normal'){
        theLevel = 5;
        hint.innerHTML = 'you have 5 tries'
        
    }else if(level.value === 'hard'){
        theLevel = 3
        hint.innerHTML = 'you have 3 tries only'
    }else if(level.value === ''){
        hint.innerHTML = 'Select Level to start  '
    }
    
    if(level.value === 'easy' ||level.value === 'normal' ||level.value === 'hard' ){
        blocksCountainer.classList.remove('no')
        levelBox.classList.add('no')
        blocks.forEach((block)=>{
            block.classList.add('is-flipped')
            setTimeout(function(){
                    block.classList.remove('is-flipped')
            },1000)
        })
    }else{
blocksCountainer.classList.add('no')
}
})

document.querySelector('button').addEventListener('click',function(){
    location.reload()
})

