
const button = document.getElementById('searchBtn');
const mealPlaceHolder = document.getElementById('meal');
const resultPlaceHolder = document.getElementById('showResult');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('inputForSearch').value;
    loadData(userInput);
});

function loadData(userInput) {

    let url = "";
    if (userInput.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${userInput}`;
        mealPlaceHolder.innerHTML = null;
        
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
        mealPlaceHolder.innerHTML = null;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayData(data)
        })
    //.catch(error => console.log(error))
}



const displayData = data => {

    data.meals.forEach(element => {

        const div = document.createElement('div');

        const mealIntro = `
        <div class="col">
            <div class="card h-100">
                <img class="card-img-top" src="${element.strMealThumb}"/>
                <div class="card-body">
                    <h5 class="card-title mx-auto">${element.strMeal}</h5>
                    <button onclick="displayMealDetails('${element.strMeal}')">Details...</button>
                </div>
            </div>
        </div> `;
        div.innerHTML = mealIntro;
        mealPlaceHolder.appendChild(div);

    });
}

const displayMealDetails = (string) => {

    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${string}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            console.log('JUST STRING NAME : ', string);

            resultPlaceHolder.style.display = "block"
            const div = document.createElement('div');

            let element;
            let mealInfo;
            for (let i = 0; i < data.meals.length; i++) {
                element = data.meals[i];

                if (string === element.strMeal) {
                    mealInfo = `
                    <img src="${element.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                    <h3 class="card-title">${element.strMeal}</h3>
                    <p>Ingredients</p>
                    <ul>                    
                        <li>${element.strIngredient1}</li>
                        <li>${element.strIngredient2}</li>
                        <li>${element.strIngredient3}</li>
                        <li>${element.strIngredient4}</li>
                        <li>${element.strIngredient5}</li>
                        <li>${element.strIngredient6}</li>
                        <li>${element.strIngredient7}</li>
                        <li>${element.strIngredient8}</li>
                        <li>${element.strIngredient9}</li>
                        <li>${element.strIngredient10}</li>
                    </ul>
                    </div> `;
                }
            }

            div.innerHTML = mealInfo;
            resultPlaceHolder.appendChild(div);
        });
        // very very important (for cleaning previous cash data)
        resultPlaceHolder.innerHTML = null;
}