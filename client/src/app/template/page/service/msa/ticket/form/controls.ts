import {SelectS1Component} from "../../../../../../entry/select/s.1/component";

import {EntryComponentConstructor} from "../../../../../../entry/constructor";

import {InputI1Component} from "../../../../../../entry/input/i.1/component";
import {TextareaT1Component} from "../../../../../../entry/textarea/t.1/component";
import {InputI2Component} from "../../../../../../entry/input/i.2/component";
import {TableTb1Component} from "../../../../../../entry/table/tb.1/component";

import {Validators} from '@angular/forms';


export default {
  f_5_1: {
    label: '5.1 установление группы инвалидности',
    id: 'f51',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_2: {
    label: '5.2 установление категории «ребенок-инвалид»',
    id: 'f52',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_3: {
    label: '5.3 установление причины инвалидности',
    id: 'f53',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_4: {
    label: '5.4 установление времени наступления инвалидности',
    id: 'f54',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_5: {
    label: '5.5 установление установление срока инвалидности',
    id: 'f55',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_6: {
    label: '5.6 определение степени утраты профессиональной трудоспособности в процентах',
    id: 'f56',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_7: {
    label: '5.7 определение стойкой утраты трудоспособности сотрудника органа внутренних дел Российской Федерации',
    id: 'f57',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_8: {
    label: '5.8 определение нуждаемости по состоянию здоровья в постоянном постороннем уходе (помощи, надзоре) отца, матери, жены, родного брата, родной сестры,\n' +
      'дедушки,\n' +
      'усыновителя\n' +
      'призываемого\n' +
      'службу\n' +
      'проходящего военную службу по контракту).',
    id: 'f58',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_9: {
    label: '5.9. определение причины смерти инвалида, а также лица, пострадавшего в результате несчастного случая на производстве, профессионального заболевания, катастрофы на Чернобыльской АЭС и других радиационных и техногенных катастроф либо в результате ранения, контузии, увечья или заболевания, полученных в период прохождения военной службы, в случаях, когда законодательством Российской Федерации предусматривается предоставление семье умершего мер социальной поддержки',
    id: 'f59',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_10: {
    label: '5.10 разработка индивидуальной программы реабилитации или абилитации инвалида (ребенка-инвалида)',
    id: 'f510',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_11: {
    label: '5.11 разработка программы\n' +
      'реабилитации\n' +
      'пострадавшего\n' +
      'несчастного\n' +
      'производстве професссионального заболевания',
    id: 'f511',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_12: {
    label: '5.12 выдача дубликата справки, подтверждающей факт установления инвалидности, степени утраты профессиональной трудоспособности в процентах',
    id: 'f512',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_13: {
    label: '5.13 выдача новой справки, подтверждающей факт установления инвалидности, в случае изменения фамилии, имени, отчества, даты рождения гражданина',
    id: 'f513',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_14: {
    label: '5.14 иные цели, установленные законодательством Российской Федерации (указать)',
    id: 'f514',
    validation: 'not-validate',
    name: 'f_5_group',
  },
  f_5_14_text: {
    validators: {
      pattern: {
        body: Validators.pattern('[a-zA-Z ]*'),
        errorText: 'Поле введено некорретно'
      },
    },
    errors: {}
  },

  f_6_name_last: {
    label: '6.1 Фамилия',
    id: 'f61',
    required: true,
    validators: {
      pattern: {
        body: Validators.pattern('[a-zA-Z ]*'),
        errorText: 'Фамилия введена некорретно'
      },
      required: {
        body: Validators.required,
        errorText: 'Поле не заполнено'
      }
    },
    errors: {}
  },
  f_6_name_first: {
    label: '6.2 Имя',
    id: 'f62',
    required: true,
    validators: {
      pattern: {
        body: Validators.pattern('[a-zA-Z ]*'),
        errorText: 'Имя введено некорретно'
      },
      required: {
        body: Validators.required,
        errorText: 'Поле не заполнено'
      }
    },
    errors: {}
  },
  f_6_name_patronymic: {
    label: '6.3 Отчество',
    id: 'f63',
    validators: {
      pattern: {
        body: Validators.pattern('[a-zA-Z ]*'),
        errorText: 'Отчество введено некорретно'
      }
    },
    errors: {}
  },

  f_7_1: {
    label: '7.1 Дата рождения (день, месяц, год)',
    id: 'f71',
    tag: 'input-date-picker',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9. ]*'),
        errorText: 'Дата введена некорретно'
      }
    },
    errors: {}
  },
  f_7_2: {
    label: '7.2 Возраст (число полных лет, для ребенка в возрасте до 1 года - число полных месяцев)',
    id: 'f72',
    required: true,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Возраст введён некорретно'
      },
      required: {
        body: Validators.required,
        errorText: 'Поле не заполнено'
      }
    },
    errors: {}
  },

  f_8_1: {
    label: '8.1 мужской',
    id: 'f81',
    validation: 'not-validate',
    name: 'f_8_group',
  },
  f_8_2: {
    label: '8.2 женский',
    id: 'f82',
    validation: 'not-validate',
    name: 'f_8_group',
  },

  f_9_1: {
    label: '9.1 гражданин Российской Федерации',
    id: 'f91',
    validation: 'not-validate',
    name: 'f_9_group',
  },
  f_9_2: {
    label: '9.2 гражданин иностранного государства, находящийся на территории Российской Федерации',
    id: 'f92',
    validation: 'not-validate',
    name: 'f_9_group',
  },
  f_9_3: {
    label: '9.3 лицо без гражданства, находящееся на территории Российской Федерации',
    id: 'f93',
    validation: 'not-validate',
    name: 'f_9_group',
  },

  f_10_1: {
    label: '10.1 гражданин, состоящий на воинском учете',
    id: 'f101',
    validation: 'not-validate',
    name: 'f_10_group',
  },
  f_10_2: {
    label: '10.2 гражданин, не состоящий на воинском учете, но обязанный состоять\n' +
      '  на воинском учете',
    id: 'f102',
    validation: 'not-validate',
    name: 'f_10_group',
  },

  f_11_1: {
    label: '11.1 государство',
    id: 'f111',
    validators: {
      pattern: {
        body: Validators.pattern('[A-Z ]*'),
        errorText: 'Государство указано некорретно'
      }
    },
    errors: {}
  },
  f_11_2: {
    label: '11.2 почтовый индекс',
    id: 'f112',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Почтовый индекс введён некорретно'
      }
    },
    errors: {}
  },
  f_11_3: {
    label: '11.3 субъект Российской Федерации',
    id: 'f113',
    validators: {
      pattern: {
        body: Validators.pattern('[A-Z ]*'),
        errorText: 'Субъект указан некорретно'
      }
    },
    errors: {}
  },
  f_11_4: {
    label: '11.4 район',
    id: 'f114',
    validators: {
      pattern: {
        body: Validators.pattern('[A-Z ]*'),
        errorText: 'Район указан некорретно'
      }
    },
    errors: {}
  },
  f_11_5: {
    label: '11.5 населенный пункт (нужное отметить)',
    id: 'f115',
    tag: 'checkbox',
    validation: 'not-validate',
    name: 'f_11_5_group',
  },
  f_11_5_1: {
    label: '11.5.1 городское поселение',
    id: 'f1151',
    validation: 'not-validate',
    name: 'f_11_5_group',
  },
  f_11_5_2: {
    label: '11.5.2 сельское поселение',
    id: 'f1152',
    validation: 'not-validate',
    name: 'f_11_5_group',
  },
  f_11_6: {
    label: '11.6 наименование населенного пункта',
    id: 'f116',
    col: 12,
    validators: {
      pattern: {
        body: Validators.pattern('[A-Z ]*'),
        errorText: 'Наименование населенного пункта введено некорретно'
      }
    },
    errors: {}
  },
  f_11_7: {
    label: '11.7 улица',
    id: 'f117',
    validators: {
      pattern: {
        body: Validators.pattern('[A-Z ]*'),
        errorText: 'Название улицы введено некорретно'
      }
    },
    errors: {}
  },
  f_11_8: {
    label: '11.8 дом (корпус, строение)',
    id: 'f118',
    col: 2,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9a-z ]*'),
        errorText: 'Номер дома указан некорретно'
      }
    },
    errors: {}
  },
  f_11_9: {
    label: '11.9 квартира',
    id: 'f119',
    col: 2,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Квартирка указана некорретно'
      }
    },
    errors: {}
  },
  f_11_10: {
    label: '11.10 адрес постоянной регистрации',
    id: 'f1110',
    col: 12,
    validators: {
      pattern: {
        body: Validators.pattern('[A-Za-z ]*'),
        errorText: 'Aдрес введён некорретно'
      }
    },
    errors: {}
  },

  f_13_1: {
    label: '13.1 \n' +
      'организации, медицинскую стационарных условиях\n' +
      'в медицинской оказывающей помощь в',
    id: 'f131',
    validation: 'not-validate',
    name: 'f_13_group',
    validators: {},
    errors: {}
  },
  f_13_1_address: {
    label: 'адрес медицинской организации',
    id: 'f131a',
    tag: 'textarea',
    validators: {
      pattern: {
        body: Validators.pattern('[a-zA-Z0-9., ]*'),
        errorText: 'Адрес введён некорретно'
      }
    },
    errors: {}
  },
  f_13_1_ogrn: {
    label: 'ОГРН медицинской организации',
    id: 'f131o',
    tag: 'input',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'ОГРН введено некорретно'
      }
    },
    errors: {}
  },
  f_13_2: {
    label: '13.2 социального оказывающей услуги в стационарной форме социального обслуживания',
    id: 'f132',
    validation: 'not-validate',
    name: 'f_13_group',
    validators: {},
    errors: {}
  },
  f_13_2_address: {
    label: 'адрес организации социального обслуживания',
    id: 'f132a',
    tag: 'textarea',
    validators: {
      pattern: {
        body: Validators.pattern('[a-zA-Z0-9., ]*'),
        errorText: 'Адрес введён некорретно'
      }
    },
    errors: {}
  },
  f_13_2_ogrn: {
    label: 'ОГРН организации социального обслуживания',
    id: 'f132o',
    tag: 'input',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'ОГРН введено некорретно'
      }
    },
    errors: {}
  },
  f_13_3: {
    label: '13.3 в исправительном учреждении',
    id: 'f133',
    validation: 'not-validate',
    name: 'f_13_group',
    validators: {},
    errors: {}
  },
  f_13_3_address: {
    label: 'адрес исправительного учреждения',
    id: 'f133a',
    tag: 'textarea',
    validators: {
      pattern: {
        body: Validators.pattern('[a-zA-Z0-9., ]*'),
        errorText: 'Адрес введён некорретно'
      }
    },
    errors: {}
  },
  f_13_3_ogrn: {
    label: 'ОГРН адрес исправительного учреждения',
    id: 'f133o',
    tag: 'input',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'ОГРН введено некорретно'
      }
    },
    errors: {}
  },

  f_14_1: {
    label: '14.1 контактные телефоны',
    id: 'f141',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Телефон введён некорретно'
      }
    },
    errors: {}
  },
  f_14_2: {
    label: '14.2 адрес электронной почты',
    id: 'f142',
    validators: {
      email: {
        body: Validators.email,
        errorText: 'Aдрес электронной почты введён некорретно'
      }
    },
    errors: {}
  },

  f_15: {
    label: '14.2 Страховой номер индивидуального лицевого счета (СНИЛС)',
    id: 'f15',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'СНИЛС введён некорретно'
      }
    },
    errors: {}
  },

  f_16_1: {
    label: '16.1 наименование',
    id: 'f161',
    type: 'entry',
    col: 6,
    entry: true,
    data: new EntryComponentConstructor(SelectS1Component, [
      'Паспорт',
      'Водительское удостоверение',
      'Свидетельство о рождении',
    ], {}),
    validation: 'not-validate',
    name: 'f_16_1',
  },
  f_16_2: {
    id: 'f162',
    label: '16.2 номера',
    validation: 'not-validate',
    name: 'f_16_2',
  },
  f_16_2_1: {
    label: 'серия',
    id: 'f1621',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'серия введена некорретно'
      }
    },
    errors: {}
  },
  f_16_2_2: {
    label: 'номер',
    id: 'f1622',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'номер введён некорретно'
      }
    },
    errors: {}
  },
  f_16_3: {
    label: '16.3 кем выдан',
    id: 'f163',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9a-zA-Z ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_16_4: {
    label: '16.4 дата выдачи (день, месяц, год):',
    id: 'f164',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Дата выдачи указана некорретно'
      }
    },
    errors: {}
  },

  f_17_1: {
    label: '17.1 документ, удостоверяющий полномочия законного (уполномоченного) представителя',
    id: 'f171',
    validation: 'not-validate',
    name: 'f_17_1',
  },
  f_17_1_1: {
    label: '17.1.1 наименование',
    id: 'f1711',
    col: 6,
    entry: true,
    data: new EntryComponentConstructor(SelectS1Component, [
      'Паспорт',
      'Доверенность',
    ], {}),
    validation: 'not-validate',
    name: 'f_17_1',
  },
  f_17_1_2: {
    id: 'f1712',
    label: '17.1.2 номера',
    col: 6,
    validation: 'not-validate',
    name: 'f_17_1',
  },
  f_17_1_2_1: {
    label: 'серия',
    id: 'f17121',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Серия указана некорретно'
      }
    },
    errors: {}
  },
  f_17_1_2_2: {
    label: 'номер',
    id: 'f17122',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Номер указана некорретно'
      }
    },
    errors: {}
  },
  f_17_1_3: {
    label: '17.1.3 кем выдан',
    id: 'f1713',
    col: 9,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9a-zA-Z ]*'),
        errorText: 'Поле указано некорретно'
      }
    },
    errors: {}
  },
  f_17_1_4: {
    label: '17.1.4 дата выдачи (день, месяц, год)',
    id: 'f1714',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Дата выдачи указана некорретно'
      }
    },
    errors: {}
  },
  f_17_2: {
    label: '17.2 документ, удостоверяющий личность',
    id: 'f172',
    validation: 'not-validate',
    name: 'f_17_2',
  },
  f_17_2_1: {
    label: '17.2.1 наименование',
    id: 'f1721',
    col: 6,
    entry: true,
    data: new EntryComponentConstructor(SelectS1Component, [
      'Свидетельство о рождении',
      'Доверенность',
    ], {}),
    validation: 'not-validate',
    name: 'f_17_2_1',
  },
  f_17_2_2: {
    id: 'f1722',
    label: '17.2.2 номер',
    col: 6,
    validation: 'not-validate',
    name: 'f_17_2_2',
  },
  f_17_2_2_1: {
    label: 'серия',
    id: 'f17221',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Серия указана некорретно'
      }
    },
    errors: {}
  },
  f_17_2_2_2: {
    label: 'номер',
    id: 'f17222',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Номер указан некорретно'
      }
    },
    errors: {}
  },
  f_17_2_3: {
    label: '17.2.3 кем выдан',
    id: 'f1723',
    col: 9,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9a-zA-Z ]*'),
        errorText: 'Поле указано некорретно'
      }
    },
    errors: {}
  },
  f_17_2_4: {
    label: '17.2.4 дата выдачи (день, месяц, год)',
    id: 'f1724',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Дата выдачи указана некорретно'
      }
    },
    errors: {}
  },
  f_17_3: {
    label: '17.3 контактная информация',
    id: 'f173',
    validation: 'not-validate',
    name: 'f_17_2_2',
  },
  f_17_3_1: {
    label: '17.3.1 контактные телефоны',
    id: 'f1731',
    col: 6,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Телефон указан некорретно'
      }
    },
    errors: {}
  },
  f_17_3_2: {
    label: '17.3.2 адрес электронной почты',
    id: 'f1732',
    col: 6,
    validators: {
      email: {
        body: Validators.email,
        errorText: 'Aдрес электронной почты введён некорретно'
      }
    },
    errors: {}
  },
  f_17_4: {
    label: '17.4 страховой номер индивидуального лицевого счета (СНИЛС):',
    id: 'f174',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'СНИЛС введён некорретно'
      }
    },
    errors: {}
  },
  f_17_5: {
    label: '17.5  сведения об организации в случае возложения опеки (попечительства) на юридическое лицо',
    id: 'f175',
    validation: 'not-validate',
    name: 'f_17_5',
  },
  f_17_5_1: {
    label: '17.5.1 наименование',
    id: 'f1751',
    validators: {
      pattern: {
        body: Validators.pattern('[A-Z ]*'),
        errorText: 'Наименование указано некорретно'
      }
    },
    errors: {}
  },
  f_17_5_2: {
    label: '17.5.2 адрес',
    id: 'f1752',
    col: 9,
    validators: {
      pattern: {
        body: Validators.pattern('[a-zA-Z0-9., ]*'),
        errorText: 'Адрес введён некорретно'
      }
    },
    errors: {}
  },
  f_17_5_3: {
    label: '17.5.3 ОГРН',
    id: 'f1753',
    col: 6,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'ОГРН введено некорретно'
      }
    },
    errors: {}
  },

  f_18_1: {
    label: '18.1 первично',
    id: 'f181',
    validation: 'not-validate',
  },
  f_18_2: {
    label: '18.2 повторно',
    id: 'f182',
    validation: 'not-validate',
  },

  f_19_1: {
    label: '19.1 наличие инвалидности на момент направления на медико-социальную экспертизу (нужное отметить)',
    id: 'f191',
    name: 'f_19_1_group',
    validation: 'not-validate',
  },
  f_19_1_1: {
    label: '19.1 первая группа',
    id: 'f1911',
    validation: 'not-validate',
  },
  f_19_1_2: {
    label: '19.2 вторая группа',
    id: 'f1912',
    validation: 'not-validate',
  },
  f_19_1_3: {
    label: '19.3 третья группа',
    id: 'f1913',
    validation: 'not-validate',
  },
  f_19_1_4: {
    label: '19.4 категория ребенок-инвалид',
    id: 'f1914',
    validation: 'not-validate',
  },
  f_19_2: {
    label: '19.2 дата, до которой установлена инвалидность (день, месяц, год)',
    id: 'f192',
    col: 6,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_19_3: {
    label: '19.3 период, в течение которого гражданин находился на инвалидности на момент направления на медико-социальную экспертизу (нужное отметить)',
    id: 'f193',
    name: 'f_19_3_group',
    validation: 'not-validate',
  },
  f_19_3_1: {
    label: '19.3.1 один год',
    id: 'f1931',
    validation: 'not-validate',
  },
  f_19_3_2: {
    label: '19.3.2 два года',
    id: 'f1932',
    validation: 'not-validate',
  },
  f_19_3_3: {
    label: '19.3.3 три года',
    id: 'f1933',
    validation: 'not-validate',
  },
  f_19_3_4: {
    label: '19.3.4 четыре и более лет',
    id: 'f1934',
    validation: 'not-validate',
  },
  f_19_4: {
    label: '19.4 формулировка причины инвалидности, имеющейся на момент направления на медико-социальную экспертизу (нужное отметить)',
    id: 'f194',
    name: 'f_19_4_group',
    validation: 'not-validate',
  },
  f_19_4_1: {
    label: '19.4.1 общее заболевание',
    id: 'f1941',
    validation: 'not-validate',
  },
  f_19_4_2: {
    label: '19.4.2 инвалидность с детства',
    id: 'f1942',
    validation: 'not-validate',
  },
  f_19_4_3: {
    label: '19.4.3 профессиональное заболевание',
    id: 'f1943',
    validation: 'not-validate',
  },
  f_19_4_4: {
    label: '19.4.4 трудовое увечье',
    id: 'f1944',
    validation: 'not-validate',
  },
  f_19_4_5: {
    label: '19.4.5 военная травма',
    id: 'f1945',
    validation: 'not-validate',
  },
  f_19_4_6: {
    label: '19.4.6 заболевание получено в период военной службы',
    id: 'f1946',
    validation: 'not-validate',
  },
  f_19_4_7: {
    label: '19.4.7 заболевание, полученное при исполнении иных обязанностей военной службы (служебных обязанностей), связано с катастрофой на Чернобыльской АЭС',
    id: 'f1947',
    validation: 'not-validate',
  },
  f_19_4_8: {
    label: '19.4.8 заболевание радиационно обусловленное получено при исполнении обязанностей военной службы (служебных обязанностей) в связи с катастрофой на Чернобыльской АЭС',
    id: 'f1948',
    validation: 'not-validate',
  },
  f_19_4_9: {
    label: '19.4.9 заболевание связано с катастрофой на Чернобыльской АЭС',
    id: 'f1949',
    validation: 'not-validate',
  },
  f_19_4_10: {
    label: '19.4.10 заболевание связано с аварией на ПО «Маяк»',
    id: 'f19410',
    validation: 'not-validate',
  },
  f_19_4_11: {
    label: '19.4.11 заболевание,\n' +
      'полученное при исполнении иных обязанностей военной службы (служебных обязанностей), связано с аварией на ПО «Маяк»',
    id: 'f19411',
    validation: 'not-validate',
  },
  f_19_4_12: {
    label: '19.4.12 заболевание связано с последствиями радиационных воздействий',
    id: 'f19412',
    validation: 'not-validate',
  },
  f_19_4_13: {
    label: '19.4.13 заболевание радиационно обусловленное получено при исполнении обязанностей военной службы (служебных обязанностей) в связи с непосредственным участием в действиях подразделений особого риска',
    id: 'f19413',
    validation: 'not-validate',
  },
  f_19_4_14: {
    label: '19.4.14 инвалидность с детства вследствие ранения (контузии, увечья), связанного с боевыми действиями в период Великой Отечественной войны 1941-1945 годов',
    id: 'f19414',
    validation: 'not-validate',
  },
  f_19_4_15: {
    label: '19.4.15 заболевание (ранение, контузия, увечье), полученное лицом, обслуживавшим действующие воинские части Вооруженных Сил СССР и Вооруженных Сил Российской Федерации, находившиеся на территориях других государств в период ведения в этих государствах боевых действий',
    id: 'f19415',
    validation: 'not-validate',
  },
  f_19_4_16: {
    label: '19.4.16 иные причины, установленные законодательством Российской Федерации (указать):',
    id: 'f19416',
    validation: 'not-validate',
  },
  f_19_4_16_text: {
    validators: {
      pattern: {
        body: Validators.pattern('[a-z ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_19_4_17: {
    label: '19.4.17 формулировки причин инвалидности, установленные в соответствии с законодательством, действовавшим на момент установления инвалидности (указать)',
    id: 'f19417',
    validation: 'not-validate',
  },
  f_19_4_17_text: {
    validators: {
      pattern: {
        body: Validators.pattern('[a-z ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_19_5: {
    label: '19.5 степень утраты профессиональной трудоспособности в процентах на момент направления гражданина на медико-социальную экспертизу',
    id: 'f195',
    col: 2,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_19_6: {
    label: '19.6 срок на который установлена степень утраты профессиональной трудоспособности в процентах',
    id: 'f196',
    col: 2,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_19_7: {
    label: '19.7 дата, до которой установлена степень утраты профессиональной трудоспособности в процентах (день, месяц, год',
    id: 'f197',
    col: 6,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_19_8: {
    label: '19.8 степени утраты профессиональной трудоспособности (в процентах), установленные по повторным несчастным случаям на производстве и профессиональным заболеваниям, и даты, до которых они установлены',
    id: 'f198',
    col: 2,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },

  f_20_1: {
    label: '20.1 наименование и адрес образовательной организации, в которой гражданин получает образование',
    id: 'f201',
    type: 'entry',
    data: new EntryComponentConstructor(InputI1Component, '', {
      className: 'form-control',
      formControlName: 'f_20_1',
      id: 'f201',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Наименование и адрес заполнено некорретно'
        }
      },
      errors: {}
    }),
    validation: 'not-validate',
  },
  f_20_2: {
    label: '20.2 Уровень в образовательной организации',
    id: 'f202',
    validation: 'not-validate',
  },
  f_20_2_1: {
    label: '20.2.1 курс',
    id: 'f2021',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Курс указан некорретно'
      }
    },
    errors: {}
  },
  f_20_2_2: {
    label: '20.2.2 класс',
    id: 'f2022',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Класс указан некорретно'
      }
    },
    errors: {}
  },
  f_20_2_3: {
    label: '20.2.3 возрастная группа детского дошкольного учреждения',
    id: 'f2023',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Возрастная группа указана некорретно'
      }
    },
    errors: {}
  },
  f_20_3: {
    label: '20.3 профессия (специальность), для получения которой проводится обучение',
    id: 'f203',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      formControlName: 'f_20_3',
      id: 'f203',
      rows: 4,
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Профессия указана некорретно'
        }
      },
      errors: {}
    }),
    validation: 'not-validate',
  },

  f_21_1: {
    label: '21.1 основная профессия (специальность, должность)',
    id: 'f211',
    required: true,
    type: 'entry',
    data: new EntryComponentConstructor(InputI2Component, '', {
      className: 'form-control',
      formControlName: 'f_21_1',
      id: 'f211',
      col: 6,
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Профессия указана некорретно'
        },
        required: {
          body: Validators.required,
          errorText: 'Поле не заполнено'
        }
      },
      errors: {}
    }),
    validation: 'not-validate',
  },
  f_21_2: {
    label: '21.2 квалификация (класс, разряд, категория, звание)',
    id: 'f212',
    required: true,
    type: 'entry',
    data: new EntryComponentConstructor(InputI2Component, '', {
      className: 'form-control',
      formControlName: 'f_21_2',
      id: 'f212',
      col: 6,
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z0-9 ]*'),
          errorText: 'Квалификация указана некорретно'
        },
        required: {
          body: Validators.required,
          errorText: 'Поле не заполнено'
        }
      },
      errors: {}
    }),
    validation: 'not-validate',
  },
  f_21_3: {
    label: '21.3 стаж работы',
    id: 'f213',
    type: 'entry',
    data: new EntryComponentConstructor(InputI2Component, '', {
      className: 'form-control',
      formControlName: 'f_21_3',
      id: 'f213',
      col: 2,
      validators: {
        pattern: {
          body: Validators.pattern('[0-9 ]*'),
          errorText: 'Стаж указан некорретно'
        }
      },
      errors: {}
    }),
    validation: 'not-validate',
  },
  f_21_4: {
    label: '21.4 выполняемая работа на момент направления на медико-социальную экспертизу с указанием профессии (специальности, должности)',
    id: 'f214',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      formControlName: 'f_21_4',
      id: 'f214',
      rows: 4,
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Поле заполнено некорретно'
        }
      },
      errors: {}
    }),
    validation: 'not-validate',
  },
  f_21_5: {
    label: '21.5 условия и характер выполняемого труда',
    id: 'f215',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      formControlName: 'f_21_5',
      id: 'f215',
      rows: 4,
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Поле заполнено некорретно'
        }
      },
      errors: {}
    }),
    validation: 'not-validate',
  },
  f_21_6: {
    label: '21.6 место работы (наименование организации)',
    id: 'f216',
    type: 'entry',
    data: new EntryComponentConstructor(InputI2Component, '', {
      className: 'form-control',
      formControlName: 'f_21_6',
      id: 'f216',
      col: 12,
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Место работы указано некорретно'
        }
      },
      errors: {}
    }),
    validation: 'not-validate',
  },
  f_21_7: {
    label: '21.7 адрес места работы',
    id: 'f217',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      formControlName: 'f_21_7',
      id: 'f217',
      rows: 2,
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Адрес места работы указан некорретно'
        }
      },
      errors: {}
    }),
    validation: 'not-validate',
  },

  f_22: {
    label: '22. Наблюдается в медицинской организации\n',
    id: 'f22',
    col: 2,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_23: {
    label: '23. Анамнез заболевания\n',
    id: 'f23',
    col: 12,
    validators: {
      pattern: {
        body: Validators.pattern('[a-z ]*'),
        errorText: 'Анамнез заболевания заполнен некорретно'
      }
    },
    errors: {}
  },
  f_24: {
    label: '24. Анамнез жизни\n',
    id: 'f24',
    col: 12,
    validators: {
      pattern: {
        body: Validators.pattern('[a-z ]*'),
        errorText: 'Анамнез жизни заполнен некорретно'
      }
    },
    errors: {}
  },

  f_25: {
    type: 'entry',
    data: new EntryComponentConstructor(TableTb1Component, {}, {
      formControlName: 'f_25',
      th: [
        {
          text: '№ п/п',
          width: '10%'
        },
        {
          text: 'Даты',
          width: '30%',
          list: [
            {
              text: 'Дата начала временной нетрудоспособности',
              validators: {
                pattern: {
                  body: Validators.pattern('[0-9 ]*'),
                  errorText: 'Дата указана некорретно'
                }
              },
              errors: {}
            },
            {
              text: 'Дата окончания временной нетрудоспособности',
              validators: {
                pattern: {
                  body: Validators.pattern('[0-9 ]*'),
                  errorText: 'Дата указана некорретно'
                }
              },
              errors: {}
            },
            {
              text: 'Число месяцев и дней временной нетрудоспособности',
              validators: {
                pattern: {
                  body: Validators.pattern('[0-9 ]*'),
                  errorText: 'Поле заполенно некорретно'
                }
              },
              errors: {}
            },
          ]
        },
        {
          text: 'Диагноз',
          width: '50%',
          validators: {
            pattern: {
              body: Validators.pattern('[а-яА-Я0-9a-zA-Z,. ]*'),
              errorText: 'Поле заполенно некорретно'
            }
          },
          errors: {}
        },
        {
          text: 'Действия',
          width: '10%'
        },
      ]
    }),
    validation: 'not-validate',
  },
  f_25_2: {
    label: '25.2. № ЭЛН',
    id: 'f252',
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле ЭЛН заполнено некорретно'
      }
    },
    errors: {}
  },
};


