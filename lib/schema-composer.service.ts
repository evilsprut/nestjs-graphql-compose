import { Inject, Injectable, Optional } from '@nestjs/common';
import { GRAPHQL_COMPOSE_MODULE_OPTIONS } from './graphql-compose.constants';
import { SchemaComposer } from 'graphql-compose';

@Injectable()
export class SchemaComposerService extends SchemaComposer<any> {
  constructor(@Optional() @Inject(GRAPHQL_COMPOSE_MODULE_OPTIONS) options) {
    super(options);
  }
}
