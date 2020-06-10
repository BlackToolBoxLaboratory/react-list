import React, { useState, useEffect } from 'react';

import ListLayer from './ListLayer.jsx';

import getStyle from '../utils/getStyle.js';
import { EnvContext, EventContext } from '../utils/useContext.js';

const List = (props) => {
  const env = {
    state_activeID : useActiveState(),
    collapseEnable : props.collapseEnable || false,
    slotObj        : props.slotObj || {}
  };
  const event = {
    clickEntry : (entry) => {
      env.state_activeID.onChange(entry.id);
      if (props.onEntryClick) {
        props.onEntryClick(entry);
      }
    },
    toggleCollapsed : (entry) => {
      if (props.onToggle) {
        props.onToggle(entry);
      }
    }
  };

  useEffect(() => {
    env.state_activeID.onChange(props.activeID || props.defaultActiveID || '');
  }, []);
  useEffect(() => {
    if (typeof props.activeID != 'undefined')
    {
      env.state_activeID.onChange(props.activeID);
    }
  }, [env.state_activeID.value]);

  return (
    <EnvContext.Provider value={env}>
      <EventContext.Provider value={event}>
        <div className={['btb-react-list', props.className].join(' ')} style={getStyle(props.styleObj, ['btb-react-list'])}>
          <ListLayer subdataList={props.dataList} activeID={env.state_activeID.value} styleObj={props.styleObj || {}} iteration={0}/>
        </div>
      </EventContext.Provider>
    </EnvContext.Provider>
  );
};

function useActiveState(defaultSate) {
  const [value, setState] = useState(defaultSate);
  return {
    value,
    onChange : (state) => {
      setState(state);
    }
  };
}

export {
  List as default,
  EnvContext,
  EventContext
};