export const f26 = [
  {
    label: '26.1 востановление нарушенных функций',
    id: 'f261',
    childs: [
      {
        label: '26.1.1 полное',
        id: 'f2611',
      },
      {
        label: '26.1.2 частичное',
        id: 'f2612',
      },
      {
        label: '26.1.3 положительные результаты отсутствуют',
        id: 'f2613',
      },
    ],
  },
  {
    label: '26.2 достижение компенсации утраченных либо отсутствующих функций',
    id: 'f262',
    childs: [
      {
        label: '26.2.1 полное',
        id: 'f2621',
      },
      {
        label: '26.2.2 частичное',
        id: 'f2622',
      },
      {
        label: '26.2.3 положительные результаты отсутствуют',
        id: 'f2623',
      },
    ],
  },
];

export const f27 = [
  {
    label: '27.1 рост',
    id: 'f271',
    col: 3
  },
  {
    label: '27.2 вес',
    id: 'f272',
    col: 3
  },
  {
    label: '27.3 индекс массы тела',
    id: 'f273',
    col: 3
  },
  {
    label: '27.4 телосложение',
    id: 'f274',
    col: 3
  },
  {
    label: '27.5 суточный объем физиологических отправлений (мл)',
    id: 'f275',
    col: 3
  },
  {
    id: 'f276',
    label: '27.6 объем талии/бедер',
    col: 6,
    childs: [
      {
        label: 'объем талии',
        id: 'f2761',
        col: 6
      },
      {
        label: 'объем бедер',
        id: 'f2762',
        col: 6
      },
    ]
  },
  {
    label: '27.7 масса тела при рождении',
    id: 'f277',
    col: 3
  },
  {
    label: '27.8 физическое развитие',
    id: 'f278',
    col: 12
  },
];

