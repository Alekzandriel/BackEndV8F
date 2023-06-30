import { CatalogueDto } from '@core/dto';

export class CreateCatalogueDto extends CatalogueDto {}

/*
const ES_I18N_MESSAGES = JSON.parse(
  readFileSync('src/assets/lang/es.json').toString(),
);

const model = new CreateCatalogueDto();

new Validator()
  .validate(model, { messages: ES_I18N_MESSAGES })
  .then((errors) => {
    console.log(errors[0].constraints);
    // out: title должен быть равен test
  });
*/
//
// const RU_I18N_MESSAGES = {
//   '$property must be longer than or equal to $constraint1':
//     '$property должно быть равно $constraint1',
// };
//
// const model = new CreateCatalogueDto();
//
// new Validator()
//   .validate(model, { messages: RU_I18N_MESSAGES })
//   .then((errors) => {
//     console.log(errors[0].constraints);
//     // out: title должно быть равно test
//   });
