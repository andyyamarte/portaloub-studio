import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MailGateway, PageTypeRepository } from '@portaloub/contracts';
import { GetCatalog } from './application/use-cases/get-catalog.usecase';
import { GetPageType } from './application/use-cases/get-page-type.usecase';
import { SendContactMessage } from './application/use-cases/send-contact-message.usecase';
import { GmailMailGateway } from './infrastructure/gateways/gmail-mail.gateway';
import { InMemoryPageTypeRepository } from './infrastructure/repositories/in-memory-page-type.repository';
import { ContactController } from './interfaces/http/contact.controller';
import { HealthController } from './interfaces/http/health.controller';
import { PageTypesController } from './interfaces/http/page-types.controller';

/**
 * CACHE: CacheModule global con TTL en milisegundos (cache-manager v7).
 * El interceptor se aplica solo en el controlador de catálogo para no cachear POSTs.
 */
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: Number(process.env.CACHE_TTL_MS ?? 5 * 60 * 1000),
      max: 100,
    }),
  ],
  controllers: [PageTypesController, ContactController, HealthController],
  providers: [
    { provide: PageTypeRepository, useClass: InMemoryPageTypeRepository },
    { provide: MailGateway, useClass: GmailMailGateway },
    GetCatalog,
    GetPageType,
    SendContactMessage,
  ],
})
export class AppModule {}
