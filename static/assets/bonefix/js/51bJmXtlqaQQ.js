// Преправени коментари на македонски јазик со природни изрази и малку сленг

const commentsData = [
    {
        "avatar": "img/w1.jpg",
        "name": "Елена Стојанова",
        "stars": true,
        "text": "Леле, фала многу за информациите! Веднаш ќе му порачам Nautubone Gel на сопругот, бедниот едвај оди веќе година дена со болни колена.",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w2.jpg",
        "name": "Ана Петрова",
        "stars": true,
        "text": "Ова навистина делува! Баш пред некој ден почнав со користење. Случајно налетав на оваа страница и го зедов гелот по препорака. Иако е рано, веќе ми се чини полесно се движам.",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/m2.jpg",
        "name": "Леон Крстев",
        "stars": true,
        "text": "Фала за корисната објава! Веднаш го нарачав гелот и се слушнав со поддршката, велат дека брзо им се распродава. Добро што стигнав на време!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/m3.jpg",
        "name": "Илија Стојчев",
        "stars": true,
        "text": "Со години мака мачам со болки во зглобовите и ми е преку глава да пијам апчиња. Ноќе не можам да спијам, ниту да се грижам за внуците ко што сакам. Сега озбилно размислувам за Nautubone Gel. Ако ѝ помогнал на Катерина, се надевам ќе помогне и кај мене!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/m4.jpg",
        "name": "Оливер Наумов",
        "stars": false,
        "text": "Јас исто имав слични маки со години. Ме фаќаше паника, никако да се смират болките. Мама ми го препорача Nautubone Gel и стварно е топ!",
        "image": "img/1.4.jpg",
        "answers": []
    },
    {
        "avatar": "img/m5.jpg",
        "name": "Мартин Тошев",
        "stars": false,
        "text": "Вау, морам да го пробам ова чудо. Ми се смачи веќе. Работам во фабрика, па болките во грбот уште повеќе се влошија. Се мислев и на операција, али се плашам многу. :(",
        "image": null,
        "answers": [
            {
                "avatar": "img/m6.jpg",
                "name": "Јаков Илиев",
                "stars": false,
                "text": "Не брзај со операција, брат! И јас бев пред таков чекор. Па почнав со Nautubone Gel и болките ми исчезнаа, ко никогаш да ги немало.",
                "image": null
            }
        ]
    },
    {
        "avatar": "img/w3.jpg",
        "name": "Ела Трајкоска",
        "stars": true,
        "text": "Како да ни земат пари, така многу доктори едвај чекаат да ни препишат секој месец инјекции или чудни лекови. И мене ми нудеа некој препарат, а не ни проверија со што веќе се лекувам. Добро е што Nautubone Gel се појави, па можеме нешто поефикасно да пробаме.",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w4.jpg",
        "name": "Миа Тодорова",
        "stars": false,
        "text": "Овој гел е како спас, особено кога ќе поминеш некоја година и не сфаќаш колку те истоштуваат постојаните болки.",
        "image": "img/1.1.jpg",
        "answers": []
    },
    {
        "avatar": "img/m7.jpg",
        "name": "Ноа Арсов",
        "stars": false,
        "text": "Имам дегенеративни промени на 'рбетот, а Nautubone Gel го користам одамна. Речиси и да немам влошувања оттогаш. Да не беше гелот, веројатно ќе завршев во количка. Докторите се чудеа, ама еве гледаме дека делува!",
        "image": null,
        "answers": [
            {
                "avatar": "img/w5.jpg",
                "name": "Зорица Милошевска",
                "stars": false,
                "text": "Фала за споделувањето. Навистина сте храбар човек. Баш ќе го нарачам гелот по ваша препорака.",
                "image": null
            }
        ]
    },
    {
        "avatar": "img/w6.jpg",
        "name": "Гордана Алексовска",
        "stars": false,
        "text": "Ова е навистина сериозна тема за сите, ама ретко кој сака да збори за болки и маки. Брат ми патеше со години, додека целосно не заглави. Подобро навреме да се реагира.",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w7.jpg",
        "name": "Хана Христова",
        "stars": false,
        "text": "Мојот ревматолог ми го препиша Nautubone Gel, ама тек почнав. Ќе видам како ќе биде понатаму.",
        "image": "img/1.3.jpg",
        "answers": []
    },
    {
        "avatar": "img/m9.jpg",
        "name": "Бене Дамјанов",
        "stars": true,
        "text": "На 50 години ми најдоа артритис во колената. Прво мислев дека е само замор, ама докторот веднаш ја напомена операцијата. Не сакав да слушнам за тоа, па решив да барам друга опција! Сега нарачав и чекам со нетрпение!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w8.jpg",
        "name": "Емили Стојковска",
        "stars": false,
        "text": "Некој пробал ли да го порача Nautubone Gel од официјалната страница? Наводно брзо се распродава. Дали е тоа нормално?",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/m11.jpg",
        "name": "Александар Пеев",
        "stars": false,
        "text": "За жал, многу луѓе ко ќе се разболат, стварно немаат среќа. Имам 59 години, а веќе добар дел од моите пријатели ни ги нема. Оние што се живи, се постојано во болки. Навистина жално.",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w10.jpg",
        "name": "Лина Доревска",
        "stars": false,
        "text": "Прочитав во еден напис дека по три дена се чувствува значително подобрување, па ќе видам.",
        "image": null,
        "answers": [
            {
                "avatar": "img/m12.jpg",
                "name": "Хенрик Вишне",
                "stars": false,
                "text": "Како иде доставава? Дали стигнува брзо и е исто како на сликите?",
                "image": null
            },
            {
                "avatar": "img/w10.jpg",
                "name": "Лина Доревска",
                "stars": false,
                "text": "Кај нас пакувањето стигна дури и порано од очекуваното. Сѐ беше убаво спакувано, без оштетувања.",
                "image": null
            }
        ]
    },
    {
        "avatar": "img/m13.jpg",
        "name": "Јон Пасков",
        "stars": true,
        "text": "Точно е, и јас го купив гелот. Треба да си истраен со целиот третман, и ќе се чувствуваш ко нов. Конечно да се решам од долгогодишни маки! Изгубеното време нема да се врати, ама барем живот без болки ќе продоложам!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/Anna-Schulz.jpg",
        "name": "Ана Шулц (во Скопје)",
        "stars": true,
        "text": "Јас му го порачав на мајка ми. Сѐ живо испробавме, одевме кај разни специјалисти, ама без успех. Последниве шест месеци едвај стануваше. Сега, по неколку недели со Nautubone Gel, заедно шетаме по парк! Навистина прекрасно!",
        "image": "img/1.2.jpg",
        "answers": []
    },
    {
        "avatar": "img/m14.jpg",
        "name": "Јаков Принц",
        "stars": false,
        "text": "Одлично! 50% попуст е вистинска можност! Фала ви многу и голем поздрав! :)",
        "image": null,
        "answers": [
            {
                "avatar": "img/w11.jpg",
                "name": "Рута Стеванова",
                "stars": false,
                "text": "Звучи супер! И јас би сакала да го купам со попустот. Како да стигнам до таа понуда?",
                "image": null
            },
            {
                "avatar": "img/m14.jpg",
                "name": "Јаков Принц",
                "stars": false,
                "text": "Туку под текстот има формулар за нарачка. Кликни на знамињата и ќе си го добиеш попустот!",
                "image": null
            },
            {
                "avatar": "img/w11.jpg",
                "name": "Рута Стеванова",
                "stars": false,
                "text": "Фала ти! :)",
                "image": null
            }
        ]
    },
    {
        "avatar": "img/m15.jpg",
        "name": "Лука Михаилов",
        "stars": true,
        "text": "Јас го испробав Nautubone Gel и сум презадоволен. Седум години се борев со артритис, мислев дека засекогаш ќе зависам од апчиња. Сега сум без болка! Секому би му препорачал да проба.",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/m16.jpg",
        "name": "Конрад Блажев",
        "stars": false,
        "text": "Му го порачав на дедо ми, рече дека многу му помогна. Човекот има години, јас се грижам за него, па ми е мило што конечно му олесна. Пакетот стигна брзо и без маани.",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/m17.jpg",
        "name": "Карло Кралев",
        "stars": false,
        "text": "Имам 63 години, а уште од 53-та со колена се мачам. Едвај издржував. Пред три месеци, еден стар пријател ме убеди да пробам Nautubone Gel и сега трчкам ко млада срна! Неверојатен производ!",
        "image": "img/1.11.jpg",
        "answers": []
    },
    {
        "avatar": "img/m18.jpg",
        "name": "Харалд Лазаров",
        "stars": false,
        "text": "Голем ефект има, ама мора да се користи според упатството. Најдобро е да земеш две пакувања и да нанесуваш сабајле и навечер, да се постигне најдобар резултат.",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/m19.jpg",
        "name": "Даниел Мојсов",
        "stars": false,
        "text": "Се јавив кај нив, и ми рекоа дека ќе ми пристигне за околу 5 дена по пошта. Се надевам дека сѐ ќе биде како што треба!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/m21.jpg",
        "name": "Оскар Бектов",
        "stars": false,
        "text": "Гелот е бомба! Лани син ми ми донесе од Сингапур. Хернијата на рбетот ми се повлече и не се врати! Никогаш не би очекувал такво чудо. Сега се осеќам ко да имам 20 години. Препорачувам на сите!",
        "image": "img/1.10.jpg",
        "answers": []
    },
    {
        "avatar": "img/m22.jpg",
        "name": "Ксавер Тошев",
        "stars": false,
        "text": "И јас имав слично искуство со Nautubone Gel. Порано ми ставаа инјекции, ама од ко го користам гелот, како да си добив нов живот. Две месеци сум без болка!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w12.jpg",
        "name": "Ирис Ачкова",
        "stars": false,
        "text": "Овој гел е врв! Не само што ја смирува болката, туку и делува против воспаление, и тоа доста брзо. Одличен е и за итни случаи, и за подолга употреба.",
        "image": "img/1.8.jpg",
        "answers": []
    },
    {
        "avatar": "img/m23.jpg",
        "name": "Исак Петров",
        "stars": false,
        "text": "Бев кај помлад доктор кој со ентузијазам ми го препорача Nautubone Gel. Кај мене делуваше одма. Болката ми се изгуби, ама го користев се’ до крај, како што пишува. По три недели немам никакви проблеми. Супер се чувствувам!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/m24.jpg",
        "name": "Левин Валендер",
        "stars": false,
        "text": "Комшијата ми има 72 години и постојано се жалеше на грбот. Сега гледам активен е, ко нов човек. Ми кажа дека син му му го набавил Nautubone Gel. Од тогаш е сосема друга приказна!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w13.jpg",
        "name": "Скарлет Роџер",
        "stars": false,
        "text": "Вчера му го купив на мајка ми, се пожали на болки во зглобови. Се надевам дека ќе ѝ помогне, не ми се оди по болници и бескрајни прегледи.",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w14.jpg",
        "name": "Зара Дичева",
        "stars": false,
        "text": "Едноставно неверојатен производ! Дефинитивно пробајте – не ќе зажалите!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w15.jpg",
        "name": "Мадлена Василева",
        "stars": false,
        "text": "Првпат слушнав за Nautubone Gel на еден форум за болки во зглобови. Многумина го фалеа, па решив да го купам. Го користам трети ден, и веќе болката ми е помала, а крцкањето во коленото речиси исчезна. Сѐ уште има малку оток, ама многу подобро од порано. Ќе ве известам како иде – засега сум презадоволна!",
        "image": null,
        "answers": []
    },
    {
        "avatar": "img/w16.jpg",
        "name": "Матилда Грујовска",
        "stars": false,
        "text": "Фала ви! Јас и сопругот веднаш си го нарачавме. Прашав дали ќе се појави во аптека, рекоа не веруваат наскоро. Затоа, супер шанса да го пробаме!",
        "image": null,
        "answers": []
    }
];

