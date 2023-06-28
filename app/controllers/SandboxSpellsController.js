import { AppState } from "../AppState.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { spellsService } from "../services/SpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";

function _drawMySpells() {
  const mySpellListElem = document.getElementById('mySpellList')

  // NOTE we have to null check this element here since our controller loads on two different pages that have different ID's in their HTML
  if (!mySpellListElem) {
    return
  }


  const mySpells = AppState.mySpells

  let template = ''

  mySpells.forEach(spell => template += spell.MySpellListItemTemplate)

  // REVIEW this code works the same as the code below
  // const preparedSpells = mySpells.filter(spell => spell.prepared == true)

  // NOTE filter gives us an array of all of our spells that have the prepared property as true
  const preparedSpells = mySpells.filter(spell => spell.prepared)


  // NOTE sets a span to the total count of all of our spells
  setText('spellCount', mySpells.length)

  // NOTE sets a span to the total count of all of our spells that are prepared
  setText('preparedSpellCount', preparedSpells.length)

  mySpellListElem.innerHTML = template
  // setHTML('mySpellList', template)
}

function _drawMyActiveSpell() {
  const mySpellDetailsElem = document.getElementById('mySpellDetails')

  // NOTE we have to null check this element here since our controller loads on two different pages that have different ID's in their HTML
  if (!mySpellDetailsElem) {
    return
  }

  const spell = AppState.activeSpell

  mySpellDetailsElem.innerHTML = spell.DetailsTemplate
  // setHTML('mySpellDetails', spell.DetailsTemplate)
}

export class SandboxSpellsController {
  constructor () {
    console.log('sandbox controller loaded');
    // NOTE we call this when the controller is loaded to retrigger our draw while navigating between 'pages' or 'views'
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