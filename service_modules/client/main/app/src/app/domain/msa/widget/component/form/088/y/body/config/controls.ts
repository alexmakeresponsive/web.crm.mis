import {Validators} from '@angular/forms';

import {EntryComponentConstructor}          from "@ComonWidgetEntryModule/collection/constructor";
import {SelectS1Component}                  from "@ComonWidgetEntryModule/collection/select/s.1/component";
import {TextareaT1Component}                from "@ComonWidgetEntryModule/collection/textarea/t.1/component";
import {InputI1Component}                   from "@ComonWidgetEntryModule/collection/input/default/i.1/component";
import {InputI2Component}                   from "@ComonWidgetEntryModule/collection/input/default/i.2/component";
import {InputDecoratePhoneI1Component}      from "@ComonWidgetEntryModule/collection/input/decorate/phone/i.d.p.1/component";
import {TableRowTbR1EntryComponent}         from "@ComonWidgetEntryModule/collection/table/tr.1/component";
import {TableRowTr2EntryComponent}          from "@ComonWidgetEntryModule/collection/table/tr.2/component";
import {DatePickerD1Component}              from "@ComonWidgetEntryModule/collection/datepicker/d.1/component";
import {DatePickerD2Component}              from "@ComonWidgetEntryModule/collection/datepicker/d.2/component";
import {ModalM1EntryComponent}              from "@ComonWidgetEntryModule/collection/modal/m.1/component";
import {ModalM2EntryComponent}              from "@ComonWidgetEntryModule/collection/modal/m.2/component";

import TableRowTr1LabelIterator                  from "@ComonWidgetEntryModule/collection/table/tr.1/iterator/label";
import TableRowTr1ErrorIterator                  from "@ComonWidgetEntryModule/collection/table/tr.1/iterator/error";
import TableRowTr2LabelIterator                  from "@ComonWidgetEntryModule/collection/table/tr.2/iterator/label";
import TableRowTr2ErrorIterator                  from "@ComonWidgetEntryModule/collection/table/tr.2/iterator/error";

