import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const HeaderRow = styled.nav`
	margin: 0;
	background: #F4F4F9;
	padding: 0 30px;
	height: 70px; 
	h1 {
		font-size: 18px;
		line-height: 70px;
		margin: 0;
	}
	.loggedInUser { float: right; line-height: 70px; font-size: 14px;}
`;

class Header extends Component {
	render() {
		return (
			<HeaderRow>
				<p className="loggedInUser">rosalind.m.wills@gmail.com (<Link to="/logout">Log Out <i className="fa fa-sign-out" aria-hidden="true"></i></Link>)</p>
				<h1>{this.props.headerTitle}</h1>
			</HeaderRow>
		);
	}
}

export default Header;
