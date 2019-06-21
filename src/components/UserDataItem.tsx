import * as React from "react";
const moment = require("moment");
const notFoundImage = require("../../public/images/twitch-not-found.jpg");
import { UserDataItemState, UserDataItemProps } from "../interfaces/TwitchAPI";

/* 
	TODO
	[ ] Fix flexbox for online and offline
*/
const defaultState: UserDataItemState = {
    showComponent: true,
    usersToKeep: [],
    desktop: false,
};

class UserDataItem extends React.Component<UserDataItemProps, UserDataItemState> {
    state = defaultState;

    componentDidMount() {
        const userDataJSON = localStorage.getItem(this.props.name);
        const userData = JSON.parse(userDataJSON);
        this.setState({ userData, desktop: window.innerWidth > 740 });
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        let desktop = window.innerWidth > 740;
        this.setState({ desktop });
    };

    onRemoveUser = () => {
        const userToRemove = document.getElementById(this.props.name);
        userToRemove.className = "user animated fadeOutLeft";
        setTimeout(() => {
            this.setState({ showComponent: false });
            this.props.removeUser(this.props.name, this.props.online);
        }, 500);
    };

    render() {
        const { desktop } = this.state;
        return (
            this.state.showComponent && (
                <a href={this.props.link} target="_blank">
                    <div id={this.props.name} className="user animated fadeIn">
                        {this.props.online === true ? (
                            <div className="user-info-container">
                                <div className="online-user">
                                    <i
                                        onClick={this.onRemoveUser}
                                        className="fa fa-times deleteBtn"
                                    />
                                    <div className="user-image">
                                        <img src={this.props.image} className="user-logo" />
                                        <h4 className="user-name">{this.props.name}</h4>
                                    </div>
                                    <div className="user-info">
                                        <p>
                                            <b>Status:</b> Live now!
                                        </p>
                                        <p>
                                            <b>Currently Playing:</b> {this.props.game}
                                        </p>
                                        <p className="sub-game">
                                            <em>- {this.props.status}</em>
                                        </p>
                                        <p>
                                            <b>Viewers:</b> {this.props.viewers}
                                        </p>
                                        <p>
                                            <b>Mature Content:</b>{" "}
                                            {this.props.mature ? " Yes " : " No "}
                                        </p>
                                    </div>
                                </div>
                                {desktop && (
                                    <div className="user-preview">
                                        <img
                                            src={this.props.preview}
                                            id={`${this.props.name}-img`}
                                            className={
                                                this.props.mature
                                                    ? this.props.state.matureFilter
                                                        ? "preview-img-mature"
                                                        : "preview-img"
                                                    : "preview-img"
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="offline-user">
                                <i onClick={this.onRemoveUser} className="fa fa-times deleteBtn" />
                                <div className="user-image">
                                    <img
                                        src={
                                            this.state.userData
                                                ? this.state.userData.image
                                                : "/images/placeholder.png"
                                        }
                                        className="user-logo"
                                    />
                                    <h4 className="user-name">{this.props.name}</h4>
                                </div>
                                <div
                                    className={
                                        this.state.userData !== null
                                            ? "offline-with-info"
                                            : "offline-user-info"
                                    }
                                >
                                    {!this.state.userData ? (
                                        <div>
                                            <p>
                                                <b>Status:</b> User is offline
                                            </p>
                                            <p>
                                                <b>Last Seen:</b> Never
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>
                                                <b>Status:</b> User is offline
                                            </p>
                                            <p>
                                                <b>Last Played:</b> {this.state.userData.lastGame}
                                            </p>
                                            <p>
                                                <b>Last Streamed:</b>{" "}
                                                {moment(this.state.userData.lastSeen).format(
                                                    "Do MMMM @ hh:mmA",
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {desktop && (
                                    <div className="user-preview">
                                        <img
                                            src={notFoundImage}
                                            id={`${this.props.name}-img`}
                                            className="preview-img"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </a>
            )
        );
    }
}

export default UserDataItem;
