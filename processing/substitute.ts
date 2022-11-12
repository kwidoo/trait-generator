import _ from 'lodash'
// @ts-ignore
import scopes from '~/static/scopes.php'

export interface iModelName {
  studly: string;
  snake: string;
  kebab: string;
  camel: string;
  upper: string;
  lower: string;
  reverse: iModelName | null;
}

export default class Substitute {
  protected _namespace: string = 'App\\Models\\';
  protected _scopes: string = ''

  protected _model: iModelName
  protected _foreign_key1: string | null
  protected _foreign_key2: string | null

  constructor(
    private readonly trait: string,
    private readonly model: string = 'Order',
    private readonly reverseModel: string = 'User',
    private readonly foreignKey1: string | null = null,
    private readonly foreignKey2: string | null = null,
    private readonly withScopes: boolean = false,
  ) {
    this._model = new ModelName(this.model, this.reverseModel);
    this._scopes = this.withScopes ? scopes : ''

    this._foreign_key1 = this.foreignKey1
    this._foreign_key2 = this.foreignKey2
  }

  get namespace(): string {
    return this._namespace
  }

  set namespace(value: string) {
    this._namespace = value
  }

  get traitFilled(): string {
    const data: string = this.trait
      .replaceAll('<scopes>', this._scopes)
      .replaceAll('<model-studly>', this._model.studly)
      .replaceAll('<traitName>', this._model.studly)
      .replaceAll('<model-upper>', this._model.upper)
      .replaceAll('<foreign-key1>', this._foreign_key1 ? `'${this._foreign_key1}'` : `constant('self::${this._model.upper}_FOREIGN_KEY')`)
      .replaceAll('<model-snake>', this._model.snake)
      .replaceAll('<model-camel>', this._model.camel)
      .replaceAll('<model-folder>', this._namespace)
    if (this._model.reverse !== null) {
      data
        .replaceAll('<model-reverse-studly>', this._model.reverse.studly)
        .replaceAll('<model-reverse-kebab>', this._model.reverse.kebab)
        .replaceAll('<model-reverse-upper>', this._model.reverse.upper)
        .replaceAll('<model-reverse-snake>', this._model.reverse.snake)
        .replaceAll('<model-reverse-camel>', this._model.reverse.camel)
        .replaceAll('<foreign-key2>', this._foreign_key2 ? `'${this._foreign_key2}'` : `${this._model.reverse.studly}::PRIMARY_KEY`)
    }
    return data
  }
}


export class ModelName implements iModelName {
  private _model: string
  private _reverse: iModelName | null = null
  private _studly: string | null = null
  private _snake: string | null = null
  private _kebab: string | null = null
  private _camel: string | null = null
  private _upper: string | null = null
  private _lower: string | null = null

  constructor(
    private readonly model: string = 'Order',
    private readonly reverseModel: string | null = null) {
    this._model = this.model
    if (this.reverseModel) {
      this._reverse = new ModelName(this.reverseModel)
    }
  }

  public get reverse(): iModelName | null {
    return this._reverse
  }

  public set reverse(value: iModelName | null) {
    this._reverse = value
  }

  public get studly(): string {
    return this._studly ?? _.upperFirst(_.camelCase(this._model))
  }

  public get snake(): string {
    return this._snake ?? _.snakeCase(this._model)
  }

  public get kebab(): string {
    return this._kebab ?? _.kebabCase(this._model)
  }

  public get camel(): string {
    return this._camel ?? _.camelCase(this._model)
  }

  public get upper(): string {
    return this._upper ?? _.upperCase(_.snakeCase(this._model))
  }

  public get lower(): string {
    return this._lower ?? _.lowerCase(this._model)
  }
}

export class ForeignKeyName {
  private _model: string
  private _reverseModel: iModelName | null = null

  private _foreignKey1: string | null = null
  private _foreignKey2: string | null = null

  constructor(
    private readonly model: string = 'Order',
    private readonly reverseModel: string | null = null) {
    this._model = this.model
    if (this.reverseModel) {
      this._reverseModel = new ModelName(this.reverseModel)
    }
  }

  // public get foreignKey1(): string {
  //   return this._foreignKey1
  // }
}
