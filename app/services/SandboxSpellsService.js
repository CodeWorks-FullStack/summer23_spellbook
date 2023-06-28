import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
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