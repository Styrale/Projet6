const gallery = document.getElementById('gallery');
const myModal = document.getElementById('myModal')
const closeButton = document.createElement('span')
const divPublish = document.createElement('button')
const divDelete = document.createElement('a')
const filtres = document.getElementsByClassName('filtres')[0]
let newImage;
var uploadedImage = "";
let works = []
let categories = []
let isLogged = sessionStorage.getItem("user") || null
console.log(isLogged)

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

const afficherImages = (images) => {
  gallery.innerHTML = '';

  images.forEach((image) => {
    const img = document.createElement('img');
    const container = document.createElement('div');
    img.src = image.imageUrl;
    img.title = image.title;
    container.setAttribute('data-id', image.id);

    const title = document.createElement('p');
    title.textContent = image.title;

    container.appendChild(img);
    container.appendChild(title);
    gallery.appendChild(container);
  });
}

const creerBouton = (name, id) => {
  const bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.innerHTML = name;
  bouton.id = id;
  bouton.classList.add('button');
  bouton.classList.add('buttonHighlight');
  filtres.appendChild(bouton);

  bouton.addEventListener('click', () => {
    if (id === 'all') {
      afficherImages(works);
    } else {
      const imagesFiltrees = works.filter(
        (image) => image.categoryId === parseInt(id)
      );
      afficherImages(imagesFiltrees);
    }
  });
}
  


if (isLogged !== null) {
  const bannerEl = document.createElement('div');
  bannerEl.classList.add('admin_panel');
  const editionEl = document.createElement('a');//Paragraph dans le header
  const logo = document.createElement('a');//
  const logo_image = document.createElement('img');
  logo_image.src = './assets/icons/logo_edition.png';
  logo.textContent ='modifier';
  logo.prepend(logo_image);
  logo.addEventListener("click",(event) => {
    event.preventDefault();
  })

  

// barre admin

  const buttonEl = document.createElement('button');
  editionEl.innerHTML = 'Mode Edition';
  buttonEl.classList.add('admin_button');
  buttonEl.innerHTML = 'Publier les changements';
  bannerEl.append(editionEl);
  bannerEl.append(buttonEl);
  document.body.prepend(bannerEl);
  editionEl.insertAdjacentElement('afterbegin', logo_image);
  logo_image.classList.add('logo_image')

// logos

  const portfolioLogo = logo_image.cloneNode(true);
  portfolioLogo.classList.add('logo_inner');
  document.getElementById('title').append(portfolioLogo, logo);
  logo.classList.add('inner_text');
  
  const photoLogo = logo_image.cloneNode(true);
  const logoPort = logo.cloneNode(true)
  photoLogo.classList.add('logo_inner_photo');

  document.getElementById('portfolio').prepend(photoLogo, logoPort);
  logoPort.classList.add('inner_text_photo');

// modale

  function openModalGallery(list) {
    const divModal = document.createElement('div');
    const modalGallery = document.getElementById('modalGallery');
    const divUnderline = document.createElement('div');
    const divBoutons = document.createElement('div');

    
    closeButton.classList.add('close');
    modalGallery.classList.add('modal-content');
    divBoutons.classList.add('edit-buttons');
    divPublish.classList.add('button-add');
    divDelete.classList.add('delete');

    divPublish.innerHTML = 'Ajouter une photo'
    divDelete.innerHTML = 'Supprimer la galerie'
    closeButton.innerHTML = '&times;';
    modalGallery.innerHTML = ('<h2> Galerie photo</h2> <p></p>');


    modalGallery.prepend(closeButton);
    modalGallery.appendChild(divModal);
    modalGallery.appendChild(divUnderline);
    modalGallery.appendChild(divBoutons);
    divBoutons.appendChild(divPublish);
    divBoutons.appendChild(divDelete);

    list.forEach((item) => {
      const imgModal = document.createElement('img');
      const divImage = document.createElement('div');
      const spanModal = document.createElement('span');
      
      imgModal.src =item.imageUrl;
      imgModal.alt = item.title;

      divModal.classList.add('img-modal');
      divUnderline.classList.add('underline');

      spanModal.classList.add('delete-img');
      spanModal.innerHTML = '&times;';
      spanModal.addEventListener('click', async function() {
        console.log(item.id);
        const response = await deleteWork(item.id)
        if(response.status === 204) {
          const worksToDelete = document.querySelectorAll(`[data-id = "${item.id}"]`);
          worksToDelete.forEach(item => item.remove())
        };
      })

      divImage.setAttribute('data-id', item.id);
      imgModal.crossOrigin = 'anonymous';

      divModal.appendChild(divImage);
      divImage.appendChild(spanModal);
      divImage.appendChild(imgModal);

      divPublish.addEventListener('click', () => {
        addWork();
      });
    })

    const addWork = () => {
      const divModal = document.getElementById('modalGallery');
      divModal.innerHTML = '';
    
      const formulaireDepot = document.createElement('form');
      const formulaireHeader = document.createElement('h2')
      const divFormulaire = document.createElement('div')
      const divBouton = document.createElement('label')
      const fileImage = document.createElement('img')
      const fileFormats = document.createElement('p')
      const fileInput = document.createElement('input');
      const formulaireTitre = document.createElement('div')
      const titreTitle = document.createElement('p')
      const titreInput = document.createElement('input');
      const formulaireCategorie = document.createElement('div')
      const titreCategorie = document.createElement('p')
      const categorieSelect = document.createElement('select');
      const submitButton = document.createElement('button');
      const imgUnderline = document.createElement('div');
      const backButton = document.createElement('img');

// Classes
      backButton.classList.add('back-button');
      formulaireDepot.classList.add('formulaire-depot');
      divFormulaire.classList.add('champ-photo');
      divBouton.classList.add('choix-image');
      fileImage.classList.add('img-file');
      formulaireTitre.classList.add('image-menu')
      titreInput.classList.add('select-categorie')
      formulaireCategorie.classList.add('image-menu')
      imgUnderline.classList.add('underline');
      submitButton.classList.add('submit-button')
      divBouton.classList.add('image-button');

// Contenu
      backButton.innerHTML = 'Retour';
      backButton.src = './assets/icons/back.png';
      formulaireHeader.innerHTML = "Ajout photo"
      fileImage.src = './assets/icons/img-file.png';
      fileInput.type = 'file';
      fileInput.accept = 'image/jpg, png';
      fileFormats.innerHTML = "jpg, png : 4mo max";
      divBouton.innerHTML = " + Ajouter photo";
      titreTitle.innerHTML = "Titre"
      titreInput.type = 'text';
      titreCategorie.innerHTML = "Catégorie"
      submitButton.type = 'submit';
      submitButton.innerHTML = 'Valider';

// Mise en page

      modalGallery.prepend(backButton);
      modalGallery.prepend(closeButton);
      divModal.appendChild(formulaireDepot);
      formulaireDepot.appendChild(formulaireHeader);
      formulaireDepot.appendChild(divFormulaire);
      divFormulaire.appendChild(fileImage);
      divFormulaire.appendChild(divBouton);
      divFormulaire.appendChild(fileFormats);
      divBouton.appendChild(fileInput);
      formulaireDepot.appendChild(formulaireTitre);
      formulaireTitre.appendChild(titreTitle);
      formulaireTitre.appendChild(titreInput);
      formulaireDepot.appendChild(formulaireCategorie)
      formulaireCategorie.appendChild(titreCategorie)
      formulaireCategorie.appendChild(categorieSelect);
      formulaireDepot.appendChild(imgUnderline);
      formulaireDepot.appendChild(submitButton);

// Ajout image serveur

      submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
      
        const titre = titreInput.value;
        const categorieId = categorieSelect.value;
      
        if (!newImage || !titre || !categorieId) {
          console.log(newImage, titre, categorieId)
          alert('Veuillez remplir tous les champs');
          return;
        }
      
        const formData = new FormData();
        formData.append('image', fileInput.files[0]);
        formData.append('title', titre);
        formData.append('categoryId', categorieId);
        console.log(newImage, titre, categorieId)
        const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + isLogged
          },
          body: formData
        });
      
        if (response.ok) {
          alert('L\'image a été ajoutée avec succès');
          await getWorks();
          afficherImages(works);
        
          titreInput.value = '';
          categorieSelect.value = '';
          divFormulaire.innerHTML = '';
          fileImage.style.display = 'block';
          divBouton.style.display = 'block';
          fileFormats.style.display = 'block';
        } else {
          alert('Une erreur s\'est produite lors de l\'ajout de l\'image');
        }
});

