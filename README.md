
# Use Your Words

Quiz based platform for non-native speakers seeking to extend their vocabulary and help to memorize advanced SAT words.
The project consisted of a admin panel and quiz web application. 

Administrator is provided with functionality to: 
- save new words along with all nesessary information (part of speech, definitions, examples, synonyms, antonyms) manually;
- autofill the information about the word fetched from vocabulary APIs;
- after words are saved, effortlessly generate 11 types of quizzes 
- set the quiz live

Quizz app is a duilingo - like platform, where:
- user's progress is tracked and accumulated into scores;
- history is saved and available for review;
- focus on steady growth by using evidence based learning techniques inspired by Leitner system and my own system of programmatically graduated interval training.

API to get words information used: 
- Linguatools English Collocations
- Merriam-Webster thesaurus
- Free Dictionary API

## Authors

- [@ekateryna-rodina](https://github.com/ekateryna-rodina)


## API Reference

#### Get information about the word assembled from different APIs 

```http
  GET /api/wordsApi
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `word` | `string` | **Required**. Word you want to fetch information for |

#### Get challenges

```http
  GET /api/challenges?wordIds={wordIds}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `wordIds`      | `string` | **Required**. Words to include in challenges  |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

RAPID_API_KEY=
MERRIAM_WEBSTER_THESAURUS=



## Tech Stack

**Client:** React, Redux Toolkit, TailwindCSS, Firebase Auth

**Server:** Node, Express, Sequelize, Postgresql, Firebase Admin, Cloudinary (for media storage)

**APIs:** Linguatools English Collocations, Merriam-Webster thesaurus,
Free Dictionary API

## Run Locally

Clone the project

```bash
  git clone https://github.com/ekateryna-rodina/use-your-words-app.git uyw
```

Go to the server project directory

```bash
  cd ./uyw/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Go to the client. project directory

```bash
  cd ..
  cd ./uyw/admin
```

Install dependencies

```bash
  npm install
```

Start the client app

```bash
  npm run start
```



## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[MIT](https://choosealicense.com/licenses/mit/)

