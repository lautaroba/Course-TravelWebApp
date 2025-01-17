const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('btnSearch');
const clearButton = document.getElementById('btnClear');
const resultDiv = document.getElementById('resultDiv');

function displayResults(results){
    resultDiv.innerHTML= "";
    results.forEach((item) => {
        
        try {
            const country = item.name.split(",");
            const options = { timeZone: country[1].trim().concat("/", country[0].trim()), hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const time = new Date().toLocaleTimeString('en-US', options);
            console.log(item.name.concat(" ", time));
            const cardTime = document.createElement("div");
            cardTime.classList.add("resultCardTime");
            const titleTime = document.createElement("h3");
            titleTime.textContent = item.name.concat(": ", time);
            
            cardTime.appendChild(titleTime);
            resultDiv.appendChild(cardTime);
        } catch (error) {
            console.log("not aviable time");
        }

        const card = document.createElement("div");
        card.classList.add("resultCard");
        const image = document.createElement("img");
        image.src = item.imageUrl;
        const title = document.createElement("h3");
        title.textContent = item.name;
        const description = document.createElement("p");
        description.textContent = item.description;
        const button = document.createElement("button");
        button.textContent = "VISIT";
        button.classList.add("btnVisit");
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(button);
    
        resultDiv.appendChild(card);
    })
}

function filterKeyWord(data, keyword){
    keyword = keyword.toLowerCase();

    if(keyword.includes("beach") || keyword.includes("beaches")) return data.beaches;
    if(keyword.includes("temple") || keyword.includes("temples")) return data.temples;
    if(keyword.includes("country") || keyword.includes("countries")) return data.countries.flatMap((country) => country.cities);

    return [];
}

function handleSearch(){
    const keyword = searchInput.value.trim();
    if(!keyword) return;

    fetch('travel_recommendation_api.json')
     .then(response => response.json())
     .then(data => {
        const filteredData = filterKeyWord(data, keyword);
        if(filteredData.length > 0)
            displayResults(filteredData);
        else{
            resultDiv.innerHTML = "<p>No results found</p>";
        }
     })
     .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

function clearResults() {
    searchInput.value = "";
    resultDiv.innerHTML = "";
  }

searchButton.addEventListener("click", handleSearch);
clearButton.addEventListener("click", clearResults);