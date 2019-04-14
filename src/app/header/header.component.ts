import {Component, OnInit} from '@angular/core';
import {Select} from 'ngrx-actions/dist';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {LogOut} from '../_store/actions/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select('auth.authenticated')
  authenticated$: Observable<boolean>;

  constructor(private _store: Store<any>) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this._store.dispatch(new LogOut());
  }

}
