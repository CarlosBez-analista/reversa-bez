import { existsSync, mkdirSync, writeFileSync, readFileSync, cpSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');
const AGENTS_DIR = join(REPO_ROOT, 'agents');

export class EvolutiWriter {
  constructor(projectRoot, outputRoot) {
    this.projectRoot = projectRoot;
    this.outputRoot = outputRoot;
  }

  _mkdir(dir) {
    mkdirSync(dir, { recursive: true });
  }

  writeIfNew(filePath, content) {
    if (existsSync(filePath)) return false;
    this._mkdir(dirname(filePath));
    writeFileSync(filePath, content, 'utf8');
    return true;
  }

  writeOrUpdate(filePath, content) {
    this._mkdir(dirname(filePath));
    writeFileSync(filePath, content, 'utf8');
  }

  installSkill(agentId, skillsDir) {
    const src = join(AGENTS_DIR, agentId);
    const dest = join(this.projectRoot, skillsDir, agentId);

    if (!existsSync(src)) {
      console.warn(`  Agente evoluti não encontrado: ${agentId}`);
      return false;
    }

    if (existsSync(dest)) return true;

    this._mkdir(dirname(dest));
    cpSync(src, dest, { recursive: true });
    return true;
  }

  loadState() {
    const statePath = join(this.projectRoot, '.reversa', 'state.json');
    if (!existsSync(statePath)) return null;
    return JSON.parse(readFileSync(statePath, 'utf8'));
  }

  saveCheckpoint(phaseNum, phaseName, status) {
    const statePath = join(this.projectRoot, '.reversa', 'state.json');
    const state = JSON.parse(readFileSync(statePath, 'utf8'));

    state.evoluti = state.evoluti ?? {
      output_root: null,
      current_phase: 0,
      phase_name: null,
      completed_phases: [],
      pending_phases: ["decisao", "fundacao", "dominio", "expansao", "integracao", "validacao"],
      modules_done: [],
      modules_pending: [],
      target_product: null,
    };

    state.evoluti.output_root = state.evoluti.output_root ?? this.outputRoot;
    state.evoluti.current_phase = phaseNum;
    state.evoluti.phase_name = phaseName;
    if (status === 'completed' && !state.evoluti.completed_phases.includes(phaseName)) {
      state.evoluti.completed_phases.push(phaseName);
    }

    writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
  }
}
