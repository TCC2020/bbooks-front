import {NumbersOnlyInputDirective} from './numbers-only-input.directive';

describe('NumbersOnlyInputDirective', () => {
    it('should create an instance', () => {
        const directive = new NumbersOnlyInputDirective({nativeElement   : {} } );
        expect(directive).toBeTruthy();
    });
});
