describe("adding an item", () => {

    beforeEach(function() {
        items = [{
            id: 'item'+ 0,
            detail: 'apple',
            money: '10'
        }]
      });
    it('should add an item to items when its valid', function() {
        item_text = {value: 'orange'};
        item_amount = {value: '3'};

        addItems(items, item_text, item_amount, 1);
        var actual = items;
        var expected = [{
            id: 'item'+ 0,
            detail: 'apple',
            money: '10'
        }, 
        {
            id: 'item'+ 1,
            detail: 'orange',
            money: '3'
        }];

        expect(actual.toString()).toBe(expected.toString());
    })
})