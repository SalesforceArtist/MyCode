<?php
/* HTML5 Enterprise Application Development 
 * by Nehal Shah & Gabriel Balda 
 * WebTest
 */
require_once "webdriver/__init__.php";
/****************************************/
class WebTest extends PHPUnit_Framework_TestCase {
    protected $_session;
	protected $_web_driver;

    public function __construct() {
    	parent::__construct();
        $_web_driver = new WebDriver();
		//$this->_session = $_web_driver->session('htmlunit', array('javascriptEnabled' => true, 'version' => '3.6'));
		$this->_session = $_web_driver->session('firefox');
		//$this->_session = $_web_driver->session('chrome');
		//$this->_session = $_web_driver->session('safari');
		//$this->_session = $_web_driver->session('internet explorer');
    }

    public function __destruct() {
        $this->_session->close();
        unset($this->_session);
    }
} 
?>