import { GenericRepository } from './GenericRepository'; 
import { getRepository, Repository } from 'typeorm';
import { Tazas } from '../entity/Tazas';
import { MunicipalidadService } from '../services/MunicipalidadService';
/************CONFIG CLASS**************** */
const myClass = Tazas
/**************************************** */

export class TazasRepository/**config */ extends GenericRepository<Tazas/**config */>{
    public getRepository(): Repository<Tazas/**config */> {
        return getRepository(myClass);
    }
    
    public getClass() {
        return myClass
    }

}