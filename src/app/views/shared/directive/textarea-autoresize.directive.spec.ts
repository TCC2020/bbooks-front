import {TextareaAutoresizeDirective} from './textarea-autoresize.directive';

describe('TextareaAutoresizeDirective', () => {
    it('should create an instance', () => {
        const directive = new TextareaAutoresizeDirective({nativeElement: {}});
        expect(directive).toBeTruthy();
    });
});
