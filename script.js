
const button = document.getElementById('searchBtn');
const mealPlaceHolder = document.getElementById('meal');
const resultPlaceHolder = document.getElementById('showResult');
const errorTag = document.getElementById('aboutError');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('inputForSearch').value;
    loadData(userInput);
});

const loadData = async (userInput) => {

    let url = "";
    if (userInput.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${userInput}`;
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
    }

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayData(data.meals);
    } catch (error) {
        showErrorInfo("Give a valid word for meal");
    }
}

const displayData = data => {

    // very very important (for cleaning previous cash data)
    mealPlaceHolder.innerHTML = null;
    errorTag.innerText = '';

    data.forEach(element => {

        const div = document.createElement('div');

        const mealIntro = `
        <div class="col">
            <div class="card h-100">
                <img class="card-img-top" src="${element.strMealThumb}"/>
                <div class="card-body">
                    <h5 class="card-title mx-auto">${element.strMeal}</h5>
                    <button style="color:red" onclick="loadMealDetails('${element.strMeal}')">Details...</button>
                </div>
            </div>
        </div> `;
        div.innerHTML = mealIntro;
        mealPlaceHolder.appendChild(div);
    });
}

const loadMealDetails = async (userClick) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userClick}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals, userClick);
    } catch (error) {
        showErrorInfo("Click is missing...");
    }
}


const displayMealDetails = (data, userClick) => {

    console.log('JUST STRING NAME : ', userClick);

    // very very important (for cleaning previous cash data)
    errorTag.innerText = '';
    resultPlaceHolder.innerHTML = null;
    resultPlaceHolder.style.display = "block"

    data.forEach(element => {

        if (userClick === element.strMeal) {

            const div = document.createElement('div');

            const mealInfo = `
                    
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
            div.innerHTML = mealInfo;
            resultPlaceHolder.appendChild(div);
        }
    });


}

const showErrorInfo = error => {
    errorTag.innerText = error;
};