export const f30 = [
  {
    label: '30.1 основное заболевание',
    id: 'f301',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f301',
      rows: 12
    }),
  },
  {
    label: '30.2 код основного заболевания по МКБ',
    id: 'f302',
    type: 'entry',
    data: new EntryComponentConstructor(InputI2Component, '', {
      className: 'form-control',
      id: 'f302',
      col: 3
    }),
  },
  {
    label: '30.3 осложнения основного заболевания',
    id: 'f303',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f303',
      rows: 4
    }),
  },
  {
    label: '30.4 сопутствующие заболевания',
    id: 'f304',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f304',
      rows: 4
    }),
  },
  {
    label: '30.5 коды сопутствующих заболеваний по МКБ',
    id: 'f305',
    type: 'entry',
    data: new EntryComponentConstructor(InputI2Component, '', {
      className: 'form-control',
      id: 'f305',
      col: 12
    }),
  },
  {
    label: '30.6 осложнения сопутствующих заболеваний',
    id: 'f306',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f306',
      rows: 12
    }),
  },
];

export const f3133 = [
  {
    label: '31 Клинический прогноз',
    id: 'f31',
    childs: [
      {
        label: '31.1 благоприятный',
        id: 'f311'
      },
      {
        label: '31.2 относительно благоприятный',
        id: 'f312'
      },
      {
        label: '31.3 сомнительный (неопределенный)',
        id: 'f313'
      },
      {
        label: '31.4 неблагоприятный (нужное подчеркнуть)',
        id: 'f314'
      },
    ]
  },
  {
    label: '32 Реабилитационный потенциал',
    id: 'f32',
    childs: [
      {
        label: '32.1 высокий',
        id: 'f321'
      },
      {
        label: '32.2 удовлетворительный',
        id: 'f322'
      },
      {
        label: '32.3 низкий',
        id: 'f323'
      },
      {
        label: '32.4 отсутствует (нужное подчеркнуть)',
        id: 'f324'
      },
    ]
  },
  {
    label: '33 Реабилитационный прогноз',
    id: 'f33',
    childs: [
      {
        label: '33.1 благоприятный',
        id: 'f331'
      },
      {
        label: '33.2 относительно благоприятный',
        id: 'f332'
      },
      {
        label: '33.3 сомнительный (неопределенный)',
        id: 'f333'
      },
      {
        label: '33.4 неблагоприятный (нужное подчеркнуть)',
        id: 'f334'
      },
    ]
  },
];

export const f3437 = [
  {
    label: '34 Рекомендуемые мероприятия по медицинской реабилитации или абилитации',
    id: 'f34',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f34',
      rows: 12
    }),
  },
  {
    label: '35 Рекомендуемые мероприятия по реконструктивной хирургии',
    id: 'f35',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f35',
      rows: 6
    }),
  },
  {
    label: '36 Рекомендуемые мероприятия по протезированию и ортезированию',
    id: 'f36',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f36',
      rows: 4
    }),
  },
  {
    label: '37 Санаторно-курортное лечение',
    id: 'f37',
    type: 'entry',
    data: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f37',
      rows: 2
    }),
  },
];
