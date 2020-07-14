export function requestCallback(results, status, callback=console.log){
    if(status === google.maps.places.PlacesServiceStatus.OK){
        callback(results);
    }else{
        let containerCard = document.querySelector('.categories-container');
        let statusErrorContainerMessage = `
            <div class="error-status">
                <span class="text-danger">${status}</span><br>
                <a href="#" class="test-paint-category-cards">Paint restaurant category cards (test)</a><br>
                <a href="#" class="test-paint-details-card" id="restaurant">Paint details "Els pescador" card (test)</a><br>
                <a href="#" class="test-paint-details-card" id="hotel">Paint details "Grand Hotel Central" card (test)</a><br>
            </div>
        `;
        containerCard.innerHTML = statusErrorContainerMessage;
    }

};

export function serviceGoogleMaps(container, city){
    let _map = new google.maps.Map(container, {center: city, zoom: 15});
    let service = new google.maps.places.PlacesService(_map);
    return service;
};
