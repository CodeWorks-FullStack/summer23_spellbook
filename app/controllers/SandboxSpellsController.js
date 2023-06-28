import { AppState } from "../AppState.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { spellsService } from "../services/SpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";

function _drawMySpells() {
  let mySpellListElem = document.getElementById('mySpellList')

  if (!mySpellListElem) {
    return
  }


  let mySpells = AppState.mySpells

  let template = ''

  mySpells.forEach(spell => template += spell.MySpellListItemTemplate)


  setText('spellCount', mySpells.length)

  // const preparedSpells = mySpells.filter(spell => spell.prepared == true)
  const preparedSpells = mySpells.filter(spell => spell.prepared)

  setText('preparedSpellCount', preparedSpells.length)

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
    _drawMySpells()


    // NOTE 401 unauthorized
    // this.getMySpells()

    AppState.on('account', this.getMySpells)
    AppState.on('mySpells', _drawMySpells)
    AppState.on('activeSpell', _drawMyActiveSpell)
  }
  setActiveSpell(spellId) {
    sandboxSpellsService.setActiveSpell(spellId)
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

  async toggleSpellPreparation(spellId) {
    try {
      await sandboxSpellsService.toggleSpellPreparation(spellId)
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }



}