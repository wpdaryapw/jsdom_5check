let card = document.querySelector('input[name=card]'), cardPreviousCountSymbols = -1,
    cardItems = document.querySelectorAll('.card__creating')
console.log(card)
let person = document.querySelector('input[name=name]'), personCur = document.querySelector('.card-owner__creating')
console.log(person, personCur)

function numberCard(card, sep) {
    let cardN = '';
    for (let number of card) {
        if (number !== sep) {
            cardN += number
        }
    }
    // console.log(card, cells, cardN)
    return cardN
}

card.addEventListener('input', (event) => {
    event.preventDefault()
    // console.log(card.value.length)
    let switcher = true, sep = '\t'

    cardPreviousCountSymbols === -1 ? cardPreviousCountSymbols = card.value.length : card.value.length - cardPreviousCountSymbols > 0 ? switcher = true : switcher = false, cardPreviousCountSymbols = card.value.length
    let cardNumberRaw = numberCard(card.value, sep)
    console.log(cardNumberRaw.length)
    // console.log(cardPreviousCountSymbols, switcher)
    if (switcher && cardNumberRaw.length % 4 === 0 && cardNumberRaw.length < 16) {
        card.value += sep
    } else if (!switcher && (card.value.length) % 5 === 0) {
        card.value = card.value.slice(0, card.value.length - 1)
    }
    let splited = card.value.split('\t')
    while (splited.length != 4) {
        splited.push('')
    }
    // console.log(splited)
    for (let i = 0; i < splited.length; ++i) {
        cardItems[i].textContent = splited[i]
    }
    // console.log(cardItems[0])
    // console.log(cardItems)
})

person.addEventListener('input', (event) => {
    event.preventDefault()
    personCur.textContent = person.value
})

let codeForm = document.querySelector('input[name=code]'), codeCur = document.querySelector('.card-code__creating')

codeForm.addEventListener('input', (event) => {
    event.preventDefault()
    codeCur.textContent = codeForm.value
})

let validityForm = document.querySelector('input[name=validity]'),
    validityCur = document.querySelector('.card-validity__creating'), validityPreviousCount = -1

validityForm.addEventListener('input', (event) => {
    event.preventDefault()
    let switcher = true
    if (validityForm.value.length - validityPreviousCount < 0) {
        switcher = false
    }

    if (switcher && validityForm.value.length === 2) {
        validityForm.value += '/'
    }
    if (!switcher && validityForm.value.length === 3) {
        validityForm.value = validityForm.value.slice(0, validityForm.value.length - 1)
    }
    validityCur.textContent = validityForm.value
    validityPreviousCount = validityForm.value.length
})

function createCard(name, number, code, validity, paymentSystem, background) {
    return `<div class="card">
                <div class="card__wrapper">
                    <div class="card__column">
                        <div class="card__row">
                            <div class="pictures">
                                <div class="logo">
                                    <img src="./src/img/master.png" alt="logo">
                                </div>
                                <div class="chip">
                                    <img src="./src/img/chip.png" alt="logo">
                                </div>
                            </div>
                        </div>
                        <div class="card__row">
                            <div class="card-number_bloc">
                                <div class="card-number__top">
                                    номер карты
                                </div>
                                <div class="card-number">
                                    <div class="card-number__item">${number[0]}</div>
                                    <div class="card-number__item">${number[1]}</div>
                                    <div class="card-number__item">${number[2]}</div>
                                    <div class="card-number__item">${number[3]}</div>
                                </div>
                            </div>
                        </div>
                        <div class="card__row">
                            <div class="card-owner">
                                <div class="card-name">
                                    <div class="card-owner__top">
                                        Имя владельца
                                    </div>
                                    <div class="card-owner__bottom">
                                        ${name}
                                    </div>
                                </div>
                                <div class="card-code">
                                    <div class="card-owner__top">
                                        Код
                                    </div>
                                    <div class="card-owner__bottom">
                                        ${code}
                                    </div>
                                </div>
                                <div class="card-date">
                                    <div class="card-owner__top">
                                        Срок действия
                                    </div>
                                    <div class="card-owner__bottom">
                                        ${validity}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}

let btn = document.querySelector('.btn'), cards = document.querySelector('.cards')
btn.addEventListener('click', (event) => {
    event.preventDefault()

    let formElements = document.forms[0].elements
    // console.log(formElements.name.value)
    let newCardInfo = [formElements.name.value, formElements.card.value.split('\t'), formElements.code.value, formElements.validity.value]
    let newCardLayout = createCard(...newCardInfo)
    // console.log(newCardLayout)
    console.log(formElements.name.value, formElements.card.value.length, formElements.code.value.length, formElements.validity.value.length)
    console.log(newCardInfo[0], newCardInfo[1].length === 19, newCardInfo[2].length === 3, newCardInfo[3].length === 5)
    if (newCardInfo[0] && formElements.card.value.length === 19 && newCardInfo[2].length === 3 && newCardInfo[3].length === 5) {
        cards.innerHTML += newCardLayout
    }
    formElements.name.value = '', formElements.card.value = '', formElements.code.value = '', formElements.validity.value = ''
})