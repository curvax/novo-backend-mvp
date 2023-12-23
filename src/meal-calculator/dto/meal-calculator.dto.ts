import { IsInt, IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMealDTO {
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    dateTime: Date;

    @IsNotEmpty()
    @IsNumber()
    calories: number;

    @IsNotEmpty()
    @IsString()
    description: string;
}
