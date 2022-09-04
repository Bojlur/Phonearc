

const phoneDetails = document.getElementById('phone-details');

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const searchPhone = () => {
    const inputField = document.getElementById('search-field');
    const error = document.getElementById('error');
    const searchText = inputField.value;
    toggleSpinner('block');
    //clear data
    inputField.value = '';

    if(searchText == ''){
        error.innerText = 'Nothing found';
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }
};

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";
    phoneDetails.textContent = "";
    if(data.length > 20){
        data = data.slice(0, 20);
    }
    data.forEach(phone =>{
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p>${phone.brand}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
        </div> 
        `;
        searchResult.appendChild(div);
    });
    toggleSpinner('none');
    
}
const loadPhoneDetails = id => {
     fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
         .then(res => res.json())
         .then(data => displayPhoneDetails(data.data));
}
 const displayPhoneDetails = phone => {
    console.log(phone);
    phoneDetails.textContent = "";
    const div = document.createElement("div");
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <h5>${phone.name}</h5>
                <p>${phone.releaseDate ? phone.releaseDate : 'To be announced'}</p>
                <div>
                <h5>MainFeatures</h5>
                    <p>${phone.mainFeatures.displaySize}</P>
                    <p>${phone.mainFeatures.chipSet}</P>
                    <p>Sensor:${phone.mainFeatures.sensors}</P>
                </div>
                <p>Other:${phone.others.WLAN}</P>
            </div>
        </div> 
        `;
        phoneDetails.appendChild(div);
 }
