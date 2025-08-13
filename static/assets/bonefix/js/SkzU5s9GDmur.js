// ----- Масиви чоловічих/жіночих імен (македонською) -----
const maleNames = [
    "Александар","Горан","Дејан","Даниел","Гоце","Петар","Миле","Игор","Дарко","Никола",
    "Марко","Стефан","Јордан","Димитар","Ристе","Влатко","Мартин","Кирил","Васил","Давид",
    "Тони","Славко","Кире","Филип","Борче","Виктор","Драган","Стојан","Јован","Томислав",
    "Мирко","Зоран","Бранко","Владо","Раде","Цветан","Костадин","Сашо","Панче","Благоја",
    "Срѓан","Георги","Љупчо","Наум","Јане","Бошко","Радован","Орде","Жарко","Венко",
    "Златко","Веселин","Методи","Боби","Силјан","Дамјан","Миодраг","Ванчо","Ненад","Павел"
];

const femaleNames = [
    "Елена","Ана","Марија","Катерина","Славица","Оливера","Јана","Драгана","Стефанија","Ивана",
    "Милена","Биљана","Гордана","Зорица","Емилија","Дијана","Вероника","Климентина","Бојана","Наташа",
    "Елизабета","Мирјана","Ангела","Софија","Тања","Бети","Ромина","Ѓурѓа","Николина","Сузана",
    "Христина","Илеана","Мира","Милка","Снежана","Маргарита","Валентина","Симона","Кристина","Сара",
    "Викторија","Маринела","Лидија","Соња","Драгица","Доротеа","Анастасија","Ела","Албена","Евгенија",
    "Маја","Мартина","Линда","Даниела","Андријана","Деспина","Милена","Криста","Теодора","Рената"
];

// +20 додаткові імена (тут довільно можна вважати нейтральними або застосовувати логіку, якщо точно знаєте їхній рід)
const additionalNames = [
    "Томче","Јованка","Софе","Милорад","Верица","Благоја","Калина","Стојанка","Ведран","Мирче",
    "Виолета","Ристо","Елеонора","Сашка","Филипче","Јустина","Мануела","Коле","Тамара","Бранко"
];

// Збираємо все в один масив (можна) — але потрібна логіка, щоб визначити стать
// Тому зручніше буде зберегти окремо. Можемо просто об’єднати всі імена в один масив, а за потреби перевіряти:
const allNames = [...maleNames, ...femaleNames, ...additionalNames];

const cities = [
    "Скопје","Битола","Куманово","Прилеп","Тетово","Велес","Охрид","Струмица","Гостивар","Кавадарци",
    "Кочани","Кичево","Струга","Радовиш","Гевгелија",
    "Неготино","Ресен","Кратово","Свети Николе","Македонски Брод","Делчево","Берово","Дебар",
    "Демир Хисар","Пробиштип","Валандово","Богданци","Крива Паланка","Пехчево","Виница",
    "Крушево","Демир Капија","Маврово","Дојран","Конче"
];

const letters = [
    "А","Б","В","Г","Д","Ѓ","Е","Ж","З","Ѕ",
    "И","Ј","К","Л","Љ","М","Н","Њ","О","П",
    "Р","С","Т","Ќ","У","Ф","Х","Ц","Ч","Џ","Ш"
];

const quantities = ["1", "2", "3"];

// -----------------------------------------
// Логіка алерта
const triggerElements = document.querySelectorAll('.alert-trigger');
let intervalId = null;
let hasShownOnce = false;

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasShownOnce) {
            hasShownOnce = true;
            observer.disconnect();
            setTimeout(() => {
                showAlert();
                startInterval();
            }, 3000);
        }
    });
};

const observeElements = (elements) => {
    const observer = new IntersectionObserver(observerCallback);
    if (elements instanceof Element) {
        observer.observe(elements);
    } else if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
        elements.forEach(el => observer.observe(el));
    } else {
        console.error('Невалиден влез: потребен е HTML-елемент или низa од елементи.');
    }
};
observeElements(triggerElements);

// ----- Вибір випадкового імені з визначенням роду -----
function getRandomName() {
    // Вибираємо з allNames
    const randomIndex = Math.floor(Math.random() * allNames.length);
    const randomName = allNames[randomIndex];

    // Перевіряємо, чи є це ім’я в maleNames або femaleNames
    let gender = 'male'; // за замовчуванням
    if (femaleNames.includes(randomName)) {
        gender = 'female';
    } else if (maleNames.includes(randomName)) {
        gender = 'male';
    } else {
        // Якщо ви точно знаєте, що ім’я в additionalNames бувають різного роду,
        // можете тут задати довільно (або зробити 50/50 random).
        // Наприклад, випадково:
        gender = Math.random() < 0.5 ? 'male' : 'female';
    }

    return { name: randomName, gender };
}

function showAlert() {
    let nameObj, letter, location, quantity, minutesAgo;

    // jQuery-елемент social-proof
    let socialProof = $(".custom-social-proof");

    if (socialProof.is(":hidden")) {
        socialProof.stop().slideToggle("slow");

        // Випадкові значення
        nameObj = getRandomName();
        letter  = letters[Math.floor(Math.random() * letters.length)];
        location = cities[Math.floor(Math.random() * cities.length)];
        quantity = quantities[Math.floor(Math.random() * quantities.length)];
        minutesAgo = Math.floor(Math.random() * 21) + 1;

        // Визначаємо дієслово для «Купив(ла)»
        let verb = (nameObj.gender === 'female') ? 'Купила' : 'Купил';

        // Показуємо в HTML
        $("#notify-customer").html(`${nameObj.name} ${letter}. — ${location}`);
        $("#notify-verb").html(verb);
        $("#notify-quantity").html(quantity);
        $("#notify-ago").html(`пред ${minutesAgo} минути`);

    } else {
        socialProof.stop().slideToggle("slow");
    }
}

function startInterval() {
    intervalId = setInterval(showAlert, 14000);
}

// Кнопка закриття
$(".custom-close").click(function(e) {
    e.preventDefault();
    $(".custom-social-proof").stop().slideToggle("slow");
});