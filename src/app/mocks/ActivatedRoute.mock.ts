export class MockActivatedRoute {
    parent: any;
    params: any;
    snapshot = {};

    constructor(options) {
        this.parent = options.parent;
        this.params = options.params;
    }
}