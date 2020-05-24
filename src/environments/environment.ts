// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const cdn = {
  cloudinary: 'https://res.cloudinary.com/electreefrying/raw/upload',
  dropbox: 'https://dl.dropboxusercontent.com/s'
};

export const environment = {
  production: false,
  data: [
    `${cdn.cloudinary}/v1590214556/pokedex-little/pokemon.json`,
    `${cdn.cloudinary}/v1589697366/pokedex-little/moves.json`,
    `${cdn.cloudinary}/v1590325946/pokedex-little/others.json`
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
