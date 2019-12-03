import { StructuresModule } from './structure.module';

describe('StructuresModule', () => {
    let blankPageModule: StructuresModule;

    beforeEach(() => {
        blankPageModule = new StructuresModule();
    });

    it('should create an instance', () => {
        expect(blankPageModule).toBeTruthy();
    });
});
