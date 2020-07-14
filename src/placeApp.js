import PlaceCategoriesView from './views/PlaceCategoriesView';
import PlaceController from './controllers/PlaceController';
import PlaceModel from './models/PlaceModel';


const categories = document.querySelector(".list-group");
const containerCard = document.querySelector('.categories-container');
const containerCardTitle = document.querySelector('#container-card-title');
const placeCategoriesView = new PlaceCategoriesView({container : containerCard});

const submitBtn = document.querySelector('input[type="submit"]');
const inputQuery = document.querySelector('input[name="query"]');

const placeController = new PlaceController({
    element : categories,
    containerCard : containerCard,
    containerCardTitle : containerCardTitle,
    inputQuery : inputQuery,
    submitBtn : submitBtn,
    placeCategoriesView,
    PlaceModel
});
  
placeController.initEvents();