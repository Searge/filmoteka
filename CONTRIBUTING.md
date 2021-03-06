# How to contribute

1. Всі зміни ми обговорюємо в нашому каналі на Діскорд
2. Якщо ви хочете змінити щось в коді вашого колеги, просто зверніться до нього в особисто.
3. Наразі ми використовуємо Трелло для відстежування прогресу, але краще користуватися вбудованою дошкою [Проєктів](https://github.com/Searge/filmoteka/projects/1)

## Тестування та надсилання змін

1. Будь які зміни коду тестуйте локально запустивни `npm run dev`.
2. Протестованні зміни можна додавати або через GitHub Desktop, або через вбудованного клієнта VSCode, але комітити **обов'язково** через командний рядок:
  - `git commit -m "Ваш коментар". В нас перед комітом йде сценарій який проходить Пріттієром по вашим змінам.
3. Кожен `pull request` проходить обов'язкове тестування [в Codacy](https://app.codacy.com/gh/Searge/filmoteka/dashboard), яцщо ваш реквест не проходить тести, то варто зробити відповідні зміни і запушити у свою іглку ще раз.

## Стиль коду

1. Впевніться, що SASS файли використовують змінні SASS, а не CSS.
2. Усі класи, де це треба, вкладенні у батьківський елемент.
3. Для адаптивного дизайну ми використовуємо міксіни.
4. В кожному файлі з відповідним розширенням тільки код цієї мови.
5. Функції, класи мають мати перед оголошенням короткий опис в форматі JSDoc
