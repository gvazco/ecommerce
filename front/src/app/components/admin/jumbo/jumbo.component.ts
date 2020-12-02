import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.css']
})
export class JumboComponent implements OnInit {

  public identity;

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }

}
