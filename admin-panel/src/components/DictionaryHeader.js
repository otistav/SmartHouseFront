import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export
const DictionaryHeader = (props) => {
  return (
    <div className="page-content-header">
      <div className="page-content-header-text">
        {props.title}
        <div className="add-button">
          <FloatingActionButton onTouchTap={props.openModal}  mini={true}>
            <ContentAdd/>
          </FloatingActionButton>
        </div>
      </div>

    </div>
  )
};