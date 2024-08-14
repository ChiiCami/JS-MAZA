let albumes = document.getElementById("discos");
const discos = [
    {   id: 1, nombre:"Nightmare", precio: 300, imagen: "../assets/images/1_nightmare.jpg"},
    {   id: 2, nombre:"Fall asleep in the Mirror", precio: 80, imagen:"../assets/images/2_fall-asleep-in-the-mirror.jpg"},
    {   id: 3, nombre:"Prequel", precio: 70, imagen:"../assets/images/3_prequel.jpg"},
    {   id: 4, nombre:"Full Moon", precio: 45, imagen:"../assets/images/4_full-moon.jpg"},
    {   id: 5, nombre:"Nightmare - Escape the ERA" , precio: 45, imagen:"../assets/images/5_escape-the-era.jpg"},
    {   id: 6, nombre:"Alone in the City", precio: 50, imagen:"../assets/images/6_alone-in-the-city.jpg"},
    {   id: 7, nombre:"Over the Sky", precio: 50, imagen:"../assets/images/7_over-the-sky.jpg"},
    {   id: 8, nombre:"The End of Nightmare", precio: 45, imagen:"../assets/images/8_the-end-of-nightmare.jpg"},
    {   id: 9, nombre:"Raid of Dream", precio: 50, imagen:"../assets/images/9_raid-of-dream.jpg"},
    {   id: 10, nombre:"Dystopia: Tree of Language", precio: 25, imagen:"../assets/images/10_dystopia-the-tree-of-lenguage.jpg"},
    {   id: 11, nombre:"RoSE Blue", precio: 60, imagen:"../assets/images/11_rose-blue.jpg"},
    {   id: 12, nombre:"Dystopia: Lose Myself", precio: 20, imagen:"../assets/images/12_dystopia_lose-myself.jpg"},
    {   id: 13, nombre:"Dystopia: Road to Utopia", precio: 10, imagen:"../assets/images/13_dystopia-road-to-utopia.jpg"},
    {   id: 14, nombre:"Summer Holiday", precio: 12, imagen:"../assets/images/14_summer-holiday.jpg"},
    {   id: 15, nombre:"Apocalypse: Save Us", precio: 11, imagen:"../assets/images/15_apocalypse-save-us.jpg"},
    {   id: 16, nombre:"Apocalypse: Follow us", precio: 10, imagen:"../assets/images/16_apocalypse-follow-us.jpg"},
    {   id: 17, nombre:"Reason", precio: 15, imagen:"../assets/images/17_reason.jpg"},
    {   id: 18, nombre:"Apocalypse: From Us", precio: 8, imagen:"../assets/images/18_apocalypse-from-us.jpg"},
    {   id: 19, nombre:"VillainS", precio: 10, imagen:"../assets/images/19_versus-villains.jpg"},
    {   id: 20, nombre:"Virtuos", precio: 13, imagen:"../assets/images/20_versus-virtuos.jpeg"}
]

discos.forEach(disco => {
    let contenedor = document.createElement("seccion");
    contenedor.className = "discos";
    contenedor.innerHTML = `<p>Album número ${disco.id}</p>
                            <img src="${disco.imagen}">                        
                            <h2>${disco.nombre}</h2>
                            <p>Precio: ${disco.precio} U$D</p>`;
    albumes.appendChild(contenedor);
});
