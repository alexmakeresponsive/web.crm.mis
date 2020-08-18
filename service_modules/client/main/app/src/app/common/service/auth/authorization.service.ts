import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthorizationService  {
  private message = {
    error: "Недостаточно прав для просмотра данного раздела",
    info:  "Раздел доступен только для просмотра",
  };

  RoleList;

  AuthorizationList = {
    'PageServiceMsaTicketComponent': {
      roleList: ['msa_user'],
      messageList: {
        error: {
          message: this.message.error
        },
        info: {
          message: this.message.info
        }
      }
    },
    'PageServiceMsaTicketResultComponent': {
      roleList: ['msa_user'],
      messageList: {
        error: {
          message: this.message.error
        },
        info: {
          message: this.message.info
        }
      }
    },
    'PageServiceMsaTicketJournalComponent': {
      roleList: ['msa_user'],
      messageList: {
        error: {
          message: this.message.error
        },
        info: {
          message: this.message.info
        }
      }
    },
    'PageServiceMsaRemdJournalComponent': {
      roleList: ['msa_admin'],
      messageList: {
        error: {
          message: this.message.error
        },
        info: {
          message: this.message.info
        }
      }
    },
  };
}