export default {
  f_1: {
    label: '1. Номер и дата протокола врачебной комиссии медицинской организации, содержащего решение о направлении\n' +
      'гражданина на медико-социальную экспертизу',
    id: 'f1',
    entry: true,
    component: new EntryComponentConstructor(ModalM1EntryComponent, [
    ], {
      options: {
        modalName: 'Окно выбора протокола',
        head: [
          'Номер протокола',
          'Дата',
          'Описание',
        ]
      },
      formControlNameHidden: 'protocol_id',
      formControlName: 'f_1',
      rendererControlNameById: (id, data) => {
        return data[id].number + ' от ' + data[id].date;
      },
      rendererControlName: (data) => {
        return data.number + ' от ' + data.date
      },
      formModalControlName: 'f_1_radio',
      id: 'f1',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
  },

  f_signature: {
    entry: true,
    component: new EntryComponentConstructor(ModalM2EntryComponent, [
    ], {
      formControlName: 'f_signature',
      options: {
        modalTitle: {
          main:  'Окно выбора председателя врачебной комиссии',
          other: 'Окно выбора членов врачебной комиссии',
        },
        listLabel: {
          main:  'Председатель врачебной комиссии',
          other: 'Члены врачебной комиссии',
        },
        head: [
          'ФИО',
          'Квалификация',
          'Департамент',
          'Должность',
        ]
      },
      formControlNameHidden: {
        parent:  'f_signature',
        main:     'f_signature_main',
        other:    'f_signature_other',
      },
      formModalControlName: {
        main:  'f_modal_main',
        other: 'f_modal_other',
      },
      renderValueMain: (data) => {
        return data.name_last + ' ' + data.name_first + ' ' + data.name_patronymic;
      },
      id: 'f_signature',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
  },

  f_2: {
    label: '2. Гражданин по состоянию здоровья не может явиться в бюро (главное бюро, Федеральное бюро)\n' +
      'медико-социальной экспертизы: медико-социальную экспертизу необходимо проводить',
    id: 'f2',
    validators: {
    },
    errors: {},
    value: false
  },
  f_3: {
    label: '3. Гражданин нуждается в оказании паллиативной медицинской помощи (при нуждаемости в оказании\n' +
      'паллиативной медицинской помощи)',
    id: 'f3',
    validators: {
    },
    errors: {},
    value: false
  },
  f_4: {
    id: 'f4',
    label: '4. Дата выдачи направления на МСЭ',
    entry: true,
    component: new EntryComponentConstructor(DatePickerD2Component, [
    ], {
      formControlName: 'f_4',
      id: 'f4',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
  },

  f_5: {
    validators: {
    },
    errors: {},
  },
  f_5_1: {
    label: '5.1 установление группы инвалидности',
    id: 'f51',
    exclude: true,
    value: 1
  },
  f_5_2: {
    label: '5.2 установление категории «ребенок-инвалид»',
    id: 'f52',
    exclude: true,
    value: 2
  },
  f_5_3: {
    label: '5.3 установление причины инвалидности',
    id: 'f53',
    exclude: true,
    value: 3
  },
  f_5_4: {
    label: '5.4 установление времени наступления инвалидности',
    id: 'f54',
    exclude: true,
    value: 4
  },
  f_5_5: {
    label: '5.5 установление установление срока инвалидности',
    id: 'f55',
    exclude: true,
    value: 5
  },
  f_5_6: {
    label: '5.6 определение степени утраты профессиональной трудоспособности в процентах',
    id: 'f56',
    exclude: true,
    value: 6
  },
  f_5_7: {
    label: '5.7 определение стойкой утраты трудоспособности сотрудника органа внутренних дел Российской Федерации',
    id: 'f57',
    exclude: true,
    value: 7
  },
  f_5_8: {
    label: '5.8 определение нуждаемости по состоянию здоровья в постоянном постороннем уходе (помощи, надзоре) отца, матери, жены, родного брата, родной сестры,\n' +
      'дедушки,\n' +
      'усыновителя\n' +
      'призываемого\n' +
      'службу\n' +
      'проходящего военную службу по контракту).',
    id: 'f58',
    exclude: true,
    value: 8
  },
  f_5_9: {
    label: '5.9. определение причины смерти инвалида, а также лица, пострадавшего в результате несчастного случая на производстве, профессионального заболевания, катастрофы на Чернобыльской АЭС и других радиационных и техногенных катастроф либо в результате ранения, контузии, увечья или заболевания, полученных в период прохождения военной службы, в случаях, когда законодательством Российской Федерации предусматривается предоставление семье умершего мер социальной поддержки',
    id: 'f59',
    exclude: true,
    value: 9
  },
  f_5_10: {
    label: '5.10 разработка индивидуальной программы реабилитации или абилитации инвалида (ребенка-инвалида)',
    id: 'f510',
    exclude: true,
    value: 10
  },
  f_5_11: {
    label: '5.11 разработка программы\n' +
      'реабилитации\n' +
      'пострадавшего\n' +
      'несчастного\n' +
      'производстве професссионального заболевания',
    id: 'f511',
    exclude: true,
    value: 11
  },
  f_5_12: {
    label: '5.12 выдача дубликата справки, подтверждающей факт установления инвалидности, степени утраты профессиональной трудоспособности в процентах',
    id: 'f512',
    exclude: true,
    value: 12
  },
  f_5_13: {
    label: '5.13 выдача новой справки, подтверждающей факт установления инвалидности, в случае изменения фамилии, имени, отчества, даты рождения гражданина',
    id: 'f513',
    exclude: true,
    value: 13
  },
  f_5_14: {
    label: '5.14 иные цели, установленные законодательством Российской Федерации (указать)',
    id: 'f514',
    exclude: true,
    value: 14
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
    errors: {},
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
    errors: {},
  },
  f_6_patronymic: {
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
    entry: true,
    component: new EntryComponentConstructor(DatePickerD2Component, [
    ], {
      formControlName: 'f_7_1',
      id: 'f71',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
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
    errors: {},
  },

  f_8: {
    validators: {
    },
    errors: {}
  },
  f_8_1: {
    label: '8.1 мужской',
    id: 'f81',
    exclude: true,
    value: 1
  },
  f_8_2: {
    label: '8.2 женский',
    id: 'f82',
    exclude: true,
    value: 2
  },

  f_9: {
    validators: {
    },
    errors: {}
  },
  f_9_1: {
    label: '9.1 гражданин Российской Федерации',
    id: 'f91',
    exclude: true,
    value: 1
  },
  f_9_2: {
    label: '9.2 гражданин иностранного государства, находящийся на территории Российской Федерации',
    id: 'f92',
    exclude: true,
    value: 2
  },
  f_9_3: {
    label: '9.3 лицо без гражданства, находящееся на территории Российской Федерации',
    id: 'f93',
    exclude: true,
    value: 3
  },

  f_10: {
    validators: {
    },
    errors: {}
  },
  f_10_1: {
    label: '10.1 гражданин, состоящий на воинском учете',
    id: 'f101',
    exclude: true,
    value: 1
  },
  f_10_2: {
    label: '10.2 гражданин, не состоящий на воинском учете, но обязанный состоять\n' +
      '  на воинском учете',
    id: 'f102',
    exclude: true,
    value: 2
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
    validators: {
    },
    errors: {}
  },
  f_11_5_1: {
    label: '11.5.1 городское поселение',
    id: 'f1151',
    exclude: true,
    value: 1
  },
  f_11_5_2: {
    label: '11.5.2 сельское поселение',
    id: 'f1152',
    exclude: true,
    value: 2
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

  f_12: {
    validators: {
    },
    errors: {},
    value: false
  },

  f_13: {
    validators: {
    },
    errors: {}
  },
  f_13_1: {
    label: '13.1 \n' +
      'организации, медицинскую стационарных условиях\n' +
      'в медицинской оказывающей помощь в',
    id: 'f131',
    exclude: true,
    value: 1
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
    exclude: true,
    value: 2
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
    exclude: true,
    value: 3
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

  f_14_1_t_h: {
    exclude: true,
    data: {
      head: {
        col_1: {
          text: '№ п/п',
          width: '10%'
        },
        col_2: {
          text: 'Телефон',
          width: '80%',
        },
        col_3: {
          text: 'Действия',
          width: '10%'
        },
      },
    }
  },

  f_14_1: {
    exclude: true,
    type: 'entry',
    component: new EntryComponentConstructor(TableRowTr2EntryComponent, {}, {
      multiple: true,
      formControlName: 'f_14_1',
      body: {
        col_2: {
          f_14_1_1: {
            label: 'Телефон',
            entry: true,
            component: new EntryComponentConstructor(InputDecoratePhoneI1Component, [
            ], {
              multiple: false,
              formControlName: 'f_14_1_1',
              className: 'form-control',
              id: 'f141',
              validators: {
                minlength: {
                  body: Validators.minLength(16),
                  errorText: 'Телефон введён некорретно'
                }
              },
              errors: {}
            }),
            exclude: true,
          },
        }
      }
    }),
    iterator: {
      label: TableRowTr2LabelIterator,
      error: TableRowTr2ErrorIterator
    }
  },

  f_14_2_t_h: {
    exclude: true,
    data: {
      head: {
        col_1: {
          text: '№ п/п',
          width: '10%'
        },
        col_2: {
          text: 'Aдрес электронной почты',
          width: '80%',
        },
        col_3: {
          text: 'Действия',
          width: '10%'
        },
      },
    }
  },

  f_14_2: {
    exclude: true,
    type: 'entry',
    component: new EntryComponentConstructor(TableRowTr2EntryComponent, {}, {
      multiple: true,
      formControlName: 'f_14_2',
      type: 'notChildEntry',
      body: {
        col_2: {
          f_14_2_1: {
            label: 'Aдрес электронной почты',
            validators: {
              email: {
                body: Validators.email,
                errorText: 'Aдрес электронной почты введён некорретно'
              }
            },
            errors: {}
          },
        }
      }
    }),
    iterator: {
      label: TableRowTr2LabelIterator,
      error: TableRowTr2ErrorIterator
    }
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
    component: new EntryComponentConstructor(SelectS1Component, [
      {
        text: 'Паспорт',
        id: '1'
      },
      {
        text: 'Водительское удостоверение',
        id: '2'
      },
      {
        text: 'Свидетельство о рождении',
        id: '3'
      }
    ], {
      formControlName: 'f_16_1',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
    name: 'f_16_1',
  },
  f_16_2: {
    id: 'f162',
    label: '16.2 номера',
    exclude: true,
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
    entry: true,
    component: new EntryComponentConstructor(DatePickerD2Component, [
    ], {
      formControlName: 'f_16_4',
      id: 'f164',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
  },

  f_17_1: {
    label: '17.1 документ, удостоверяющий полномочия законного (уполномоченного) представителя',
    id: 'f171',
    exclude: true,
    name: 'f_17_1',
  },
  f_17_1_1: {
    label: '17.1.1 наименование',
    id: 'f1711',
    col: 6,
    entry: true,
    component: new EntryComponentConstructor(SelectS1Component, [
      {
        id: 1,
        text: 'Паспорт',
      },
      {
        id: 2,
        text: 'Доверенность',
      }
    ], {
      formControlName: 'f_17_1_1',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
    name: 'f_17_1',
  },
  f_17_1_2: {
    id: 'f1712',
    label: '17.1.2 номера',
    col: 6,
    exclude: true,
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
    col: 12,
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
    col: 6,
    entry: true,
    component: new EntryComponentConstructor(DatePickerD2Component, [
    ], {
      formControlName: 'f_17_1_4',
      id: 'f1714',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
  },
  f_17_2: {
    label: '17.2 документ, удостоверяющий личность',
    id: 'f172',
    exclude: true,
    name: 'f_17_2',
  },
  f_17_2_1: {
    label: '17.2.1 наименование',
    id: 'f1721',
    col: 6,
    entry: true,
    component: new EntryComponentConstructor(SelectS1Component, [
      {
        id: 1,
        text: 'Свидетельство о рождении',
      },
      {
        id: 2,
        text: 'Доверенность',
      }
    ], {
      formControlName: 'f_17_2_1',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
    name: 'f_17_2_1',
  },
  f_17_2_2: {
    id: 'f1722',
    label: '17.2.2 номер',
    col: 6,
    exclude: true,
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
    col: 12,
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
    col: 6,
    entry: true,
    component: new EntryComponentConstructor(DatePickerD2Component, [
    ], {
      formControlName: 'f_17_2_4',
      id: 'f1724',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
  },
  f_17_3: {
    label: '17.3 контактная информация',
    id: 'f173',
    exclude: true,
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
    exclude: true,
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

  f_18: {
    validators: {
    },
    errors: {}
  },
  f_18_1: {
    label: '18.1 первично',
    id: 'f181',
    exclude: true,
    value: 1
  },
  f_18_2: {
    label: '18.2 повторно',
    id: 'f182',
    exclude: true,
    value: 2
  },

  f_19_1: {
    label: '19.1 наличие инвалидности на момент направления на медико-социальную экспертизу (нужное отметить)',
    id: 'f191',
    name: 'f_19_1',
    validators: {
    },
    errors: {}
  },
  f_19_1_1: {
    label: '19.1 первая группа',
    id: 'f1911',
    exclude: true,
    value: 1
  },
  f_19_1_2: {
    label: '19.2 вторая группа',
    id: 'f1912',
    exclude: true,
    value: 2
  },
  f_19_1_3: {
    label: '19.3 третья группа',
    id: 'f1913',
    exclude: true,
    value: 3
  },
  f_19_1_4: {
    label: '19.4 категория ребенок-инвалид',
    id: 'f1914',
    exclude: true,
    value: 4
  },
  f_19_2: {
    label: '19.2 дата, до которой установлена инвалидность (день, месяц, год)',
    id: 'f192',
    col: 6,
    entry: true,
    component: new EntryComponentConstructor(DatePickerD2Component, [
    ], {
      formControlName: 'f_19_2',
      id: 'f192',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
  },
  f_19_3: {
    label: '19.3 период, в течение которого гражданин находился на инвалидности на момент направления на медико-социальную экспертизу (нужное отметить)',
    id: 'f193',
    name: 'f_19_3',
    validators: {
    },
    errors: {}
  },
  f_19_3_1: {
    label: '19.3.1 один год',
    id: 'f1931',
    exclude: true,
    value: 1
  },
  f_19_3_2: {
    label: '19.3.2 два года',
    id: 'f1932',
    exclude: true,
    value: 2
  },
  f_19_3_3: {
    label: '19.3.3 три года',
    id: 'f1933',
    exclude: true,
    value: 3
  },
  f_19_3_4: {
    label: '19.3.4 четыре и более лет',
    id: 'f1934',
    exclude: true,
    value: 4
  },
  f_19_4: {
    label: '19.4 формулировка причины инвалидности, имеющейся на момент направления на медико-социальную экспертизу (нужное отметить)',
    id: 'f194',
    name: 'f_19_4',
    validators: {
    },
    errors: {}
  },
  f_19_4_1: {
    label: '19.4.1 общее заболевание',
    id: 'f1941',
    exclude: true,
    value: 1
  },
  f_19_4_2: {
    label: '19.4.2 инвалидность с детства',
    id: 'f1942',
    exclude: true,
    value: 2
  },
  f_19_4_3: {
    label: '19.4.3 профессиональное заболевание',
    id: 'f1943',
    exclude: true,
    value: 3
  },
  f_19_4_4: {
    label: '19.4.4 трудовое увечье',
    id: 'f1944',
    exclude: true,
    value: 4
  },
  f_19_4_5: {
    label: '19.4.5 военная травма',
    id: 'f1945',
    exclude: true,
    value: 5
  },
  f_19_4_6: {
    label: '19.4.6 заболевание получено в период военной службы',
    id: 'f1946',
    exclude: true,
    value: 6
  },
  f_19_4_7: {
    label: '19.4.7 заболевание, полученное при исполнении иных обязанностей военной службы (служебных обязанностей), связано с катастрофой на Чернобыльской АЭС',
    id: 'f1947',
    exclude: true,
    value: 7
  },
  f_19_4_8: {
    label: '19.4.8 заболевание радиационно обусловленное получено при исполнении обязанностей военной службы (служебных обязанностей) в связи с катастрофой на Чернобыльской АЭС',
    id: 'f1948',
    exclude: true,
    value: 8
  },
  f_19_4_9: {
    label: '19.4.9 заболевание связано с катастрофой на Чернобыльской АЭС',
    id: 'f1949',
    exclude: true,
    value: 9
  },
  f_19_4_10: {
    label: '19.4.10 заболевание связано с аварией на ПО «Маяк»',
    id: 'f19410',
    exclude: true,
    value: 10
  },
  f_19_4_11: {
    label: '19.4.11 заболевание,\n' +
      'полученное при исполнении иных обязанностей военной службы (служебных обязанностей), связано с аварией на ПО «Маяк»',
    id: 'f19411',
    exclude: true,
    value: 11
  },
  f_19_4_12: {
    label: '19.4.12 заболевание связано с последствиями радиационных воздействий',
    id: 'f19412',
    exclude: true,
    value: 12
  },
  f_19_4_13: {
    label: '19.4.13 заболевание радиационно обусловленное получено при исполнении обязанностей военной службы (служебных обязанностей) в связи с непосредственным участием в действиях подразделений особого риска',
    id: 'f19413',
    exclude: true,
    value: 13
  },
  f_19_4_14: {
    label: '19.4.14 инвалидность с детства вследствие ранения (контузии, увечья), связанного с боевыми действиями в период Великой Отечественной войны 1941-1945 годов',
    id: 'f19414',
    exclude: true,
    value: 14
  },
  f_19_4_15: {
    label: '19.4.15 заболевание (ранение, контузия, увечье), полученное лицом, обслуживавшим действующие воинские части Вооруженных Сил СССР и Вооруженных Сил Российской Федерации, находившиеся на территориях других государств в период ведения в этих государствах боевых действий',
    id: 'f19415',
    exclude: true,
    value: 15
  },
  f_19_4_16: {
    label: '19.4.16 иные причины, установленные законодательством Российской Федерации (указать):',
    id: 'f19416',
    exclude: true,
    value: 16
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
    exclude: true,
    value: 17
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
    entry: true,
    component: new EntryComponentConstructor(DatePickerD2Component, [
    ], {
      formControlName: 'f_19_7',
      id: 'f197',
      validators: {
      },
      errors: {}
    }),
    exclude: true,
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
    component: new EntryComponentConstructor(InputI1Component, '', {
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
    exclude: true,
  },
  f_20_2: {
    label: '20.2 Уровень в образовательной организации',
    id: 'f202',
    exclude: true,
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
    component: new EntryComponentConstructor(TextareaT1Component, '', {
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
    exclude: true,
  },

  f_21_1: {
    label: '21.1 основная профессия (специальность, должность)',
    id: 'f211',
    type: 'entry',
    component: new EntryComponentConstructor(InputI2Component, '', {
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
    exclude: true,
  },
  f_21_2: {
    label: '21.2 квалификация (класс, разряд, категория, звание)',
    id: 'f212',
    type: 'entry',
    component: new EntryComponentConstructor(InputI2Component, '', {
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
    exclude: true,
  },
  f_21_3: {
    label: '21.3 стаж работы',
    id: 'f213',
    type: 'entry',
    component: new EntryComponentConstructor(InputI2Component, '', {
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
    exclude: true,
  },
  f_21_4: {
    label: '21.4 выполняемая работа на момент направления на медико-социальную экспертизу с указанием профессии (специальности, должности)',
    id: 'f214',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
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
    exclude: true,
  },
  f_21_5: {
    label: '21.5 условия и характер выполняемого труда',
    id: 'f215',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
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
    exclude: true,
  },
  f_21_6: {
    label: '21.6 место работы (наименование организации)',
    id: 'f216',
    type: 'entry',
    component: new EntryComponentConstructor(InputI2Component, '', {
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
    exclude: true,
  },
  f_21_7: {
    label: '21.7 адрес места работы',
    id: 'f217',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
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
    exclude: true,
  },

  f_22: {
    label: '22. Наблюдается в медицинской организации',
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

  f_25_t_h: {
    exclude: true,
    data: {
      head: {
        col_1: {
          text: '№ п/п',
          width: '10%'
        },
        col_2: {
          text: 'Даты',
          width: '30%',
        },
        col_3: {
          text: 'Диагноз',
          width: '50%',
        },
        col_4: {
          text: 'Действия',
          width: '10%'
        },
      },
    }
  },

  f_25: {
    exclude: true,
    type: 'entry',
    component: new EntryComponentConstructor(TableRowTbR1EntryComponent, {}, {
      multiple: true,
      formControlName: 'f_25',
      body: {
        col_2: {
          f_25_1: {
            label: 'Дата начала временной нетрудоспособности',
            validators: {
              pattern: {
                body: Validators.pattern('[[12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])]*'),
                errorText: 'Дата указана некорретно'
              }
            },
            errors: {}
          },
          f_25_2: {
            label: 'Дата окончания временной нетрудоспособности',
            validators: {
              pattern: {
                body: Validators.pattern('[[12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])]*'),
                errorText: 'Дата указана некорретно'
              }
            },
            errors: {}
          },
          f_25_3: {
            label: 'Число месяцев и дней временной нетрудоспособности',
            validators: {
              pattern: {
                body: Validators.pattern('[0-9 ]*'),
                errorText: 'Поле заполенно некорретно'
              }
            },
            errors: {}
          },
        },
        col_3: {
          f_25_4: {
            label: 'Диагноз',
            validators: {
              pattern: {
                body: Validators.pattern('[а-яА-Я0-9a-zA-Z,. ]*'),
                errorText: 'Поле заполенно некорретно'
              },
              required: {
                body: Validators.required,
                errorText: 'Поле не заполнено'
              }
            },
            errors: {}
          }
        }
      }
    }),
    iterator: {
      label: TableRowTr1LabelIterator,
      error: TableRowTr1ErrorIterator
    }
  },
  f_25_1: {
    validators: {
    },
    errors: {},
    value: false
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

  f_26_programm_number: {
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_26_protol_number: {
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_26: {
    validators: {
    },
    errors: {}
  },
  f_26_1: {
    label: '26.1 востановление нарушенных функций',
    id: 'f261',
    name: 'f_26_1',
    exclude: true,
    value: 1
  },
  f_26_1_i: {
    validators: {
    },
    errors: {},
  },
  f_26_1_1: {
    label: '26.1.1 полное',
    id: 'f2611',
    exclude: true,
    value: 1
  },
  f_26_1_2: {
    label: '26.1.2 частичное',
    id: 'f2612',
    exclude: true,
    value: 2
  },
  f_26_1_3: {
    label: '26.1.3 положительные результаты отсутствуют',
    id: 'f2613',
    exclude: true,
    value: 3
  },

  f_26_2: {
    label: '26.2 достижение компенсации утраченных либо отсутствующих функций',
    id: 'f262',
    name: 'f_26_2',
    exclude: true,
    value: 2
  },
  f_26_2_i: {
    validators: {
    },
    errors: {},
  },
  f_26_2_1: {
    label: '26.2.1 полное',
    id: 'f2621',
    exclude: true,
    value: 1
  },
  f_26_2_2: {
    label: '26.2.2 частичное',
    id: 'f2622',
    exclude: true,
    value: 2
  },
  f_26_2_3: {
    label: '26.2.3 положительные результаты отсутствуют',
    id: 'f2623',
    exclude: true,
    value: 3
  },

  f_27_1: {
    label: '27.1 рост',
    id: 'f271',
    col: 3,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Рост указан некорретно'
      }
    },
    errors: {}
  },
  f_27_2: {
    label: '27.2 вес',
    id: 'f272',
    col: 3,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Вес указан некорретно'
      }
    },
    errors: {}
  },
  f_27_3: {
    label: '27.3 индекс массы тела',
    id: 'f273',
    col: 3,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Индекс массы тела указан некорретно'
      }
    },
    errors: {}
  },
  f_27_4: {
    label: '27.4 телосложение',
    id: 'f274',
    col: 3,
    validators: {
      pattern: {
        body: Validators.pattern('[a-z ]*'),
        errorText: 'Телосложение заполнено некорретно'
      }
    },
    errors: {}
  },
  f_27_5: {
    label: '27.5 суточный объем физиологических отправлений (мл)',
    id: 'f275',
    col: 3,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },
  f_27_6: {
    id: 'f276',
    label: '27.6 объем талии/бедер',
    col: 6,
    exclude: true,
  },
  f_27_6_1: {
    label: 'объем талии',
    id: 'f2761',
    col: 6,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Объем указан некорретно'
      }
    },
    errors: {}
  },
  f_27_6_2: {
    label: 'объем бедер',
    id: 'f2762',
    col: 6,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Объем указан некорретно'
      }
    },
    errors: {}
  },
  f_27_7: {
    label: '27.7 масса тела при рождении',
    id: 'f277',
    col: 3,
    validators: {
      pattern: {
        body: Validators.pattern('[0-9 ]*'),
        errorText: 'Масса указана некорретно'
      }
    },
    errors: {}
  },
  f_27_8: {
    label: '27.8 физическое развитие',
    id: 'f278',
    col: 12,
    validators: {
      pattern: {
        body: Validators.pattern('[a-z ]*'),
        errorText: 'Поле заполнено некорретно'
      }
    },
    errors: {}
  },

  f_28: {
    validators: {
      pattern: {
        body: Validators.pattern('[а-яА-Я0-9 ]*'),
        errorText: 'Состояние здоровья указано некорретно'
      }
    },
    errors: {}
  },
  f_29: {
    validators: {
      pattern: {
        body: Validators.pattern('[а-яА-Я0-9 ]*'),
        errorText: 'Сведения указаны некорретно'
      }
    },
    errors: {}
  },

  f_30_1: {
    label: '30.1 основное заболевание',
    id: 'f301',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, {
    }, {
      className: 'form-control',
      id: 'f301',
      rows: 12,
      formControlName: 'f_30_1',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Основное заболевание указано некорретно'
        },
        required: {
          body: Validators.required,
          errorText: 'Поле не заполнено'
        }
      },
      errors: {}
    }),
    exclude: true,
  },
  f_30_2: {
    label: '30.2 код основного заболевания по МКБ',
    id: 'f302',
    type: 'entry',
    component: new EntryComponentConstructor(InputI2Component, '', {
      className: 'form-control',
      id: 'f302',
      col: 3,
      formControlName: 'f_30_2',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z0-9 ]*'),
          errorText: 'Код указан некорретно'
        }
      },
      errors: {}
    }),
    exclude: true,
  },
  f_30_3: {
    label: '30.3 осложнения основного заболевания',
    id: 'f303',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f303',
      rows: 4,
      formControlName: 'f_30_3',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Осложнения заполнены некорретно'
        }
      },
      errors: {}
    }),
    exclude: true,
  },
  f_30_4: {
    label: '30.4 сопутствующие заболевания',
    id: 'f304',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f304',
      rows: 4,
      formControlName: 'f_30_4',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Сопутствующие заболевания заполнены некорретно'
        }
      },
      errors: {}
    }),
    exclude: true,
  },
  f_30_5: {
    label: '30.5 коды сопутствующих заболеваний по МКБ',
    id: 'f305',
    type: 'entry',
    component: new EntryComponentConstructor(InputI2Component, '', {
      className: 'form-control',
      id: 'f305',
      col: 12,
      formControlName: 'f_30_5',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Коды заполнены некорретно'
        }
      },
      errors: {}
    }),
    exclude: true,
  },
  f_30_6: {
    label: '30.6 осложнения сопутствующих заболеваний',
    id: 'f306',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f306',
      rows: 12,
      formControlName: 'f_30_6',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Осложнения заполнены некорретно'
        }
      },
      errors: {}
    }),
    exclude: true,
  },

  f_31: {
    label: '31 Клинический прогноз',
    id: 'f31',
    validators: {
    },
    errors: {}
  },
  f_31_1: {
    label: '31.1 благоприятный',
    id: 'f311',
    exclude: true,
    value: 1
  },
  f_31_2: {
    label: '31.2 относительно благоприятный',
    id: 'f312',
    exclude: true,
    value: 2
  },
  f_31_3: {
    label: '31.3 сомнительный (неопределенный)',
    id: 'f313',
    exclude: true,
    value: 3
  },
  f_31_4: {
    label: '31.4 неблагоприятный (нужное подчеркнуть)',
    id: 'f314',
    exclude: true,
    value: 4
  },
  f_32: {
    label: '32 Реабилитационный потенциал',
    id: 'f32',
    validators: {
    },
    errors: {}
  },
  f_32_1: {
    label: '32.1 высокий',
    id: 'f321',
    exclude: true,
    value: 1
  },
  f_32_2: {
    label: '32.2 удовлетворительный',
    id: 'f322',
    exclude: true,
    value: 2
  },
  f_32_3: {
    label: '32.3 низкий',
    id: 'f323',
    exclude: true,
    value: 3
  },
  f_32_4: {
    label: '32.4 отсутствует (нужное подчеркнуть)',
    id: 'f324',
    exclude: true,
    value: 4
  },
  f_33: {
    label: '33 Реабилитационный прогноз',
    id: 'f33',
    validators: {
    },
    errors: {}
  },
  f_33_1: {
    label: '33.1 благоприятный',
    id: 'f331',
    exclude: true,
    value: 1
  },
  f_33_2: {
    label: '33.2 относительно благоприятный',
    id: 'f332',
    exclude: true,
    value: 2
  },
  f_33_3: {
    label: '33.3 сомнительный (неопределенный)',
    id: 'f333',
    exclude: true,
    value: 3
  },
  f_33_4: {
    label: '33.4 неблагоприятный (нужное подчеркнуть)',
    id: 'f334',
    exclude: true,
    value: 4
  },

  f_34: {
    label: '34 Рекомендуемые мероприятия по медицинской реабилитации или абилитации',
    id: 'f34',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f34',
      rows: 12,
      formControlName: 'f_34',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Мероприятия заполнены некорретно'
        }
      },
      errors: {}
    }),
    exclude: true,
  },
  f_35: {
    label: '35 Рекомендуемые мероприятия по реконструктивной хирургии',
    id: 'f35',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f35',
      rows: 6,
      formControlName: 'f_35',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Мероприятия заполнены некорретно'
        }
      },
      errors: {}
    }),
    exclude: true,
  },
  f_36: {
    label: '36 Рекомендуемые мероприятия по протезированию и ортезированию',
    id: 'f36',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f36',
      rows: 4,
      formControlName: 'f_36',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Мероприятия заполнены некорретно'
        }
      },
      errors: {}
    }),
    exclude: true,
  },
  f_37: {
    label: '37 Санаторно-курортное лечение',
    id: 'f37',
    type: 'entry',
    component: new EntryComponentConstructor(TextareaT1Component, '', {
      className: 'form-control',
      id: 'f37',
      rows: 2,
      formControlName: 'f_37',
      validators: {
        pattern: {
          body: Validators.pattern('[a-zA-Z ]*'),
          errorText: 'Лечение заполнено некорретно'
        }
      },
      errors: {}
    }),
    exclude: true,
  },
};
