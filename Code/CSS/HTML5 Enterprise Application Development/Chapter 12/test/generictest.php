<?php
require_once "webtest.php";
/****************************************/
class GenericTest extends WebTest {
    public function testForData() {
        $this->_session->open('http://localhost/html5-book/Chapter%2010/');
		sleep(5); //Wait for AJAX data to load
		$result = $this->_session->element("id", "movies-near-me")->text();
		//May need to change settings to always allow sharing of location
		$this->assertGreaterThan(0, strlen($result));
    }
	public function testForTitle() {
		$this->_session->open('http://localhost/html5-book/Chapter%2010/');
		$result = $this->_session->title();
		$this->assertEquals('Some Title', $result);
	}
}
?>