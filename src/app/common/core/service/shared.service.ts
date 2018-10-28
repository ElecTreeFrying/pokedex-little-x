import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  region = [ 'National Pokédex', 'Kanto Region', 'Jhoto Region', 'Hoenn Region', 'Sinnoh Region', 'Unova Region', 'Kalos Region', 'Alola Region' ]

  types: { name: string, color: string }[] = [
    { name: 'normal', color: '#B6B6A8' },
    { name: 'fire', color: '#FF6043' },
    { name: 'water', color: '#52A8FF' },
    { name: 'electric', color: '#FFD352' },
    { name: 'grass', color: '#8BD36E' },
    { name: 'ice', color: '#7DD3FF' },
    { name: 'fighting', color: '#C56E60' },
    { name: 'poison', color: '#B66EA8' },
    { name: 'ground', color: '#E2C56E' },
    { name: 'flying', color: '#9AA8FF' },
    { name: 'psychic', color: '#FF6EA8' },
    { name: 'bug', color: '#B6C543' },
    { name: 'rock', color: '#C4B67C' },
    { name: 'ghost', color: '#7D7DC5' },
    { name: 'dragon', color: '#8B7DF0' },
    { name: 'dark', color: '#8B6E60' },
    { name: 'steel', color: '#B6B6C5' },
    { name: 'fairy', color: '#F0A8F0' }
  ]

  pokemonChange = new Subject();
  selectedChange = new Subject();
  bottomsheetChange = new Subject();

  constructor() { }

  setPokemon(gen: number) {
    this.pokemonChange.next({ gen, region: this.region[gen] });
  }

  setSelected(spec: any) {
    this.selectedChange.next({ ...spec });
  }

  setBottomsheet() {
    this.bottomsheetChange.next({});
  }

  pokemon_species = [
    {
        "name": "dragonite",
        "url": "https://pokeapi.co/api/v2/pokemon-species/149/"
    },
    {
        "name": "dragonair",
        "url": "https://pokeapi.co/api/v2/pokemon-species/148/"
    },
    {
        "name": "snorlax",
        "url": "https://pokeapi.co/api/v2/pokemon-species/143/"
    },
    {
        "name": "kabutops",
        "url": "https://pokeapi.co/api/v2/pokemon-species/141/"
    },
    {
        "name": "omastar",
        "url": "https://pokeapi.co/api/v2/pokemon-species/139/"
    },
    {
        "name": "flareon",
        "url": "https://pokeapi.co/api/v2/pokemon-species/136/"
    },
    {
        "name": "jolteon",
        "url": "https://pokeapi.co/api/v2/pokemon-species/135/"
    },
    {
        "name": "vaporeon",
        "url": "https://pokeapi.co/api/v2/pokemon-species/134/"
    },
    {
        "name": "gyarados",
        "url": "https://pokeapi.co/api/v2/pokemon-species/130/"
    },
    {
        "name": "magmar",
        "url": "https://pokeapi.co/api/v2/pokemon-species/126/"
    },
    {
        "name": "electabuzz",
        "url": "https://pokeapi.co/api/v2/pokemon-species/125/"
    },
    {
        "name": "jynx",
        "url": "https://pokeapi.co/api/v2/pokemon-species/124/"
    },
    {
        "name": "mr-mime",
        "url": "https://pokeapi.co/api/v2/pokemon-species/122/"
    },
    {
        "name": "starmie",
        "url": "https://pokeapi.co/api/v2/pokemon-species/121/"
    },
    {
        "name": "seaking",
        "url": "https://pokeapi.co/api/v2/pokemon-species/119/"
    },
    {
        "name": "seadra",
        "url": "https://pokeapi.co/api/v2/pokemon-species/117/"
    },
    {
        "name": "chansey",
        "url": "https://pokeapi.co/api/v2/pokemon-species/113/"
    },
    {
        "name": "rhydon",
        "url": "https://pokeapi.co/api/v2/pokemon-species/112/"
    },
    {
        "name": "weezing",
        "url": "https://pokeapi.co/api/v2/pokemon-species/110/"
    },
    {
        "name": "hitmonchan",
        "url": "https://pokeapi.co/api/v2/pokemon-species/107/"
    },
    {
        "name": "hitmonlee",
        "url": "https://pokeapi.co/api/v2/pokemon-species/106/"
    },
    {
        "name": "marowak",
        "url": "https://pokeapi.co/api/v2/pokemon-species/105/"
    },
    {
        "name": "exeggutor",
        "url": "https://pokeapi.co/api/v2/pokemon-species/103/"
    },
    {
        "name": "electrode",
        "url": "https://pokeapi.co/api/v2/pokemon-species/101/"
    },
    {
        "name": "kingler",
        "url": "https://pokeapi.co/api/v2/pokemon-species/99/"
    },
    {
        "name": "hypno",
        "url": "https://pokeapi.co/api/v2/pokemon-species/97/"
    },
    {
        "name": "gengar",
        "url": "https://pokeapi.co/api/v2/pokemon-species/94/"
    },
    {
        "name": "haunter",
        "url": "https://pokeapi.co/api/v2/pokemon-species/93/"
    },
    {
        "name": "cloyster",
        "url": "https://pokeapi.co/api/v2/pokemon-species/91/"
    },
    {
        "name": "muk",
        "url": "https://pokeapi.co/api/v2/pokemon-species/89/"
    },
    {
        "name": "dewgong",
        "url": "https://pokeapi.co/api/v2/pokemon-species/87/"
    },
    {
        "name": "dodrio",
        "url": "https://pokeapi.co/api/v2/pokemon-species/85/"
    },
    {
        "name": "magneton",
        "url": "https://pokeapi.co/api/v2/pokemon-species/82/"
    },
    {
        "name": "slowbro",
        "url": "https://pokeapi.co/api/v2/pokemon-species/80/"
    },
    {
        "name": "rapidash",
        "url": "https://pokeapi.co/api/v2/pokemon-species/78/"
    },
    {
        "name": "golem",
        "url": "https://pokeapi.co/api/v2/pokemon-species/76/"
    },
    {
        "name": "graveler",
        "url": "https://pokeapi.co/api/v2/pokemon-species/75/"
    },
    {
        "name": "tentacruel",
        "url": "https://pokeapi.co/api/v2/pokemon-species/73/"
    },
    {
        "name": "victreebel",
        "url": "https://pokeapi.co/api/v2/pokemon-species/71/"
    },
    {
        "name": "weepinbell",
        "url": "https://pokeapi.co/api/v2/pokemon-species/70/"
    },
    {
        "name": "machamp",
        "url": "https://pokeapi.co/api/v2/pokemon-species/68/"
    },
    {
        "name": "machoke",
        "url": "https://pokeapi.co/api/v2/pokemon-species/67/"
    },
    {
        "name": "alakazam",
        "url": "https://pokeapi.co/api/v2/pokemon-species/65/"
    },
    {
        "name": "kadabra",
        "url": "https://pokeapi.co/api/v2/pokemon-species/64/"
    },
    {
        "name": "poliwrath",
        "url": "https://pokeapi.co/api/v2/pokemon-species/62/"
    },
    {
        "name": "poliwhirl",
        "url": "https://pokeapi.co/api/v2/pokemon-species/61/"
    },
    {
        "name": "arcanine",
        "url": "https://pokeapi.co/api/v2/pokemon-species/59/"
    },
    {
        "name": "primeape",
        "url": "https://pokeapi.co/api/v2/pokemon-species/57/"
    },
    {
        "name": "golduck",
        "url": "https://pokeapi.co/api/v2/pokemon-species/55/"
    },
    {
        "name": "persian",
        "url": "https://pokeapi.co/api/v2/pokemon-species/53/"
    },
    {
        "name": "dugtrio",
        "url": "https://pokeapi.co/api/v2/pokemon-species/51/"
    },
    {
        "name": "venomoth",
        "url": "https://pokeapi.co/api/v2/pokemon-species/49/"
    },
    {
        "name": "parasect",
        "url": "https://pokeapi.co/api/v2/pokemon-species/47/"
    },
    {
        "name": "vileplume",
        "url": "https://pokeapi.co/api/v2/pokemon-species/45/"
    },
    {
        "name": "gloom",
        "url": "https://pokeapi.co/api/v2/pokemon-species/44/"
    },
    {
        "name": "golbat",
        "url": "https://pokeapi.co/api/v2/pokemon-species/42/"
    },
    {
        "name": "wigglytuff",
        "url": "https://pokeapi.co/api/v2/pokemon-species/40/"
    },
    {
        "name": "jigglypuff",
        "url": "https://pokeapi.co/api/v2/pokemon-species/39/"
    },
    {
        "name": "ninetales",
        "url": "https://pokeapi.co/api/v2/pokemon-species/38/"
    },
    {
        "name": "clefable",
        "url": "https://pokeapi.co/api/v2/pokemon-species/36/"
    },
    {
        "name": "clefairy",
        "url": "https://pokeapi.co/api/v2/pokemon-species/35/"
    },
    {
        "name": "nidoking",
        "url": "https://pokeapi.co/api/v2/pokemon-species/34/"
    },
    {
        "name": "nidorino",
        "url": "https://pokeapi.co/api/v2/pokemon-species/33/"
    },
    {
        "name": "nidoqueen",
        "url": "https://pokeapi.co/api/v2/pokemon-species/31/"
    },
    {
        "name": "nidorina",
        "url": "https://pokeapi.co/api/v2/pokemon-species/30/"
    },
    {
        "name": "sandslash",
        "url": "https://pokeapi.co/api/v2/pokemon-species/28/"
    },
    {
        "name": "raichu",
        "url": "https://pokeapi.co/api/v2/pokemon-species/26/"
    },
    {
        "name": "pikachu",
        "url": "https://pokeapi.co/api/v2/pokemon-species/25/"
    },
    {
        "name": "arbok",
        "url": "https://pokeapi.co/api/v2/pokemon-species/24/"
    },
    {
        "name": "fearow",
        "url": "https://pokeapi.co/api/v2/pokemon-species/22/"
    },
    {
        "name": "raticate",
        "url": "https://pokeapi.co/api/v2/pokemon-species/20/"
    },
    {
        "name": "pidgeot",
        "url": "https://pokeapi.co/api/v2/pokemon-species/18/"
    },
    {
        "name": "pidgeotto",
        "url": "https://pokeapi.co/api/v2/pokemon-species/17/"
    },
    {
        "name": "beedrill",
        "url": "https://pokeapi.co/api/v2/pokemon-species/15/"
    },
    {
        "name": "kakuna",
        "url": "https://pokeapi.co/api/v2/pokemon-species/14/"
    },
    {
        "name": "butterfree",
        "url": "https://pokeapi.co/api/v2/pokemon-species/12/"
    },
    {
        "name": "metapod",
        "url": "https://pokeapi.co/api/v2/pokemon-species/11/"
    },
    {
        "name": "blastoise",
        "url": "https://pokeapi.co/api/v2/pokemon-species/9/"
    },
    {
        "name": "wartortle",
        "url": "https://pokeapi.co/api/v2/pokemon-species/8/"
    },
    {
        "name": "charizard",
        "url": "https://pokeapi.co/api/v2/pokemon-species/6/"
    },
    {
        "name": "charmeleon",
        "url": "https://pokeapi.co/api/v2/pokemon-species/5/"
    },
    {
        "name": "venusaur",
        "url": "https://pokeapi.co/api/v2/pokemon-species/3/"
    },
    {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
    },
    {
        "name": "mew",
        "url": "https://pokeapi.co/api/v2/pokemon-species/151/"
    },
    {
        "name": "mewtwo",
        "url": "https://pokeapi.co/api/v2/pokemon-species/150/"
    },
    {
        "name": "dratini",
        "url": "https://pokeapi.co/api/v2/pokemon-species/147/"
    },
    {
        "name": "moltres",
        "url": "https://pokeapi.co/api/v2/pokemon-species/146/"
    },
    {
        "name": "zapdos",
        "url": "https://pokeapi.co/api/v2/pokemon-species/145/"
    },
    {
        "name": "articuno",
        "url": "https://pokeapi.co/api/v2/pokemon-species/144/"
    },
    {
        "name": "aerodactyl",
        "url": "https://pokeapi.co/api/v2/pokemon-species/142/"
    },
    {
        "name": "kabuto",
        "url": "https://pokeapi.co/api/v2/pokemon-species/140/"
    },
    {
        "name": "omanyte",
        "url": "https://pokeapi.co/api/v2/pokemon-species/138/"
    },
    {
        "name": "porygon",
        "url": "https://pokeapi.co/api/v2/pokemon-species/137/"
    },
    {
        "name": "eevee",
        "url": "https://pokeapi.co/api/v2/pokemon-species/133/"
    },
    {
        "name": "ditto",
        "url": "https://pokeapi.co/api/v2/pokemon-species/132/"
    },
    {
        "name": "lapras",
        "url": "https://pokeapi.co/api/v2/pokemon-species/131/"
    },
    {
        "name": "magikarp",
        "url": "https://pokeapi.co/api/v2/pokemon-species/129/"
    },
    {
        "name": "tauros",
        "url": "https://pokeapi.co/api/v2/pokemon-species/128/"
    },
    {
        "name": "pinsir",
        "url": "https://pokeapi.co/api/v2/pokemon-species/127/"
    },
    {
        "name": "scyther",
        "url": "https://pokeapi.co/api/v2/pokemon-species/123/"
    },
    {
        "name": "staryu",
        "url": "https://pokeapi.co/api/v2/pokemon-species/120/"
    },
    {
        "name": "goldeen",
        "url": "https://pokeapi.co/api/v2/pokemon-species/118/"
    },
    {
        "name": "horsea",
        "url": "https://pokeapi.co/api/v2/pokemon-species/116/"
    },
    {
        "name": "kangaskhan",
        "url": "https://pokeapi.co/api/v2/pokemon-species/115/"
    },
    {
        "name": "tangela",
        "url": "https://pokeapi.co/api/v2/pokemon-species/114/"
    },
    {
        "name": "rhyhorn",
        "url": "https://pokeapi.co/api/v2/pokemon-species/111/"
    },
    {
        "name": "koffing",
        "url": "https://pokeapi.co/api/v2/pokemon-species/109/"
    },
    {
        "name": "lickitung",
        "url": "https://pokeapi.co/api/v2/pokemon-species/108/"
    },
    {
        "name": "cubone",
        "url": "https://pokeapi.co/api/v2/pokemon-species/104/"
    },
    {
        "name": "exeggcute",
        "url": "https://pokeapi.co/api/v2/pokemon-species/102/"
    },
    {
        "name": "voltorb",
        "url": "https://pokeapi.co/api/v2/pokemon-species/100/"
    },
    {
        "name": "krabby",
        "url": "https://pokeapi.co/api/v2/pokemon-species/98/"
    },
    {
        "name": "drowzee",
        "url": "https://pokeapi.co/api/v2/pokemon-species/96/"
    },
    {
        "name": "onix",
        "url": "https://pokeapi.co/api/v2/pokemon-species/95/"
    },
    {
        "name": "gastly",
        "url": "https://pokeapi.co/api/v2/pokemon-species/92/"
    },
    {
        "name": "shellder",
        "url": "https://pokeapi.co/api/v2/pokemon-species/90/"
    },
    {
        "name": "grimer",
        "url": "https://pokeapi.co/api/v2/pokemon-species/88/"
    },
    {
        "name": "seel",
        "url": "https://pokeapi.co/api/v2/pokemon-species/86/"
    },
    {
        "name": "doduo",
        "url": "https://pokeapi.co/api/v2/pokemon-species/84/"
    },
    {
        "name": "farfetchd",
        "url": "https://pokeapi.co/api/v2/pokemon-species/83/"
    },
    {
        "name": "magnemite",
        "url": "https://pokeapi.co/api/v2/pokemon-species/81/"
    },
    {
        "name": "slowpoke",
        "url": "https://pokeapi.co/api/v2/pokemon-species/79/"
    },
    {
        "name": "ponyta",
        "url": "https://pokeapi.co/api/v2/pokemon-species/77/"
    },
    {
        "name": "geodude",
        "url": "https://pokeapi.co/api/v2/pokemon-species/74/"
    },
    {
        "name": "tentacool",
        "url": "https://pokeapi.co/api/v2/pokemon-species/72/"
    },
    {
        "name": "bellsprout",
        "url": "https://pokeapi.co/api/v2/pokemon-species/69/"
    },
    {
        "name": "machop",
        "url": "https://pokeapi.co/api/v2/pokemon-species/66/"
    },
    {
        "name": "abra",
        "url": "https://pokeapi.co/api/v2/pokemon-species/63/"
    },
    {
        "name": "poliwag",
        "url": "https://pokeapi.co/api/v2/pokemon-species/60/"
    },
    {
        "name": "growlithe",
        "url": "https://pokeapi.co/api/v2/pokemon-species/58/"
    },
    {
        "name": "mankey",
        "url": "https://pokeapi.co/api/v2/pokemon-species/56/"
    },
    {
        "name": "psyduck",
        "url": "https://pokeapi.co/api/v2/pokemon-species/54/"
    },
    {
        "name": "meowth",
        "url": "https://pokeapi.co/api/v2/pokemon-species/52/"
    },
    {
        "name": "diglett",
        "url": "https://pokeapi.co/api/v2/pokemon-species/50/"
    },
    {
        "name": "venonat",
        "url": "https://pokeapi.co/api/v2/pokemon-species/48/"
    },
    {
        "name": "paras",
        "url": "https://pokeapi.co/api/v2/pokemon-species/46/"
    },
    {
        "name": "oddish",
        "url": "https://pokeapi.co/api/v2/pokemon-species/43/"
    },
    {
        "name": "zubat",
        "url": "https://pokeapi.co/api/v2/pokemon-species/41/"
    },
    {
        "name": "vulpix",
        "url": "https://pokeapi.co/api/v2/pokemon-species/37/"
    },
    {
        "name": "nidoran-m",
        "url": "https://pokeapi.co/api/v2/pokemon-species/32/"
    },
    {
        "name": "nidoran-f",
        "url": "https://pokeapi.co/api/v2/pokemon-species/29/"
    },
    {
        "name": "sandshrew",
        "url": "https://pokeapi.co/api/v2/pokemon-species/27/"
    },
    {
        "name": "ekans",
        "url": "https://pokeapi.co/api/v2/pokemon-species/23/"
    },
    {
        "name": "spearow",
        "url": "https://pokeapi.co/api/v2/pokemon-species/21/"
    },
    {
        "name": "rattata",
        "url": "https://pokeapi.co/api/v2/pokemon-species/19/"
    },
    {
        "name": "pidgey",
        "url": "https://pokeapi.co/api/v2/pokemon-species/16/"
    },
    {
        "name": "weedle",
        "url": "https://pokeapi.co/api/v2/pokemon-species/13/"
    },
    {
        "name": "caterpie",
        "url": "https://pokeapi.co/api/v2/pokemon-species/10/"
    },
    {
        "name": "squirtle",
        "url": "https://pokeapi.co/api/v2/pokemon-species/7/"
    },
    {
        "name": "charmander",
        "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
    },
    {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
    }
  ]

}
