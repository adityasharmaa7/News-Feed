const ID = () => Math.random().toString(36).substring(2,9);

// Create Accordian

function createAccordianItem(name,id){
    return `
    <div class="accordion-item" id="card${id}">
     <h2 class="accordion-header" id="heading${id}">
       <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" 
            aria-expanded="true" aria-controls="collapse${id}">
        ${name}
       </button>
     </h2>
     <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}" 
        data-bs-parent="#accordionExample">

     </div>
    </div>
    `
}

// create carousel

function createCarouselOuter(id){
    return `
    <div id="carouselExampleControls${id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id="carousel-inner${id}">
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>

        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    
    `
};


function createCards(item){
    const {title, pubDate, link:postList, guid, author, thumbnail, description, content, enclosure, categories} = item;
    const {link: postImageLink} = enclosure;
    return `
    <div class="card" >
        <img src="${postImageLink}" class="card-img-top carousel-img " alt="card-image">
        <a href="${postList}" class="btn   btnn">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle">${author}</h6>
            <p class="card-subtitle">${pubDate}</p>
            <p class="card-text">${description}</p> 
        </div>
        </a>
    </div> 
    `
};

function carouselInner(active,id){
    return `
    <div  id="carousel-item${id}" class="carousel-item ${active ? 'active' : ''}">
    </div>
    `
}


async function mainFunction(){
    for(let i=0;i<magazines.length;i++){
        const url = magazines[i];
        const fullURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`;

        // fetch data

        let response = await fetch(fullURL);
        let data  =  await response.json();

        // create accordian 
        const accordianTitle = data.feed.title;
        let accordianId = ID(); 

        const accordianItem = createAccordianItem(accordianTitle,accordianId);
        document.getElementById("accordionExample").innerHTML += accordianItem ;
        if(i==0){
            document.getElementById(`collapse${accordianId}`).classList.add("show");
            
        }
        
        // create carousel
        let carouselId = ID();
        const createCarouselBody = createCarouselOuter(carouselId);

        document.getElementById(`collapse${accordianId}`).innerHTML = createCarouselBody;

        let items = data.items;
        for(let i in items){
            const item = items[i];
            const cardHTML = createCards(item);
            const carouselCardId = ID();
            const carouselCardInner  = carouselInner(i==0,carouselCardId)
            document.getElementById(`carousel-inner${carouselId}`).innerHTML += carouselCardInner;

            document.getElementById(`carousel-item${carouselCardId}`).innerHTML += cardHTML;
        } 
    
    }
}
mainFunction();