import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const NavColumn = styled.nav`
	margin: 0;
	padding: 0;
	position: fixed;	
	width: 300px;
	height: 100%;
	background: #2F4550;
	color: #F4F4F9;

	a {
		color: #F4F4F9;
		&:hover {
			text-decoration: none;
		}
	}
`;

const NavColumnHeaderLink = styled.div`
	height: 70px;
	background: #586F7C;
	border-bottom: 1px solid #94A3Ab;
	a {
		display: block;
		text-align: center;
		font-size: 18px;
		font-family: 'Handlee', cursive;
		line-height: 30px;
		text-transform: uppercase;
		padding: 20px;
	}
`;

const NavColumnMenu = styled.ul`
	margin: 0; padding: 0;
`;

const NavColumnMenuItem = styled.li`
	width: 100%;
	height: 65px;
	font-size: 18px;;
	border-bottom: 1px solid #41555f;
	list-style: none;
	.fa { 
		margin-right: 20px;
	}
	&:hover {
		background: #41555f;
	}
	&.parent {
		height: auto;
		padding: 20px;
		padding-bottom: 0;
		&:hover {
			background: #2F4550;
		}
		.sub {
			font-size: 14px;
			border-bottom: none;
			height: 40px;
			margin-top: 5px;
			padding-left: 50px;
			a {
				padding: 10px;
			}
		}
	}
	> a {
	padding: 20px;
		display: block;
	}
`;

class SideNavigation extends Component {
	render() {
		return (
			<NavColumn>
				<NavColumnHeaderLink>
					<Link to="/">Allowance</Link>
				</NavColumnHeaderLink>

				<NavColumnMenu>
					<NavColumnMenuItem>
						<Link to="/"><i className="fa fa-tachometer" aria-hidden="true"></i>Dashboard</Link>
					</NavColumnMenuItem>
					<NavColumnMenuItem className="parent">
						<i className="fa fa-money" aria-hidden="true"></i>Manage
						<NavColumnMenu>
							<NavColumnMenuItem className="sub">
								<Link to="/list-transactions/expense">Recorded Expenses</Link>
							</NavColumnMenuItem>
							<NavColumnMenuItem className="sub">
								<Link to="/list-transactions/income">Expected Income</Link>
							</NavColumnMenuItem>
							<NavColumnMenuItem className="sub">
								<Link to="/list-transactions/bill">Expected Bills</Link>
							</NavColumnMenuItem>
							<NavColumnMenuItem className="sub">
								<Link to="/savings">Desired Savings</Link>
							</NavColumnMenuItem>
						</NavColumnMenu>
					</NavColumnMenuItem>
					<NavColumnMenuItem>
						<Link to="/"><i className="fa fa-cogs" aria-hidden="true"></i>Settings</Link>
					</NavColumnMenuItem>
					<NavColumnMenuItem>
						<Link to="/"><i className="fa fa-question" aria-hidden="true"></i>Help</Link>
					</NavColumnMenuItem>
					<NavColumnMenuItem>
						<Link to="/logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Log Out</Link>
					</NavColumnMenuItem>
				</NavColumnMenu>
			</NavColumn>
		);
	}
}

export default SideNavigation;
