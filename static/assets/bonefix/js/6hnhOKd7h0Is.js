$(document).ready(function() {
    // ====================================LIVE COMMENTS

    let commentIds = JSON.parse(localStorage.getItem('commentIds') || '[]');

    let randomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const addClass = (item, className) => (item.classList.add(className));
    const removeClass = (item, className) => (item.classList.remove(className));

    // Проверуваме дали одговорот е веќе зачуван во локалната меморија
    $('.answer-wrap').each(function () {
        const answerId = this.getAttribute('data-id');
        if (commentIds.includes(answerId)) {
            addClass(this, 'already-typed');
        }
    });

    // Појава на „typing“ ефект за коментарите кога ќе дојдат во видното поле
    $('.answer-wrap:not(.typing, .just-typed, .already-typed)').one('inview', (event, isInView) => {
        const itemWrap = event.target.closest('.siblings-wrap');
        const item = event.target;
        const answerId = item.getAttribute('data-id');
        if (isInView && !commentIds.includes(answerId)) {
            commentIds.push(answerId);
            localStorage.setItem('commentIds', JSON.stringify(commentIds));
            // Определуваме случајни временски периоди
            const firstTicker = randomInt(1200, 4700);
            const secondTicker = randomInt(3600, 9500);
            // По мало задоцнување -> „typing“ класа
            setTimeout(() => {
                addClass(item, 'typing');
                removeClass(itemWrap, 'line-hider');
            }, firstTicker);
            // По уште едно задоцнување -> „just-typed“ класа, отстрануваме „typing“
            setTimeout(() => {
                addClass(item, 'just-typed');
                removeClass(item, 'typing');
            }, firstTicker + secondTicker);
        }
    });


    // ====================================LIVE-EMOJI

    // Чуваме колку лајкови се додадени во локална меморија
    let emojiCountersData = JSON.parse(localStorage.getItem('emojiCounters') || '[]');

    // Помошна функција за додавање “active” класа врз одбраното емотиконче
    const setStorageEmoji = (item, name) => {
        const itemSelector = item.querySelector(name).classList;
        if (!itemSelector.contains('active')) {
            itemSelector.add('active');
        }
    }

    // Почетно поставување на бројот на лајкови и активни емотиконки според локална меморија
    document.querySelectorAll('.emoji-box.active').forEach(item => {
        emojiCountersData.forEach(storageItem => {
            const likesIdValue = item.getAttribute('emoji-id');

            if (likesIdValue === storageItem.id) {
                item.querySelector('.emoji-box__like-count').innerHTML = storageItem.count;
                // Ако се помалку од 5 лајкови, става само like
                // Ако се 5 или повеќе, става like + heart + wow
                if (storageItem.count < 5) {
                    setStorageEmoji(item, '.like-ico');
                } else {
                    setStorageEmoji(item, '.like-ico');
                    setStorageEmoji(item, '.heart-ico');
                    setStorageEmoji(item, '.wow-ico');
                }
            }
        })
    });

    // Функција за зголемување на бројот на лајкови
    const emojiCounterInc = (event, counterValue) => {
        return event.target.querySelector('.emoji-box__like-count').innerHTML = parseInt(counterValue + 1);
    }

    // Функција за активирање на одбраното емотиконче
    const targetEmoji = (event, name) => {
        const emojiSelector = event.target.querySelector(name).classList;
        if (emojiSelector.contains('active')) {
            // Ако веќе е „active“, го тргаме накусо и повторно го враќаме (мала анимација)
            emojiSelector.remove('active');
            setTimeout(() => {
                emojiSelector.add('active');
            }, 100);
        } else {
            emojiSelector.add('active');
        }
    }

    // Функција која комбинира додавање емотикон + инкрементирање лајкови + зачувување во меморија
    const emojiAdd = (event, name, counterValue, emojiId) => {
        targetEmoji(event, name);
        emojiCounterInc(event, counterValue);

        const comment = {
            id: emojiId,
            count: counterValue
        };

        const found = emojiCountersData.some(function (el) {
            return el.id === emojiId;
        });

        if (found) {
            emojiCountersData.forEach(function(item){
                if (item.id === emojiId) {
                    item.count = counterValue;
                    localStorage.setItem('emojiCounters', JSON.stringify(emojiCountersData));
                }
            })
        } else {
            emojiCountersData.push(comment);
            localStorage.setItem('emojiCounters', JSON.stringify(emojiCountersData));
        }
    }

    // ticker -> флаг за да не се повторуваат анимациите премногу често
    let ticker = true;
    const tickerReset = () => {
        setTimeout(() => {
            ticker = true;
        }, 10000);
    };

    // Адаптација на времето и текстот на коментарите (од германски кон македонски)
    const transformMacedonianTime = (baseElement) => {
        if (!baseElement) return;
        const timeItem = baseElement.querySelector('.comment__ui-item');
        if (!timeItem) return;

        // Ако има "Gerade eben", го менуваме во "Токму сега"
        if (timeItem.innerText.includes('Gerade eben') || timeItem.innerText.includes('Grad eben')) {
            timeItem.innerText = 'Токму сега';
        }

        // Ако содржи "Vor" и "Stunde" (или Stunde+), ги менуваме
        if (timeItem.innerText.includes('Vor') && timeItem.innerText.includes('Stunde')) {
            timeItem.innerText = timeItem.innerText
                .replace('Vor', 'пред')
                .replace('Stunden', 'часа')
                .replace('Stunde', 'час')
                .trim();
        }

        // Ако има „Gefällt mir“ -> заменуваме со „Ми се допаѓа“
        timeItem.parentNode.querySelectorAll('.comment__ui-item').forEach(uiItem => {
            if (uiItem.innerText.includes('Gefällt mir')) {
                uiItem.innerText = 'Ми се допаѓа';
            }
            if (uiItem.innerText.includes('Antworten')) {
                uiItem.innerText = 'Одговори';
            }
        });
    };

    // При појава на емотикон дивот во видното поле, автоматски се додава еден лајк (like/heart/wow)
    $('.emoji-box.active').on('inview', (event, isInView) => {
        const emojiId = event.target.getAttribute('emoji-id');
        let counterValue = parseInt(event.target.querySelector('.emoji-box__like-count').innerHTML);
        if (!counterValue) {
            counterValue = 0;
        }
        if (isInView && ticker) {
            const randomTicker = randomInt(550, 2555);
            let randomEmoji = randomInt(1, 3);
            setTimeout(() => {
                event.target.classList.contains('hide') ? event.target.classList.remove('hide') : '';
                switch (randomEmoji) {
                    case 1:
                        emojiAdd(event, '.like-ico', counterValue, emojiId);
                        break;
                    case 2:
                        emojiAdd(event, '.heart-ico', counterValue, emojiId);
                        break;
                    case 3:
                        emojiAdd(event, '.wow-ico', counterValue, emojiId);
                        break;
                }
                ticker = false;
                tickerReset();
                // Применуваме македонска адаптација на времето/текстот
                transformMacedonianTime(event.target.closest('.comment__wrap'));
            }, randomTicker);
        }
    });


    // ====================================COMMENTS TYPE ABILITY

    let commentsData = JSON.parse(localStorage.getItem('commentsData') || '[]');

    const displayComment = (name, text) => {
        const commentsWrapper = document.querySelector('.comments-wrap');
        const createCommentElement = document.querySelector('.comment-add-block');

        const commentLayout = document.querySelector('.comment-layout').cloneNode(true);
        const emojiBox = commentLayout.querySelector(".emoji-box");
        commentLayout.classList.add("answer-wrap", "just-typed", "comment-layout");
        commentLayout.querySelector(".layout-user-pic").setAttribute("src", "img/comments/profile.jpg");

        const commentLikes = commentLayout.querySelector(".layout-comment-likes");
        const commentTime = commentLayout.querySelector(".layout-comment-time");
        if (commentLikes) commentLikes.innerText = '';
        if (commentTime) commentTime.innerText = 'Токму сега';

        commentLayout.querySelector(".user-name").innerText = name;
        commentLayout.querySelector(".typed-text").innerText = text;
        emojiBox.style.display = "none";

        commentsWrapper.insertBefore(commentLayout, createCommentElement.nextSibling);

        // Применуваме македонска адаптација
        transformMacedonianTime(commentLayout);
    };

    // Вчитување коментари од локална меморија
    for (const comment of commentsData) {
        displayComment(comment.name, comment.text);
    }

    // Функција за објава на нов коментар
    const postComment = () => {
        const comment = {
            name: document.querySelector('[name="user-name"]').value,
            text: document.querySelector('[name="user-comment"]').value
        };

        if (comment.name.length > 2 && comment.text.length > 2) {
            displayComment(comment.name, comment.text);
            commentsData.push(comment);
            localStorage.setItem('commentsData', JSON.stringify(commentsData));
            document.querySelector('[name="user-name"]').value = "";
            document.querySelector('[name="user-comment"]').value = "";
        }
    }

    // Клик на копчето „Додади коментар“
    $('#add-comment-btn').click(() => {
        postComment();
    });

    // При притискање ENTER во полето за текст
    document.querySelector('[name="user-comment"]').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            if(event.shiftKey) {
                // Ова овозможува „SHIFT+ENTER“ да прави нов ред, а не да го прати коментарот
            } else {
                event.preventDefault();
                postComment();
            }
        }
    });
});


// Модално прозорче за сликите
const modalImage = document.querySelector('.modal__cropped-image');
const modalWrap = document.querySelector('.modal-wrap');
const modalContent = document.querySelector('.modal');
const cropImages = document.querySelectorAll('.comment__img');
const closeButton = document.querySelector('.modal__close');

cropImages.forEach(image => {
    image.addEventListener('click',(event)=> {
        const imageSrc = image.getAttribute('src');
        modalWrap.classList.add('active');
        modalImage.setAttribute('src', imageSrc);
        modalWrap.addEventListener('click', (event) => {
            if (event.target === closeButton || (event.target === modalWrap && event.target !== modalContent)) {
                modalWrap.classList.remove('active');
            }
        })
    })
});

// Автоматско прилагодување на висината на textarea
$("textarea").on("input", function () {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
});