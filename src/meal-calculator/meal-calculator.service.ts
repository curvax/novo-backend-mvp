import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MealCalculatorService {

    constructor (
        private readonly prisma: PrismaService
    ) {}

    async addMeal(userId: number, type: string, dateTime: Date, calories: number, description: string) {
        return this.prisma.meal.create({
          data: {
            userId,
            type,
            dateTime,
            calories,
            description,
          },
        });
      }

      async updateMeal(mealId: number, updateData: any) {
        return this.prisma.meal.update({
          where: { id: mealId },
          data: updateData,
        });
      }
    
      async deleteMeal(mealId: number) {
        return this.prisma.meal.delete({
          where: { id: mealId },
        });
      }

      

      calculateCaloricNeeds(user: any) {

        const errors = [];

    if (typeof user.weight !== 'number' || user.weight <= 0) errors.push('Peso inválido ou ausente');
    if (typeof user.height !== 'number' || user.height <= 0) errors.push('Altura inválida ou ausente');
    if (!user.birthAt || new Date(user.birthAt) >= new Date()) errors.push('Data de nascimento inválida ou ausente');
    if (!user.sex || !['male', 'female'].includes(user.sex.toLowerCase())) errors.push('Sexo inválido ou ausente');
    if (!user.activityLevel) errors.push('Nível de atividade ausente');

    // Se houver algum erro, lance uma exceção com a lista de erros
    if (errors.length) {
      throw new Error(`Dados incompletos ou inválidos: ${errors.join(', ')}.`);
    }

    // Calculando a idade a partir da data de nascimento
 // Normalizações
 const activityLevelNormalized = user.activityLevel.toLowerCase();
 const sexNormalized = user.sex.toLowerCase();

 // Cálculo da idade
 const age = this.calculateAge(new Date(user.birthAt));

 // Cálculo do BMR usando Mifflin-St Jeor Equation
 let bmr = (sexNormalized === 'male') ?
   (10 * user.weight) + (6.25 * user.height) - (5 * age) + 5 :
   (10 * user.weight) + (6.25 * user.height) - (5 * age) - 161;

 // Ajuste com base no nível de atividade
 const activityMultipliers = {
   'sedentary': 1.2,
   'light': 1.375,
   'moderate': 1.55,
   'active': 1.725,
   'veryactive': 1.9 // Note que veryActive foi alterado para veryactive para corresponder à normalização
 };

 let dailyCaloricNeeds = bmr * (activityMultipliers[activityLevelNormalized] || 1.2);

 // Cálculo do IMC
 let bmi = user.weight / ((user.height / 100) ** 2);

 // Distribuição recomendada de macronutrientes
 let proteinNeeds = dailyCaloricNeeds * 0.15 / 4; // 15% das calorias e cada grama de proteína tem 4 calorias
 let fatNeeds = dailyCaloricNeeds * 0.30 / 9; // 30% das calorias e cada grama de gordura tem 9 calorias
 let carbNeeds = dailyCaloricNeeds * 0.55 / 4; // 55% das calorias e cada grama de carboidrato tem 4 calorias

 // Resultado detalhado
 return {
   bmr, // Taxa metabólica basal
   dailyCaloricNeeds, // Necessidades calóricas diárias
   bmi, // Índice de Massa Corporal
   macronutrients: { // Distribuição de macronutrientes
     protein: proteinNeeds,
     fat: fatNeeds,
     carbohydrates: carbNeeds
   },
   user
 };
      }


      private calculateAge(birthDate: Date): number {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }


      async getMealsByUserId(userId: number) {
        return this.prisma.meal.findMany({
          where: {
            userId,
          },
        });
      }
    
      async getSingleMeal(userId: number, mealId: number) {
        return this.prisma.meal.findFirst({
          where: {
            id: mealId,
            userId,
          },
        });
      }
}