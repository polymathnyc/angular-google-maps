// spec.js
describe('blank e2e test', function() {

    browser.get('http://localhost:9000/#/');

    it('test', function() {

        //start button text
        var start = element.all(by.css('.test-text'));
        expect(start.get(0).getText()).toBe('lesson 1');

    });

    it('click through', function() {
        //browser.get('http://localhost:9000/#/');
        var ptor = protractor.getInstance();


        /*
        var testMeasurementText = element.all(by.css('.pb-measure-instruction-container__header'));
        expect(testMeasurementText.get(0).getText()).toBe('HERE’S WHAT YOU NEED');

        var measure = element.all(by.css('[ng-click="goToNextPage();"]'));
        expect(measure.count()).toBe(4);
        //ptor.sleep(2000);
        measure.get(2).click();

        //input by MODEL
        var band = element(by.model('data.user.size.measured.band'));
        band.sendKeys('33');
        expect(band.getAttribute('value')).toEqual('33');

        //  ptor.sleep(2000);
        var nextMeasurement = element(by.css('[ng-click="getMeasurementsNextStep();"]'));
        nextMeasurement.click();


        var cup = element(by.model('data.user.size.measured.cup'));
        cup.sendKeys('13');
        expect(cup.getAttribute('value')).toEqual('13');


        //ptor.sleep(2000);
        //click get measurements
        var getMeasurement = element(by.css('[ng-click="measurementsNav();"]'));
        getMeasurement.click();

        //ptor.sleep(2000);
        //test size
        var size_band =  element.all(by.css('.pb-new_size__traditional--band'));
        expect(size_band.get(0).getText()).toBe('34');
        var size_cup =  element.all(by.css('.pb-new_size__traditional--cup'));
        expect(size_cup.get(0).getText()).toBe('E');

        var getRecommendation = element(by.css('[ng-click="goToRecommendations();"]'));

        //ptor.sleep(2000);
        getRecommendation.click();
        expect(getRecommendation.getText()).toBe('SEE YOUR RECOMMENDED BRAS')

*/


    });
});