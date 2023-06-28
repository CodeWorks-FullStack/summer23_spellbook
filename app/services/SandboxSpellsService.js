import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async toggleSpellPreparation(spellId) {

    const foundSpellIndex = AppState.mySpells.findIndex(spell => spell.id == spellId)

    const foundSpell = AppState.mySpells[foundSpellIndex]

    if (!foundSpell) {
      throw new Error("INVALID ID")
    }

    // if (foundSpell.prepared == true) {
    //   foundSpell.prepared = false
    // }
    // else {
    //   foundSpell.prepared = true
    // }

    // foundSpell.prepared = !foundSpell.prepared

    // console.log('toggling spell', foundSpell);

    const res = await api.put(`api/spells/${spellId}`, { prepared: !foundSpell.prepared })
    console.log('edited spell', res.data);

    const updatedSpell = new Spell(res.data)

    AppState.mySpells.splice(foundSpellIndex, 1, updatedSpell)

    AppState.emit('mySpells')

    // foundSpell.prepared = res.data.prepared
  }
  setActiveSpell(spellId) {
    const foundSpell = AppState.mySpells.find(spell => spell.id == spellId)

    if (!foundSpell) {
      throw new Error("INVALID ID")
    }

    AppState.activeSpell = foundSpell
    console.log('active', AppState.activeSpell);
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
  }

}

export const sandboxSpellsService = new SandboxSpellsService()