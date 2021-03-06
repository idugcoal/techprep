import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-upward'
import DownArrow from 'material-ui/svg-icons/navigation/arrow-downward'
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../actions';
import AddComment from './addComment';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      commentsID: this.props.question.commentsID,
      currentUser: this.props.currentUser
    };
  }

  handleUpvote(questionIndex, commentIndex) {
    // if user has previously downvoted, then remove them from downvotes
    var userIndex = questionIndex.hasDownvoted.indexOf(this.state.currentUser.displayName)
    if(userIndex) {
      this.props.removeVotes(this.state.commentsID, commentIndex, userIndex, 'DOWN')
    }
    // if user has not upvoted yet, add to upvotes
    if(questionIndex.hasUpvoted.indexOf(this.state.currentUser.displayName) === -1) {
      this.props.addVotes(this.state.commentsID, commentIndex, questionIndex.hasUpvoted.length, 'UP')
    }
  }

  handleDownvote(questionIndex, commentIndex) {
    // if user has previously upvoted, then remove them from upvotes
    var userIndex = questionIndex.hasUpvoted.indexOf(this.state.currentUser.displayName)
    if(userIndex) {
      this.props.removeVotes(this.state.commentsID, commentIndex, userIndex, 'UP')
    }
    // if user has not downvoted yet, add to downvotes
    if(questionIndex.hasDownvoted.indexOf(this.state.currentUser.displayName) === -1) {
      this.props.addVotes(this.state.commentsID, commentIndex, questionIndex.hasDownvoted.length, 'DOWN')
    }
  }

  render() {

    // {console.log('this.props.comments in comments:', this.props.comments)}
    return (  
      <div>
          <div class="comment-button">
            <AddComment 
              currentUser={this.state.currentUser}
              commentsList={this.props.comments}
              commentsID={this.state.commentsID}
            />
          </div>

        <Card>
          <CardHeader
            title="Comments"
            subtitle=""
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText id="comments" expandable={true}>
            {this.props.comments && this.state.commentsID && this.props.comments[this.state.commentsID].map((comment, index) => {
              return (
                <List key={index}>
                  <ListItem disabled={true}>
                    <div>
                    <div>
                      <div id="votes"> {comment.hasUpvoted && comment.hasDownvoted && comment.hasUpvoted.length - comment.hasDownvoted.length} </div>
                      <div id="arrows">
                        <iconButton onClick={() => this.handleUpvote(comment, index)}> <UpArrow /> </iconButton>
                        <iconButton onClick={() => this.handleDownvote(comment, index)}> <DownArrow /> </iconButton>
                      </div>
                      </div>
                    </div>
                    <div id="comment">
                      {comment.username}
                      <br />
                      {comment.comment}
                    </div>

                  </ListItem>
                  <Divider />
                </List>
              );
            })}
          </CardText>
          <CardActions expandable={true}>
          </CardActions>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { comments: state.comments, commentIndex: state.commentIndex };
}

export default connect(mapStateToProps, actions)(Comments);