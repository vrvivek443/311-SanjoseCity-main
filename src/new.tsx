import React from "react";
import "./App.css";
import logo from "./assets/Main-Page-Logo.png";

function App() {
  return (
   <div className="wrapper">
		
		<div className="sidebar-wrapper" data-simplebar="true">
			<div className="sidebar-header">
				<div>
					<img src="assets/images/logo-icon.png" className="logo-icon" alt="logo icon"/>
				</div>
				<div>
					<h4 className="logo-text">Rocker</h4>
				</div>
				<div className="toggle-icon ms-auto"><i className='bx bx-arrow-back'></i>
				</div>
			 </div>
			
			<ul className="metismenu" id="menu">
				<li>
					<a href="javascript:;" className="has-arrow">
						<div className="parent-icon"><i className='bx bx-home-alt'></i>
						</div>
						<div className="menu-title">Dashboard</div>
					</a>
					<ul>
						<li> <a href="index.html"><i className='bx bx-radio-circle'></i>Default</a>
						</li>
						<li> <a href="index2.html"><i className='bx bx-radio-circle'></i>Alternate</a>
						</li>
						<li> <a href="index3.html"><i className='bx bx-radio-circle'></i>Graphical</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;" className="has-arrow">
						<div className="parent-icon"><i className="bx bx-category"></i>
						</div>
						<div className="menu-title">Application</div>
					</a>
					<ul>
						<li> <a href="app-emailbox.html"><i className='bx bx-radio-circle'></i>Email</a>
						</li>
						<li> <a href="app-chat-box.html"><i className='bx bx-radio-circle'></i>Chat Box</a>
						</li>
						<li> <a href="app-file-manager.html"><i className='bx bx-radio-circle'></i>File Manager</a>
						</li>
						<li> <a href="app-contact-list.html"><i className='bx bx-radio-circle'></i>Contatcs</a>
						</li>
						<li> <a href="app-to-do.html"><i className='bx bx-radio-circle'></i>Todo List</a>
						</li>
						<li> <a href="app-invoice.html"><i className='bx bx-radio-circle'></i>Invoice</a>
						</li>
						<li> <a href="app-fullcalender.html"><i className='bx bx-radio-circle'></i>Calendar</a>
						</li>
					</ul>
				</li>
				<li className="menu-label">UI Elements</li>
				<li>
					<a href="widgets.html">
						<div className="parent-icon"><i className='bx bx-cookie'></i>
						</div>
						<div className="menu-title">Widgets</div>
					</a>
				</li>
				<li>
					<a href="javascript:;" className="has-arrow">
						<div className="parent-icon"><i className='bx bx-cart'></i>
						</div>
						<div className="menu-title">eCommerce</div>
					</a>
					<ul>
						<li> <a href="ecommerce-products.html"><i className='bx bx-radio-circle'></i>Products</a>
						</li>
						<li> <a href="ecommerce-products-details.html"><i className='bx bx-radio-circle'></i>Product Details</a>
						</li>
						<li> <a href="ecommerce-add-new-products.html"><i className='bx bx-radio-circle'></i>Add New Products</a>
						</li>
						<li> <a href="ecommerce-orders.html"><i className='bx bx-radio-circle'></i>Orders</a>
						</li>
					</ul>
				</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"><i className='bx bx-bookmark-heart'></i>
						</div>
						<div className="menu-title">Components</div>
					</a>
					<ul>
						<li> <a href="component-alerts.html"><i className='bx bx-radio-circle'></i>Alerts</a>
						</li>
						<li> <a href="component-accordions.html"><i className='bx bx-radio-circle'></i>Accordions</a>
						</li>
						<li> <a href="component-badges.html"><i className='bx bx-radio-circle'></i>Badges</a>
						</li>
						<li> <a href="component-buttons.html"><i className='bx bx-radio-circle'></i>Buttons</a>
						</li>
						<li> <a href="component-cards.html"><i className='bx bx-radio-circle'></i>Cards</a>
						</li>
						<li> <a href="component-carousels.html"><i className='bx bx-radio-circle'></i>Carousels</a>
						</li>
						<li> <a href="component-list-groups.html"><i className='bx bx-radio-circle'></i>List Groups</a>
						</li>
						<li> <a href="component-media-object.html"><i className='bx bx-radio-circle'></i>Media Objects</a>
						</li>
						<li> <a href="component-modals.html"><i className='bx bx-radio-circle'></i>Modals</a>
						</li>
						<li> <a href="component-navs-tabs.html"><i className='bx bx-radio-circle'></i>Navs & Tabs</a>
						</li>
						<li> <a href="component-navbar.html"><i className='bx bx-radio-circle'></i>Navbar</a>
						</li>
						<li> <a href="component-paginations.html"><i className='bx bx-radio-circle'></i>Pagination</a>
						</li>
						<li> <a href="component-popovers-tooltips.html"><i className='bx bx-radio-circle'></i>Popovers & Tooltips</a>
						</li>
						<li> <a href="component-progress-bars.html"><i className='bx bx-radio-circle'></i>Progress</a>
						</li>
						<li> <a href="component-spinners.html"><i className='bx bx-radio-circle'></i>Spinners</a>
						</li>
						<li> <a href="component-notifications.html"><i className='bx bx-radio-circle'></i>Notifications</a>
						</li>
						<li> <a href="component-avtars-chips.html"><i className='bx bx-radio-circle'></i>Avatrs & Chips</a>
						</li>
					</ul>
				</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"><i className="bx bx-repeat"></i>
						</div>
						<div className="menu-title">Content</div>
					</a>
					<ul>
						<li> <a href="content-grid-system.html"><i className='bx bx-radio-circle'></i>Grid System</a>
						</li>
						<li> <a href="content-typography.html"><i className='bx bx-radio-circle'></i>Typography</a>
						</li>
						<li> <a href="content-text-utilities.html"><i className='bx bx-radio-circle'></i>Text Utilities</a>
						</li>
					</ul>
				</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"> <i className="bx bx-donate-blood"></i>
						</div>
						<div className="menu-title">Icons</div>
					</a>
					<ul>
						<li> <a href="icons-line-icons.html"><i className='bx bx-radio-circle'></i>Line Icons</a>
						</li>
						<li> <a href="icons-boxicons.html"><i className='bx bx-radio-circle'></i>Boxicons</a>
						</li>
						<li> <a href="icons-feather-icons.html"><i className='bx bx-radio-circle'></i>Feather Icons</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="form-froala-editor.html">
						<div className="parent-icon"><i className='bx bx-code-alt'></i>
						</div>
						<div className="menu-title">Froala Editor</div>
					</a>
				</li>
				<li className="menu-label">Forms & Tables</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"><i className='bx bx-message-square-edit'></i>
						</div>
						<div className="menu-title">Forms</div>
					</a>
					<ul>
						<li> <a href="form-elements.html"><i className='bx bx-radio-circle'></i>Form Elements</a>
						</li>
						<li> <a href="form-input-group.html"><i className='bx bx-radio-circle'></i>Input Groups</a>
						</li>
						<li> <a href="form-radios-and-checkboxes.html"><i className='bx bx-radio-circle'></i>Radios & Checkboxes</a>
						</li>
						<li> <a href="form-layouts.html"><i className='bx bx-radio-circle'></i>Forms Layouts</a>
						</li>
						<li> <a href="form-validations.html"><i className='bx bx-radio-circle'></i>Form Validation</a>
						</li>
						<li> <a href="form-wizard.html"><i className='bx bx-radio-circle'></i>Form Wizard</a>
						</li>
						<li> <a href="form-text-editor.html"><i className='bx bx-radio-circle'></i>Text Editor</a>
						</li>
						<li> <a href="form-file-upload.html"><i className='bx bx-radio-circle'></i>File Upload</a>
						</li>
						<li> <a href="form-date-time-pickes.html"><i className='bx bx-radio-circle'></i>Date Pickers</a>
						</li>
						<li> <a href="form-select2.html"><i className='bx bx-radio-circle'></i>Select2</a>
						</li>
						<li> <a href="form-repeater.html"><i className='bx bx-radio-circle'></i>Form Repeater</a>
						</li>
					</ul>
				</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"><i className="bx bx-grid-alt"></i>
						</div>
						<div className="menu-title">Tables</div>
					</a>
					<ul>
						<li> <a href="table-basic-table.html"><i className='bx bx-radio-circle'></i>Basic Table</a>
						</li>
						<li> <a href="table-datatable.html"><i className='bx bx-radio-circle'></i>Data Table</a>
						</li>
					</ul>
				</li>
				<li className="menu-label">Pages</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"><i className="bx bx-lock"></i>
						</div>
						<div className="menu-title">Authentication</div>
					</a>
					<ul>
						<li><a className="has-arrow" href="javascript:;"><i className='bx bx-radio-circle'></i>Basic</a>
							<ul>
								<li><a href="auth-basic-signin.html" target="_blank"><i className='bx bx-radio-circle'></i>Sign In</a></li>
								<li><a href="auth-basic-signup.html" target="_blank"><i className='bx bx-radio-circle'></i>Sign Up</a></li>
								<li><a href="auth-basic-forgot-password.html" target="_blank"><i className='bx bx-radio-circle'></i>Forgot Password</a></li>
								<li><a href="auth-basic-reset-password.html" target="_blank"><i className='bx bx-radio-circle'></i>Reset Password</a></li>
							</ul>
						</li>
						<li><a className="has-arrow" href="javascript:;"><i className='bx bx-radio-circle'></i>Cover</a>
							<ul>
								<li><a href="auth-cover-signin.html" target="_blank"><i className='bx bx-radio-circle'></i>Sign In</a></li>
								<li><a href="auth-cover-signup.html" target="_blank"><i className='bx bx-radio-circle'></i>Sign Up</a></li>
								<li><a href="auth-cover-forgot-password.html" target="_blank"><i className='bx bx-radio-circle'></i>Forgot Password</a></li>
								<li><a href="auth-cover-reset-password.html" target="_blank"><i className='bx bx-radio-circle'></i>Reset Password</a></li>
							</ul>
						</li>
						<li><a className="has-arrow" href="javascript:;"><i className='bx bx-radio-circle'></i>With Header Footer</a>
							<ul>
								<li><a href="auth-header-footer-signin.html" target="_blank"><i className='bx bx-radio-circle'></i>Sign In</a></li>
								<li><a href="auth-header-footer-signup.html" target="_blank"><i className='bx bx-radio-circle'></i>Sign Up</a></li>
								<li><a href="auth-header-footer-forgot-password.html" target="_blank"><i className='bx bx-radio-circle'></i>Forgot Password</a></li>
								<li><a href="auth-header-footer-reset-password.html" target="_blank"><i className='bx bx-radio-circle'></i>Reset Password</a></li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<a href="user-profile.html">
						<div className="parent-icon"><i className="bx bx-user-circle"></i>
						</div>
						<div className="menu-title">User Profile</div>
					</a>
				</li>
				<li>
					<a href="timeline.html">
						<div className="parent-icon"> <i className="bx bx-video-recording"></i>
						</div>
						<div className="menu-title">Timeline</div>
					</a>
				</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"><i className="bx bx-error"></i>
						</div>
						<div className="menu-title">Errors</div>
					</a>
					<ul>
						<li> <a href="errors-404-error.html" target="_blank"><i className='bx bx-radio-circle'></i>404 Error</a>
						</li>
						<li> <a href="errors-500-error.html" target="_blank"><i className='bx bx-radio-circle'></i>500 Error</a>
						</li>
						<li> <a href="errors-coming-soon.html" target="_blank"><i className='bx bx-radio-circle'></i>Coming Soon</a>
						</li>
						<li> <a href="error-blank-page.html" target="_blank"><i className='bx bx-radio-circle'></i>Blank Page</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="faq.html">
						<div className="parent-icon"><i className="bx bx-help-circle"></i>
						</div>
						<div className="menu-title">FAQ</div>
					</a>
				</li>
				<li>
					<a href="pricing-table.html">
						<div className="parent-icon"><i className="bx bx-diamond"></i>
						</div>
						<div className="menu-title">Pricing</div>
					</a>
				</li>
				<li className="menu-label">Charts & Maps</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"><i className="bx bx-line-chart"></i>
						</div>
						<div className="menu-title">Charts</div>
					</a>
					<ul>
						<li> <a href="charts-apex-chart.html"><i className='bx bx-radio-circle'></i>Apex</a>
						</li>
						<li> <a href="charts-chartjs.html"><i className='bx bx-radio-circle'></i>Chartjs</a>
						</li>
						<li> <a href="charts-highcharts.html"><i className='bx bx-radio-circle'></i>Highcharts</a>
						</li>
					</ul>
				</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"><i className="bx bx-map-alt"></i>
						</div>
						<div className="menu-title">Maps</div>
					</a>
					<ul>
						<li> <a href="map-google-maps.html"><i className='bx bx-radio-circle'></i>Google Maps</a>
						</li>
						<li> <a href="map-vector-maps.html"><i className='bx bx-radio-circle'></i>Vector Maps</a>
						</li>
					</ul>
				</li>
				<li className="menu-label">Others</li>
				<li>
					<a className="has-arrow" href="javascript:;">
						<div className="parent-icon"><i className="bx bx-menu"></i>
						</div>
						<div className="menu-title">Menu Levels</div>
					</a>
					<ul>
						<li> <a className="has-arrow" href="javascript:;"><i className='bx bx-radio-circle'></i>Level One</a>
							<ul>
								<li> <a className="has-arrow" href="javascript:;"><i className='bx bx-radio-circle'></i>Level Two</a>
									<ul>
										<li> <a href="javascript:;"><i className='bx bx-radio-circle'></i>Level Three</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<a href="https://codervent.com/rocker/documentation/index.html" target="_blank">
						<div className="parent-icon"><i className="bx bx-folder"></i>
						</div>
						<div className="menu-title">Documentation</div>
					</a>
				</li>
				<li>
					<a href="https://themeforest.net/user/codervent" target="_blank">
						<div className="parent-icon"><i className="bx bx-support"></i>
						</div>
						<div className="menu-title">Support</div>
					</a>
				</li>
			</ul>
			<!--end navigation-->
		</div>
		<!--end sidebar wrapper -->
		<!--start header -->
		<header>
			<div className="topbar d-flex align-items-center">
				<nav className="navbar navbar-expand gap-3">
					<div className="mobile-toggle-menu"><i className='bx bx-menu'></i>
					</div>

					  <div className="search-bar d-lg-block d-none" data-bs-toggle="modal" data-bs-target="#SearchModal">
					     <a href="avascript:;" className="btn d-flex align-items-center"><i className='bx bx-search'></i>Search</a>
					  </div>

					  <div className="top-menu ms-auto">
						<ul className="navbar-nav align-items-center gap-1">
							<li className="nav-item mobile-search-icon d-flex d-lg-none" data-bs-toggle="modal" data-bs-target="#SearchModal">
								<a className="nav-link" href="avascript:;"><i className='bx bx-search'></i>
								</a>
							</li>
							<li className="nav-item dropdown dropdown-laungauge d-none d-sm-flex">
								<a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="avascript:;" data-bs-toggle="dropdown"><img src="assets/images/county/02.png" width="22" alt="">
								</a>
								<ul className="dropdown-menu dropdown-menu-end">
									<li><a className="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="assets/images/county/01.png" width="20" alt=""><span className="ms-2">English</span></a>
									</li>
									<li><a className="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="assets/images/county/02.png" width="20" alt=""><span className="ms-2">Catalan</span></a>
									</li>
									<li><a className="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="assets/images/county/03.png" width="20" alt=""><span className="ms-2">French</span></a>
									</li>
									<li><a className="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="assets/images/county/04.png" width="20" alt=""><span className="ms-2">Belize</span></a>
									</li>
									<li><a className="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="assets/images/county/05.png" width="20" alt=""><span className="ms-2">Colombia</span></a>
									</li>
									<li><a className="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="assets/images/county/06.png" width="20" alt=""><span className="ms-2">Spanish</span></a>
									</li>
									<li><a className="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="assets/images/county/07.png" width="20" alt=""><span className="ms-2">Georgian</span></a>
									</li>
									<li><a className="dropdown-item d-flex align-items-center py-2" href="javascript:;"><img src="assets/images/county/08.png" width="20" alt=""><span className="ms-2">Hindi</span></a>
									</li>
								</ul>
							</li>
							<li className="nav-item dark-mode d-none d-sm-flex">
								<a className="nav-link dark-mode-icon" href="javascript:;"><i className='bx bx-moon'></i>
								</a>
							</li>

							<li className="nav-item dropdown dropdown-app">
								<a className="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown" href="javascript:;"><i className='bx bx-grid-alt'></i></a>
								<div className="dropdown-menu dropdown-menu-end p-0">
									<div className="app-container p-2 my-2">
									  <div className="row gx-0 gy-2 row-cols-3 justify-content-center p-2">
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/slack.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Slack</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/behance.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Behance</p>
											  </div>
											  </div>
										  </a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												<img src="assets/images/app/google-drive.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Dribble</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/outlook.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Outlook</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/github.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">GitHub</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/stack-overflow.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Stack</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/figma.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Stack</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/twitter.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Twitter</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/google-calendar.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Calendar</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/spotify.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Spotify</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/google-photos.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Photos</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/pinterest.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Photos</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/linkedin.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">linkedin</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/dribble.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Dribble</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/youtube.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">YouTube</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/google.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">News</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/envato.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Envato</p>
											  </div>
											  </div>
											</a>
										 </div>
										 <div className="col">
										  <a href="javascript:;">
											<div className="app-box text-center">
											  <div className="app-icon">
												  <img src="assets/images/app/safari.png" width="30" alt="">
											  </div>
											  <div className="app-name">
												  <p className="mb-0 mt-1">Safari</p>
											  </div>
											  </div>
											</a>
										 </div>
				
									  </div><!--end row-->
				
									</div>
								</div>
							</li>

							<li className="nav-item dropdown dropdown-large">
								<a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#" data-bs-toggle="dropdown"><span className="alert-count">7</span>
									<i className='bx bx-bell'></i>
								</a>
								<div className="dropdown-menu dropdown-menu-end">
									<a href="javascript:;">
										<div className="msg-header">
											<p className="msg-header-title">Notifications</p>
											<p className="msg-header-badge">8 New</p>
										</div>
									</a>
									<div className="header-notifications-list">
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center">
												<div className="user-online">
													<img src="assets/images/avatars/avatar-1.png" className="msg-avatar" alt="user avatar">
												</div>
												<div className="flex-grow-1">
													<h6 className="msg-name">Daisy Anderson<span className="msg-time float-end">5 sec
												ago</span></h6>
													<p className="msg-info">The standard chunk of lorem</p>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center">
												<div className="notify bg-light-danger text-danger">dc
												</div>
												<div className="flex-grow-1">
													<h6 className="msg-name">New Orders <span className="msg-time float-end">2 min
												ago</span></h6>
													<p className="msg-info">You have recived new orders</p>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center">
												<div className="user-online">
													<img src="assets/images/avatars/avatar-2.png" className="msg-avatar" alt="user avatar">
												</div>
												<div className="flex-grow-1">
													<h6 className="msg-name">Althea Cabardo <span className="msg-time float-end">14
												sec ago</span></h6>
													<p className="msg-info">Many desktop publishing packages</p>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center">
												<div className="notify bg-light-success text-success">
													<img src="assets/images/app/outlook.png" width="25" alt="user avatar">
												</div>
												<div className="flex-grow-1">
													<h6 className="msg-name">Account Created<span className="msg-time float-end">28 min
												ago</span></h6>
													<p className="msg-info">Successfully created new email</p>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center">
												<div className="notify bg-light-info text-info">Ss
												</div>
												<div className="flex-grow-1">
													<h6 className="msg-name">New Product Approved <span
												className="msg-time float-end">2 hrs ago</span></h6>
													<p className="msg-info">Your new product has approved</p>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center">
												<div className="user-online">
													<img src="assets/images/avatars/avatar-4.png" className="msg-avatar" alt="user avatar">
												</div>
												<div className="flex-grow-1">
													<h6 className="msg-name">Katherine Pechon <span className="msg-time float-end">15
												min ago</span></h6>
													<p className="msg-info">Making this the first true generator</p>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center">
												<div className="notify bg-light-success text-success"><i className='bx bx-check-square'></i>
												</div>
												<div className="flex-grow-1">
													<h6 className="msg-name">Your item is shipped <span className="msg-time float-end">5 hrs
												ago</span></h6>
													<p className="msg-info">Successfully shipped your item</p>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center">
												<div className="notify bg-light-primary">
													<img src="assets/images/app/github.png" width="25" alt="user avatar">
												</div>
												<div className="flex-grow-1">
													<h6 className="msg-name">New 24 authors<span className="msg-time float-end">1 day
												ago</span></h6>
													<p className="msg-info">24 new authors joined last week</p>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center">
												<div className="user-online">
													<img src="assets/images/avatars/avatar-8.png" className="msg-avatar" alt="user avatar">
												</div>
												<div className="flex-grow-1">
													<h6 className="msg-name">Peter Costanzo <span className="msg-time float-end">6 hrs
												ago</span></h6>
													<p className="msg-info">It was popularised in the 1960s</p>
												</div>
											</div>
										</a>
									</div>
									<a href="javascript:;">
										<div className="text-center msg-footer">
											<button className="btn btn-primary w-100">View All Notifications</button>
										</div>
									</a>
								</div>
							</li>
							<li className="nav-item dropdown dropdown-large">
								<a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <span className="alert-count">8</span>
									<i className='bx bx-shopping-bag'></i>
								</a>
								<div className="dropdown-menu dropdown-menu-end">
									<a href="javascript:;">
										<div className="msg-header">
											<p className="msg-header-title">My Cart</p>
											<p className="msg-header-badge">10 Items</p>
										</div>
									</a>
									<div className="header-message-list">
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center gap-3">
												<div className="position-relative">
													<div className="cart-product rounded-circle bg-light">
														<img src="assets/images/products/11.png" className="" alt="product image">
													</div>
												</div>
												<div className="flex-grow-1">
													<h6 className="cart-product-title mb-0">Men White T-Shirt</h6>
													<p className="cart-product-price mb-0">1 X $29.00</p>
												</div>
												<div className="">
													<p className="cart-price mb-0">$250</p>
												</div>
												<div className="cart-product-cancel"><i className="bx bx-x"></i>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center gap-3">
												<div className="position-relative">
													<div className="cart-product rounded-circle bg-light">
														<img src="assets/images/products/02.png" className="" alt="product image">
													</div>
												</div>
												<div className="flex-grow-1">
													<h6 className="cart-product-title mb-0">Men White T-Shirt</h6>
													<p className="cart-product-price mb-0">1 X $29.00</p>
												</div>
												<div className="">
													<p className="cart-price mb-0">$250</p>
												</div>
												<div className="cart-product-cancel"><i className="bx bx-x"></i>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center gap-3">
												<div className="position-relative">
													<div className="cart-product rounded-circle bg-light">
														<img src="assets/images/products/03.png" className="" alt="product image">
													</div>
												</div>
												<div className="flex-grow-1">
													<h6 className="cart-product-title mb-0">Men White T-Shirt</h6>
													<p className="cart-product-price mb-0">1 X $29.00</p>
												</div>
												<div className="">
													<p className="cart-price mb-0">$250</p>
												</div>
												<div className="cart-product-cancel"><i className="bx bx-x"></i>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center gap-3">
												<div className="position-relative">
													<div className="cart-product rounded-circle bg-light">
														<img src="assets/images/products/04.png" className="" alt="product image">
													</div>
												</div>
												<div className="flex-grow-1">
													<h6 className="cart-product-title mb-0">Men White T-Shirt</h6>
													<p className="cart-product-price mb-0">1 X $29.00</p>
												</div>
												<div className="">
													<p className="cart-price mb-0">$250</p>
												</div>
												<div className="cart-product-cancel"><i className="bx bx-x"></i>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center gap-3">
												<div className="position-relative">
													<div className="cart-product rounded-circle bg-light">
														<img src="assets/images/products/05.png" className="" alt="product image">
													</div>
												</div>
												<div className="flex-grow-1">
													<h6 className="cart-product-title mb-0">Men White T-Shirt</h6>
													<p className="cart-product-price mb-0">1 X $29.00</p>
												</div>
												<div className="">
													<p className="cart-price mb-0">$250</p>
												</div>
												<div className="cart-product-cancel"><i className="bx bx-x"></i>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center gap-3">
												<div className="position-relative">
													<div className="cart-product rounded-circle bg-light">
														<img src="assets/images/products/06.png" className="" alt="product image">
													</div>
												</div>
												<div className="flex-grow-1">
													<h6 className="cart-product-title mb-0">Men White T-Shirt</h6>
													<p className="cart-product-price mb-0">1 X $29.00</p>
												</div>
												<div className="">
													<p className="cart-price mb-0">$250</p>
												</div>
												<div className="cart-product-cancel"><i className="bx bx-x"></i>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center gap-3">
												<div className="position-relative">
													<div className="cart-product rounded-circle bg-light">
														<img src="assets/images/products/07.png" className="" alt="product image">
													</div>
												</div>
												<div className="flex-grow-1">
													<h6 className="cart-product-title mb-0">Men White T-Shirt</h6>
													<p className="cart-product-price mb-0">1 X $29.00</p>
												</div>
												<div className="">
													<p className="cart-price mb-0">$250</p>
												</div>
												<div className="cart-product-cancel"><i className="bx bx-x"></i>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center gap-3">
												<div className="position-relative">
													<div className="cart-product rounded-circle bg-light">
														<img src="assets/images/products/08.png" className="" alt="product image">
													</div>
												</div>
												<div className="flex-grow-1">
													<h6 className="cart-product-title mb-0">Men White T-Shirt</h6>
													<p className="cart-product-price mb-0">1 X $29.00</p>
												</div>
												<div className="">
													<p className="cart-price mb-0">$250</p>
												</div>
												<div className="cart-product-cancel"><i className="bx bx-x"></i>
												</div>
											</div>
										</a>
										<a className="dropdown-item" href="javascript:;">
											<div className="d-flex align-items-center gap-3">
												<div className="position-relative">
													<div className="cart-product rounded-circle bg-light">
														<img src="assets/images/products/09.png" className="" alt="product image">
													</div>
												</div>
												<div className="flex-grow-1">
													<h6 className="cart-product-title mb-0">Men White T-Shirt</h6>
													<p className="cart-product-price mb-0">1 X $29.00</p>
												</div>
												<div className="">
													<p className="cart-price mb-0">$250</p>
												</div>
												<div className="cart-product-cancel"><i className="bx bx-x"></i>
												</div>
											</div>
										</a>
									</div>
									<a href="javascript:;">
										<div className="text-center msg-footer">
											<div className="d-flex align-items-center justify-content-between mb-3">
												<h5 className="mb-0">Total</h5>
												<h5 className="mb-0 ms-auto">$489.00</h5>
											</div>
											<button className="btn btn-primary w-100">Checkout</button>
										</div>
									</a>
								</div>
							</li>
						</ul>
					</div>
					<div className="user-box dropdown px-3">
						<a className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="assets/images/avatars/avatar-2.png" className="user-img" alt="user avatar">
							<div className="user-info">
								<p className="user-name mb-0">Pauline Seitz</p>
								<p className="designattion mb-0">Web Designer</p>
							</div>
						</a>
						<ul className="dropdown-menu dropdown-menu-end">
							<li><a className="dropdown-item d-flex align-items-center" href="javascript:;"><i className="bx bx-user fs-5"></i><span>Profile</span></a>
							</li>
							<li><a className="dropdown-item d-flex align-items-center" href="javascript:;"><i className="bx bx-cog fs-5"></i><span>Settings</span></a>
							</li>
							<li><a className="dropdown-item d-flex align-items-center" href="javascript:;"><i className="bx bx-home-circle fs-5"></i><span>Dashboard</span></a>
							</li>
							<li><a className="dropdown-item d-flex align-items-center" href="javascript:;"><i className="bx bx-dollar-circle fs-5"></i><span>Earnings</span></a>
							</li>
							<li><a className="dropdown-item d-flex align-items-center" href="javascript:;"><i className="bx bx-download fs-5"></i><span>Downloads</span></a>
							</li>
							<li>
								<div className="dropdown-divider mb-0"></div>
							</li>
							<li><a className="dropdown-item d-flex align-items-center" href="javascript:;"><i className="bx bx-log-out-circle"></i><span>Logout</span></a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
		<!--end header -->
		<!--start page wrapper -->
		<div className="page-wrapper">
			<div className="page-content">
				<div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                   <div className="col">
					 <div className="card radius-10 border-start border-0 border-4 border-info">
						<div className="card-body">
							<div className="d-flex align-items-center">
								<div>
									<p className="mb-0 text-secondary">Total Orders</p>
									<h4 className="my-1 text-info">4805</h4>
									<p className="mb-0 font-13">+2.5% from last week</p>
								</div>
								<div className="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto"><i className='bx bxs-cart'></i>
								</div>
							</div>
						</div>
					 </div>
				   </div>
				   <div className="col">
					<div className="card radius-10 border-start border-0 border-4 border-danger">
					   <div className="card-body">
						   <div className="d-flex align-items-center">
							   <div>
								   <p className="mb-0 text-secondary">Total Revenue</p>
								   <h4 className="my-1 text-danger">$84,245</h4>
								   <p className="mb-0 font-13">+5.4% from last week</p>
							   </div>
							   <div className="widgets-icons-2 rounded-circle bg-gradient-burning text-white ms-auto"><i className='bx bxs-wallet'></i>
							   </div>
						   </div>
					   </div>
					</div>
				  </div>
				  <div className="col">
					<div className="card radius-10 border-start border-0 border-4 border-success">
					   <div className="card-body">
						   <div className="d-flex align-items-center">
							   <div>
								   <p className="mb-0 text-secondary">Bounce Rate</p>
								   <h4 className="my-1 text-success">34.6%</h4>
								   <p className="mb-0 font-13">-4.5% from last week</p>
							   </div>
							   <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto"><i className='bx bxs-bar-chart-alt-2' ></i>
							   </div>
						   </div>
					   </div>
					</div>
				  </div>
				  <div className="col">
					<div className="card radius-10 border-start border-0 border-4 border-warning">
					   <div className="card-body">
						   <div className="d-flex align-items-center">
							   <div>
								   <p className="mb-0 text-secondary">Total Customers</p>
								   <h4 className="my-1 text-warning">8.4K</h4>
								   <p className="mb-0 font-13">+8.4% from last week</p>
							   </div>
							   <div className="widgets-icons-2 rounded-circle bg-gradient-orange text-white ms-auto"><i className='bx bxs-group'></i>
							   </div>
						   </div>
					   </div>
					</div>
				  </div> 
				</div><!--end row-->

				<div className="row">
                   <div className="col-12 col-lg-8 d-flex">
                      <div className="card radius-10 w-100">
						<div className="card-header">
							<div className="d-flex align-items-center">
								<div>
									<h6 className="mb-0">Sales Overview</h6>
								</div>
								<div className="dropdown ms-auto">
									<a className="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i className='bx bx-dots-horizontal-rounded font-22 text-option'></i>
									</a>
									<ul className="dropdown-menu">
										<li><a className="dropdown-item" href="javascript:;">Action</a>
										</li>
										<li><a className="dropdown-item" href="javascript:;">Another action</a>
										</li>
										<li>
											<hr className="dropdown-divider">
										</li>
										<li><a className="dropdown-item" href="javascript:;">Something else here</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						  <div className="card-body">
							<div className="d-flex align-items-center ms-auto font-13 gap-2 mb-3">
								<span className="border px-1 rounded cursor-pointer"><i className="bx bxs-circle me-1" style="color: #14abef"></i>Sales</span>
								<span className="border px-1 rounded cursor-pointer"><i className="bx bxs-circle me-1" style="color: #ffc107"></i>Visits</span>
							</div>
							<div className="chart-container-1">
								<canvas id="chart1"></canvas>
							  </div>
						  </div>
						  <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-0 row-group text-center border-top">
							<div className="col">
							  <div className="p-3">
								<h5 className="mb-0">24.15M</h5>
								<small className="mb-0">Overall Visitor <span> <i className="bx bx-up-arrow-alt align-middle"></i> 2.43%</span></small>
							  </div>
							</div>
							<div className="col">
							  <div className="p-3">
								<h5 className="mb-0">12:38</h5>
								<small className="mb-0">Visitor Duration <span> <i className="bx bx-up-arrow-alt align-middle"></i> 12.65%</span></small>
							  </div>
							</div>
							<div className="col">
							  <div className="p-3">
								<h5 className="mb-0">639.82</h5>
								<small className="mb-0">Pages/Visit <span> <i className="bx bx-up-arrow-alt align-middle"></i> 5.62%</span></small>
							  </div>
							</div>
						  </div>
					  </div>
				   </div>
				   <div className="col-12 col-lg-4 d-flex">
                       <div className="card radius-10 w-100">
						<div className="card-header">
							<div className="d-flex align-items-center">
								<div>
									<h6 className="mb-0">Trending Products</h6>
								</div>
								<div className="dropdown ms-auto">
									<a className="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i className='bx bx-dots-horizontal-rounded font-22 text-option'></i>
									</a>
									<ul className="dropdown-menu">
										<li><a className="dropdown-item" href="javascript:;">Action</a>
										</li>
										<li><a className="dropdown-item" href="javascript:;">Another action</a>
										</li>
										<li>
											<hr className="dropdown-divider">
										</li>
										<li><a className="dropdown-item" href="javascript:;">Something else here</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						   <div className="card-body">
							<div className="chart-container-2">
								<canvas id="chart2"></canvas>
							  </div>
						   </div>
						   <ul className="list-group list-group-flush">
							<li className="list-group-item d-flex bg-transparent justify-content-between align-items-center border-top">Jeans <span className="badge bg-success rounded-pill">25</span>
							</li>
							<li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">T-Shirts <span className="badge bg-danger rounded-pill">10</span>
							</li>
							<li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">Shoes <span className="badge bg-primary rounded-pill">65</span>
							</li>
							<li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">Lingerie <span className="badge bg-warning text-dark rounded-pill">14</span>
							</li>
						</ul>
					   </div>
				   </div>
				</div><!--end row-->

				 <div className="card radius-10">
					<div className="card-header">
						<div className="d-flex align-items-center">
							<div>
								<h6 className="mb-0">Recent Orders</h6>
							</div>
							<div className="dropdown ms-auto">
								<a className="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i className='bx bx-dots-horizontal-rounded font-22 text-option'></i>
								</a>
								<ul className="dropdown-menu">
									<li><a className="dropdown-item" href="javascript:;">Action</a>
									</li>
									<li><a className="dropdown-item" href="javascript:;">Another action</a>
									</li>
									<li>
										<hr className="dropdown-divider">
									</li>
									<li><a className="dropdown-item" href="javascript:;">Something else here</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
                         <div className="card-body">
						 <div className="table-responsive">
						   <table className="table align-middle mb-0">
							<thead className="table-light">
							 <tr>
							   <th>Product</th>
							   <th>Photo</th>
							   <th>Product ID</th>
							   <th>Status</th>
							   <th>Amount</th>
							   <th>Date</th>
							   <th>Shipping</th>
							 </tr>
							 </thead>
							 <tbody><tr>
							  <td>Iphone 5</td>
							  <td><img src="assets/images/products/01.png" className="product-img-2" alt="product img"></td>
							  <td>#9405822</td>
							  <td><span className="badge bg-gradient-quepal text-white shadow-sm w-100">Paid</span></td>
							  <td>$1250.00</td>
							  <td>03 Feb 2020</td>
							  <td><div className="progress" style="height: 6px;">
									<div className="progress-bar bg-gradient-quepal" role="progressbar" style="width: 100%"></div>
								  </div></td>
							 </tr>
		  
							 <tr>
							  <td>Earphone GL</td>
							  <td><img src="assets/images/products/02.png" className="product-img-2" alt="product img"></td>
							  <td>#8304620</td>
							  <td><span className="badge bg-gradient-blooker text-white shadow-sm w-100">Pending</span></td>
							  <td>$1500.00</td>
							  <td>05 Feb 2020</td>
							  <td><div className="progress" style="height: 6px;">
									<div className="progress-bar bg-gradient-blooker" role="progressbar" style="width: 60%"></div>
								  </div></td>
							 </tr>
		  
							 <tr>
							  <td>HD Hand Camera</td>
							  <td><img src="assets/images/products/03.png" className="product-img-2" alt="product img"></td>
							  <td>#4736890</td>
							  <td><span className="badge bg-gradient-bloody text-white shadow-sm w-100">Failed</span></td>
							  <td>$1400.00</td>
							  <td>06 Feb 2020</td>
							  <td><div className="progress" style="height: 6px;">
									<div className="progress-bar bg-gradient-bloody" role="progressbar" style="width: 70%"></div>
								  </div></td>
							 </tr>
		  
							 <tr>
							  <td>Clasic Shoes</td>
							  <td><img src="assets/images/products/04.png" className="product-img-2" alt="product img"></td>
							  <td>#8543765</td>
							  <td><span className="badge bg-gradient-quepal text-white shadow-sm w-100">Paid</span></td>
							  <td>$1200.00</td>
							  <td>14 Feb 2020</td>
							  <td><div className="progress" style="height: 6px;">
									<div className="progress-bar bg-gradient-quepal" role="progressbar" style="width: 100%"></div>
								  </div></td>
							 </tr>
							 <tr>
							  <td>Sitting Chair</td>
							  <td><img src="assets/images/products/06.png" className="product-img-2" alt="product img"></td>
							  <td>#9629240</td>
							  <td><span className="badge bg-gradient-blooker text-white shadow-sm w-100">Pending</span></td>
							  <td>$1500.00</td>
							  <td>18 Feb 2020</td>
							  <td><div className="progress" style="height: 6px;">
									<div className="progress-bar bg-gradient-blooker" role="progressbar" style="width: 60%"></div>
								  </div></td>
							 </tr>
							 <tr>
							  <td>Hand Watch</td>
							  <td><img src="assets/images/products/05.png" className="product-img-2" alt="product img"></td>
							  <td>#8506790</td>
							  <td><span className="badge bg-gradient-bloody text-white shadow-sm w-100">Failed</span></td>
							  <td>$1800.00</td>
							  <td>21 Feb 2020</td>
							  <td><div className="progress" style="height: 6px;">
									<div className="progress-bar bg-gradient-bloody" role="progressbar" style="width: 40%"></div>
								  </div></td>
							 </tr>
						    </tbody>
						  </table>
						  </div>
						 </div>
					</div>


					<div className="row">
						<div className="col-12 col-lg-7 col-xl-8 d-flex">
						  <div className="card radius-10 w-100">
							<div className="card-header bg-transparent">
								<div className="d-flex align-items-center">
									<div>
										<h6 className="mb-0">Recent Orders</h6>
									</div>
									<div className="dropdown ms-auto">
										<a className="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i className='bx bx-dots-horizontal-rounded font-22 text-option'></i>
										</a>
										<ul className="dropdown-menu">
											<li><a className="dropdown-item" href="javascript:;">Action</a>
											</li>
											<li><a className="dropdown-item" href="javascript:;">Another action</a>
											</li>
											<li>
												<hr className="dropdown-divider">
											</li>
											<li><a className="dropdown-item" href="javascript:;">Something else here</a>
											</li>
										</ul>
									</div>
								</div>
							   </div>
							 <div className="card-body">
								<div className="row">
								  <div className="col-lg-7 col-xl-8 border-end">
									 <div id="geographic-map-2"></div>
								  </div>
								  <div className="col-lg-5 col-xl-4">
			                       
									<div className="mb-4">
									<p className="mb-2"><i className="flag-icon flag-icon-us me-1"></i> USA <span className="float-end">70%</span></p>
									<div className="progress" style="height: 7px;">
										 <div className="progress-bar bg-primary progress-bar-striped" role="progressbar" style="width: 70%"></div>
									 </div>
									</div>
			   
									<div className="mb-4">
									 <p className="mb-2"><i className="flag-icon flag-icon-ca me-1"></i> Canada <span className="float-end">65%</span></p>
									 <div className="progress" style="height: 7px;">
										 <div className="progress-bar bg-danger progress-bar-striped" role="progressbar" style="width: 65%"></div>
									 </div>
									</div>
			   
									<div className="mb-4">
									 <p className="mb-2"><i className="flag-icon flag-icon-gb me-1"></i> England <span className="float-end">60%</span></p>
									 <div className="progress" style="height: 7px;">
										 <div className="progress-bar bg-success progress-bar-striped" role="progressbar" style="width: 60%"></div>
									   </div>
									</div>
			   
									<div className="mb-4">
									 <p className="mb-2"><i className="flag-icon flag-icon-au me-1"></i> Australia <span className="float-end">55%</span></p>
									 <div className="progress" style="height: 7px;">
										 <div className="progress-bar bg-warning progress-bar-striped" role="progressbar" style="width: 55%"></div>
									   </div>
									</div>
			   
									<div className="mb-4">
									 <p className="mb-2"><i className="flag-icon flag-icon-in me-1"></i> India <span className="float-end">50%</span></p>
									 <div className="progress" style="height: 7px;">
										 <div className="progress-bar bg-info progress-bar-striped" role="progressbar" style="width: 50%"></div>
									   </div>
									</div>

									<div className="mb-0">
									   <p className="mb-2"><i className="flag-icon flag-icon-cn me-1"></i> China <span className="float-end">45%</span></p>
									   <div className="progress" style="height: 7px;">
										   <div className="progress-bar bg-dark progress-bar-striped" role="progressbar" style="width: 45%"></div>
										 </div>
									</div>

								  </div>
								</div>
							 </div>
						   </div>
						</div>
			   
						<div className="col-12 col-lg-5 col-xl-4 d-flex">
							<div className="card w-100 radius-10">
						     <div className="card-body">
							  <div className="card radius-10 border shadow-none">
								<div className="card-body">
									<div className="d-flex align-items-center">
										<div>
											<p className="mb-0 text-secondary">Total Likes</p>
											<h4 className="my-1">45.6M</h4>
											<p className="mb-0 font-13">+6.2% from last week</p>
										</div>
										<div className="widgets-icons-2 bg-gradient-cosmic text-white ms-auto"><i className='bx bxs-heart-circle'></i>
										</div>
									</div>
								</div>
							 </div>
							 <div className="card radius-10 border shadow-none">
								<div className="card-body">
									<div className="d-flex align-items-center">
										<div>
											<p className="mb-0 text-secondary">Comments</p>
											<h4 className="my-1">25.6K</h4>
											<p className="mb-0 font-13">+3.7% from last week</p>
										</div>
										<div className="widgets-icons-2 bg-gradient-ibiza text-white ms-auto"><i className='bx bxs-comment-detail'></i>
										</div>
									</div>
								</div>
							 </div>
							 <div className="card radius-10 mb-0 border shadow-none">
								<div className="card-body">
									<div className="d-flex align-items-center">
										<div>
											<p className="mb-0 text-secondary">Total Shares</p>
											<h4 className="my-1">85.4M</h4>
											<p className="mb-0 font-13">+4.6% from last week</p>
										</div>
										<div className="widgets-icons-2 bg-gradient-kyoto text-dark ms-auto"><i className='bx bxs-share-alt'></i>
										</div>
									</div>
								</div>
							  </div>
							 </div>

							</div>
			   
						</div>
					 </div><!--end row-->

					 <div className="row row-cols-1 row-cols-lg-3">
						 <div className="col d-flex">
                           <div className="card radius-10 w-100">
							   <div className="card-body">
								<p className="font-weight-bold mb-1 text-secondary">Weekly Revenue</p>
								<div className="d-flex align-items-center mb-4">
									<div>
										<h4 className="mb-0">$89,540</h4>
									</div>
									<div className="">
										<p className="mb-0 align-self-center font-weight-bold text-success ms-2">4.4% <i className="bx bxs-up-arrow-alt mr-2"></i>
										</p>
									</div>
								</div>
								<div className="chart-container-0 mt-5">
									<canvas id="chart3"></canvas>
								  </div>
							   </div>
						   </div>
						 </div>
						 <div className="col d-flex">
							<div className="card radius-10 w-100">
								<div className="card-header bg-transparent">
									<div className="d-flex align-items-center">
										<div>
											<h6 className="mb-0">Orders Summary</h6>
										</div>
										<div className="dropdown ms-auto">
											<a className="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i className='bx bx-dots-horizontal-rounded font-22 text-option'></i>
											</a>
											<ul className="dropdown-menu">
												<li><a className="dropdown-item" href="javascript:;">Action</a>
												</li>
												<li><a className="dropdown-item" href="javascript:;">Another action</a>
												</li>
												<li>
													<hr className="dropdown-divider">
												</li>
												<li><a className="dropdown-item" href="javascript:;">Something else here</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="card-body">
									<div className="chart-container-1 mt-3">
										<canvas id="chart4"></canvas>
									  </div>
								</div>
								<ul className="list-group list-group-flush">
									<li className="list-group-item d-flex bg-transparent justify-content-between align-items-center border-top">Completed <span className="badge bg-gradient-quepal rounded-pill">25</span>
									</li>
									<li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">Pending <span className="badge bg-gradient-ibiza rounded-pill">10</span>
									</li>
									<li className="list-group-item d-flex bg-transparent justify-content-between align-items-center">Process <span className="badge bg-gradient-deepblue rounded-pill">65</span>
									</li>
								</ul>
							</div>
						  </div>
						  <div className="col d-flex">
							<div className="card radius-10 w-100">
								 <div className="card-header bg-transparent">
									<div className="d-flex align-items-center">
										<div>
											<h6 className="mb-0">Top Selling Categories</h6>
										</div>
										<div className="dropdown ms-auto">
											<a className="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i className='bx bx-dots-horizontal-rounded font-22 text-option'></i>
											</a>
											<ul className="dropdown-menu">
												<li><a className="dropdown-item" href="javascript:;">Action</a>
												</li>
												<li><a className="dropdown-item" href="javascript:;">Another action</a>
												</li>
												<li>
													<hr className="dropdown-divider">
												</li>
												<li><a className="dropdown-item" href="javascript:;">Something else here</a>
												</li>
											</ul>
										</div>
									 </div>
								 </div>
								<div className="card-body">
								   <div className="chart-container-0">
									 <canvas id="chart5"></canvas>
								   </div>
								</div>
								<div className="row row-group border-top g-0">
									<div className="col">
										<div className="p-3 text-center">
											<h4 className="mb-0 text-danger">$45,216</h4>
											<p className="mb-0">Clothing</p>
										</div>
									</div>
									<div className="col">
										<div className="p-3 text-center">
											<h4 className="mb-0 text-success">$68,154</h4>
											<p className="mb-0">Electronic</p>
										</div>
									 </div>
								</div><!--end row-->
							</div>
						  </div>
					 </div><!--end row-->

			</div>
		</div>
		<!--end page wrapper -->
		<!--start overlay-->
		 <div class="overlay toggle-icon"></div>
		<!--end overlay-->
		<!--Start Back To Top Button-->
		  <a href="javaScript:;" class="back-to-top"><i class='bx bxs-up-arrow-alt'></i></a>
		<!--End Back To Top Button-->
		<footer class="page-footer">
			<p class="mb-0">Copyright © 2022. All right reserved.</p>
		</footer>
	</div>
      
  );
}

export default App;