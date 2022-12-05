import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { UserModel } from 'src/app/core/models/user.model';
import { DataService } from 'src/app/core/services/data.service';
import { AddUserComponent } from '../add-user/add-user.component';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DialogService, MessageService],
})
export class UsersComponent implements OnInit {
  @ViewChild('usersTable') usersTable: Table;
  users: UserModel[] = [];
  token: string;

  constructor(
    private dataService: DataService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.token = this.localStorageService.getLocalStorage('token');
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

  addUser() {
    const ref = this.dialogService.open(AddUserComponent, {
      header: 'Add User',
      width: '70%',
    });

    ref.onClose.subscribe((res) => {
      if (res) {
        this.getAllUsers();
        this.showSuccess('User added');
      }
    });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  deleteUser(user: UserModel) {
    this.dataService.deleteUser(user.Id).subscribe(() => {
      this.getAllUsers();
      this.showSuccess('User deleted');
    });
  }

  disableDelete(user: UserModel) {
    const jwt = this.getDecodedAccessToken();
    const id = jwt.userId;

    return user.Id == id;
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(this.token);
    } catch (Error) {
      return null;
    }
  }

  getDeleteUserDivId(user: UserModel): string {
    return 'deleteUser-' + user.FirstName;
  }
}
