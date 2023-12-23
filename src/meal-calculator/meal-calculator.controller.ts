import { BadRequestException, Body, Controller, Delete, Get, Injectable, NotFoundException, Param, Patch, Post, Put } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { MealCalculatorService } from "./meal-calculator.service";

@Controller('meals')
export class MealCalculatorController {

    constructor (
            private mealCalculatorService: MealCalculatorService,
            private userService: UserService

    ) {

    }

    @Post(':userId')
    async addMeal(@Param('userId') userId: string, @Body() mealDto: any) {
      const { type, dateTime, calories, description } = mealDto;
      return this.mealCalculatorService.addMeal(parseInt(userId), type, dateTime, calories, description);
    }
    @Get(':id/calories')
    async calculateCalories(@Param('id') id: string) {
      try {
        const user = await this.userService.show(parseInt(id));
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return this.mealCalculatorService.calculateCaloricNeeds(user);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    @Put(':mealId')
    async updateMeal(@Param('mealId') mealId: string, @Body() updateData: any) {
      return this.mealCalculatorService.updateMeal(parseInt(mealId), updateData);
    }
  
    @Delete(':mealId')
    async deleteMeal(@Param('mealId') mealId: string) {
      return this.mealCalculatorService.deleteMeal(parseInt(mealId));
    }


    @Get(':userId')
    async getAllMeals(@Param('userId') userId: string) {
      return this.mealCalculatorService.getMealsByUserId(parseInt(userId));
    }
  
    @Get(':userId/:mealId')
    async getSingleMeal(@Param('userId') userId: string, @Param('mealId') mealId: string) {
      const meal = await this.mealCalculatorService.getSingleMeal(parseInt(userId), parseInt(mealId));
      if (!meal) {
        throw new NotFoundException('Meal not found');
      }
      return meal;
    }
}