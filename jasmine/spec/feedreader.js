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

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('each feed has a URL', function() {
      allFeeds.forEach(function(feed) {
        // Check that each feed is defined, has a url defined, and is not empty.
        expect(feed).toBeDefined();
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('each feed has a name', function() {
      allFeeds.forEach(function(feed) {
        // Check that each feed is defined, has a name defined, and is not empty.
        expect(feed).toBeDefined();
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });

  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', function() {

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('the menu should be hidden by default', function() {
      // Check that the the elements are present, and that the class shows the menu to be hidden.
      expect($('body').toBeDefined);
      expect($('body')[0].toBeDefined);
      expect($('body')[0].classList).toContain('menu-hidden');
    });

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
     it('clicking the menu should properly display and hide', function() {
       // check that the elements are present.
       expect($('body').toBeDefined);
       expect($('body')[0].toBeDefined);
       // Click it once, it shows
       $('.menu-icon-link').trigger('click');
       expect($('body')[0].classList).not.toContain('menu-hidden');
       // Click it again, it's gone.
       $('.menu-icon-link').trigger('click');
       expect($('body')[0].classList).toContain('menu-hidden');
     });
   });

  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    // Select feed 3 to load, since it forces loading a new feed.
    beforeEach(function(done) {
      loadFeed(3, function() {
        done();
      });
    });
    // Restore to original feed (making tests independent)
    afterEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    // Check that each feed is defined, and has an entry.
    it('should have .entry element', function(done) {
      expect($('.feed')).toBeDefined();
      expect($('.feed').find('.entry-link').length).toBeGreaterThan(0);
      console.log($('.feed').find('.entry-link'));
      done();
    });
  });

  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    // The web page loads with feed 0
    var contentFeed1, contentFeed2;

    // Select feed 1 as the base comparison
    beforeEach(function(done) {
      loadFeed(1, function() {
        contentFeed1 = $('.feed').find('.entry-link')[0];
        done();
      });
    });

    // Select 2 as the changed feed.
    beforeEach(function(done) {
      loadFeed(2, function() {
        contentFeed2 = $('.feed').find('.entry-link')[0];
        done();
      });
    });

    // Restore to feed 0 (default)
    // afterEach(function(done) {
    //   loadFeed(0, function() {
    //     done();
    //   });
    // });

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('should change content when feed changes', function(done) {
      // Both feeds must have a value.
      expect(contentFeed1).toBeDefined();
      expect(contentFeed2).toBeDefined();
      // The HTML for the feeds must be different.
      expect(contentFeed2.innerHTML).not.toEqual(contentFeed1.innerHTML);
      // The links for the feeds must be different as well.
      expect(contentFeed2.getAttribute('href')).not.toEqual(contentFeed1.getAttribute('href'));
      done();
    });
  });


// Test that clicking in the menu results in the same feed as the loadFeed() call
  describe('Menu feed selection.', function() {
    var contentFeed1, contentFeed2;

    beforeEach(function(done) {
      // Bring up menu.
      $('.menu-icon-link').trigger('click');
      // Click on second feed.
      $('.feed-list').trigger('click', 'a');
      $('.feed-list').click();
      console.log("BE 1");
      contentFeed1 = $('.feed').find('.entry-link')[0];

      loadFeed(1, function() {
        console.log("BE 2");
        contentFeed2 = $('.feed').find('.entry-link')[0];
        done();
      });
    });

    // Restore to feed 0 (default)
    // afterEach(function(done) {
    //   loadFeed(0, function() {
    //     done();
    //   });
    // });

    it('Correct feed is loaded on click and menu is gone' , function(done) {
      expect($('body')[0].classList).toContain('menu-hidden');
      expect(contentFeed1).toEqual(contentFeed2);
      done();
    });
  });

}());
