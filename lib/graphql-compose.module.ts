import { DynamicModule, Module, Global, Provider } from '@nestjs/common';
import { GRAPHQL_COMPOSE_MODULE_OPTIONS } from './graphql-compose.constants';
import { SchemaComposerService } from './schema-composer.service';
import {
  GraphQLComposeModuleAsyncOptions,
  GraphQLComposeModuleOptions,
  GraphQLComposeOptionsFactory,
} from './interfaces';

@Global()
@Module({
  providers: [SchemaComposerService],
  exports: [SchemaComposerService],
})
export class GraphQLComposeModule {
  static register(options: GraphQLComposeModuleOptions): DynamicModule {
    return {
      module: GraphQLComposeModule,
      providers: [
        { provide: GRAPHQL_COMPOSE_MODULE_OPTIONS, useValue: options },
      ],
    };
  }

  static registerAsync(
    options: GraphQLComposeModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: GraphQLComposeModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(
    options: GraphQLComposeModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: GraphQLComposeModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: GRAPHQL_COMPOSE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: GRAPHQL_COMPOSE_MODULE_OPTIONS,
      useFactory: async (optionsFactory: GraphQLComposeOptionsFactory) =>
        await optionsFactory.createGraphQLComposeOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