// Функција за локализација на времето на коментар (германскиот израз го менуваме во македонски)
const generateTimeAgo = (index) => {
    if (index === 0) return 'Токму сега'; // Првиот коментар
    const timeGroup = Math.floor((index - 1) / 4);
    return `пред ${timeGroup + 1} час${timeGroup + 1 > 1 ? 'а' : ''}`;
};

// Иницијално вредност за лајкови
let previousLikeCount = 3;

// Функција за генерирање HTML-контент
const generateCommentHTML = (comment, index) => {
    const likeCount = previousLikeCount + Math.floor(Math.random() * 3) + 1;
    previousLikeCount = likeCount;

    // Времето за коментар
    const timeAgo = generateTimeAgo(index);
    return `
    <div class="comment-wrap ${comment.answers.length ? `answer-inc siblings-wrap` : ''}">
      <div class="comment">
        <div class="comment__author-pic">
          <img alt="" src="${comment.avatar}">
        </div>
        <div class="comment__wrap">
          <div class="comment__author-name">
            ${comment.name}
            ${comment.stars ?
        `
              <div class="comment__rating">
                <div class="stars">
                  <img alt="" class="stars__img" src="img/comments/stars.svg">
                  Одлично!
                </div>
              </div>
              `
        : ''
    }
          </div>
          <div class="comment__body ${comment.image ? `comment-with-image` : ''}">
            <div class="comment__text">
              ${
        comment.image
            ? `<div class="comment__img-wrap">
                      <img alt="" class="comment__img" src="${comment.image}">
                      <img alt="" class="crop-img" src="img/comments/search.png">
                    </div>
                    <p class="comment__inner-text">${comment.text}</p>`
            : comment.text
    }
            </div>
          </div>
          <div class="comment__footer">
            <div class="comment__ui">
              <span class="comment__ui-item">${timeAgo}</span>
              <span class="comment__ui-item">Ми се допаѓа</span>
              <span class="comment__ui-item">Одговори</span>
            </div>
            <div class="emoji-box">
              <div class="emoji-box__emoji-wrap">
                <div class="emoji-box__ico like-ico active">
                  <img alt="" src="img/comments/emoji-like.png">
                </div>
                <div class="emoji-box__ico heart-ico active">
                  <img alt="" src="img/comments/emoji-heart.png">
                </div>
                <div class="emoji-box__ico wow-ico active">
                  <img alt="" src="img/comments/emoji-wow.png">
                </div>
              </div>
              <div class="emoji-box__like-count">${likeCount}</div>
            </div>
          </div>
        </div>
      </div>
      ${
        comment.answers && comment.answers.length
            ? comment.answers.map((answer, answerIndex) => {
                const answerLikeCount = likeCount + answerIndex + 1;
                return `
        <div class="comment comment--answer">
          <div class="comment__author-pic">
            <img alt="" src="${answer.avatar}">
          </div>
          <div class="comment__wrap">
            <div class="comment__author-name">
              ${answer.name}
              ${answer.stars ?
                    `
                <div class="comment__rating">
                  <div class="stars">
                    <img alt="" class="stars__img" src="img/comments/stars.svg">
                    Одлично!
                  </div>
                </div>
                `
                    : ''
                }
            </div>
            ${
                    answer.image ? `
              <div class="comment__body comment-with-image">
                <div class="comment__text">
                  <div class="comment__img-wrap">
                    <img alt="" class="comment__img" src="${answer.image}">
                    <img alt="" class="crop-img" src="img/comments/search.png">
                  </div>
                  <p class="comment__inner-text">${answer.text}</p>
                </div>
              </div>
              ` : `
              <div class="comment__body">
                <div class="comment__text">
                  ${answer.text}
                </div>
              </div>
              `
                }
            <div class="comment__footer">
              <div class="comment__ui">
                <span class="comment__ui-item">${timeAgo}</span>
                <span class="comment__ui-item">Ми се допаѓа</span>
                <span class="comment__ui-item">Одговори</span>
              </div>
              <div class="emoji-box">
                <div class="emoji-box__emoji-wrap">
                  <div class="emoji-box__ico like-ico active">
                    <img alt="" src="img/comments/emoji-like.png">
                  </div>
                  <div class="emoji-box__ico heart-ico active">
                    <img alt="" src="img/comments/emoji-heart.png">
                  </div>
                  <div class="emoji-box__ico wow-ico active">
                    <img alt="" src="img/comments/emoji-wow.png">
                  </div>
                </div>
                <div class="emoji-box__like-count">${answerLikeCount}</div>
              </div>
            </div>
          </div>
        </div>
              `;
            }).join('')
            : ''
    }
    </div>
  `;
};

