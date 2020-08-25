import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type GraphQLComposeModuleOptions = {};

export interface GraphQLComposeOptionsFactory {
  createGraphQLComposeOptions():
    | Promise<GraphQLComposeModuleOptions>
    | GraphQLComposeModuleOptions;
}

export interface GraphQLComposeModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GraphQLComposeOptionsFactory>;
  useClass?: Type<GraphQLComposeOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<GraphQLComposeModuleOptions> | GraphQLComposeModuleOptions;
  inject?: any[];
}
