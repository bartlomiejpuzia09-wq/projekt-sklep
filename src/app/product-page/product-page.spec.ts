import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, convertToParamMap, ActivatedRoute } from '@angular/router';
import { routes } from '../app.routes';
import { ProductPageComponent } from './product-page';

describe('ProductPage', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPageComponent],
      providers: [
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: 'keyboard' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
