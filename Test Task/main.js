function changeLanguage(lang) {
    var langText = {
        'en': {
            'title': 'Quote Generator',
            'category': 'Category',
            'motivational': 'Motivational',
            'philosophical': 'Philosophical',
            'humorous': 'Humorous',
            'generate': 'Generate Quote'
        },
        'uk': {
            'title': 'Генератор цитат',
            'category': 'Категорія',
            'motivational': 'Мотиваційні',
            'philosophical': 'Філософські',
            'humorous': 'Гумористичні',
            'generate': 'Згенерувати цитату'
        }
    };

    var currentLang = langText[lang];


    document.title = currentLang.title;

    document.getElementById('category').innerText = currentLang.category;
    document.getElementById('motivational').innerText = currentLang.motivational;
    document.getElementById('philosophical').innerText = currentLang.philosophical;
    document.getElementById('humorous').innerText = currentLang.humorous;
    document.getElementById('generate').innerText = currentLang.generate;
}
