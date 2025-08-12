import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { AppModel, GlobalComponent } from '../types/models';

export class AcesDB extends Dexie {
  apps!: Table<AppModel, string>;
  components!: Table<GlobalComponent, string>;

  constructor() {
    super('AcesAppsDB');
    this.version(1).stores({
      apps: 'id, name, suit, status, updatedAt',
      components: 'id, name, version, lastUpdated',
    });
  }
}

export const db = new AcesDB();
