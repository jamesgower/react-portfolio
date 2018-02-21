import React from 'react';
import { TicTacToe } from './PlayTicTacToe';
import ChooseNames from './ChooseNames';
import ChooseOpponents from './ChooseOpponents';
import NavBar from '../NavBar';

export default class TicTacToeSetup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			noPlayers: undefined,
			p1name: '',
			p2name: '',
			player1Counter: 'X',
			player2Counter: 'O',
			aiCounter: 'O',
			currentPlayer: 1,
			origBoard: Array.from(Array(9).keys()),
			difficulty: undefined,
			readyToPlay: false,
			showComponent: false,
			ttt: true,
			navbar: true
		};
		this.updateState = this.updateState.bind(this);
	}

	onOnePlayerClick = () => {
		this.setState({ noPlayers: 1 });
	};

	onTwoPlayersClick = () => {
		this.setState({ noPlayers: 2, difficulty: null });
	};

	onUpdate = updates => {
		this.setState({
			p1name: updates.p1name,
			p2name: updates.p2name,
			difficulty: updates.difficulty,
			player1Counter: updates.player1Counter,
			player2Counter: updates.player2Counter,
			aiCounter: updates.aiCounter,
			readyToPlay: true,
		});
	};

	updateState = update => {
		this.setState({ showComponent: update});
	};

	render() {
		return (
			<div>
				{this.state.showComponent && (
					<NavBar
						id="navbar-TTT"
						update={this.updateState}
						{...this.state}
					/>
				)}
				<div className="background-TTT">
					<span className="openNav-TTT" onClick={this.updateState}>
						<i className="fa fa-bars animated pulse infinite" />
					</span>
					{this.state.noPlayers === undefined &&
						!this.state.readyToPlay && (
							<ChooseOpponents
								onePlayerClick={this.onOnePlayerClick}
								twoPlayerClick={this.onTwoPlayersClick}
							/>
						)}
					{this.state.noPlayers !== undefined &&
						!this.state.readyToPlay && (
							<ChooseNames className="tic-tac-toe" update={this.onUpdate} {...this.state} />
						)}
					{this.state.readyToPlay && <TicTacToe {...this.state} />}
				</div>
			</div>
		);
	}
}
