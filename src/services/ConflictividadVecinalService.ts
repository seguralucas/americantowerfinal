import { GenericeService } from './GenericService'; 
import { ConflictividadVecinalRepository } from '../repository/ConflictividadVecinalRepository';
import { ConflictividadVecinal } from '../entity/ConflictividadVecinal';
let encriptutils = require('../components/encryputils')

/******************CONFIG CLASS************************** */
const myRepository = ConflictividadVecinalRepository
/******************************************************** */

export class ConflictividadVecinalService/**config */ extends GenericeService<ConflictividadVecinal/**config */> {
    constructor() {
        super(new myRepository())
    }

    public async save(newObj:ConflictividadVecinal): Promise<ConflictividadVecinal> {
        newObj.scoring=newObj.clasificacion*18
        return await super.save(newObj)
    }

}