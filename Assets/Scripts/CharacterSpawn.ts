import { Transform } from 'UnityEngine';
import {SpawnInfo, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';

export default class CharacterSpawn extends ZepetoScriptBehaviour {
    public spawnPoint: Transform;
    
    Start() {    
        let info = new SpawnInfo();
        info.position = this.spawnPoint.position;
        info.rotation = this.spawnPoint.rotation;
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, info , true);
    }

}