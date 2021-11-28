let playpauseBTN = document.getElementById('play-boton')
let stopBTN = document.getElementById('stop-boton')
let previousBTN = document.getElementById('previous-boton')
let nextBTN = document.getElementById('next-boton')
let randomBTN = document.getElementById('random-boton')
let imagen = document.getElementById('imagen')
let song = document.getElementById('audio')
let icono = document.getElementById('icono')
let icono2 = document.getElementById('icono2')
let volumen = document.getElementById('volume-control')
let tiempo = document.getElementById('tiempo-control')

let songs = [
    {
        id:0,
        genero: 'pop',
        pista: 'Un nuevo amor.mp4',
        imagen: 'Tranzas.JPG',
        artista: 'Tranzas',
        titulo: 'Un nuevo amor'
    },
    {
        id:1,
        genero: 'rock',
        genero: 'pop',
        pista: 'Who Can It Be Now.mp4',
        imagen: 'Who Can It Be Now.JPG',
        artista: 'Men At Work',
        titulo: 'Who Can It Be Now'
    },
    {
        id:2,
        genero: 'rock',
        genero: 'metal',
        pista: 'Resistance.mp4',
        imagen: 'Resistance.JPG',
        artista: 'Muse',
        titulo: 'Resistance'
    },
    {
        id:3,
        genero: 'pop',
        pista: 'Frío, Frío.mp4',
        imagen: 'Frío, frío.JPG',
        artista: 'Juan Luis Guerra',
        titulo: 'Frío, Frío'
    },
    {
        id:4,
        genero: 'rock',
        pista: 'Nemo.mp4',
        imagen: 'Nemo.JPG',
        artista: 'Nightwish',
        titulo: 'Nemo'
    },
    { 
        id:5,
        genero: 'rock',
        pista: 'La otra cara de la moneda.mp4',
        imagen: 'La otra cara de la moneda.JPG',
        artista: 'Rata Blanca',
        titulo: 'La otra cara de la moneda'
    },
    {
        id:6,
        genero: 'metal',
        pista: 'Through the Fire and Flames.mp4',
        imagen: 'Through the Fire and Flames.JPG',
        artista: 'Dragonforce',
        titulo: 'Through the Fire and Flames'
    },
    {
        id:7,
        genero: 'rock',
        pista: 'Si no estás tú.mp4',
        imagen: 'Rock Peruano.JPG',
        artista: 'La Negra',
        titulo: 'Si no estás tú'
    },
    {
        id:8,
        genero: 'pop',
        pista: 'Sentimiento Increíble.mp4',
        imagen: 'Sentimiento Increíble.JPG',
        artista: 'Pedro Suárez Vértiz',
        titulo: 'Sentimiento Increíble'
    },
    {
        id:9,
        genero: 'pop',
        pista: 'Loco de Amor.mp4',
        imagen: 'Loco de Amor.JPG',
        artista: 'Amar',
        titulo: 'Loco de Amor'
    },
    {
        id:10,
        genero: 'rock',
        pista: 'Behind Blue Eyes.mp4',
        imagen: 'Behind Blue Eyes.JPG',
        artista: 'Limp Bizkit',
        titulo: 'Behind Blue Eyes'
    },
]


let num_pista = 0;
previousBTN.addEventListener('click',()=>{
    if(num_pista > 0)
    {
        num_pista--;
        playSong2(num_pista)
    }
})
nextBTN.addEventListener('click',()=>{
    if(num_pista < songs.length-1)
    {
        num_pista++;
        playSong2(num_pista)
    }
})
song.addEventListener('ended',()=>{
    if(num_pista < songs.length-1)
    {
        num_pista++;
        playSong2(num_pista)
    }
})


let estado = true;
let progress;
playpauseBTN.addEventListener('click',()=>{
    if (estado){
        playSong();
    }
    else{
        pausedSong(0);
    }
})
document.addEventListener('keypress',(xde)=>{
    if(xde.code === 'Space' && estado)
    {
        playSong()
    }
    else{
        pausedSong()
    }
})


stopBTN.addEventListener('click',()=>{
    pausedSong();
    song.currentTime = 0;
})

let vol = 1;
volumen.value = 1;
volumen.addEventListener('change',()=>{
    song.volume = volumen.value;
})
document.addEventListener('keypress',(xd)=>{
    console.log(xd.key)
    if(xd.key === 'ArrowUp' && vol<1)
    {
        song.volume = song.volume + 0.01
    }
    if(xd.key === 'ArrowDown' && vol>=0)
    {
        song.volume = song.volume - 0.01
    }
})


