import { Module, forwardRef } from "@nestjs/common";
import { MealCalculatorController } from "./meal-calculator.controller";
import { MealCalculatorService } from "./meal-calculator.service";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { UserService } from "src/user/user.service";


@Module({
    imports: [
        PrismaModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [MealCalculatorController],
    providers: [MealCalculatorService, PrismaService, UserService]
})

export class MealCalculatorModule{}