import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {CheckOption, GetOptionsPending, RefreshOptions} from '../../../../_store/actions/options.actions';
import {Select} from 'ngrx-actions/dist';
import {Observable} from 'rxjs';
import {IOption} from '../../../../_store/interfaces/settings.interface';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  @Select('options.collection')
  options$: Observable<IOption[]>;

  constructor(private _route: ActivatedRoute,
              private _store: Store<any>) {
  }

  ngOnInit() {
    this._store.dispatch(new GetOptionsPending(this._route.snapshot.params.roomId));
  }

  onCheckboxClick(item: any): void {
    item.isChecked = !item.isChecked;

    this._store.dispatch(new CheckOption(item));
  }

  onRefreshClick(): void {
    this._store.dispatch(new RefreshOptions());
  }

}
