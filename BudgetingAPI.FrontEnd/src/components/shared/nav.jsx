import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const NavRow = styled.nav`
	margin: 0;
	padding: 0;
`;

class Nav extends Component {
	render() {
		return (
			<NavRow className="navbar navbar-inverse navbar-static-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Day2Day</a>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						<ul className="nav navbar-nav navbar-right">
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">rosalind.m.wills@gmail.com <span className="fa fa-caret-down"></span></a>
								<ul className="dropdown-menu">
									<li><Link to="/logout">Logout</Link></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</NavRow>
		);
	}
}

export default Nav;
