import categoryRestaunrant from '../../response_category.json';
import elsPescadorDetails from '../../response_details_els_pescador.json';
import grandHotelCentralDetails from '../../response_details_Grand_Hotel_Central.json';


class PlaceController {
    constructor({element, submitBtn, inputQuery, containerCard, containerCardTitle, placeCategoriesView, PlaceModel}){
        this._element = element;
        this._submitBtn = submitBtn;
        this._inputQuery = inputQuery;
        this._container = containerCard;
        this._containerTitle = containerCardTitle;
        this._placeCategoriesView = placeCategoriesView;
        this._placeModel = PlaceModel;
    }

    initEvents(){
        this._container.addEventListener('click', (event) => {
            let namePlace = event.target;
            switch (namePlace.className) {
                case "name-place":
                    this._containerTitle.innerHTML = "Place details";
                    let placeIdSelected = namePlace.getAttribute('id-place');
                    console.log("Place ID selected: " + placeIdSelected);
                    this._placeModel.getPlaceDetails({placeId : placeIdSelected, callback : this._placeCategoriesView.paintPlaceDetailsCard});
                    break;
                case "test-paint-category-cards":
                    this._containerTitle.innerHTML = "Places";
                    console.log("Test modo: paint-> restaurant category");
                    this._placeCategoriesView.paintPlaceCards(categoryRestaunrant.results);
                    break;
                case "test-paint-details-card":
                    this._containerTitle.innerHTML = "Place details";
                    let detailsTest = namePlace.id == "restaurant" ? elsPescadorDetails : grandHotelCentralDetails;
                    console.log("Test modo: paint-> " + namePlace.id);
                    this._placeCategoriesView.paintPlaceDetailsCard(detailsTest.result);
                    break;
            }

        });
        this._element.addEventListener('click', (event) => {
            this._containerTitle.innerHTML = "Places";
            var placeSelect = event.target.getAttribute('category-id');
            console.log("Category selected: " + placeSelect);
            this._placeModel.getPlaceByCategory({type : [placeSelect], callback : this._placeCategoriesView.paintPlaceCards});
        });

        this._submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            var queryInput = this._inputQuery.value;
            console.log("Search query: " + queryInput);
            if(queryInput !== ""){
                this._placeModel.getFindingPlace({findPlace : queryInput, callback : this._placeCategoriesView.paintPlaceCards});
            }
        });
    }    

}

export default PlaceController;