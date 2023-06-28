import { AppState } from "../AppState.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawMySpells() {
  let mySpellListElem = document.getElementById('mySpellList')

  if (!mySpellListElem) {
    return
  }


  let mySpells = AppState.mySpells

  let template = ''

  mySpells.forEach(spell => template += spell.MySpellListItemTemplate)

  mySpellListElem.innerHTML = template
}

function _drawMyActiveSpell() {
  let mySpellDetailsElem = document.getElementById('mySpellDetails')

  if (!mySpellDetailsElem) {
    return
  }

  let spell = AppState.activeSpell

  // setHTML('mySpellDetails', spell.DetailsTemplate)
  mySpellDetailsElem.innerHTML = spell.DetailsTemplate
}

export class SandboxSpellsController {
  constructor () {
    console.log('sandbox controller loaded');

    // NOTE 401 unauthorized
    // this.getMySpells()

    AppState.on('account', this.getMySpells)
    AppState.on('mySpells', _drawMySpells)
    AppState.on('activeSpell', _drawMyActiveSpell)
  }

  async createSpell() {
    try {
      await sandboxSpellsService.createSpell()
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  async getMySpells() {
    try {
      await sandboxSpellsService.getMySpells()
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  setActiveSpell(spellId) {
    sandboxSpellsService.setActiveSpell(spellId)
  }
}