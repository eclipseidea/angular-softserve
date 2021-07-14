import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableSectionComponent } from './user-table-section.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SearchFilterPipe} from "../../service/search-filter.pipe";
import {UserService} from "../../service/user/user.service";

describe('UserTableSectionComponent', () => {
  let component: UserTableSectionComponent;
  let fixture: ComponentFixture<UserTableSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserTableSectionComponent,SearchFilterPipe],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
