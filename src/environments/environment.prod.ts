
const cdn = {
  cloudinary: 'https://res.cloudinary.com/electreefrying/raw/upload',
  dropbox: 'https://dl.dropboxusercontent.com/s'
};

export const environment = {
  production: false,
  data: [
    `${cdn.cloudinary}/v1590214556/pokedex-little/pokemon.json`,
    `${cdn.cloudinary}/v1589697366/pokedex-little/moves.json`,
    `${cdn.cloudinary}/v1590310570/pokedex-little/others.json`
  ],
  dropbox_data: [
    `${cdn.dropbox}/dzi90dcf6dvkqo7/api.json`,
    `${cdn.dropbox}/ienyhx8owprhprq/moves.json`
  ],
  offline_data: [
    'assets/pokemon.json',
    'assets/moves.json',
    'assets/others.json',
  ],
  offline_dropbox_data: [
    'assets/api/api.json',
    'assets/api/moves.json'
  ]
};
