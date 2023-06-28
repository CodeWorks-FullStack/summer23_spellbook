import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js";

class SandboxSpellsService {
  async toggleSpellPreparation(spellId) {

    // NOTE we use findIndex here so that we have access to index of the spell that we're editing so we can splice, and so we can also pull out the information on the spell using bracket notation
    const foundSpellIndex = AppState.mySpells.findIndex(spell => spell.id == spellId)


    // const foundSpell = AppState.mySpells.find(spell => spell.id == spellId)

    const foundSpell = AppState.mySpells[foundSpellIndex]

    // NOTE if findIndex returns -1, foundSpell will be undefined when trying to pull it out using bracket notation
    if (!foundSpell) {
      throw new Error("INVALID ID")
    }

    // NOTE lengthy way of flipping bool
    // if (foundSpell.prepared == true) {
    //   foundSpell.prepared = false
    // }
    // else {
    //   foundSpell.prepared = true
    // }

    // NOTE quick way of flipping bool, but will actually change the value of the one stored in the AppState
    // foundSpell.prepared = !foundSpell.prepared

    // NOTE we create a new object here to break reference to the one stored in the AppState, because we only want the one in the AppState to change if our put request is successful
    const spellData = { prepared: !foundSpell.prepared }

    // NOTE we are only sending up the data that we want to update the stored Spell with. We could add additional properties to be updated, or send the whole object stored in the AppState, but we don't need to
    const res = await api.put(`api/spells/${spellId}`, spellData)

    console.log('edited spell', res.data);

    // NOTE technically would work, but not great practice
    // foundSpell.prepared = res.data.prepared

    const updatedSpell = new Spell(res.data)

    // REVIEW 1st argument: where to start splicing, 2nd argument: how many things to take out, 3rd argument: item to put in at the index
    AppState.mySpells.splice(foundSpellIndex, 1, updatedSpell)

    AppState.emit('mySpells')
  }

  setActiveSpell(spellId) {
    const foundSpell = AppState.mySpells.find(spell => spell.id == spellId)

    if (!foundSpell) {
      throw new Error("INVALID ID")
    }

    AppState.activeSpell = foundSpell
  }

  async getMySpells() {
    const res = await api.get('api/spells')

    console.log('got my spells', res.data);

    const builtSpells = res.data.map(spellPojo => new Spell(spellPojo))

    AppState.mySpells = builtSpells
  }

  async createSpell() {
    const spellToSendToApi = AppState.activeSpell

    const res = await api.post('api/spells', spellToSendToApi)

    console.log('created spell', res.data);

    const newSpell = new Spell(res.data)

    AppState.mySpells.push(newSpell)

    AppState.emit('mySpells')
  }

}

export const sandboxSpellsService = new SandboxSpellsService()