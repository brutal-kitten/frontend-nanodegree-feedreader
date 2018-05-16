/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */


    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('every object has a URL defined and the URL is not empty ', function() {
            for(let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });

        /*  a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('every object has a name defined and the name is not empty', function() {
            for(let i = 0; i < allFeeds.length; i++) {
                  expect(allFeeds[i].name).toBeDefined();
                  expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });


    /* a new test suite named "The menu" */
    describe('The menu', function() {

        /* a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('element is hidden by default', function() {
              const body = document.querySelector('body');
              expect(body.className).toBe('menu-hidden');
         });

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility when the menu icon is clicked', function() {
               const body = $('body');
               const menuIcon = document.getElementsByClassName('menu-icon-link');
               // After first click menu has to be displayed
               menuIcon[0].click();
               expect(body.hasClass('menu-hidden')).toBe(false);
               // then we click again adn menu has to be hidden
               menuIcon[0].click();
               expect(body.hasClass('menu-hidden')).toBe(true);
          });
    });
    /* a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
             loadFeed(0, function() {
                 done();
             });
         });

         it('there is at least a single .entry element within the .feed container.', function(done) {
             const feed = $('.feed .entry');
             expect(feed.length).toBeGreaterThan(0);
             done();
         });
    });
    /* a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         let contentBeforeLoading;
         let contentAfterLoading;
         const feed = document.querySelector('.feed');

         beforeEach(function(done) {
            // load for the first time and save the content as a text
             loadFeed(1, function() {
                 contentBeforeLoading = feed.innerText;
                 //load  for the second time the next feed and save the content as a text
                 loadFeed(2, function() {
                    contentAfterLoading = feed.innerText;
                    done();
                 });
             });
         });


         it('the content actually changes', function() {
              //check the contents from two different loadind
              expect(contentAfterLoading).not.toBe(contentBeforeLoading);
           });
    });
}());
