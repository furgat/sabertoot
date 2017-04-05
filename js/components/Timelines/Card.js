'use strict';
import React from 'react';

export default class Card extends React.Component {
  render() {
    const defaults = { userIcon: 'iconpath' };
    const {cardHeader, cardType, userUrl, displayName, userName, timeStamp, cardMsg} = this.props;
    const {userIcon} = (this.props.userIcon === undefined ? defaults : this.props );
    const rootClasses = (cardType == 'toot' ? 'card card-toot' : 'card card-note');

    return (
      <div className={rootClasses}>
        <div className="card-header">
          {cardHeader}
        </div>
        <div>
          <div className="user-icon">
            <a href={userUrl}>
              <img src={userIcon} alt={userName}/>
            </a>
          </div>
          <div className="card-body">
            <div className="card-msg-header">
              <div className="names">
                <div className="display-name">
                  {displayName}
                </div>
                <div className="user-name">
                  {userName}
                </div>
              </div>
              <div className="timestamp">
                {timeStamp}
              </div>
            </div>
            <div className="card-msg" dangerouslySetInnerHTML={{__html:cardMsg}}>
            </div>
            <div className="card-actions">
              <a className="reply-button"><span className="glyphicon glyphicon-share" /></a>
              <a className="boost-button"><span className="glyphicon glyphicon-retweet" /></a>
              <a className="fav-button"><span className="glyphicon glyphicon-star" /></a>
              <a className="options-button"><span className="glyphicon glyphicon-option-horizontal" /></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