// Генерирање HTML за сите коментари
const commentsHTML = commentsData.map(generateCommentHTML).join('');

// Вметнување на блокот со коментари во документот (под полињата за внес)
document.querySelector('.comment-add-block').insertAdjacentHTML("afterend", commentsHTML);

// Пример за дополнителни манипулации со DOM-елементи (според вашиот код):
const liveComment = document.querySelector('.comment-wrap');
liveComment.querySelector('.comment').classList.add('answer-wrap');
liveComment.querySelector('.comment__footer').classList.add('additional-block');
liveComment.querySelector('.emoji-box').classList.add('hide');
liveComment.querySelector('.emoji-box').classList.add('active');
liveComment.querySelector('.emoji-box').setAttribute('emoji-id', 2);
liveComment.querySelector('.emoji-box__like-count').innerText = '0';
liveComment.querySelectorAll('.emoji-box__ico').forEach(element => element.classList.remove('active'));

liveComment.querySelector('.comment').setAttribute('data-id', 1);
liveComment.querySelector('.comment__body').insertAdjacentHTML('afterbegin', `
  <div class="comment__text typing-block">
    пишува коментар
    <span class="appear">.</span>
    <span class="appear">.</span>
    <span class="appear">.</span>
  </div>
`);

liveComment.querySelectorAll('.comment__text')[0].classList.add('typing-block');
liveComment.querySelectorAll('.comment__text')[1].classList.add('typed-text');

const commentLayout = document.querySelectorAll(
    '.comment-wrap:not(:has(> .comment.answer-wrap)):not(.answer-inc):not(:has(.comment-with-image)):not(:has(.answer-wrap)):not(:has(.stars))'
)[0];

commentLayout.classList.add('comment-layout');
commentLayout.querySelector('.comment__author-pic img').classList.add('layout-user-pic');
commentLayout.querySelector('.comment__author-name').classList.add('user-name');
commentLayout.querySelector('.comment__text').classList.add('typed-text');
commentLayout.querySelector('.comment__ui-item').classList.add('layout-comment-time');

const allComments = document.querySelectorAll('.comment-wrap');
const emojiDetails = [
    { elementIndex: 1, emojiId: '2' },
    { elementIndex: 2, emojiId: '1' },
    { elementIndex: 3, emojiId: '3' }
];

emojiDetails.forEach(({elementIndex, emojiId}) => {
    const emojiBox = allComments[elementIndex]?.querySelector('.emoji-box');
    if (emojiBox) {
        emojiBox.setAttribute('emoji-id', emojiId);
        emojiBox.classList.add('active');
    }
});