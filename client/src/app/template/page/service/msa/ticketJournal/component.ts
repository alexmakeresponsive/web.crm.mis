import { Component, OnInit } from '@angular/core';

import tableHeaderData from './part/tableHeader';

@Component({
  selector: 'page-action-msa-journal',
  templateUrl: './component.html',
})
export class PageServiceMsaTicketJournalComponent {
  tableHeader = tableHeaderData;
  tableBody = [];
  dataIsFetched:boolean = false;
}
