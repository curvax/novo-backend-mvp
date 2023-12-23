
import {PartialType} from '@nestjs/mapped-types';
import { CreateMealDTO } from './meal-calculator.dto';

export class UpdatePatchVolDTO extends PartialType(CreateMealDTO) {

   
    
}