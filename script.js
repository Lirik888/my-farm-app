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
            img.src = "assets/wheat_seed.png";
            cell.appendChild(img);
            cell.classList.add('planted');
            setTimeout(() => {
                img.src = "assets/wheat_harvest.png";
                cell.classList.add('harvest-ready');
                cell.setAttribute('data-crop', 'wheat');
            }, 3000);
        } else if (type === 'potato' && potato > 0) {
            potato--;
            img.src = "assets/potato_seed.png";
            cell.appendChild(img);
            cell.classList.add('planted');
            setTimeout(() => {
                img.src = "assets/potato_harvest.png";
                cell.classList.add('harvest-ready');
                cell.setAttribute('data-crop', 'potato');
            }, 5000);
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
        wheat += 2;
        coins += 5;
    } else if (crop === 'potato') {
        potato += 2;
        coins += 10;
    }
    energy -= 5;
    cell.classList.remove('harvest-ready');
    cell.removeAttribute('data-crop');
    img.remove();
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
