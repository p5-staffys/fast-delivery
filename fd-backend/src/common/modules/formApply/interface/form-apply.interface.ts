export interface IForm {
  bebidasAlcoholicas: boolean;
  medicamentosPsicoactivos: boolean;
  problemaEmocional: boolean;
}

export interface IFormApply {
  form: IForm;
  date: string;
}

export interface IFormDB {
  form: IForm;
  ok: boolean;
  date: Date;
}