// Interface ajout image

      fileInput.addEventListener("change", function(){
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          newImage = document.createElement('img');
          newImage.classList.add('new-image')
          newImage.src = e.target.result;
          divFormulaire.appendChild(newImage);
          fileImage.style.display= "none";
          divBouton.style.display= "none";
          fileFormats.style.display= "none";
        });
        reader.readAsDataURL(this.files[0]);
      })
      
// Bouton retour

      backButton.addEventListener('click', function() {
        openModalGallery(works);
      });
    
// Menu déroulant catégories

      categories.forEach((categorie) => {
        const option = document.createElement('option');
        option.classList.add('select-categorie')
        option.value = categorie.id;
        option.textContent = categorie.name;
        categorieSelect.appendChild(option);
      });
    };

    
}

  const deleteWork = async(id) => {
  const headers = new Headers();
  headers.append('Authorization','Bearer ' + isLogged);
    return await fetch('http://localhost:5678/api/works/' + id, {
      method: 'DELETE',
      headers
    })
  }


  const modal = document.getElementById("myModal");

  logo.addEventListener('click', function() {
    openModalGallery(works);
    console.log(works);
    modal.style.display = "block";
  });

  closeButton.addEventListener("click", function() {
    modal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
    if (event.target === modal) {
     modal.style.display = "none";
    }
  });


// logout

  const loginLink = document.querySelector('a[href="./login.html"]');
  loginLink.innerHTML = 'logout'
}

const afficherFiltres = (listeCategories) => {
  creerBouton('Tous', 'all');
  listeCategories.forEach((element) => {
    creerBouton(element.name, element.id);
  });
}

const init = async () => {
  await getWorks();
  await getCategories();
  afficherFiltres(categories);
  afficherImages(works);
}

init();