tiempo.value = 0;
setTimeout(()=>{
    tiempo.setAttribute('max', song.duration)
}, 500)
tiempo.addEventListener('change', ()=>{
    song.currentTime = tiempo.value
})
song.addEventListener('ended', ()=>{
    if(num_pista == songs.length-1)
    {
        pausedSong()
    }
    else
    {
        tiempo.value = 0;
        if(num_pista < songs.length-1)
        {   
            num_pista++;
            playSong2(num_pista)
        }
    }
})


function playSong(){
    song.play();
    imagen.style.animationPlayState = 'running';
    icono.classList.remove('mdi-play-pause')
    icono.classList.remove('mdi-pause')
    icono.classList.add('mdi-play')
    progress = setInterval(()=>{
        tiempo.value = song.currentTime;
    },1000)
    estado = false;
}
function pausedSong(){
    song.pause();
    clearInterval(progress)
    imagen.style.animationPlayState = 'paused';
    icono.classList.remove('mdi-play')
    icono.classList.add('mdi-pause')
    estado = true;
}
function playSong2(indice){
    song.src = 'audio/'+songs[indice].pista;
    imagen.src = 'img/'+songs[indice].imagen;
    setTimeout(()=>{
        progress_bar.max = cancion.duration
    },500)
    playSong();
    song.play();
    imagen.style.animationPlayState = 'running';
    icono.classList.remove('mdi-play-pause')
    icono.classList.remove('mdi-pause')
    icono.classList.add('mdi-play')
}


let start = true;
let num_random = Math.round(Math.random()*(songs.length-1));
randomBTN.addEventListener('click',()=>{
    if (num_random != 0 && start){
        icono2.classList.remove('mdi-shuffle-variant')
        icono2.classList.add('mdi-shuffle-disabled')
        playSong2(num_random)
        aleatorio(num_random)
        start = false;
    }
    else {
        icono2.classList.remove('mdi-shuffle-disabled')
        icono2.classList.add('mdi-shuffle-variant')
        playSong2(0)
        start = true;
    }
})
setInterval(()=>{
    num_random = Math.round(Math.random()*(songs.length-1))
}, 1000);
function aleatorio(){
    previousBTN.addEventListener('click',()=>{
        if(num_random > 0)
        {
         num_random--;
         playSong2(num_random)
        }
    })
    nextBTN.addEventListener('click',()=>{
        if(num_random < songs.length-1)
        {
         num_random++;
         playSong2(num_random)
        }
    })
}


let list_songs = document.getElementById('list_songs')
function generarLista(songs){
    list_songs.innerHTML = '';
    for(let item of songs)
    {
        list_songs.insertAdjacentHTML('beforeend',`
        <article class="list-item" id="${item.id}">
            <img src="img/${item.imagen}">
            <div class="data">
                <div><span>${item.titulo}</span> - <span>${item.artista}</span></div>                
            </div>
        </article>
        `)
    }
}
generarLista(songs)
list_songs.addEventListener('click',(event)=>{
    if(event.target.matches('.list-item img'))
    {
        playSong2(event.target.parentNode.id)
        num_pista = event.target.parentNode.id
    }
    else if(event.target.matches('.data'))
    {
        playSong2(event.target.parentNode.id)
        num_pista = event.target.parentNode.id
    }
    else if(event.target.matches('.data div'))
    {
        playSong2(event.target.parentNode.parentNode.id)
        num_pista = event.target.parentNode.parentNode.id
    }
    else if(event.target.matches('.data div span')){
        playSong2(event.target.parentNode.parentNode.parentNode.id)
        num_pista = event.target.parentNode.parentNode.parentNode.id
    }
    else if(event.target.matches('.list-item')){
        playSong2(event.target.id)
        num_pista = event.target.id
    }
   
})

let filter_genere = document.getElementById('filter-genere')
filter_genere.addEventListener('change',(event)=>{
    
    if(filter_genere.value === 'all')
    {
        generarLista(songs)
    }
    else{
        let filtrado = songs.filter(el => el.genero === filter_genere.value)
        generarLista(filtrado)
    }
})

let filter_title = document.getElementById('input.search')
filter_title.addEventListener('keyup',()=>{
    if(filter_title.value!='')
    {
        let fil = songs.filter(elemento=>elemento.titulo.toLowerCase().includes(filter_title.value.toLowerCase()))
        generarLista(fil)
    }
    else{
        generarLista(songs)
    }
})