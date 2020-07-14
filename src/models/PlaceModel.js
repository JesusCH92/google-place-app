import { requestCallback, serviceGoogleMaps } from '../utils/request';
import GoogleMapsLoader from 'google-maps';

const _GoogleMapsLoader = GoogleMapsLoader;
_GoogleMapsLoader.KEY = 'AIzaSyCz6T-LfOdTwU3FDzza1w03Ws5cdotqI5o';
_GoogleMapsLoader.LIBRARIES = ['places'];
_GoogleMapsLoader.VERSION = "3.37";
const BARCELONA = {lat: 41.390205, lng: 2.154007};
const mapContainer = document.querySelector("#map");

const PlaceModel = {
    _GoogleMapsLoader,
    BARCELONA,
    mapContainer,
    getPlaceByCategory({
        radius = '15000',
        type = ['restaurant'],
        callback
    }){
        _GoogleMapsLoader.load(function() {
            let service = serviceGoogleMaps(mapContainer, BARCELONA);
            let request = {
                location: BARCELONA,
                radius: radius,
                type: type 
            };
            service.nearbySearch(request, function(results, status) {
                requestCallback(results, status, callback);
            });
        });
    },
    getFindingPlace({
        radius = '15000',
        findPlace,
        callback
    }){
        _GoogleMapsLoader.load(function() {
            let service = serviceGoogleMaps(mapContainer, BARCELONA);
            let request = {
                location: BARCELONA,
                radius: radius,
                query: findPlace
            };
            service.textSearch(request, function(results, status) {
                requestCallback(results, status, callback);
            });
        });
    },
    getPlaceDetails({
        placeId,
        callback
    }){
        _GoogleMapsLoader.load(function() {
            let service = serviceGoogleMaps(mapContainer, BARCELONA);
            let request = {
                placeId: placeId
            };
            service.getDetails(request, function(results, status) {
                requestCallback(results, status, callback);
            })
        });
    }

};

export default PlaceModel;