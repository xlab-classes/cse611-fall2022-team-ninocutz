import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserModel } from 'src/app/core/models/user.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('usersTable') usersTable: Table;
  users: UserModel[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.usersTable.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }

  getAllUsers() {
    this.dataService.getAllUsers().subscribe((data) => {
      this.users = data.users;
    });
  }

  deleteUser(user: UserModel) {}
}
