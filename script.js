let coins = 100;
let wheat = 10;  // Начальные ресурсы пшеницы
let potato = 0;  // Начальные ресурсы картофеля
let energy = 50;

function updateInventory() {
    document.getElementById('coins').textContent = coins;
    document.getElementById('wheat').textContent = wheat;
    document.getElementById('potato').textContent = potato;
    document.getElementById('energy').textContent = energy;
}

function chooseCrop(cell) {
    if (!cell.classList.contains('planted')) {
        let cropChoice = confirm("Нажмите 'OK' для посадки пшеницы или 'Отмена' для картофеля.");
        if (cropChoice) {
            plant(cell, 'wheat');
        } else {
            plant(cell, 'potato');
        }
    }
}

function plant(cell, type) {
    if (!cell.classList.contains('planted')) {
        let img = document.createElement('img');
        if (type === 'wheat' && wheat > 0) {
            wheat--;
            img.src = "assets/wheat_seed.png";  // Изображение семян пшеницы
            cell.appendChild(img);
            cell.classList.add('planted');
            setTimeout(() => {
                img.src = "assets/wheat_harvest.png";  // Изображение созревшего урожая
                cell.classList.add('harvest-ready');
                cell.setAttribute('data-crop', 'wheat');
            }, 3000); // Пшеница созревает за 3 секунды
        } else if (type === 'potato' && potato > 0) {
            potato--;
            img.src = "assets/potato_seed.png";  // Изображение семян картофеля
            cell.appendChild(img);
            cell.classList.add('planted');
            setTimeout(() => {
                img.src = "assets/potato_harvest.png";  // Изображение созревшего картофеля
                cell.classList.add('harvest-ready');
                cell.setAttribute('data-crop', 'potato');
            }, 5000); // Картофель созревает за 5 секунд
        } else {
            alert('У вас недостаточно выбранной культуры для посадки!');
        }
        updateInventory();
    } else if (cell.classList.contains('harvest-ready')) {
        harvest(cell);
    }
}

function harvest(cell) {
    const crop = cell.getAttribute('data-crop');
    const img = cell.querySelector('img');
    if (crop === 'wheat') {
        wheat += 2;  // Пшеница увеличивается при сборе
        coins += 5;  // Пшеница приносит 5 монет
    } else if (crop === 'potato') {
        potato += 2;  // Картофель увеличивается при сборе
        coins += 10;  // Картофель приносит 10 монет
    }
    energy -= 5; // Сбор урожая требует энергии
    cell.classList.remove('harvest-ready');
    cell.removeAttribute('data-crop');
    img.remove();  // Удаляем изображение после сбора
    updateInventory();
}

function buyBread() {
    if (coins >= 15) {
        coins -= 15;
        energy += 20;
        updateInventory();
    } else {
        alert('У вас недостаточно монет для покупки хлеба!');
    }
}

function sellWheat() {
    if (wheat >= 2) {
        wheat -= 2;
        coins += 5;
        updateInventory();
    } else {
        alert("Недостаточно пшеницы для продажи!");
    }
}

function sellPotato() {
    if (potato >= 2) {
        potato -= 2;
        coins += 10;
        updateInventory();
    } else {
        alert("Недостаточно картофеля для продажи!");
    }
}

function buyPotato() {
    if (coins >= 10) {
        coins -= 10;
        potato += 2;
        updateInventory();
    } else {
        alert('У вас недостаточно монет для покупки картофеля!');
    }
}
