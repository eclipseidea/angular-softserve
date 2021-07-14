import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableRowComponent } from './user-table-row.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UserTableRowComponent', () => {
  let component: UserTableRowComponent;
  let fixture: ComponentFixture<UserTableRowComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserTableRowComponent],
    })
    fixture = TestBed.createComponent(UserTableRowComponent);
    component = fixture.componentInstance;
    component.user = {Id:"1"}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
