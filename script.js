
const button = document.getElementById('searchBtn');
const mealPlaceHolder = document.getElementById('meal');
const resultPlaceHolder = document.getElementById('showResult');
const errorTag = document.getElementById('aboutError');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('inputForSearch').value;
    loadDataFromServer(userInput);
});

const loadDataFromServer = async (userInput) => {

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

const displayData = meals => {

    // very very important (for cleaning previous cash data)
    mealPlaceHolder.innerHTML = null;
    resultPlaceHolder.innerHTML = null;
    errorTag.innerText = '';

    meals.forEach(meal => {

        const resultDiv = document.createElement('div');
        resultDiv.className = 'singleMeal'
        resultDiv.style.cursor = 'pointer';

        resultDiv.innerHTML = `
        <div class="col">
            <div class="card h-100">
                <img class="card-img-top" src="${meal.strMealThumb}"/>
                <div class="card-body">
                    <h5 class="card-title mx-auto">${meal.strMeal}</h5>
                    <button style="color:red" >Details...</button>
                </div>
            </div>
        </div> `;

        mealPlaceHolder.appendChild(resultDiv);

        resultDiv.addEventListener('click', () => {
            displayMealDetails(meal);
        })

    });
}


// execute when User click on Details... text
const displayMealDetails = (meal) => {

    // very very important (for cleaning previous cash data)
    errorTag.innerText = '';
    resultPlaceHolder.innerHTML = null;
    resultPlaceHolder.style.display = "block"


    const div = document.createElement('div');

    // ########################################
    json_to_html_for_div_container(meal, div);

    for (let i = 1; i <= 20; i++) {

        let ingredient = "strIngredient" + i;
        let measure = "strMeasure" + i;

        if (meal[`${ingredient}`] === '' || meal[`${ingredient}`] === null &&
            meal[`${measure}`] === '' || meal[`${measure}`] === null) {
            continue;
        }

        // crating DOM 
        const li1 = document.createElement('li');
        const li2 = document.createElement('li');

        // JSON to HTML || updating DOM
        li1.innerText = meal[`${ingredient}`];
        li2.innerText = meal[`${measure}`];

        // adding to DOM 
        document.getElementById("ingredients").appendChild(li1);
        document.getElementById("measurements").appendChild(li2);
    }

}

const json_to_html_for_div_container = (meal, div) => {

    div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top">
            <div class="card-body">
                <h3 class="card-title">${meal.strMeal}</h3>
                <div class="row">
                    <div class="col-sm-5">
                        <p><b><u>Ingredients</u></b></p>
                        <ol id='ingredients'>                               
                        </ol>
                    </div>

                    <div class="col-sm-7 ">
                        <p><b><u>Measurements</u></b></p>
                        <ul id='measurements'>
                        </ul>
                    </div>
                </div>
            </div> `;

    // this sequence is MOST Important... 
    // because these Serially ordered statement execute & create new Elements...
    // then we can catch there Existence...
    resultPlaceHolder.appendChild(div);

}


const showErrorInfo = error => {
    errorTag.innerText = error;
};