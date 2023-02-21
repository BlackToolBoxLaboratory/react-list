import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import ListLayer from './ListLayer.jsx';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';
import { EnvContext, EventContext } from '../utils/useContext.js';

const List = React.forwardRef((props, ref) => {
  const env = {
    state_activeID : useActiveState(),
    collapseEnable : props.collapseEnable || false,
    styleObj       : formatCamelCase(props.styleObj || {}),
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
    if (typeof props.activeID != 'undefined') {
      if (env.state_activeID.value !== props.activeID) {
        env.state_activeID.onChange(props.activeID);
      }
    }
  });

  return (
    <EnvContext.Provider value={env}>
      <EventContext.Provider value={event}>
        <div ref={ref} className={classnames('btb-react-list', props.className)} style={getStyle(env.styleObj, ['btb-react-list'])}>
          <ListLayer subdataList={props.dataList || []} iteration={0} />
        </div>
      </EventContext.Provider>
    </EnvContext.Provider>
  );
});

function useActiveState(defaultSate) {
  const [value, setState] = useState(defaultSate);
  return {
    value,
    onChange : (state) => {
      setState(state);
    }
  };
}

export default List;