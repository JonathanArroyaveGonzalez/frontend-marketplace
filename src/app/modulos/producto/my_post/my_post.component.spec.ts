/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { My_postComponent } from './my_post.component';

describe('My_postComponent', () => {
  let component: My_postComponent;
  let fixture: ComponentFixture<My_postComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ My_postComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(My_postComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
