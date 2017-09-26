"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var password_strength_bar_component_1 = require("../../../../../../main/webapp/app/account/password/password-strength-bar.component");
describe('Component Tests', function () {
    describe('PasswordStrengthBarComponent', function () {
        var comp;
        var fixture;
        beforeEach(testing_1.async(function () {
            testing_1.TestBed.configureTestingModule({
                declarations: [password_strength_bar_component_1.PasswordStrengthBarComponent]
            }).overrideTemplate(password_strength_bar_component_1.PasswordStrengthBarComponent, '')
                .compileComponents();
        }));
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(password_strength_bar_component_1.PasswordStrengthBarComponent);
            comp = fixture.componentInstance;
        });
        describe('PasswordStrengthBarComponents', function () {
            it('should initialize with default values', function () {
                expect(comp.measureStrength('')).toBe(0);
                expect(comp.colors).toEqual(['#F00', '#F90', '#FF0', '#9F0', '#0F0']);
                expect(comp.getColor(0).idx).toBe(1);
                expect(comp.getColor(0).col).toBe(comp.colors[0]);
            });
            it('should increase strength upon password value change', function () {
                expect(comp.measureStrength('')).toBe(0);
                expect(comp.measureStrength('aa')).toBeGreaterThanOrEqual(comp.measureStrength(''));
                expect(comp.measureStrength('aa^6')).toBeGreaterThanOrEqual(comp.measureStrength('aa'));
                expect(comp.measureStrength('Aa090(**)')).toBeGreaterThanOrEqual(comp.measureStrength('aa^6'));
                expect(comp.measureStrength('Aa090(**)+-07365')).toBeGreaterThanOrEqual(comp.measureStrength('Aa090(**)'));
            });
            it('should change the color based on strength', function () {
                expect(comp.getColor(0).col).toBe(comp.colors[0]);
                expect(comp.getColor(11).col).toBe(comp.colors[1]);
                expect(comp.getColor(22).col).toBe(comp.colors[2]);
                expect(comp.getColor(33).col).toBe(comp.colors[3]);
                expect(comp.getColor(44).col).toBe(comp.colors[4]);
            });
        });
    });
});
//# sourceMappingURL=password-strength-bar.component.spec.js.map