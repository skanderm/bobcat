# Bobcat

Voice categorization for Bob's Burgers by actor and character. 

## Description
This repo is intended for preparing media, labeling audio, and training a model to recognize actors and their characters in Bob's Burgers.

The audio labeling UI allows you to view audio/video data using multiple lenses and to multi-tag different 'tracks' of data: word-level timestamps, spectrograms, text, etc.

## Running things

### Data prep
Convert source data to various video, audio, and text formats using `utils/`.

### UI server
Run a basic http server to serve `data/` using `http-server`:

`npm install -g http-server`

`http-server data/`


Then, run the UI:

`cd ui && npm start`
