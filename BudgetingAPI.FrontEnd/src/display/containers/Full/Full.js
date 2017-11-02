import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import HeaderContainer from '../../components/shared/header/HeaderContainer';
import Sidebar from '../../components/shared/sidebar/Sidebar';
import Breadcrumb from '../../components/shared/Breadcrumb';
import AsideContainer from '../../components/shared/aside/AsideContainer';
import Footer from '../../components/shared/Footer';

import Dashboard from '../../views/Dashboard/Dashboard';
import Threads from '../../views/Threads/Threads';

const Full = props => (
	<div className="app">
		<div id="wrapper">
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="brand">
					<a href="index.html">
						<img src="/img/logo-dark.png" alt="Klorofil Logo" className="img-responsive logo" />
					</a>
				</div>
				<form className="navbar-form navbar-left">
					<div className="input-group">
						<input type="text" value="" className="form-control" placeholder="Search dashboard..." />
						<span className="input-group-btn"><button type="button" className="btn btn-primary">Go</button></span>
					</div>
				</form>
				<div id="navbar-menu">
					<ul className="nav navbar-nav navbar-right">

						<li className="dropdown">
							<a>rosalind.m.wills@gmail.com (<a href="#">Log Out</a>)</a>
						</li>
					</ul>
				</div>
			</nav>
			<div id="sidebar-nav" className="sidebar">
				<div className="sidebar-scroll">
					<nav>
						<ul className="nav">
							<li><a href="index.html" className="active"><i className="lnr lnr-home"></i> <span>Dashboard</span></a></li>
							<li><a href="elements.html" className=""><i className="lnr lnr-code"></i> <span>Elements</span></a></li>
							<li><a href="charts.html" className=""><i className="lnr lnr-chart-bars"></i> <span>Charts</span></a></li>
							<li><a href="panels.html" className=""><i className="lnr lnr-cog"></i> <span>Panels</span></a></li>
							<li><a href="notifications.html" className=""><i className="lnr lnr-alarm"></i> <span>Notifications</span></a></li>
							<li>
								<a href="#subPages" data-toggle="collapse" className="collapsed"><i className="lnr lnr-file-empty"></i> <span>Pages</span> <i className="icon-submenu lnr lnr-chevron-left"></i></a>
								<div id="subPages" className="collapse ">
									<ul className="nav">
										<li><a href="page-profile.html" className="">Profile</a></li>
										<li><a href="page-login.html" className="">Login</a></li>
										<li><a href="page-lockscreen.html" className="">Lockscreen</a></li>
									</ul>
								</div>
							</li>
							<li><a href="tables.html" className=""><i className="lnr lnr-dice"></i> <span>Tables</span></a></li>
							<li><a href="typography.html" className=""><i className="lnr lnr-text-format"></i> <span>Typography</span></a></li>
							<li><a href="icons.html" className=""><i className="lnr lnr-linearicons"></i> <span>Icons</span></a></li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<div className="panel panel-headline">
							<div className="panel-heading">
								<h3 className="panel-title">Monthly Overview</h3>
								<p className="panel-subtitle">November 2017</p>
							</div>
							<div className="panel-body">
								<div className="row">
									<div className="col-md-3">
										<div className="metric">
											<span className="icon"><i className="fa fa-money"></i></span>
											<p>
												<span className="title">You plan to save</span>
												<span className="number">$600</span>
												<span className="title">this month</span>
											</p>
										</div>
									</div>
									<div className="col-md-3">
										<div className="metric">
											<span className="icon"><i className="fa fa-plus-circle"></i></span>
											<p>
												<span className="title">You plan to earn</span>
												<span className="number">$2,500</span>
												<span className="title">in income</span>
											</p>
										</div>
									</div>
									<div className="col-md-3">
										<div className="metric">
											<span className="icon"><i className="fa fa-envelope"></i></span>
											<p>
												<span className="title">You plan to spend</span>
												<span className="number">$600</span>
												<span className="title">on bills</span>
											</p>
										</div>
									</div>
									<div className="col-md-3">
										<div className="metric">
											<span className="icon"><i className="fa fa-bar-chart"></i></span>
											<p>
												<span className="title">You have spent</span>
												<span className="number">$300</span>
												<span className="title">in other expenses.</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	</div>
);

export default Full;
