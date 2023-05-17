
const gallery = document.getElementById('gallery');
const filtres = document.getElementsByClassName('filtres')[0]
let works = []
let categories = []

const getWorks = async() => {
    await fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
      works.push(...data);
    })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });
}

console.log(filtres)

const getCategories = async() => {
  await fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
    categories.push(...data);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });
}

const afficherImages = (maListeObjetImage) => {

  maListeObjetImage.map(unSeulObjetImage => {
    const img = document.createElement('img');
    img.src = unSeulObjetImage["imageUrl"];
    img.title = unSeulObjetImage["title"];
    console.log(gallery);

    const title = document.createElement('p');
    title.textContent = unSeulObjetImage.title;
    
    const container = document.createElement('div');
    container.appendChild(img);
    container.appendChild(title);

    gallery.appendChild(container);
  });
}

const creerBouton = (name, id) => {
  const bouton = document.createElement('button') 
  bouton.type = "button"
  bouton.innerHTML = name
  bouton.id = id
  bouton.classList.add('button')
  bouton.classList.add('buttonHighlight')
  filtres.appendChild(bouton)
}

const afficherFiltres = (listeCategories) => {
  creerBouton('Tous','all')
  listeCategories.forEach(element => {
    creerBouton(element.name, element.id)
  });
}

const init = async() => {
  await getWorks()
  await getCategories()
  afficherFiltres(categories)
  afficherImages(works)
}

init()





const worksData = [
  {
    "id": 1,
    "title": "Abajour Tahina",
    "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
    "categoryId": 1,
    "userId": 1,
    "category": {
      "id": 1,
      "name": "Objets"
    }
  },
  {
    "id": 2,
    "title": "Appartement Paris V",
    "imageUrl": "http://localhost:5678/images/appartement-paris-v1651287270508.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 3,
    "title": "Restaurant Sushisen - Londres",
    "imageUrl": "http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png",
    "categoryId": 3,
    "userId": 1,
    "category": {
      "id": 3,
      "name": "Hotels & restaurants"
    }
  },
  {
    "id": 4,
    "title": "Villa “La Balisiere” - Port Louis",
    "imageUrl": "http://localhost:5678/images/la-balisiere1651287350102.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 5,
    "title": "Structures Thermopolis",
    "imageUrl": "http://localhost:5678/images/structures-thermopolis1651287380258.png",
    "categoryId": 1,
    "userId": 1,
    "category": {
      "id": 1,
      "name": "Objets"
    }
  },
  {
    "id": 6,
    "title": "Appartement Paris X",
    "imageUrl": "http://localhost:5678/images/appartement-paris-x1651287435459.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 7,
    "title": "Pavillon “Le coteau” - Cassis",
    "imageUrl": "http://localhost:5678/images/le-coteau-cassis1651287469876.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 8,
    "title": "Villa Ferneze - Isola d’Elba",
    "imageUrl": "http://localhost:5678/images/villa-ferneze1651287511604.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 9,
    "title": "Appartement Paris XVIII",
    "imageUrl": "http://localhost:5678/images/appartement-paris-xviii1651287541053.png",
    "categoryId": 2,
    "userId": 1,
    "category": {
      "id": 2,
      "name": "Appartements"
    }
  },
  {
    "id": 10,
    "title": "Bar “Lullaby” - Paris",
    "imageUrl": "http://localhost:5678/images/bar-lullaby-paris1651287567130.png",
    "categoryId": 3,
    "userId": 1,
    "category": {
      "id": 3,
      "name": "Hotels & restaurants"
    }
  },
  {
    "id": 11,
    "title": "Hotel First Arte - New Delhi",
    "imageUrl": "http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png",
    "categoryId": 3,
    "userId": 1,
    "category": {
      "id": 3,
      "name": "Hotels & restaurants"
    }
  }
]


