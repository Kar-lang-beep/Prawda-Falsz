const postacie = {
    newton: {
        imie: 'Isaac Newton',
        stwierdzenia: [
            { tekst: 'Odkrył prawo grawitacji po obserwacji spadającego jabłka.', prawda: true },
            { tekst: 'Był greckim filozofem w starożytnej Sparcie.', prawda: false },
            { tekst: 'Napisał dzieło \"Philosophiæ Naturalis Principia Mathematica\".', prawda: true },
            { tekst: 'Ukończył studia medyczne w Paryżu.', prawda: false },
            { tekst: 'Prowadził eksperymenty z optyką i rozszczepieniem światła.', prawda: true }
        ]
    },
    kleopatra: {
        imie: 'Kleopatra',
        stwierdzenia: [
            { tekst: 'Była ostatnią królową hellenistycznego Egiptu.', prawda: true },
            { tekst: 'Żyła w tym samym czasie co Juliusz Cezar.', prawda: true },
            { tekst: 'Była znaną wojowniczką na igrzyskach olimpijskich.', prawda: false },
            { tekst: 'Jej ojczyzną była starożytna Grecja.', prawda: false },
            { tekst: 'Została pochowana w Dolinie Królów obok Tutanchamona.', prawda: false }
        ]
    }
};

const szufladki = document.querySelectorAll('.drawer');
const karta = document.getElementById('karta');
const imieNazwisko = document.getElementById('imie-nazwisko');
const stwierdzeniaList = document.getElementById('stwierdzenia');
const pokazBtn = document.getElementById('pokaz-odpowiedzi');

szufladki.forEach(btn => {
    btn.addEventListener('click', () => {
        const postacKey = btn.getAttribute('data-postac');
        wylosujPostac(postacKey);
    });
});

function wylosujPostac(key) {
    const postac = postacie[key];
    imieNazwisko.textContent = postac.imie;

    // losowa kolejność stwierdzeń
    const losoweStwierdzenia = [...postac.stwierdzenia]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    stwierdzeniaList.innerHTML = '';
    losoweStwierdzenia.forEach((stwierdzenie, index) => {
        const li = document.createElement('li');
        li.textContent = stwierdzenie.tekst;
        li.dataset.prawda = stwierdzenie.prawda;
        stwierdzeniaList.appendChild(li);
    });

    karta.classList.remove('hidden');
    pokazBtn.classList.remove('hidden');
    pokazBtn.onclick = pokazOdpowiedzi;
}

function pokazOdpowiedzi() {
    const items = stwierdzeniaList.querySelectorAll('li');
    items.forEach(li => {
        if (li.dataset.prawda === 'true') {
            li.classList.add('prawda');
            li.textContent += ' ✅ PRAWDA';
        } else {
            li.classList.add('falsz');
            li.textContent += ' ❌ FAŁSZ';
        }
    });
    pokazBtn.classList.add('hidden');
}

