import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {List, ListItem} from 'material-ui/List';
import _ from 'lodash';

import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import ChatBox from '../chat/chatBox';

const style = {
  marginLeft: 20
}

const styles = {
  top: 8
}

const test = "THIS IS A TEST";

class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false, clickedUser: { displayName: null, profileURL: null }, addFriendInput: '' }
  }

  handleOpen(displayName, profileURL) {
    this.setState({open: true, clickedUser: { displayName, profileURL }});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleMessageClick() {
    // console.log('clicked');
  }

  handleAddFriend() {
    this.props.addFriend(this.state.addFriendInput);
    this.setState({ addFriendInput: '' });
  }

  handleAddFriendChange(e) {
    this.setState({ addFriendInput: e.target.value });
  }

  handleAcceptFriendRequest(userObj) {
    this.props.acceptFriendRequest(userObj);
  }

  handleProfileClick() {
    // console.log('clicked');
  }

  handleIgnoreInvite(userObj) {
    // console.log('clicked handleigoreinvite');
    this.props.ignoreFriendInvite(userObj);
  }

  handleRemoveFriend(displayName) {
    // console.log('handle remove friend clicked');
    this.props.removeFriend(displayName);
  }

  iconButtonElement() {
    return (
      <IconButton
        touch={true}
        tooltip="Options"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );
  }

  rightIconMenu(displayName, profileURL) {
    return (
      <IconMenu iconButtonElement={this.iconButtonElement()}>
        <MenuItem onTouchTap={this.handleOpen.bind(this, displayName, profileURL)}>Message</MenuItem>
        <MenuItem onTouchTap={this.handleRemoveFriend.bind(this, displayName)}>Remove Friend</MenuItem>
      </IconMenu>
    );
  }

  rightIconMenuInvite(userObj) {
    return (
      <IconMenu iconButtonElement={this.iconButtonElement()}>
        <MenuItem onTouchTap={this.handleAcceptFriendRequest.bind(this, userObj)}>Accept</MenuItem>
        <MenuItem onTouchTap={this.handleIgnoreInvite.bind(this, userObj)}>Ignore</MenuItem>
      </IconMenu>
    );
  }

  renderFriends(obj, idx) {
    const displayName = obj.displayName || obj.email;
    const profileURL = obj.profileURL;
    // <Divider inset={false} />
    return (
      <ListItem
        key={idx}
        leftAvatar={<Avatar src={profileURL} />}
        rightIconButton={this.rightIconMenu.apply(this, [displayName, profileURL])}
        primaryText={<div className="centered ellipse">{displayName}</div>}
      />
    );
  }

  renderInvites(obj, idx) {
    const displayName = obj.displayName || obj.email;
    const profileURL = obj.profileURL;
    // <Divider inset={false} />
    return (
      <ListItem
        key={idx}
        leftAvatar={<Avatar src={profileURL} />}
        rightIconButton={this.rightIconMenuInvite.apply(this, [obj])}
        primaryText={<div className="centered ellipse">{displayName}</div>}
      />
    );
  }

  render() {
    const actions = [
      <TextField
        floatingLabelText="Type Message"
        fullWidth={true}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];
    return (
      <div>
        <List>
          <div className="centered">
            <FloatingActionButton
              style={style}
              mini={true}
              onTouchTap={this.handleAddFriend.bind(this)}
            >
              <ContentAdd />
            </FloatingActionButton>
          </div>
          <div className="centered">
          <TextField
            value={this.state.addFriendInput}
            hintText="UID"
            floatingLabelText="Add Friend by UID"
            fullWidth={false}
            onChange={this.handleAddFriendChange.bind(this)}
          />
          </div>
          <div className="centered">
            <h2 className="friends">Friends</h2>
          </div>
          {this.props.friends.map(this.renderFriends.bind(this)).sort(function(a,b) {return a.displayName-b.displayName})}
          <div className="centered">
            <h2 className="friends">Pending Invites</h2>
          </div>
          {this.props.invites.map(this.renderInvites.bind(this))}
        </List>
        <ChatBox clickedUser={this.state.clickedUser} localOpen={this.state.open} localHandleClose={this.handleClose.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state.friends', state.friends)
  var friends = _.map(state.friends, (n, i) => {
    return n;
  });
  var invites = _.map(state.invites, (n, i) => {
    return n;
  });
  return { friends, invites };
}

export default connect(mapStateToProps, actions)(Friends);