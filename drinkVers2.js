async function loadCocktails() {
    const button = document.getElementById('showButton');
    const grid = document.getElementById('cocktailsGrid');

    try {

        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        const data = await response.json();

        grid.innerHTML = '';

        if (data.drinks) {
            data.drinks.forEach(drink => {
                const drinkElement = document.createElement('div');
                drinkElement.className = 'cocktail-item';
                drinkElement.innerHTML = `
                        <img src="${drink.strDrinkThumb || 'https://cdn-icons-png.flaticon.com/128/10905/10905502.png'}" alt="${drink.strDrink}" style="width: 100px; height: 100px;">
                        <h4>${drink.strDrink}</h4>
                        <p>${drink.strInstructions.slice(0, 50)}...</p>
                        <button onclick="showDetails('${drink.idDrink}', this)">Подробнее</button>
                        <div class="details-container" id="details-${drink.idDrink}" style="display: none;"></div>`;
                grid.appendChild(drinkElement);
            });

            grid.style.display = 'grid';
            button.textContent = 'Скрыть коктейли';
            button.onclick = () => {
                grid.style.display = grid.style.display === 'none' ? 'grid' : 'none';
                button.textContent = grid.style.display === 'none' ? 'Показать коктейли' : 'Скрыть коктейли';
            };
        } else {
            grid.innerHTML = '<p>Коктейли не найдены</p>';
            grid.style.display = 'block';
            button.textContent = 'Попробовать снова';
            button.onclick = loadCocktails;
        }
    } catch (error) {
        console.error('Ошибка загрузки коктейлей:', error);
        grid.innerHTML = '<p>Ошибка загрузки коктейлей</p>';
        grid.style.display = 'block';
        button.textContent = 'Попробовать снова';
        button.onclick = loadCocktails;
    }
}

async function showDetails(drinkId, buttonElement) {
    const detailsContainer = document.getElementById(`details-${drinkId}`);

    if (detailsContainer.style.display === 'block') {
        detailsContainer.style.display = 'none';
        detailsContainer.innerHTML = '';
        buttonElement.textContent = 'Подробнее';
        return;
    }

    detailsContainer.style.display = 'block';
    detailsContainer.innerHTML = '<p><b>Категория:</b> Напиток <br><b>Тип:</b> Lorem <br> <b>Инструкции:</b> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam nostrum commodi at optio cupiditate pariatur placeat impedit vero voluptates molestiae repellat <br></p>';
    buttonElement.textContent = 'Скрыть';

}
