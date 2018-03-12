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

    /* Test that each feed has a valid URL.that each feed has a URL.
     */
    it('each feed has a URL', function() {
      allFeeds.forEach(function(feed) {
        // Check that each feed is defined
        expect(feed).toBeDefined();
        // Check that it has a URL
        expect(feed.url).toBeDefined();
        // Check that the URL is not empty.
        expect(feed.url.length).not.toBe(0);
      });
    });


    /* Test that each feed has a valid name.
     */
    it('each feed has a name', function() {
      allFeeds.forEach(function(feed) {
        // Check that each feed is defined
        expect(feed).toBeDefined();
        // Check that the name is defined
        expect(feed.name).toBeDefined();
        // Check that the name is not empty.
        expect(feed.name.length).not.toBe(0);
      });
    });
  });

  /* Test suite which describes general menu functionality.
   */
  describe('The menu', function() {

    /* Test that the menu does not show by default.
     */
    it('the menu should be hidden by default', function() {
      // Check that the the elements are present, and that the class shows the menu to be hidden.
      // Check that the page has a body
      expect($('body').toBeDefined);
      // Check that it has a first element.
      expect($('body')[0].toBeDefined);
      // Check that the menu is hidden by default, by checking the class 'menu-hidden'
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* Check that the menu displays once the menu icon is clicked,
     * and that it hides once it is clicked once more. This is done by
     * checking the 'menu-hidden class'
     */
     it('clicking the menu should properly display and hide', function() {
       // check that the body is defined
       expect($('body').toBeDefined);
       // Check that the first element of the body is defined.
       expect($('body')[0].toBeDefined);
       // Issue a click event to the menu
       $('.menu-icon-link').click();
       // Now check that it is shown
       expect($('body').hasClass('menu-hidden')).toBe(false);
       // Issue a second click event to the menu
       $('.menu-icon-link').click();
       // Now check that it is once again hidden.
       expect($('body').hasClass('menu-hidden')).toBe(true);
     });
   });

  /* This test suite checks that loading feeds works properly.
   */
  describe('Initial Entries', function() {
    /* Test that the loading feeds works properly. The logic of this test
     * is to first load a different other than the original one, to verify
     * we are diong something, and then restore it at the end for other test
     * cases.
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
      // Check that there is a feed.
      expect($('.feed')).toBeDefined();
      // Check that there is an entry within the feed.
      expect($('.feed .entry')).toBeDefined();
      // Check that the feed has data.
      expect($('.feed .entry').length).toBeGreaterThan(0);
      done();
    });
  });

  /* This test suite checks that selecting a new feed results in different data
   * being loaded
   */
  describe('New Feed Selection', function() {
    // Save content for various feeds for comparison purposes.
    var contentFeed1, contentFeed2;
    var contentContainer1, contentContainer2;

    // Select feed 1 as the base comparison
    beforeEach(function(done) {
      loadFeed(1, function() {
        // Save the content for feed 1, and containing element (for href)
        contentFeed1 = $('.feed .entry');
        contentContainer1 = $('.feed .entry-link');
        done();
      });
    });

    // Select 2 as the changed feed.
    beforeEach(function(done) {
      loadFeed(2, function() {
        // Save the content for feed 2, and containing element (for href)
        contentFeed2 = $('.feed .entry');
        contentContainer2 = $('.feed .entry-link');
        done();
      });
    });

    // Restore to feed 0 (default)
    afterEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    /* This test case verifies that when a new feed is selected,
     * the content changes. It does so by selecting two new feeds
     * other than the default feed of 0, to ensure that we're not using
     * the default feed.
     */
    it('should change content when feed changes', function(done) {
      // Both feeds must have a value.
      expect(contentFeed1).toBeDefined();
      expect(contentFeed2).toBeDefined();
      // The HTML for the feeds must be different.
      expect(contentFeed2[0].innerHTML).not.toEqual(contentFeed1[0].innerHTML);
      // The links for the feeds must be different as well.
      expect(contentContainer2[0].getAttribute('href')).not.toEqual(contentContainer1[0].getAttribute('href'));
      done();
    });
  });

  /* This test checks that clicking a menu item loads up the correct feed,
   * and that the menu disappears once it is clicked.
   */
  describe('Menu feed selection.', function() {
    var contentFeed1, contentFeed2;
    var contentContainer1, contentContainer2;

    beforeEach(function(done) {
      // Bring up menu.
      $('.menu-icon-link').click();
      // Click on second feed.
      $('.feed-list li a')[1].click();
      setTimeout(function() {
        contentFeed1 = $('.feed .entry')[0];

        // Content1 will ONLY match content2 if the click resulted in loadFeed(1) to be called
        loadFeed(1, function() {
          contentFeed2 = $('.feed .entry')[0];
          done();
        }, 2000);
      });
    });

    // Restore to feed 0 (default)
    afterEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('Correct feed is loaded on click and menu is gone' , function(done) {
      expect($('body').hasClass('menu-hidden')).toBe(true);
      expect(contentFeed1).toBeDefined;
      expect(contentFeed1.length).not.toBe(0);
      expect(contentFeed1).toEqual(contentFeed2);
      done();
    });
  });
}());
