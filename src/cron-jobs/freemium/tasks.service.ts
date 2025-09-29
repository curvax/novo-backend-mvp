import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service'; // Atualize para o caminho correto do seu PrismaService

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Define a tarefa para rodar à meia-noite todos os dias
  async downgradePremiumUsers() {
    // Encontrar usuários que são premium e têm mais de 5 dias de dívida
    const users = await this.prisma.user.findMany({
      where: {
        isPremium: true,
        daysOnDebt: {
          gt: 5,
        },
      },
    });

    // Para cada usuário que satisfaça as condições, atualize para free
    users.forEach(async (user) => {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { isPremium: false },
      });
    });

    console.log(`Downgraded ${users.length} users to free status.`);
  }
}
