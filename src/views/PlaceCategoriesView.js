const PlaceCategoriesView = function ({container}){
    var _container = container;

    var paintPlaceCards = function (JSONData) {
        var placeCards = "";
        var numberCards = (JSONData.length>6 ? 6 : JSONData.length);
        for(let i=0;i<numberCards;i++){
            let infoAdress = typeof (JSONData[i]["vicinity"]) == "undefined" ? JSONData[i]["formatted_address"] : JSONData[i]["vicinity"];
            let photoPlace = typeof (JSONData[i]["photos"][0].getUrl) == "undefined" ? "http://placehold.it/700x400" : JSONData[i]["photos"][0].getUrl();
            let cardHTML = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                <a href="#"><img class="card-img-top" src="${photoPlace}" alt=""></a>
                <div class="card-body">
                    <h4 class="card-title">
                    <a href="#" class="name-place" id-place="${JSONData[i]["place_id"]}">${JSONData[i]["name"]}</a>
                    </h4>
                    <p><strong>${infoAdress}</strong></p>
                </div>
                <div class="card-footer">
                    <small class="text-warning">${_putStar(JSONData[i]["rating"])}</small>
                </div>
                </div>
            </div>`;
            placeCards += cardHTML;
        };
        _container.innerHTML=placeCards;
    };
    
    var paintPlaceDetailsCard = function(JSONData) {
        let infoAdress = typeof (JSONData["vicinity"]) == "undefined" ? JSONData["formatted_address"] : JSONData["vicinity"];
        let infoNumber = typeof (JSONData["formatted_phone_number"]) == "undefined" ? "" : `<li>${JSONData["formatted_phone_number"]}</li>`;
        let infoHorary = typeof (JSONData["opening_hours"]) == "undefined" ? "" : _putHorary(JSONData["opening_hours"]);
        let infoWebsite = typeof (JSONData["website"]) == "undefined" ? "" : `<li><a href="${JSONData["website"]}" target="_blank">Website</a></li>`;
        let photoPlace = typeof (JSONData["photos"][0].getUrl) == "undefined" ? "http://placehold.it/900x400" : JSONData["photos"][0].getUrl();
        let cardHTLM = `
        <div class="card mt-4">
            <img class="card-img-top img-fluid" src="${photoPlace}" alt="">
            <div class="card-body">
                <div>
                <h3 class="card-title">${JSONData["name"]}</h3>
                <span class="text-warning" style="float:right;">${_putStar(JSONData["rating"])}</span>
                </div>
                <p><strong>${infoAdress}</strong></p>
                <ul>
                `+ infoNumber +
                   infoHorary + 
                   infoWebsite +`
                </ul>
            </div>
        </div>`;
        _container.innerHTML=cardHTLM;
        if(typeof (JSONData["reviews"]) != "undefined"){
            let _reviewCard = document.createElement("div");
            _reviewCard.className = "card card-outline-secondary my-4";
            _container.appendChild(_reviewCard);
            _reviewCard.innerHTML = `
                <div class="card-header">
                Place Reviews
                </div>
                <div class="card-body" id="container-reviews">
                </div>`;
            let _reviewContainer = document.querySelector("#container-reviews");
            _paintReviewCards(JSONData["reviews"],_reviewContainer);
        }
    };

    var _paintReviewCards = function (ArrayData, container){
        var reviewCards = "";
        var numberReviews = (ArrayData.length > 10 ? 10 : ArrayData.length);
        for(let i=0;i<numberReviews;i++){
            let cardHTML = `
            <span class="text-warning">${_putStar(ArrayData[i]["rating"])}</span>${ArrayData[i]["rating"]} stars
            <p>${ArrayData[i]["text"]}</p>
            <small class="text-muted">Posted by ${ArrayData[i]["author_name"]} on ${ArrayData[i]["relative_time_description"]}</small>
            <hr>`;
            reviewCards += cardHTML;
        };
        container.innerHTML = reviewCards;
    };
    var _putStar = function(rating){
        let fullStar = "&#9733; ";
        let emptyStar = "&#9734; ";
        return(fullStar.repeat(parseInt(rating)) + emptyStar.repeat(5 - parseInt(rating)));

    };
    var _putHorary = function(JSONOpeningHours){
        let horary = "";
        let dateNow = new Date();
        let dayNow = dateNow.getDay() - 1;
        dayNow = dayNow == -1 ? 6 : dayNow;
        let isOpen = typeof (JSONOpeningHours["open_now"]) == "undefined" ? "" : (JSONOpeningHours["open_now"] ? `<span class="text-success">Now : Open</span>` : `<span class="text-danger">Now : Close</span>`);
        let isWeekday_text = typeof (JSONOpeningHours["weekday_text"]) == "undefined" ? [] : JSONOpeningHours["weekday_text"];
        let selectOpenDay = "";
        for(let i=0;i<isWeekday_text.length;i++){
            let selectOptionDay = dayNow == i ? "selected" : "";
            let opt = `<option ${selectOptionDay}>${isWeekday_text[i]}</option>`;
            selectOpenDay += opt;
        };
        if(selectOpenDay != ""){
            selectOpenDay = `<select>${selectOpenDay}</select>`
        }
        if (isOpen != "" || selectOpenDay != ""){
            horary = `<li>${isOpen} ${selectOpenDay} </li>`;
        }
        return horary;
    };
    return{
        paintPlaceCards : paintPlaceCards,
        paintPlaceDetailsCard : paintPlaceDetailsCard
    };
};

export default PlaceCategoriesView;